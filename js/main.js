/* ─────────────────────────────────────────────
   NAVBAR
───────────────────────────────────────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

/* ─────────────────────────────────────────────
   DUST PARTICLES
───────────────────────────────────────────── */
const dust = document.getElementById('dust');
for (let i = 0; i < 30; i++) {
  const p = document.createElement('div');
  p.className = 'dust-particle';
  p.style.cssText = `
    left:${Math.random()*100}%;
    animation-duration:${6+Math.random()*10}s;
    animation-delay:${Math.random()*8}s;
    opacity:${0.3+Math.random()*0.7};
    width:${1+Math.random()*2}px;
    height:${1+Math.random()*2}px;
  `;
  dust.appendChild(p);
}

/* ─────────────────────────────────────────────
   CINEMATIC SCROLL ZOOM — CORE ENGINE
   ─ Phase 0 (0–15%):   Title fades out, scene becomes visible
   ─ Phase 1 (15–60%):  Camera zooms in on cantiere
   ─ Phase 2 (60–85%):  Zoom targets the cabin window
   ─ Phase 3 (85–100%): White flash → site revealed
───────────────────────────────────────────── */

const scrollContainer = document.getElementById('hero-scroll-container');
const cantiereWrap    = document.getElementById('cantiere-wrap');
const heroUI          = document.getElementById('hero-ui');
const heroVignette    = document.getElementById('hero-vignette');
const scrollHint      = document.getElementById('scroll-hint');
const heroSection     = document.getElementById('hero');

// The SVG window element (for final target calculation)
// Window center in SVG coords: x=630+30=660, y=508+19=527
// SVG viewBox 1920×1080, so normalized: cx=660/1920≈0.344, cy=527/1080≈0.488
const WIN_NX = 660 / 1920;   // normalized X of cabin window center
const WIN_NY = 527 / 1080;   // normalized Y of cabin window center

let siteRevealed = false;

function lerp(a, b, t) { return a + (b - a) * t; }
function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
function easeInOut(t) { return t < 0.5 ? 2*t*t : -1+(4-2*t)*t; }
function easeIn(t) { return t * t * t; }
function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

const heroPhoto = document.getElementById('hero-photo');

function onScroll() {
  const scrollTop   = window.scrollY;
  const totalScroll = scrollContainer.offsetHeight - window.innerHeight;
  const progress    = clamp(scrollTop / totalScroll, 0, 1);

  // 3D parallax: photo moves slower than SVG → depth illusion
  if (heroPhoto) {
    const parallaxY = scrollTop * 0.18;
    const depthScale = 1.08 + progress * 0.12;
    heroPhoto.style.transform = `scale(${depthScale}) translateY(${-parallaxY * 0.4}px) translateZ(0)`;
  }

  /* ── Phase thresholds ── */
  const P0_END  = 0.12;   // title fades
  const P1_END  = 0.60;   // zoom in on rig
  const P2_END  = 0.85;   // zoom onto window
  const P3_END  = 1.00;   // flash & reveal

  const vw = window.innerWidth;
  const vh = window.innerHeight;

  /* ─── PHASE 0: Hero UI fades, scroll hint disappears ─── */
  if (progress < P0_END) {
    const t = progress / P0_END;
    heroUI.style.opacity        = 1 - easeOut(t);
    scrollHint.style.opacity    = 1 - t;
  } else {
    heroUI.style.opacity        = 0;
    scrollHint.style.opacity    = 0;
  }

  /* ─── PHASE 1: Slow zoom into the scene ─── */
  if (progress >= P0_END && progress < P1_END && !siteRevealed) {
    const t  = (progress - P0_END) / (P1_END - P0_END);
    const et = easeInOut(t);

    // Scale: 1 → 2.5
    const scale = lerp(1, 2.5, et);

    // Origin moves slightly toward rig center (50%, 50%)
    const ox = lerp(50, 50, et);
    const oy = lerp(50, 52, et);

    cantiereWrap.style.transformOrigin = `${ox}% ${oy}%`;
    cantiereWrap.style.transform       = `scale(${scale})`;

    // Vignette lightens slightly as we approach
    heroVignette.style.opacity = lerp(1, 0.5, et);

  } else if (progress < P0_END) {
    cantiereWrap.style.transform  = 'scale(1)';
    heroVignette.style.opacity    = '1';
  }

  /* ─── PHASE 2: Zoom onto cabin window ─── */
  if (progress >= P1_END && progress < P2_END && !siteRevealed) {
    const t  = (progress - P1_END) / (P2_END - P1_END);
    const et = easeIn(t);

    // Continue from scale 2.5 → 12
    const scale = lerp(2.5, 12, et);

    // Origin tracks toward the window's screen position
    // Window is at approximately 34.4% X, 48.8% Y in SVG
    const ox = lerp(50, WIN_NX * 100, et);
    const oy = lerp(52, WIN_NY * 100, et);

    cantiereWrap.style.transformOrigin = `${ox}% ${oy}%`;
    cantiereWrap.style.transform       = `scale(${scale})`;

    heroVignette.style.opacity = lerp(0.5, 0, et);
  }

  /* ─── PHASE 3: Flash transition ─── */
  if (progress >= P2_END && !siteRevealed) {
    const t = (progress - P2_END) / (P3_END - P2_END);

    const scale = lerp(12, 40, easeIn(t));
    cantiereWrap.style.transformOrigin = `${WIN_NX * 100}% ${WIN_NY * 100}%`;
    cantiereWrap.style.transform       = `scale(${scale})`;

    if (t > 0.7 && !siteRevealed) {
      revealSite();
    }
  }
}

function revealSite() {
  siteRevealed = true;

  // Flash white, then reveal the rest of page
  const flash = document.createElement('div');
  flash.style.cssText = `
    position:fixed;inset:0;
    background:#fff;
    z-index:9999;
    pointer-events:none;
    opacity:0;
    transition:opacity 0.15s ease;
  `;
  document.body.appendChild(flash);

  requestAnimationFrame(() => {
    flash.style.opacity = '1';
    setTimeout(() => {
      // Hide the scroll container, show below-fold content
      scrollContainer.style.display = 'none';

      // Snap scroll to #about
      const about = document.getElementById('about');
      if (about) {
        window.scrollTo({ top: about.offsetTop, behavior: 'instant' });
      }

      flash.style.transition = 'opacity 0.5s ease';
      flash.style.opacity = '0';
      setTimeout(() => flash.remove(), 600);

      // Re-enable scroll animations
      window.removeEventListener('scroll', onScroll);
    }, 150);
  });
}

window.addEventListener('scroll', onScroll, { passive: true });

/* ─────────────────────────────────────────────
   SCROLL REVEAL ANIMATIONS
───────────────────────────────────────────── */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal,.reveal-left,.reveal-right').forEach(el => {
  observer.observe(el);
});

/* ─────────────────────────────────────────────
   SMOOTH SCROLL LINKS
───────────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const t = document.querySelector(a.getAttribute('href'));
    if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
