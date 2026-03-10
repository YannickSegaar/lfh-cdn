# CLAUDE.md — LFH CDN Repository

## What This Is

CDN for the Last Frontier Heliskiing (LFH) VoiceFlow AI chat agent. Hosted on GitHub Pages at:
- **Production:** `https://yannicksegaar.github.io/lfh-cdn/`
- **Repo:** `YannickSegaar/lfh-cdn`

## How It Connects to WordPress

One script tag on the WordPress site loads everything:
```html
<script type="module" src="https://yannicksegaar.github.io/lfh-cdn/loader.js?v=1.1.0"></script>
```

Add `?fallback=true` for minimal mode (lead form + feedback only).

## Repository Structure

```
loader.js                  # Entry point — loads VoiceFlow + extensions
extensions/                # 20 JS extension files (see EXTENSIONS.md)
css/                       # Widget stylesheet (LFH_styles.css)
styles/                    # Shadow DOM injection + notification sound
fonts/                     # Nexa Rust brand font
images/                    # Logos, backgrounds, tour/lodge photos
audio/                     # Notification sound
docs/                      # Deployment guide PDF
EXTENSIONS.md              # Extension registry (single source of truth)
CHANGELOG.md               # Version history
```

## CRITICAL Safety Rules

1. **Never push directly to `main`** — always go through `staging` branch via PR
2. **Always test before merging** — use local server or staging URL
3. **Never delete extension files** without checking EXTENSIONS.md dependency graph
4. **Never rename trace types** — they must match what VoiceFlow canvas sends
5. **Check loader.js** after any file rename — import paths must match

## Branch Strategy

```
main          ← production (GitHub Pages serves this)
  └── staging ← test changes here, merge to main via PR
```

### Safe Update Workflow

```bash
git checkout staging
git pull origin staging
# Make changes
python3 -m http.server 8080  # Test locally
git add <files> && git commit -m "Description"
git push origin staging
# Test on staging URL
gh pr create --base main --head staging --title "v1.x.0: Description"
# Merge PR on GitHub
git checkout main && git pull
git tag v1.x.0 && git push --tags
```

## Naming Convention

**Format:** `lfh-{feature}.js` — no version numbers, no "unified" suffixes.

Version is tracked in git tags and file header comments. See EXTENSIONS.md for the full origin map (dev → prod filenames).

## How to Test Changes

1. **Local:** `cd /path/to/lfh-cdn && python3 -m http.server 8080`
   - Open test page pointing to `http://localhost:8080/loader.js`
2. **Staging:** Point test page to raw staging branch URL
3. **Verify:** Open browser console, check for `[LFH] Extensions loaded: N` with zero errors

## Extension Architecture

Extensions use VoiceFlow's pattern:
```javascript
export const MyExtension = {
  name: 'Extension Name',
  type: 'response',
  match: ({ trace }) => trace.type === 'ext_traceType' || trace.payload?.name === 'ext_traceType',
  render: ({ trace, element }) => { /* build UI into element */ }
};
```

- **Widgets** render in-chat (inside the VoiceFlow message stream)
- **Modals** are opened programmatically by widgets or other modals (cross-navigation)
- **Data files** export constants and helpers, not extensions

See EXTENSIONS.md for the complete registry and dependency graph.

## Fallback Mode

`loader.js?fallback=true` loads only:
- `lfh-lead-form.js` (contact form)
- `lfh-feedback.js` (thumbs up/down)

Everything else is text-only chat. Use this if extensions break in production.

## Related Repositories

| Repo | Purpose | Local Path |
|------|---------|------------|
| `last-frontier-heliskiing` (private) | VoiceFlow configs, KB, system prompts | `/Users/yrs/my_projects/last_frontier_cc` |
| `lfh-internal-testing` (private) | Internal test page (GitHub Pages) | `/Users/yrs/my_projects/lfh-internal-testing` |
| `lfh-testing-unified` (private) | Unified test page | `/Users/yrs/my_projects/lfh-testing-unified` |
| `romaix-agent-platform` (private) | Custom platform (FastAPI + React) | `/Users/yrs/my_projects/romaix-agent-platform` |

## VoiceFlow Project

- **Project ID:** `699ffcecd1c4a9bd2986b463`
- **Version:** `production`
- **Runtime:** `https://general-runtime.voiceflow.com`
