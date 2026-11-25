// A classic bootstrap can report file:// restrictions even when ES modules are blocked.
(async()=>{
const models=[...document.querySelectorAll('.ip-model model-viewer')];
if(location.protocol==='file:'){
 for(const viewer of models){
  viewer.style.visibility='hidden';
  const message=viewer.closest('.ip-model-stage').querySelector('.ip-model-error');
  message.hidden=false;
  message.replaceChildren(document.createTextNode('直接打开 HTML 文件无法加载交互模型。'));
  const link=document.createElement('a');
  const url=new URL('http://127.0.0.1:4173/project.html');
  url.search=location.search;
  url.hash='ip-models';
  link.href=url.href;
  link.textContent='打开网页预览 ↗︎';
  message.append(link);
 }
 return;
}
function showError(viewer){
 viewer.closest('.ip-model-stage').querySelector('.ip-model-error').hidden=false;
 viewer.style.visibility='hidden';
}
for(const viewer of models){
 const stage=viewer.closest('.ip-model-stage');
 const poster=viewer.querySelector('.ip-model-loading');
 viewer.addEventListener('progress',event=>{
  const percent=Math.round(event.detail.totalProgress*100);
  poster.textContent=percent<100?`正在加载模型 ${percent}%`:'正在准备三维画面…';
 });
 viewer.addEventListener('load',()=>{
  poster.hidden=true;
  stage.querySelector('.ip-model-error').hidden=true;
  viewer.style.visibility='';
 });
 viewer.addEventListener('error',()=>showError(viewer));
 stage.querySelector('.ip-model-retry').addEventListener('click',()=>{
  stage.querySelector('.ip-model-error').hidden=true;
  poster.hidden=false;
  poster.textContent='正在重新加载模型…';
  viewer.style.visibility='';
  const url=new URL(viewer.getAttribute('src'),location.href);
  url.searchParams.set('retry',Date.now());
  viewer.src=url.href;
 });
}
if(models.length&&'IntersectionObserver' in window){
 await new Promise(resolve=>{
  const observer=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){observer.disconnect();resolve();}},{rootMargin:'400px 0px'});
  observer.observe(models[0].closest('.ip-model-stage'));
 });
}
if(matchMedia('(prefers-reduced-motion: reduce)').matches)models.forEach(viewer=>viewer.removeAttribute('auto-rotate'));
try{
 await import('./assets/vendor/model-viewer.min.js');
}catch(error){
 models.forEach(showError);
 // A full refresh also retries a failed component import.
 document.querySelectorAll('.ip-model-retry').forEach(button=>{
  button.onclick=()=>location.reload();
 });
 console.error('无法载入模型预览组件',error);
}

})();
