(() => {
 const results=document.querySelector('#work-results');if(!results)return;
 let frame=0;
 const align=()=>{
  frame=0;
  const cards=[...results.querySelectorAll('.work-card')];
  cards.forEach(card=>card.style.removeProperty('--card-title-height'));
  const rows=new Map();
  cards.forEach(card=>{
   const heading=card.querySelector('h3');if(!heading)return;
   const key=card.closest('.work-grid').parentElement.id+':'+Math.round(card.getBoundingClientRect().top);
   const row=rows.get(key)||{cards:[],height:0};row.cards.push(card);row.height=Math.max(row.height,heading.getBoundingClientRect().height);rows.set(key,row);
  });
  rows.forEach(row=>row.cards.forEach(card=>card.style.setProperty('--card-title-height',`${Math.ceil(row.height)}px`)));
 };
 const schedule=()=>{if(!frame)frame=requestAnimationFrame(align);};
 new MutationObserver(schedule).observe(results,{childList:true,subtree:true});
 new ResizeObserver(schedule).observe(results);
 addEventListener('resize',schedule);schedule();document.fonts.ready.then(schedule);
})();
