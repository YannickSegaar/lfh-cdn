/**
 * LFH Extension: AI Disclaimer Modal
 * Production ID: lfh-disclaimer
 * Trace types: ext_aiDisclaimer
 * Origin: lfh-disclaimer.js
 * Dependencies: none
 * Last modified: 2026-03-12
 *
 * Blocking modal shown to first-time visitors. Branded overlay disclosing
 * the AI nature of the assistant. Sets localStorage flag on acceptance.
 * Blocks chat input until accepted. No auto-dismiss.
 */

export const LFHDisclaimerModal = {
  name: 'LFHDisclaimerModal',
  type: 'response',

  match: ({ trace }) =>
    trace.type === 'ext_aiDisclaimer' ||
    trace.payload?.name === 'ext_aiDisclaimer',

  render: ({ trace, element }) => {
    // Safety net: if already accepted, skip rendering
    var alreadyAccepted = false;
    try { alreadyAccepted = localStorage.getItem('lfh_ai_disclaimer_accepted') === 'true'; } catch (e) {}

    if (alreadyAccepted) {
      window.voiceflow.chat.interact({
        type: 'complete',
        payload: { disclaimer_accepted: true, timestamp: new Date().toISOString() }
      });
      return;
    }

    var CDN = 'https://yannicksegaar.github.io/lfh-cdn';

    // Create overlay container
    var overlay = document.createElement('div');
    overlay.className = 'lfh-disclaimer-overlay';

    overlay.innerHTML = `
      <style>
        .lfh-disclaimer-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 99999;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: lfhDisclaimerFadeIn 0.3s ease-out;
          padding: 16px;
        }

        @keyframes lfhDisclaimerFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .lfh-disclaimer-backdrop {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
        }

        .lfh-disclaimer-card {
          position: relative;
          max-width: 500px;
          width: 100%;
          background-image: url('${CDN}/images/LFH_bg_content_and_image_black.png');
          background-size: cover;
          background-position: center;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
        }

        .lfh-disclaimer-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.55);
          pointer-events: none;
        }

        .lfh-disclaimer-content {
          position: relative;
          padding: 32px 24px 28px;
          text-align: center;
        }

        .lfh-disclaimer-logo {
          width: 200px;
          margin: 0 auto 24px;
          display: block;
        }

        .lfh-disclaimer-title {
          font-family: 'Nexa Rust Sans Black 2', sans-serif;
          color: #FFFFFF;
          font-size: 20px;
          line-height: 1.3;
          margin-bottom: 16px;
        }

        .lfh-disclaimer-body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          color: rgba(255, 255, 255, 0.9);
          font-size: 15px;
          line-height: 1.6;
          margin-bottom: 28px;
        }

        .lfh-disclaimer-btn {
          display: inline-block;
          background: #e62b1e;
          color: #FFFFFF;
          font-family: 'Nexa Rust Sans Black 2', sans-serif;
          font-size: 15px;
          padding: 12px 36px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.2s, transform 0.1s;
          width: 100%;
          max-width: 280px;
        }

        .lfh-disclaimer-btn:hover {
          background: #cc2419;
        }

        .lfh-disclaimer-btn:active {
          transform: scale(0.98);
        }

        .lfh-disclaimer-privacy {
          display: inline-block;
          margin-top: 14px;
          color: rgba(255, 255, 255, 0.7);
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          font-size: 13px;
          text-decoration: underline;
          text-underline-offset: 2px;
          cursor: pointer;
          transition: color 0.2s;
        }

        .lfh-disclaimer-privacy:hover {
          color: #FFFFFF;
        }

        @media (max-width: 450px) {
          .lfh-disclaimer-content {
            padding: 28px 20px 24px;
          }

          .lfh-disclaimer-logo {
            width: 160px;
            margin-bottom: 20px;
          }

          .lfh-disclaimer-title {
            font-size: 18px;
          }

          .lfh-disclaimer-body {
            font-size: 14px;
          }

          .lfh-disclaimer-btn {
            font-size: 14px;
            padding: 11px 28px;
          }
        }
      </style>

      <div class="lfh-disclaimer-backdrop"></div>
      <div class="lfh-disclaimer-card">
        <div class="lfh-disclaimer-content">
          <img class="lfh-disclaimer-logo"
               src="${CDN}/images/LFH_Logo_FullName_White.svg"
               alt="Last Frontier Heliskiing" />
          <div class="lfh-disclaimer-title">You're Talking to an AI Agent</div>
          <div class="lfh-disclaimer-body">
            Hi there! I'm the new AI agent for Last Frontier Heliskiing. I'm still learning, but I've been through a rigorous training regime from my human colleagues. You'll find my knowledge runs deep — but if there's a piece of info that's critical, then it's wise to double-check it with our team.
          </div>
          <button class="lfh-disclaimer-btn" id="lfh-disclaimer-accept">I Understand</button>
          <br>
          <a class="lfh-disclaimer-privacy"
             href="https://www.lastfrontierheli.com/privacy-policy/"
             target="_blank"
             rel="noopener noreferrer">Privacy Policy</a>
        </div>
      </div>
    `;

    // Hide initially, show after 2s delay so it doesn't pop up too fast
    overlay.style.display = 'none';
    element.appendChild(overlay);
    setTimeout(function() {
      overlay.style.display = '';
      disableChatInput();
    }, 2000);

    // Disable chat input while disclaimer is active (same pattern as lead form)
    function getShadowRoot() {
      var host = document.getElementById('voiceflow-chat');
      return host && host.shadowRoot ? host.shadowRoot : null;
    }

    function disableChatInput() {
      var shadowRoot = getShadowRoot();
      if (!shadowRoot) return;
      var inputContainer = shadowRoot.querySelector('.vfrc-input-container');
      if (inputContainer) inputContainer.style.display = 'none';
    }

    function reEnableChatInput() {
      var shadowRoot = getShadowRoot();
      if (!shadowRoot) return;
      var inputContainer = shadowRoot.querySelector('.vfrc-input-container');
      if (inputContainer) inputContainer.style.display = '';
    }

    // Accept handler
    function accept() {
      try { localStorage.setItem('lfh_ai_disclaimer_accepted', 'true'); } catch (e) {}
      reEnableChatInput();
      overlay.style.opacity = '0';
      overlay.style.transition = 'opacity 0.2s ease-out';
      setTimeout(function() {
        overlay.remove();
      }, 200);
      window.voiceflow.chat.interact({
        type: 'complete',
        payload: { disclaimer_accepted: true, timestamp: new Date().toISOString() }
      });
    }

    overlay.querySelector('#lfh-disclaimer-accept').addEventListener('click', accept);
  }
};

export default LFHDisclaimerModal;
