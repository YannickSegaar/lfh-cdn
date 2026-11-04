# Changelog

All notable changes to the LFH CDN are documented here.

Format: [Semantic Versioning](https://semver.org/)
- **MAJOR:** Breaking changes (new loader.js API, removed extensions)
- **MINOR:** New features (new extension, new capability)
- **PATCH:** Bug fixes, styling tweaks, content updates

## [1.2.0] - 2026-09-11

### Added
- **Email deep link** — `?chat=open` opens the widget on load; `?chat=open&q=<question>`
  also sends the question, so a newsletter CTA lands the reader mid-conversation instead
  of on a closed widget. Question capped at 300 chars (the param is attacker-reachable).
  Proactive messages are suppressed on a deep-linked visit.
- `images/lfh-logo-white.png` — transparent white wordmark, 540x115, for email mastheads.
  The site's own `dist/images/logo-white.png` has no alpha and renders a grey box on black.
- `images/ask-me-heli.png` — ASK ME helicopter icon, 144x92 RGBA, for email chat bubbles
  (Outlook desktop will not render the SVG the widget uses).

## [1.1.0] - 2026-03-10

### Fixed
- 4 extensions referenced non-existent `lfh-tour-explorer-modal-booking-unified.js` (v1) — cross-navigation from lodge/weather/selfservice/tours-grid modals would crash
- Hub tours tab imported `lfh-tour-booking-form.js` (v1) which didn't exist in CDN — booking button in hub would crash
- Both bugs fixed by renaming + correcting all import paths

### Changed
- Renamed all 15 extensions to production naming convention (`lfh-{feature}.js`)
- Updated all internal import paths to match new filenames
- Updated loader.js import paths
- Added file header comments with origin mapping, trace types, and dependencies

### Added
- `lfh-tours-booking-hub.js` — v1 booking form for hub tours tab (copied from testing repo)
- `EXTENSIONS.md` — extension registry (single source of truth)
- `CLAUDE.md` — AI agent handoff document
- Branch protection: `staging` → `main` via PR workflow

## [1.0.0] - 2026-03-10

### Added
- Initial production deployment
- 19 extension files (17 core + 2 dependencies)
- `loader.js` with full/fallback mode switching
- Cross-page awareness via silent `page_context_update` events
- All assets consolidated from 3 repos into single CDN
- Trace type backward compatibility (old + unified types)
