// Local web previews link to the retained full-resolution source files.
function ipFigure(file,extension,caption,width,height,showCaption=true){
 return `<figure class="ip-document"><a href="assets/haidian-jiwa/${file}.${extension}" target="_blank" rel="noopener" aria-label="放大查看：${caption}（新窗口）"><img src="assets/haidian-jiwa/${file}.webp" alt="${caption}" width="${width}" height="${height}" loading="lazy" decoding="async"></a>${showCaption?`<figcaption>${caption}</figcaption>`:''}</figure>`;
}
const projectID=new URL(location.href).searchParams.get('id');
const projectRecords=[...window.portfolioProjects,...(window.portfolioDraftProjects||[])];
const project=projectRecords.find(p=>p.id===projectID||p.aliases?.includes(projectID));
const detail=document.querySelector('#project-detail');
const projectTools={
 jianying:{image:'jianying',viewBox:'0 0 48 48',width:48,height:48,name:'剪映'},
 ai:{image:'ai',viewBox:'100 100 824 824',width:1024,height:1024,name:'Adobe Illustrator'},
 glyphs:{image:'glyphs',viewBox:'50 50 412 412',width:512,height:512,name:'Glyphs'},
 unity:{image:'unity',extension:'svg',viewBox:'-15.36 -15.36 158.72 158.72',width:128,height:128,name:'Unity'},
 liblib:{image:'liblib',viewBox:'0 0 48 48',width:48,height:48,name:'Liblib'},
 midjourney:{image:'midjourney',extension:'svg',viewBox:'-2.88 -2.88 29.76 29.76',width:24,height:24,name:'Midjourney'},
 figma:{image:'figma',extension:'svg',viewBox:'-2.88 -2.88 29.76 29.76',width:24,height:24,name:'Figma'},
 hunyuan:{image:'hunyuan',extension:'svg',viewBox:'0 0 24 24',width:24,height:24,name:'腾讯混元'},
 gemini:{image:'gemini',extension:'svg',viewBox:'-3 -3 30 30',width:24,height:24,name:'Gemini'},
 jimeng:{image:'jimeng',viewBox:'0 0 64 64',width:64,height:64,name:'即梦'},
 blender:{image:'blender',extension:'svg',viewBox:'-12 -12 152 152',width:128,height:128,name:'Blender'},
 ps:{image:'ps',viewBox:'12 8 54 54',width:72,height:80,name:'Photoshop'},
 id:{image:'id',viewBox:'10 6 54 54',width:72,height:72,name:'InDesign'},
 xingtu:{image:'xingtu',viewBox:'10 12 54 54',width:74,height:78,name:'醒图'},
 procreate:{image:'procreate',extension:'jpg',viewBox:'0 0 512 512',width:512,height:512,name:'Procreate'},
 gpt:{image:'gpt',viewBox:'7 17 56 56',width:70,height:78,name:'ChatGPT'}
};
if(!project){
 detail.innerHTML='<h1>暂未找到这个作品</h1><a class="work-back" href="work.html">返回作品列表 ↗︎</a>';
 }else if(project.format==='pending'){
 document.title=`${project.title} — Li MY`;
 detail.innerHTML=`<a class="work-back" href="project.html?id=haidian-jiwa">←︎ 返回海淀鸡娃</a><div class="detail-heading"><div><h1>${project.title}</h1></div></div><p class="detail-note">作品内容待补充。</p>`;
 }else if(project.id==='lost-property'){
 document.title=`${project.title} — Li MY`;
 detail.classList.add('photo-project-detail','lost-property-detail');
 const images=project.detailImages;
 const figure=(item,cls='')=>`<figure class="ip-document ${cls}"><a href="${item.original}" aria-label="放大查看：${item.caption}"><img src="${item.src}" alt="${item.caption}" width="${item.width}" height="${item.height}" loading="${item===images[0]?'eager':'lazy'}" decoding="async"></a></figure>`;
 const video=item=>`<figure class="graduation-video"><video controls playsinline preload="metadata" poster="${item.poster}" aria-label="${item.caption}"><source src="${item.src}" type="video/mp4">你的浏览器无法播放此视频，可<a href="${item.src}">下载视频</a>。</video><figcaption>${item.caption}</figcaption></figure>`;
 detail.innerHTML=`<a class="work-back" href="work.html?year=2025&type=space">←︎ 返回装置与空间</a>
 <div class="detail-heading"><div><p class="eyebrow">INSTALLATION & SPACE / ${window.formatProjectDate(project)}</p><h1>${project.title}</h1></div><span>${project.outputs.join(' · ')}</span></div>
 ${figure(images[0],'lost-property-single')}
 <section class="book-body"><p>视觉与空间课程<br>合作：${project.collaborators.join('、')}</p>${project.description.map(p=>`<p>${p}</p>`).join('')}</section>
 ${video(project.projectVideos[0])}
 <section class="ip-exhibition-gallery book-carousel" aria-label="情人坡失物簿现场照片"><div class="ip-exhibition book-carousel-track" tabindex="0" role="region" aria-label="现场与布置过程，可左右拖动、滑动或使用方向键浏览">${images.slice(1,-1).map(item=>figure(item)).join('')}</div><p class="book-carousel-hint">↔︎ 左右滑动查看现场 · 点击查看大图</p></section>
 ${video(project.projectVideos[1])}
 ${figure(images[images.length-1],'lost-property-single')}
 <div class="book-detail-links"><a class="work-back" href="work.html?year=2025&type=space">继续浏览装置与空间 ↗︎</a><a class="work-back" href="index.html">回到首页 ↗︎</a></div>`;
 const triggers=[...detail.querySelectorAll('.ip-document a')];
 window.setupBookViewer({label:'情人坡失物簿图片查看',triggers,photos:triggers.map(a=>({original:a.getAttribute('href'),preview:a.querySelector('img').getAttribute('src'),caption:a.querySelector('img').alt}))});
 window.setupBookCarousel(detail.querySelector('.book-carousel'));
 }else if(project.id==='tiangou'){
 document.title=`${project.title} — Li MY`;
 detail.classList.add('photo-project-detail','tiangou-detail');
 const imageByNumber=Object.fromEntries(project.detailImages.map(item=>[item.number,item]));
 const cover={src:project.image,original:project.original,caption:'天狗形象',width:1448,height:1086};
 const figure=item=>`<figure class="tiangou-image"><a href="${item.original}" aria-label="放大查看：${item.caption}"><img src="${item.src}" alt="${item.caption}" width="${item.width}" height="${item.height}" loading="${item===cover?'eager':'lazy'}" decoding="async"></a></figure>`;
 const copy=i=>`<section class="book-body"><p>${project.description[i]}</p></section>`;
 detail.innerHTML=`<a class="work-back" href="work.html?year=2024&type=ip">←︎ 返回 IP 与角色设计</a>
 <div class="detail-heading"><div><p class="eyebrow">CHARACTER & IP / ${window.formatProjectDate(project)}</p><h1>${project.title}</h1></div><span>${project.outputs.join(' · ')}</span></div>
 ${figure(cover)}${copy(0)}
 <section class="tiangou-sketches" aria-label="形象设定过程">${figure(imageByNumber[2])}${figure(imageByNumber[3])}</section>
 ${copy(1)}${figure(imageByNumber[4])}${copy(2)}<section class="tiangou-standard-pair" aria-label="字体与标准形象">${figure(imageByNumber[8])}${figure(imageByNumber[5])}</section>
 <section class="tiangou-states" aria-label="守护与御凶状态对比">
 <div class="tiangou-comparison" style="--reveal:50%">
 <img class="tiangou-compare-base" src="${imageByNumber[7].src}" alt="御凶 · 烈日" width="920" height="1086" loading="lazy" decoding="async">
 <div class="tiangou-compare-overlay"><img src="${imageByNumber[6].src}" alt="守护 · 煦日" width="920" height="1086" loading="lazy" decoding="async"></div>
 <div class="tiangou-compare-divider" aria-hidden="true"><span></span></div>
 <input class="tiangou-compare-range" type="range" min="0" max="100" value="50" aria-label="拖动直线，对比守护和御凶状态" aria-valuetext="守护 50%，御凶 50%">
 </div><p class="tiangou-compare-hint">左右拖动直线，对比两种状态</p>
 <div class="tiangou-compare-links"><a href="${imageByNumber[6].original}">守护 · 煦日</a><a href="${imageByNumber[7].original}">御凶 · 烈日</a></div>
 </section>
 <div class="book-detail-links"><a class="work-back" href="work.html?year=2024&type=ip">继续浏览 IP 与角色设计 ↗︎</a><a class="work-back" href="index.html">回到首页 ↗︎</a></div>`;
 const displayedPhotos=[cover,...[2,3,4,8,5,6,7].map(n=>({...imageByNumber[n]}))];
 const viewerPhotos=displayedPhotos.map(item=>({original:item.original,preview:item.src,caption:item.caption}));
 window.setupBookViewer({label:'天狗形象设计图片查看',triggers:[...detail.querySelectorAll('.tiangou-image a,.tiangou-compare-links a')],photos:viewerPhotos});
 const comparison=detail.querySelector('.tiangou-comparison'),range=detail.querySelector('.tiangou-compare-range');
 const reveal=value=>{const amount=Math.max(0,Math.min(100,Math.round(value)));range.value=String(amount);comparison.style.setProperty('--reveal',`${amount}%`);range.setAttribute('aria-valuetext',`守护 ${amount}%，御凶 ${100-amount}%`)};
 range.addEventListener('input',()=>reveal(Number(range.value)));
 let handleFadeTimer,comparisonDragging=false;
 const showHandle=()=>{clearTimeout(handleFadeTimer);comparison.classList.remove('is-idle')};
 const fadeHandleLater=()=>{clearTimeout(handleFadeTimer);if(!comparisonDragging)handleFadeTimer=setTimeout(()=>comparison.classList.add('is-idle'),1000)};
 comparison.addEventListener('pointerenter',showHandle);
 comparison.addEventListener('pointerleave',fadeHandleLater);
 range.addEventListener('focus',showHandle);
 range.addEventListener('blur',fadeHandleLater);
 range.addEventListener('keydown',showHandle);
 range.addEventListener('pointerdown',()=>{comparisonDragging=true;showHandle()});
 range.addEventListener('pointerup',event=>{comparisonDragging=false;if(event.pointerType!=='mouse'||!comparison.matches(':hover'))fadeHandleLater()});
 range.addEventListener('pointercancel',()=>{comparisonDragging=false;fadeHandleLater()});
 range.addEventListener('lostpointercapture',()=>{if(comparisonDragging){comparisonDragging=false;fadeHandleLater()}});
 fadeHandleLater();
 const revealAt=event=>{const rect=comparison.getBoundingClientRect();reveal((event.clientX-rect.left)/rect.width*100)};
 range.addEventListener('pointerdown',event=>{if(event.button!==0)return;event.preventDefault();range.focus({preventScroll:true});range.setPointerCapture(event.pointerId);revealAt(event)});
 range.addEventListener('pointermove',event=>{if(range.hasPointerCapture(event.pointerId)){event.preventDefault();revealAt(event)}});
 range.addEventListener('pointerup',event=>{if(range.hasPointerCapture(event.pointerId)){revealAt(event);range.releasePointerCapture(event.pointerId)}});
 range.addEventListener('pointercancel',event=>{if(range.hasPointerCapture(event.pointerId))range.releasePointerCapture(event.pointerId)});
 }else if(project.id==='fangshan-haoshi'){
 window.renderFangshanProject(detail,project);
 }else if(project.id==='xiaoshajiang-tea'){
 window.renderTeaProject(detail,project);
 }else if(project.format==='typeface'){
 document.title=`《${project.title}》— Li MY`;
 document.body.classList.add('book-page');
 document.documentElement.classList.add('book-theme');
 detail.classList.add('book-detail','typeface-detail');
 const captions=['字形展示 01：一、茶、饭等十二字','字形展示 02：草、木、领等十二字','字形展示 03：生、情、这等字形与逗号','标点设计','横排与不同字号展示','竖排与不同字号展示'];
 const figure=(n)=>`<figure class="typeface-sheet"><a href="assets/quanying-type/sheet-${n}.png" aria-label="放大查看：${captions[n-1]}"><img src="assets/quanying-type/sheet-${n}${n>=5?'-full':''}.webp" alt="${captions[n-1]}" loading="lazy" decoding="async"></a><figcaption>${captions[n-1]}</figcaption></figure>`;
 const processFigure=(file,alt)=>`<figure><a href="assets/quanying-type/${file}.png" aria-label="放大查看：${alt}"><img src="assets/quanying-type/${file}.webp" alt="${alt}" loading="lazy" decoding="async"></a></figure>`;
 detail.innerHTML=`<a class="work-back" href="work.html?year=2024&type=book">←︎ 返回书籍与编辑设计</a>
 <div class="detail-heading typeface-heading"><div><p class="eyebrow">TYPE DESIGN / ${window.formatProjectDate(project)}</p><h1>《${project.title}》</h1></div><span>字体设计 · 编排设计</span></div>
 <figure class="typeface-strokes"><a href="${project.original}" aria-label="放大查看：笔形设计"><img src="${project.image}" alt="${project.imageAlt}" fetchpriority="high"></a><figcaption>笔形设计 / STROKES</figcaption></figure>
 <div class="book-body"><p>${project.description[0]}</p></div>
 <section class="typeface-process typeface-thinking" aria-labelledby="typeface-thinking"><h2 id="typeface-thinking">前期设计思路</h2>
 <div class="typeface-thinking-row">${processFigure('thinking-proportions','《乙瑛碑》单字整理：扁长字形与比例参考线')}<p>以《乙瑛碑》为例，隶书的绝大部分字形都保持在所画的两条对称红线之间，在竖直方向大概占据 80% 的空间，而在水平方向为 100%。</p></div>
 <div class="typeface-thinking-row typeface-thinking-reverse"><p>受到整体扁长字形的影响，隶书许多字的中宫也多为偏向长而扁的矩形，但部分独体字和上下结构的字，中宫也偏向于正方形，需要根据具体字的间架结构分析设计。</p>${processFigure('thinking-structure','《乙瑛碑》与《曹全碑》部分单字：中宫结构分析')}</div>
 <div class="typeface-thinking-row">${processFigure('thinking-endings','《乙瑛碑》与《曹全碑》部分单字：收笔与藏锋分析')}<p>与大多数书法一样，隶书也遵循“雁不双飞”的原则。而不同的是，除了“捺”之外，“钩”“撇”等笔画都会“藏锋”不出钩，形成隶书独特的含蓄之美。</p></div>
 </section>
 <div class="book-body"><p>${project.description[1]}</p></div>
 <section class="typeface-process typeface-adjustments" aria-labelledby="typeface-adjustments"><h2 id="typeface-adjustments">调整过程</h2>${processFigure('adjustment-process','第一版与第二版字体调整对照：粉色标记粗细微调，蓝色标记笔形问题')}</section>
 <section class="typeface-glyphs typeface-full-row" aria-label="完整字形设计">${[1,2,3,4].map(n=>figure(n).replace(/<figcaption>.*?<\/figcaption>/,'')).join('')}<p class="typeface-full-caption">完整字形设计</p></section>
 <div class="book-body"><p>${project.description[2]}</p></div>
 <section class="typeface-layouts" aria-label="横排与竖排应用">${figure(5)}${figure(6)}</section>
 <div class="book-detail-links"><a class="work-back" href="work.html?year=2024&type=book">继续浏览书籍与编辑设计 ↗︎</a><a class="work-back" href="index.html">回到首页 ↗︎</a></div>`;
 const triggers=[...detail.querySelectorAll('figure a')];
 window.setupBookViewer({label:'隶书全瑛体图片查看',triggers,photos:triggers.map(a=>({original:a.getAttribute('href'),preview:a.querySelector('img').getAttribute('src'),caption:a.querySelector('img').alt}))});
 }else if(project.id==='spring-equinox'){
 document.title=`《${project.title}》— Li MY`;
 document.body.classList.add('book-page');
 document.documentElement.classList.add('book-theme');
 detail.classList.add('book-detail','spring-detail');
 const photo=(n)=>`<figure class="book-photo${n===7?' spring-portrait':''}"><a class="book-photo-open" href="assets/spring-equinox/detail-${n}.jpg" aria-label="放大查看：《春分之歌》特写 ${n}"><img src="assets/spring-equinox/detail-${n}.webp" alt="《春分之歌》版画与手工书细节 ${n}" width="${n===7?1600:2400}" height="${n===7?2400:1600}" loading="lazy" decoding="async"></a></figure>`;
 detail.innerHTML=`<a class="work-back" href="work.html?year=${project.year}&type=book">←︎ 返回书籍与编辑设计</a>
 <div class="detail-heading book-heading"><p class="eyebrow">BOOK & EDITORIAL / ${window.formatProjectDate(project)}</p><h1>《${project.title}》</h1><span class="book-heading-category">手工书 · 版画</span></div>
 <div class="book-body spring-intro"><p>《春分之歌》从环衬的手工纸，再到雕版、印刷、锁线、封面裱装，均为手工制作。</p></div>
 <figure class="spring-overview"><a href="assets/spring-equinox/overview-supplied.png" aria-label="放大查看：《春分之歌》全书总览"><img src="assets/spring-equinox/overview-supplied.png" alt="《春分之歌》全书总览：以燕子、树林和春分三候串联的手工书跨页" fetchpriority="high"></a></figure>
 <div class="book-body">${project.description.map(p=>`<p>${p}</p>`).join('')}</div>
 <section class="book-carousel spring-pages" aria-label="《春分之歌》全书手动翻页">
 <div class="book-carousel-track" tabindex="0" aria-label="全书大图，可左右拖动或使用方向键浏览">${Array.from({length:11},(_,i)=>`<figure class="book-photo"><a class="book-photo-open" href="assets/spring-equinox/page-${i+1}.jpg" aria-label="放大查看：全书第 ${i+1} 幅"><img src="assets/spring-equinox/page-${i+1}.webp" alt="《春分之歌》全书第 ${i+1} 幅" width="3000" height="2000" loading="lazy" decoding="async"></a></figure>`).join('')}</div>
 <div class="spring-page-arrows"><button class="spring-page-arrow spring-page-prev" type="button" data-page-prev aria-label="上一页"><svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="m12 4-6 6 6 6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></button><button class="spring-page-arrow spring-page-next" type="button" data-page-next aria-label="下一页"><svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="m8 4 6 6-6 6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></button></div>
 <div class="spring-playback"><span class="spring-page-counter" role="status" aria-live="polite" aria-label="当前页码">1 / 11</span></div>
 </section>
 <section class="book-carousel" aria-label="《春分之歌》特写滑动画廊"><div class="book-carousel-track" tabindex="0" aria-label="可左右拖动、滑动或使用左右方向键浏览特写">${Array.from({length:9},(_,i)=>photo(i+1)).join('')}</div><p class="book-carousel-hint">↔︎ 左右拖动浏览特写 · 点击查看大图</p></section>
 <div class="book-detail-links"><a class="work-back" href="work.html?year=${project.year}&type=book">继续浏览书籍与编辑设计 ↗︎</a><a class="work-back" href="index.html">回到首页 ↗︎</a></div>`;
 const triggers=[...detail.querySelectorAll('figure a')];
 window.setupBookViewer({label:'《春分之歌》总览与特写',triggers,photos:triggers.map(a=>({original:a.getAttribute('href'),preview:a.querySelector('img').getAttribute('src'),caption:a.querySelector('img').alt}))});
 detail.querySelectorAll('.book-carousel').forEach(carousel=>window.setupBookCarousel(carousel));
 const pages=detail.querySelector('.spring-pages'),track=pages.querySelector('.book-carousel-track');
 const counter=pages.querySelector('.spring-page-counter');
 const reduced=matchMedia('(prefers-reduced-motion:reduce)');
 const pageIndex=()=>Math.max(0,Math.min(10,Math.round(track.scrollLeft/track.clientWidth)));
 const move=delta=>{const next=(pageIndex()+delta+11)%11;track.scrollTo({left:next*track.clientWidth,behavior:reduced.matches||next===0?'instant':'smooth'})};
 pages.querySelector('[data-page-prev]').addEventListener('click',()=>move(-1));
 pages.querySelector('[data-page-next]').addEventListener('click',()=>move(1));
 track.addEventListener('scroll',()=>{counter.textContent=`${pageIndex()+1} / 11`},{passive:true});
 let resizeFrame;window.addEventListener('resize',()=>{cancelAnimationFrame(resizeFrame);resizeFrame=requestAnimationFrame(()=>{track.scrollTo({left:(Number(counter.textContent.split('/')[0])-1)*track.clientWidth,behavior:'instant'})})});
 }else if(project.id==='the-seventh-day'){
 document.title=`《${project.title}》— Li MY`;
 document.body.classList.add('book-page');
 document.documentElement.classList.add('book-theme');
 detail.classList.add('book-detail','seventh-detail');
 const captions=['封面与日历式小册子','终章与七页日历','嵌入内页的黄历与横竖混排','书页与日历的层叠关系','灰色书封与日历封面','黑白与红色的颗粒感插图','日历与镂空书页','第一天：章节页与人物剪影'];
 const files=[24,69,17,61,97,30,73,70];
 const explanation=(number,caption)=>`<figure class="book-photo seventh-explanation seventh-explanation-${number}"><a href="assets/the-seventh-day/introduction-${number}.png" aria-label="放大查看：${caption}"><img src="assets/the-seventh-day/introduction-${number}.webp" alt="${caption}" loading="lazy" decoding="async"></a></figure>`;

 const figure=(file,caption,cls='')=>`<figure class="book-photo ${cls}"><a class="book-photo-open" href="assets/the-seventh-day/${file}.jpg" aria-label="放大查看：${caption}"><img src="assets/the-seventh-day/${file}.webp" alt="${caption}" loading="lazy" decoding="async"></a></figure>`;
 detail.innerHTML=`<a class="work-back" href="work.html?year=${project.year}&type=book">←︎ 返回书籍与编辑设计</a>
 <div class="detail-heading book-heading"><p class="eyebrow">BOOK & EDITORIAL / ${window.formatProjectDate(project)}</p><h1>《${project.title}》</h1><span class="book-heading-category">书籍设计 · 编排 · 装帧</span><div class="book-specs">${project.specs.map(([label,value])=>`<p>${label}：${value}</p>`).join('')}</div></div>
 ${figure('detail-24',captions[0],'seventh-hero')}
 <div class="book-body"><p>${project.introduction}</p></div>
 <div class="book-body"><h2>将七天装进一本书</h2><p>${project.calendar}</p></div>
 ${explanation('05','日历装帧设计说明：封面的伪日历与内册的真日历')}
 <section class="book-carousel" aria-label="《第七天》书籍实拍横向画廊"><div class="book-carousel-track" tabindex="0" aria-label="可左右拖动、滑动或使用左右方向键浏览">${files.map((n,i)=>figure('detail-'+n,captions[i])).join('')}</div><p class="book-carousel-hint">↔︎ 左右拖动浏览 · 点击查看大图</p></section>
 <div class="book-body"><h2>插图的色彩与质地</h2><p>${project.illustration}</p><h2>横竖之间的阅读节奏</h2><p>${project.typography}</p></div>
 ${explanation('06','插图与编排说明：黑白与红色、横竖混排及特殊文本')}
 ${figure('poster','《第七天》书籍设计海报','seventh-poster')}
 <div class="book-detail-links"><a class="work-back" href="work.html?year=${project.year}&type=book">继续浏览书籍与编辑设计 ↗︎</a><a class="work-back" href="index.html">回到首页 ↗︎</a></div>`;
 const triggers=[...detail.querySelectorAll('figure a')];
 window.setupBookViewer({label:'《第七天》实拍与海报',triggers,photos:triggers.map(a=>({original:a.getAttribute('href'),preview:a.querySelector('img').getAttribute('src'),caption:a.querySelector('img').alt}))});
 window.setupBookCarousel(detail.querySelector('.book-carousel'));
 }else if(project.id==='tranquil-utopia'||project.id==='united-nations-candidate'){
 document.title=`${project.title} — Li MY`;
 const isUtopia=project.id==='tranquil-utopia';
 detail.classList.add('media-project-detail',isUtopia?'utopia-detail':'candidate-detail');
 const heading=`<a class="work-back" href="work.html?year=${project.year}&type=${project.primaryCategory}">←︎ 返回作品列表</a><div class="detail-heading"><div><p class="eyebrow">DIGITAL & NEW MEDIA / ${window.formatProjectDate(project)}</p><h1>${project.title}</h1></div><span>${project.outputs.join(' · ')}</span></div>`;
 const mediaCopy=(from,to)=>`<section class="book-body media-project-copy">${project.description.slice(from,to).map(text=>`<p>${text}</p>`).join('')}</section>`;
 const mediaGallery=(items,extraClass='')=>{
  const filtered=items.filter(item=>!isUtopia||!item.src.endsWith('/figma-services.webp'));
  const figures=filtered.map(item=>`<figure><a href="${item.src}" target="_blank" rel="noopener" aria-label="放大查看：${item.caption}（新窗口）"><img src="${item.src}" alt="${item.caption}" width="${item.width}" height="${item.height}" loading="lazy" decoding="async"></a><figcaption>${item.caption}</figcaption></figure>`).join('');
  return isUtopia?`<section class="media-project-gallery media-swipe-gallery book-carousel"><div class="book-carousel-track" tabindex="0" role="region" aria-label="作品图片，可左右拖动浏览">${figures}</div><p class="book-carousel-hint">左右拖动浏览图片</p></section>`:`<section class="media-project-gallery ${extraClass}">${figures}</section>`;
 };
 const pages=Array.from({length:5},(_,i)=>String(i+1).padStart(2,'0'));
 const levels=[{title:'第一关 · 力量',width:9054,height:1951,file:'level-1-v2.webp'},{title:'第二关 · 敏捷',width:8220,height:1772},{title:'第三关 · 公正',width:5093,height:2095}];
 detail.innerHTML=heading+(isUtopia?`
 <section class="utopia-film" aria-label="宁静乌托邦项目视频"><div class="utopia-player"><video controls playsinline preload="metadata" poster="assets/tranquil-utopia/pages/page-01.webp" aria-label="Tranquil Utopia 宁静乌托邦项目视频"><source src="assets/tranquil-utopia/film.mp4" type="video/mp4">你的浏览器无法播放此视频，可<a href="assets/tranquil-utopia/film.mp4">下载视频</a>。</video></div><p class="media-source-link"><a href="https://vimeo.com/1070760767/a8c3a01281" target="_blank" rel="noopener">在 Vimeo 观看 ↗︎</a></p></section>
 ${mediaCopy(0,2)}${mediaGallery(project.detailImages.slice(0,3))}${mediaCopy(2,4)}${mediaGallery(project.detailImages.slice(3))}
 <section class="utopia-document" aria-label="宁静乌托邦完整项目展示">${pages.map((n,i)=>`<figure><a href="assets/tranquil-utopia/pages/page-${n}.png" target="_blank" rel="noopener" aria-label="放大查看项目展示第 ${i+1} 页（新窗口）"><img src="assets/tranquil-utopia/pages/page-${n}.webp" alt="宁静乌托邦项目展示：${['项目封面与创作介绍','背景与调研','社区概念与空间设定','网页、AI 管家与智能手环','最终成果'][i]}" width="3200" height="1600" loading="lazy" decoding="async"></a></figure>`).join('')}</section>`:
 `${mediaGallery([{src:'assets/united-nations-candidate/presentation-cover.webp',caption:'United Nations Candidate',width:2000,height:1000}])}${mediaCopy(0,2)}<figure class="candidate-gameplay"><video controls playsinline preload="metadata" poster="assets/united-nations-candidate/details/detail-01.webp" aria-label="新共和国候选人游戏演示视频"><source src="assets/united-nations-candidate/gameplay-demo.mp4" type="video/mp4">你的浏览器无法播放此视频，可<a href="assets/united-nations-candidate/gameplay-demo.mp4">下载游戏演示</a>。</video><figcaption>游戏演示</figcaption></figure><section class="candidate-scenes book-carousel" aria-label="三关场景设定"><div class="scene-pan book-carousel-track" tabindex="0" role="region" aria-label="力量、敏捷与公正三个关卡，可左右拖动、滑动或使用方向键浏览">${levels.map((level,i)=>`<figure class="candidate-scene"><img src="assets/united-nations-candidate/scenes/${level.file||'level-'+(i+1)+'.webp'}" alt="${level.title}完整场景设定图" width="${level.width}" height="${level.height}" loading="lazy" draggable="false"><figcaption>${level.title}</figcaption></figure>`).join('')}</div><p class="book-carousel-hint">↔︎ 左右滑动查看三个关卡</p></section>${mediaCopy(2,4)}${mediaGallery(project.detailImages.slice(4,5))}${mediaGallery(project.detailImages.slice(1,2))}${mediaGallery(project.detailImages.slice(2,4),'candidate-dialogue-pair')}${mediaGallery(project.detailImages.slice(5))}`)+`<div class="book-detail-links"><a class="work-back" href="work.html?year=${project.year}&type=${project.primaryCategory}">继续浏览作品 ↗︎</a><a class="work-back" href="index.html">回到首页 ↗︎</a></div>`;
 detail.querySelectorAll('.book-carousel').forEach(carousel=>window.setupBookCarousel(carousel));
 }else if(project.id==='tianshili-cod-sausage'){
 document.title=`${project.title} — Li MY`;
 detail.classList.add('photo-project-detail','coddy-detail');
 const images=project.coddyImages;
 const figure=item=>`<figure class="coddy-image${item.darken?' coddy-darken':''}"><a href="${item.original}" aria-label="放大查看：${item.caption}"><img src="${item.src}" alt="${item.caption}" width="${item.width}" height="${item.height}" loading="lazy" decoding="async"></a><figcaption>${item.caption}</figcaption></figure>`;
 const copy=index=>`<section class="book-body media-project-copy"><p>${project.description[index]}</p></section>`;
 detail.innerHTML=`<a class="work-back" href="work.html?type=ip">←︎ 返回 IP 与角色设计</a><div class="detail-heading"><div><p class="eyebrow">CHARACTER & IP / ${window.formatProjectDate(project)}</p><h1>${project.title}</h1></div><span>${project.outputs.join(' · ')}</span></div>
 <div class="coddy-static">${figure(images[0])}</div>${copy(0)}<section class="coddy-static" aria-label="角色三视图与表情">${images.slice(1,3).map(figure).join('')}</section>
 ${copy(1)}<section class="coddy-static" aria-label="系列包装与货架展示">${images.slice(3,5).map(figure).join('')}</section>
 ${copy(2)}<section class="coddy-static coddy-toys" aria-label="神奇的鳕宝 · 潮玩与数字展示">${images.slice(5).map(figure).join('')}</section>
 <div class="book-detail-links"><a class="work-back" href="work.html?type=ip">继续浏览 IP 与角色设计 ↗︎</a><a class="work-back" href="index.html">回到首页 ↗︎</a></div>`;
 const triggers=[...detail.querySelectorAll('.coddy-image a')];
 window.setupBookViewer({label:'力诚儿童鳕鱼肠图片查看',triggers,photos:images.map(item=>({original:item.original,preview:item.src,caption:item.caption}))});
}else if(project.format==='photo'){
 const category=window.designCategories.find(c=>c.id===project.primaryCategory);
 document.title=`${project.title} — Li MY`;
 detail.classList.add('photo-project-detail');
 if(project.phoneMockup)detail.classList.add('phone-project-detail');
 if(project.id==='jiwa-gashapon')detail.classList.add('gashapon-detail');
 const photos=project.detailImages?.map(item=>({original:item.src,preview:item.src,caption:item.caption}))||[{original:project.original,preview:project.image,caption:project.imageAlt}];
 if(project.id==='poti')detail.classList.add('poti-detail');
 const graduationVideo=project.graduationVideo?`<figure class="graduation-video${project.graduationVideo.portrait?' graduation-video-portrait':''}"><video controls playsinline preload="metadata" poster="${project.graduationVideo.poster}" aria-label="${project.graduationVideo.caption}"><source src="${project.graduationVideo.src}" type="video/mp4">你的浏览器无法播放此视频，可<a href="${project.graduationVideo.src}">下载视频</a>。</video><figcaption>${project.graduationVideo.caption}</figcaption></figure>`:'';
 const graduationImages=project.graduationImages||[];
 const graduationFigure=item=>`<figure class="graduation-media-image ${item.kind?'graduation-media-'+item.kind:''}"><a href="${item.src}" aria-label="放大查看：${item.caption}"><img src="${item.src}" alt="${item.caption}" width="${item.width}" height="${item.height}" loading="lazy" decoding="async"></a><figcaption>${item.caption}</figcaption></figure>`;
 const graduationGallery=project.id==='jiwa-gashapon'&&graduationImages.length?`<section class="ip-exhibition-gallery book-carousel" aria-label="鸡娃扭蛋机展览照片"><div class="ip-exhibition book-carousel-track" tabindex="0" role="region" aria-label="展览照片，可左右拖动、滑动或使用左右方向键浏览">${graduationImages.map(item=>`<figure class="ip-document"><a href="${item.original||item.src}" aria-label="放大查看：${item.caption}"><img src="${item.src}" alt="${item.caption}" width="${item.width}" height="${item.height}" loading="lazy" decoding="async"></a></figure>`).join('')}</div><p class="book-carousel-hint">↔︎ 左右滑动查看展览实物</p></section>`:project.id==='huangzhuang-dream'?`<section class="graduation-media-gallery media-swipe-gallery dream-stills book-carousel" aria-label="黄庄一梦影像静帧"><div class="book-carousel-track" tabindex="0" role="region" aria-label="影像静帧，可左右拖动、滑动或使用左右方向键浏览">${graduationImages.map(graduationFigure).join('')}</div><p class="book-carousel-hint">↔︎ 左右滑动浏览 · 点击查看大图</p></section>`:graduationImages.length?`<section class="graduation-media-gallery">${project.id==='super-jiwa'?[
  `<div class="graduation-image-group graduation-comparison">${graduationImages.filter(item=>['sketch','final'].includes(item.kind)).map(graduationFigure).join('')}</div>`,
  ...graduationImages.filter(item=>item.kind==='flow').map(item=>`<div class="graduation-image-group">${graduationFigure(item)}</div>`),
  `<div class="graduation-image-group graduation-results graduation-full-results">${graduationImages.filter(item=>item.kind==='full-result').map(graduationFigure).join('')}</div>`,
  ...graduationImages.filter(item=>item.kind==='code').map(item=>`<div class="graduation-image-group">${graduationFigure(item)}</div>`)
 ].join(''):graduationImages.map(graduationFigure).join('')}</section>`:'';
 const graduationIntroduction=project.seriesID==='haidian-jiwa-graduation'?`<section class="book-body media-project-copy graduation-introduction" aria-label="项目介绍">${project.description.map(paragraph=>`<p>${paragraph}</p>`).join('')}</section>`:'';
 detail.innerHTML=`<a class="work-back" href="work.html?year=${project.year}&type=${project.primaryCategory}">←︎ 返回${category.label}</a>
 <div class="detail-heading"><div><p class="eyebrow">${category.english} / ${window.formatProjectDate(project)}</p><h1>${project.title}</h1>${project.id==='poti'?'<img class="poti-wordmark" src="assets/poti/wordmark.png" alt="Poti 波提" width="1672" height="941">':''}</div><span>${project.outputs.join(' · ')}</span></div>
 ${project.videoPrimary?graduationVideo:photos.map((photo,i)=>`<figure class="project-supplied-image${project.id==='poti'?(photo.preview.endsWith('/poster.png')?' poti-poster':photo.preview.endsWith('/sketch.png')?' poti-sketch':''):''}"><a href="${photo.original}" aria-label="放大查看：${photo.caption}"><img src="${photo.preview}" alt="${photo.caption}" ${i?'loading="lazy"':'fetchpriority="high"'}>${project.videoCover?`<i class="video-cover-play" aria-hidden="true"></i>`:''}</a>${project.detailImages||project.caption?`<figcaption>${project.detailImages?photo.caption:project.caption}</figcaption>`:''}</figure>${project.id==='poti'&&project.storySections?.[i]?`<section class="book-body poti-story"><h2>${project.storySections[i].title}</h2>${project.storySections[i].paragraphs.map(p=>`<p>${p}</p>`).join('')}</section>`:''}`).join('')}
 ${graduationIntroduction}
 ${!project.videoPrimary?graduationVideo:''}
 ${graduationGallery}
 <div class="book-detail-links"><a class="work-back" href="work.html?year=${project.year}&type=${project.primaryCategory}">继续浏览${category.label} ↗︎</a><a class="work-back" href="index.html">回到首页 ↗︎</a></div>`;
 window.setupBookViewer({label:`${project.title}图片查看`,triggers:[...detail.querySelectorAll('.project-supplied-image a,.graduation-media-image a,.ip-exhibition-gallery .ip-document a')],photos:[...(project.videoPrimary?[]:photos),...graduationImages.map(item=>({original:item.original||item.src,preview:item.src,caption:item.caption}))]});
 if(['huangzhuang-dream','jiwa-gashapon'].includes(project.id))window.setupBookCarousel(detail.querySelector('.book-carousel'));
}else if(project.format==='poster'){
 document.title=`${project.title} — Li MY`;
 detail.classList.add('poster-detail');
 detail.innerHTML=`<a class="work-back" href="work.html?year=${project.year}&type=digital">←︎ 返回数字与新媒体</a>
 <div class="detail-heading"><div><p class="eyebrow">DIGITAL & NEW MEDIA / ${window.formatProjectDate(project)}</p><h1>《张春霞相当一般》<br>交互海报</h1></div><span>交互海报 · 交互设计</span></div>
 <div class="poster-experience"><a href="${project.externalURL}" target="_blank" rel="noopener noreferrer" class="poster-external" aria-label="打开交互海报（新窗口）">打开交互海报</a><p>点击进入独立网页，体验动态与交互。</p></div>
 <figure class="poster-artwork"><img src="${project.image}" alt="《张春霞相当一般》交互海报静态画面：深色背景、白色标题、绿色圆形与戴锅人物"><figcaption>海报静态画面 / POSTER STILL</figcaption></figure>
 ${project.description?.length?`<div class="book-body poster-body">${project.description.map(paragraph=>`<p>${paragraph}</p>`).join('')}</div>`:''}
 ${project.video?`<figure class="poster-demo"><video controls playsinline preload="metadata" poster="${project.image}" aria-label="《张春霞相当一般》交互海报演示视频"><source src="${project.video}" type="video/mp4">你的浏览器无法播放此视频，可<a href="${project.video}">下载演示视频</a>。</video><figcaption>动态与交互演示 / INTERACTION DEMO</figcaption></figure>`:''}
 <div class="book-detail-links"><a class="work-back" href="work.html?year=2026&type=digital">继续浏览数字与新媒体 ↗︎</a><a class="work-back" href="index.html">回到首页 ↗︎</a></div>`;
}else if(project.format==='ip'){
 document.title=`${project.title} — Li MY`;
 detail.classList.add('ip-detail');
 detail.innerHTML=`<a class="work-back" href="work.html?type=ip">←︎ 返回 IP 与角色设计</a>
 <div class="detail-heading"><div><p class="eyebrow">CHARACTER & IP / ${window.formatProjectDate(project)}</p><h1>${project.title}</h1></div><span>IP形象设计</span></div>
 <figure class="ip-artwork"><a href="assets/haidian-jiwa/original.png" target="_blank" rel="noopener" aria-label="查看海淀鸡娃原图（新窗口）"><img src="${project.image}" alt="海淀鸡娃 IP 形象：白色鸡形头盔、紫色鸡冠与披风、黄色脚部"></a></figure>
 <section class="book-body media-project-copy graduation-introduction" aria-label="项目介绍">${project.description.map(paragraph=>`<p>${paragraph}</p>`).join('')}</section>
 <section class="ip-story" aria-labelledby="ip-background-title">
 <header class="ip-section-heading"><p class="eyebrow">CONCEPT</p><h2 id="ip-background-title">创作背景</h2></header>
 <div class="ip-copy"><p>在当今社会普遍存在的教育内卷与焦虑氛围中，面临高考的中学生群体仿佛无意间被卷入了一个“扭蛋机”游戏，金钱、时间和精力付出，最终的结果却无法预知。在梦境和潜意识中，作为“海淀鸡娃”的我仿佛不断看见：上下学的路口、地铁的扶梯、喜欢喝的饮料、朋友借来的伞、写不完的试卷、操场上的绿茵……而我自己，正穿着宽大的校服，在天桥上俯瞰这一切。作品希望通过视觉语言的表达，引起有共同感受“鸡娃”们的共鸣与思考。</p></div>
 </section>
 <section class="ip-story" aria-labelledby="ip-design-title">
 <header class="ip-section-heading"><p class="eyebrow">CHARACTER DESIGN</p><h2 id="ip-design-title">形象建构</h2></header>
 <div class="ip-copy"><div class="ip-early-sketches" role="group" aria-label="前期草图">${ipFigure('early-sketch-1','png','前期草图 01',1060,920,false)}${ipFigure('early-sketch-2','png','前期草图 02',860,668,false)}<p class="ip-sketch-caption">前期草图</p></div>
 <h3>白色头套：标准化的隐喻</h3><p>IP形象以“鸡娃”为核心概念，在形象建构上采用显性符号学策略。娃娃的头套选用纯白单色，这一色彩选择是一种隐喻：白色是工业化养鸡场中鸡的典型毛色特征，同时白色在文化语境中常与“标准化”“工业化”等意象相联结，隐喻当代教育体制下“鸡娃”如同实验样本般被批量培育的生存状态。</p>
 <h3>校服与轮廓：被模糊的个体</h3><p>服饰语言的设计上，形象身着北京市海淀区中学生校服的经典配色——以白色为主基调，搭配高饱和颜色撞色。颜色选择了蓝色、紫色、粉色三个邻近色，具有系列感的同时，定下梦幻感的基调，并在实物质感上选择了珠光色，拉开与真实校服的区别。</p><p>校服版型使用“oversized”的处理，宽大的衣摆延伸至脚踝，与头套的圆形轮廓形成视觉上的连续性，整体形态趋近于鸡躯干的结构，从而模糊了人的特点。这种身体的“去辨识度”处理，暗示标准化教育模式下个体独特性的消解，即学生们在统一规训下逐渐失去了差异化的外在标识。</p></div>
 <div class="ip-turnarounds">${ipFigure('turnaround-1','png','三视图 01：正面、侧面与背面',1812,986,false)}${ipFigure('turnaround-2','png','三视图 02：正面、侧面与背面',1812,986,false)}<p class="ip-turnarounds-caption">三视图</p></div>
 <div class="ip-models" id="ip-models" role="group" aria-label="人物三维模型，可拖动旋转预览">
 ${[['boy','男孩模型'],['girl','女孩模型']].map(([file,name])=>`<figure class="ip-model"><div class="ip-model-stage"><model-viewer src="assets/haidian-jiwa/models/${file}.glb?v=97" alt="${name}，拖动旋转，双指或滚轮缩放" camera-controls touch-action="pan-y" camera-orbit="0deg 78deg 131.25%" min-camera-orbit="auto auto 131.25%" field-of-view="30deg" min-field-of-view="30deg" max-field-of-view="30deg" shadow-intensity="0.6" exposure="1.1" interaction-prompt="none" loading="eager" reveal="auto" tabindex="0" aria-describedby="ip-model-hint"><span class="ip-model-loading" slot="poster">正在加载模型…</span></model-viewer><p class="ip-model-error" role="status" hidden>模型暂时无法显示，<button class="ip-model-retry" type="button">重新加载</button><a href="assets/haidian-jiwa/models/${file}.glb" download>下载模型 ↗︎</a></p></div><figcaption>${name}</figcaption></figure>`).join('')}
 <p class="ip-model-hint" id="ip-model-hint">拖动旋转 · 滚轮或双指缩放</p>
 </div>
 </section>
 <section class="ip-story" aria-labelledby="ip-making-title">
 <header class="ip-section-heading"><p class="eyebrow">MAKING PROCESS</p><h2 id="ip-making-title">实物制作</h2></header>
 <div class="ip-copy"><p>在IP形象的实物呈现阶段，本研究综合考量了原型复杂程度、生产成本及展示需求，最终选定SLA光固化3D打印技术，并采用白色树脂作为基材。实物模型的构建流程遵循3D打印、打磨补土、丙烯上色、保护封层四个步骤。</p></div>
 <div class="ip-making-overview">${ipFigure('making-process','png','从左至右依次：3D打印、打磨补土、丙烯上色、保护封层',9458,4284,true)}</div>
 </section>

 <section class="ip-making-gallery book-carousel" aria-label="海淀鸡娃制作记录横向画廊">
 <div class="book-carousel-track ip-making-track" tabindex="0" aria-label="制作记录，可左右拖动、滑动或使用左右方向键浏览">${ipFigure('making-early-5','jpg','前期制作记录 05',1080,1920,false)}${ipFigure('making-early-1','jpg','前期制作记录 01',3024,4032,false)}${ipFigure('making-early-2','jpg','前期制作记录 02',4284,5712,false)}${ipFigure('making-early-3','jpg','前期制作记录 03',5712,4284,false)}${ipFigure('work-in-progress-2','jpg','制作记录 02',3024,4032,false)}${ipFigure('making-early-4','jpg','前期制作记录 04',3024,4032,false)}${ipFigure('work-in-progress-1','jpg','制作记录 01',3024,4032,false)}${ipFigure('work-in-progress-3','jpg','制作记录 03',5712,4284,false)}${ipFigure('work-in-progress-4','jpg','制作记录 04',1080,1920,false)}${ipFigure('work-in-progress-5','jpg','制作记录 05',1080,1920,false)}</div><p class="book-carousel-hint">↔︎ 左右拖动浏览制作记录</p></section>
 <section class="ip-story" aria-labelledby="ip-exhibition-title">
 <header class="ip-section-heading"><p class="eyebrow">EXHIBITION</p><h2 id="ip-exhibition-title">展览实物</h2></header>
 <div class="ip-copy"><p>2026年清华大学美术学院毕业设计展-视觉传达系-《海淀鸡娃》</p><p>“鸡娃”IP形象设计是这一创作的核心。角色以孩子为主体，同时加入鸡冠、头套、宽大校服等视觉元素，使其既具有明确的识别度，又以被遮挡的面部、被宽大服装模糊的身体轮廓以及近似统一的外观，共同指向标准化教育环境中个体差异的消解。这个形象不是某一个具体学生的肖像，而更像是一种集体经验的视觉凝缩：它让观众能够在其中看到熟悉的影子，却又无法将其完全对应到某一个具体的人。</p></div>
 <div class="ip-exhibition-gallery book-carousel"><div class="ip-exhibition book-carousel-track" tabindex="0" aria-label="展览实物，可左右拖动、滑动或使用左右方向键浏览">${ipFigure('exhibition-series','jpg','蓝、紫、粉三款 IP 形象的展览现场',2048,1536,false)}${ipFigure('exhibition-detail','jpg','珠光校服与白色头套的实物细节',2048,1536,false)}${ipFigure('exhibition-4','jpg','蓝色与紫色 IP 形象的展览实物',6000,4000,false)}${ipFigure('exhibition-5','jpg','蓝、紫、粉三款 IP 形象的展览近景',4000,6000,false)}</div><p class="book-carousel-hint">↔︎ 左右滑动查看展览实物</p></div>
 </section>
 <div class="book-detail-links"><a class="work-back" href="work.html?type=ip">继续浏览 IP 与角色设计 ↗︎</a><a class="work-back" href="index.html">回到首页 ↗︎</a></div>`;
 const ipTriggers=[...detail.querySelectorAll('.ip-artwork a,.ip-document a')];
 window.setupBookViewer({
  label:'海淀鸡娃图片放大查看',
  triggers:ipTriggers,
  photos:ipTriggers.map(link=>({original:link.getAttribute('href'),preview:link.querySelector('img').getAttribute('src'),caption:link.querySelector('img').alt}))
 });
 ipTriggers.forEach(link=>{link.removeAttribute('target');link.setAttribute('aria-label',`放大查看：${link.querySelector('img').alt}`)});
 window.setupBookCarousel(detail.querySelector('.ip-making-gallery'));
 window.setupBookCarousel(detail.querySelector('.ip-exhibition-gallery'));
 const modelScript=document.createElement('script');
 modelScript.type='text/javascript';
 modelScript.src='ip-models.js?v=97';
 document.head.append(modelScript);
}else if(project.isReal){
 document.title=`《${project.title}》— Li MY`;
 document.body.classList.add('book-page');
 document.documentElement.classList.add('book-theme');
 detail.classList.add('book-detail');
 detail.innerHTML=`<a class="work-back" href="work.html?year=${project.year}&type=book">←︎ 返回书籍与编辑设计</a>
 <div class="detail-heading book-heading">
 <p class="eyebrow">BOOK & EDITORIAL / ${window.formatProjectDate(project)}</p>
 <h1>《${project.title}》</h1><span class="book-heading-category">书籍设计 · 编排 · 装帧</span>
 <div class="book-specs">${project.specs.map(([label,value])=>`<p>${label}：${value}</p>`).join('')}</div>
 </div>
 <div class="book-cover-stage"><svg viewBox="390 110 1180 985" role="img" aria-label="《张春霞相当一般》书籍封面，带圆形镂空的米白色封面与黑色文字"><image href="${project.image}" width="1920" height="1280"/></svg><span>封面 / COVER</span></div>
 <div class="book-body"><p>${project.introduction}</p></div>
 <div class="book-photo-grid book-photo-sequence" aria-label="全部内页连续预览，点击可放大">${[7,8,9,10].map(i=>bookPhotoFigure(i)).join('')}</div>
 <div class="book-body"><p>${project.process}</p></div>
 <section class="book-carousel" aria-label="书籍实拍与工艺细节横向画廊">
 <div class="book-carousel-track" tabindex="0" aria-label="可左右拖动或滑动，也可用左右方向键浏览">${[0,1,2,3,4,5,6].map(i=>bookPhotoFigure(i)).join('')}</div>
 <p class="book-carousel-hint">↔︎ 左右拖动浏览</p>
 </section>
 <div class="book-body"><p>${project.eclipse}与此同时，${project.material}</p></div>
 <section class="book-craft" aria-labelledby="craft-title">
   <header class="craft-heading"><h2 id="craft-title">材料与内页细节</h2><p class="eyebrow">MATERIAL & DETAILS</p></header>
   <div class="craft-materials">
     <article class="craft-material"><div class="craft-photo craft-annotated">${bookPhotoFigure(11)}</div><div class="craft-copy"><h3>金箔</h3><span class="craft-index">01 / GOLD LEAF</span><p>金箔在深色纸面上形成局部的亮点，材料的反光与诗文中的意象并置，让阅读多了一层真实的光泽。</p></div></article>
     <article class="craft-material craft-material-offset"><div class="craft-photo craft-annotated">${bookPhotoFigure(12)}</div><div class="craft-copy"><h3>幻彩纸</h3><span class="craft-index">02 / IRIDESCENT PAPER</span><p>幻彩纸随观看角度呈现不同的光色。在静态的图文之间，留下游移、不易被固定的视觉感受。</p></div></article>
   </div>
   <article class="craft-holes">
     <div class="craft-group-heading craft-copy"><div><h3>贯穿全书的圆孔</h3><span class="craft-index">03 / THROUGH THE BOOK</span></div><p>圆孔沿章节边缘贯穿全书，孔径随阅读逐渐扩大。层叠的纸页让这种变化可以被直接看到，也呼应了影片中的日食线索。</p></div>
     <div class="craft-photo craft-hole-single">${bookPhotoFigure(14)}</div>
   </article>
   <article class="craft-shaped"><div class="craft-photo">${bookPhotoFigure(15)}</div><div class="craft-copy"><h3>异形页</h3><span class="craft-index">04 / SHAPED PAGES</span><p>改变书页的轮廓与幅面，让前后页在翻动时露出不同部分。图像与文字通过遮挡、衔接，形成有层次的阅读节奏。</p></div></article>
   <article class="craft-cutouts"><div class="craft-cutout-heading craft-copy"><div><h3>镂空页</h3><span class="craft-index">05 / CUTOUT PAGES</span></div><p>飞鸟的轮廓从上一页透出，连贯到下一页，仿佛飞鸟绵长的飞行真的带走了潮汐和神明的话。</p></div><div class="craft-cutout-single craft-photo">${bookPhotoFigure(18)}</div></article>
 </section>
 <div class="book-detail-links"><a class="work-back" href="work.html?year=2026&type=book">继续浏览书籍设计 ↗︎</a><a class="work-back" href="index.html">回到首页 ↗︎</a></div>`;
 window.setupBookViewer();
 window.setupBookCarousel();
 const shapedSection=detail.querySelector('.craft-shaped');
 if(shapedSection){
  const shapedCopy=shapedSection.querySelector('.craft-copy');
  const syncShapedSize=()=>shapedSection.style.setProperty('--shaped-size',`${shapedCopy.getBoundingClientRect().height}px`);
  new ResizeObserver(syncShapedSize).observe(shapedCopy);
  syncShapedSize();
 }
}else{
 const category=window.designCategories.find(c=>c.id===project.primaryCategory);
 document.title=`${project.title} — MY PORTFOLIO`;
 detail.innerHTML=`<a class="work-back" href="work.html?year=${project.year<2024?'earlier':project.year}&type=${project.primaryCategory}">←︎ 返回此类作品</a><div class="detail-heading"><div><p class="eyebrow">${category.english}</p><h1>${project.title}</h1></div><span>${project.year} / 演示年份</span></div><p class="detail-note">作品详情演示 · 当前标题、年份和项目归类为占位，封面复用同一张书籍照片。</p><img class="detail-cover" src="${project.image}" alt="用于演示作品详情的书籍封面照片"><div class="detail-description"><h2>关于作品</h2><div><p>呈现类型：${project.outputs.join(' / ')}</p><p>这里将呈现作品背景、设计思路，以及更多细节图片。</p><p>具体项目资料补充后，再替换此处的占位内容。</p></div></div><a class="work-back" href="index.html">回到首页 ↗︎</a>`;
}
const currentProjectSeries=[
 {title:'海淀鸡娃 · 毕业设计',compact:true,ids:window.graduationProjectIDs,labels:{'haidian-jiwa':'IP 形象','super-jiwa':'小程序','jiwa-gashapon':'装置','huangzhuang-dream':'影像'}},
 {title:'张春霞相当一般 · 系列作品',ids:['zhang-chun-xia','zhang-chun-xia-poster'],labels:{'zhang-chun-xia':'书籍设计','zhang-chun-xia-poster':'数字与新媒体'},names:{'zhang-chun-xia-poster':'交互海报'}}
].find(series=>series.ids.includes(project?.id));
if(project?.relatedProjects?.length&&!currentProjectSeries){
 const related=project.relatedProjects.map(id=>projectRecords.find(item=>item.id===id)).filter(Boolean);
 if(related.length){
  const section=document.createElement('section');
  section.className='related-projects';
  section.setAttribute('aria-labelledby','related-projects-title');
  section.innerHTML=`<h2 id="related-projects-title">${project.seriesID==='haidian-jiwa-graduation'?'同一毕设系列':'相关作品'}</h2>${related.map(item=>`<a class="related-project" href="project.html?id=${encodeURIComponent(item.id)}"><h3>${item.title}${['jiwa-gashapon','huangzhuang-dream','super-jiwa'].includes(item.id)?` · ${item.outputs[0]}`:''}</h3></a>`).join('')}`;
  detail.classList.add('has-related-projects');
  const links=detail.querySelector('.book-detail-links');
  if(links)links.before(section);
  else detail.append(section);
 }
}
// Keep each series reachable before the project content.
if(currentProjectSeries){
 const navigation=document.createElement('nav');
 navigation.className='graduation-project-nav';
 navigation.setAttribute('aria-label',currentProjectSeries.title);
 const labels=currentProjectSeries.labels;
 navigation.innerHTML=`${currentProjectSeries.compact?`<p class="project-series-title">${currentProjectSeries.title}</p>`:''}<div class="graduation-project-links glass-tabs${currentProjectSeries.compact?' is-compact':''}">${currentProjectSeries.ids.map(id=>{
  const item=projectRecords.find(record=>record.id===id);
  return `<a href="project.html?id=${encodeURIComponent(item.id)}" aria-label="${item.title} · ${labels[id]}" ${item.id===project.id?'aria-current="page"':''}><span>${currentProjectSeries.compact?labels[id]:(currentProjectSeries.names?.[id]||item.title)}</span>${currentProjectSeries.compact?'':`<small>${labels[id]}</small>`}</a>`;
 }).join('')}</div>`;
 const heading=detail.querySelector('.detail-heading');
 if(heading)heading.before(navigation);
}
// Every project reserves the same topbar space, including projects without tools.
// Only render tool icons that are confirmed for this project.
if(project){
 const tools=(project.tools||[]).map(key=>projectTools[key]).filter(Boolean);
 const toolbar=document.createElement('div');
 toolbar.className='project-topbar';
 const back=detail.querySelector(':scope > .work-back');
 detail.prepend(toolbar);
 if(back)toolbar.append(back);
 if(tools.length){
  const toolList=document.createElement('ul');
  toolList.className='project-tools';
  toolList.setAttribute('aria-label','项目使用工具');
  toolList.innerHTML=tools.map(tool=>`<li><span class="project-tool-label">${tool.name}</span></li>`).join('');
  toolbar.append(toolList);
 }
}

// Optical alignment for titles beginning with Chinese book punctuation.
const refinedTitle=detail.querySelector('h1');
if(refinedTitle?.textContent.trim().startsWith('《'))refinedTitle.classList.add('optical-title');
