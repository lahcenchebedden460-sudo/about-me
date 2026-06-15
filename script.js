/* ============================================================
   CYBER LUFFY — script.js
   Full Vanilla JavaScript — No Frameworks
   ============================================================ */

'use strict';

/* ============================================================
   LOADER SYSTEM
   ============================================================ */
(function initLoader() {
  const loader    = document.getElementById('loader');
  const site      = document.getElementById('site');
  const bar       = document.getElementById('loader-bar');
  const pct       = document.getElementById('loader-pct');
  const line1     = document.getElementById('line1');
  const line2     = document.getElementById('line2');
  const line3     = document.getElementById('line3');
  const line4     = document.getElementById('line4');
  const loaderCvs = document.getElementById('loader-matrix');

  if (!loader) return;

  /* Mini matrix on loader canvas */
  const lctx = loaderCvs.getContext('2d');
  loaderCvs.width  = window.innerWidth;
  loaderCvs.height = window.innerHeight;
  const lCols    = Math.floor(loaderCvs.width / 14);
  const lDrops   = new Array(lCols).fill(1);
  const lChars   = '01アイウエオカキクケコサシスセソタチツテトナニヌネノ';
  let   lAnimId;

  function drawLoaderMatrix() {
    lctx.fillStyle = 'rgba(0,0,0,0.06)';
    lctx.fillRect(0, 0, loaderCvs.width, loaderCvs.height);
    lctx.fillStyle = '#00ff41';
    lctx.font      = '13px Share Tech Mono, monospace';
    for (let i = 0; i < lDrops.length; i++) {
      lctx.fillText(lChars[Math.floor(Math.random() * lChars.length)], i * 14, lDrops[i] * 14);
      if (lDrops[i] * 14 > loaderCvs.height && Math.random() > 0.975) lDrops[i] = 0;
      lDrops[i]++;
    }
    lAnimId = requestAnimationFrame(drawLoaderMatrix);
  }
  drawLoaderMatrix();

  /* Sequence timing */
  const totalDuration = 3000; // ms
  let   startTime     = null;

  function updateBar(ts) {
    if (!startTime) startTime = ts;
    const elapsed  = ts - startTime;
    const progress = Math.min(elapsed / totalDuration, 1);
    const pctVal   = Math.floor(progress * 100);
    bar.style.width    = pctVal + '%';
    pct.textContent    = pctVal + '%';
    if (progress < 1) requestAnimationFrame(updateBar);
  }
  requestAnimationFrame(updateBar);

  setTimeout(() => { line2.classList.remove('hidden'); }, 700);
  setTimeout(() => { line3.classList.remove('hidden'); }, 1500);
  setTimeout(() => { line4.classList.remove('hidden'); }, 2400);

  setTimeout(() => {
    cancelAnimationFrame(lAnimId);
    loader.classList.add('fade-out');
    setTimeout(() => {
      loader.style.display = 'none';
      site.classList.remove('hidden');
      initSite();
    }, 650);
  }, totalDuration + 400);
})();

/* ============================================================
   SITE INIT — called after loader finishes
   ============================================================ */
function initSite() {
  initMatrixBg();
  initNav();
  initThreatMap();
  initSecurityRing();
  initRealtimeMonitor();
  initLiveAttackCounter();
  initCounters();
  initScrollReveal();
  initSkillBars();
  initProgressBars();
  initGalleryTabs();
  initLightbox();
  initBlogFilter();
  initContactForm();
  initBackToTop();
  initTerminalTypewriter();
  animateMetricBars();
}

/* ============================================================
   MATRIX BACKGROUND CANVAS
   ============================================================ */
function initMatrixBg() {
  const canvas = document.getElementById('matrix-bg');
  if (!canvas) return;
  const ctx    = canvas.getContext('2d');
  const chars  = '01アイウエオカキクケコサシスセソABCDEFGHIJKLMNOPQRSTUVWXYZ{}[]<>/\\|;:';
  let cols, drops, animId;

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    cols  = Math.floor(canvas.width / 16);
    drops = new Array(cols).fill(0).map(() => Math.random() * -canvas.height / 16);
  }

  function draw() {
    ctx.fillStyle = 'rgba(2,12,2,0.055)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = '13px Share Tech Mono, monospace';
    for (let i = 0; i < cols; i++) {
      const ch  = chars[Math.floor(Math.random() * chars.length)];
      const y   = drops[i] * 16;
      /* Gradient: bright lead, fade behind */
      const alpha = Math.random() > 0.95 ? 1 : 0.6;
      ctx.fillStyle = `rgba(0,255,65,${alpha})`;
      ctx.fillText(ch, i * 16, y);
      if (y > canvas.height && Math.random() > 0.97) drops[i] = 0;
      drops[i] += 0.5;
    }
    animId = requestAnimationFrame(draw);
  }

  resize();
  draw();

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      cancelAnimationFrame(animId);
      resize();
      draw();
    }, 200);
  });
}

