/* ============================================
   DORCAS & SAMIE — Royal Night in Crystal
   Wedding Microsite — script.js
   ============================================ */

/* ── Utility ── */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/* ──────────────────────────────────────────
   0. LOADING SCREEN + INTRO VIDEO SPLASH
   ────────────────────────────────────────── */
(function initIntro() {
  const loader       = $('#loading-screen');
  const cover        = $('#intro-cover');
  const splash       = $('#intro-splash');
  const videoDesktop = $('#intro-video');
  const videoMobile  = $('#intro-video-mobile');
  if (!cover || !splash || !loader) return;

  // Lock scroll for the whole intro sequence
  document.body.style.overflow = 'hidden';

  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  const video    = isMobile ? videoMobile : videoDesktop;

  // ── Step 1: hide loading screen once images are ready (fast) ──
  // Images load much faster than video — use a short minimum delay
  // so the loading animation is visible, then reveal cover image.
  function showCover() {
    loader.classList.add('hidden');
    loader.addEventListener('transitionend', () => loader.remove(), { once: true });
  }

  // Minimum 1.5 s so bar animation is visible, then show cover
  setTimeout(showCover, 1500);

  // ── Step 2: user taps cover image → fade it, play video + audio ──
  cover.addEventListener('click', () => {
    cover.classList.add('fade-out');
    cover.addEventListener('transitionend', () => cover.remove(), { once: true });

    // load() + play() inside the tap gesture — satisfies iOS policy
    video.load();
    video.play().catch(() => {});

    // Start background audio (loop is set on the element)
    const audio   = $('#bg-music');
    const iconOn  = $('#icon-speaker-on');
    const iconOff = $('#icon-speaker-off');
    const musicBtn = $('.music-toggle');
    if (audio) {
      audio.volume = 0.3;
      audio.play().catch(() => {});
      if (musicBtn && iconOn && iconOff) {
        iconOn.style.display  = 'block';
        iconOff.style.display = 'none';
        musicBtn.classList.add('playing');
        musicBtn.setAttribute('aria-label', 'Mute background music');
      }
    }
  });

  // ── Step 3: video ends → fade out splash, reveal site ─────────
  video.addEventListener('ended', () => {
    splash.classList.add('fade-out');
    document.body.style.overflow = '';
    splash.addEventListener('transitionend', () => splash.remove(), { once: true });
  });
})();

/* ──────────────────────────────────────────
   1. NAV — scroll-aware + hamburger
   ────────────────────────────────────────── */
(function initNav() {
  const nav        = $('.nav');
  const hamburger  = $('.hamburger');
  const mobileNav  = $('.mobile-nav');
  const mobileLinks = $$('.mobile-nav a');

  // Scroll transparency
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });

  // Hamburger toggle
  hamburger.addEventListener('click', () => {
    const open = hamburger.classList.toggle('open');
    mobileNav.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  // Close on link click
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
})();

/* ──────────────────────────────────────────
   2. HERO PARALLAX + PARTICLE CANVAS
   ────────────────────────────────────────── */
(function initHero() {
  // Particle canvas
  const canvas = $('.hero-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const GOLD_COLORS = [
    'rgba(201,168,76,0.7)',
    'rgba(232,212,139,0.5)',
    'rgba(255,255,200,0.4)',
    'rgba(201,168,76,0.3)',
  ];

  function createParticle() {
    return {
      x:    Math.random() * W,
      y:    Math.random() * H,
      r:    Math.random() * 2 + 0.5,
      vx:   (Math.random() - 0.5) * 0.4,
      vy:   -Math.random() * 0.6 - 0.2,
      color: GOLD_COLORS[Math.floor(Math.random() * GOLD_COLORS.length)],
      life: Math.random(),
      decay: Math.random() * 0.003 + 0.001,
    };
  }

  // Initialise pool
  for (let i = 0; i < 80; i++) particles.push(createParticle());

  // Only animate if reduced-motion is NOT requested
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion) {
    (function animate() {
      ctx.clearRect(0, 0, W, H);
      particles.forEach((p, i) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.life;
        ctx.fill();
        ctx.globalAlpha = 1;

        p.x  += p.vx;
        p.y  += p.vy;
        p.life -= p.decay;

        if (p.life <= 0 || p.y < -10) {
          particles[i] = createParticle();
          particles[i].y = H + 10; // restart from bottom
        }
      });
      requestAnimationFrame(animate);
    })();
  }
})();

