"""Offline public-project checks. No account access, deployments or live Skill runs."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote
from zipfile import ZipFile
import csv, hashlib, io, json, posixpath, re, subprocess, sys

ROOT=Path(__file__).resolve().parents[1]
def run(*args):
    subprocess.run(args,cwd=ROOT,check=True)

run('python3','examples/verify.py')
run('python3','content/workflow/validate.py')
run('python3','scripts/validate-skill-locales.py')
release='--release' in sys.argv
run('npm','run','build:release' if release else 'build')

def unique(values,label):
    assert len(values)==len(set(values)),f'Duplicate {label}'

locales=json.loads((ROOT/'skills/locales.json').read_text())
unique([s['id'] for s in locales['skills']],'Skill IDs')
concepts=json.loads((ROOT/'content/concepts/concepts.json').read_text())
unique([c['id'] for c in concepts['items']],'concept IDs')
lessons=json.loads((ROOT/'content/beginner/stages.replacement.json').read_text())
unique([s['id'] for s in lessons['stages']],'lesson IDs')
dist=ROOT/'dist'
info=json.loads((dist/'build-info.json').read_text())
unique(info['pages'],'page routes')
advanced=ROOT/'content/advanced-fieldwork'
modules=json.loads((advanced/'modules.json').read_text())
assert len(info['pages'])==60+2*(len(modules)+2)
assert len(modules)==6
unique([m['slug'] for m in modules],'fieldwork slugs')

class Page(HTMLParser):
    def __init__(self):
        super().__init__();self.ids=[];self.links=[];self.headings=0
    def handle_starttag(self,tag,attrs):
        attrs=dict(attrs)
        if 'id' in attrs:self.ids.append(attrs['id'])
        if tag=='h1':self.headings+=1
        for key in ['href','src']:
            if key in attrs:self.links.append(attrs[key])

pages={}
for path in dist.rglob('*.html'):
    page=Page();page.feed(path.read_text());pages[path.resolve()]=page
    unique(page.ids,str(path.relative_to(dist))+' HTML IDs')
for path,page in pages.items():
    relative='/'+str(path.relative_to(dist))
    for link in page.links:
        u=urlsplit(link)
        if u.scheme or u.netloc:continue
        target=unquote(u.path)
        if not target:target=relative
        elif not target.startswith('/'):target=posixpath.join(posixpath.dirname(relative),target)
        target=posixpath.normpath(target)
        file=(dist/target.lstrip('/')).resolve()
        if file.is_dir():file=file/'index.html'
        assert file.is_relative_to(dist) and file.exists(),f'Missing internal link: {relative} -> {link}'
        if u.fragment and file in pages:
            assert unquote(u.fragment) in pages[file].ids,f'Missing anchor: {relative} -> {link}'
for route in info['pages']:
    file=(dist/route.lstrip('/')/'index.html').resolve()
    assert pages[file].headings==1,f'Expected one h1: {route}'

for lang in ['zh','en']:
    for skill in locales['skills']:
        source=ROOT/skill['languages'][lang]['sourceDirectory'];id=skill['id']
        file=dist/skill['languages'][lang]['zip'].lstrip('/')
        with ZipFile(file) as archive:
            for item in source.rglob('*'):
                if item.is_file() and item.name!='.DS_Store':
                    assert archive.read(id+'/'+str(item.relative_to(source)))==item.read_bytes(),f'Incomplete {lang} package: {id}'
            assert archive.read(id+'/LICENSE')==(ROOT/'LICENSE').read_bytes()
        raw=dist/skill['languages'][lang]['rawEntrypoint'].lstrip('/')
        assert raw.read_bytes()==(source/'SKILL.md').read_bytes()
    with ZipFile(dist/'downloads/skills'/lang/'first-crawl-execution-skills.zip') as archive:
        assert sum(name.endswith('/SKILL.md') for name in archive.namelist())==7
        for skill in locales['skills']:
            assert archive.read(skill['id']+'/SKILL.md')==(ROOT/skill['languages'][lang]['sourceDirectory']/'SKILL.md').read_bytes()

manifest=json.loads((dist/'downloads/skills/manifest.json').read_text())
assert manifest['sourceCommit']==info['sourceCommit']
assert manifest['version']==info['version']
assert len(manifest['downloads'])==16
for item in manifest['downloads']:
    file=dist/item['path'].lstrip('/')
    assert hashlib.sha256(file.read_bytes()).hexdigest()==item['sha256']
    release_asset=dist/'downloads/releases'/manifest['releaseTag']/item['releaseAsset']
    assert release_asset.read_bytes()==file.read_bytes()
    assert item['sourceCommit']==info['sourceCommit'] and item['version']==info['version']
for skill in locales['skills']:
    for suffix in ['.zip','/SKILL.md']:
        assert (dist/'downloads/skills'/(skill['id']+suffix)).read_bytes()==(dist/'downloads/skills/zh'/(skill['id']+suffix)).read_bytes()

# Only the sanitized public bundle is integrated. Preserve all upstream bytes.
public_manifest=json.loads((advanced/'manifest.json').read_text())
for item in public_manifest['files']:
    file=advanced/item['path']
    assert file.resolve().is_relative_to(advanced), 'Invalid public-bundle path'
    assert hashlib.sha256(file.read_bytes()).hexdigest()==item['sha256'], f'Changed public content: {item["path"]}'
sources=json.loads((advanced/'sources.json').read_text())
source_ids={s['id'] for s in sources}
for module in modules:
    assert set(module['source_ids']).issubset(source_ids)
    for lang in ['zh','en']:
        source=advanced/lang/(module['slug']+'.md')
        rendered=(dist/lang/'advanced'/module['slug']/'index.html').read_text()
        heading_count=len(re.findall(r'^## ',source.read_text(),re.M))
        assert heading_count>=8
        assert len(re.findall(r'<h2 id="section-\d+"',rendered))==heading_count
        assert 'NOT_RUN' in rendered and 'download' in rendered
csv_files=sorted((advanced/'templates').glob('*.csv'))
assert len(csv_files)==6
for file in csv_files:
    rows=list(csv.reader(io.StringIO(file.read_text())))
    assert len(rows)==1 and len(rows[0])>=4, 'Expected a blank header-only CSV'
    assert (dist/'downloads/advanced'/file.name).read_bytes()==file.read_bytes()
integration=json.loads((advanced/'integration.json').read_text())
assert integration['privateSourcesReadOrCopied'] is False
for file in advanced.rglob('*'):
    if file.is_file():
        value=file.read_text()
        assert not re.search(r'/Users/|file://|sk-[A-Za-z0-9_-]{24,}|AKIA[0-9A-Z]{16}|-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----',value), 'Unexpected private material in public bundle'
for filename in ['README.md','README.zh-CN.md','USAGE.md','USAGE.zh-CN.md','CONTRIBUTING.md','CONTRIBUTING.zh-CN.md']:
    for target in re.findall(r'\[[^\]]*\]\(([^)]+)\)',(ROOT/filename).read_text()):
        u=urlsplit(target)
        if not u.scheme and not u.netloc and u.path:assert (ROOT/unquote(u.path)).exists(),f'Missing document link: {filename}'
print(json.dumps({'result':'PASS','scope':'Offline IDs, all internal routes/anchors, bilingual complete packages, public fieldwork integrity and preview/release checksums','pages':len(info['pages']),'buildMode':'release' if release else 'local-preview','fieldworkArticles':12,'blankCSVs':6,'originalSkills':7,'languageEntries':14,'versionedZIPs':16,'liveSkillExecution':'NOT_RUN'}))
