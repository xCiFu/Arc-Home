/* ═══════════════════════════════════════════
   SAYLO — Main JS
   Global interactions: cursor, nav, reveal, pricing
═══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ─── CUSTOM CURSOR ─── */
  const cur  = document.getElementById('cur');
  const curR = document.getElementById('cur-r');

  if (cur && curR && window.innerWidth > 1024) {
    let mx = 0, my = 0;

    document.addEventListener('mousemove', e => {
      mx = e.clientX;
      my = e.clientY;
      cur.style.left = mx + 'px';
      cur.style.top  = my + 'px';
    });

    setInterval(() => {
      curR.style.left = mx + 'px';
      curR.style.top  = my + 'px';
    }, 60);
  }

  /* ─── NAV SCROLL ─── */
  const nav = document.getElementById('nav');
  if (nav) {
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ─── MOBILE MENU ─── */
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileClose = document.getElementById('mobileClose');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => mobileMenu.classList.add('open'));
    mobileClose?.addEventListener('click', () => mobileMenu.classList.remove('open'));

    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => mobileMenu.classList.remove('open'));
    });
  }

  /* ─── SCROLL REVEAL ─── */
  const reveals = document.querySelectorAll('.r');
  if (reveals.length) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('v');
          observer.unobserve(entry.target); // fire once
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

    reveals.forEach(el => observer.observe(el));
  }

  /* ─── SMOOTH SCROLL ─── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ─── PRICING TOGGLE ─── */
  const toggleBtns = document.querySelectorAll('.toggle-opt');

  if (toggleBtns.length) {
    const priceData = {
      monthly: [
        { amount: '0',     period: 'para siempre · 1 usuario' },
        { amount: '49',    period: '/ usuario / mes'           },
        { amount: 'Medida', period: 'para equipos de +20 personas' },
      ],
      annual: [
        { amount: '0',     period: 'para siempre · 1 usuario'              },
        { amount: '39',    period: '/ usuario / mes · facturado anualmente' },
        { amount: 'Medida', period: 'para equipos de +20 personas'          },
      ],
    };

    const planAmounts = document.querySelectorAll('.plan__amount');
    const planPeriods = document.querySelectorAll('.plan__period');

    function applyPricing(mode) {
      const data = priceData[mode];
      planAmounts.forEach((el, i) => {
        if (data[i]) el.textContent = data[i].amount;
      });
      planPeriods.forEach((el, i) => {
        if (data[i]) el.textContent = data[i].period;
      });
    }

    toggleBtns.forEach((btn, i) => {
      btn.addEventListener('click', () => {
        toggleBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        applyPricing(i === 0 ? 'monthly' : 'annual');
      });
    });
  }

  /* ─── VOICE CARD STATUS LOOP ─── */
  const statusPill = document.querySelector('.pill--listening');
  if (statusPill) {
    const states = [
      { cls: 'pill--listening',  text: 'Escuchando...'  },
      { cls: 'pill--processing', text: 'Procesando...'  },
      { cls: 'pill--done',       text: 'Completado ✓'   },
    ];
    let idx = 0;

    setInterval(() => {
      idx = (idx + 1) % states.length;
      statusPill.className = `pill ${states[idx].cls}`;
      statusPill.innerHTML = `<div class="pill__dot"></div> ${states[idx].text}`;
    }, 2800);
  }

  /* ─── CTA FORM ─── */
  const ctaForm   = document.querySelector('.cta__form');
  const ctaInput  = document.querySelector('.cta__input');
  const ctaSubmit = document.querySelector('.cta__submit');

  if (ctaForm && ctaInput && ctaSubmit) {
    ctaSubmit.addEventListener('click', () => {
      const email = ctaInput.value.trim();
      if (!email || !email.includes('@')) {
        ctaInput.style.borderColor = 'var(--signal)';
        ctaInput.focus();
        return;
      }
      ctaSubmit.textContent = '✓ Solicitud enviada';
      ctaSubmit.style.background = 'var(--pulse)';
      ctaSubmit.style.color = 'var(--void)';
      ctaInput.value = '';
      ctaInput.disabled = true;
      ctaSubmit.disabled = true;
    });
  }

});
