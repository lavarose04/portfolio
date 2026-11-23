(() => {
 const id=new URL(location.href).searchParams.get('id');
 const current=window.portfolioProjects.find(p=>p.id===id||p.aliases?.includes(id));
 if(current?.id!=='zhang-chun-xia')return;
 const detail=document.querySelector('#project-detail');detail.classList.add('zhang-book');
 detail.querySelectorAll('.book-specs p').forEach(p=>{if(p.textContent.includes('完成时间'))p.remove();});
 const overview=detail.querySelector('.book-photo-sequence');
 if(overview){
  const hint=document.createElement('p');hint.className='overview-hint';hint.textContent='内页总览 · 点击任意一张放大查看';overview.before(hint);
  overview.querySelectorAll('.book-photo-open').forEach(button=>{button.title='点击放大内页总览';});
 }
 const gallery=detail.querySelector('.book-carousel'),track=gallery?.querySelector('.book-carousel-track');
 if(track){
  const progress=document.createElement('progress');progress.className='gallery-progress';progress.max=1;progress.value=0;progress.setAttribute('aria-label','实拍画廊浏览进度');
  gallery.append(progress);
  const update=()=>{progress.value=track.scrollLeft/Math.max(1,track.scrollWidth-track.clientWidth);};
  track.addEventListener('scroll',update,{passive:true});addEventListener('resize',update);update();
 }
})();
