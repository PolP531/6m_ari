/* ============================================
   script.js
   ============================================ */

// ── Data d'inici de la relació ──────────────────
const START_DATE = new Date('2025-11-21T23:45:00');

// ── Comptador de temps ───────────────────────────
function updateCounter() {
  const diff = Date.now() - START_DATE.getTime();

  const days    = Math.floor(diff / 864e5);
  const hours   = Math.floor((diff % 864e5) / 36e5);
  const minutes = Math.floor((diff % 36e5) / 6e4);

  const pad = n => String(n).padStart(3, '0');

  const el = id => document.getElementById(id);
  if (el('cnt-days'))  el('cnt-days').textContent  = pad(days);
  if (el('cnt-hours')) el('cnt-hours').textContent = pad(hours);
  if (el('cnt-min'))   el('cnt-min').textContent   = pad(minutes);
}

updateCounter();
setInterval(updateCounter, 30_000);

// ── Any actual al footer ─────────────────────────
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ── Navbar scrolled ──────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar?.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ── Menú mòbil ───────────────────────────────────
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

navToggle?.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.classList.toggle('open', open);
  // Evita scroll del body mentre el menú és obert
  document.body.style.overflow = open ? 'hidden' : '';
});

navLinks?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle?.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ── Carrusel fotos & vídeos ───────────────────────
const carEl = document.getElementById('mediaCarousel');

if (carEl) {
  const items  = carEl.querySelectorAll('.carousel-item');
  const total  = items.length;
  const curEl  = document.getElementById('car-cur');
  const totEl  = document.getElementById('car-total');
  const dotsEl = document.getElementById('carouselDots');

  if (totEl) totEl.textContent = total;

  // Genera punts
  items.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'car-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Slide ${i + 1}`);
    dot.addEventListener('click', () => {
      bootstrap.Carousel.getOrCreateInstance(carEl).to(i);
    });
    dotsEl?.appendChild(dot);
  });

  const dots = dotsEl?.querySelectorAll('.car-dot');

  // Actualitza comptador i punts
  carEl.addEventListener('slid.bs.carousel', e => {
    const idx = e.to;
    if (curEl) curEl.textContent = idx + 1;
    dots?.forEach((d, i) => d.classList.toggle('active', i === idx));

    // Pausa vídeo de l'slide anterior
    items[e.from]?.querySelectorAll('video').forEach(v => {
      v.pause();
      v.currentTime = 0;
    });
  });

  // Swipe tàctil natiu (complementa Bootstrap)
  let touchStartX = 0;
  carEl.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].clientX;
  }, { passive: true });

  carEl.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    const car = bootstrap.Carousel.getOrCreateInstance(carEl);
    if (Math.abs(dx) > 40) dx < 0 ? car.next() : car.prev();
  }, { passive: true });
}

// ── Reveal on scroll ─────────────────────────────
const revealEls = document.querySelectorAll(
  '.section-label, .section-title, .section-body, .section-intro, ' +
  '.timeline-item, .song-card, .etc-block, .final-msg, ' +
  '.big-quote, .quote-note, .tag-list, .tu-photo-wrap'
);

revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), (i % 5) * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => observer.observe(el));