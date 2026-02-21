/* ============================================
   DORCAS & SAMUEL — Royal Night in Crystal
   Wedding Microsite — script.js
   ============================================ */

/* ── Utility ── */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/* ──────────────────────────────────────────
   i18n — TRANSLATIONS & LANGUAGE DETECTION
   ────────────────────────────────────────── */
const TRANSLATIONS = {
  en: {
    'loading': 'Loading',
    'nav.story': 'Our Story',
    'nav.details': 'Details',
    'nav.programme': 'Programme',
    'nav.accommodation': 'Accommodation',
    'nav.faq': 'FAQ',
    'nav.rsvp': 'RSVP',
    'hero.label': 'Together with their families',
    'hero.tagline': 'Request the honour of your presence at their wedding celebration',
    'countdown.title': 'Counting Down',
    'countdown.subtitle': 'To the most special day of our lives',
    'countdown.days': 'Days',
    'countdown.hours': 'Hours',
    'countdown.minutes': 'Minutes',
    'countdown.seconds': 'Seconds',
    'story.label': 'How it all began',
    'story.title': 'Our Story',
    'story.met.title': 'When We Met',
    'story.met.text': 'Every great love story has a beginning — ours was no different. Two paths crossed at just the right moment, and nothing was ever the same again.',
    'story.date.title': 'The First Date',
    'story.date.text': 'Laughter, good food, and a conversation that never seemed to end. That evening, we both knew something very special had started.',
    'story.proposal.title': 'The Proposal',
    'story.proposal.text': 'Under a sky full of stars, with hearts full of love, came the question that would set us on the path to forever. She said yes. ◆',
    'details.label': 'Mark your calendar',
    'details.title': 'Details of the Day',
    'details.subtitle': 'Everything you need to know',
    'details.time': 'From 15:00 to 23:00 · 26 December 2026',
    'details.maps': '🗺 Open in Maps',
    'details.calendar': '📅 Add to Calendar',
    'programme.label': 'The celebration',
    'programme.title': 'Programme of the Day',
    'programme.subtitle': 'What we have prepared for you',
    'programme.arrival.event': 'Arrival',
    'programme.arrival.desc': 'Reception & welcome at the estate',
    'programme.drink.event': 'Welcome Drink',
    'programme.drink.desc': 'Champagne cocktail while we wait',
    'programme.ceremony.event': 'Ceremony',
    'programme.ceremony.desc': 'The most special moment of the day',
    'programme.cocktail.event': 'Cocktail Hour',
    'programme.cocktail.desc': 'Appetisers & drinks in the gardens',
    'programme.banquet.event': 'Banquet',
    'programme.banquet.desc': 'Dinner and celebration begins',
    'programme.party.event': 'Party',
    'programme.party.desc': 'Dancing until dawn!',
    'programme.farewell.event': 'Farewell',
    'programme.farewell.desc': 'Fond farewells & memories forever',
    'accom.label': 'Your stay',
    'accom.title': 'Accommodation',
    'accom.subtitle': 'Recommendations for your stay',
    'accom.luxury.name': 'Luxury Room',
    'accom.luxury.caption': 'Beautifully appointed rooms on-site at Avianto — comfort and elegance for your stay.',
    'accom.suite.name': 'Suite',
    'accom.suite.caption': 'Spacious and refined suites offering a perfect blend of luxury and relaxation.',
    'accom.presidential.name': 'Presidential Suite',
    'accom.presidential.caption': 'The pinnacle of luxury — our most prestigious suite offering unmatched comfort and style.',
    'accom.see-details': 'See Details',
    'faq.label': 'Need to know',
    'faq.title': 'Frequently Asked Questions',
    'faq.q1': 'Is parking available?',
    'faq.a1': 'Yes! The venue has ample on-site parking. Follow the signs once you arrive at the estate entrance. If you need specific directions, don\'t hesitate to reach out to us.',
    'faq.q2': 'What dress code should I follow?',
    'faq.a2': 'Our theme is "Royal Night in Crystal" — think black-tie elegance. Gentlemen: dark suits or tuxedos. Ladies: floor-length gowns or chic cocktail dresses. Colours we love: black, gold, white, and crystal tones. Leave the trainers at home!',
    'faq.q3': 'Can I take photos during the ceremony?',
    'faq.a3': 'We kindly ask for an unplugged ceremony — please keep phones and cameras away during the vows. Our professional photographer and videographer will capture every moment. After the ceremony, snap away to your heart\'s content!',
    'faq.q4': 'Will there be transport to and from the venue?',
    'faq.a4': 'We are arranging shuttle buses from the recommended hotels to the venue and back. Departure times will be shared closer to the date. If you\'re driving, designated drivers are heroes!',
    'faq.q5': 'Can I bring a plus-one?',
    'faq.a5': 'Due to limited capacity, we can only accommodate the guests named on the invitation. If you have any questions, please contact us directly.',
    'gifts.label': 'With love',
    'gifts.title': 'Gifts',
    'gifts.quote': '"Your presence on our special day is the greatest gift we could ask for. However, if you wish to bless us with a gift, you may do so in whichever way feels most comfortable for you."',
    'gifts.contribution': 'Contribution',
    'gifts.bank.label': 'Bank',
    'gifts.holder.label': 'Account Holder',
    'gifts.type.label': 'Account Type',
    'gifts.number.label': 'Account Number',
    'gifts.branch.label': 'Branch Code',
    'gifts.ref.label': 'Reference',
    'gifts.note': 'Thank you for your generosity and love 💛',
    'gifts.copy': 'Copy Details',
    'rsvp.label': 'We hope to see you',
    'rsvp.title': 'Confirm Your Attendance',
    'rsvp.subtitle': 'We hope to count on you',
    'rsvp.name.label': 'Full Name',
    'rsvp.email.label': 'Email Address',
    'rsvp.name.placeholder': 'Your full name',
    'rsvp.email.placeholder': 'your@email.com',
    'rsvp.attend.label': 'Will you attend?',
    'rsvp.attend.yes': 'Yes, I will attend ✨',
    'rsvp.attend.no': "I won't be able to attend",
    'rsvp.guests.label': 'Number of guests (including yourself)',
    'rsvp.allergy.label': 'Food allergies & intolerances',
    'rsvp.allergy.gluten': 'Gluten-free / Coeliac',
    'rsvp.allergy.lactose': 'Lactose-free',
    'rsvp.allergy.vegetarian': 'Vegetarian',
    'rsvp.allergy.vegan': 'Vegan',
    'rsvp.allergy.nuts': 'Nut allergy',
    'rsvp.allergy.seafood': 'Seafood allergy',
    'rsvp.other.label': 'Other allergies or restrictions',
    'rsvp.other.placeholder': 'e.g., egg allergy, fructose intolerance…',
    'rsvp.message.label': 'Message to the couple',
    'rsvp.message.placeholder': 'Write us a few words…',
    'rsvp.submit': 'Send Confirmation',
    'modal.yes.title': 'See you there! 🥂',
    'modal.yes.msg': "Thank you, {name}! We can't wait to celebrate with you on 26 December 2026. 💛",
    'modal.no.title': "We'll miss you 💛",
    'modal.no.msg': 'Thank you for letting us know, {name}. You will be in our hearts on the day.',
    'modal.close': 'Close',
    'footer.love': 'Made with love',
    'footer.rights': '© 2027 Dorcas & Samuel. All rights reserved.',
    'music.play': 'Play background music',
    'music.mute': 'Mute background music',
    'toast.copied': 'Copied! 💛',
    'toast.copy-manual': 'Please copy manually',
    'toast.name-required': 'Please enter your full name',
    'toast.attend-required': 'Please select your attendance',
    'toast.music-unavailable': 'Music unavailable',
  },
  fr: {
    'loading': 'Chargement',
    'nav.story': 'Notre Histoire',
    'nav.details': 'Détails',
    'nav.programme': 'Programme',
    'nav.accommodation': 'Hébergement',
    'nav.faq': 'FAQ',
    'nav.rsvp': 'RSVP',
    'hero.label': 'Ensemble avec leurs familles',
    'hero.tagline': "Nous vous prions de nous faire l'honneur de votre présence à notre mariage",
    'countdown.title': 'Compte à Rebours',
    'countdown.subtitle': "Jusqu'au jour le plus spécial de nos vies",
    'countdown.days': 'Jours',
    'countdown.hours': 'Heures',
    'countdown.minutes': 'Minutes',
    'countdown.seconds': 'Secondes',
    'story.label': 'Comment tout a commencé',
    'story.title': 'Notre Histoire',
    'story.met.title': 'Notre Rencontre',
    'story.met.text': "Toute grande histoire d'amour a un début — la nôtre ne fut pas différente. Deux chemins se sont croisés au bon moment, et rien ne fut plus jamais pareil.",
    'story.date.title': 'Le Premier Rendez-vous',
    'story.date.text': "Des rires, une bonne table et une conversation qui ne semblait jamais vouloir se terminer. Ce soir-là, nous savions tous les deux que quelque chose de très spécial venait de commencer.",
    'story.proposal.title': 'La Demande en Mariage',
    'story.proposal.text': "Sous un ciel étoilé, avec des cœurs remplis d'amour, vint la question qui nous mettrait sur le chemin de l'éternité. Elle a dit oui. ◆",
    'details.label': 'Notez la date',
    'details.title': 'Détails du Jour',
    'details.subtitle': 'Tout ce que vous devez savoir',
    'details.time': 'De 15h00 à 23h00 · 26 décembre 2026',
    'details.maps': '🗺 Ouvrir dans Maps',
    'details.calendar': '📅 Ajouter au Calendrier',
    'programme.label': 'La célébration',
    'programme.title': 'Programme de la Journée',
    'programme.subtitle': 'Ce que nous avons préparé pour vous',
    'programme.arrival.event': 'Arrivée',
    'programme.arrival.desc': "Accueil & réception au domaine",
    'programme.drink.event': 'Boisson de Bienvenue',
    'programme.drink.desc': "Cocktail au champagne pendant l'attente",
    'programme.ceremony.event': 'Cérémonie',
    'programme.ceremony.desc': 'Le moment le plus spécial de la journée',
    'programme.cocktail.event': 'Cocktail',
    'programme.cocktail.desc': 'Amuse-bouches & boissons dans les jardins',
    'programme.banquet.event': 'Banquet',
    'programme.banquet.desc': 'Le dîner et les festivités commencent',
    'programme.party.event': 'Soirée Dansante',
    'programme.party.desc': "On danse jusqu'au bout de la nuit !",
    'programme.farewell.event': 'Au Revoir',
    'programme.farewell.desc': 'Des adieux chaleureux & des souvenirs pour toujours',
    'accom.label': 'Votre séjour',
    'accom.title': 'Hébergement',
    'accom.subtitle': 'Nos recommandations pour votre séjour',
    'accom.luxury.name': 'Chambre de Luxe',
    'accom.luxury.caption': "Des chambres magnifiquement aménagées sur place à Avianto — confort et élégance pour votre séjour.",
    'accom.suite.name': 'Suite',
    'accom.suite.caption': 'Des suites spacieuses et raffinées offrant un parfait mélange de luxe et de relaxation.',
    'accom.presidential.name': 'Suite Présidentielle',
    'accom.presidential.caption': "Le summum du luxe — notre suite la plus prestigieuse offrant un confort et un style inégalés.",
    'accom.see-details': 'Voir les Détails',
    'faq.label': 'Bon à savoir',
    'faq.title': 'Questions Fréquemment Posées',
    'faq.q1': 'Y a-t-il un parking disponible ?',
    'faq.a1': "Oui ! Le lieu dispose d'un grand parking sur place. Suivez les panneaux à l'entrée du domaine. Si vous avez besoin d'indications précises, n'hésitez pas à nous contacter.",
    'faq.q2': 'Quel code vestimentaire dois-je suivre ?',
    'faq.a2': 'Notre thème est "Royal Night in Crystal" — pensez élégance tenue de soirée. Messieurs : costumes sombres ou smokings. Mesdames : robes longues ou jolies robes de cocktail. Les couleurs que nous aimons : noir, or, blanc et tons cristal. Laissez les baskets à la maison !',
    'faq.q3': 'Puis-je prendre des photos pendant la cérémonie ?',
    'faq.a3': "Nous demandons gentiment une cérémonie sans téléphone — veuillez ranger vos téléphones et appareils photo pendant les vœux. Notre photographe et vidéaste professionnel immortalisera chaque instant. Après la cérémonie, photographiez à volonté !",
    'faq.q4': 'Y aura-t-il un transport vers et depuis le lieu ?',
    'faq.a4': "Nous organisons des navettes depuis les hôtels recommandés vers le lieu et retour. Les horaires de départ seront communiqués plus près de la date. Si vous conduisez, les conducteurs désignés sont des héros !",
    'faq.q5': 'Puis-je amener un(e) accompagnateur/trice ?',
    'faq.a5': "En raison de la capacité limitée, nous ne pouvons accueillir que les invités mentionnés sur l'invitation. Si vous avez des questions, veuillez nous contacter directement.",
    'gifts.label': 'Avec amour',
    'gifts.title': 'Cadeaux',
    'gifts.quote': '« Votre présence en ce jour spécial est le plus beau cadeau que nous puissions demander. Cependant, si vous souhaitez nous offrir un cadeau, vous pouvez le faire de la manière qui vous convient le mieux. »',
    'gifts.contribution': 'Contribution',
    'gifts.bank.label': 'Banque',
    'gifts.holder.label': 'Titulaire du Compte',
    'gifts.type.label': 'Type de Compte',
    'gifts.number.label': 'Numéro de Compte',
    'gifts.branch.label': 'Code Agence',
    'gifts.ref.label': 'Référence',
    'gifts.note': 'Merci pour votre générosité et votre amour 💛',
    'gifts.copy': 'Copier les Détails',
    'rsvp.label': 'Nous espérons vous voir',
    'rsvp.title': 'Confirmez Votre Présence',
    'rsvp.subtitle': 'Nous comptons sur vous',
    'rsvp.name.label': 'Nom Complet',
    'rsvp.email.label': 'Adresse E-mail',
    'rsvp.name.placeholder': 'Votre nom complet',
    'rsvp.email.placeholder': 'votre@email.com',
    'rsvp.attend.label': 'Serez-vous présent(e) ?',
    'rsvp.attend.yes': 'Oui, je serai présent(e) ✨',
    'rsvp.attend.no': 'Je ne pourrai pas être présent(e)',
    'rsvp.guests.label': 'Nombre d\'invités (vous inclus)',
    'rsvp.allergy.label': 'Allergies & intolérances alimentaires',
    'rsvp.allergy.gluten': 'Sans gluten / Cœliaque',
    'rsvp.allergy.lactose': 'Sans lactose',
    'rsvp.allergy.vegetarian': 'Végétarien',
    'rsvp.allergy.vegan': 'Végétalien',
    'rsvp.allergy.nuts': 'Allergie aux noix',
    'rsvp.allergy.seafood': 'Allergie aux fruits de mer',
    'rsvp.other.label': 'Autres allergies ou restrictions',
    'rsvp.other.placeholder': 'ex. : allergie aux œufs, intolérance au fructose…',
    'rsvp.message.label': 'Message aux mariés',
    'rsvp.message.placeholder': 'Écrivez-nous quelques mots…',
    'rsvp.submit': 'Envoyer la Confirmation',
    'modal.yes.title': 'À bientôt ! 🥂',
    'modal.yes.msg': 'Merci, {name} ! Nous avons hâte de célébrer avec vous le 26 décembre 2026. 💛',
    'modal.no.title': 'Vous nous manquerez 💛',
    'modal.no.msg': 'Merci de nous en avoir informés, {name}. Vous serez dans nos cœurs ce jour-là.',
    'modal.close': 'Fermer',
    'footer.love': 'Fait avec amour',
    'footer.rights': '© 2027 Dorcas & Samuel. Tous droits réservés.',
    'music.play': 'Écouter la musique',
    'music.mute': 'Couper la musique',
    'toast.copied': 'Copié ! 💛',
    'toast.copy-manual': 'Veuillez copier manuellement',
    'toast.name-required': 'Veuillez saisir votre nom complet',
    'toast.attend-required': 'Veuillez sélectionner votre présence',
    'toast.music-unavailable': 'Musique indisponible',
  },
};

