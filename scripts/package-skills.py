"""Package complete Chinese/English original Skills; never install or execute them."""
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED
import hashlib, json, shutil

root=Path(__file__).resolve().parents[1]
out=root/'dist/downloads/skills'
out.mkdir(parents=True,exist_ok=True)
manifest=json.loads((root/'skills/locales.json').read_text())
license_bytes=(root/'LICENSE').read_bytes()
downloads=[]

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
                z.write(file,folder.name+'/'+str(file.relative_to(folder)))
            z.writestr(folder.name+'/LICENSE',license_bytes)
        downloads.append({'language':lang,'skillId':folder.name,'path':'/downloads/skills/'+lang+'/'+archive.name,'sha256':hashlib.sha256(archive.read_bytes()).hexdigest(),'liveExecution':'NOT_RUN'})
    archive=destination/'first-crawl-execution-skills.zip'
    with ZipFile(archive,'w',ZIP_DEFLATED) as z:
        z.writestr('LICENSE',license_bytes)
        z.write(root/('USAGE.zh-CN.md' if lang=='zh' else 'USAGE.md'),'README.md')
        for folder in language_folders:
            for file in folder_files(folder):
                z.write(file,folder.name+'/'+str(file.relative_to(folder)))
            z.writestr(folder.name+'/LICENSE',license_bytes)
    downloads.append({'language':lang,'skillId':'all-seven','path':'/downloads/skills/'+lang+'/'+archive.name,'sha256':hashlib.sha256(archive.read_bytes()).hexdigest(),'liveExecution':'NOT_RUN'})

# The eight original unprefixed download URLs and raw directories remain Chinese.
for skill in manifest['skills']:
    id=skill['id']
    shutil.copytree(out/'zh'/id,out/id,dirs_exist_ok=True)
    shutil.copyfile(out/'zh'/(id+'.zip'),out/(id+'.zip'))
shutil.copyfile(out/'zh/first-crawl-execution-skills.zip',out/'first-crawl-execution-skills.zip')
(out/'manifest.json').write_text(json.dumps({'instructionLanguages':['zh-CN','en'],'legacyDownloadsLanguage':'zh-CN','downloads':downloads},ensure_ascii=False,indent=2)+'\n')

templates=json.loads((root/'content/workflow/templates.json').read_text())['templates']
for lang in ['zh','en']:
    dest=root/'dist/downloads/templates'/lang
    dest.mkdir(parents=True,exist_ok=True)
    for t in templates:
        payload={'templateId':t['id'],'stageId':t['stageId'],'fields':[{'id':f['id'],'label':f['label']['zh-CN' if lang=='zh' else 'en'],'value':f['value'],'evidenceStatus':f['evidenceStatus']} for f in t['fields']]}
        (dest/(t['id'].replace('template.','')+'.json')).write_text(json.dumps(payload,ensure_ascii=False,indent=2)+'\n')
print('Packaged 7 original Skills in each language, 8 Chinese compatibility aliases and 12 localized blank templates.')