/* ============================================================
   NAVIGATION
   ============================================================ */
function initNav() {
  const header    = document.getElementById('nav-header');
  const hamburger = document.getElementById('nav-hamburger');
  const navLinks  = document.getElementById('nav-links');
  const links     = document.querySelectorAll('.nav-link');
  const sections  = document.querySelectorAll('section[id]');

  /* Scroll class */
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
    updateActiveLink();
  }, { passive: true });

  /* Hamburger */
  hamburger.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', String(open));
  });

  /* Close menu on link click */
  links.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  /* Active link on scroll */
  function updateActiveLink() {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 90) current = sec.id;
    });
    links.forEach(link => {
      link.classList.toggle('active', link.dataset.section === current);
    });
  }
  updateActiveLink();
}

/* ============================================================
   THREAT MAP (Canvas)
   ============================================================ */
function initThreatMap() {
  const canvas = document.getElementById('threat-map');
  if (!canvas) return;
  const ctx    = canvas.getContext('2d');

  /* Simple world-map outline using paths */
  const W = canvas.width;
  const H = canvas.height;

  /* Attack nodes — [normX, normY, type] type: 0=low,1=med,2=high,3=crit */
  const nodes = [
    [0.12,0.30,0],[0.18,0.32,1],[0.25,0.28,0],[0.32,0.25,1],
    [0.38,0.30,2],[0.45,0.28,0],[0.50,0.35,3],[0.55,0.28,1],
    [0.60,0.32,2],[0.65,0.25,0],[0.70,0.30,1],[0.75,0.35,2],
    [0.80,0.28,0],[0.85,0.32,1],[0.22,0.45,1],[0.30,0.50,2],
    [0.40,0.55,0],[0.48,0.60,1],[0.55,0.65,0],[0.62,0.58,1],
    [0.70,0.52,2],[0.78,0.48,0],[0.35,0.70,1],[0.55,0.72,0],
    [0.08,0.42,0],[0.14,0.55,1],[0.90,0.38,0],[0.15,0.38,2],
  ];

  const colors = ['#00ff41','#ffaa00','#ff6600','#ff2233'];

  /* Attack lines state */
  const attacks = [];
  function spawnAttack() {
    const src  = nodes[Math.floor(Math.random() * nodes.length)];
    const dst  = nodes[Math.floor(Math.random() * nodes.length)];
    if (src === dst) return;
    attacks.push({ sx: src[0]*W, sy: src[1]*H, dx: dst[0]*W, dy: dst[1]*H, t: 0, speed: 0.008 + Math.random()*0.012, col: colors[dst[2]] });
  }
  for (let i = 0; i < 6; i++) spawnAttack();

  /* Draw world map approximation */
  function drawMap() {
    ctx.clearRect(0, 0, W, H);

    /* Grid */
    ctx.strokeStyle = 'rgba(0,255,65,0.06)';
    ctx.lineWidth   = 0.5;
    for (let x = 0; x <= W; x += W/12) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,H); ctx.stroke(); }
    for (let y = 0; y <= H; y += H/6)  { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(W,y); ctx.stroke(); }

    /* Simple continent blobs */
    const continents = [
      /* North America */
      [[0.05,0.18],[0.22,0.14],[0.28,0.20],[0.26,0.38],[0.20,0.45],[0.12,0.44],[0.06,0.36],[0.04,0.26]],
      /* South America */
      [[0.18,0.47],[0.28,0.46],[0.30,0.62],[0.26,0.78],[0.18,0.80],[0.14,0.68],[0.12,0.56]],
      /* Europe */
      [[0.38,0.14],[0.52,0.12],[0.54,0.22],[0.50,0.30],[0.42,0.32],[0.36,0.26]],
      /* Africa */
      [[0.42,0.34],[0.55,0.32],[0.58,0.44],[0.56,0.62],[0.50,0.72],[0.44,0.68],[0.38,0.52],[0.38,0.40]],
      /* Asia */
      [[0.52,0.12],[0.78,0.10],[0.88,0.16],[0.90,0.30],[0.82,0.38],[0.70,0.40],[0.62,0.38],[0.54,0.30],[0.52,0.22]],
      /* Australia */
      [[0.72,0.56],[0.84,0.54],[0.88,0.62],[0.84,0.72],[0.74,0.74],[0.70,0.66]],
    ];

    ctx.fillStyle   = 'rgba(0,255,65,0.06)';
    ctx.strokeStyle = 'rgba(0,255,65,0.25)';
    ctx.lineWidth   = 0.8;
    continents.forEach(pts => {
      ctx.beginPath();
      ctx.moveTo(pts[0][0]*W, pts[0][1]*H);
      pts.slice(1).forEach(p => ctx.lineTo(p[0]*W, p[1]*H));
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    });

    /* Attack lines */
    attacks.forEach(a => {
      const cx = a.sx + (a.dx - a.sx) * a.t;
      const cy = a.sy + (a.dy - a.sy) * a.t;
      ctx.beginPath();
      ctx.moveTo(a.sx, a.sy);
      ctx.lineTo(cx, cy);
      ctx.strokeStyle = a.col;
      ctx.lineWidth   = 0.8;
      ctx.globalAlpha = 0.55;
      ctx.stroke();
      ctx.globalAlpha = 1;
      /* Head dot */
      ctx.beginPath();
      ctx.arc(cx, cy, 2, 0, Math.PI*2);
      ctx.fillStyle = a.col;
      ctx.fill();
    });

    /* Nodes */
    nodes.forEach(n => {
      const x = n[0]*W, y = n[1]*H;
      const col = colors[n[2]];
      /* Ping ring */
      ctx.beginPath();
      ctx.arc(x, y, 6 + Math.sin(Date.now()/500 + n[0]*10)*3, 0, Math.PI*2);
      ctx.strokeStyle = col;
      ctx.lineWidth   = 0.5;
      ctx.globalAlpha = 0.3;
      ctx.stroke();
      ctx.globalAlpha = 1;
      /* Core dot */
      ctx.beginPath();
      ctx.arc(x, y, n[2]===3?5:3, 0, Math.PI*2);
      ctx.fillStyle = col;
      ctx.shadowColor = col;
      ctx.shadowBlur  = 8;
      ctx.fill();
      ctx.shadowBlur = 0;
    });
  }

  function tick() {
    attacks.forEach((a,i) => {
      a.t += a.speed;
      if (a.t >= 1) {
        attacks.splice(i,1);
        spawnAttack();
      }
    });
    drawMap();
    requestAnimationFrame(tick);
  }
  tick();
}

