// Book photography: original files are retained for full-size inspection.
window.bookPhotos = [
 ['detail-1.jpg','封面与圆形镂空'],
 ['detail-30.jpg','人物图像与开窗书页'],
 ['detail-28.jpg','跨页图像与文字编排'],
 ['detail-5.jpg','蓝色跨页与页面边缘的圆孔'],
 ['detail-6.jpg','跨页图像与翻阅细节'],
 ['detail-77.jpg','狐狸图像与裁切书页细节'],
 ['detail-12.jpg','翻页中的层次与镂空'],
 ['pages-19.png','内页全览 01：封面与开篇'],
 ['pages-20.png','内页全览 02'],
 ['pages-21.png','内页全览 03'],
 ['pages-22.png','内页全览 04：后半部分与封底'],
 ['craft-gold.jpg','金箔：深色书页上的局部反光'],
 ['craft-iridescent.jpg','幻彩纸：纸面中的变幻光色'],
 ['craft-hole-portrait.jpg','圆孔：叠起书页中的连续孔洞',1280,1920],
 ['craft-hole-spread.jpg','圆孔：贯穿跨页与章节边缘'],
 ['craft-shaped.jpg','异形页：不同幅面的书页交叠'],
 ['craft-cutout.jpg','镂空页：飞鸟轮廓与前后页叠映'],
 ['craft-cutout-outdoor.jpg','镂空页：翻动中的飞鸟与透光'],
 ['craft-cutout-wide.jpg','镂空页：飞鸟轮廓与翻页中的前后页叠映']
];
const photoRoot='assets/zhang-chun-xia/';
window.bookPhotoFigure=(index,wide=false)=>{
 const [file,caption,width=1920,height=file.endsWith('.png')?1080:1280]=window.bookPhotos[index],preview=file.replace('.jpg','.webp');
 return `<figure class="book-photo${wide?' book-photo-wide':''}"><button type="button" class="book-photo-open" data-photo-index="${index}" aria-label="放大查看：${caption}"><img src="${photoRoot+preview}" alt="${caption}" width="${width}" height="${height}" loading="lazy" decoding="async"></button></figure>`;
};
window.setupBookViewer=(options={})=>{
 const photos=options.photos||window.bookPhotos.map(([file,caption])=>({original:photoRoot+file,preview:photoRoot+file.replace('.jpg','.webp'),caption}));
 const triggers=options.triggers||document.querySelectorAll('.book-photo-open');
 const viewer=document.createElement('dialog');viewer.className='photo-viewer';viewer.setAttribute('aria-label',options.label||'书籍照片放大查看');
 viewer.innerHTML=`<div class="viewer-toolbar"><p id="viewer-caption" hidden></p><div><button type="button" id="viewer-zoom" aria-pressed="false">原尺寸</button><a id="viewer-original" target="_blank" rel="noopener">查看原图 ↗︎</a><button type="button" id="viewer-close" aria-label="关闭图片查看">关闭 ×</button></div></div><div class="viewer-stage"><img class="viewer-image" alt=""></div><div class="viewer-navigation"><button type="button" id="viewer-prev" aria-label="上一张照片"><span aria-hidden="true">◀</span></button><span id="viewer-counter" aria-live="polite"></span><button type="button" id="viewer-next" aria-label="下一张照片"><span aria-hidden="true">▶</span></button></div>`;
 document.body.append(viewer);
 let currentPhoto=0;
 const stage=viewer.querySelector('.viewer-stage'),zoom=viewer.querySelector('#viewer-zoom');
 function showPhoto(index){
  currentPhoto=(index+photos.length)%photos.length;
  const {original,preview,caption}=photos[currentPhoto],image=viewer.querySelector('.viewer-image');
  image.src=preview;image.alt=caption;
  viewer.querySelector('#viewer-caption').textContent=caption;
  viewer.querySelector('#viewer-counter').textContent=`${currentPhoto+1} / ${photos.length}`;
  viewer.querySelector('#viewer-original').href=original;
  stage.classList.remove('is-zoomed');zoom.setAttribute('aria-pressed','false');zoom.textContent='原尺寸';stage.scrollTo(0,0);
 }
 triggers.forEach((button,index)=>button.addEventListener('click',event=>{event.preventDefault();showPhoto(options.photos?index:Number(button.dataset.photoIndex));viewer.showModal();document.body.classList.add('photo-viewer-open')}));
 viewer.querySelector('#viewer-close').addEventListener('click',()=>viewer.close());
 viewer.addEventListener('close',()=>document.body.classList.remove('photo-viewer-open'));
 viewer.querySelector('#viewer-prev').addEventListener('click',()=>showPhoto(currentPhoto-1));
 viewer.querySelector('#viewer-next').addEventListener('click',()=>showPhoto(currentPhoto+1));
 zoom.addEventListener('click',()=>{
  const expanded=stage.classList.toggle('is-zoomed');
  zoom.setAttribute('aria-pressed',String(expanded));zoom.textContent=expanded?'适应窗口':'原尺寸';
  const photo=photos[currentPhoto];viewer.querySelector('.viewer-image').src=expanded?photo.original:photo.preview;
 });
 viewer.addEventListener('keydown',event=>{if(event.key==='ArrowLeft'){event.preventDefault();showPhoto(currentPhoto-1)}if(event.key==='ArrowRight'){event.preventDefault();showPhoto(currentPhoto+1)}});
};

