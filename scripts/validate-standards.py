"""Offline, standard-library-only checks. Never certify aesthetics or research outcomes."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit,parse_qs
from datetime import datetime,timezone
import hashlib,ipaddress,json,re,struct,sys

ROOT=Path(__file__).resolve().parents[1]
errors=[]
def require(value,message):
    if not value:errors.append(message)
def read(path):return json.loads(path.read_text())
def unique(items,label):require(len(items)==len(set(items)),f'Duplicate {label}')
def webp_size(data):
    require(data[:4]==b'RIFF' and data[8:12]==b'WEBP','Invalid WebP container')
    offset=12
    while offset+8<=len(data):
        kind=data[offset:offset+4];length=int.from_bytes(data[offset+4:offset+8],'little');chunk=data[offset+8:offset+8+length]
        if kind==b'VP8 ':return tuple(v&0x3fff for v in struct.unpack('<HH',chunk[6:10]))
        if kind==b'VP8X':return (1+int.from_bytes(chunk[4:7],'little'),1+int.from_bytes(chunk[7:10],'little'))
        if kind==b'VP8L':
            bits=int.from_bytes(chunk[1:5],'little');return ((bits&0x3fff)+1,((bits>>14)&0x3fff)+1)
        offset+=8+length+(length%2)
    raise ValueError('WebP dimensions unavailable')

directory=ROOT/'public/images/editorial'
manifest=read(directory/'manifest.json');images=manifest['images'];records=read(directory/'generation-records.json')['records']
keys={'hero','need','making','discovery','promotion','experiment','agent'}
require({i['key'] for i in images}==keys and len(images)==7,'Exactly seven distinct generated illustrations are required')
unique([i['original_sha256'] for i in images],'original image hashes');unique([i['id'] for i in images],'asset IDs');unique([r['asset'] for r in records],'generation records')
record_map={r['asset']:r for r in records};original_checks=0;webp_files=set()
for image in images:
    label=image['key'];record=record_map.get(image['original'])
    require(record is not None,f'{label}: missing actual generation record')
    if record:
        require(record.get('tool')=='image_gen' and bool(record.get('parameters',{}).get('prompt')),f'{label}: missing actual tool/prompt')
        require('model' in record and 'exact_generated_at' in record,f'{label}: use unknown for unavailable model/time')
    require(bool(re.fullmatch('[0-9a-f]{64}',image['original_sha256'])),f'{label}: missing original hash')
    original=(ROOT/image['original_path']).resolve();require(original.is_relative_to(ROOT),f'{label}: original path escapes project')
    if original.exists():
        data=original.read_bytes();require(hashlib.sha256(data).hexdigest()==image['original_sha256'],f'{label}: original hash mismatch')
        require(data[:8]==b'\x89PNG\r\n\x1a\n' and struct.unpack('>II',data[16:24])==(1536,1024),f'{label}: original PNG dimensions mismatch');original_checks+=1
    require({v['width'] for v in image['variants']}=={640,1000,1536},f'{label}: responsive width set incomplete')
    require(bool(image.get('conversion')),f'{label}: missing conversion record')
    for variant in image['variants']:
        path=(directory/variant['file']).resolve();require(path.is_relative_to(directory.resolve()),f'{label}: derivative path escapes image directory')
        if not path.exists():require(False,f'{label}: missing derivative');continue
        data=path.read_bytes();require(webp_size(data)==(variant['width'],variant['height']),f'{label}: derivative dimensions mismatch')
        require(len(data)==variant['bytes'] and hashlib.sha256(data).hexdigest()==variant['sha256'],f'{label}: derivative hash/size mismatch')
        require(len(data)<750_000,f'{label}: derivative exceeds 750 KB budget');webp_files.add('/images/editorial/'+variant['file'])

class Page(HTMLParser):
    def __init__(self):super().__init__();self.lang=None;self.images=[];self.language_links={};self.code_depth=0;self.emoji=[]
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if tag=='html':self.lang=a.get('lang')
        if tag in ('pre','code'):self.code_depth+=1
        if tag=='img' and '/images/editorial/' in a.get('src',''):self.images.append(a)
        if tag=='a' and 'data-language' in a:self.language_links[a['data-language']]=a.get('href')
    def handle_endtag(self,tag):
        if tag in ('pre','code'):self.code_depth=max(0,self.code_depth-1)
    def handle_data(self,data):
        if not self.code_depth:
            self.emoji.extend(c for c in data if 0x1f000<=ord(c)<=0x1faff or 0x2600<=ord(c)<=0x27bf or ord(c) in (0x2196,0x2197,0x2198,0x2199))

info=read(ROOT/'dist/build-info.json');image_uses=0
for route in info['pages']:
    path=ROOT/'dist'/route.strip('/')/'index.html';page=Page();page.feed(path.read_text());lang='zh' if route.startswith('/zh/') else 'en';base=route[3:]
    require(page.lang==('zh-CN' if lang=='zh' else 'en'),f'{route}: incorrect language')
    require(page.language_links=={'zh':'/zh'+base,'en':'/en'+base},f'{route}: language switch must preserve corresponding page')
    require(not page.emoji,f'{route}: decorative emoji or pictographic arrows in rendered prose')
    for i,a in enumerate(page.images):
        require(bool(a.get('alt')) and bool(a.get('width')) and bool(a.get('height')),f'{route}: illustration alt/dimensions missing')
        require(a.get('src') in webp_files,f'{route}: illustration source not in verified manifest')
        require(bool(a.get('sizes')),f'{route}: responsive sizes missing')
        candidates=a.get('srcset','').split(',')
        require(len(candidates)==3 and all(c.strip().split()[0] in webp_files for c in candidates if c.strip()),f'{route}: srcset references missing')
        require(a.get('loading')==('eager' if i==0 else 'lazy'),f'{route}: incorrect loading priority')
        image_uses+=1

statuses={'NOT_RUN','PASS','FAIL','BLOCKED'}
def validate_record(obj,path,template=False):
    label=str(path.relative_to(ROOT));is_qa='checks' in obj
    fields={'schema_version','record_kind','failures','criteria_changes'}|({'page_id','language_pair','checks'} if is_qa else {'id','question','scope','prior_judgment','acceptance_criteria','sources','new_evidence','current_conclusion','conflicting_evidence','unknowns','next_experiment','validation'})
    require(fields<=set(obj),f'{label}: required evidence/QA fields missing')
    require(obj.get('record_kind')==('template' if template else 'record'),f'{label}: template is not a completed record')
    source_ids={s.get('id') for s in obj.get('sources',[])};unique([s.get('id') for s in obj.get('sources',[])],label+' source IDs')
    def walk(value):
        if isinstance(value,list):
            for child in value:walk(child)
        elif isinstance(value,dict):
            if 'status' in value:
                status=value['status'];require(status in statuses,f'{label}: invalid status')
                require(not(template and status!='NOT_RUN'),f'{label}: template cannot claim an execution result')
                require(status!='PASS' or bool(value.get('evidence')),f'{label}: PASS needs observation references')
                require(status not in {'FAIL','BLOCKED'} or bool(obj.get('failures')),f'{label}: failure/block needs a failure record')
                require(status!='NOT_RUN' or not value.get('evidence'),f'{label}: NOT_RUN cannot contain passing evidence')
            for key,child in value.items():
                if key=='source_ids':require(set(child)<=source_ids,f'{label}: unresolved source IDs')
                if key=='checked_at' and child:
                    try:
                        date=datetime.fromisoformat(child.replace('Z','+00:00'));require(date.tzinfo is not None and date<=datetime.now(timezone.utc),f'{label}: check date must have timezone and not be future')
                    except ValueError:require(False,f'{label}: invalid check date')
                if key=='url' and child:
                    u=urlsplit(child);safe=u.scheme in {'https','http'} and bool(u.hostname) and not u.username and not u.password and not u.hostname.endswith(('.local','.internal')) and u.hostname!='localhost'
                    try:safe=safe and not ipaddress.ip_address(u.hostname).is_private
                    except ValueError:pass
                    require(safe and not any(re.search('token|secret|password|api.?key',k,re.I) for k in parse_qs(u.query)),f'{label}: unsafe public URL')
                walk(child)
    walk(obj)
    if not template:
        require('REPLACE_WITH_' not in json.dumps(obj),f'{label}: unresolved placeholder')
        if not is_qa:
            require(all(obj.get('question',{}).get(l) for l in ('zh','en')),f'{label}: bilingual question missing')
            for source in obj.get('sources',[]):
                resource=source.get('resource')
                if resource and resource.get('reuse_mode') in {'adapted','copied'}:require(resource.get('license_id') not in {None,'','UNKNOWN'} and bool(resource.get('license_url')),f'{label}: copied/adapted resource requires permission reference')

templates=['evidence-record.template.json','content-qa-checklist.json']
for name in templates:validate_record(read(ROOT/'docs/standards'/name),ROOT/'docs/standards'/name,True)
record_count=0
for folder in ('content/evidence','content/qa'):
    for path in (ROOT/folder).glob('*.json'):validate_record(read(path),path);record_count+=1
result={'result':'FAIL' if errors else 'PASS','scope':'Offline file paths, actual image hashes/dimensions/bytes, responsive markup, localized route correspondence, decorative emoji and evidence/QA structure','pages':len(info['pages']),'illustrations':len(images),'verified_derivatives':len(webp_files),'originals_checked':original_checks,'image_uses':image_uses,'templates':'2 structure checks only; templates are NOT research results','new_research_records':record_count,'not_certified':['visual aesthetics','alt wording quality','human source review','screen-reader usability','real novice tests','indexing/ranking/traffic/conversion/revenue'],'errors':errors}
print(json.dumps(result,ensure_ascii=False))
sys.exit(1 if errors else 0)
