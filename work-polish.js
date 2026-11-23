(() => {
 const controls=document.querySelector('.work-controls');
 const summary=document.createElement('button');
 summary.type='button';summary.className='filter-summary';
 summary.setAttribute('aria-controls','year-filters type-filters');
 controls.prepend(summary);
 let pinned=false,closeTimer=0;
 const isDocked=()=>scrollY>220;
 const open=value=>{clearTimeout(closeTimer);controls.classList.toggle('filters-open',value);summary.setAttribute('aria-expanded',String(value));};
 const refresh=()=>{
  controls.classList.toggle('filters-docked',isDocked());
  const year=document.querySelector('#year-filters [aria-pressed=true]')?.textContent||'2026';
  const type=document.querySelector('#type-filter-label').textContent.replace('全部类型','全部');
  summary.replaceChildren(document.createTextNode('筛选'));
  const state=document.createElement('span');state.textContent=`${year} / ${type}`;summary.append(state);
  summary.setAttribute('aria-label',`展开筛选：${year} / ${type}`);
  if(!isDocked()){pinned=false;open(false);}
 };
 const measure=()=>{const docked=controls.classList.contains('filters-docked');controls.classList.remove('filters-docked');controls.style.removeProperty('--filter-reserved-height');controls.style.setProperty('--filter-reserved-height',`${controls.offsetHeight}px`);controls.classList.toggle('filters-docked',docked);};
 summary.addEventListener('click',()=>{pinned=true;open(true);document.querySelector('#year-filters button:not(:disabled)')?.focus({preventScroll:true});});
 controls.addEventListener('pointerenter',e=>{clearTimeout(closeTimer);if(e.pointerType==='mouse'&&isDocked())open(true);});
 controls.addEventListener('pointerleave',()=>{closeTimer=setTimeout(()=>{if(!pinned&&!controls.contains(document.activeElement)&&!controls.matches(':hover'))open(false);},240);});
 controls.addEventListener('focusin',e=>{if(e.target!==summary)open(true);});
 controls.addEventListener('focusout',e=>{if(!controls.contains(e.relatedTarget)){pinned=false;open(false);}});
 controls.addEventListener('keydown',e=>{if(e.key==='Escape'){pinned=false;summary.focus({preventScroll:true});open(false);}});
 document.addEventListener('pointerdown',e=>{if(!controls.contains(e.target)){pinned=false;open(false);}});
 new MutationObserver(refresh).observe(document.querySelector('#year-filters'),{subtree:true,attributes:true,attributeFilter:['aria-pressed']});
 new MutationObserver(refresh).observe(document.querySelector('#type-filter-label'),{subtree:true,childList:true});
 addEventListener('scroll',refresh,{passive:true});addEventListener('resize',measure);
 measure();refresh();
})();
