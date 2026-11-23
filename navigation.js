// Keep the floating navigation's selected segment in sync with the visible page.
const mainNavigation=document.querySelector('.header nav');
if(mainNavigation){
 const workLink=mainNavigation.querySelector('a[href="work.html"]');
 const aboutLink=mainNavigation.querySelector('a[href$="#about"]');
 const aboutSection=document.querySelector('#about');
 function markNavigation(aboutVisible){
  workLink?.removeAttribute('aria-current');
  aboutLink?.removeAttribute('aria-current');
  if(aboutVisible)aboutLink?.setAttribute('aria-current','location');
  else workLink?.setAttribute('aria-current','page');
 }
 markNavigation(!!aboutSection&&location.hash==='#about');
 if(aboutSection){
  const observer=new IntersectionObserver(entries=>markNavigation(entries[0].isIntersecting),{threshold:.25});
  observer.observe(aboutSection);
 }
}
// Reveal the current project when a long series is horizontally scrollable.
document.querySelectorAll('.graduation-project-links.glass-tabs').forEach(track=>{
 const selected=track.querySelector('[aria-current="page"]');
 if(selected&&track.scrollWidth>track.clientWidth){
  const activeBounds=selected.getBoundingClientRect();
  const trackBounds=track.getBoundingClientRect();
  track.scrollLeft=activeBounds.left-trackBounds.left-(track.clientWidth-activeBounds.width)/2;
 }
});
