/* ============================================================================
   chrome-pagetransition.js
   ----------------------------------------------------------------------------
   Smooth page-to-page transition · subtle opacity fade only.
   No bars, no overlay tiles. Page fades out to a soft cream/dark wash on
   link click, navigates, and fades back in on the new page. The wash is
   theme-aware so neither mode flashes the wrong colour.

   Skips: external links, hash links, mailto/tel, target="_blank", links
   with [data-no-transition], reduced-motion users, and modifier-key
   clicks (cmd/ctrl/shift/alt) so users opening in a new tab aren't
   intercepted.
   ============================================================================ */
(function(){
  if (window.__zopPageTransitionInit) return;
  window.__zopPageTransitionInit = true;

  var FADE_OUT = 220;   // ms · page fades to wash before navigation
  var HOLD     = 30;
  var FADE_IN  = 280;   // ms · wash fades back to reveal new page
  var SAFETY   = 1100;  // hard fallback if navigation stalls

  /* ── Inject CSS once ──────────────────────────────────────────────────── */
  if (!document.getElementById('zd-pt-css')) {
    var css = document.createElement('style');
    css.id = 'zd-pt-css';
    css.textContent =
      '.zd-pt{position:fixed;inset:0;z-index:99999;pointer-events:none;' +
        'background:var(--paper,#FAF7EC);opacity:0;' +
        'transition:opacity 280ms cubic-bezier(.22,.78,.32,1);}' +
      'html[data-theme="dark"] .zd-pt{background:#0F0F12;}' +
      'html:not([data-theme="light"]) .zd-pt{background:#0F0F12;}' +
      '.zd-pt.is-in{opacity:1;}' +
      '@media (prefers-reduced-motion: reduce){' +
        '.zd-pt{transition:opacity 120ms ease;}' +
      '}';
    document.head.appendChild(css);
  }

  /* ── Build overlay markup ─────────────────────────────────────────────── */
  var overlay = document.getElementById('zd-pt');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'zd-pt';
    overlay.className = 'zd-pt';
    overlay.setAttribute('aria-hidden', 'true');
    document.body.appendChild(overlay);
  }

  /* ── On page load · start the wash visible, then fade it out so the
     incoming page reveals smoothly. The setTimeout safety force-clears the
     wash even when rAF / the CSS transition is throttled (background or
     embedded preview tabs) — without it the curtain can freeze mid-fade and
     sit veiling the page. ──────────────────────────────────────────────── */
  function clearWash(){
    overlay.classList.remove('is-in');
    overlay.style.display = 'none';
  }
  overlay.style.display = '';
  overlay.classList.add('is-in');
  requestAnimationFrame(function(){
    requestAnimationFrame(function(){ overlay.classList.remove('is-in'); });
  });
  setTimeout(clearWash, FADE_IN + 260);

  /* Belt & suspenders · also clear on full load and whenever the tab becomes
     visible. A tab throttled or hidden during load (background tab, embedded
     preview pane) can pause rAF and the CSS fade mid-way; this guarantees the
     wash is gone the moment the page is actually looked at. */
  window.addEventListener('load', function(){ setTimeout(clearWash, 50); });
  document.addEventListener('visibilitychange', function(){
    if (!document.hidden) clearWash();
  });

  /* ── Intercept internal link clicks · fade out, navigate ──────────────── */
  function shouldHandle(link, e){
    if (!link) return false;
    var href = link.getAttribute('href');
    if (!href) return false;
    if (href.charAt(0) === '#') return false;
    if (/^(?:mailto:|tel:|javascript:|data:)/.test(href)) return false;
    if (/^https?:\/\//.test(href) && !href.startsWith(window.location.origin)) return false;
    if (link.target && link.target !== '_self') return false;
    if (link.hasAttribute('download')) return false;
    if (link.hasAttribute('data-no-transition')) return false;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return false;
    if (e.button !== 0) return false;
    return true;
  }

  document.addEventListener('click', function(e){
    var link = e.target.closest && e.target.closest('a[href]');
    if (!shouldHandle(link, e)) return;

    var href = link.getAttribute('href');
    var url;
    try { url = new URL(href, window.location.href); }
    catch(_) { return; }

    /* Same-page hash link · skip transition */
    if (url.pathname === window.location.pathname &&
        url.search === window.location.search &&
        url.hash) return;

    e.preventDefault();
    overlay.style.display = '';      /* re-arm · load-reveal may have hidden it */
    void overlay.offsetWidth;        /* reflow so the fade starts from opacity:0 */
    overlay.classList.add('is-in');
    var navigated = false;
    var navigate = function(){
      if (navigated) return;
      navigated = true;
      window.location.href = url.href;
    };
    setTimeout(navigate, FADE_OUT + HOLD);
    setTimeout(navigate, SAFETY);
  }, true);

  /* ── Back/forward bfcache · re-fade out cleanly ───────────────────────── */
  window.addEventListener('pageshow', function(ev){
    if (ev.persisted) {
      overlay.style.display = '';
      void overlay.offsetWidth;
      overlay.classList.add('is-in');
      requestAnimationFrame(function(){
        requestAnimationFrame(function(){ overlay.classList.remove('is-in'); });
      });
      setTimeout(clearWash, FADE_IN + 260);
    }
  });
})();
