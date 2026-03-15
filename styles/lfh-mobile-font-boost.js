// === Last Frontier Mobile Font Readability Boost ===
// Injects CSS overrides to enforce minimum font sizes on mobile devices.
// Targets both Shadow DOM (in-chat widgets) and main DOM (body-mounted modals).
//
// Modals inject their own <style> tags inside the modal element, so we must
// inject AFTER them (as last child) to win by source order with !important.
//
// Kill switch: localStorage.setItem('lfh_disable_font_boost', 'true')
// Then reload the page. Fonts revert instantly.

(function() {
  'use strict';

  // Kill switch — allows instant browser-level disable without deploy
  try {
    if (localStorage.getItem('lfh_disable_font_boost') === 'true') {
      console.log('[LFH] Mobile font boost disabled via localStorage kill switch');
      return;
    }
  } catch (e) {}

  var STYLE_ID = 'lf-mobile-font-boost';

  var css = `
/* ===========================================
   Mobile Font Readability Boost
   Enforces minimum font sizes for elderly users
   Only applies at max-width: 768px
   =========================================== */

@media (max-width: 768px) {

  /* --- DEBUG: red outline on boosted elements (remove after verification) --- */
  [class^="lfhte-"], [class*=" lfhte-"],
  [class^="lfhlc-"], [class*=" lfhlc-"],
  [class^="lfhub-"], [class*=" lfhub-"],
  [class^="lfhbss-"], [class*=" lfhbss-"],
  [class^="lfh-v3-"], [class*=" lfh-v3-"],
  [class^="lfhwc-"], [class*=" lfhwc-"],
  [class^="lfhww2-"], [class*=" lfhww2-"],
  [class^="lfh-grid-"], [class*=" lfh-grid-"] {
    outline: 2px solid red !important;
  }

  /* --- Hub: Tours Tab (lfhte- prefix) --- */
  .lfhte-card-stats,
  .lfhte-card-price,
  .lfhte-card-desc {
    font-size: 13px !important;
  }
  .lfhte-stat-label,
  .lfhte-stat-value {
    font-size: 13px !important;
  }
  .lfhte-full-desc,
  .lfhte-pricing-note {
    font-size: 14px !important;
  }
  .lfhte-best-for-badge,
  .lfhte-card-title {
    font-size: 13px !important;
  }
  .lfhte-btn-primary,
  .lfhte-btn-outline {
    font-size: 13px !important;
  }
  .lfhte-included-item {
    font-size: 13px !important;
  }
  .lfhte-tray-thumb {
    font-size: 12px !important;
  }
  .lfhte-filter-bar,
  .lfhte-filter-btn {
    font-size: 13px !important;
  }

  /* --- Tours Grid cards (lfhte-gw- prefix) --- */
  .lfhte-gw-badge {
    font-size: 11px !important;
  }
  .lfhte-gw-card-price {
    font-size: 13px !important;
  }

  /* --- Hub: Lodges Tab (lfhlc- prefix) --- */
  .lfhlc-comp-cell,
  .lfhlc-comp-label {
    font-size: 13px !important;
  }
  .lfhlc-tab {
    font-size: 12px !important;
  }
  .lfhlc-detail-stat-val,
  .lfhlc-detail-stat-lbl {
    font-size: 13px !important;
  }

  /* --- Hub Chrome (lfhub- prefix) --- */
  .lfhub-tab-label {
    font-size: 12px !important;
  }

  /* --- Self-Service (lfhbss- prefix) --- */
  .lfhbss-tab,
  .lfhbss-tab-label,
  .lfhbss-resource-desc {
    font-size: 13px !important;
  }
  .lfhbss-faq-question,
  .lfhbss-faq-answer,
  .lfhbss-faq-answer-inner {
    font-size: 14px !important;
  }

  /* --- Lead Form (lfh-v3- prefix) --- */
  .lfh-v3-label,
  .lfh-v3-input,
  .lfh-v3-select {
    font-size: 14px !important;
  }
  .lfh-v3-intent-title,
  .lfh-v3-intent-desc {
    font-size: 13px !important;
  }
  .lfh-v3-checkbox-label {
    font-size: 13px !important;
  }
  .lfh-v3-progress-label {
    font-size: 11px !important;
  }
  .lfh-v3-progress-optional {
    font-size: 11px !important;
  }
  .lfh-v3-season-dates,
  .lfh-v3-season-terrain {
    font-size: 12px !important;
  }

  /* --- Weather widget (lfhww2- prefix) --- */
  .lfhww2-subtitle {
    font-size: 13px !important;
  }

  /* --- Weather modal (lfhwc- prefix) --- */
  .lfhwc-stat-value,
  .lfhwc-stat-label {
    font-size: 13px !important;
  }

  /* --- Welcome Grid (lfh-grid- prefix) --- */
  .lfh-grid-card-subtitle,
  .lfh-grid-footer {
    font-size: 13px !important;
  }

}
`;

  function injectStyleInto(parent, id) {
    if (parent.querySelector('#' + id)) return; // already injected
    var style = document.createElement('style');
    style.id = id;
    style.textContent = css;
    parent.appendChild(style); // append LAST so it wins by source order
  }

  // --- Shadow DOM injection (for in-chat widgets) ---
  function injectIntoShadow() {
    var shadowHost = document.getElementById('voiceflow-chat');
    if (!shadowHost || !shadowHost.shadowRoot) {
      setTimeout(injectIntoShadow, 200);
      return;
    }
    injectStyleInto(shadowHost.shadowRoot, STYLE_ID);
    console.log('[LFH] Mobile font boost injected into Shadow DOM');
  }

  // --- Body modal injection (for hub, tours, lodges, weather, self-service modals) ---
  // Modals are dynamically appended to document.body. Their own <style> tags live
  // inside the modal element. We must inject our boost AFTER those styles.
  function watchForModals() {
    // Inject into any modals already present
    injectIntoExistingModals();

    // Watch for new modals being added to body
    var observer = new MutationObserver(function(mutations) {
      for (var i = 0; i < mutations.length; i++) {
        var added = mutations[i].addedNodes;
        for (var j = 0; j < added.length; j++) {
          var node = added[j];
          if (node.nodeType === 1 && node.querySelector && node.querySelector('style')) {
            // A new element with styles was added to body — likely a modal
            // Delay briefly to let the extension finish building its DOM
            setTimeout(function() { injectIntoExistingModals(); }, 100);
            return;
          }
        }
      }
    });
    observer.observe(document.body, { childList: true });
  }

  function injectIntoExistingModals() {
    // Find all elements on body that contain our target class prefixes
    var modals = document.body.querySelectorAll('[class*="lfhub-"], [class*="lfhbss-"], [class*="lfhwc-"], [class*="lfhlc-"], [class*="lfhte-"]');
    var injected = {};
    for (var i = 0; i < modals.length; i++) {
      // Walk up to the top-level body child (the modal root)
      var el = modals[i];
      while (el.parentElement && el.parentElement !== document.body) {
        el = el.parentElement;
      }
      if (el.parentElement === document.body && !injected[el.id || i]) {
        injectStyleInto(el, STYLE_ID + '-modal');
        injected[el.id || i] = true;
      }
    }

    // Also inject into head as fallback for any elements not inside a modal
    injectStyleInto(document.head, STYLE_ID + '-head');
  }

  injectIntoShadow();
  watchForModals();

})();
