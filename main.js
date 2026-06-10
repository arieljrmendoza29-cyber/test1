(function () {
  'use strict';

  // ── Navbar scroll ───────────────────────────────
  var navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', function () {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  // ── Hamburger menu ──────────────────────────────
  var hamburger = document.getElementById('hamburger');
  var mobileMenu = document.getElementById('mobileMenu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      var isOpen = mobileMenu.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    document.addEventListener('click', function (e) {
      if (mobileMenu.classList.contains('open') &&
          !mobileMenu.contains(e.target) &&
          !hamburger.contains(e.target)) {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  // ── Active nav link ─────────────────────────────
  var page = location.pathname.split('/').pop() || 'index.html';
  if (page === '') page = 'index.html';
  var navMap = {
    'index.html':    'nav-home',
    'about.html':    'nav-about',
    'services.html': 'nav-services',
    'history.html':  'nav-history',
    'mission.html':  'nav-mission',
    'reviews.html':  'nav-reviews',
    'contact.html':  'nav-contact'
  };
  var activeId = navMap[page];
  if (activeId) {
    var el = document.getElementById(activeId);
    if (el) el.classList.add('active');
    if (mobileMenu) {
      mobileMenu.querySelectorAll('a').forEach(function (a) {
        if (a.getAttribute('href') === page) a.classList.add('active');
      });
    }
  }

  // ── Reduced motion check ─────────────────────────
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ── Scroll-triggered fade-up ─────────────────────
  if (!prefersReduced && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.fade-up').forEach(function (el) {
      observer.observe(el);
    });
  } else {
    document.querySelectorAll('.fade-up').forEach(function (el) {
      el.classList.add('visible');
    });
  }

  // ── Text reveal animation (word-by-word) ─────────
  // Splits heading text into word spans and staggers them in.
  // Add class "text-reveal" to any heading/paragraph to activate.
  function initTextReveal() {
    if (prefersReduced) {
      document.querySelectorAll('.text-reveal').forEach(function (el) {
        el.classList.add('revealed');
      });
      return;
    }

    if (!('IntersectionObserver' in window)) return;

    document.querySelectorAll('.text-reveal').forEach(function (el) {
      // Only process once
      if (el.dataset.textRevealDone) return;
      el.dataset.textRevealDone = '1';

      // Collect child nodes preserving structure for mixed-colour headings
      // (e.g. <h1>BUILT ON <span>TRUST</span></h1>)
      var words = [];
      function walkNode(node) {
        if (node.nodeType === Node.TEXT_NODE) {
          // Split text node into word spans
          var parts = node.textContent.split(/(\s+)/);
          parts.forEach(function (part) {
            if (part.trim().length > 0) {
              var span = document.createElement('span');
              span.classList.add('tr-word');
              span.textContent = part;
              words.push(span);
              node.parentNode.insertBefore(span, node);
            } else if (part.length > 0) {
              // whitespace – keep as text node
              node.parentNode.insertBefore(document.createTextNode(part), node);
            }
          });
          node.parentNode.removeChild(node);
        } else if (node.nodeType === Node.ELEMENT_NODE && node !== el) {
          // Keep the element but walk its children
          var childNodes = Array.prototype.slice.call(node.childNodes);
          childNodes.forEach(walkNode);
        }
      }
      var childNodes = Array.prototype.slice.call(el.childNodes);
      childNodes.forEach(walkNode);

      // Stagger delays
      words.forEach(function (w, i) {
        w.style.transitionDelay = (i * 60) + 'ms';
      });

      var revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            el.classList.add('revealed');
            revealObserver.unobserve(el);
          }
        });
      }, { threshold: 0.15, rootMargin: '0px 0px -30px 0px' });

      revealObserver.observe(el);
    });
  }

  // ── Count-up animation ───────────────────────────
  // Elements: add class "count-up" and data-target="<number>"
  // Optional: data-suffix="%", data-prefix=""
  // For elements already containing a number wrapped in <span>
  // (e.g. <div class="number"><span>100</span>%</div>), the span
  // gets the class automatically via initCountUp().
  function easeOutQuart(t) {
    return 1 - Math.pow(1 - t, 4);
  }

  function animateCount(el) {
    var target = parseFloat(el.dataset.target);
    if (isNaN(target)) return;
    var suffix = el.dataset.suffix || '';
    var prefix = el.dataset.prefix || '';
    var decimals = (el.dataset.target.indexOf('.') !== -1)
      ? el.dataset.target.split('.')[1].length
      : 0;
    var duration = parseInt(el.dataset.duration || '1800', 10);
    var start = null;

    function step(ts) {
      if (!start) start = ts;
      var elapsed = ts - start;
      var progress = Math.min(elapsed / duration, 1);
      var eased = easeOutQuart(progress);
      var value = (target * eased).toFixed(decimals);
      el.textContent = prefix + value + suffix;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = prefix + target.toFixed(decimals) + suffix;
      }
    }
    requestAnimationFrame(step);
  }

  function initCountUp() {
    if (prefersReduced) return;
    if (!('IntersectionObserver' in window)) return;

    // Auto-tag the explicit <span> inside .number (e.g. <span>100</span>%)
    document.querySelectorAll('.number span').forEach(function (span) {
      var num = parseFloat(span.textContent);
      if (!isNaN(num) && !span.classList.contains('count-up')) {
        span.classList.add('count-up');
        span.dataset.target = num.toString();
        // detect suffix following the span in parent text
        var parent = span.parentNode;
        var suffix = '';
        parent.childNodes.forEach(function (n) {
          if (n.nodeType === Node.TEXT_NODE) suffix += n.textContent.trim();
        });
        span.dataset.suffix = suffix; // might be '' or '%'
      }
    });

    // Also tag .t-num elements that are purely numeric (with optional suffix)
    document.querySelectorAll('.t-num').forEach(function (el) {
      if (el.classList.contains('count-up')) return;
      var raw = el.textContent.trim();
      var match = raw.match(/^(\d+(?:\.\d+)?)([\s\S]*)$/);
      if (match) {
        el.classList.add('count-up');
        el.dataset.target = match[1];
        el.dataset.suffix = match[2].trim();
        el.dataset.origText = raw; // save for reset prevention
      }
    });

    // Same for .hero-stat .number
    document.querySelectorAll('.hero-stat .number').forEach(function (el) {
      if (el.classList.contains('count-up')) return;
      var raw = el.textContent.trim();
      var match = raw.match(/^(\d+(?:\.\d+)?)([\s\S]*)$/);
      if (match) {
        el.classList.add('count-up');
        el.dataset.target = match[1];
        el.dataset.suffix = match[2].trim();
      }
    });

    var countObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          countObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    document.querySelectorAll('.count-up').forEach(function (el) {
      countObserver.observe(el);
    });
  }

  // ── Apply text-reveal to headings inside page-hero & hero ──
  // (runs after DOM ready, i.e. here at parse time since script is at bottom)
  function initHeroTextReveal() {
    // hero h1 lines
    document.querySelectorAll('.hero h1, .page-hero h1').forEach(function (h) {
      h.classList.add('text-reveal');
    });
    // hero eyebrow
    document.querySelectorAll('.hero .hero-eyebrow, .page-hero .page-hero-eyebrow').forEach(function (h) {
      h.classList.add('text-reveal');
    });
    // hero sub-text
    document.querySelectorAll('.hero > p, .hero-content > p').forEach(function (p) {
      p.classList.add('text-reveal');
    });
    // section titles & subtitles
    document.querySelectorAll('.section-title, .section-subtitle').forEach(function (el) {
      el.classList.add('text-reveal');
    });
  }

  // ── Init all animations ───────────────────────────
  initHeroTextReveal();
  initTextReveal();
  initCountUp();

  // ── Contact form ─────────────────────────────────
  var form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('.form-submit');
      var orig = btn.textContent;
      btn.textContent = 'Message Sent!';
      btn.style.background = '#0a0a0a';
      btn.style.color = '#f5c800';
      btn.disabled = true;
      setTimeout(function () {
        btn.textContent = orig;
        btn.style.background = '';
        btn.style.color = '';
        btn.disabled = false;
        form.reset();
      }, 3000);
    });
  }

  // ── iOS touch: pause carousel on touch ──────────
  var track = document.querySelector('.reviews-track');
  if (track) {
    track.addEventListener('touchstart', function () {
      track.style.animationPlayState = 'paused';
    }, { passive: true });
    track.addEventListener('touchend', function () {
      track.style.animationPlayState = 'running';
    }, { passive: true });
  }

})();
