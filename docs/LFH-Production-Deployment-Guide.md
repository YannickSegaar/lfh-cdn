# LFH AI Agent — Production Deployment Guide

**Last updated:** March 10, 2026
**For:** Yannick (you) + meeting with Gwyn (WordPress developer), March 11

---

## What This Is

You built an AI chat agent for Last Frontier Heliskiing using VoiceFlow. It has extensions (tour explorer, lodge comparison, weather, lead capture, etc.) that you've been testing on a private test page.

Now you're putting it live on the real website: **lastfrontierheli.com**

This guide walks you through everything step by step.

---

## How It Works (The Big Picture)

```
WordPress site (lastfrontierheli.com)
  |
  |  has ONE <script> tag in its footer
  |
  v
loader.js (hosted on YOUR GitHub Pages CDN)
  |
  |  1. Detects visitor info (device, language, timezone, page type)
  |  2. Loads VoiceFlow widget from voiceflow.com
  |  3. Loads your 19 extensions from your CDN
  |  4. Starts the chat agent with all context
  |  5. Injects your custom styling
  |  6. Handles cross-page awareness
  |
  v
Chat widget appears on every page of lastfrontierheli.com
```

**The key insight:** WordPress only needs one line of code. Everything else lives on YOUR GitHub repo. When you want to update something, you push to GitHub — no WordPress access needed.

---

## What Got Built

### Your CDN Repository

- **GitHub:** github.com/YannickSegaar/lfh-cdn (public)
- **Live URL:** https://yannicksegaar.github.io/lfh-cdn/
- **Local folder:** ~/my_projects/lfh-cdn

### What's Inside

| Folder | Contents | Size |
|--------|----------|------|
| `extensions/` | 19 JavaScript extension files | 584 KB |
| `images/` | Tour photos, lodge photos, logos, backgrounds | 130 MB |
| `fonts/` | Nexa Rust Sans Black (2 weights) | 300 KB |
| `css/` | LFH_styles.css (widget theme) | 8 KB |
| `styles/` | Shadow DOM inject + notification sound scripts | 16 KB |
| `audio/` | Notification beep sound | 68 KB |
| `voiceflow/` | Code step for cross-page awareness | 1 KB |
| `loader.js` | The main loader script (what WordPress loads) | 12 KB |

### The 19 Extensions

These are the interactive components the AI agent can trigger:

| # | Extension | What It Does |
|---|-----------|-------------|
| 1 | Lead capture form v5 | Contact form — captures name, email, message |
| 2 | Tour explorer grid | Grid of tour cards (4-day, 5-day, 7-day, safari, private) |
| 3 | Tour explorer modal v2 | Full detail view when you click a tour card |
| 4 | Tour explorer modal (data) | Tour data constants used by the modal |
| 5 | Tour booking form v2 | Booking inquiry form inside tour modal |
| 6 | Lodge compare widget | Side-by-side lodge comparison cards |
| 7 | Lodge compare modal | Full detail view when you click a lodge |
| 8 | Weather conditions widget | Current snow/weather conditions |
| 9 | Weather conditions modal | Detailed weather view |
| 10 | Browser self-service widget | FAQ browser with video library |
| 11 | Browser self-service modal | Full-screen FAQ/video viewer |
| 12 | Feedback v10 | Thumbs up/down after agent responses |
| 13 | Welcome grid v2 | Welcome screen with quick-start options |
| 14 | Snowfall | Decorative snowfall animation |
| 15 | Hub modal | Central navigation hub (tours/lodges/weather tabs) |
| 16 | Hub shared utilities | Shared code used by hub tabs |
| 17 | Hub tab: tours | Tours tab content inside hub |
| 18 | Hub tab: lodges | Lodges tab content inside hub |
| 19 | Hub tab: weather | Weather tab content inside hub |

---

## PART 1: Pre-Flight Verification Checklist

Before the meeting with Gwyn, go through this checklist to confirm everything works.

