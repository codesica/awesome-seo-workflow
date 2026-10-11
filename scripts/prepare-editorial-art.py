"""Compress the supplied original illustrations; retain originals separately."""
from pathlib import Path
from PIL import Image
import hashlib,json

ROOT=Path(__file__).resolve().parents[1]
originals=ROOT/'output/imagegen/originals'
out=ROOT/'public/images/editorial'
out.mkdir(parents=True,exist_ok=True)
sources={
 'hero':'seo-home-hero.png',
 'need':'01-real-demand-research.png',
 'making':'02-create-useful-page.png',
 'discovery':'03-discoverable-page.png',
 'promotion':'seo-targeted-promotion.png',
 'experiment':'seo-evidence-iteration.png',
 'agent':'seo-human-agent-review.png',
}
manifest={'generation':'Built-in imagegen; conceptual editorial illustrations, not observed SEO evidence','images':[]}
for key,name in sources.items():
 source=originals/name
 if not source.exists():continue
 with Image.open(source) as image:
  assert image.size==(1536,1024),f'Unexpected dimensions: {name}'
  image=image.convert('RGB')
  entry={'key':key,'original':name,'id':'seo-editorial-'+key+'-v1','original_path':str(source.relative_to(ROOT)),'generation_record':'generation-records.json','original_sha256':hashlib.sha256(source.read_bytes()).hexdigest(),'variants':[]}
  for width in [640,1000,1536]:
   height=round(width*2/3)
   target=out/f'{key}-{width}.webp'
   image.resize((width,height),Image.Resampling.LANCZOS).save(target,'WEBP',quality=88,method=6)
   entry['conversion']='python3 scripts/prepare-editorial-art.py (Pillow LANCZOS, WebP quality 88, method 6)'
   entry['variants'].append({'file':target.name,'width':width,'height':height,'bytes':target.stat().st_size,'sha256':hashlib.sha256(target.read_bytes()).hexdigest()})
  manifest['images'].append(entry)
(out/'manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n')
print(json.dumps({'illustrations':len(manifest['images']),'webp_bytes':sum(v['bytes'] for i in manifest['images'] for v in i['variants'])}))
