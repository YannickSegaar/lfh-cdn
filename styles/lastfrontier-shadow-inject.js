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
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 5px !important;
  height: 32px !important;
  background: #E62B1E !important;
  background-image: none !important;
  color: #fff !important;
  font-size: 12px !important;
  letter-spacing: 0.2px !important;
  transition: background 0.2s !important;
  cursor: pointer !important;
}
.vfrc-widget .lfh-grid-footer {
  font-weight: 500 !important;
}

/* ===== SELF-SERVICE EXTENSION OVERRIDES ===== */

/* Header title — "DISCOVER HELISKIING" */
.vfrc-widget .lfh-ss-v4-header-label {
  font-family: 'Nexa Rust Sans Black 2', 'Inter', sans-serif !important;
  font-size: 20px !important;
  font-weight: 900 !important;
  color: #FFFFFF !important;
  text-transform: uppercase !important;
  letter-spacing: 3px !important;
  margin: 0 0 8px 0 !important;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.5) !important;
}

/* Header description — "Explore our videos, FAQs, and resources" */
.vfrc-widget .lfh-ss-v4-header-description {
  font-family: 'Inter', sans-serif !important;
  font-size: 12px !important;
  font-weight: 400 !important;
  color: #FFFFFF !important;
  line-height: 1.5 !important;
  opacity: 0.95 !important;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4) !important;
  max-width: 90% !important;
  margin-left: auto !important;
  margin-right: auto !important;
}

/* Tab names — "VIDEOS", "FAQ", "RESOURCES" */
.vfrc-widget .lfh-ss-v4-tab {
  font-family: 'Inter', sans-serif !important;
  font-size: 11px !important;
  font-weight: 700 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.5px !important;
  padding: 12px 8px !important;
  border-bottom: 3px solid transparent !important;
  cursor: pointer !important;
}
.vfrc-widget .lfh-ss-v4-tab.active {
  color: #e62b1e !important;
  border-bottom-color: #e62b1e !important;
  background: #FFFFFF !important;
}

/* Dig deeper title — "DIG DEEPER WITH OUR BACKGROUNDER VIDEOS" */
.vfrc-widget .lfh-ss-v4-dig-deeper-title {
  font-family: 'Nexa Rust Sans Black 2', 'Inter', sans-serif !important;
  font-size: 14px !important;
  font-weight: 900 !important;
  color: #42494e !important;
  text-transform: uppercase !important;
  letter-spacing: 2px !important;
  margin: 0 0 6px 0 !important;
}

/* Dig deeper subtitle — "Discover more about who we are..." */
.vfrc-widget .lfh-ss-v4-dig-deeper-subtitle {
  font-family: 'Inter', sans-serif !important;
  font-size: 11px !important;
  font-weight: 400 !important;
  color: #666666 !important;
  line-height: 1.5 !important;
  max-width: 90% !important;
  margin-left: auto !important;
  margin-right: auto !important;
}

/* Video episode label — "EPISODE 1" */
.vfrc-widget .lfh-ss-v4-video-episode {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif !important;
  font-size: 9px !important;
  font-weight: 600 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.5px !important;
  color: #fff !important;
  opacity: 0.85 !important;
  margin: 0 0 2px 0 !important;
}

/* Video title — "LOCATION", "LODGING", etc. */
.vfrc-widget .lfh-ss-v4-video-title {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif !important;
  font-size: 12px !important;
  font-weight: 700 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.3px !important;
  color: #fff !important;
  margin: 0 !important;
}

/* FAQ question text — "How good do I have to be?" */
.vfrc-widget button.lfh-ss-v4-faq-question,
.vfrc-widget button.lfh-ss-v4-faq-question span,
.vfrc-widget .lfh-ss-v4-faq-question,
.vfrc-widget .lfh-ss-v4-faq-question span {
  font-family: 'Inter', sans-serif !important;
  font-size: 13px !important;
  font-weight: 600 !important;
  color: #42494e !important;
  text-align: left !important;
  cursor: pointer !important;
}

/* FAQ arrow icon */
.vfrc-widget .lfh-ss-v4-faq-icon {
  font-size: 16px !important;
  font-weight: 700 !important;
  color: #e62b1e !important;
  flex-shrink: 0 !important;
  margin-left: 10px !important;
}

/* Resource title — "FAQ for First-Timers", "Is Heliskiing For Me?" */
.vfrc-widget .lfh-ss-v4-resource-title {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif !important;
  font-size: 13px !important;
  font-weight: 600 !important;
  color: #42494e !important;
  margin: 0 0 2px 0 !important;
}

/* Resource description — "Comprehensive answers to common questions" */
.vfrc-widget .lfh-ss-v4-resource-desc {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif !important;
  font-size: 11px !important;
  font-weight: 400 !important;
  color: #666666 !important;
  margin: 0 !important;
}

