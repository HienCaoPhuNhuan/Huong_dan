(() => {
  'use strict';
  const root = document.documentElement;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const key = 'guide-route-transition';
  let leaving = false;
  function clearRoute() {
    root.classList.remove('route-leaving', 'route-arriving', 'route-back');
    leaving = false;
  }
  try {
    const pending = JSON.parse(sessionStorage.getItem(key) || 'null');
    sessionStorage.removeItem(key);
    if (!reduced.matches && pending && pending.path === location.pathname && Date.now() - pending.time < 10000) {
      root.classList.add('route-arriving');
      root.classList.toggle('route-back', pending.back);
      setTimeout(clearRoute, 850);
    }
  } catch (_) { /* Navigation still works without storage. */ }
  addEventListener('pageshow', event => { if (event.persisted) clearRoute(); });
  addEventListener('pagehide', clearRoute);
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href]');
    if (!link || event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || link.hasAttribute('download') || (link.target && link.target !== '_self')) return;
    const url = new URL(link.href, location.href);
    if (url.origin !== location.origin || url.pathname === location.pathname || !(/\.html$/i.test(url.pathname) || url.pathname.endsWith('/')) || reduced.matches) return;
    if (leaving) { event.preventDefault(); return; }
    event.preventDefault();
    leaving = true;
    const back = link.matches('.brand, .chapter-actions a:first-child');
    root.classList.remove('route-arriving');
    root.classList.toggle('route-back', back);
    root.classList.add('route-leaving');
    try { sessionStorage.setItem(key, JSON.stringify({path:url.pathname,time:Date.now(),back})); } catch (_) {}
    setTimeout(() => location.assign(url.href), 560);
    setTimeout(clearRoute, 3000);
  });
  document.addEventListener('DOMContentLoaded', () => {
    const main = document.querySelector('main.lesson-main, main.media-lab-main');
    if (!main) return;
    const excluded = '.preview,.lesson-banner,.workshop-stage,.shader-scene,.definition-flow,.setup-illustration,.setup-path,.rive-explanation,.theme-demo,.state-demo,.workflow-stage,.gsap-stage,.two,figure,dialog';
    const headings = [...main.querySelectorAll('h2,h3')].filter(h => !h.closest(excluded));
    if (!headings.length) return;
    const toolbar = document.createElement('nav');
    toolbar.className = 'reader-toolbar';
    toolbar.setAttribute('aria-label', 'Điều hướng phần đang đọc');
    const title = document.createElement('span'); title.className = 'reader-title';
    const position = document.createElement('span'); position.className = 'reader-position';
    function iconButton(icon, label) {
      const button = document.createElement('button'); button.type = 'button'; button.title = label; button.setAttribute('aria-label', label);
      const img = document.createElement('img'); img.src = `assets/reader-icons/${icon}.svg`; img.alt = ''; button.append(img); return button;
    }
    const previous = iconButton('chevron-up','Phần trước');
    const next = iconButton('chevron-down','Phần tiếp theo');
    const menu = iconButton('list','Mở mục lục bài');
    toolbar.append(position,title,previous,next,menu);
    document.body.insertBefore(toolbar, main);
    const dialog = document.createElement('dialog'); dialog.className = 'reader-dialog'; dialog.setAttribute('aria-labelledby','reader-toc-title');
    const header = document.createElement('header'); const heading = document.createElement('h2'); heading.id = 'reader-toc-title'; heading.textContent = 'Mục lục bài';
    const close = iconButton('x','Đóng mục lục'); header.append(heading,close);
    const list = document.createElement('ol'); dialog.append(header,list); document.body.append(dialog);
    let current = 0;
    const links = headings.map((h,i) => {
      if (!h.id) { let id = `reading-part-${i+1}`; while (document.getElementById(id)) id += '-part'; h.id = id; }
      h.classList.add('reading-anchor');
      const li = document.createElement('li'); const a = document.createElement('a'); a.href = `#${h.id}`; a.textContent = h.textContent;
      a.addEventListener('click',() => dialog.close()); li.append(a); list.append(li); return a;
    });
    function go(index) { headings[index]?.scrollIntoView({behavior:reduced.matches?'instant':'smooth',block:'start'}); }
    previous.addEventListener('click',() => go(Math.max(0,current-1)));
    next.addEventListener('click',() => go(Math.min(headings.length-1,current+1)));
    menu.addEventListener('click',() => dialog.showModal());
    close.addEventListener('click',() => dialog.close());
    dialog.addEventListener('close',() => menu.focus({preventScroll:true}));
    let scheduled = false;
    function update() {
      scheduled = false;
      current = 0;
      headings.forEach((h,i) => { if (h.getBoundingClientRect().top <= 120) current = i; });
      title.textContent = headings[current].textContent;
      position.textContent = `Phần ${current+1}/${headings.length}`;
      previous.disabled = current === 0; next.disabled = current === headings.length-1;
      links.forEach((a,i) => { if (i === current) a.setAttribute('aria-current','location'); else a.removeAttribute('aria-current'); });
    }
    addEventListener('scroll',() => { if (!scheduled) { scheduled = true; requestAnimationFrame(update); } },{passive:true});
    root.classList.add('reader-page'); update();
  });
})();
