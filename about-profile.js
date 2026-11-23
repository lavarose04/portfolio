// Two views of the same designer; the handle keeps its original appearance.
(()=>{
 const about=document.querySelector('#about'),toggle=document.querySelector('#profile-toggle');
 if(!about||!toggle)return;
 const portrait=about.querySelector('.about-portrait img'),personal=about.querySelector('#profile-personal'),professional=about.querySelector('#profile-professional');
 const original={src:portrait.getAttribute('src'),alt:portrait.alt,width:portrait.width,height:portrait.height};
 const englishName=about.querySelector('.profile-name [lang="en"]'),originalName=englishName.textContent;
 const photo=new Image();photo.src='assets/lmy-portrait.webp';
 toggle.addEventListener('click',()=>{
  const active=toggle.getAttribute('aria-pressed')!=='true';
  toggle.setAttribute('aria-pressed',String(active));toggle.textContent=active?'@LMY':'@lavarose';
  toggle.setAttribute('aria-label',active?'切换到 lavarose 兴趣介绍':'切换到 LMY 个人履历');
  personal.hidden=active;professional.hidden=!active;about.classList.toggle('is-professional',active);
  portrait.src=active?photo.src:original.src;portrait.alt=active?'李铭玥本人照片':original.alt;
  portrait.width=active?628:original.width;portrait.height=active?747:original.height;
  englishName.textContent=active?'Li Mingyue':originalName;
 });
})();
