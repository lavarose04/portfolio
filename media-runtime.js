(() => {
 const media=window.portfolioMedia||{};
 const key=source=>{
  if(!source)return '';
  if(source.startsWith('assets/'))return source.split('?')[0];
  try{const path=new URL(source,location.href).pathname;const index=path.indexOf('/assets/');return index<0?'':path.slice(index+1);}catch{return '';}
 };
 const asset=(source,pixels=960)=>{
  const entry=media[key(source)];if(!entry)return source;
  return (entry.variants.find(v=>v.width>=pixels)||entry.variants.at(-1)).src;
 };
 window.portfolioAsset=asset;
 const prepare=(markup,context='detail')=>{
  const template=document.createElement('template');template.innerHTML=markup;
  let heroAssigned=false;
  template.content.querySelectorAll('img').forEach(img=>{
   const source=img.getAttribute('src'),entry=media[key(source)];
   const gallery=img.closest('.book-carousel');
   const below=img.getAttribute('loading')==='lazy';
   const hero=context==='orbit'||context==='detail'&&!below&&!gallery&&!heroAssigned;
   if(hero)heroAssigned=true;
   if(entry){
    img.setAttribute('src',asset(source,context==='orbit'?480:960));
    img.setAttribute('srcset',entry.variants.map(v=>`${v.src} ${v.width}w`).join(', '));
    img.setAttribute('sizes',context==='orbit'?'(max-width:700px) 140px,240px':context==='card'?'(max-width:700px) 40vw,28vw':gallery?(entry.width<entry.height?'(max-width:700px) 40vw,40vw':'(max-width:700px) 90vw,70vw'):img.closest('.spring-overview,.seventh-hero')?'(max-width:700px) 88vw,1000px':'(max-width:700px) 88vw,630px');
    if(!img.hasAttribute('width'))img.setAttribute('width',entry.width);
    if(!img.hasAttribute('height'))img.setAttribute('height',entry.height);
   }
   img.setAttribute('decoding','async');
   img.setAttribute('loading',hero?'eager':'lazy');
   if(hero&&context!=='orbit')img.setAttribute('fetchpriority','high');
  });
  template.content.querySelectorAll('video').forEach(video=>{
   const poster=video.getAttribute('poster');if(poster)video.setAttribute('poster',asset(poster,1280));
   video.setAttribute('preload','none');
  });
  template.content.querySelectorAll('svg image').forEach(img=>{
   const source=img.getAttribute('href')||img.getAttribute('xlink:href');
   if(!media[key(source)])return;
   const optimized=asset(source,(context==='detail'?1200:400)*Math.min(devicePixelRatio||1,2));
   img.removeAttribute('xlink:href');
   if(context==='card'){
    img.removeAttribute('href');img.setAttribute('data-media-href',optimized);
   }else img.setAttribute('href',optimized);
  });
  return template.innerHTML;
 };
 window.portfolioPrepareMarkup=prepare;
 const loadSVG=element=>{
  const images=element.matches('image[data-media-href]')?[element]:element.querySelectorAll('image[data-media-href]');
  images.forEach(img=>{img.setAttribute('href',img.getAttribute('data-media-href'));img.removeAttribute('data-media-href');});
 };
 const observer='IntersectionObserver' in window?new IntersectionObserver(entries=>entries.forEach(e=>{
  if(e.isIntersecting){loadSVG(e.target);observer.unobserve(e.target);}
 }),{rootMargin:'300px 0px'}):null;
 const observe=root=>root.querySelectorAll('image[data-media-href]').forEach(img=>{
  const target=img.closest('.work-card')||img;
  if(observer)observer.observe(target);else loadSVG(target);
 });
 window.portfolioSetMarkup=(element,markup,context)=>{element.innerHTML=prepare(markup,context);observe(element);};
 // Route all existing case renderers through one inert-template preparation step.
 // Template content cannot request images before its sources have been resized.
 const detail=document.querySelector('#project-detail');
 if(detail){
  const descriptor=Object.getOwnPropertyDescriptor(Element.prototype,'innerHTML');
  Object.defineProperty(detail,'innerHTML',{
   configurable:true,
   get(){return descriptor.get.call(this);},
   set(markup){descriptor.set.call(this,prepare(markup,'detail'));observe(this);}
  });
 }
 const results=document.querySelector('#work-results');
 if(results){new MutationObserver(()=>observe(results)).observe(results,{childList:true,subtree:true});observe(results);}
})();
