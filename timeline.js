// A continuous river of confirmed works, ordered by date without empty month slots.
(()=>{
 const hero=document.querySelector('.hero'),panel=document.querySelector('.home-timeline');
 const viewport=panel.querySelector('.timeline-viewport'),axis=panel.querySelector('.timeline-axis'),navigation=panel.querySelector('.timeline-years'),toggle=document.querySelector('#timeline');
 const projects=window.portfolioProjects.filter(p=>p.isReal).slice().sort((a,b)=>b.year-a.year||(b.month||0)-(a.month||0));
 const years=[...new Set([2026,2025,2024,...projects.map(p=>p.year)])].sort((a,b)=>b-a),anchors=new Map(),date=window.formatProjectDate;
 function addYear(year,label){
  const section=document.createElement('section');section.className='timeline-year';section.dataset.year=year;
  const heading=document.createElement('h3');heading.textContent=label;section.append(heading);axis.append(section);anchors.set(String(year),section);
  const button=document.createElement('button');button.type='button';button.textContent=label;button.dataset.year=year;button.setAttribute('aria-pressed','false');
  button.addEventListener('click',()=>{clearEntrance();viewport.scrollTo({left:Math.max(0,section.offsetLeft-innerWidth*(innerWidth<=700?.06:.04)),behavior:'instant'});syncYear()});navigation.append(button);return section;
 }
 for(const year of years){
  const section=addYear(year,String(year)),months=document.createElement('div');months.className='timeline-months';section.append(months);let previousMonth=null;
  for(let month=12;month>=0;month--){
   const works=projects.filter(p=>p.year===year&&(p.month||0)===month);if(!works.length)continue;
   const group=document.createElement('div');group.className='timeline-month has-works';group.dataset.month=month;
   if(previousMonth!==null&&month&&previousMonth-month<=1)group.classList.add('timeline-nearby');previousMonth=month;
   const label=document.createElement('span');label.className='timeline-month-label';label.textContent=month?`${year}.${String(month).padStart(2,'0')}`:String(year);
   for(const project of works){
    const link=document.createElement('a');link.className='timeline-work';link.href=window.portfolioProjectHref(project.id);link.dataset.projectId=project.id;link.setAttribute('aria-label',`${project.title}，${date(project)}，查看详情`);
    const image=document.createElement('img');image.src=window.portfolioAsset(project.image,480);image.alt=project.imageAlt||project.title;image.loading='lazy';image.draggable=false;
    const index=projects.indexOf(project);link.style.setProperty('--work-lift',`${[20,60,8,42,28][index%5]}px`);link.style.setProperty('--work-angle',`${[-8,9,-5,7,-10][index%5]}deg`);link.append(image);
    const stamp=label.cloneNode(true);link.append(stamp);group.append(link);
   }months.append(group);
  }
 }
 const earlier=addYear('earlier','更早');earlier.classList.add('timeline-earlier');const note=document.createElement('p');note.textContent='更早的作品，陆续整理中。';earlier.append(note);
 function syncYear(){let active=String(years[0]);for(const [key,element] of anchors){if(element.offsetLeft<=viewport.scrollLeft+viewport.clientWidth*.2)active=key}navigation.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.year===active)))}
 let entrance=[],entranceRun=0;
 function clearEntrance(){
  entranceRun++;entrance.forEach(a=>a.cancel());entrance=[];
 }
 toggle.addEventListener('click',()=>{
  if(hero.classList.contains('is-timeline'))return;
  clearEntrance();
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const origins=new Map([...document.querySelectorAll('.book')].map(book=>[book.dataset.projectId,(book.querySelector('img,svg')||book).getBoundingClientRect()]));
  panel.hidden=false;hero.classList.add('is-timeline');toggle.setAttribute('aria-pressed','true');
  document.querySelectorAll('#scatter,#gather').forEach(b=>b.setAttribute('aria-pressed','false'));
  document.querySelector('.project-preview')?.setAttribute('hidden','');
  viewport.scrollLeft=0;syncYear();
  if(reduced)return;
  const heroRect=hero.getBoundingClientRect(),viewRect=viewport.getBoundingClientRect();
  const destinations=[...panel.querySelectorAll('.timeline-work')].map(link=>({link,image:link.querySelector('img'),rect:link.querySelector('img').getBoundingClientRect()}));
  entrance.push(panel.animate([{opacity:0},{opacity:1}],{duration:320,easing:'cubic-bezier(.22,1,.36,1)'}));
  destinations.forEach(({link,image,rect})=>{
   if(rect.right<viewRect.left||rect.left>viewRect.right)return;
   const origin=origins.get(link.dataset.projectId);
   if(!origin||!origin.width||!origin.height){entrance.push(link.animate([{opacity:0,transform:'translateY(18px)'},{opacity:1,transform:'none'}],{duration:420,easing:'cubic-bezier(.2,.65,.3,1)'}));return;}
   // Animate the final node itself: no duplicate image or end-of-flight swap.
   const box=link.getBoundingClientRect();
   const pivot=`${rect.left+rect.width/2-box.left}px ${rect.top+rect.height/2-box.top}px`;
   const dx=origin.left+origin.width/2-rect.left-rect.width/2;
   const dy=origin.top+origin.height/2-rect.top-rect.height/2;
   entrance.push(link.animate([
    {transform:`translate(${dx}px,${dy}px) scale(${origin.width/rect.width},${origin.height/rect.height})`,transformOrigin:pivot},
    {transform:'none',transformOrigin:pivot}
   ],{duration:420,easing:'cubic-bezier(.2,.65,.3,1)'}));
  });
  const run=entranceRun;
  Promise.allSettled(entrance.map(a=>a.finished)).then(()=>{if(run===entranceRun)clearEntrance()});
 });
 viewport.addEventListener('scroll',syncYear,{passive:true});
 document.querySelectorAll('#scatter,#gather,a[href="#home"]').forEach(b=>b.addEventListener('click',()=>{
  clearEntrance();panel.hidden=true;hero.classList.remove('is-timeline');toggle.setAttribute('aria-pressed','false');
 }));
 viewport.addEventListener('pointerdown',clearEntrance);
 viewport.addEventListener('wheel',clearEntrance,{passive:true});
 viewport.addEventListener('keydown',clearEntrance);
 addEventListener('resize',clearEntrance);
 matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change',clearEntrance);
 let drag=null,suppressUntil=0;
 viewport.addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse'||e.button!==0||e.target.closest('button'))return;drag={id:e.pointerId,x:e.clientX,scroll:viewport.scrollLeft,moved:false}});
 viewport.addEventListener('pointermove',e=>{if(!drag||e.pointerId!==drag.id)return;const delta=e.clientX-drag.x;if(!drag.moved&&Math.abs(delta)<5)return;if(!drag.moved){drag.moved=true;viewport.setPointerCapture(e.pointerId);viewport.classList.add('is-dragging')}e.preventDefault();viewport.scrollLeft=drag.scroll-delta});
 function release(e){if(!drag||drag.id!==e.pointerId)return;if(drag.moved)suppressUntil=performance.now()+300;drag=null;viewport.classList.remove('is-dragging');if(viewport.hasPointerCapture(e.pointerId))viewport.releasePointerCapture(e.pointerId)}
 viewport.addEventListener('pointerup',release);viewport.addEventListener('pointercancel',release);viewport.addEventListener('lostpointercapture',()=>{drag=null;viewport.classList.remove('is-dragging')});viewport.addEventListener('click',e=>{if(performance.now()<suppressUntil){e.preventDefault();e.stopImmediatePropagation()}},true);viewport.addEventListener('dragstart',e=>e.preventDefault());
 viewport.addEventListener('keydown',e=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(e.key)){e.preventDefault();const left=e.key==='Home'?0:e.key==='End'?viewport.scrollWidth:viewport.scrollLeft+(e.key==='ArrowRight'?1:-1)*viewport.clientWidth*.65;viewport.scrollTo({left,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'})}});syncYear();
})();