/* ──────────────────────────────────────────
   3. COUNTDOWN TIMER
   ────────────────────────────────────────── */
(function initCountdown() {
  const WEDDING_DATE = new Date('2026-12-27T17:00:00+02:00').getTime();

  const daysEl    = $('#countdown-days');
  const hoursEl   = $('#countdown-hours');
  const minutesEl = $('#countdown-minutes');
  const secondsEl = $('#countdown-seconds');

  if (!daysEl) return;

  function pad(n) { return String(n).padStart(2, '0'); }

  function tick() {
    const now  = Date.now();
    const diff = WEDDING_DATE - now;

    if (diff <= 0) {
      daysEl.textContent    = '00';
      hoursEl.textContent   = '00';
      minutesEl.textContent = '00';
      secondsEl.textContent = '00';
      return;
    }

    const days    = Math.floor(diff / 86400000);
    const hours   = Math.floor((diff % 86400000) / 3600000);
    const minutes = Math.floor((diff % 3600000)  / 60000);
    const seconds = Math.floor((diff % 60000)    / 1000);

    daysEl.textContent    = pad(days);
    hoursEl.textContent   = pad(hours);
    minutesEl.textContent = pad(minutes);
    secondsEl.textContent = pad(seconds);
  }

  tick();
  setInterval(tick, 1000);
})();

/* ──────────────────────────────────────────
   4. SCROLL FADE-IN (Intersection Observer)
   ────────────────────────────────────────── */
(function initScrollAnimations() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    $$('.fade-in').forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  $$('.fade-in').forEach(el => observer.observe(el));
})();

/* ──────────────────────────────────────────
   5. PROGRAMME — sequential node animation
   ────────────────────────────────────────── */
(function initProgramme() {
  const items = $$('.programme-item');
  if (!items.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          items.forEach((item, i) => {
            setTimeout(() => item.classList.add('visible'), i * 120);
          });
          observer.disconnect();
        }
      });
    },
    { threshold: 0.1 }
  );

  const track = $('.programme-track');
  if (track) observer.observe(track);
})();

/* ──────────────────────────────────────────
   6. FAQ ACCORDION
   ────────────────────────────────────────── */
(function initFAQ() {
  $$('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      // Close all
      $$('.faq-question').forEach(b => {
        b.setAttribute('aria-expanded', 'false');
        const ans = document.getElementById(b.getAttribute('aria-controls'));
        if (ans) ans.classList.remove('open');
      });
      // Toggle clicked
      if (!expanded) {
        btn.setAttribute('aria-expanded', 'true');
        const ans = document.getElementById(btn.getAttribute('aria-controls'));
        if (ans) ans.classList.add('open');
      }
    });
  });
})();

/* ──────────────────────────────────────────
   7. GIFTS — contribution accordion + copy
   ────────────────────────────────────────── */
(function initGifts() {
  const toggle = $('.contribution-toggle');
  const body   = $('.contribution-body');
  if (!toggle || !body) return;

  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    body.classList.toggle('open', !expanded);
  });

  // Copy bank details
  const copyBtn = $('.btn-copy');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const bankInfo = [
        'Bank: FNB / RMB',
        'Account Holder: Benjamin Malemo',
        'Account Type: FNB Aspire Current Account',
        'Account Number: 63109054914',
        'Branch Code: 250655',
        'Reference: D&S Wedding',
      ].join('\n');

      navigator.clipboard.writeText(bankInfo)
        .then(() => showToast('Copied! 💛'))
        .catch(() => showToast('Please copy manually'));
    });
  }
})();

/* ──────────────────────────────────────────
   8. TOAST NOTIFICATION
   ────────────────────────────────────────── */
