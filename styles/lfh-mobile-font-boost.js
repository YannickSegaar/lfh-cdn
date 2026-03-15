// === Last Frontier Mobile Font Readability Boost ===
// Injects CSS overrides to enforce minimum font sizes on mobile devices.
// Targets both Shadow DOM (in-chat widgets) and main DOM (body-mounted modals).
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

  /* --- DEBUG: Visual indicator — red outline on all boosted elements --- */
  /* Remove this block once verified working */
  .lfhte-card-stats, .lfhte-card-price, .lfhte-card-desc,
  .lfhte-stat-label, .lfhte-stat-value,
  .lfhte-full-desc, .lfhte-pricing-note,
  .lfhte-best-for-badge, .lfhte-card-title,
  .lfhte-btn-primary, .lfhte-btn-outline,
  .lfhte-included-item, .lfhte-tray-thumb,
  .lfhte-filter-bar, .lfhte-filter-btn,
  .lfhte-gw-badge, .lfhte-gw-card-price,
  .lfhlc-comp-cell, .lfhlc-comp-label, .lfhlc-tab,
  .lfhlc-detail-stat-val, .lfhlc-detail-stat-lbl,
  .lfhub-tab-label,
  .lfhbss-tab, .lfhbss-tab-label, .lfhbss-resource-desc,
  .lfhbss-faq-question, .lfhbss-faq-answer, .lfhbss-faq-answer-inner,
  .lfh-v3-label, .lfh-v3-input, .lfh-v3-select,
  .lfh-v3-intent-title, .lfh-v3-intent-desc,
  .lfh-v3-checkbox-label, .lfh-v3-progress-label,
  .lfh-v3-progress-optional, .lfh-v3-season-dates, .lfh-v3-season-terrain,
  .lfhww2-subtitle,
  .lfhwc-stat-value, .lfhwc-stat-label,
  .lfh-grid-card-subtitle, .lfh-grid-footer {
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

  // --- Inject into Shadow DOM (for in-chat widgets) ---
  function injectIntoShadow() {
    var shadowHost = document.getElementById('voiceflow-chat');
    if (!shadowHost || !shadowHost.shadowRoot) {
      setTimeout(injectIntoShadow, 200);
      return;
    }

    var shadowRoot = shadowHost.shadowRoot;
    if (shadowRoot.getElementById(STYLE_ID)) return; // already injected

    var style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = css;
    shadowRoot.appendChild(style);
    console.log('[LFH] Mobile font boost injected into Shadow DOM');
  }

  // --- Inject into main DOM (for body-mounted modals) ---
  function injectIntoHead() {
    if (document.getElementById(STYLE_ID + '-main')) return; // already injected

    var style = document.createElement('style');
    style.id = STYLE_ID + '-main';
    style.textContent = css;
    document.head.appendChild(style);
    console.log('[LFH] Mobile font boost injected into document head');
  }

  injectIntoShadow();
  injectIntoHead();

})();
