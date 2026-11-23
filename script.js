const field = document.querySelector('#book-field');
const track = document.querySelector('.hero-track');
const hero = document.querySelector('.hero');
const heroCopy = document.querySelector('.hero-copy');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const buttons = {scatter:document.querySelector('#scatter'),gather:document.querySelector('#gather')};
// A tighter upper-left group surrounds Jiwa while keeping the title area open.
// Each tuple is horizontal position, vertical position, angle and scale.
const scattered = [
 [-.33,-.34,-27,.80],[-.20,-.30,19,.65],[.22,-.34,-24,.68],
 [.43,.02,31,.74],[-.32,-.07,-18,.67],[.41,-.32,24,.74],
 [-.19,.35,-24,.79],[.01,.35,31,.61],[.21,.35,-19,.78],
 [.40,.29,-28,.60],[-.36,.35,24,.60],[-.35,.16,-32,.56],
 [.005,-.35,16,.60]
];
const mobileScatter = [
 [-.32,-.25,-28,.72],[.27,-.25,22,.65],[.34,-.04,-21,.66],
 [.31,.15,30,.72],[-.32,-.01,-18,.68],[-.31,.20,24,.72],
 [.20,.29,-25,.78],[-.08,.30,32,.59],[.02,-.29,-16,.56],
 [.32,.32,27,.56],[-.34,.33,-22,.54],[.12,.14,17,.56],[-.12,-.33,-15,.52]
];
const categories=window.designCategories.map(category=>category.id);
const labelContainer=document.querySelector('.category-labels');
window.designCategories.forEach((category,i)=>{const label=document.createElement('a');label.className='category-label';label.dataset.category=category.id;label.href=`work.html?type=${category.id}`;label.tabIndex=-1;label.innerHTML=`<span>0${i+1} / ${category.label}</span><small>${category.english}</small>`;label.addEventListener('focus',()=>{focusedCategory=category.id;startAnimation()});label.addEventListener('blur',()=>{focusedCategory=null;startAnimation()});labelContainer.append(label)});
// Keep the established composition, then give unrepresented real projects
// priority over category placeholders before filling the homepage.
const homepageSlots=scattered.map((_,i)=>i===12?'space':i===9?'digital':i===7?'book':categories[i%categories.length]);
const usedProjects=new Set();
const items=homepageSlots.map(category=>{
 const choices=window.portfolioProjects.filter(p=>p.showOnHomepage!==false&&p.primaryCategory===category)
  .sort((a,b)=>Number(!!b.isReal)-Number(!!a.isReal));
 const project=choices.find(p=>!usedProjects.has(p.id))||choices[0];
 usedProjects.add(project.id);
 return {category,project,image:project.image};
});
const remainingRealProjects=window.portfolioProjects.filter(p=>p.showOnHomepage!==false&&p.isReal&&!usedProjects.has(p.id));
items.forEach((item,i)=>{
 if(item.project.isReal||!remainingRealProjects.length)return;
 const project=remainingRealProjects.shift();
 items[i]={category:project.primaryCategory,project,image:project.image};
});
// A category with fewer works must never repeat an already selected project.
const uniqueHomepageIds=new Set();
const uniqueHomepageItems=items.filter(item=>{
 if(uniqueHomepageIds.has(item.project.id))return false;
 uniqueHomepageIds.add(item.project.id);return true;
});
items.splice(0,items.length,...uniqueHomepageItems);
const clusterCenters={desktop:{brand:[-.30,-.02],ip:[0,-.02],digital:[.30,-.02],book:[-.19,.21],space:[.19,.21]},mobile:{brand:[-.27,-.16],ip:[.27,-.16],digital:[-.27,.08],book:[.27,.08],space:[0,.23]}};
const clusterOffsets=[[-.045,-.035,-23,.67],[.045,-.015,13,.72],[-.015,.035,-5,.75],[.055,.045,27,.63],[-.065,.02,-15,.65]];
function groupedPosition(i,mobile){
 const category=items[i].category;
 const index=items.slice(0,i).filter(item=>item.category===category).length;
 const center=clusterCenters[mobile?'mobile':'desktop'][category],offset=clusterOffsets[index];
 const count=items.filter((item,j)=>item.category===category&&(!mobile||j<mobileScatter.length)).length;
 if(category==='space')return [center[0]+(index===0?-1:1)*(mobile?.09:(index===0?.024:.020)),center[1],index===0?-5:5,1];
 if(category==='book'){
  const slot={'the-seventh-day':-1,'spring-equinox':0,'zhang-chun-xia':1}[items[i].project.id]??index-1;
  return [center[0]+slot*(mobile?.085:.070),center[1],slot*5,mobile?.46:.60];
 }
 if(category==='ip'){
  const slot={'poti':-1,'haidian-jiwa':0,'tianshili-cod-sausage':1}[items[i].project.id]??index-1;
  return [center[0]+slot*(mobile?.09:.065),center[1],slot*6,mobile?.46:.60];
 }
 const spacing=count===2?.55:1;
 return [center[0]+offset[0]*(mobile?1.4:1)*spacing,center[1]+offset[1]*(mobile?.8:1)*spacing,offset[2],offset[3]*(mobile?.65:.83)];
}
const books=items.map((_,i)=>{
 const element=document.createElement('a');element.className='book';element.dataset.category=items[i].category;element.dataset.projectId=items[i].project.id;
 element.href=`project.html?id=${encodeURIComponent(items[i].project.id)}`;
 element.setAttribute('aria-label',`${items[i].project.title}，点击查看详情`);
 element.style.setProperty('--float-duration',`${7.2+(i%5)*.8}s`);
 element.style.setProperty('--float-delay',`${-i*1.37}s`);
 element.style.setProperty('--float-tilt',`${.45+(i%3)*.15}deg`);
 element.addEventListener('pointerenter',()=>{if(progress<.5)showPreview(items[i].project)});
 element.addEventListener('pointerleave',hidePreview);
 element.addEventListener('focus',()=>{if(progress<.5)showPreview(items[i].project);else{focusedCategory=items[i].category;startAnimation()}});
 element.addEventListener('blur',()=>{hidePreview();focusedCategory=null;startAnimation()});
 element.addEventListener('click',hidePreview);
 element.innerHTML=['poster','ip','photo'].includes(items[i].project.format)?`<img src="${items[i].image}" alt="${items[i].project.title}">`:`<svg viewBox="390 110 1180 985" xmlns="http://www.w3.org/2000/svg"><defs><clipPath id="cut-${i}"><polygon points="408,511 1014,126 1549,572 1545,616 919,1079 908,1038 411,551"/></clipPath></defs><image href="${items[i].image}" width="1920" height="1280" ${items[i].project.transparent?'':`clip-path="url(#cut-${i})"`}/></svg>`;
 if(items[i].project.videoCover){
  element.classList.add('video-piece');
  element.insertAdjacentHTML('beforeend',`<i class="video-cover-play" aria-hidden="true"></i>`);
 }
 if(items[i].project.format==='photo')element.classList.add('photo-piece');
 if(items[i].project.format==='poster')element.classList.add('poster-piece');
 if(items[i].project.format==='ip')element.classList.add('ip-piece');
 if(items[i].project.phoneMockup)element.classList.add('phone-piece');
 if(items[i].project.id==='xiaoshajiang-tea')element.classList.add('tea-piece');
 element.querySelector('img')?.addEventListener('load',()=>startAnimation());
 field.append(element);return element;
});
let progress=0,target=0,frame=0;
let hoveredCategory=null,focusedCategory=null;
const pointer={x:0,y:0};
const dockAmounts=Object.fromEntries(categories.map(id=>[id,0]));
function startAnimation(){if(!frame)frame=requestAnimationFrame(tick)}
const clamp=(v,min,max)=>Math.min(max,Math.max(min,v));
let orbitAngle=0,orbitLast=0,orbitPaused=false,orbitHover=false,orbitSelected=null,orbitDrag=null,orbitSuppressUntil=0;
const orbitPause=document.querySelector('#orbit-pause');
const orbitEmphasis=items.map(()=>0);let orbitSpeed=1;
const spherePoints=books.map((_,i)=>{const y=1-2*(i+.5)/books.length,a=i*Math.PI*(3-Math.sqrt(5));return {x:Math.sqrt(1-y*y)*Math.cos(a),y,z:Math.sqrt(1-y*y)*Math.sin(a)}});
// Swap only these two homepage orbit slots; category and date ordering stay independent.
const teaOrbitIndex=items.findIndex(item=>item.project.id==='xiaoshajiang-tea');
const springOrbitIndex=items.findIndex(item=>item.project.id==='spring-equinox');
if(teaOrbitIndex>=0&&springOrbitIndex>=0){
 [spherePoints[teaOrbitIndex],spherePoints[springOrbitIndex]]=[spherePoints[springOrbitIndex],spherePoints[teaOrbitIndex]];
}
// Small color samples belong to individual works, rather than a random confetti palette.
const pixelLayer=document.createElement('div');pixelLayer.className='work-pixels';pixelLayer.setAttribute('aria-hidden','true');hero.insertBefore(pixelLayer,field);
const fallbackColors={brand:['#a8b862','#e5b660'],ip:['#8268b6','#e4cb70'],digital:['#a997cf','#c9badd'],book:['#518a83','#bfc8aa'],space:['#d49b76','#93b4b8']};
const workPixels=items.map((item,i)=>{
 const pixels=[0,1].map(j=>{const pixel=document.createElement('i');pixel.style.backgroundColor=fallbackColors[item.category][j];pixel.style.width=pixel.style.height=`${j?5:7}px`;pixelLayer.append(pixel);return pixel});
 pixels.forEach(pixel=>{pixel.style.setProperty('--pixel-drift-time',`${3.6+(i%4)*.55}s`);pixel.style.setProperty('--pixel-drift-delay',`${-i*.43}s`)});
 const source=new Image();source.onload=()=>{
  try{
   const canvas=document.createElement('canvas');canvas.width=canvas.height=40;
   const context=canvas.getContext('2d',{willReadFrequently:true});context.drawImage(source,0,0,40,40);
   const data=context.getImageData(0,0,40,40).data,buckets=new Map();
   for(let k=0;k<data.length;k+=4){const r=data[k],g=data[k+1],b=data[k+2],high=Math.max(r,g,b),low=Math.min(r,g,b);
    if(data[k+3]<180||high-low<35||high<65||low>225)continue;
    const key=[r,g,b].map(v=>Math.floor(v/32)).join(',');const bucket=buckets.get(key)||{count:0,r:0,g:0,b:0};bucket.count++;bucket.r+=r;bucket.g+=g;bucket.b+=b;buckets.set(key,bucket);
   }
   const colors=[...buckets.values()].sort((a,b)=>b.count-a.count);
   pixels.forEach((pixel,j)=>{const color=colors[j?Math.min(3,colors.length-1):0];if(color)pixel.style.backgroundColor=`rgb(${Math.round(color.r/color.count)},${Math.round(color.g/color.count)},${Math.round(color.b/color.count)})`});
  }catch{} // Keep the category palette if an image cannot be sampled.
 };source.src=item.image;return pixels;
});
const ringParts=['back','front'].map(side=>{
 const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');
 svg.classList.add('planet-ring',`planet-ring-${side}`);svg.setAttribute('viewBox','-500 -100 1000 200');svg.setAttribute('aria-hidden','true');
 const path=document.createElementNS(svg.namespaceURI,'path');
 path.setAttribute('d',side==='back'?'M -490 0 A 490 70 0 0 1 490 0':'M 490 0 A 490 70 0 0 1 -490 0');
 path.setAttribute('vector-effect','non-scaling-stroke');svg.append(path);hero.insertBefore(svg,field);return svg;
});
const ringMoon=document.createElement('i');ringMoon.className='planet-ring-moon';ringMoon.setAttribute('aria-hidden','true');hero.insertBefore(ringMoon,field);
function paint(){
 const w=hero.clientWidth,h=hero.clientHeight,mobile=w<=700;
 const top=mobile?245:280,bottom=document.querySelector('.hero-bottom').offsetTop-24;
 hero.style.setProperty('--gather-label-limit',`${bottom-24}px`);
 const orbitCompact=mobile?.82:1;
 const stage=Math.max(160,bottom-top),cy=(top+bottom)/2-h/2,radius=Math.min(w*.34,stage*.36)*orbitCompact;
 const radiusX=Math.min(radius*(mobile?1.10:1.95),w*(mobile?.36:.39));
 const c=Math.cos(orbitAngle),s=Math.sin(orbitAngle);
 // Batch layout reads before rendering any artwork.
 const sizes=books.map(book=>({width:book.offsetWidth,height:book.offsetHeight}));
 const heroTop=hero.getBoundingClientRect().top;
 const labels=Object.fromEntries(categories.map(id=>[id,labelContainer.querySelector(`[data-category="${id}"]`).getBoundingClientRect()]));
 const ringScaleX=Math.min(radiusX*3.5,w*.9*orbitCompact)/1000,ringScaleY=Math.min(radius*4.3,w*.9*orbitCompact)/1000,ringOpacity=1-progress;
 ringParts.forEach(ring=>{ring.style.transform=`translate(-50%,-50%) translateY(${cy}px) rotate(-16deg) scale(${ringScaleX},${ringScaleY})`;ring.style.opacity=String(ringOpacity)});
 const moonAngle=2.65-orbitAngle*.45,moonX=Math.cos(moonAngle)*490*ringScaleX,moonY=Math.sin(moonAngle)*70*ringScaleY,tilt=-16*Math.PI/180;
 ringMoon.style.transform=`translate(-50%,-50%) translate3d(${moonX*Math.cos(tilt)-moonY*Math.sin(tilt)}px,${cy+moonX*Math.sin(tilt)+moonY*Math.cos(tilt)}px,0)`;
 ringMoon.style.opacity=String(ringOpacity);ringMoon.style.zIndex=Math.sin(moonAngle)>=0?'86':'0';
 pixelLayer.style.opacity='1';
 books.forEach((book,i)=>{
  const point=spherePoints[i],x=point.x*c+point.z*s,z=point.z*c-point.x*s,depth=(z+1)/2;
  const p=clamp((progress-i*.012)/(1-i*.012),0,1),blend=1-p;
  const baseSize=Math.min(mobile?100:165,radius*.68),baseScale=baseSize/sizes[i].width*(items[i].project.phoneMockup?.65:1);
  const orbitSize=items[i].project.id==='poti'?1.35:items[i].project.id==='the-seventh-day'?1.3:1;
  // Perspective strengthens the foreground without washing out the far artwork.
  const perspective=.44+.78*Math.pow(depth,1.3);
  let px=x*radiusX,py=point.y*radius,scale=baseScale*perspective*orbitSize;
  scale*=1+.5*orbitEmphasis[i];
  const v=groupedPosition(i,mobile),category=items[i].category,amount=dockAmounts[category]*p;
  if(items[i].project.id==='poti')v[3]*=1.4;
  if(items[i].project.id==='the-seventh-day')v[3]*=1.25;
  if(items[i].project.id==='tianshili-cod-sausage')v[3]*=.68;
  if(amount>0){
   const center=clusterCenters[mobile?'mobile':'desktop'][category];
   const distance=Math.hypot((v[0]*w-pointer.x)/140,(v[1]*h-pointer.y)/110);
   const proximity=focusedCategory===category?1:Math.exp(-distance*distance*.7);
   const spread=['space','book','ip'].includes(category)?.25:1.05;
   v[0]+=(v[0]-center[0])*(reducedMotion.matches?0:spread)*amount;
   v[1]+=(v[1]-center[1])*(reducedMotion.matches?0:spread)*amount-(reducedMotion.matches?0:.04)*amount;
   v[2]*=1+(reducedMotion.matches?0:.28)*amount;
   v[3]*=1+amount*(reducedMotion.matches?.08:.26+.20*proximity);
  }
  const isSpace=category==='space';
  const limitW=w*(mobile?(isSpace?.34:.27):.17),limitH=h*(mobile?(isSpace?.15:.115):(isSpace?.19:.16));
  const radians=v[2]*Math.PI/180;
  const rotatedW=Math.abs(sizes[i].width*Math.cos(radians))+Math.abs(sizes[i].height*Math.sin(radians));
  const rotatedH=Math.abs(sizes[i].width*Math.sin(radians))+Math.abs(sizes[i].height*Math.cos(radians));
  const previous=mobile?(category==='space'?['digital','book']:['digital','book'].includes(category)?['brand','ip']:[]):['book','space'].includes(category)?['brand','ip','digital']:[];
  const cellTop=previous.length?Math.max(...previous.map(id=>labels[id].bottom-heroTop))+18:h*(mobile?.25:.34);
  const cellBottom=labels[category].top-heroTop-18;
  const groupScale=Math.min(v[3],limitW/Math.max(rotatedW,1),limitH/Math.max(rotatedH,1),Math.max(1,cellBottom-cellTop)/Math.max(rotatedH,1));
  const halfHeight=rotatedH*groupScale/2;
  const groupY=cellBottom-halfHeight-h/2;
  workPixels[i].forEach((pixel,j)=>{
   const angle=i*2.399963+j*Math.PI,spread=radius*(j?.42:.32);
   const dx=clamp(x*radiusX*1.16+Math.cos(angle)*spread,-w/2+22,w/2-22);
   const dy=clamp(point.y*radius*1.14+Math.sin(angle)*spread,-stage/2+14,stage/2-14);
   const groupX=clamp(v[0]*w+(i%2?1:-1)*(rotatedW*groupScale/2+12+(i%3)*6),-w/2+12,w/2-12);
   const groupPixelY=clamp(groupY+(i%2?-.2:.18)*rotatedH*groupScale,cellTop-h/2+6,cellBottom-h/2-6);
   pixel.style.transform=`translate3d(${dx*blend+groupX*p}px,${(dy+cy)*blend+groupPixelY*p}px,0)`;
   pixel.style.opacity=String((.5+depth*.5)*blend+(j?0:.45)*p);
   pixel.style.width=pixel.style.height=`${(j?5:7)*(1-.25*p)}px`;
  });
  book.hidden=false;
  book.style.transform=`translate(-50%,-50%) translate3d(${px*blend+v[0]*w*p}px,${(py+cy)*blend+groupY*p}px,0) rotate(${v[2]*p}deg) scale(${scale*blend+groupScale*p})`;
  book.style.opacity=String((.76+depth*.24)*blend+p);
  const distance=(1-depth)*blend*(1-orbitEmphasis[i]);
  book.style.setProperty('--orbit-saturation', String(1-distance*.22));
  book.style.setProperty('--orbit-blur', `${(mobile?0:.32)*distance}px`);
  book.style.zIndex=orbitEmphasis[i]>.01&&progress<.5?'180':String(Math.round(depth*80*blend+(i+1)*p)+(amount>.01?90:0)+(['haidian-jiwa','jiwa-gashapon'].includes(items[i].project.id)?Math.round(30*p):0));
  book.href=progress>=.5?`work.html?type=${category}`:`project.html?id=${encodeURIComponent(items[i].project.id)}`;
  book.setAttribute('aria-label',progress>=.5?`浏览${window.designCategories.find(c=>c.id===category).label}作品`:`${items[i].project.title}，点击查看详情`);
 });
 const timeline=hero.classList.contains('is-timeline');
 buttons.scatter.setAttribute('aria-pressed',String(!timeline&&target<.5));buttons.gather.setAttribute('aria-pressed',String(!timeline&&target>=.5));
 document.querySelector('#progress').textContent=progress>.5?'01':'00';
 labelContainer.style.opacity=clamp((progress-.6)/.4,0,1);labelContainer.setAttribute('aria-hidden',String(progress<.85));
 labelContainer.querySelectorAll('a').forEach(a=>a.tabIndex=progress>=.85?0:-1);
 hero.classList.toggle('is-grouped',progress>.5);hidePreview();
}
function tick(now){
 frame=0;
 const dt=orbitLast?Math.min(now-orbitLast,50):16;orbitLast=now;
 const orbitActive=!document.hidden&&!hero.classList.contains('is-timeline')&&hero.getBoundingClientRect().bottom>0&&progress<.99;
 orbitSpeed+=( (orbitHover?.22:1)-orbitSpeed)*.08;
 if(orbitActive&&!reducedMotion.matches&&!orbitPaused&&!orbitDrag)orbitAngle+=dt*.00010*orbitSpeed;
 progress=reducedMotion.matches?target:progress+(target-progress)*.085;
 if(Math.abs(target-progress)<.0005)progress=target;
 let moving=progress!==target;
 orbitEmphasis.forEach((amount,i)=>{
  const wanted=books[i]===orbitSelected?1:0;
  orbitEmphasis[i]=reducedMotion.matches?wanted:amount+(wanted-amount)*.14;
  if(Math.abs(wanted-orbitEmphasis[i])<.001)orbitEmphasis[i]=wanted;
  if(orbitEmphasis[i]!==wanted)moving=true;
 });
 const active=progress>=.85?(focusedCategory||hoveredCategory):null;
 for(const id of categories){
  const wanted=id===active?1:0;
  dockAmounts[id]=reducedMotion.matches?wanted:dockAmounts[id]+(wanted-dockAmounts[id])*(wanted?.14:.19);
  if(Math.abs(wanted-dockAmounts[id])<.001)dockAmounts[id]=wanted;
  if(dockAmounts[id]!==wanted)moving=true;
 }
 paint();if(moving||(orbitActive&&!reducedMotion.matches&&!orbitPaused&&!orbitDrag))startAnimation();
}
function setTarget(value){target=value;hidePreview();hoveredCategory=null;focusedCategory=null;startAnimation()}
hero.addEventListener('pointermove',event=>{
 if(event.pointerType==='touch'||progress<.85)return;
 const rect=hero.getBoundingClientRect();pointer.x=event.clientX-rect.left-rect.width/2;pointer.y=event.clientY-rect.top-rect.height/2;
 const label=event.target.closest('.category-label');
 let next=label?label.dataset.category:null;
 if(!next){
  let closest=Infinity;
  for(const id of categories){
   const center=clusterCenters[innerWidth<=700?'mobile':'desktop'][id];
   const distance=Math.hypot((pointer.x-center[0]*rect.width)/Math.min(rect.width*.16,220),(pointer.y-center[1]*rect.height)/Math.min(rect.height*.16,150));
   if(distance<1&&distance<closest){closest=distance;next=id}
  }
 }
 hoveredCategory=next;startAnimation();
});
hero.addEventListener('pointerleave',()=>{hoveredCategory=null;startAnimation()});