window.setupBookCarousel=(carousel=document.querySelector('.book-carousel'))=>{
 if(!carousel)return;
 const track=carousel.querySelector('.book-carousel-track');
 let drag=null,inertia=0,suppressClickUntil=0;
 const stop=()=>{cancelAnimationFrame(inertia);inertia=0};
 function coast(velocity){
  if(matchMedia('(prefers-reduced-motion:reduce)').matches||Math.abs(velocity)<.03)return;
  let last=performance.now();
  function step(now){
   const elapsed=Math.min(now-last,32);last=now;
   const before=track.scrollLeft;track.scrollLeft+=velocity*elapsed;
   velocity*=Math.pow(.92,elapsed/16.67);
   if(Math.abs(velocity)>.03&&Math.abs(track.scrollLeft-before)>.1)inertia=requestAnimationFrame(step);else inertia=0;
  }
  inertia=requestAnimationFrame(step);
 }
 track.addEventListener('dragstart',e=>e.preventDefault());
 track.addEventListener('pointerdown',e=>{
  stop();if(e.pointerType!=='mouse'||e.button!==0)return;
  drag={id:e.pointerId,startX:e.clientX,startScroll:track.scrollLeft,lastX:e.clientX,lastTime:performance.now(),velocity:0,moved:false};
 });
 track.addEventListener('pointermove',e=>{
  if(!drag||e.pointerId!==drag.id)return;
  const distance=e.clientX-drag.startX;
  if(!drag.moved&&Math.abs(distance)<5)return;
  if(!drag.moved){drag.moved=true;track.setPointerCapture(e.pointerId);track.classList.add('is-dragging')}
  e.preventDefault();
  const now=performance.now(),elapsed=Math.max(1,now-drag.lastTime);
  drag.velocity=.55*drag.velocity+.45*(drag.lastX-e.clientX)/elapsed;
  track.scrollLeft=drag.startScroll-distance;drag.lastX=e.clientX;drag.lastTime=now;
 });
 function release(e){
  if(!drag||e.pointerId!==drag.id)return;
  const state=drag;drag=null;track.classList.remove('is-dragging');
  if(track.hasPointerCapture(e.pointerId))track.releasePointerCapture(e.pointerId);
  if(state.moved){suppressClickUntil=performance.now()+300;if(e.type!=='pointercancel'&&performance.now()-state.lastTime<100)coast(Math.max(-2.5,Math.min(2.5,state.velocity)))}
 }
 track.addEventListener('pointerup',release);track.addEventListener('pointercancel',release);
 track.addEventListener('lostpointercapture',()=>{drag=null;track.classList.remove('is-dragging')});
 track.addEventListener('click',e=>{if(performance.now()<suppressClickUntil){e.preventDefault();e.stopImmediatePropagation()}},true);
 track.addEventListener('wheel',stop,{passive:true});track.addEventListener('touchstart',stop,{passive:true});
 track.addEventListener('keydown',e=>{
  if(e.key==='ArrowRight'||e.key==='ArrowLeft'){
   e.preventDefault();stop();track.scrollBy({left:(e.key==='ArrowRight'?1:-1)*track.clientWidth*.25,behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth'});
  }
 });
};