### Step 1.1: Verify the CDN is live

Open each of these URLs in your browser. Each should load (not show a 404 error):

- [ ] https://yannicksegaar.github.io/lfh-cdn/loader.js
- [ ] https://yannicksegaar.github.io/lfh-cdn/css/LFH_styles.css
- [ ] https://yannicksegaar.github.io/lfh-cdn/extensions/lead-capture-form-v5-unified.js
- [ ] https://yannicksegaar.github.io/lfh-cdn/images/LFH_Logo_FullName_White.svg
- [ ] https://yannicksegaar.github.io/lfh-cdn/fonts/NexaRustSansBlack2.woff2
- [ ] https://yannicksegaar.github.io/lfh-cdn/audio/lfh_notification_beep.mp3

If any of these show a 404, run this in your terminal:

```bash
cd ~/my_projects/lfh-cdn
git push origin main
```

Then wait 2-3 minutes and try again.

### Step 1.2: Test on your test page

You need to temporarily change your lfh-internal-testing page to load from the CDN instead of local files. This proves the CDN works end-to-end.

**Option A — Quick test with a minimal HTML file:**

Create a temporary file anywhere:

```bash
cat > /tmp/lfh-cdn-test.html << 'HTMLEOF'
<!DOCTYPE html>
<html>
<head><title>LFH CDN Test</title></head>
<body>
<h1>LFH CDN Test Page</h1>
<p>If the chat widget appears in the bottom-right corner, the CDN is working.</p>

<!-- This is the exact line Gwyn will add to WordPress -->
<script type="module" src="https://yannicksegaar.github.io/lfh-cdn/loader.js?v=1.0.0" crossorigin></script>
</body>
</html>
HTMLEOF
```

Then open it:

```bash
open /tmp/lfh-cdn-test.html
```

**What you should see:**
- [ ] Chat widget bubble appears in bottom-right corner (give it 5-10 seconds)
- [ ] After ~3 seconds, proactive message appears: "Curious about heliskiing in Northern BC?"
- [ ] After ~5 seconds, second message: "I can help you plan your adventure!"
- [ ] Click the bubble — chat opens with the welcome grid
- [ ] Snowfall animation plays

**IMPORTANT:** The local file test may not work because browsers block ES module imports from `file://` URLs. If the widget doesn't appear, you need to serve it from a local server:

```bash
cd /tmp && python3 -m http.server 8080
```

Then open http://localhost:8080/lfh-cdn-test.html in your browser.

### Step 1.3: Test each extension

Once the widget is open, test these interactions by typing messages:

- [ ] **Tour explorer:** Type "show me your tours" — tour grid should appear
- [ ] **Lodge compare:** Type "compare the lodges" — lodge cards should appear
- [ ] **Weather:** Type "what are the snow conditions?" — weather widget should appear
- [ ] **Self-service:** Type "I have some questions about gear" — FAQ browser should appear
- [ ] **Lead capture:** Type "I want to book a trip" — after a few messages, lead form should appear
- [ ] **Feedback:** After any agent response, thumbs up/down should appear

### Step 1.4: Check the browser console for errors

While testing, open the browser Developer Tools (right-click → Inspect → Console tab).

**Green flags (good):**
- `[LFH] Extensions loaded: 9` — all extensions loaded
- No red errors related to `lfh-cdn`

**Red flags (problems to fix):**
- `Failed to load module script` — an extension file URL is wrong
- `CORS error` — GitHub Pages isn't serving the file correctly
- `net::ERR_ABORTED 404` — a file is missing from the CDN

### Step 1.5: Test fallback mode

Change the URL to add `&fallback=true`:

```html
<script type="module" src="https://yannicksegaar.github.io/lfh-cdn/loader.js?v=1.0.0&fallback=true" crossorigin></script>
```

