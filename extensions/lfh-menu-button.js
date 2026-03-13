/**
 * LFH Extension: Main Menu Button
 * Production ID: lfh-menu-button
 * Origin: lfh-menu-button.js
 * Dependencies: none
 * Last modified: 2026-03-13
 *
 * Persistent menu button injected into Shadow DOM footer.
 * Confirmation is handled entirely client-side — VoiceFlow only receives
 * an interact() call when the user explicitly confirms an action.
 * This prevents interrupting the AI Agent's internal loop on cancel.
 *
 * Easy removal: delete this file + remove import/registration from loader.js
 */

// ============================================================================
// MENU OPTIONS
// ============================================================================

var MENU_OPTIONS = [
  {
    id: 'explore_tours',
    label: 'Explore Tours',
    description: 'Browse packages & pricing',
    target: 'ext_hubModal',
    tab: 'tours',
    icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 21l4-10 4 10"/><path d="M2 21l6-14 4 8"/><path d="M14 15l4-8 4 14"/></svg>'
  },
  {
    id: 'compare_lodges',
    label: 'Compare Lodges',
    description: 'Bell 2 vs Ripley Creek',
    target: 'ext_hubModal',
    tab: 'lodges',
    icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21V10l9-7 9 7v11"/><path d="M9 21V14h6v7"/><path d="M3 21h18"/></svg>'
  },
  {
    id: 'weather_conditions',
    label: 'Weather',
    description: 'Current snow & forecasts',
    target: 'ext_hubModal',
    tab: 'weather',
    icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12h2m4-7l1 1m7-1l-1 1M12 3v2m5 3a5 5 0 0 0-10 0 4 4 0 1 0 0 8h10a3 3 0 1 0-1-5.8"/></svg>'
  },
  {
    id: 'help_center',
    label: 'Help Center',
    description: 'FAQs, videos & resources',
    target: 'ext_browserSelfService_v4',
    tab: '',
    icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>'
  },
  {
    id: 'contact_us',
    label: 'Contact Us',
    description: 'Get in touch with our team',
    target: 'ext_lastFrontierLeadForm_v4',
    tab: '',
    icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>'
  }
];

// ============================================================================
// STYLES
// ============================================================================

var MENU_STYLES = `
/* ── Menu Toolbar Strip ──
   Sits between chat dialog and input footer.
   Semi-transparent bar that blends with the map background. */

.lf-menu-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px 20px;
  position: relative;
  z-index: 10;
}

/* ── Menu Trigger Button ──
   Subtle pill inside the toolbar strip.
   Matches VoiceFlow's input container aesthetic. */

.lf-menu-trigger {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px 6px 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.88);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  color: #656d75;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.2px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  -webkit-tap-highlight-color: transparent;
  line-height: 1;
}

.lf-menu-trigger:hover {
  background: rgba(255, 255, 255, 0.95);
  border-color: rgba(0, 0, 0, 0.15);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  color: #42494e;
}

.lf-menu-trigger:active {
  transform: scale(0.97);
}

.lf-menu-trigger.lf-menu-active {
  background: #fff;
  border-color: rgba(204, 51, 51, 0.25);
  color: #cc3333;
  box-shadow: 0 2px 8px rgba(204, 51, 51, 0.1);
}

.lf-menu-trigger svg {
  flex-shrink: 0;
  transition: transform 0.2s ease;
}

.lf-menu-trigger.lf-menu-active svg {
  transform: rotate(180deg);
}

/* ── Drop-up Panel ──
   Matches VoiceFlow's card styling: white, subtle shadow, rounded. */

.lf-menu-panel {
  position: absolute;
  bottom: calc(100% + 4px);
  left: 50%;
  transform: translateX(-50%) translateY(6px);
  width: 260px;
  background: #fff;
  border-radius: 16px;
  border: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 8px 42px -16px rgba(0, 0, 0, 0.18), 0 3px 4px rgba(0, 0, 0, 0.03);
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s ease, transform 0.2s ease, visibility 0.2s;
  pointer-events: none;
  overflow: hidden;
  z-index: 100;
}

.lf-menu-panel.lf-menu-visible {
  opacity: 1;
  visibility: visible;
  transform: translateX(-50%) translateY(0);
  pointer-events: auto;
}

/* ── Panel Header ── */
.lf-menu-header {
  padding: 14px 16px 10px;
  font-family: 'Nexa Rust Sans Black 2', system-ui, -apple-system, sans-serif;
  font-size: 10px;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  color: #aaa;
}

/* ── Option Items ── */
.lf-menu-option {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 11px 16px;
  cursor: pointer;
  transition: background 0.15s ease;
  border: none;
  background: none;
  width: 100%;
  text-align: left;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  -webkit-tap-highlight-color: transparent;
}

.lf-menu-option:hover {
  background: #fafafa;
}

.lf-menu-option:active {
  background: #f5f5f5;
}

.lf-menu-option:last-child {
  padding-bottom: 14px;
}

.lf-menu-option-icon {
  flex-shrink: 0;
  width: 34px;
  height: 34px;
  border-radius: 10px;
  background: #FEF2F2;
  color: #cc3333;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s, color 0.15s;
}

.lf-menu-option:hover .lf-menu-option-icon {
  background: #cc3333;
  color: #fff;
}

.lf-menu-option-text {
  flex: 1;
  min-width: 0;
}

.lf-menu-option-label {
  font-size: 13.5px;
  font-weight: 600;
  color: #42494e;
  line-height: 1.3;
}

.lf-menu-option-desc {
  font-size: 11.5px;
  color: #999;
  line-height: 1.3;
  margin-top: 1px;
}

/* ── Mobile ── */
@media (max-width: 480px) {
  .lf-menu-bar {
    padding: 4px 16px;
  }

  .lf-menu-trigger {
    font-size: 11px;
    padding: 5px 12px 5px 8px;
  }

  .lf-menu-panel {
    width: calc(100vw - 48px);
    max-width: 280px;
  }
}

/* ── Confirmation State (inside panel) ── */
.lf-menu-confirm-inline {
  padding: 16px;
}

.lf-menu-confirm-prompt {
  font-size: 14px;
  color: #42494e;
  margin-bottom: 14px;
  line-height: 1.5;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

.lf-menu-confirm-prompt strong {
  color: #333;
}

.lf-menu-confirm-buttons {
  display: flex;
  gap: 8px;
}

.lf-menu-confirm-yes {
  flex: 1;
  padding: 9px 16px;
  border: none;
  border-radius: 10px;
  background: #cc3333;
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s, transform 0.1s;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  -webkit-tap-highlight-color: transparent;
}

.lf-menu-confirm-yes:hover {
  background: #b32d2d;
}

.lf-menu-confirm-yes:active {
  transform: scale(0.97);
}

.lf-menu-confirm-cancel {
  flex: 1;
  padding: 9px 16px;
  border: 1px solid #e2e4e5;
  border-radius: 10px;
  background: #fff;
  color: #656d75;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  -webkit-tap-highlight-color: transparent;
}

.lf-menu-confirm-cancel:hover {
  border-color: #ccc;
  color: #42494e;
}
`;

