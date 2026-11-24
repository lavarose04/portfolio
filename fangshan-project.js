window.renderFangshanProject=function(detail,project){
 const base='assets/fangshan-haoshi/';
 const images={
  '01-brand-mark':[600,600,'房山好柿标志：柿子轮廓与印章式文字'],
  '02-colors':[1918,564,'品牌标准色：柿子橙、琉璃黄与古树棕'],
  '03-making':[920,910,'采摘、清洗、削皮、晾晒、揉搓与捂霜六道工艺插画'],
  '04-gift-box':[1918,1013,'房山好柿精装礼盒：橙色盒身与金色缠枝柿纹'],
  'gift-exterior':[2048,2048,'精装礼盒外包装：金色缠枝柿纹与橙色盒身'],
  'gift-display':[1024,1024,'精装礼盒组合展示：礼盒、柿子与石台场景'],
  '05-gift-open':[1920,1080,'礼盒内部：分格柿饼陈列与盒盖内侧的手工工艺插画'],
  'souvenir-scene':[2560,1440,'流心柿饼伴手礼：橙色花窗提盒与枯枝石台场景'],
  'souvenir-inner':[2560,1440,'伴手礼内部柿饼独立包装：透明袋、托盘与不涩口流心甜字样'],
  '07-ice-persimmon':[1918,966,'一口冰沁柿：蓝橙配色桶装与便携小杯组合'],
  'magnet-packaging':[1024,1024,'柿纹冰箱贴与橙色纹样包装展示'],
  '08-magnet':[700,655,'柿子缠枝纹冰箱贴设计'],
  'merchandise-scene':[2560,1440,'品牌文创：帆布袋、笔记本、卡片与手机壳'],
  '10-wechat':[930,965,'公众号页面设计提案'],
  '11-xiaohongshu':[960,940,'小红书内容展示提案'],
  '12-douyin':[470,940,'抖音直播间展示提案']
 };
 const figure=(key,caption,cls='')=>{
  const [width,height,alt]=images[key];const src=base+key+'.png';
  return `<figure class="fangshan-figure ${cls}"><a href="${src}" data-fangshan-image aria-label="放大查看：${alt}"><img src="${src}" alt="${alt}" width="${width}" height="${height}" loading="${cls==='fangshan-hero'?'eager':'lazy'}" decoding="async"></a>${caption?`<figcaption>${caption}</figcaption>`:''}</figure>`;
 };
 const copy=(...indices)=>`<div class="book-body">${indices.map(i=>`<p>${project.description[i]}</p>`).join('')}</div>`;
 const heading=(n,en,title)=>`<header class="fangshan-section-heading"><p class="eyebrow">${n} / ${en}</p><h2>${title}</h2></header>`;
 document.title='房山好柿 — MY Portfolio';
 detail.classList.add('book-detail','fangshan-detail');
 detail.innerHTML=`<a class="work-back" href="work.html?year=2025&type=brand">←︎ 返回品牌与视觉传播</a>
 <div class="detail-heading book-heading"><p class="eyebrow">BRAND & PACKAGING / ${window.formatProjectDate(project)}</p><h1>房山好柿</h1><span class="book-heading-category">品牌设计 · 包装设计</span><div class="book-specs"><p>项目类型：包装设计课程作业</p><p>完成时间：${window.formatProjectDate(project)}</p></div></div>
 ${figure('04-gift-box','','fangshan-hero')}
 ${copy(0,1)}
 <section class="fangshan-section" aria-labelledby="fangshan-identity">
 ${heading('01','VISUAL IDENTITY','品牌视觉') .replace('<h2>','<h2 id="fangshan-identity">')}
 <div class="fangshan-mark">${figure('01-brand-mark','品牌标志')}</div>
 ${copy(2)}
 ${figure('02-colors','品牌标准色')}
 </section>
 <section class="fangshan-section" aria-labelledby="fangshan-story">
 ${heading('02','CRAFT & STORY','手工故事').replace('<h2>','<h2 id="fangshan-story">')}
 <div class="fangshan-making">${figure('03-making','手工制柿工艺')}</div>
 <figure class="fangshan-advertisement"><video controls playsinline preload="metadata" poster="assets/fangshan-haoshi/advertisement-poster.jpg" aria-label="房山好柿品牌广告视频"><source src="assets/fangshan-haoshi/advertisement.mp4" type="video/mp4">你的浏览器无法播放此视频，可<a href="assets/fangshan-haoshi/advertisement.mp4">下载观看</a>。</video><figcaption>房山好柿 · 品牌广告</figcaption></figure>
 </section>
 <section class="fangshan-section" aria-labelledby="fangshan-packaging">
 ${heading('03','PACKAGING SERIES','包装系列').replace('<h2>','<h2 id="fangshan-packaging">')}
 ${copy(3)}
 <div class="book-carousel fangshan-gift-carousel" aria-label="精装礼盒横向画廊">
 <div class="book-carousel-track" tabindex="0" aria-label="左右拖动或使用左右方向键浏览精装礼盒">${figure('05-gift-open','精装礼盒 · 内部陈列')}${figure('gift-exterior','精装礼盒 · 外包装')}${figure('gift-display','精装礼盒 · 组合展示')}</div>
 <p class="book-carousel-hint">↔︎ 左右拖动浏览</p></div>
 ${copy(4)}
 ${figure('souvenir-scene','流心柿饼伴手礼','fangshan-souvenir')}
 ${figure('souvenir-inner','内部柿饼 · 独立包装','fangshan-souvenir')}
 ${figure('07-ice-persimmon','一口冰沁柿')}
 </section>
 <section class="fangshan-section" aria-labelledby="fangshan-applications">
 ${heading('04','BRAND APPLICATIONS','衍生与线上应用').replace('<h2>','<h2 id="fangshan-applications">')}
 ${copy(5)}
 <div class="fangshan-magnet-pair">${figure('08-magnet','柿纹冰箱贴')}${figure('magnet-packaging','冰箱贴 · 包装展示')}</div>
 ${figure('merchandise-scene','品牌文创产品')}
 <div class="fangshan-social">${figure('10-wechat','公众号 · 设计提案')}${figure('11-xiaohongshu','小红书 · 设计提案')}${figure('12-douyin','直播间 · 展示提案','fangshan-live')}</div>
 </section>
 <div class="book-detail-links"><a class="work-back" href="work.html?year=2025&type=brand">继续浏览品牌设计 ↗︎</a><a class="work-back" href="index.html">回到首页 ↗︎</a></div>`;
 window.setupBookCarousel(detail.querySelector('.fangshan-gift-carousel'));
 const triggers=[...detail.querySelectorAll('[data-fangshan-image]')];
 window.setupBookViewer({label:'房山好柿图片查看',triggers,photos:triggers.map(a=>({original:a.getAttribute('href'),preview:a.querySelector('img').getAttribute('src'),caption:a.querySelector('img').alt}))});
};
