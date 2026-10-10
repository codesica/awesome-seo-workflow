"""Package all original instructions and referenced assets; never execute them."""
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED
import json, shutil
root=Path(__file__).resolve().parents[1]
out=root/'dist/downloads/skills';out.mkdir(parents=True,exist_ok=True)
folders=[]
for category in ['browser','workflow']:
 for folder in sorted((root/'skills'/category).iterdir()):
  if folder.is_dir() and (folder/'SKILL.md').is_file():
   folders.append(folder)
   shutil.copytree(folder,out/folder.name,dirs_exist_ok=True)
   with ZipFile(out/(folder.name+'.zip'),'w',ZIP_DEFLATED) as z:
    for file in sorted(folder.rglob('*')):
     if file.is_file():z.write(file,folder.name+'/'+str(file.relative_to(folder)))
with ZipFile(out/'first-crawl-execution-skills.zip','w',ZIP_DEFLATED) as z:
 for folder in folders:
  for file in sorted(folder.rglob('*')):
   if file.is_file():z.write(file,folder.name+'/'+str(file.relative_to(folder)))
templates=json.loads((root/'content/workflow/templates.json').read_text())['templates']
for lang in ['zh','en']:
 dest=root/'dist/downloads/templates'/lang;dest.mkdir(parents=True,exist_ok=True)
 for t in templates:
  payload={'templateId':t['id'],'stageId':t['stageId'],'fields':[{'id':f['id'],'label':f['label']['zh-CN' if lang=='zh' else 'en'],'value':f['value'],'evidenceStatus':f['evidenceStatus']} for f in t['fields']]}
  (dest/(t['id'].replace('template.','')+'.json')).write_text(json.dumps(payload,ensure_ascii=False,indent=2)+'\n')
print('Packaged',len(folders),'original Skills and 12 localized blank templates.')