**What you should see in fallback mode:**
- [ ] Chat widget appears and works (text chat)
- [ ] Lead capture form works when triggered
- [ ] Feedback thumbs work
- [ ] Tour explorer, lodge compare, weather, hub — these should NOT appear (that's correct)

### Step 1.6: Test on mobile

Open the same test page on your phone (or use browser DevTools → Toggle Device Toolbar).

- [ ] Widget bubble appears and is tappable
- [ ] Chat opens full-screen on mobile
- [ ] Extensions render correctly on small screens
- [ ] Can scroll within modals

---

## PART 2: The Gwyn Meeting — Step by Step

### Before the meeting starts

Have these ready:
1. Your test page working (from Step 1.2)
2. This document open for reference
3. The embed snippet ready to copy-paste (below)

### The embed snippet to give Gwyn

```html
<!-- Last Frontier AI Chat Agent — Managed by Yannick/RomAIx -->
<script type="module" src="https://yannicksegaar.github.io/lfh-cdn/loader.js?v=1.0.0" crossorigin></script>
```

**Where it goes:** In the site-wide footer, before `</body>`. It must appear on every page.

**Recommended WordPress method:** Use a plugin like "WPCode" (formerly "Insert Headers and Footers") or "Header Footer Code Manager" to add it to the footer. This way it survives theme updates.

### Meeting script

#### 1. Demo first (2 minutes)

Show Gwyn the agent working on your test page. Open the chat, ask a few questions, show the tour explorer opening, the lodge comparison. This builds confidence that it works.

#### 2. Ask these 5 questions (write down the answers)

**Question 1 — URL paths:**
"What are the exact URL slugs for these pages?"

Write the answers here:

| Page | URL path (what Gwyn tells you) |
|------|-------------------------------|
| Tours overview | /_________________________________ |
| Bell 2 Lodge | /_________________________________ |
| Ripley Creek | /_________________________________ |
| Booking / Reservations | /_________________________________ |
| Safety | /_________________________________ |
| FAQ | /_________________________________ |
| Contact | /_________________________________ |
| Gallery / Media | /_________________________________ |
| About / Team | /_________________________________ |

You'll use these to update the `detectPageType()` function in loader.js after the meeting.

**Question 2 — Staging site:**
"Is there a staging or development version of the site where we can test first?"

Answer: _______________________________________________

If yes, deploy there first before going to production.

**Question 3 — Existing chat tools:**
"Are there any existing chat widgets, live chat tools, or chatbots installed on the site?"

Answer: _______________________________________________

If yes, those need to be disabled to avoid conflicts.

**Question 4 — Caching:**
"Do you use a caching plugin? (WP Rocket, W3 Total Cache, WP Super Cache, etc.)"

Answer: _______________________________________________

If yes, the script may need to be excluded from page caching. Gwyn will know how.

**Question 5 — Theme setup:**
"Is this a child theme or custom theme? Will the script tag survive a theme update?"

Answer: _______________________________________________

Using a header/footer plugin (recommended) means it survives theme updates automatically.

#### 3. Deploy together

**If there's a staging site:**
1. Have Gwyn add the snippet to staging
2. Test together: visit home, tours, lodges, booking pages
3. Test on mobile
4. If everything works → proceed to production

**If no staging site (straight to production):**
1. Have Gwyn add the snippet to production
2. Test immediately on the live site
3. Have the fallback plan ready (see Emergency section below)

#### 4. Test on production together

Visit each of these pages and verify the chat widget appears:

- [ ] Home page
- [ ] Tours page
- [ ] Lodge page (Bell 2)
- [ ] Lodge page (Ripley Creek)
- [ ] Booking/reservations page
- [ ] Contact page
- [ ] Any other major page

On each page:
- [ ] Widget bubble appears in bottom-right
- [ ] Proactive messages appear after a few seconds
- [ ] Chat opens when clicked
- [ ] Agent responds correctly
- [ ] At least one extension works (try "show me your tours")

#### 5. Share the emergency plan with Gwyn

Read this to Gwyn (or share this page):

> "If anything goes wrong with the chat agent after today, here are 3 options:
>
> **Quick fix (30 seconds):** Add `&fallback=true` to the end of the script URL. This switches to a simple text-only chat with just the lead form.
>
> **Remove entirely (10 seconds):** Delete the script tag. The chat disappears completely, no side effects.
>
> **I'll handle code fixes:** Any code changes happen on my side by pushing to GitHub. You never need to edit code. I'll message you if a version number needs updating."

---

## PART 3: After the Meeting — What to Update

### Step 3.1: Update page type detection

Using the URL paths Gwyn gave you, update the `detectPageType()` function in loader.js.

Open the file:

```bash
cd ~/my_projects/lfh-cdn
code loader.js    # or: nano loader.js
```

Find the `detectPageType` function (around line 63) and update the path checks to match the actual WordPress URLs.

**Example:** If Gwyn says the tours page is at `/heliskiing-tours/`, change:

```javascript
// BEFORE:
if (p.includes('/tour') || p.includes('/heli-ski')) return 'tours';

// AFTER (if needed — in this case '/heli-ski' already matches '/heliskiing-tours'):
if (p.includes('/tour') || p.includes('/heli-ski') || p.includes('/heliskiing')) return 'tours';
```

### Step 3.2: Push the update

```bash
cd ~/my_projects/lfh-cdn
git add loader.js
git commit -m "Update page type detection with actual WordPress URL paths"
git push origin main
```

Wait 2-3 minutes for GitHub Pages to update. The live site will pick up the change automatically (no WordPress change needed).

### Step 3.3: Add cross-page awareness to VoiceFlow (optional, can do later)

This makes the agent aware when a user navigates between pages. It's already built into loader.js — you just need to add the receiving end in VoiceFlow.

**In VoiceFlow canvas:**

1. Go to the main Listen/Conversation node
2. Add an Event Trigger: `page_context_update`
3. Connect it to a new Code Step
4. Paste this code (also saved at `lfh-cdn/voiceflow/update-page-context.js`):

```javascript
var data = (last_event && last_event.payload) ? last_event.payload : last_event;
if (data) {
  if (data.page_type) page_type = data.page_type;
  if (data.page_topic !== undefined) page_topic = data.page_topic;
  if (data.page_path) page_path = data.page_path;
}
```

5. Connect the Code Step back to the Listen node (no response sent to user)

This is not urgent — the agent works fine without it. It just means the agent won't know which page the user is currently on if they navigate after starting the chat.

---

## PART 4: How to Make Updates After Launch

### The update workflow

```
1. Edit files in ~/my_projects/lfh-cdn/
2. Test locally (open test page, check browser console)
3. Commit and push:
   cd ~/my_projects/lfh-cdn
   git add -A
   git commit -m "Description of what changed"
   git push origin main
4. Wait 2-3 minutes for GitHub Pages to deploy
5. Hard-refresh the live site (Ctrl+Shift+R or Cmd+Shift+R) to verify
```

**No WordPress changes needed** — the `?v=1.0.0` in the URL doesn't affect caching on the CDN side. GitHub Pages serves fresh files.

### If you want explicit version control

After testing a change, bump the version:

```bash
cd ~/my_projects/lfh-cdn
git tag v1.1.0
git push --tags
```

Then ask Gwyn to change `?v=1.0.0` to `?v=1.1.0` in the script URL. This is optional but helpful for tracking what version is live.

### Common changes you might make

| What | Where to edit | Notes |
|------|---------------|-------|
| Proactive message text | `loader.js` lines 202-213 | Change the greeting messages |
| Chat widget title | `loader.js` line 189 | Currently "Last Frontier" |
| Page type detection | `loader.js` lines 63-75 | Update if WordPress URLs change |
| Extension styling | `css/LFH_styles.css` | Widget colors, fonts, layout |
| Extension behavior | `extensions/*.js` | The interactive components |
| Background image | `images/` | Replace the file, keep the name |
| Shadow DOM styling | `styles/lastfrontier-shadow-inject.js` | Chat background, header, etc. |

---

## PART 5: Emergency Procedures

### Something broke — what do I do?

**Symptom: Widget doesn't appear at all**

1. Open browser DevTools (F12) → Console tab
2. Look for red errors
3. If you see `net::ERR_ABORTED 404` for loader.js → GitHub Pages may be down (rare). Check https://www.githubstatus.com/
4. If you see other errors → try fallback mode first, then investigate

**Symptom: Widget appears but extensions don't work**

1. Console should show `[LFH] Extensions loaded: 9`
2. If it shows `[LFH] Extension load error:` → one or more extensions failed to load
3. Switch to fallback mode while you debug:

Tell Gwyn:
> "Please change the script URL to: `loader.js?v=1.0.0&fallback=true`"

**Symptom: Widget appears but looks wrong (no styling)**

1. Check if `LFH_styles.css` loads: visit https://yannicksegaar.github.io/lfh-cdn/css/LFH_styles.css
2. Check if shadow inject loads: visit https://yannicksegaar.github.io/lfh-cdn/styles/lastfrontier-shadow-inject.js
3. If both load fine, hard-refresh the page (Ctrl+Shift+R)

### How to roll back

**Fastest (switch to safe mode):**

Tell Gwyn: "Add `&fallback=true` to the script URL"

Result: Simple text chat + lead form + feedback. All complex extensions disabled.

**Roll back code changes:**

```bash
cd ~/my_projects/lfh-cdn
git log --oneline -5          # see recent commits
git revert HEAD               # undo the last commit
git push origin main          # push the rollback
```

Wait 2-3 minutes. The live site will serve the previous version.

**Nuclear option (remove the agent entirely):**

Tell Gwyn: "Delete the script tag from the footer"

Result: Chat agent disappears completely. No side effects on the website.

---

## PART 6: Technical Reference

### Architecture diagram

```
lastfrontierheli.com (WordPress)
       |
       | <script src="...lfh-cdn/loader.js">
       |
       v
yannicksegaar.github.io/lfh-cdn/
       |
       |-- loader.js .................. Main loader (detects context, loads everything)
       |-- css/LFH_styles.css ........ Widget theme (colors, fonts, layout)
       |-- styles/
       |   |-- lastfrontier-shadow-inject.js ... Background image, header fix
       |   |-- notification-sound.js .......... Beep when agent responds
       |-- extensions/ ................ 19 interactive components
       |   |-- lead-capture-form-v5-unified.js
       |   |-- lfh-tour-explorer-grid-booking-unified.js
       |   |-- lfh-tour-explorer-modal-booking-unified-v2.js
       |   |-- lfh-tour-explorer-modal.js (data)
       |   |-- lfh-tour-booking-form-v2.js (booking form)
       |   |-- lfh-lodge-compare-widget-v2-unified.js
       |   |-- lfh-lodge-compare-modal-v2-unified.js
       |   |-- lfh-weather-conditions-widget-v2-unified.js
       |   |-- lfh-weather-conditions-modal-unified.js
       |   |-- browser-self-service-v4-widget-unified.js
       |   |-- browser-self-service-v4-modal-unified.js
       |   |-- lfh-feedback-v10.js
       |   |-- welcome-grid-v2-unified.js
       |   |-- snowfall.js
       |   |-- lfh-hub-modal.js
       |   |-- lfh-hub-shared.js
       |   |-- lfh-hub-tab-tours.js
       |   |-- lfh-hub-tab-lodges.js
       |   |-- lfh-hub-tab-weather.js
       |-- fonts/ ..................... Nexa Rust Sans Black (brand font)
       |-- images/ .................... Tour photos, lodge photos, logos
       |-- audio/ ..................... Notification beep
       |-- voiceflow/ ................. Code steps for VoiceFlow canvas
```

### How the loader works (step by step)

1. **Page context capture** — Detects device type (mobile/desktop), browser language, timezone, visit count, which page type the user is on, UTM parameters
2. **Load VoiceFlow widget** — Downloads the VoiceFlow chat widget from their CDN
3. **Load extensions** — Downloads all 19 extension files from your CDN (or just 2 in fallback mode)
4. **Start chat** — Initializes VoiceFlow with your project ID, session data, extensions, and stylesheet
5. **Proactive messages** — Shows greeting bubbles after 3 and 5 seconds
6. **Shadow DOM styling** — Injects custom background, header, and font styling
7. **Notification sound** — Sets up the beep sound for when the agent responds
8. **Cross-page awareness** — If the user navigated from a different page, silently tells VoiceFlow

### Trace type compatibility

The VoiceFlow canvas fires "old" trace types. The extensions accept both old and new:

| VoiceFlow Canvas Fires | Extension Also Accepts | Extension File |
|------------------------|----------------------|----------------|
| `ext_lastFrontierLeadForm_v4` | `ext_lastFrontierLeadForm_v4_unified` | lead-capture-form-v5-unified.js |
| `ext_tourExplorer` | `ext_tourExplorer_booking_unified` | lfh-tour-explorer-grid-booking-unified.js |
| `ext_lodgeCompare_v2` | `ext_lodgeCompare_v2_unified` | lfh-lodge-compare-widget-v2-unified.js |
| `ext_weather_conditions_v2` | `ext_weather_conditions_v2_unified` | lfh-weather-conditions-widget-v2-unified.js |
| `ext_browserSelfService_v4` | `ext_browserSelfService_v4_unified` | browser-self-service-v4-widget-unified.js |
| `ext_feedback10` | (already matches) | lfh-feedback-v10.js |
| `ext_hubModal` | (already matches) | lfh-hub-modal.js |
| `ext_welcomeGrid_v2` | (already matches) | welcome-grid-v2-unified.js |
| `ext_snowfall1` | (already matches) | snowfall.js |

### Key URLs

| What | URL |
|------|-----|
| CDN root | https://yannicksegaar.github.io/lfh-cdn/ |
| Loader script | https://yannicksegaar.github.io/lfh-cdn/loader.js |
| GitHub repo | https://github.com/YannickSegaar/lfh-cdn |
| VoiceFlow project | Dashboard → Project ID: 699ffcecd1c4a9bd2986b463 |
| GitHub Pages settings | https://github.com/YannickSegaar/lfh-cdn/settings/pages |

### Fallback mode comparison

| Feature | Full Mode | Fallback Mode |
|---------|-----------|---------------|
| Text chat | Yes | Yes |
| Knowledge base answers | Yes | Yes |
| Lead capture form | Yes | Yes |
| Feedback (thumbs) | Yes | Yes |
| Tour explorer | Yes | No |
| Lodge comparison | Yes | No |
| Weather conditions | Yes | No |
| Self-service browser | Yes | No |
| Welcome grid | Yes | No |
| Hub modal | Yes | No |
| Snowfall | Yes | No |
| Cross-page awareness | Yes | Yes |

---

## Quick Reference Card

**The line for WordPress:**
```html
<script type="module" src="https://yannicksegaar.github.io/lfh-cdn/loader.js?v=1.0.0" crossorigin></script>
```

**Switch to fallback:**
```html
<script type="module" src="https://yannicksegaar.github.io/lfh-cdn/loader.js?v=1.0.0&fallback=true" crossorigin></script>
```

**Push an update:**
```bash
cd ~/my_projects/lfh-cdn
git add -A && git commit -m "what changed" && git push origin main
```

**Roll back:**
```bash
cd ~/my_projects/lfh-cdn
git revert HEAD && git push origin main
```
