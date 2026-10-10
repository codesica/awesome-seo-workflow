"""Package complete Chinese/English original Skills; never install or execute them."""
from pathlib import Path
from zipfile import ZipFile, ZipInfo, ZIP_DEFLATED
import argparse, hashlib, json, shutil

parser=argparse.ArgumentParser()
parser.add_argument('--version',required=True)
parser.add_argument('--commit',required=True)
parser.add_argument('--repository',required=True)
args=parser.parse_args()

root=Path(__file__).resolve().parents[1]
out=root/'dist/downloads/skills'
out.mkdir(parents=True,exist_ok=True)
manifest=json.loads((root/'skills/locales.json').read_text())
license_bytes=(root/'LICENSE').read_bytes()
downloads=[]
release= root/'dist/downloads/releases'/('v'+args.version)
release.mkdir(parents=True,exist_ok=True)

def add_bytes(archive,name,data):
    info=ZipInfo(name,date_time=(1980,1,1,0,0,0))
    info.compress_type=ZIP_DEFLATED
    info.external_attr=0o100644 << 16
    archive.writestr(info,data)

def record(archive,lang,skill):
    filename=f'awesome-seo-workflow-v{args.version}-{lang}-{skill}.zip'
    shutil.copyfile(archive,release/filename)
    downloads.append({'version':args.version,'sourceCommit':args.commit,'language':lang,'skillId':skill,'path':'/downloads/skills/'+lang+'/'+archive.name,'releaseAsset':filename,'fixedVersionURL':args.repository+'/releases/download/v'+args.version+'/'+filename,'sha256':hashlib.sha256(archive.read_bytes()).hexdigest(),'liveExecution':'NOT_RUN'})

def folder_files(folder):
    return [p for p in sorted(folder.rglob('*')) if p.is_file() and p.name!='.DS_Store']

for lang in ['zh','en']:
    destination=out/lang
    destination.mkdir(parents=True,exist_ok=True)
    language_folders=[]
    for skill in manifest['skills']:
        folder=root/skill['languages'][lang]['sourceDirectory']
        if not (folder/'SKILL.md').is_file():
            raise FileNotFoundError(f'Missing complete {lang} Skill: {folder}')
        language_folders.append(folder)
        shutil.copytree(folder,destination/folder.name,dirs_exist_ok=True)
        (destination/folder.name/'LICENSE').write_bytes(license_bytes)
        archive=destination/(folder.name+'.zip')
        with ZipFile(archive,'w',ZIP_DEFLATED) as z:
            for file in folder_files(folder):
                add_bytes(z,folder.name+'/'+str(file.relative_to(folder)),file.read_bytes())
            add_bytes(z,folder.name+'/LICENSE',license_bytes)
        record(archive,lang,folder.name)
    archive=destination/'first-crawl-execution-skills.zip'
    with ZipFile(archive,'w',ZIP_DEFLATED) as z:
        add_bytes(z,'LICENSE',license_bytes)
        add_bytes(z,'README.md',(root/('USAGE.zh-CN.md' if lang=='zh' else 'USAGE.md')).read_bytes())
        for folder in language_folders:
            for file in folder_files(folder):
                add_bytes(z,folder.name+'/'+str(file.relative_to(folder)),file.read_bytes())
            add_bytes(z,folder.name+'/LICENSE',license_bytes)
    record(archive,lang,'all-seven')

# The eight original unprefixed download URLs and raw directories remain Chinese.
for skill in manifest['skills']:
    id=skill['id']
    shutil.copytree(out/'zh'/id,out/id,dirs_exist_ok=True)
    shutil.copyfile(out/'zh'/(id+'.zip'),out/(id+'.zip'))
shutil.copyfile(out/'zh/first-crawl-execution-skills.zip',out/'first-crawl-execution-skills.zip')
release_manifest={'version':args.version,'sourceCommit':args.commit,'repository':args.repository,'releaseTag':'v'+args.version,'releaseURL':args.repository+'/releases/tag/v'+args.version,'instructionLanguages':['zh-CN','en'],'legacyDownloadsLanguage':'zh-CN','downloads':downloads}
manifest_text=json.dumps(release_manifest,ensure_ascii=False,indent=2)+'\n'
(out/'manifest.json').write_text(manifest_text)
(release/'manifest.json').write_text(manifest_text)
(release/'SHA256SUMS.txt').write_text(''.join(d['sha256']+'  '+d['releaseAsset']+'\n' for d in downloads))

templates=json.loads((root/'content/workflow/templates.json').read_text())['templates']
for lang in ['zh','en']:
    dest=root/'dist/downloads/templates'/lang
    dest.mkdir(parents=True,exist_ok=True)
    for t in templates:
        payload={'templateId':t['id'],'stageId':t['stageId'],'fields':[{'id':f['id'],'label':f['label']['zh-CN' if lang=='zh' else 'en'],'value':f['value'],'evidenceStatus':f['evidenceStatus']} for f in t['fields']]}
        (dest/(t['id'].replace('template.','')+'.json')).write_text(json.dumps(payload,ensure_ascii=False,indent=2)+'\n')
print('Packaged 7 original Skills in each language, 8 Chinese compatibility aliases and 12 localized blank templates.')
