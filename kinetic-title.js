(() => {
  const copy = document.querySelector('.hero-copy');
  const button = copy?.querySelector('.my-word');
  if (!button) return;
  let hovered = false;
  let pinned = false;
  let focused = false;
  let intro = true;
  const update = () => {
    const expanded = hovered || pinned || focused;
    copy.classList.toggle('kinetic-expanded', expanded);
    button.setAttribute('aria-expanded', String(intro || expanded));
    button.setAttribute('aria-label', expanded ? '收起铭玥的名字' : '展开铭玥的名字');
  };
  button.addEventListener('pointerenter', event => {
    if (event.pointerType === 'mouse') { hovered = true; update(); }
  });
  button.addEventListener('pointerleave', () => { hovered = false; update(); });
  button.addEventListener('focus', () => { focused = button.matches(':focus-visible'); update(); });
  button.addEventListener('blur', () => { focused = false; pinned = false; update(); });
  button.addEventListener('click', () => { pinned = !pinned; update(); });
  button.addEventListener('keydown', event => {
    if (event.key === 'Escape') { pinned = hovered = focused = false; update(); }
  });
  document.addEventListener('pointerdown', event => {
    if (!button.contains(event.target)) { pinned = false; update(); }
  });
  // Count the pause after the display font is ready, not during page loading.
  document.fonts.ready.then(() => {
    window.setTimeout(() => {
      intro = false;
      copy.classList.add('kinetic-ready');
      update();
    }, 1000);
  });
})();
