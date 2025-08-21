// Theme toggle with persistence
const themeBtn = document.getElementById('themeToggle');
const rootHtml = document.documentElement;
const stored = localStorage.getItem('theme');
if (stored) { rootHtml.setAttribute('data-theme', stored); if (stored==='light') themeBtn.setAttribute('aria-pressed','true'); }
themeBtn.addEventListener('click', () => {
  const current = rootHtml.getAttribute('data-theme');
  const next = current === 'light' ? 'auto' : 'light';
  rootHtml.setAttribute('data-theme', next);
  themeBtn.setAttribute('aria-pressed', String(next==='light'));
  localStorage.setItem('theme', next);
});

// Intersection Observer for reveals
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  for (const e of entries) {
    if (e.isIntersecting) { e.target.classList.add('show'); io.unobserve(e.target); }
  }
}, { threshold: 0.15, rootMargin: '0px 0px -80px 0px' });
revealEls.forEach(el => io.observe(el));

// Scroll progress bar
const progress = document.getElementById('progress');
const setProgress = () => {
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const pct = Math.max(0, Math.min(1, scrollTop / docHeight));
  progress.style.width = (pct * 100) + '%';
};
document.addEventListener('scroll', setProgress, { passive: true });
window.addEventListener('resize', setProgress);
setProgress();

// Active nav link (scroll spy)
const sections = [...document.querySelectorAll('main section[id]')];
const navLinks = [...document.querySelectorAll('header nav a')];
const spy = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const id = entry.target.getAttribute('id');
    const link = navLinks.find(a => a.getAttribute('href') === '#' + id);
    if (entry.isIntersecting) {
      navLinks.forEach(a => a.classList.remove('active'));
      if (link) link.classList.add('active');
    }
  });
}, { threshold: 0.6 });
sections.forEach(sec => spy.observe(sec));