function t(key) {
  const lang = document.documentElement.lang || 'en';
  return (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) || TRANSLATIONS.en[key] || key;
}

function applyLang(lang) {
  if (!TRANSLATIONS[lang]) lang = 'en';
  document.documentElement.lang = lang;
  localStorage.setItem('lang', lang);

  $$('[data-i18n]').forEach(el => {
    const val = TRANSLATIONS[lang][el.dataset.i18n];
    if (val !== undefined) el.textContent = val;
  });

  $$('[data-i18n-placeholder]').forEach(el => {
    const val = TRANSLATIONS[lang][el.dataset.i18nPlaceholder];
    if (val !== undefined) el.placeholder = val;
  });

  const langBtn = $('#lang-toggle');
  if (langBtn) langBtn.textContent = lang === 'en' ? 'FR' : 'EN';
}

(function initI18n() {
  const saved   = localStorage.getItem('lang');
  const browser = navigator.language || navigator.userLanguage || 'en';
  const lang    = saved || (browser.toLowerCase().startsWith('fr') ? 'fr' : 'en');
  applyLang(lang);

  const langBtn = $('#lang-toggle');
  if (langBtn) {
    langBtn.addEventListener('click', () => {
      applyLang(document.documentElement.lang === 'en' ? 'fr' : 'en');
    });
  }
})();

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
        musicBtn.setAttribute('aria-label', t('music.mute'));
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
  const WEDDING_DATE = new Date('2026-12-26T15:00:00+02:00').getTime();

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
        .then(() => showToast(t('toast.copied')))
        .catch(() => showToast(t('toast.copy-manual')));
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

