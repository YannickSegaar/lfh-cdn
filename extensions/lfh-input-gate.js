/**
 * LFH Extension: Input Gate
 * Production ID: lfh-input-gate
 * Trace types: ext_inputGate
 * Origin: lfh-input-gate.js
 * Dependencies: none
 * Last modified: 2026-03-18
 *
 * Side-effect-only extension — no DOM element added to chat.
 * Hides or restores the VoiceFlow chat input and menu bar via Shadow DOM.
 * Used by the native VoiceFlow disclaimer flow to lock input during disclosure.
 *
 * Canvas usage:
 *   Custom Action: ext_inputGate, payload: { "action": "disable" }  ← hides input
 *   Custom Action: ext_inputGate, payload: { "action": "enable" }   ← restores input
 */

function getShadowRoot() {
  var host = document.getElementById('voiceflow-chat');
  return host && host.shadowRoot ? host.shadowRoot : null;
}

function disableChatInput() {
  var shadowRoot = getShadowRoot();
  if (!shadowRoot) return;
  var inputContainer = shadowRoot.querySelector('.vfrc-input-container');
  if (inputContainer) inputContainer.style.display = 'none';
  var menuBar = shadowRoot.querySelector('.lf-menu-bar');
  if (menuBar) menuBar.style.display = 'none';
}

function reEnableChatInput() {
  var shadowRoot = getShadowRoot();
  if (!shadowRoot) return;
  var inputContainer = shadowRoot.querySelector('.vfrc-input-container');
  if (inputContainer) inputContainer.style.display = '';
  var menuBar = shadowRoot.querySelector('.lf-menu-bar');
  if (menuBar) menuBar.style.display = '';
}

export const LFHInputGate = {
  name: 'LFHInputGate',
  type: 'response',

  match: ({ trace }) =>
    trace.type === 'ext_inputGate' ||
    trace.payload?.name === 'ext_inputGate',

  render: ({ trace }) => {
    var action = trace.payload && trace.payload.action;
    if (action === 'disable') {
      disableChatInput();
    } else if (action === 'enable') {
      reEnableChatInput();
    }
    // No DOM element rendered — this extension is side-effect only
  }
};

export default LFHInputGate;