/* ============================================================
   SECURITY RING (Canvas donut)
   ============================================================ */
function initSecurityRing() {
  const canvas = document.getElementById('security-ring');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const CX  = canvas.width  / 2;
  const CY  = canvas.height / 2;
  const R   = 34;
  let angle = 0;

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    /* BG arc */
    ctx.beginPath();
    ctx.arc(CX, CY, R, 0, Math.PI*2);
    ctx.strokeStyle = 'rgba(0,255,65,0.1)';
    ctx.lineWidth   = 7;
    ctx.stroke();
    /* Filled arc — 99% */
    const end = -Math.PI/2 + (Math.PI*2 * 0.99);
    ctx.beginPath();
    ctx.arc(CX, CY, R, -Math.PI/2, end);
    const grad = ctx.createLinearGradient(CX-R, CY, CX+R, CY);
    grad.addColorStop(0, '#00ff41');
    grad.addColorStop(1, '#0080ff');
    ctx.strokeStyle = grad;
    ctx.lineWidth   = 7;
    ctx.lineCap     = 'round';
    ctx.shadowColor = '#00ff41';
    ctx.shadowBlur  = 10;
    ctx.stroke();
    ctx.shadowBlur  = 0;
    /* Spin dot */
    angle += 0.015;
    const dx = CX + Math.cos(angle) * R;
    const dy = CY + Math.sin(angle) * R;
    ctx.beginPath();
    ctx.arc(dx, dy, 3, 0, Math.PI*2);
    ctx.fillStyle   = '#00ff41';
    ctx.shadowColor = '#00ff41';
    ctx.shadowBlur  = 8;
    ctx.fill();
    ctx.shadowBlur = 0;
    requestAnimationFrame(draw);
  }
  draw();
}