/* ← Paste your Apps Script Web App URL here after deploying */
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyNyUmcBi6cX-A7PFF2szdIzUcHphUoUacffpRPiLKR7LnrKLv5zPXLdpy4PZ7lkC-A/exec';

(function initRSVP() {
  const form        = $('#rsvp-form');
  const attendYes   = $('#attend-yes');
  const attendNo    = $('#attend-no');
  const guestsField = $('.guests-field');
  const modal       = $('.modal-overlay');
  const modalClose  = $('.modal-close');
  const modalTitle  = $('.modal-title');
  const modalMsg    = $('.modal-message');
  const submitBtn   = form ? form.querySelector('[type="submit"]') : null;

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

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Basic validation
    const name      = $('#rsvp-name').value.trim();
    const attending = attendYes.checked ? true : attendNo.checked ? false : null;

    if (!name) {
      showToast(t('toast.name-required'));
      $('#rsvp-name').focus();
      return;
    }
    if (attending === null) {
      showToast(t('toast.attend-required'));
      return;
    }

    // Collect all form data
    const allergies = [...form.querySelectorAll('input[name="allergy"]:checked')]
      .map(cb => cb.value);

    const payload = {
      name,
      email:        $('#rsvp-email').value.trim(),
      attendance:   attending ? 'yes' : 'no',
      guests:       $('#rsvp-guests').value,
      allergies,
      other_allergy: $('#rsvp-other-allergy').value.trim(),
      message:      $('#rsvp-message').value.trim(),
    };

    // Disable button while submitting
    if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = '…'; }

    // Submit to Google Sheets via Apps Script
    if (APPS_SCRIPT_URL && APPS_SCRIPT_URL !== 'YOUR_APPS_SCRIPT_URL_HERE') {
      try {
        await fetch(APPS_SCRIPT_URL, {
          method:   'POST',
          body:     JSON.stringify(payload),
          headers:  { 'Content-Type': 'text/plain' },
          redirect: 'follow',
        });
      } catch (_) {
        // Silent fail — still show success to user
      }
    }

    if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = t('rsvp.submit'); }

    // Show success modal
    if (attending) {
      modalTitle.textContent = t('modal.yes.title');
      modalMsg.textContent   = t('modal.yes.msg').replace('{name}', name);
    } else {
      modalTitle.textContent = t('modal.no.title');
      modalMsg.textContent   = t('modal.no.msg').replace('{name}', name);
    }

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
    'PRODID:-//Dorcas & Samuel Wedding//EN',
    'BEGIN:VEVENT',
    'DTSTART:20261226T150000',
    'DTEND:20261226T230000',
    'SUMMARY:Dorcas & Samuel Wedding 💍',
    'DESCRIPTION:Royal Night in Crystal — Wedding Celebration of Dorcas & Samuel',
    'LOCATION:Avianto - Wedding\\, Conference & Event Venue\\, 69 R114\\, Muldersdrift\\, 1747',
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = 'Dorcas-Samuel-Wedding.ics';
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
        btn.setAttribute('aria-label', t('music.mute'));
      }).catch(() => {
        showToast(t('toast.music-unavailable'));
      });
    } else {
      audio.pause();
      iconOn.style.display  = 'none';
      iconOff.style.display = 'block';
      btn.classList.remove('playing');
      btn.setAttribute('aria-label', t('music.play'));
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
