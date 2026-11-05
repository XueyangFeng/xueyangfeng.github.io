// Accessible native implementation of AcadHomepage's overflow navigation.
(() => {
  const nav = document.getElementById('site-nav');
  const visible = nav.querySelector('.visible-links');
  const overflow = nav.querySelector('.hidden-links');
  const button = nav.querySelector('button');
  const items = [...visible.children];
  function closeMenu() {
    overflow.hidden = true;
    button.setAttribute('aria-expanded', 'false');
    button.classList.remove('close');
  }
  function layout() {
    closeMenu();
    items.forEach(item => visible.appendChild(item));
    button.hidden = true;
    if (visible.getBoundingClientRect().width <= nav.clientWidth) return;
    button.hidden = false;
    const available = nav.clientWidth - button.getBoundingClientRect().width - 10;
    while (visible.children.length > 1 && visible.getBoundingClientRect().width > available) {
      overflow.prepend(visible.lastElementChild);
    }
  }
  button.addEventListener('click', () => {
    const open = overflow.hidden;
    overflow.hidden = !open;
    button.setAttribute('aria-expanded', String(open));
    button.classList.toggle('close', open);
  });
  overflow.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
  document.addEventListener('click', event => { if (!nav.contains(event.target)) closeMenu(); });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !overflow.hidden) { closeMenu(); button.focus(); }
  });
  window.addEventListener('resize', layout);
  window.addEventListener('load', layout);
  layout();
})();
