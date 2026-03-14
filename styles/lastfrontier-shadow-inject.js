// === Last Frontier Voiceflow Styles - Shadow DOM Injection ===
// This script injects CSS directly into the Voiceflow widget's Shadow DOM
// where external stylesheets cannot reach.
//
// Usage: Add this script AFTER the Voiceflow widget embed code on your page.

(function() {
  const injectStyles = () => {
    const shadowHost = document.getElementById('voiceflow-chat');

    if (!shadowHost || !shadowHost.shadowRoot) {
      // Widget not ready yet, retry
      setTimeout(injectStyles, 100);
      return;
    }

    const shadowRoot = shadowHost.shadowRoot;

    // Remove existing style if already injected (avoid duplicates)
    const existing = shadowRoot.getElementById('lf-custom-styles');
    if (existing) existing.remove();

    // Inject Inter font into Shadow DOM (Google Fonts @font-face must be inside shadow root)
    if (!shadowRoot.getElementById('lf-inter-font')) {
      const interLink = document.createElement('link');
      interLink.id = 'lf-inter-font';
      interLink.rel = 'stylesheet';
      interLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap';
      shadowRoot.prepend(interLink);
    }

    // Create and inject the style
    const style = document.createElement('style');
    style.id = 'lf-custom-styles';
    style.textContent = `
/* ===========================================
   Last Frontier Voiceflow Styles
   Shadow DOM Injection Version
   =========================================== */

/* Fonts must be defined INSIDE Shadow DOM — external CSS can't penetrate */
@font-face {
  font-family: 'Nexa Rust Sans Black 2';
  src: url('https://yannicksegaar.github.io/lfh-cdn/fonts/NexaRustSansBlack2.woff2') format('woff2');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

/* Override VoiceFlow's .vfrc-widget * !important — needs higher specificity */
.vfrc-widget [class^="lfh-"],
.vfrc-widget [class*=" lfh-"] {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif !important;
  overflow-wrap: anywhere !important;
  background-image: none !important;
}

/* Restore extension font-weights that VoiceFlow's wildcard resets to 400 */
.vfrc-widget .lfh-grid-card-title {
  font-weight: 700 !important;
}
.vfrc-widget .lfh-grid-card-subtitle {
  font-weight: 400 !important;
}
.vfrc-widget .lfh-grid-card-cta {
  font-weight: 600 !important;
}
.vfrc-widget .lfh-grid-footer {
  font-weight: 500 !important;
}

/* Header title - 15px font size, no truncation */
.vfrc-header--title,
[class*="vfrc-header"] [class*="title"] {
  font-family: 'Nexa Rust Sans Black 2', sans-serif !important;

  /* Prevent truncation */
  white-space: normal !important;
  overflow: visible !important;
  text-overflow: clip !important;

  /* Header title font size */
  font-size: 15px !important;
  line-height: 1.3 !important;

  /* Word wrapping for long text */
  word-wrap: break-word !important;
  overflow-wrap: break-word !important;
}

/* Assistant info title - 20px font size, no truncation */
.vfrc-assistant-info--title,
[class*="assistant-info"] [class*="title"] {
  font-family: 'Nexa Rust Sans Black 2', sans-serif !important;

  /* Prevent truncation */
  white-space: normal !important;
  overflow: visible !important;
  text-overflow: clip !important;

  /* Assistant info title font size */
  font-size: 20px !important;
  line-height: 1.3 !important;

  /* Word wrapping for long text */
  word-wrap: break-word !important;
  overflow-wrap: break-word !important;
}

/* Apply Nexa Rust Sans Black 2 to launcher widget text */
.vfrc-launcher,
.vfrc-launcher * {
  font-family: 'Nexa Rust Sans Black 2', sans-serif !important;
}

/* Apply Nexa Rust Sans Black 2 to "Start new chat" button */
.vfrc-prompt button,
.vfrc-prompt-button,
[class*="prompt"] button,
[class*="start-new"] button,
.vfrc-footer__start-button,
.vfrc-confirm button,
.vfrc-confirmation button,
[class*="confirmation"] button:first-child,
.vfrc-widget button[class*="primary"],
.vfrc-modal button[class*="primary"] {
  font-family: 'Nexa Rust Sans Black 2', sans-serif !important;
}

/* Background image on main chat container ONLY */
.vfrc-chat {
  background-image: url('https://yannicksegaar.github.io/lfh-cdn/images/LFH_chatinterface_background_map.jpg') !important;
  background-size: cover !important;
  background-position: center !important;
  background-repeat: no-repeat !important;
}

/* Reset background for all inner elements */
.vfrc-chat * {
  background-image: none;
}

/* Rugged edge pattern on header bottom */
.vfrc-header {
  position: relative !important;
  overflow: visible !important;
  z-index: 1 !important;
}

.vfrc-header::after {
  content: '' !important;
  position: absolute !important;
  left: 0 !important;
  right: 0 !important;
  bottom: -18px !important;
  height: 20px !important;
  background-image: url('https://www.lastfrontierheli.com/wp-content/themes/lastfrontier/dist/images/top-section-pattern.png') !important;
  background-size: 100% 100% !important;
  background-repeat: no-repeat !important;
  pointer-events: none !important;
  z-index: 10 !important;
  transform: scaleY(-1) !important;
}

/* Transparent footer */
.vfrc-footer,
[class*="vfrc-footer"] {
  background: transparent !important;
  background-color: transparent !important;
  background-image: none !important;
}

/* Fix send button area - ensure clean background */
.vfrc-footer button,
.vfrc-footer [class*="button"],
[class*="vfrc-footer"] button,
[class*="vfrc-footer"] [class*="button"] {
  background-image: none !important;
}

/* Hide default three-dot typing indicator (replaced by WaitingAnimation extension) */
.vfrc-system-response--indicator {
  display: none !important;
}

/* === Extension rendering overrides ===
   Required for WaitingAnimation and other custom extensions
   to render without extra padding/chrome from the widget shell */

/* Strip padding from all extension message wrappers */
[class^="vfrc-message--extension-"],
[class*=" vfrc-message--extension-"] {
  padding: 0px !important;
}

/* Hide avatar next to extension messages (spinner replaces it) */
.vfrc-system-response .vfrc-avatar {
  display: none;
}

/* Hide timestamps on extension messages */
.vfrc-timestamp {
  display: none;
}

/* Tighten system response action buttons (carousel/choice chips) */
.vfrc-system-response--actions {
  padding-left: 20px !important;
  padding-right: 10px !important;
  margin-left: 0px !important;
  margin-right: 0px !important;
  flex-direction: row !important;
  gap: 8px !important;
  display: flex !important;
  flex-wrap: wrap !important;
}

/* === Help tooltip below header (assistant info area) === */
.lf-help-tooltip {
  display: flex;
  justify-content: center;
  margin-top: 10px;
  position: relative;
}

.lf-help-circle {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: none;
  background: linear-gradient(180deg, #ee2e24, #CC3333);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
  font-family: 'Nexa Rust Sans Black 2', system-ui, sans-serif;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  line-height: 1;
  transition: filter 0.2s, box-shadow 0.2s;
  box-shadow: 0 2px 6px rgba(204, 51, 51, 0.3);
}

.lf-help-circle:hover {
  filter: brightness(1.1);
  box-shadow: 0 3px 10px rgba(204, 51, 51, 0.45);
}

.lf-help-balloon {
  position: absolute;
  top: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%) translateY(-4px);
  width: 220px;
  background: #F5F5F5;
  color: #42494e;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 14px 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s, transform 0.2s, visibility 0.2s;
  pointer-events: none;
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 12.5px;
  line-height: 1.6;
  z-index: 100;
  text-align: left;
}

.lf-help-balloon::before {
  content: '';
  position: absolute;
  top: -6px;
  left: 50%;
  margin-left: -6px;
  width: 11px;
  height: 11px;
  background: #F5F5F5;
  border-top: 1px solid #ddd;
  border-left: 1px solid #ddd;
  transform: rotate(45deg);
}

.lf-help-tooltip:hover .lf-help-balloon {
  opacity: 1;
  visibility: visible;
  transform: translateX(-50%) translateY(0);
  pointer-events: auto;
}

.lf-help-balloon strong {
  display: block;
  margin-bottom: 8px;
  padding-bottom: 5px;
  border-bottom: 1px solid #e0e0e0;
  font-family: 'Nexa Rust Sans Black 2', system-ui, sans-serif;
  font-size: 12px;
  color: #CC3333;
  letter-spacing: 0.3px;
}

.lf-help-balloon ul {
  margin: 0;
  padding: 0 0 0 16px;
  list-style: none;
}

.lf-help-balloon li {
  margin-bottom: 4px;
  color: #42494e;
  padding-left: 2px;
}

.lf-help-balloon li::before {
  content: '\\2022';
  color: #CC3333;
  font-weight: 700;
  display: inline-block;
  width: 14px;
  margin-left: -14px;
}
    `;

    shadowRoot.appendChild(style);

    // Inject help tooltip below header (assistant info area)
    if (!shadowRoot.querySelector('.lf-help-tooltip')) {
      const assistantInfo = shadowRoot.querySelector('.vfrc-assistant-info') || shadowRoot.querySelector('[class*="assistant-info"]');
      if (assistantInfo) {
        const wrap = document.createElement('div');
        wrap.className = 'lf-help-tooltip';
        wrap.innerHTML = `
          <button class="lf-help-circle" aria-label="Help" type="button">?</button>
          <div class="lf-help-balloon">
            <strong>I can help with:</strong>
            <ul>
              <li>Tours &amp; pricing</li>
              <li>Our two lodges</li>
              <li>Safety &amp; equipment</li>
              <li>Getting here</li>
              <li>Booking questions</li>
            </ul>
          </div>
        `;
        assistantInfo.appendChild(wrap);
      }
    }

    console.log('✅ Last Frontier custom styles injected into Shadow DOM');
  };

  // Start injection when ready
  if (document.readyState === 'complete') {
    injectStyles();
  } else {
    window.addEventListener('load', injectStyles);
  }
})();
