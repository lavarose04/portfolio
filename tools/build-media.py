"""Generate presentation-only derivatives; never overwrite source artwork."""
import concurrent.futures, hashlib, io, json
from pathlib import Path
from PIL import Image, ImageCms, ImageOps
ROOT=Path(__file__).resolve().parents[1]
INVENTORY=ROOT/'tools/media-inventory.json'
OUTPUT=ROOT/'media';OUTPUT.mkdir(exist_ok=True)
Image.MAX_IMAGE_PIXELS=None
paths=json.loads(INVENTORY.read_text())

def render(rel):
 source=ROOT/rel
 if not source.exists():return rel,{'error':'source missing'}
 with Image.open(source) as opened:
  image=ImageOps.exif_transpose(opened)
  if image.info.get('icc_profile'):
   try:
    image=ImageCms.profileToProfile(image,ImageCms.ImageCmsProfile(io.BytesIO(image.info['icc_profile'])),ImageCms.createProfile('sRGB'),outputMode='RGBA' if 'A' in image.getbands() else 'RGB')
   except (ValueError,OSError):image=image.convert('RGBA' if 'A' in image.getbands() else 'RGB')
  else:image=image.convert('RGBA' if 'A' in image.getbands() else 'RGB')
  width,height=image.size
  sizes=sorted(set(min(s,width) for s in [480,960,1600,2400]))
  stem=hashlib.sha1(rel.encode()).hexdigest()[:12];variants=[]
  for w in sizes:
   target=OUTPUT/f'{stem}-{w}.webp';h=round(height*w/width)
   resized=image.resize((w,h),Image.Resampling.LANCZOS) if w!=width else image
   resized.save(target,'WEBP',quality=88,method=6)
   variants.append({'src':'media/'+target.name,'width':w,'bytes':target.stat().st_size})
 return rel,{'width':width,'height':height,'sourceBytes':source.stat().st_size,'variants':variants}
manifest={}
with concurrent.futures.ThreadPoolExecutor(max_workers=3) as pool:
 for i,(key,value) in enumerate(pool.map(render,paths),1):
  manifest[key]=value
  if i%25==0:print(f'{i}/{len(paths)} images converted',flush=True)
missing=[k for k,v in manifest.items() if 'error' in v]
assert not missing,missing
(ROOT/'media-manifest.js').write_text('window.portfolioMedia='+json.dumps(manifest,ensure_ascii=False,separators=(',',':'))+';\n')
(ROOT/'tools/media-inventory.json').write_text(json.dumps(paths,ensure_ascii=False,indent=2))
summary={'images':len(manifest),'sourceBytes':sum(v['sourceBytes'] for v in manifest.values()),'derivativeBytes':sum(x['bytes'] for v in manifest.values() for x in v['variants'])}
(ROOT/'tools/media-summary.json').write_text(json.dumps(summary,indent=2));print(summary)
