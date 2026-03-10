# Changelog

All notable changes to the LFH CDN are documented here.

Format: [Semantic Versioning](https://semver.org/)
- **MAJOR:** Breaking changes (new loader.js API, removed extensions)
- **MINOR:** New features (new extension, new capability)
- **PATCH:** Bug fixes, styling tweaks, content updates

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
