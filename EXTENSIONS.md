# LFH Extension Registry

> Single source of truth for the Last Frontier Heliskiing CDN extension system.
> Updated: 2026-03-10 | Version: 1.1.0

## How Extensions Work

VoiceFlow canvas fires trace types → `loader.js` registers extensions →
extension `match` function checks trace type → `render` function builds UI.

Extensions follow the VoiceFlow pattern: `{ name, type: 'response', match({trace}), render({trace, element}) }`.

Modals are opened programmatically by other extensions (not registered with VoiceFlow directly).

## Active Extensions

### Exit-Triggered (fired by AI agent exit conditions)

| File | Trace Types | Opens Modal | Purpose |
|------|------------|-------------|---------|
| `lfh-lead-form.js` | `ext_lastFrontierLeadForm_v4`, `_unified` | — | Contact / booking inquiry form |
| `lfh-tours-grid.js` | `ext_tourExplorer`, `_booking_unified` | `lfh-tours-modal` | Tour card grid (in-chat) |
| `lfh-lodges-widget.js` | `ext_lodgeCompare_v2`, `_unified` | `lfh-lodges-modal` | Lodge comparison cards (in-chat) |
| `lfh-weather-widget.js` | `ext_weather_conditions_v2`, `_unified` | `lfh-weather-modal` | Weather hero card (in-chat) |
| `lfh-selfservice-widget.js` | `ext_browserSelfService_v4`, `_unified` | `lfh-selfservice-modal` | FAQ + video browser (in-chat) |
| `lfh-feedback.js` | `ext_feedback10` | — | Thumbs up/down after responses |

### Canvas-Triggered (fired by VoiceFlow canvas directly)

| File | Trace Type | Purpose |
|------|-----------|---------|
| `lfh-input-gate.js` | `ext_inputGate` | Hides/restores chat input during native disclaimer flow. Payload: `{ "action": "disable" \| "enable" }` |
| `lfh-welcome.js` | `ext_welcomeGrid_v2` | Welcome screen with quick-start options |
| `lfh-snowfall.js` | `ext_snowfall1` | Decorative snowfall animation |

### Extension-Triggered (opened by other extensions, not VoiceFlow)

| File | Opened By | Purpose |
|------|-----------|---------|
| `lfh-hub.js` | `ext_hubModal` trace or other extensions | Tabbed navigation hub (tours/lodges/weather) |
| `lfh-tours-modal.js` | tours-grid, hub, lodges-modal, weather-modal, selfservice-modal | Tour detail + booking modal |
| `lfh-lodges-modal.js` | lodges-widget, hub, weather-modal, selfservice-modal | Lodge detail view modal |
| `lfh-weather-modal.js` | weather-widget, hub, lodges-modal | Weather detail modal |
| `lfh-selfservice-modal.js` | selfservice-widget | FAQ/video full-view modal |

### UI Chrome (persistent interface elements)

| File | Trace Types | Purpose |
|------|------------|---------|
| `lfh-menu-button.js` | `ext_menuConfirmation` (Part 2) | Persistent menu button + confirmation bubble. Button injected as module side effect; confirmation is a registered extension. |

### Data / Utility (imported by other files, not registered as extensions)

| File | Exports | Used By |
|------|---------|---------|
| `lfh-tours-data.js` | `LFH_TOURS`, `LFH_COLORS`, `LFH_ASSETS`, `LFH_VIDEOS`, `getVideoEmbedUrl` | Almost everything |
| `lfh-tours-booking.js` | `renderBookingForm`, `TOUR_DATES` | `lfh-tours-modal` |
| `lfh-tours-booking-hub.js` | `renderBookingForm`, `TOUR_DATES` | `lfh-hub-tab-tours` |
| `lfh-hub-shared.js` | Colors, utilities, activity tracking, re-exports data | Hub tabs |
| `lfh-hub-tab-tours.js` | `renderToursTab`, `getToursTabState`, `buildToursStyles` | `lfh-hub` |
| `lfh-hub-tab-lodges.js` | `renderLodgesTab`, `getLodgesTabState`, `buildLodgesStyles` | `lfh-hub` |
| `lfh-hub-tab-weather.js` | `renderWeatherTab`, `getWeatherTabState`, `buildWeatherStyles` | `lfh-hub` |

### Removed / Legacy (not loaded by loader.js)

| File | Reason |
|------|--------|
| `lfh-disclaimer.js` | Replaced 2026-03-18. The `ext_aiDisclaimer` + localStorage approach was unreliable (string/boolean type mismatch). AI disclosure now uses native VoiceFlow text + choice blocks with `lfh-input-gate.js` for input control. |

## Dependency Graph

```
lfh-tours-data.js         ← core data, used by almost all extensions
├── lfh-tours-booking.js  ← standalone booking form
├── lfh-tours-modal.js    ← imports tours-data + tours-booking
├── lfh-lodges-modal.js   ← imports tours-data + tours-modal + weather-modal
├── lfh-weather-modal.js  ← imports tours-data + lodges-modal + tours-modal
├── lfh-selfservice-modal.js ← imports tours-data + tours-modal + lodges-modal
└── lfh-hub-shared.js     ← re-exports tours-data + lodges-modal data
    ├── lfh-hub-tab-tours.js   ← imports hub-shared + tours-booking-hub
    ├── lfh-hub-tab-lodges.js  ← imports hub-shared
    └── lfh-hub-tab-weather.js ← imports hub-shared
```

## Naming Convention

**Format:** `lfh-{feature}.js` — clean, no version numbers, no "unified"

Version lives in git tags and the file header comment. Each file has a header comment block documenting its origin (dev filename), trace types, and dependencies.

## Origin Map (dev → prod)

| Production Name | Dev Origin |
|----------------|------------|
| `lfh-lead-form.js` | `lead-capture-form-v5-unified.js` |
| `lfh-feedback.js` | `lfh-feedback-v10.js` |
| `lfh-welcome.js` | `welcome-grid-v2-unified.js` |
| `lfh-snowfall.js` | `snowfall.js` |
| `lfh-tours-grid.js` | `lfh-tour-explorer-grid-booking-unified.js` |
| `lfh-tours-modal.js` | `lfh-tour-explorer-modal-booking-unified-v2.js` |
| `lfh-tours-data.js` | `lfh-tour-explorer-modal.js` |
| `lfh-tours-booking.js` | `lfh-tour-booking-form-v2.js` |
| `lfh-tours-booking-hub.js` | `lfh-tour-booking-form.js` (v1) |
| `lfh-lodges-widget.js` | `lfh-lodge-compare-widget-v2-unified.js` |
| `lfh-lodges-modal.js` | `lfh-lodge-compare-modal-v2-unified.js` |
| `lfh-weather-widget.js` | `lfh-weather-conditions-widget-v2-unified.js` |
| `lfh-weather-modal.js` | `lfh-weather-conditions-modal-unified.js` |
| `lfh-selfservice-widget.js` | `browser-self-service-v4-widget-unified.js` |
| `lfh-selfservice-modal.js` | `browser-self-service-v4-modal-unified.js` |
| `lfh-hub.js` | `lfh-hub-modal.js` |
| `lfh-hub-shared.js` | *(unchanged)* |
| `lfh-hub-tab-tours.js` | *(unchanged)* |
| `lfh-hub-tab-lodges.js` | *(unchanged)* |
| `lfh-hub-tab-weather.js` | *(unchanged)* |
