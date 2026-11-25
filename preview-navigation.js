(() => {
 const detail=document.querySelector('#project-detail');
 if(detail){
  const records=window.portfolioProjects||[];
  const id=window.portfolioProjectId;
  const current=records.find(p=>p.id===id||p.aliases?.includes(id));
  // Continue in archive order, prioritizing the current discipline.
  const ordered=records.filter(p=>p.isReal&&p.format!=='pending').sort((a,b)=>b.year-a.year||(b.month||0)-(a.month||0));
  const discipline=current?ordered.filter(p=>p.primaryCategory===current.primaryCategory):[];
  const sequence=discipline.length>1?discipline:ordered;
  const index=sequence.findIndex(p=>p.id===current?.id);
  if(current&&index>=0&&sequence.length>1){
   const next=sequence[(index+1)%sequence.length];
   const link=document.createElement('a');link.className='next-project';
   link.href=window.portfolioProjectHref(next.id);
   link.setAttribute('aria-label',`下一篇：${next.title}`);
   const text=document.createElement('span'),label=document.createElement('span'),title=document.createElement('strong'),arrow=document.createElement('span');
   label.className='next-project-label';label.textContent='下一篇 / NEXT PROJECT';title.textContent=next.title;
   arrow.className='next-project-arrow';arrow.textContent='→';arrow.setAttribute('aria-hidden','true');
   text.append(label,title);link.append(text,arrow);
   const footer=detail.querySelector('.book-detail-links');
   if(footer)footer.before(link);else detail.append(link);
  }
 }
 // Keep ↗ for external/new-window links; internal navigation uses directional arrows.
 document.querySelectorAll('a[href]').forEach(link=>{
  const url=new URL(link.getAttribute('href'),location.href);
  if(url.origin!==location.origin||link.target==='_blank')return;
  const walker=document.createTreeWalker(link,NodeFilter.SHOW_TEXT);let node;
  while(node=walker.nextNode()){
   if(!node.textContent.includes('↗'))continue;
   node.textContent=node.textContent.replace(/↗[\uFE0E\uFE0F]?/g,'→');
   if(/^(回到|返回)/.test(node.textContent.trim()))node.textContent='← '+node.textContent.replace(/\s*→\s*$/,'').trim();
  }
 });
})();