/* ============================================================
   REAL-TIME MONITOR (Canvas wave)
   ============================================================ */
function initRealtimeMonitor() {
  const canvas = document.getElementById('rt-monitor');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width;
  const H = canvas.height;
  const points = new Array(W).fill(H/2);
  let offset = 0;

  function draw() {
    ctx.clearRect(0, 0, W, H);
    /* Update points */
    points.shift();
    const newVal = H/2 + (Math.random()-0.5)*H*0.65;
    points.push(Math.max(4, Math.min(H-4, newVal)));
    /* Gradient fill */
    const grad = ctx.createLinearGradient(0, 0, 0, H);
    grad.addColorStop(0, 'rgba(0,255,65,0.3)');
    grad.addColorStop(1, 'rgba(0,255,65,0)');
    ctx.beginPath();
    ctx.moveTo(0, H);
    points.forEach((p, i) => ctx.lineTo(i, p));
    ctx.lineTo(W, H);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();
    /* Line */
    ctx.beginPath();
    points.forEach((p, i) => i===0 ? ctx.moveTo(i,p) : ctx.lineTo(i,p));
    ctx.strokeStyle = '#00ff41';
    ctx.lineWidth   = 1.5;
    ctx.shadowColor = '#00ff41';
    ctx.shadowBlur  = 4;
    ctx.stroke();
    ctx.shadowBlur  = 0;
    requestAnimationFrame(draw);
  }
  draw();
}

/* ============================================================
   LIVE ATTACK COUNTER
   ============================================================ */
function initLiveAttackCounter() {
  const el = document.getElementById('la-count');
  const dEl = document.getElementById('la-delta');
  if (!el) return;
  let base = 2847;

  setInterval(() => {
    const delta = Math.floor((Math.random()-0.4) * 120);
    base = Math.max(1000, base + delta);
    el.textContent = base.toLocaleString();
    const pct = ((delta / (base - delta)) * 100).toFixed(1);
    dEl.textContent = (delta >= 0 ? '+' : '') + pct + '%';
    dEl.style.color = delta >= 0 ? 'var(--clr-red)' : 'var(--clr-green)';
  }, 1800);
}

/* ============================================================
   STAT COUNTERS (animate numbers)
   ============================================================ */
function initCounters() {
  const counters = document.querySelectorAll('.counter');
  const observed = new Set();

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !observed.has(entry.target)) {
        observed.add(entry.target);
        animateCounter(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));

  function animateCounter(el) {
    const target   = parseInt(el.dataset.target, 10);
    const duration = 1800;
    const start    = performance.now();
    function step(ts) {
      const t   = Math.min((ts - start) / duration, 1);
      const val = Math.floor(easeOut(t) * target);
      el.textContent = val;
      if (t < 1) requestAnimationFrame(step);
      else el.textContent = target;
    }
    requestAnimationFrame(step);
  }

  function easeOut(t) { return 1 - Math.pow(1 - t, 3); }
}

/* ============================================================
   SCROLL REVEAL
   ============================================================ */
function initScrollReveal() {
  const revealEls = [
    '.skill-card','.project-card','.blog-card',
    '.about-terminal','.about-certifications',
    '.profile-card','.lab-card','.contact-info',
    '.contact-form-wrap','.stats-bar',
    '.section-header',
  ];

  revealEls.forEach(sel => {
    document.querySelectorAll(sel).forEach((el, i) => {
      el.classList.add('reveal');
      el.style.transitionDelay = (i * 0.07) + 's';
    });
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* ============================================================
   SKILL BARS
   ============================================================ */
function initSkillBars() {
  const fills    = document.querySelectorAll('.skill-bar-fill');
  const observed = new Set();

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !observed.has(entry.target)) {
        observed.add(entry.target);
        const pct = entry.target.style.getPropertyValue('--spct');
        /* Trigger CSS transition by setting width */
        requestAnimationFrame(() => {
          entry.target.style.width = pct;
        });
      }
    });
  }, { threshold: 0.3 });

  fills.forEach(f => observer.observe(f));
}

