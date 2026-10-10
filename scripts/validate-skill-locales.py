"""Check complete paired entrypoints and schema/reference compatibility; no live execution."""
from pathlib import Path
from urllib.parse import urlsplit,unquote
import json,re,sys
root=Path(__file__).resolve().parents[1]
manifest=json.loads((root/'skills/locales.json').read_text())
errors=[];checked=[]
def require(ok,label):
    if not ok:errors.append(label)
for s in manifest['skills']:
    folders={lang:root/s['languages'][lang]['sourceDirectory'] for lang in ['zh','en']}
    for lang,folder in folders.items():
        entry=folder/'SKILL.md'
        require(entry.is_file(),f'{s["id"]}: missing {lang} SKILL.md')
        if not entry.exists():continue
        text=entry.read_text()
        require(text.startswith('---\nname: '+s['id']+'\n'),f'{s["id"]}: changed {lang} discovery name')
        require('NOT_RUN' in text,f'{s["id"]}: missing {lang} unrun boundary')
        if lang=='en':require(not re.search('[\u3400-\u9fff]',text),f'{s["id"]}: Chinese instructions in English entry')
        for file in folder.rglob('*.md'):
            for match in re.finditer(r'\[[^\]]*\]\(([^)]+)\)',file.read_text()):
                u=urlsplit(match[1])
                if u.scheme or not u.path:continue
                target=(file.parent/unquote(u.path)).resolve()
                require(target.is_relative_to(folder.resolve()),f'{file.relative_to(root)}: reference escapes self-contained Skill: {u.path}')
                require(target.exists(),f'{file.relative_to(root)}: missing reference: {u.path}')
        checked.append({'id':s['id'],'language':lang,'entrypoint':str(entry.relative_to(root))})
    if not all((p/'SKILL.md').is_file() for p in folders.values()):continue
    zh=(folders['zh']/'SKILL.md').read_text();en=(folders['en']/'SKILL.md').read_text()
    require(zh.split('---',2)[1]==en.split('---',2)[1],f'{s["id"]}: translated frontmatter differs')
    if s['category']=='browser':
        a=json.loads((folders['zh']/'assets/result-template.json').read_text());b=json.loads((folders['en']/'assets/result-template.json').read_text());a['language']='en'
        require(a==b,f'{s["id"]}: translated result schema/defaults differ beyond language')
        for f in ['output-contract.md','interpretation.md','sources.md']:
            text=(folders['en']/'references'/f).read_text()
            require(not re.search('[\u3400-\u9fff]',text),f'{s["id"]}: untranslated English reference {f}')
    else:
        a=[json.loads(x) for x in re.findall(r'```json\n(.*?)\n```',zh,re.S)];b=[json.loads(x) for x in re.findall(r'```json\n(.*?)\n```',en,re.S)]
        require(bool(a) and a==b,f'{s["id"]}: translated inline machine template changed')
        if (folders['zh']/'references').exists():
            for f in (folders['zh']/'references').rglob('*'):
                if f.is_file() and ('before' in f.parts or 'after' in f.parts):
                    dest=folders['en']/f.relative_to(folders['zh'])
                    require(dest.is_file() and dest.read_bytes()==f.read_bytes(),f'{s["id"]}: raw fixture evidence changed: {f.name}')
require(len(manifest['skills'])==7 and len(checked)==14,'Expected seven complete Skills in both languages')
result={'scope':'Paired entrypoints, relative references, untranslated required prose, machine schema/defaults and immutable fixtures only','skills':7,'languageEntries':len(checked),'liveExecution':'NOT_RUN','errors':errors}
print(json.dumps(result,ensure_ascii=False))
sys.exit(bool(errors))