/* Resource arrow */
.vfrc-widget .lfh-ss-v4-resource-arrow {
  color: #e62b1e !important;
  font-size: 16px !important;
  flex-shrink: 0 !important;
}

/* Footer text — "Still have questions? Just ask!" */
.vfrc-widget .lfh-ss-v4-footer-text {
  font-family: 'Inter', sans-serif !important;
  font-size: 12px !important;
  color: #666666 !important;
  margin: 0 !important;
}
.vfrc-widget .lfh-ss-v4-footer-text strong {
  font-weight: 700 !important;
  color: #42494e !important;
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

/* Assistant info avatar — circular, no red border, subtle shadow */
.vfrc-widget .vfrc-assistant-info--avatar-container {
  border: none !important;
  outline: none !important;
}
.vfrc-widget img.vfrc-avatar,
.vfrc-widget .vfrc-assistant-info--avatar-container img {
  border: none !important;
  border-radius: 50% !important;
  width: 72px !important;
  height: 72px !important;
  background-color: #fff !important;
  box-shadow: 0 0 0 1px #161a1e0f, 0 1px 1px #161a1e03, 0 4px 8px -18px #161a1e0a, 0 8px 12px -18px #161a1e0a, 0 10px 16px -18px #161a1e14, 0 12px 20px -18px #161a1e14, 0 16px 28px -18px #161a1e1f, 0 20px 44px -18px #161a1e1f !important;
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

/* Reset background for all inner elements (except LFH extension elements that use bg images) */
.vfrc-chat *:not([class^="lfh-"]):not([class*=" lfh-"]) {
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
.vfrc-widget .lf-help-tooltip {
  display: flex !important;
  justify-content: center !important;
  margin-top: 10px !important;
  position: relative !important;
}

.vfrc-widget .lf-help-circle {
  width: 24px !important;
  height: 24px !important;
  border-radius: 50% !important;
  border: none !important;
  background: linear-gradient(180deg, #ee2e24, #CC3333) !important;
  color: #fff !important;
  font-size: 13px !important;
  font-weight: 700 !important;
  font-family: 'Nexa Rust Sans Black 2', system-ui, sans-serif !important;
  cursor: pointer !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  padding: 0 !important;
  line-height: 1 !important;
  transition: filter 0.2s, box-shadow 0.2s !important;
  box-shadow: 0 2px 6px rgba(204, 51, 51, 0.3) !important;
}

.vfrc-widget .lf-help-circle:hover {
  filter: brightness(1.1) !important;
  box-shadow: 0 3px 10px rgba(204, 51, 51, 0.45) !important;
}

.vfrc-widget .lf-help-balloon {
  position: absolute !important;
  top: calc(100% + 10px) !important;
  left: 50% !important;
  transform: translateX(-50%) translateY(-4px) !important;
  width: 220px !important;
  background: #F5F5F5 !important;
  color: #42494e !important;
  border: 1px solid #ddd !important;
  border-radius: 6px !important;
  padding: 14px 16px !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important;
  opacity: 0 !important;
  visibility: hidden !important;
  transition: opacity 0.2s, transform 0.2s, visibility 0.2s !important;
  pointer-events: none !important;
  font-family: system-ui, -apple-system, sans-serif !important;
  font-size: 12.5px !important;
  line-height: 1.6 !important;
  z-index: 100 !important;
  text-align: left !important;
}

.vfrc-widget .lf-help-balloon::before {
  content: '' !important;
  position: absolute !important;
  top: -6px !important;
  left: 50% !important;
  margin-left: -6px !important;
  width: 11px !important;
  height: 11px !important;
  background: #F5F5F5 !important;
  border-top: 1px solid #ddd !important;
  border-left: 1px solid #ddd !important;
  transform: rotate(45deg) !important;
}

.vfrc-widget .lf-help-tooltip:hover .lf-help-balloon {
  opacity: 1 !important;
  visibility: visible !important;
  transform: translateX(-50%) translateY(0) !important;
  pointer-events: auto !important;
}

.vfrc-widget .lf-help-balloon strong {
  display: block !important;
  margin-bottom: 8px !important;
  padding-bottom: 5px !important;
  border-bottom: 1px solid #e0e0e0 !important;
  font-family: 'Nexa Rust Sans Black 2', system-ui, sans-serif !important;
  font-size: 12px !important;
  font-weight: 700 !important;
  color: #CC3333 !important;
  letter-spacing: 0.3px !important;
}

.vfrc-widget .lf-help-balloon ul {
  margin: 0 !important;
  padding: 0 0 0 16px !important;
  list-style: none !important;
}

.vfrc-widget .lf-help-balloon li {
  margin-bottom: 4px !important;
  color: #42494e !important;
  padding-left: 2px !important;
}

.vfrc-widget .lf-help-balloon li::before {
  content: '\\2022' !important;
  color: #CC3333 !important;
  font-weight: 700 !important;
  display: inline-block !important;
  width: 14px !important;
  margin-left: -14px !important;
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
