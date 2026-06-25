/* ═══════════════════════════════════════════
   BONNOUVRIER — Scripts principaux
   js/main.js
═══════════════════════════════════════════ */

window.addEventListener('load', function() {

  /* Nav scroll */
  var nav = document.getElementById('main-nav');
  window.addEventListener('scroll', function() {
    nav.classList.toggle('scrolled', scrollY > 60);
  });

  /* Menu mobile */
  window.toggleMenu = function() {
    const links = document.querySelector('.nav-links');
    const open = links.style.display === 'flex';
    Object.assign(links.style, open ? {display:''} : {
      display:'flex', flexDirection:'column', position:'absolute',
      top:'100%', left:'0', right:'0', background:'rgba(15,15,15,.97)',
      padding:'1.2rem 5vw', gap:'.9rem', borderTop:'1px solid rgba(192,57,43,.3)'
    });
  };

  /* Carrousel services */
  var svcIndex = 0;

  window.slideSvc = function(dir) {
    const track = document.getElementById('svcCarousel');
    if (!track) return;
    const cards = track.querySelectorAll('.svc-card');
    const visible = window.innerWidth < 768 ? 1 : 4;
    const max = cards.length - visible;
    svcIndex = Math.max(0, Math.min(svcIndex + dir, max));
    const w = cards[0].offsetWidth + 24;
    track.style.transform = `translateX(-${svcIndex * w}px)`;
  };

  /* Swipe tactile */
  const track = document.getElementById('svcCarousel');
  if (track) {
    let startX = 0;
    track.addEventListener('mousedown', e => startX = e.clientX);
    track.addEventListener('mouseup', e => {
      const diff = startX - e.clientX;
      if (Math.abs(diff) > 50) window.slideSvc(diff > 0 ? 1 : -1);
    });
    track.addEventListener('touchstart', e => startX = e.touches[0].clientX, { passive: true });
    track.addEventListener('touchend', e => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) window.slideSvc(diff > 0 ? 1 : -1);
    });
  }

  /* Carrousel Charpente & Toiture */
var ctIndex = 0;
window.slideCt = function(dir) {
  const track = document.getElementById('ctCarousel');
  if (!track) return;
  const cards = track.querySelectorAll('.ct-card');
  const visible = window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3;
  const max = cards.length - visible;
  ctIndex = Math.max(0, Math.min(ctIndex + dir, max));
  const w = cards[0].offsetWidth + 24;
  track.style.transform = `translateX(-${ctIndex * w}px)`;
};
const ctTrack = document.getElementById('ctCarousel');
if (ctTrack) {
  let ctStartX = 0;
  ctTrack.addEventListener('touchstart', e => ctStartX = e.touches[0].clientX, { passive:true });
  ctTrack.addEventListener('touchend', e => {
    const diff = ctStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) window.slideCt(diff > 0 ? 1 : -1);
  });
}

  /* Reveal on scroll */
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

  /* Onglets peinture */
  window.switchTab = function(btn, panelId) {
    document.querySelectorAll('.pe-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.pe-panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(panelId).classList.add('active');
  };

  /* FAQ accordion */
  window.toggleFaq = function(el) {
    const item = el.parentElement;
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!wasOpen) item.classList.add('open');
  };

  /* Formulaire */
  window.handleSubmit = function(e) {
    e.preventDefault();
    const form = e.target;
    const btn  = form.querySelector('[type="submit"]');
    const orig = btn.textContent;

    btn.textContent = 'Envoi en cours…';
    btn.disabled = true;

    const data = new FormData(form);

    fetch('https://formspree.io/f/mbdvgwge', {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      })
      .then(r => r.json())
      .then(res => {
        if (res.ok) {
          btn.textContent = 'Demande envoyée ✓';
          btn.style.background = '#27ae60';
          form.reset();
    setTimeout(() => {
      btn.textContent = orig;
      btn.style.background = '';
      btn.disabled = false;
          }, 4000);
        } else {
          btn.textContent = 'Erreur — réessayez';
          btn.style.background = '#c0392b';
          btn.disabled = false;
          setTimeout(() => { btn.textContent = orig; btn.style.background = ''; }, 3000);
        }
      })
      .catch(() => {
        btn.textContent = 'Erreur réseau';
        btn.style.background = '#c0392b';
        btn.disabled = false;
        setTimeout(() => { btn.textContent = orig; btn.style.background = ''; }, 3000);
      });
  };

});