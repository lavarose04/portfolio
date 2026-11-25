(() => {
  const copy = document.querySelector('.hero-copy');
  const button = copy?.querySelector('.my-word');
  if (!button) return;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const introDeadline = performance.now() + 1000;
  let intro = true;
  let hovered = false;
  let pinned = false;
  let focused = false;
  let hoverReadyAt = Infinity;
  let lastPointer = null;
  const update = () => {
    const expanded = pinned || focused || (!intro && hovered);
    copy.classList.toggle('kinetic-expanded', expanded);
    const caption=document.querySelector('#hero-caption-readable');
    if(caption)caption.textContent=expanded?'欢迎来到“铭玥”的世界':'欢迎来到“我”的世界';
    button.setAttribute('aria-expanded', String(intro || expanded));
    button.setAttribute('aria-label', expanded ? '收起铭玥的名字' : '展开铭玥的名字');
  };
  const finishIntro = () => {
    if (!intro) return;
    intro = false;
    hovered = false;
    hoverReadyAt = performance.now() + (reducedMotion.matches ? 0 : 600);
    copy.classList.add('kinetic-ready');
    update();
  };
  const clearInteraction = () => {
    hovered = pinned = focused = false;
    update();
  };
  // Start independently of font loading: a delayed font must not hold the name open.
  window.setTimeout(finishIntro, 1000);
  // Layout changes can produce pointerenter without user intent. Only a real move
  // after the opening sequence may expand the name; a stationary cursor cannot.
  document.addEventListener('pointermove', event => {
    if (event.pointerType !== 'mouse') return;
    const moved = !lastPointer || event.clientX !== lastPointer.x || event.clientY !== lastPointer.y;
    lastPointer = { x: event.clientX, y: event.clientY };
    if (!moved || intro || performance.now() < hoverReadyAt) return;
    const rect = button.getBoundingClientRect();
    const hitPadding=Math.max(0,44-rect.height)/2;
    const inside = event.clientX >= rect.left && event.clientX <= rect.right &&
      event.clientY >= rect.top-hitPadding && event.clientY <= rect.bottom+hitPadding;
    if (inside !== hovered) { hovered = inside; update(); }
  }, { passive: true });
  button.addEventListener('pointerleave', () => { hovered = false; update(); });
  button.addEventListener('focus', () => { focused = button.matches(':focus-visible'); update(); });
  button.addEventListener('blur', clearInteraction);
  button.addEventListener('click', () => { pinned = !pinned; update(); });
  button.addEventListener('keydown', event => {
    if (event.key === 'Escape') { event.preventDefault(); clearInteraction(); }
  });
  document.addEventListener('pointerdown', event => {
    if (!button.contains(event.target)) clearInteraction();
  });
  window.addEventListener('blur', clearInteraction);
  document.addEventListener('visibilitychange', () => {
    clearInteraction();
    if (!document.hidden && performance.now() >= introDeadline) finishIntro();
  });
  window.addEventListener('pageshow', event => {
    if (!event.persisted) return;
    finishIntro();
    clearInteraction();
  });
})();
