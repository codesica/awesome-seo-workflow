import json,pathlib
R=pathlib.Path(__file__).parent
d=json.loads((R/'workflow.json').read_text())
expected=['01-search-opportunity','02-page-plan','03-content-production','04-publish-check','05-discovery-promotion','06-measure-iterate']
assert [s['id'] for s in d['stages']]==expected
ids=set();sources={s['id'] for s in d['sources']}
def add(id):
 assert id not in ids, id
 ids.add(id)
def bilingual(x):
 assert set(x)=={'zh-CN','en'},x
 assert all(isinstance(v,str) and v.strip() for v in x.values())
for s in d['stages']:
 add(s['contentId']);bilingual(s['title']);bilingual(s['summary'])
 for field in ['goal','nextStep','entryRequirement']:bilingual(s[field])
 for field in ['prerequisites','inputs','tools','deliverables','acceptance','stopConditions']:
  assert len(s[field])>0
  for x in s[field]:bilingual(x)
 assert len(s['actions'])>=4
 for a in s['actions']:
  add(a['id'])
  for k in ['title','instruction','output']:bilingual(a[k])
 assert set(s['sourceIds'])<=sources
 assert bool(s['legacyTutorials'])==(s['order']==4)
 assert s['status']=='editorially-reviewed-not-site-tested'
 for locale in ['zh','en']:assert (R/locale/(s['id']+'.md')).is_file()
for e in d['home']['entries']:assert e['stageId'] in expected
for s in d['sources']:
 assert s['url'].startswith(('https://developers.google.com/','https://support.google.com/'))
 assert s['checkedAt']=='2026-10-10'
for locale in ['zh','en']:
 local=json.loads((R/f'workflow.{locale}.json').read_text())
 assert [s['id'] for s in local['stages']]==expected
 for s in local['stages']:assert isinstance(s['goal'],str)
for t in json.loads((R/'templates.json').read_text())['templates']:
 add(t['id']);assert t['stageId'] in expected
 for f in t['fields']:
  add(f['id']);assert f['value'] is None and f['evidenceStatus']=='not-checked'
print('PASS: 6 bilingual stages, 25 actions, 16 official sources, 6 empty deliverable templates; IDs/locales/references/legacy scope/Markdown validated.')
print('NOT TESTED: live site, real indexing, ranking, growth, account data, execution of any Agent Skill.')