/* ============================================================
   LAB PROGRESS BARS
   ============================================================ */
function initProgressBars() {
  const fills    = document.querySelectorAll('.prog-fill');
  const observed = new Set();

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !observed.has(entry.target)) {
        observed.add(entry.target);
        const pct = entry.target.style.getPropertyValue('--pp');
        requestAnimationFrame(() => {
          entry.target.style.width = pct;
        });
      }
    });
  }, { threshold: 0.3 });

  fills.forEach(f => observer.observe(f));
}

/* ============================================================
   METRIC BARS (System Overview)
   ============================================================ */
function animateMetricBars() {
  document.querySelectorAll('.m-bar').forEach(bar => {
    const pct = bar.style.getPropertyValue('--pct');
    bar.style.width = '0%';
    setTimeout(() => { bar.style.transition = 'width 1s ease'; bar.style.width = pct; }, 600);
  });
}

/* ============================================================
   GALLERY TABS
   ============================================================ */
function initGalleryTabs() {
  const tabs       = document.querySelectorAll('.gallery-tab');
  const grids      = document.querySelectorAll('.gallery-grid');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.gallery;
      tabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected','false'); });
      tab.classList.add('active');
      tab.setAttribute('aria-selected','true');

      grids.forEach(grid => {
        if (grid.id === 'gallery-' + target) {
          grid.removeAttribute('hidden');
          grid.classList.add('active');
        } else {
          grid.setAttribute('hidden', '');
          grid.classList.remove('active');
        }
      });

      /* Re-run reveal for newly shown items */
      const items = document.querySelectorAll('#gallery-' + target + ' .gallery-item');
      items.forEach((item, i) => {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.95)';
        item.style.transition = `opacity 0.35s ease ${i*0.04}s, transform 0.35s ease ${i*0.04}s`;
        requestAnimationFrame(() => {
          item.style.opacity   = '1';
          item.style.transform = 'scale(1)';
        });
      });
    });
  });
}

/* ============================================================
   LIGHTBOX
   ============================================================ */
function initLightbox() {
  const lightbox   = document.getElementById('lightbox');
  const lbImg      = document.getElementById('lightbox-img');
  const lbCaption  = document.getElementById('lightbox-caption');
  const lbClose    = document.getElementById('lightbox-close');
  const lbPrev     = document.getElementById('lightbox-prev');
  const lbNext     = document.getElementById('lightbox-next');

  if (!lightbox) return;

  let currentItems = [];
  let currentIndex = 0;

  function openLightbox(items, index) {
    currentItems = items;
    currentIndex = index;
    showImage();
    lightbox.removeAttribute('hidden');
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    lbClose.focus();
  }

  function closeLightbox() {
    lightbox.setAttribute('hidden', '');
    lightbox.style.display = 'none';
    document.body.style.overflow = '';
  }

  function showImage() {
    const item   = currentItems[currentIndex];
    const img    = item.querySelector('img');
    const caption = item.dataset.caption || '';
    lbImg.src        = img.src;
    lbImg.alt        = img.alt;
    lbCaption.textContent = caption;
    lbPrev.style.display = currentItems.length > 1 ? '' : 'none';
    lbNext.style.display = currentItems.length > 1 ? '' : 'none';
  }

  function prev() { currentIndex = (currentIndex - 1 + currentItems.length) % currentItems.length; showImage(); }
  function next() { currentIndex = (currentIndex + 1) % currentItems.length; showImage(); }

  /* Attach click to all gallery items */
  document.querySelectorAll('.gallery-grid').forEach(grid => {
    grid.addEventListener('click', e => {
      const item = e.target.closest('.gallery-item');
      if (!item) return;
      const siblings = Array.from(grid.querySelectorAll('.gallery-item'));
      const idx      = siblings.indexOf(item);
      openLightbox(siblings, idx);
    });
  });

  lbClose.addEventListener('click', closeLightbox);
  lbPrev.addEventListener('click',  prev);
  lbNext.addEventListener('click',  next);

  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', e => {
    if (lightbox.hasAttribute('hidden')) return;
    if (e.key === 'Escape')      closeLightbox();
    if (e.key === 'ArrowLeft')   prev();
    if (e.key === 'ArrowRight')  next();
  });
}

