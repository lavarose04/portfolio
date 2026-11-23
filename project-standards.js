(() => {
 const detail=document.querySelector('#project-detail');if(!detail)return;
 // Format dimension strings only, not source URLs, IDs or arithmetic in scripts.
 const walker=document.createTreeWalker(detail,NodeFilter.SHOW_TEXT);let node;
 while(node=walker.nextNode()){
  if(node.parentElement.closest('script,style,svg'))continue;
  node.textContent=node.textContent.replace(/(\d+(?:\.\d+)?)\s*[*xX×]\s*(\d+(?:\.\d+)?)\s*(mm|cm|px)\b/g,'$1 × $2 $3');
 }
 detail.querySelectorAll('p').forEach(p=>{
  if(!p.matches('.eyebrow,.overview-hint,.book-carousel-hint,.project-series-title,.media-source-link')&&!p.closest('.project-topbar,.detail-heading,.book-specs,.book-carousel,.graduation-project-nav'))p.classList.add('project-reading-copy');
 });
 detail.querySelectorAll('.book-carousel').forEach(gallery=>{
  const track=gallery.querySelector('.book-carousel-track');if(!track)return;
  let progress=gallery.querySelector('.gallery-progress');
  if(!progress){progress=document.createElement('progress');progress.className='gallery-progress';progress.max=1;progress.setAttribute('aria-label','图片画廊浏览进度');gallery.append(progress);}
  const update=()=>{progress.value=track.scrollLeft/Math.max(1,track.scrollWidth-track.clientWidth);};
  track.addEventListener('scroll',update,{passive:true});
  new ResizeObserver(update).observe(track);
  track.querySelectorAll('img').forEach(img=>img.addEventListener('load',update,{once:true}));update();
 });
})();