// Chevron-down icon for the trigger button
var CHEVRON_ICON = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>';

// ============================================================================
// PERSISTENT BUTTON (module side effect)
// ============================================================================

function initMenuButton() {
  var isOpen = false;
  var debounceTimer = null;
  var panelRef = null;       // reference to panel element for state swaps
  var optionsHTML = '';       // cached options list HTML for restoring after cancel

  function tryInject() {
    var shadowHost = document.getElementById('voiceflow-chat');
    if (!shadowHost || !shadowHost.shadowRoot) {
      setTimeout(tryInject, 300);
      return;
    }

    var shadowRoot = shadowHost.shadowRoot;
    var footer = shadowRoot.querySelector('.vfrc-footer');
    if (!footer) {
      setTimeout(tryInject, 300);
      return;
    }

    // Already injected
    if (shadowRoot.querySelector('.lf-menu-bar')) return;

    // Inject styles
    if (!shadowRoot.getElementById('lf-menu-styles')) {
      var styleEl = document.createElement('style');
      styleEl.id = 'lf-menu-styles';
      styleEl.textContent = MENU_STYLES;
      shadowRoot.appendChild(styleEl);
    }

    // Build toolbar bar
    var bar = document.createElement('div');
    bar.className = 'lf-menu-bar';

    // Trigger button (pill)
    var trigger = document.createElement('button');
    trigger.className = 'lf-menu-trigger';
    trigger.setAttribute('type', 'button');
    trigger.setAttribute('aria-label', 'Quick access menu');
    trigger.innerHTML = CHEVRON_ICON + '<span>Menu</span>';

    // Panel
    var panel = document.createElement('div');
    panel.className = 'lf-menu-panel';
    panel.setAttribute('role', 'menu');
    panelRef = panel;

    buildOptionsList(panel, trigger);

    // Cache the options HTML for restoring after cancel
    optionsHTML = panel.innerHTML;

    bar.appendChild(panel);
    bar.appendChild(trigger);

    // Insert as sibling before footer (inside the flex column)
    footer.parentNode.insertBefore(bar, footer);

    // Toggle menu
    trigger.addEventListener('click', function(e) {
      e.stopPropagation();
      if (debounceTimer) return;
      debounceTimer = setTimeout(function() { debounceTimer = null; }, 250);
      toggleMenu(trigger, panel);
    });

    // Close on click outside (within shadow DOM)
    shadowRoot.addEventListener('click', function(e) {
      if (isOpen && !bar.contains(e.target)) {
        resetToOptions(panel, trigger);
        closeMenu(trigger, panel);
      }
    });

    // Close on ESC
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && isOpen) {
        resetToOptions(panel, trigger);
        closeMenu(trigger, panel);
      }
    });

    // Close on input focus (mobile keyboard appearing)
    var textarea = shadowRoot.querySelector('.vfrc-chat-input');
    if (textarea) {
      textarea.addEventListener('focus', function() {
        if (isOpen) {
          resetToOptions(panel, trigger);
          closeMenu(trigger, panel);
        }
      });
    }

    console.log('[LFH] Menu button injected');
  }

  function buildOptionsList(panel, trigger) {
    panel.innerHTML = '';

    var header = document.createElement('div');
    header.className = 'lf-menu-header';
    header.textContent = 'Quick Access';
    panel.appendChild(header);

    MENU_OPTIONS.forEach(function(opt) {
      var optBtn = document.createElement('button');
      optBtn.className = 'lf-menu-option';
      optBtn.setAttribute('type', 'button');
      optBtn.setAttribute('role', 'menuitem');
      optBtn.innerHTML =
        '<div class="lf-menu-option-icon">' + opt.icon + '</div>' +
        '<div class="lf-menu-option-text">' +
          '<div class="lf-menu-option-label">' + opt.label + '</div>' +
          '<div class="lf-menu-option-desc">' + opt.description + '</div>' +
        '</div>';

      optBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        showConfirmation(opt, panel, trigger);
      });

      panel.appendChild(optBtn);
    });
  }

  function showConfirmation(opt, panel, trigger) {
    // Replace panel contents with confirmation UI
    panel.innerHTML =
      '<div class="lf-menu-confirm-inline">' +
        '<div class="lf-menu-confirm-prompt">Open <strong>' + opt.label + '</strong>?</div>' +
        '<div class="lf-menu-confirm-buttons">' +
          '<button class="lf-menu-confirm-yes" type="button">Yes, show me</button>' +
          '<button class="lf-menu-confirm-cancel" type="button">Cancel</button>' +
        '</div>' +
      '</div>';

    // Yes — fire interact() and close menu
    panel.querySelector('.lf-menu-confirm-yes').addEventListener('click', function(e) {
      e.stopPropagation();
      closeMenu(trigger, panel);

      // Small delay so the menu visually closes before VoiceFlow processes
      setTimeout(function() {
        resetToOptions(panel, trigger);
        fireMenuAction(opt);
      }, 150);
    });

    // Cancel — return to options list, no VoiceFlow interaction
    panel.querySelector('.lf-menu-confirm-cancel').addEventListener('click', function(e) {
      e.stopPropagation();
      resetToOptions(panel, trigger);
    });
  }

  function resetToOptions(panel, trigger) {
    buildOptionsList(panel, trigger);
  }

  function fireMenuAction(opt) {
    try {
      window.voiceflow.chat.interact({
        type: 'event',
        payload: {
          event: { name: 'ext_menu_action' },
          data: {
            action: 'menu_select',
            source: 'main_menu',
            option: opt.id,
            option_label: opt.label,
            target_extension: opt.target,
            target_tab: opt.tab
          }
        }
      });
      console.log('[LFH] Menu action fired:', opt.id);
    } catch (e) {
      console.error('[LFH] Menu event failed:', e);
    }
  }

  function toggleMenu(trigger, panel) {
    if (isOpen) {
      closeMenu(trigger, panel);
    } else {
      openMenu(trigger, panel);
    }
  }

  function openMenu(trigger, panel) {
    isOpen = true;
    trigger.classList.add('lf-menu-active');
    panel.classList.add('lf-menu-visible');
  }

  function closeMenu(trigger, panel) {
    isOpen = false;
    trigger.classList.remove('lf-menu-active');
    panel.classList.remove('lf-menu-visible');
  }

  // Watch for DOM rebuilds (VoiceFlow new session destroys + recreates DOM)
  var observer = new MutationObserver(function() {
    var shadowHost = document.getElementById('voiceflow-chat');
    if (shadowHost && shadowHost.shadowRoot) {
      if (!shadowHost.shadowRoot.querySelector('.lf-menu-bar')) {
        isOpen = false;
        panelRef = null;
        tryInject();
      }
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });

  // Start injection
  tryInject();
}

// Auto-run on import
initMenuButton();

// ============================================================================
// EXPORT (no extension registration needed — this is purely a DOM injection)
// ============================================================================

export default {};