/* ============================================================
   BLOG FILTER (Search + Categories)
   ============================================================ */
function initBlogFilter() {
  const searchInput = document.getElementById('blog-search');
  const catBtns     = document.querySelectorAll('.cat-btn');
  const articles    = document.querySelectorAll('.blog-card');

  let currentCat  = 'all';
  let searchQuery = '';

  function filterArticles() {
    articles.forEach(article => {
      const cat     = article.dataset.cat   || '';
      const title   = article.dataset.title || '';
      const catMatch   = currentCat === 'all' || cat === currentCat;
      const searchMatch = title.includes(searchQuery.toLowerCase());
      if (catMatch && searchMatch) {
        article.classList.remove('hidden-article');
        article.style.display = '';
      } else {
        article.classList.add('hidden-article');
        article.style.display = 'none';
      }
    });
  }

  catBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      catBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCat = btn.dataset.cat;
      filterArticles();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', () => {
      searchQuery = searchInput.value.trim();
      filterArticles();
    });
  }
}

/* ============================================================
   CONTACT FORM VALIDATION & SUBMIT
   ============================================================ */
function initContactForm() {
  const form   = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  const btn    = document.getElementById('btn-send');
  if (!form)   return;

  const fields = {
    name:    { el: document.getElementById('cf-name'),    err: document.getElementById('err-name'),    validate: v => v.trim().length >= 2 ? '' : 'Name must be at least 2 characters.' },
    email:   { el: document.getElementById('cf-email'),   err: document.getElementById('err-email'),   validate: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? '' : 'Please enter a valid email address.' },
    message: { el: document.getElementById('cf-message'), err: document.getElementById('err-message'), validate: v => v.trim().length >= 10 ? '' : 'Message must be at least 10 characters.' },
  };

  /* Live validation */
  Object.values(fields).forEach(({ el, err, validate }) => {
    if (!el) return;
    el.addEventListener('blur', () => {
      const msg = validate(el.value);
      err.textContent = msg;
      el.classList.toggle('error', !!msg);
    });
    el.addEventListener('input', () => {
      if (el.classList.contains('error')) {
        const msg = validate(el.value);
        err.textContent = msg;
        el.classList.toggle('error', !!msg);
      }
    });
  });

  form.addEventListener('submit', async e => {
    e.preventDefault();

    /* Validate all */
    let valid = true;
    Object.values(fields).forEach(({ el, err, validate }) => {
      if (!el) return;
      const msg = validate(el.value);
      err.textContent = msg;
      el.classList.toggle('error', !!msg);
      if (msg) valid = false;
    });
    if (!valid) return;

    /* Simulate send */
    btn.disabled = true;
    btn.textContent = 'SENDING...';
    status.textContent = '';
    status.className   = 'form-status';

    await new Promise(r => setTimeout(r, 1800));

    btn.disabled    = false;
    btn.innerHTML   = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="18" height="18" aria-hidden="true"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> SEND MESSAGE';
    status.textContent = '✓ Message encrypted and sent successfully!';
    status.className   = 'form-status success';
    form.reset();

    /* Clear success after 5s */
    setTimeout(() => { status.textContent = ''; status.className = 'form-status'; }, 5000);
  });
}

/* ============================================================
   BACK TO TOP
   ============================================================ */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ============================================================
   TERMINAL TYPEWRITER EFFECT
   ============================================================ */