function showToast(message) {
  const toast = $('.toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2800);
}

/* ──────────────────────────────────────────
   9. RSVP FORM
   ────────────────────────────────────────── */
(function initRSVP() {
  const form        = $('#rsvp-form');
  const attendYes   = $('#attend-yes');
  const attendNo    = $('#attend-no');
  const guestsField = $('.guests-field');
  const modal       = $('.modal-overlay');
  const modalClose  = $('.modal-close');
  const modalTitle  = $('.modal-title');
  const modalMsg    = $('.modal-message');

  if (!form) return;

  // Show/hide guest count based on attendance
  function toggleGuests() {
    if (attendYes.checked) {
      guestsField.classList.add('visible');
    } else {
      guestsField.classList.remove('visible');
    }
  }
  attendYes.addEventListener('change', toggleGuests);
  attendNo.addEventListener('change',  toggleGuests);

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Basic validation
    const name    = $('#rsvp-name').value.trim();
    const attending = attendYes.checked ? true : attendNo.checked ? false : null;

    if (!name) {
      showToast('Please enter your full name');
      $('#rsvp-name').focus();
      return;
    }
    if (attending === null) {
      showToast('Please select your attendance');
      return;
    }

    // Build a success message
    if (attending) {
      modalTitle.textContent = 'See you there! 🥂';
      modalMsg.textContent   = `Thank you, ${name}! We can't wait to celebrate with you on 27 December 2026. 💛`;
    } else {
      modalTitle.textContent = 'We\'ll miss you 💛';
      modalMsg.textContent   = `Thank you for letting us know, ${name}. You will be in our hearts on the day.`;
    }

    // TODO: connect form action (Formspree / Netlify / Google Sheets API)
    modal.classList.add('open');
  });

  // Close modal
  if (modalClose) {
    modalClose.addEventListener('click', () => {
      modal.classList.remove('open');
      form.reset();
      guestsField.classList.remove('visible');
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('open');
      form.reset();
      guestsField.classList.remove('visible');
    }
  });
})();

/* ──────────────────────────────────────────
   10. ADD TO CALENDAR (.ics download)
   ────────────────────────────────────────── */
function downloadICS() {
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Dorcas & Samie Wedding//EN',
    'BEGIN:VEVENT',
    'DTSTART:20261227T170000',
    'DTEND:20261228T030000',
    'SUMMARY:Dorcas & Samie Wedding 💍',
    'DESCRIPTION:Royal Night in Crystal — Wedding Celebration of Dorcas & Samie',
    'LOCATION:Avianto - Wedding\\, Conference & Event Venue\\, 69 R114\\, Muldersdrift\\, 1747',
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = 'Dorcas-Samie-Wedding.ics';
  a.click();
  URL.revokeObjectURL(url);
}

/* ──────────────────────────────────────────
   11. BACKGROUND MUSIC TOGGLE
   ────────────────────────────────────────── */
(function initMusic() {
  const btn     = $('.music-toggle');
  const audio   = $('#bg-music');
  const iconOn  = $('#icon-speaker-on');
  const iconOff = $('#icon-speaker-off');

  if (!btn || !audio) return;

  btn.addEventListener('click', () => {
    if (audio.paused) {
      audio.play().then(() => {
        iconOn.style.display  = 'block';
        iconOff.style.display = 'none';
        btn.classList.add('playing');
        btn.setAttribute('aria-label', 'Mute background music');
      }).catch(() => {
        showToast('Music unavailable');
      });
    } else {
      audio.pause();
      iconOn.style.display  = 'none';
      iconOff.style.display = 'block';
      btn.classList.remove('playing');
      btn.setAttribute('aria-label', 'Play background music');
    }
  });
})();

/* ──────────────────────────────────────────
   12. SMOOTH SCROLL for anchor links
   ────────────────────────────────────────── */
document.addEventListener('click', (e) => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;
  const target = document.querySelector(a.getAttribute('href'));
  if (!target) return;
  e.preventDefault();
  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
});
