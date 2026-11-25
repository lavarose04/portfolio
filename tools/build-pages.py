"""Build static, shareable case pages; query-string legacy URLs remain supported."""
import html,json,re
from pathlib import Path
from PIL import Image
ROOT=Path(__file__).resolve().parents[1]
records=json.loads((ROOT/'tools/project-records.json').read_text())
snapshots=json.loads((ROOT/'tools/page-snapshots.json').read_text())
manifest=json.loads((ROOT/'media-manifest.js').read_text().removeprefix('window.portfolioMedia=').strip().removesuffix(';'))
ORIGIN='https://lavarose04.github.io/portfolio/'
def escaped(value):return html.escape(str(value),quote=True)
def metadata(markup,title,description,filename,image):
 markup=re.sub(r'<!-- SHARE_META_START -->[\s\S]*?<!-- SHARE_META_END -->\s*','',markup)
 markup=re.sub(r'<title>[\s\S]*?</title>',f'<title>{escaped(title)}</title>',markup,count=1)
 markup=re.sub(r'\s*<meta\b[^>]*(?:name="description"|property="og:[^"]+"|name="twitter:[^"]+")[^>]*>','',markup)
 markup=re.sub(r'\s*<link\b[^>]*rel="canonical"[^>]*>','',markup)
 fields=[f'<meta name="description" content="{escaped(description)}">',f'<link rel="canonical" href="{ORIGIN+filename}">']
 for key,value in {'type':'website','site_name':'MY Portfolio','title':title,'description':description,'url':ORIGIN+filename,'image':ORIGIN+image,'image:width':'1200','image:height':'630','image:alt':title}.items():fields.append(f'<meta property="og:{key}" content="{escaped(value)}">')
 for key,value in {'card':'summary_large_image','title':title,'description':description,'image':ORIGIN+image}.items():fields.append(f'<meta name="twitter:{key}" content="{escaped(value)}">')
 return markup.replace('</head>','<!-- SHARE_META_START -->\n  '+'\n  '.join(fields)+'\n<!-- SHARE_META_END -->\n</head>')
def share_card(image_path,target):
 with Image.open(image_path) as src:
  art=src.convert('RGBA');art.thumbnail((1080,550),Image.Resampling.LANCZOS)
  bg=Image.new('RGBA',(1200,630),'#f5f4ee');bg.alpha_composite(art,((1200-art.width)//2,(630-art.height)//2));bg.convert('RGB').save(target,'JPEG',quality=88,optimize=True)
media=ROOT/'media'
share_card(ROOT/'icon-512.png',media/'share-site.jpg')
for name,title,desc in [('index.html','MY Portfolio','MY Portfolio 个人设计作品集，涵盖品牌、角色与IP、数字媒体、书籍和空间设计。'),('work.html','作品 — MY Portfolio','按年份与设计类别浏览 MY Portfolio 的设计作品。'),('project.html','作品详情 — MY Portfolio','浏览 MY Portfolio 的设计过程、图像与作品细节。')]:
 file=ROOT/name;file.write_text(metadata(file.read_text(),title,desc,name,'media/share-site.jpg'))
base=(ROOT/'project.html').read_text()
for record in records:
 id=record['id'];snap=snapshots[id];filename=f'project-{id}.html'
 description=record.get('introduction') or record.get('description') or record.get('storySections',[{}])[0].get('paragraphs') or f"{record['title']} · 设计作品与项目过程。"
 if isinstance(description,list):description=next((x for x in description if isinstance(x,str)),record['title'])
 description=re.sub('<[^>]+>','',description).strip();description=description[:155]+('…' if len(description)>155 else '')
 source=record['image'];entry=manifest.get(source)
 if entry:source=entry['variants'][-1]['src']
 if source.endswith('.svg'):
  # Preserve the phone illustration; use its associated project raster if available.
  source=next((x['src'] for x in record.get('graduationImages',[]) if x.get('src','').endswith(('.png','.jpg','.webp'))),'icon-512.png')
 share=f'media/share-{id}.jpg';share_card(ROOT/source,ROOT/share)
 page=metadata(base,snap['title'],description,filename,share)
 page=page.replace('<meta charset="UTF-8">',f'<meta charset="UTF-8">\n <meta name="portfolio-project-id" content="{escaped(id)}">',1)
 page=re.sub(r'<main\b[^>]*id="project-detail"[^>]*>\s*</main>',lambda _:snap['main'],page,count=1)
 page=re.sub(r'<body[^>]*>',f'<body class="{escaped(snap["bodyClass"])}">',page,count=1)
 page=page.replace('<html lang="zh-CN">',f'<html lang="zh-CN" class="{escaped(snap["htmlClass"])}">',1)
 (ROOT/filename).write_text(page)
print(f'Built {len(records)} static cases with initial project titles, summaries and 1200×630 share images')