function fromScroll(){const distance=track.offsetHeight-hero.offsetHeight;setTarget(clamp((scrollY-track.offsetTop)/Math.max(distance,1),0,1))}
buttons.scatter.addEventListener('click',()=>setTarget(0));buttons.gather.addEventListener('click',()=>setTarget(1));
document.querySelectorAll('a[href="#home"]').forEach(a=>a.addEventListener('click',()=>setTarget(0)));
addEventListener('scroll',fromScroll,{passive:true});addEventListener('resize',()=>{paint();fromScroll()});
reducedMotion.addEventListener('change',()=>{if(!frame)frame=requestAnimationFrame(tick)});
const preview=document.createElement('aside');preview.className='project-preview';preview.hidden=true;preview.setAttribute('aria-hidden','true');hero.append(preview);
function showPreview(project){preview.innerHTML=`<div><span>${project.isReal?window.designCategories.find(c=>c.id===project.primaryCategory).label+' · '+(window.formatProjectDate(project)):'作品预览 · 演示条目'}</span><strong>${project.title}</strong><small>${window.formatProjectDate(project)} · 点击查看详情</small></div>`;preview.hidden=false}
function hidePreview(){preview.hidden=true}
paint();fromScroll();

// Pointer dragging turns the orbit; a short drag never opens a project.
hero.addEventListener('pointerdown',e=>{
 if(progress>.1||hero.classList.contains('is-timeline')||e.target.closest('button,nav,.hero-bottom,.topline')||e.button!==0)return;
 orbitDrag={id:e.pointerId,x:e.clientX,angle:orbitAngle,moved:false};
});
hero.addEventListener('pointermove',e=>{
 if(!orbitDrag||orbitDrag.id!==e.pointerId)return;
 if(Math.abs(e.clientX-orbitDrag.x)>6){orbitDrag.moved=true;hero.setPointerCapture(e.pointerId);}
 if(orbitDrag.moved){orbitAngle=orbitDrag.angle+(e.clientX-orbitDrag.x)*.008;paint();}
});
function endOrbitDrag(e){
 if(!orbitDrag||e.pointerId!==orbitDrag.id)return;
 if(orbitDrag.moved)orbitSuppressUntil=performance.now()+350;
 orbitDrag=null;if(hero.hasPointerCapture(e.pointerId))hero.releasePointerCapture(e.pointerId);startAnimation();
}
hero.addEventListener('pointerup',endOrbitDrag);hero.addEventListener('pointercancel',endOrbitDrag);
hero.addEventListener('lostpointercapture',()=>{orbitDrag=null;startAnimation()});
hero.addEventListener('click',e=>{if(performance.now()<orbitSuppressUntil){e.preventDefault();e.stopImmediatePropagation()}},true);
field.addEventListener('dragstart',e=>e.preventDefault());
hero.addEventListener('pointerenter',e=>{if(e.pointerType!=='touch'){orbitHover=true;startAnimation()}});
hero.addEventListener('pointerleave',()=>{orbitHover=false;orbitSelected=null;startAnimation()});
field.addEventListener('pointerover',e=>{orbitSelected=e.target.closest('.book');startAnimation()});
field.addEventListener('pointerout',e=>{orbitSelected=e.relatedTarget?.closest?.('.book')||null;startAnimation()});
field.addEventListener('focusin',e=>{orbitHover=true;orbitSelected=e.target.closest('.book');startAnimation()});
field.addEventListener('focusout',()=>{orbitHover=false;orbitSelected=null;startAnimation()});
orbitPause.addEventListener('click',()=>{orbitPaused=!orbitPaused;orbitPause.setAttribute('aria-pressed',String(orbitPaused));orbitPause.innerHTML=orbitPaused?'<svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="m5 3 8 5-8 5Z" fill="currentColor"/></svg>':'<svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M5 3v10M11 3v10" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>';orbitPause.setAttribute('aria-label',orbitPaused?'继续自动旋转':'暂停自动旋转');startAnimation()});
addEventListener('visibilitychange',()=>{orbitLast=0;startAnimation()});
new IntersectionObserver(entries=>{if(entries[0].isIntersecting){orbitLast=0;startAnimation()}}).observe(hero);

