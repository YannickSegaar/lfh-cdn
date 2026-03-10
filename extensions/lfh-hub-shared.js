/**
 * Last Frontier Hub - Shared Utilities & Constants
 *
 * Re-exports data constants and provides shared helper functions
 * used across all hub tab modules. Eliminates copy-pasted helpers.
 *
 * @version 1.0.0
 * @author Last Frontier Heliskiing / RomAIx
 */

// Re-export data constants from existing modules
export { LFH_TOURS, LFH_COLORS, LFH_ASSETS, LFH_VIDEOS, getVideoEmbedUrl } from './lfh-tour-explorer-modal.js';
export { LFH_LODGES, LFH_LODGE_VIDEOS } from './lfh-lodge-compare-modal-v2-unified.js';

// ============================================================================
// SHARED HELPERS
// ============================================================================

/**
 * Silently update a VoiceFlow variable without triggering a response.
 */
export function silentVariableUpdate(name, value) {
  try {
    if (window.voiceflow?.chat) {
      window.voiceflow.chat.proactive.push({ type: 'save', payload: { [name]: value } });
    }
  } catch (e) { /* silent */ }
}

/**
 * Send an event interaction to the VoiceFlow agent.
 */
export function interactWithAgent(eventName, data) {
  try {
    window.voiceflow?.chat?.interact({
      type: 'event',
      payload: {
        event: { name: eventName },
        data: data
      }
    });
  } catch (e) { console.log('[LFH-Hub] interact error:', e); }
}

// ============================================================================
// PENDING ACTION (used by confirmation gate)
// ============================================================================

let _pendingAction = null;

/**
 * Store an action that should fire only after the user confirms closing.
 * Called by tab modules instead of interactWithAgent() for leave-modal actions.
 */
export function setPendingAction(actionData) {
  _pendingAction = actionData;
}

export function getPendingAction() {
  return _pendingAction;
}

export function clearPendingAction() {
  _pendingAction = null;
}

// ============================================================================
// HUB ACTIVITY TRACKING (sessionStorage-backed)
// ============================================================================

const HUB_ACTIVITY_KEY = 'lfh_hub_activity';
const MAX_ITEMS = 5;

function dedupPush(arr, value) {
  if (arr.indexOf(value) === -1) {
    if (arr.length >= MAX_ITEMS) arr.shift();
    arr.push(value);
  }
}

function loadActivity() {
  try {
    var raw = sessionStorage.getItem(HUB_ACTIVITY_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) { /* ignore */ }
  return { toursViewed: [], lodgesExplored: [], filtersUsed: [], highIntent: [], tabsVisited: [] };
}

function saveActivity(act) {
  try { sessionStorage.setItem(HUB_ACTIVITY_KEY, JSON.stringify(act)); } catch (e) { /* ignore */ }
}

export function getHubActivity() {
  return loadActivity();
}

export function trackHubTourViewed(name) {
  var act = loadActivity();
  dedupPush(act.toursViewed, name);
  saveActivity(act);
}

export function trackHubLodgeExplored(id) {
  var act = loadActivity();
  dedupPush(act.lodgesExplored, id);
  saveActivity(act);
}

export function trackHubFilterUsed(label) {
  var act = loadActivity();
  dedupPush(act.filtersUsed, label);
  saveActivity(act);
}

export function trackHubHighIntent(action) {
  var act = loadActivity();
  dedupPush(act.highIntent, action);
  saveActivity(act);
}

export function trackHubTabVisited(tabId) {
  var act = loadActivity();
  dedupPush(act.tabsVisited, tabId);
  saveActivity(act);
}

/**
 * Display name for a lodge ID.
 */
export function lodgeName(id) {
  if (id === 'bell2') return 'Bell 2 Lodge';
  if (id === 'ripley') return 'Ripley Creek';
  if (id === 'both') return 'Both Lodges';
  if (id === 'safari') return 'Safari';
  return id;
}

/**
 * Badge color based on which lodges a tour is available at.
 */
export function lodgeBadgeColor(lodges) {
  if (lodges.includes('both')) return '#8B6914';
  if (lodges.includes('ripley') && lodges.includes('bell2')) return '#e62b1e';
  if (lodges.includes('ripley')) return '#2E7D32';
  return '#1565C0';
}

// ============================================================================
// COMPARISON DATA (used by lodges tab)
// ============================================================================

export const COMPARISON_CATEGORIES = [
  { label: 'Capacity', bell2: '36 guests', ripley: '24 guests', icon: '●●' },
  { label: 'Location', bell2: 'Skeena Mountains', ripley: 'Stewart, BC', icon: '◉' },
  { label: 'Accommodation Style', bell2: 'Log cabin chalets', ripley: 'Heritage hotel rooms', icon: '⌂' },
  { label: 'Terrain Level', bell2: 'Intermediate to Expert', ripley: 'Advanced to Expert', icon: '⛰' },
  { label: 'Snowfall', bell2: '10-15 meters per winter.', ripley: '15-25 meters per winter.', icon: '❄' },
  { label: 'Commute to Terrain', bell2: 'Lodge departures. 5 min flights to closest runs.', ripley: 'Town departure for group 1. Groups 2 and 4 commute 15-40 min.', icon: '→' },
  { label: 'Connectivity', bell2: 'Off-grid (WiFi available)', ripley: 'Cell service + WiFi', icon: '◎' },
  { label: 'Vibe', bell2: 'Wilderness immersion', ripley: 'Town character & culture', icon: '★' },
];

// ============================================================================
// INCLUDED ITEMS (used by tours tab detail view)
// ============================================================================

export const INCLUDED_ITEMS_REGULAR = [
  'Only 3 groups of 4 guests.',
  'Double occupancy accommodation and meals.',
  'Certified mountain guide services.',
  'Ski and snowboard equipment.',
  'All safety gear — ABS airbag, radio, probe and shovel.',
  'Return ground transfers from Terrace.',
];

export const INCLUDED_ITEMS_PRIVATE = [
  'Your own private helicopter.',
  'Unlimited vertical — ski as much as you like.',
  'Two private mountain guides.',
  'Meet and greet at all airports.',
  'Private transfers.',
  'Double occupancy accommodation and meals.',
  'Ski and snowboard equipment.',
  'All safety gear — ABS airbag, radio, probe and shovel.',
];

// ============================================================================
// WEATHER CONSTANTS (used by weather tab)
// ============================================================================

export const WEATHER_URL = 'https://www.lastfrontierheli.com/heliskiing-conditions/';
export const IFRAME_TIMEOUT = 8000;