function initTerminalTypewriter() {
  const termBody = document.getElementById('terminal-body');
  if (!termBody) return;

  /* Periodic new "commands" appended to terminal */
  const commands = [
    { cmd: 'nmap -sV target.local', out: ['Scanning 1024 ports...', 'PORT 22/tcp open ssh', 'PORT 80/tcp open http', 'PORT 443/tcp open https'] },
    { cmd: 'hashcat --show dump.txt', out: ['Hash type: MD5', 'Cracked: admin:P@ss2024', 'Progress: 100%'] },
    { cmd: 'osint --search "target"', out: ['Found 14 profiles', 'Social: 3 platforms', 'Emails: 2 leaked'] },
    { cmd: 'netstat -tulpn', out: ['0.0.0.0:22 LISTEN', '0.0.0.0:443 LISTEN', 'Connections secured'] },
  ];

  let cmdIndex = 0;

  function appendCommand() {
    const data = commands[cmdIndex % commands.length];
    cmdIndex++;

    /* Add command line */
    const lineEl = document.createElement('div');
    lineEl.className = 'terminal-line mt';
    lineEl.innerHTML = `<span class="t-prompt">root@cyberluffy:~#</span> <span class="t-cmd"></span>`;
    termBody.appendChild(lineEl);
    const cmdSpan = lineEl.querySelector('.t-cmd');

    /* Type command */
    let charI = 0;
    const typeInterval = setInterval(() => {
      cmdSpan.textContent += data.cmd[charI];
      charI++;
      if (charI >= data.cmd.length) {
        clearInterval(typeInterval);
        /* Show output */
        setTimeout(() => {
          data.out.forEach((line, i) => {
            setTimeout(() => {
              const outEl = document.createElement('div');
              outEl.className = 'terminal-output';
              outEl.innerHTML = `<div class="t-out">&gt; ${line}</div>`;
              termBody.appendChild(outEl);
              termBody.scrollTop = termBody.scrollHeight;
              /* Cleanup old lines if too many */
              const allLines = termBody.children;
              if (allLines.length > 28) {
                while (termBody.children.length > 20) termBody.removeChild(termBody.firstChild);
              }
            }, i * 200);
          });
        }, 300);
      }
    }, 60);

    termBody.scrollTop = termBody.scrollHeight;
  }

  /* Run every ~8s */
  setInterval(appendCommand, 8000);
}

/* ============================================================
   SMOOTH SCROLL for anchor links (supplement to CSS)
   ============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const navH   = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'), 10) || 64;
      const top    = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ============================================================
   GLITCH EFFECT on Logo (subtle random)
   ============================================================ */
(function initGlitch() {
  const logo = document.querySelector('.logo-main');
  if (!logo) return;
  const orig = logo.textContent;
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&';

  setInterval(() => {
    if (Math.random() > 0.85) {
      let glitched = '';
      for (let i = 0; i < orig.length; i++) {
        glitched += Math.random() > 0.85 ? chars[Math.floor(Math.random() * chars.length)] : orig[i];
      }
      logo.textContent = glitched;
      setTimeout(() => { logo.textContent = orig; }, 80);
    }
  }, 3500);
})();

/* ============================================================
   CURSOR TRAIL EFFECT (subtle neon dots)
   ============================================================ */
(function initCursorTrail() {
  const MAX_DOTS = 12;
  const dots     = [];

  for (let i = 0; i < MAX_DOTS; i++) {
    const dot = document.createElement('div');
    dot.style.cssText = `
      position:fixed;pointer-events:none;z-index:9998;
      width:${6 - i*0.3}px;height:${6 - i*0.3}px;
      border-radius:50%;
      background:rgba(0,255,65,${0.7 - i*0.05});
      box-shadow:0 0 6px rgba(0,255,65,0.4);
      transition:transform 0.05s ease;
      transform:translate(-50%,-50%);
      display:none;
    `;
    document.body.appendChild(dot);
    dots.push({ el: dot, x: 0, y: 0 });
  }

  let mouseX = 0, mouseY = 0;

  window.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dots[0].el.style.display = 'block';
  });

  function animateTrail() {
    let x = mouseX, y = mouseY;
    dots.forEach((dot, i) => {
      const prev = i === 0 ? { x: mouseX, y: mouseY } : dots[i-1];
      dot.x += (prev.x - dot.x) * 0.35;
      dot.y += (prev.y - dot.y) * 0.35;
      dot.el.style.left = dot.x + 'px';
      dot.el.style.top  = dot.y + 'px';
      dot.el.style.display = 'block';
    });
    requestAnimationFrame(animateTrail);
  }
  animateTrail();
})();

/* ============================================================
   SECTION ENTRANCE (extra flair on first visible sections)
   ============================================================ */
(function initSectionGlow() {
  const sections = document.querySelectorAll('.section');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('section-in-view');
      }
    });
  }, { threshold: 0.05 });
  sections.forEach(s => obs.observe(s));
})();

/* ============================================================
   KEYBOARD ACCESSIBILITY — skip to content
   ============================================================ */
document.addEventListener('keydown', e => {
  if (e.key === 'Tab') {
    document.body.classList.add('keyboard-nav');
  }
});
document.addEventListener('mousedown', () => {
  document.body.classList.remove('keyboard-nav');
});
