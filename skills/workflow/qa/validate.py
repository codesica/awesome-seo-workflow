#!/usr/bin/env python3
"""Check local packaging and synthetic invariants. Does not validate live SEO outcomes."""
from pathlib import Path
import json
from datetime import datetime,timezone
P=Path(__file__).resolve().parents[1]
index=json.loads((P/'index.json').read_text())
I=json.loads((P/'examples/synthetic-input.json').read_text())
O=json.loads((P/'examples/synthetic-output.json').read_text())
checks=[]
def check(name, condition):
    checks.append({'check':name,'pass':bool(condition)})
check('Exactly six distinct workflow stages',len(index['stages'])==6 and len({x['id'] for x in index['stages']})==6)
check('At least four original skills',len(index['skills'])>=4)
for s in index['skills']:
    md=(P/s['skill_path']).read_text()
    check(s['id']+': frontmatter and required sections',md.startswith('---\nname: '+s['id']) and all(h in md for h in ['## 输入','## 步骤','## 产物模板','## 固定验收','## 停止条件','## 状态与边界','## 官方依据']))
    check(s['id']+': bilingual web metadata', all(set(s[f])=={'zh-CN','en'} for f in ['title','summary','inputs','outputs','prompt']))
    check(s['id']+': truthful execution status',s['production_status']=='NOT_RUN')
    template = json.loads(__import__('re').findall(r'```json\n(.*?)\n```', md, __import__('re').S)[0])
    example_key = {'seo-opportunity-evidence':'opportunity','seo-page-brief':'page','seo-publish-audit':'audit','seo-measure-decide':'measure'}[s['id']]
    check(s['id']+': template fields present in synthetic output', set(template).issubset(O[example_key]))
check('No invented volume',I['opportunity']['paid_volume_data'] is None and O['opportunity']['search_volume'] is None and O['opportunity']['volume_status']=='unknown')
check('No invented SERP observation',not I['opportunity']['serp_observations'] and O['opportunity']['serp_status']=='SERP_NOT_OBSERVED')
check('All seven technical checks covered',set(x['id'] for x in O['audit']['checks'])=={'http','robots','noindex','canonical','sitemap','lang','internal-links'})
check('Local noindex blocker recognized',next(x for x in O['audit']['checks'] if x['id']=='noindex')['status']=='FAIL' and O['audit']['technical_decision']=='blocked')
check('Missing headers do not become HTTP pass',I['audit']['headers'] is None and next(x for x in O['audit']['checks'] if x['id']=='http')['status']=='UNKNOWN')
check('Synthetic CTR arithmetic',O['measure']['ctr']==I['measure']['observation']['clicks']/I['measure']['observation']['impressions'])
check('No baseline means no lift claim',I['measure']['baseline'] is None and O['measure']['click_delta'] is None and O['measure']['relative_click_change'] is None and O['measure']['comparison_status']=='baseline_missing')
check('No causal or commercial success claim',O['measure']['causal_claim']=='NOT_ESTABLISHED' and O['business_success_claim'] is False)
check('Production and indexing not fabricated',O['production_status']=='NOT_RUN' and O['indexing_status']=='UNKNOWN')
result={'checked_at':datetime.now(timezone.utc).isoformat(),'result':'PASS' if all(c['pass'] for c in checks) else 'FAIL','scope':'Local file structure, synthetic output fields and data invariants only','production_status':'NOT_RUN','live_site_test':'NOT_RUN','independent_agent_forward_test':'NOT_RUN','checks':checks}
(P/'qa/validation.json').write_text(json.dumps(result,ensure_ascii=False,indent=2))
print(json.dumps({'result':result['result'],'checks':len(checks),'failures':[c for c in checks if not c['pass']]},ensure_ascii=False))
raise SystemExit(0 if result['result']=='PASS' else 1)
