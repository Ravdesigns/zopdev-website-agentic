/* ════════════════════════════════════════════════════════════════
   Desktop nav megamenu · canonical behaviour
   Hover · focus · click-to-toggle on the trigger label
   Single source of truth, included on every subpage. The IIFE bails
   if a previous instance already initialised on this overlay so it
   coexists with any legacy inline copy that hasn't been stripped yet.
   ════════════════════════════════════════════════════════════════ */
(function(){
  var overlay = document.getElementById('nav-overlay');
  var navLinks = document.getElementById('nav-links');
  if(!overlay || !navLinks) return;
  if(overlay.dataset.navInit === '1') return;
  overlay.dataset.navInit = '1';

  var panes = {};
  overlay.querySelectorAll('.nav-pane').forEach(function(p){
    panes[p.dataset.pane] = p;
  });

  var activeMenu = null;
  var closeTimer = null;

  function getLeft(navItem){
    var navInner = navItem.closest('.nav-inner');
    if(!navInner) return 0;
    var niRect = navItem.getBoundingClientRect();
    var innerRect = navInner.getBoundingClientRect();
    var left = niRect.left - innerRect.left;
    var overlayW = overlay.offsetWidth || 720;
    var maxLeft = innerRect.width - overlayW - 16;
    return Math.max(0, Math.min(left, maxLeft));
  }

  function showMenu(menuName, navItem){
    clearTimeout(closeTimer);
    overlay.style.left = getLeft(navItem) + 'px';
    if(activeMenu !== menuName){
      Object.keys(panes).forEach(function(k){ panes[k].classList.remove('active'); });
      var incoming = panes[menuName];
      if(incoming){
        incoming.classList.add('active');
        var panesEl = overlay.querySelector('.nav-panes');
        if(panesEl) panesEl.style.height = incoming.offsetHeight + 'px';
      }
      activeMenu = menuName;
    }
    navLinks.querySelectorAll('.nav-item').forEach(function(ni){
      ni.classList.toggle('open', ni.dataset.menu === menuName);
    });
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden','false');
  }

  function hideMenu(){
    closeTimer = setTimeout(function(){
      overlay.classList.remove('open');
      overlay.setAttribute('aria-hidden','true');
      navLinks.querySelectorAll('.nav-item').forEach(function(ni){ ni.classList.remove('open'); });
      activeMenu = null;
    }, 120);
  }

  function closeNow(){
    clearTimeout(closeTimer);
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden','true');
    navLinks.querySelectorAll('.nav-item').forEach(function(ni){ ni.classList.remove('open'); });
    activeMenu = null;
  }

  navLinks.querySelectorAll('.nav-item').forEach(function(item){
    item.addEventListener('mouseenter', function(){ showMenu(item.dataset.menu, item); });
    item.addEventListener('mouseleave', hideMenu);
    var label = item.querySelector('a');
    if(label){
      label.addEventListener('click', function(e){
        e.preventDefault();
        e.stopPropagation();
        if(activeMenu === item.dataset.menu && overlay.classList.contains('open')){
          closeNow();
        } else {
          showMenu(item.dataset.menu, item);
        }
      });
      label.addEventListener('focus', function(){ showMenu(item.dataset.menu, item); });
      label.addEventListener('blur', hideMenu);
    }
  });

  overlay.addEventListener('mouseenter', function(){ clearTimeout(closeTimer); });
  overlay.addEventListener('mouseleave', hideMenu);

  /* clicking any link inside an open pane navigates immediately */
  overlay.addEventListener('click', function(e){
    if(e.target.closest('a[href]')) closeNow();
  });

  /* outside click closes */
  document.addEventListener('click', function(e){
    if(!e.target.closest('.nav') && !e.target.closest('.nav-overlay')){
      if(overlay.classList.contains('open')) closeNow();
    }
  });

  /* escape closes */
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape') closeNow();
  });
})();
