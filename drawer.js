/* ============================================================
   BENTO DRAWER · open/close behavior
   Self-initializing IIFE. Looks for #drawer-scrim, #drawer,
   #drawer-content, #drawer-close. Binds to .feat-expand buttons
   and to whole-card click on .features-bento .feature,
   .cap-grid .cap-card, and .zd-platform-row .zd-pcard.
   ============================================================ */
(function(){
  var scrim    = document.getElementById('drawer-scrim');
  var drawer   = document.getElementById('drawer');
  var body     = document.getElementById('drawer-content');
  var closeBtn = document.getElementById('drawer-close');
  if(!scrim || !drawer || !body) return;

  /* Convert each `.drw-rec-pillar` div into a native <details> /
     <summary> structure so we get the same accordion behaviour the
     FAQ uses (browser-native open/close, no JS toggle, no listener
     stacking). Runs once per drawer open after `body.innerHTML` is
     replaced. First pillar opens by default. */
  function convertPillarsToDetails(){
    var three = body.querySelector('.drw-rec-three');
    if(!three) return;
    var pillars = three.querySelectorAll('.drw-rec-pillar');
    pillars.forEach(function(pillar, idx){
      // If already converted (rare edge), skip
      if(pillar.tagName === 'DETAILS') return;
      var icon = pillar.querySelector('.drw-rec-pillar-icon');
      var h4   = pillar.querySelector('h4');
      var ps   = Array.prototype.slice.call(pillar.querySelectorAll('p'));

      var details = document.createElement('details');
      details.className = 'drw-rec-pillar';
      if(idx === 0) details.setAttribute('open', '');

      var summary = document.createElement('summary');
      summary.className = 'drw-rec-pillar-summary';
      if(icon) summary.appendChild(icon);
      if(h4){
        // h4 keeps its original text + classes
        summary.appendChild(h4);
      }
      var chev = document.createElement('span');
      chev.className = 'drw-rec-pillar-chev';
      chev.setAttribute('aria-hidden', 'true');
      chev.textContent = '+';
      summary.appendChild(chev);
      details.appendChild(summary);

      var bodyWrap = document.createElement('div');
      bodyWrap.className = 'drw-rec-pillar-body';
      var inner = document.createElement('div');
      bodyWrap.appendChild(inner);
      ps.forEach(function(p){ inner.appendChild(p); });
      details.appendChild(bodyWrap);

      pillar.parentNode.replaceChild(details, pillar);
    });
  }

  function openFrom(feature){
    var tpl = feature.querySelector('.feat-drawer-tpl');
    if(!tpl) return;
    body.innerHTML = tpl.innerHTML;
    convertPillarsToDetails();
    scrim.classList.add('open');
    drawer.classList.add('open');
    scrim.setAttribute('aria-hidden', 'false');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if(closeBtn) setTimeout(function(){ closeBtn.focus(); }, 300);
  }
  function close(){
    scrim.classList.remove('open');
    drawer.classList.remove('open');
    scrim.setAttribute('aria-hidden', 'true');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // open on expand button click
  document.querySelectorAll('.feat-expand').forEach(function(btn){
    btn.addEventListener('click', function(e){
      e.stopPropagation();
      var card = btn.closest('.feature, .cap-card, .zd-pcard, .zd-card');
      if(card) openFrom(card);
    });
  });

  // open on whole-card click
  document.querySelectorAll('.features-bento .feature, .cap-grid .cap-card, .zd-platform-row .zd-pcard, .zd-coming .zd-card').forEach(function(card){
    if(!card.querySelector('.feat-drawer-tpl')) return;
    card.style.cursor = 'pointer';
    card.addEventListener('click', function(e){
      if(e.target.closest('a, button')) return;
      openFrom(card);
    });
    card.addEventListener('keydown', function(e){
      if(e.key === 'Enter' || e.key === ' '){
        e.preventDefault();
        openFrom(card);
      }
    });
    if(!card.hasAttribute('tabindex')) card.setAttribute('tabindex', '0');
  });

  // close handlers
  if(scrim) scrim.addEventListener('click', close);
  if(closeBtn) closeBtn.addEventListener('click', close);
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape' && drawer.classList.contains('open')) close();
  });

  // shadow on scrolled-down drawer
  drawer.addEventListener('scroll', function(){
    if(drawer.scrollTop > 8) drawer.classList.add('is-scrolled');
    else drawer.classList.remove('is-scrolled');
  });
})();
