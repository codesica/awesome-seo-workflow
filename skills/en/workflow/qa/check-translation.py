#!/usr/bin/env python3
"""Local translation checks only; no network or live execution."""
from pathlib import Path
import json,re,hashlib
D=Path(__file__).resolve().parents[1]
M=json.loads((D/'qa/translation-manifest.json').read_text());S=(D/Path(M['source_root'])).resolve()
CJK=re.compile('[\u3400-\u9fff]')
checks=[];exceptions=[];unexpected=[]
def check(name,ok):checks.append({'check':name,'pass':bool(ok)})
def walk(x,p=()):
 if isinstance(x,dict):
  for k,v in x.items():yield from walk(v,p+(k,))
 elif isinstance(x,list):
  for i,v in enumerate(x):yield from walk(v,p+(str(i),))
 else:yield p,x
for f in sorted(D.rglob('*')):
 if not f.is_file() or f.suffix=='.zip' or f.name in ['translation-manifest.json','translation-validation.json']:continue
 rel=str(f.relative_to(D));txt=f.read_text()
 if f.suffix=='.json':
  for path,v in walk(json.loads(txt)):
   if isinstance(v,str) and CJK.search(v):
    approved='zh-CN' in path or (rel=='examples/synthetic-input.json' and path in [('audit','html'),('audit','parent_html')])
    (exceptions if approved else unexpected).append({'file':rel,'field':'.'.join(path),'reason':'Preserved bilingual metadata or original zh-CN raw fixture evidence' if approved else 'Untranslated prose'})
 elif CJK.search(txt):
  (exceptions if f.name=='README.zh.md' else unexpected).append({'file':rel,'reason':'Preserved optional Chinese reference companion' if f.name=='README.zh.md' else 'Untranslated prose'})
check('No unexplained Chinese in English instructions or human-readable outputs',not unexpected)
for entry in M['files']:
 src=S/entry['source'];dst=D/entry['target'] if entry.get('target') else None
 if entry['source']=='qa/validation.json' and dst:
  source_record=json.loads(src.read_text());translated_record=json.loads(dst.read_text())
  source_record.pop('checked_at',None);translated_record.pop('checked_at',None)
  check('QA checks, scope and statuses preserved; local run timestamp may differ',source_record==translated_record)
 else:
  check('Source unchanged: '+entry['source'],hashlib.sha256(src.read_bytes()).hexdigest()==entry['source_sha256'])
 if dst and src.suffix=='.json' and entry['source'] not in ['qa/validation.json','qa/download-manifest.json']:
  a=dict(walk(json.loads(src.read_text())));b=dict(walk(json.loads(dst.read_text())))
  check('JSON structure preserved: '+entry['source'],a.keys()==b.keys())
  unchanged=all(b[p]==v for p,v in a.items() if not (isinstance(v,str) and CJK.search(v)) and not (entry['source']=='index.json' and p==('content_language',)))
  check('Machine values, dates, URLs, numbers and null preserved: '+entry['source'],unchanged)
 if dst and src.name=='SKILL.md':
  a=src.read_text();b=dst.read_text()
  check('Frontmatter preserved: '+entry['source'],a.split('---',2)[1]==b.split('---',2)[1])
  check('JSON template unchanged: '+entry['source'],re.findall(r'```json\n(.*?)\n```',a,re.S)==re.findall(r'```json\n(.*?)\n```',b,re.S))
  check('Source URLs preserved: '+entry['source'],re.findall(r'https://[^)\s]+',a)==re.findall(r'https://[^)\s]+',b))
  check('Status and no-live-run boundary retained: '+entry['source'],'source-reviewed' in b and 'production_status: NOT_RUN' in b and '2026-10-10' in b)
result={'result':'PASS' if all(c['pass'] for c in checks) else 'FAIL','scope':'Translation coverage, source-file hashes, JSON compatibility, templates and source links only','live_site_test':'NOT_RUN','validation_record_timestamp_policy':'Compare QA scope/checks/statuses; its local checked_at timestamp may differ from the translator snapshot. Chinese source records are not modified.','checks':checks,'declared_language_exceptions':exceptions,'unexpected_language_findings':unexpected}
(D/'qa/translation-validation.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n')
print(json.dumps({'result':result['result'],'checks':len(checks),'declared_language_exceptions':len(exceptions),'unexpected_language_findings':unexpected,'failures':[c for c in checks if not c['pass']]}))
raise SystemExit(result['result']!='PASS')
