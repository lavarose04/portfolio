const workCategories=window.designCategories;
const projects=window.portfolioProjects;
const yearOptions=['2026','2025','2024','earlier'];
const filters=document.querySelector('#year-filters'),typeFilters=document.querySelector('#type-filters');
const results=document.querySelector('#work-results');
const typeDropdown=document.querySelector('.type-filter-dropdown');
const typeToggle=document.querySelector('#type-filter-toggle');
const typeLabel=document.querySelector('#type-filter-label');
const compactTypes=matchMedia('(max-width:700px)');
function setTypeOpen(open,restoreFocus=false){
 if(!compactTypes.matches){typeFilters.hidden=false;typeToggle.setAttribute('aria-expanded','false');return;}
 typeFilters.hidden=!open;
 typeToggle.setAttribute('aria-expanded',String(open));
 if(restoreFocus)typeToggle.focus({preventScroll:true});
}
typeToggle.addEventListener('click',()=>setTypeOpen(typeFilters.hidden));
document.addEventListener('pointerdown',event=>{if(!typeDropdown.contains(event.target))setTypeOpen(false)});
typeDropdown.addEventListener('focusout',event=>{if(!typeDropdown.contains(event.relatedTarget))setTypeOpen(false)});
typeDropdown.addEventListener('keydown',event=>{
 if(!compactTypes.matches)return;
 if(event.key==='Escape'){event.preventDefault();setTypeOpen(false,true);return}
 const options=[...typeFilters.querySelectorAll('button')];
 if(!options.length)return;
 if(['ArrowDown','ArrowUp','Home','End'].includes(event.key)){
  event.preventDefault();
  const wasClosed=typeFilters.hidden;
  setTypeOpen(true);
  const current=options.indexOf(document.activeElement);
  const selected=options.findIndex(button=>button.getAttribute('aria-pressed')==='true');
  const index=event.key==='Home'?0:event.key==='End'?options.length-1:wasClosed?Math.max(0,selected):(current+(event.key==='ArrowDown'?1:-1)+options.length)%options.length;
  options[index].focus({preventScroll:true});
 }
});
let selectedYear='2026',selectedType='all';
function readFilters(){const url=new URL(location.href);return {year:yearOptions.includes(url.searchParams.get('year'))?url.searchParams.get('year'):'2026',type:workCategories.some(c=>c.id===url.searchParams.get('type'))?url.searchParams.get('type'):'all'}}
function updateURL(year,type,replace=false){const url=new URL(location.href);url.searchParams.set('year',year);if(type==='all')url.searchParams.delete('type');else url.searchParams.set('type',type);history[replace?'replaceState':'pushState'](null,'',url)}
function navigate(year,type){
 if(type!==selectedType)render(year,type);
 updateURL(year,type);jumpToYear(year);
}
function addFilter(parent,id,label,kind){const b=document.createElement('button');b.type='button';b.dataset[kind]=id;b.textContent=label;b.addEventListener('click',()=>{navigate(kind==='year'?id:selectedYear,kind==='type'?id:selectedType);if(kind==='type')setTypeOpen(false,true)});parent.append(b)}
for(const year of yearOptions)addFilter(filters,year,year==='earlier'?'更早':year,'year');
addFilter(typeFilters,'all','全部类型','type');
for(const category of workCategories)addFilter(typeFilters,category.id,category.label,'type');
function render(year,type){
 selectedYear=year;selectedType=type;
 const currentTypeLabel=workCategories.find(category=>category.id===type)?.label||'全部类型';
 typeLabel.textContent=currentTypeLabel;
 typeToggle.setAttribute('aria-label',`筛选作品类型：${currentTypeLabel}`);
 filters.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.year===year)));
 typeFilters.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.type===type)));
 const visible=projects.filter(p=>type==='all'||p.types.includes(type)).sort((a,b)=>b.year-a.year||(b.month||0)-(a.month||0));
 filters.querySelectorAll('button').forEach(b=>b.disabled=!visible.some(p=>b.dataset.year==='earlier'?p.year<2024:String(p.year)===b.dataset.year));
 results.replaceChildren();
 if(!visible.length){const empty=document.createElement('p');empty.className='work-empty';empty.textContent='这个年份下暂时没有这一类型的作品。试试其他年份或类型。';results.append(empty);return}
 const years=[...new Set(visible.map(p=>p.year))];
 for(const y of years){
  const section=document.createElement('section');section.className='work-year';section.id=`work-year-${y}`;section.dataset.year=y;section.setAttribute('aria-labelledby',`year-${y}`);
  section.innerHTML=`<div class="work-year-heading"><h2 id="year-${y}">${y}</h2><span>${visible.some(p=>p.year===y&&p.isReal)?'':'演示年份'}</span></div><div class="work-grid"></div>`;
  for(const project of visible.filter(p=>p.year===y)){
   const card=document.createElement('a');card.className='work-card';card.dataset.projectId=project.id;card.dataset.primaryCategory=project.primaryCategory;card.href=`project.html?id=${encodeURIComponent(project.id)}`;
   card.setAttribute('aria-label',`${project.title}，${window.formatProjectDate(project)}${project.isReal?'':' 演示年份'}，作品详情`);
   const cover=['poster','ip','photo','typeface'].includes(project.format)?`<img class="poster-card-cover ${project.format==='ip'?'ip-card-cover':''}${project.phoneMockup?' phone-card-cover':''}" src="${project.image}" alt="${project.title}" loading="lazy">`:null;
   card.innerHTML=`<div class="work-card-image">${cover||`<svg viewBox="390 110 1180 985" role="img" aria-label="${project.isReal?project.title+'封面':'书籍照片占位'}"><defs><clipPath id="clip-${project.id}"><polygon points="408,511 1014,126 1549,572 1545,616 919,1079 908,1038 411,551"/></clipPath></defs><image href="${project.image}" width="1920" height="1280" ${project.transparent?'':`clip-path="url(#clip-${project.id})"`}/></svg>`}${project.videoCover?`<i class="video-cover-play" aria-hidden="true"></i>`:''}<span>作品详情 →</span></div><div class="work-card-caption"><h3>${project.title}</h3><span>${window.formatProjectDate(project)}</span></div><p class="work-outputs">${project.types.map(id=>workCategories.find(c=>c.id===id)?.label).filter(Boolean).join(' · ')}</p>`;
   section.querySelector('.work-grid').append(card);
  }
  results.append(section);
 }
}
const controls=document.querySelector('.work-controls');
let jumping=false,jumpTimer=0,scrollFrame=0;
function markYear(year){selectedYear=year;filters.querySelectorAll('button').forEach(b=>{const active=b.dataset.year===year;b.setAttribute('aria-pressed',String(active));if(active)b.setAttribute('aria-current','date');else b.removeAttribute('aria-current')})}
function jumpToYear(year,instant=false){
 const sections=[...results.querySelectorAll('.work-year')];
 const section=sections.find(s=>year==='earlier'?Number(s.dataset.year)<2024:s.dataset.year===year)||sections[0];
 if(!section)return;
 const actual=Number(section.dataset.year)<2024?'earlier':section.dataset.year;
 markYear(actual);jumping=true;clearTimeout(jumpTimer);
 const stickyTop=parseFloat(getComputedStyle(controls).top)||0;
 const top=section.getBoundingClientRect().top+scrollY-stickyTop-controls.offsetHeight-24;
 scrollTo({top:Math.max(0,top),behavior:instant||matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
 jumpTimer=setTimeout(()=>{jumping=false;syncYear()},900);
}
function syncYear(){
 if(jumping)return;
 const sections=[...results.querySelectorAll('.work-year')];if(!sections.length)return;
 const threshold=(parseFloat(getComputedStyle(controls).top)||0)+controls.offsetHeight+50;
 let current=sections[0];
 for(const section of sections){if(section.getBoundingClientRect().top<=threshold)current=section}
 if(scrollY+innerHeight>=document.documentElement.scrollHeight-8)current=sections[sections.length-1];
 const year=Number(current.dataset.year)<2024?'earlier':current.dataset.year;
 if(year!==selectedYear){markYear(year);updateURL(year,selectedType,true)}
}
addEventListener('scroll',()=>{if(!scrollFrame)scrollFrame=requestAnimationFrame(()=>{scrollFrame=0;syncYear()})},{passive:true});
addEventListener('wheel',()=>{jumping=false;clearTimeout(jumpTimer)},{passive:true});
addEventListener('touchstart',()=>{jumping=false;clearTimeout(jumpTimer)},{passive:true});
addEventListener('popstate',()=>{setTypeOpen(false);const state=readFilters();render(state.year,state.type);jumpToYear(state.year,true)});
const initial=readFilters();render(initial.year,initial.type);
setTypeOpen(false);
compactTypes.addEventListener('change',()=>{
 const hadFocus=typeDropdown.contains(document.activeElement);
 setTypeOpen(false);
 if(hadFocus){const destination=compactTypes.matches?typeToggle:typeFilters.querySelector('[aria-pressed=true]');destination?.focus({preventScroll:true});}
});
if(new URL(location.href).searchParams.has('year'))requestAnimationFrame(()=>jumpToYear(initial.year,true));
