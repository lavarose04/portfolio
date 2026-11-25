(() => {
 window.portfolioProjectId=document.querySelector('meta[name="portfolio-project-id"]')?.content||new URL(location.href).searchParams.get('id');
 const cache=new Map();
 window.portfolioProjectHref=id=>{
  if(cache.has(id))return cache.get(id);
  const record=[...(window.portfolioProjects||[]),...(window.portfolioDraftProjects||[])].find(p=>p.id===id||p.aliases?.includes(id));
  const href=record?.isReal&&record.format!=='pending'?`project-${encodeURIComponent(record.id)}.html`:`project.html?id=${encodeURIComponent(id)}`;
  cache.set(id,href);return href;
 };
 document.addEventListener('DOMContentLoaded',()=>{
  if(window.portfolioPrerender||document.querySelector('meta[name="portfolio-project-id"]')||!window.portfolioProjectId)return;
  const record=(window.portfolioProjects||[]).find(p=>p.id===window.portfolioProjectId||p.aliases?.includes(window.portfolioProjectId));
  if(record?.isReal&&record.format!=='pending')location.replace(window.portfolioProjectHref(record.id)+location.hash);
 });
})();
