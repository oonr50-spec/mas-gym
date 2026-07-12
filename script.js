
(() => {
  const loader = document.getElementById('pageLoader');
  window.addEventListener('load', () => setTimeout(() => loader?.classList.add('is-hidden'), 250));

  const header = document.getElementById('siteHeader');
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');
  const backToTop = document.getElementById('backToTop');
  const progress = document.getElementById('scrollProgress');
  const themeToggle = document.getElementById('themeToggle');

  const closeMenu = () => {
    mainNav?.classList.remove('open');
    document.body.classList.remove('menu-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  };

  menuToggle?.addEventListener('click', () => {
    const isOpen = mainNav?.classList.toggle('open');
    document.body.classList.toggle('menu-open', Boolean(isOpen));
    menuToggle.setAttribute('aria-expanded', String(Boolean(isOpen)));
  });

  mainNav?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));

  const currentPage = location.pathname.split('/').pop() || 'index.html';
  mainNav?.querySelectorAll('a').forEach(link => {
    if (link.getAttribute('href') === currentPage) link.classList.add('active');
  });

  const updateScrollUI = () => {
    const y = window.scrollY;
    header?.classList.toggle('scrolled', y > 20);
    backToTop?.classList.toggle('visible', y > 500);
    const max = document.documentElement.scrollHeight - innerHeight;
    if (progress) progress.style.width = max > 0 ? `${(y / max) * 100}%` : '0%';
  };
  window.addEventListener('scroll', updateScrollUI, { passive: true });
  updateScrollUI();

  backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  const storedTheme = localStorage.getItem('mas-theme');
  if (storedTheme) document.documentElement.dataset.theme = storedTheme;
  themeToggle?.addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
    document.documentElement.dataset.theme = next;
    localStorage.setItem('mas-theme', next);
  });

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  const counters = document.querySelectorAll('.counter');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = Number(el.dataset.target || 0);
      let current = 0;
      const step = Math.max(1, Math.ceil(target / 30));
      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        el.textContent = current.toLocaleString('ar-IQ');
      }, 35);
      counterObserver.unobserve(el);
    });
  }, { threshold: .6 });
  counters.forEach(el => counterObserver.observe(el));

  document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
      const item = button.closest('.faq-item');
      const open = item?.classList.toggle('open');
      button.setAttribute('aria-expanded', String(Boolean(open)));
      const symbol = button.querySelector('span');
      if (symbol) symbol.textContent = open ? '−' : '+';
    });
  });

  const year = document.getElementById('currentYear');
  if (year) year.textContent = new Date().getFullYear();
})();
