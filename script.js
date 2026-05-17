/* ============================================
   script.js
   ============================================ */

// ── Data d'inici de la relació ──────────────────
// CANVIA aquesta data per la real!
const START_DATE = new Date('2025-11-21T23:59:00');

// ── Comptador de temps ───────────────────────────
function updateCounter() {
  const now = new Date();
  const diff = now - START_DATE; // ms

  const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  const fmt = n => String(n).padStart(3, '0');

  const el = id => document.getElementById(id);
  if (el('cnt-days'))  el('cnt-days').textContent  = fmt(days);
  if (el('cnt-hours')) el('cnt-hours').textContent = fmt(hours);
  if (el('cnt-min'))   el('cnt-min').textContent   = fmt(minutes);
}

updateCounter();
setInterval(updateCounter, 60 * 1000);

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
  navLinks.classList.toggle('open');
});

// Tanca el menú en clicar un enllaç
navLinks?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ── Reveal on scroll ─────────────────────────────
const revealEls = document.querySelectorAll(
  '.section-label, .section-title, .section-body, .section-intro, ' +
  '.timeline-item, .song-card, .photo-grid-item, .etc-block, .final-msg, ' +
  '.big-quote, .quote-note, .tag-list, .photo-frame'
);

revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Petit delay escalonat dins d'un grup
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, (i % 6) * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => observer.observe(el));
