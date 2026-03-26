// loader.js — Last Frontier Heliskiing AI Agent Loader
// Version: 1.2.0
// Usage: <script type="module" src="https://yannicksegaar.github.io/lfh-cdn/loader.js?v=1.2.0"></script>
(async function() {
  'use strict';

  // Don't load widget inside iframes (e.g. hub modal weather tab)
  try { if (window.self !== window.top) return; } catch (e) { return; }

  // Prevent double initialization on cold-cache loads
  if (window.__lfh_loading) return;
  window.__lfh_loading = true;

  // ============================================
  // CONFIGURATION
  // ============================================
  // Derive CDN base from this script's own URL (works on any host page)
  // Note: document.currentScript is null in ES modules, so we use import.meta.url
  var CDN = 'https://yannicksegaar.github.io/lfh-cdn';
  var useFallback = false;
  try {
    var scriptUrl = new URL(import.meta.url);
    CDN = scriptUrl.origin + scriptUrl.pathname.replace(/\/loader\.js$/, '');
    useFallback = scriptUrl.searchParams.get('fallback') === 'true';
  } catch (e) {}
  var VF_PROJECT_ID = '69b13dffb59c7feeb0e8e2dd';
  var VF_VERSION = 'production';

  // ============================================
  // DOMAIN ALLOWLIST
  // Only load on approved domains. Prevents unauthorized usage.
  // ============================================
  var ALLOWED_DOMAINS = [
    'lastfrontierheli.com',       // Production website
    'www.lastfrontierheli.com',   // Production website (www)
    'yannicksegaar.github.io',    // CDN test page
    'staging-lastfrontierheliskiing.kinsta.cloud',  // Kinsta staging
    'localhost',                   // Local development
    '127.0.0.1',                  // Local development
  ];

  var currentHost = location.hostname;
  var isAllowed = ALLOWED_DOMAINS.some(function(domain) {
    return currentHost === domain || currentHost.endsWith('.' + domain);
  });

  if (!isAllowed) {
    console.warn('[LFH] Widget blocked: ' + currentHost + ' is not an authorized domain.');
    return;
  }

  // ============================================
  // 1. PAGE CONTEXT CAPTURE
  // ============================================

  // Device detection
  var MOBILE_BREAKPOINT = 768;
  var deviceType = window.innerWidth < MOBILE_BREAKPOINT ? 'mobile' : 'desktop';

  // Language detection
  var SUPPORTED_LANGUAGES = { en: 'EN', fr: 'FR', de: 'DE', es: 'ES' };
  var browserLang = (navigator.language || navigator.userLanguage || 'en').slice(0, 2).toLowerCase();
  var userLanguage = SUPPORTED_LANGUAGES[browserLang] || 'EN';

  // Timezone & local time
  var visitorTimezone = '', localHour = '', dayOfWeek = '';
  try {
    visitorTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    localHour = new Date().getHours();
    dayOfWeek = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  } catch (e) {}

  // Visit tracking (localStorage)
  var visitCount = 1, isReturning = false;
  try {
    var storedCount = localStorage.getItem('lfh_visit_count');
    if (storedCount) { visitCount = parseInt(storedCount, 10) + 1; isReturning = true; }
    localStorage.setItem('lfh_visit_count', String(visitCount));
  } catch (e) {}

  // Visitor ID (persistent)
  var visitorId = '';
  try {
    visitorId = localStorage.getItem('lfh_visitor_id');
    if (!visitorId) {
      visitorId = 'v_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('lfh_visitor_id', visitorId);
    }
  } catch (e) {}

  // Page type detection — maps WordPress URL paths to categories
  // TODO: Verify exact paths with Gwyn during meeting
  function detectPageType(path) {
    var p = (path || '/').replace(/\/$/, '').toLowerCase() || '/';
    if (p === '/' || p === '/home') return 'home';
    if (p.includes('/tour') || p.includes('/heli-ski')) return 'tours';
    if (p.includes('/lodge') || p.includes('/bell-2') || p.includes('/ripley')) return 'lodge';
    if (p.includes('/book') || p.includes('/reserv')) return 'booking';
    if (p.includes('/safe')) return 'safety';
    if (p.includes('/faq') || p.includes('/question')) return 'faq';
    if (p.includes('/contact')) return 'contact';
    if (p.includes('/galler') || p.includes('/photo') || p.includes('/video')) return 'gallery';
    if (p.includes('/about') || p.includes('/story') || p.includes('/team')) return 'about';
    return 'other';
  }

  // UTM parameter capture
  var utmParams = {};
  try {
    var urlParams = new URLSearchParams(window.location.search);
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(function(key) {
      if (urlParams.get(key)) utmParams[key] = urlParams.get(key);
    });
  } catch (e) {}

  var pageType = detectPageType(window.location.pathname);

  // Build session data payload
  var sessionData = {
    device_type: deviceType,
    user_language: userLanguage,
    visitor_timezone: visitorTimezone,
    local_hour: localHour,
    day_of_week: dayOfWeek,
    is_returning: isReturning,
    visit_count: visitCount,
    visitor_id: visitorId,
    page_type: pageType,
    page_topic: '',
    page_url: window.location.href,
    page_path: window.location.pathname,
    referrer: document.referrer || '',
    utm: utmParams
  };

  // Store for cross-page awareness
  window.lfhPageContext = sessionData;

  // ============================================
  // 1b. PRELOAD BRAND FONT
  // ============================================
  var fontLink = document.createElement('link');
  fontLink.rel = 'preload';
  fontLink.as = 'font';
  fontLink.type = 'font/woff2';
  fontLink.href = CDN + '/fonts/NexaRustSansBlack2.woff2';
  fontLink.crossOrigin = 'anonymous';
  document.head.appendChild(fontLink);

  var fontStyle = document.createElement('style');
  fontStyle.textContent = "@font-face { font-family: 'Nexa Rust Sans Black 2'; src: url('" + CDN + "/fonts/NexaRustSansBlack2.woff2') format('woff2'); font-weight: normal; font-style: normal; font-display: swap; }";
  document.head.appendChild(fontStyle);

  // Force-load the font so it's available inside Shadow DOM
  if (document.fonts && document.fonts.load) {
    document.fonts.load("16px 'Nexa Rust Sans Black 2'").catch(function() {});
  }

  // ============================================
  // 1c. PRELOAD INTER FONT (needed at document level for Shadow DOM extensions)
  // ============================================
  var interLink = document.createElement('link');
  interLink.rel = 'stylesheet';
  interLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap';
  document.head.appendChild(interLink);

  // ============================================
  // 2. LOAD VOICEFLOW WIDGET BUNDLE + SNOWIFY
  // ============================================
  // Preload hint lets the browser start downloading the bundle alongside other resources
  // instead of waiting for the script tag to be parsed
  var bundleUrl = 'https://cdn.voiceflow.com/widget-next/bundle.mjs';
  var bundlePreload = document.createElement('link');
  bundlePreload.rel = 'preload';
  bundlePreload.as = 'script';
  bundlePreload.href = bundleUrl;
  document.head.appendChild(bundlePreload);

  var script = document.createElement('script');
  script.src = bundleUrl;
  script.type = 'text/javascript';
  document.head.appendChild(script);

  // Load Snowify library (snowfall animation dependency)
  var snowifyScript = document.createElement('script');
  snowifyScript.src = 'https://gauravkrp.com/snowify.min.js';
  document.head.appendChild(snowifyScript);

  await new Promise(function(resolve) { script.onload = resolve; });

  // ============================================
  // 3. LOAD EXTENSIONS
  // ============================================
  var extensions = [];
  try {
    if (useFallback) {
      // FALLBACK MODE: Only load lead capture + feedback (text-chat with forms)
      var [inputGateMod, leadMod, feedbackMod] = await Promise.all([
        import(CDN + '/extensions/lfh-input-gate.js'),
        import(CDN + '/extensions/lfh-lead-form.js'),
        import(CDN + '/extensions/lfh-feedback.js'),
      ]);
      extensions = [
        inputGateMod.LFHInputGate,
        leadMod.LastFrontierLeadForm_v4_Unified,
        feedbackMod.FeedbackExtension10,
      ].filter(Boolean);
    } else {
      // FULL MODE: Load all production extensions
      var [
        inputGateMod,
        leadMod, feedbackMod, ssWidgetMod, ssModalMod,
        lodgeWidgetMod, lodgeModalMod,
        tourGridMod, tourModalMod,
        weatherWidgetMod, weatherModalMod,
        welcomeGridMod, snowfallMod, hubModalMod,
        menuMod
      ] = await Promise.all([
        import(CDN + '/extensions/lfh-input-gate.js'),
        import(CDN + '/extensions/lfh-lead-form.js'),
        import(CDN + '/extensions/lfh-feedback.js'),
        import(CDN + '/extensions/lfh-selfservice-widget.js'),
        import(CDN + '/extensions/lfh-selfservice-modal.js'),
        import(CDN + '/extensions/lfh-lodges-widget.js'),
        import(CDN + '/extensions/lfh-lodges-modal.js'),
        import(CDN + '/extensions/lfh-tours-grid.js'),
        import(CDN + '/extensions/lfh-tours-modal.js'),
        import(CDN + '/extensions/lfh-weather-widget.js'),
        import(CDN + '/extensions/lfh-weather-modal.js'),
        import(CDN + '/extensions/lfh-welcome.js'),
        import(CDN + '/extensions/lfh-snowfall.js'),
        import(CDN + '/extensions/lfh-hub.js'),
        import(CDN + '/extensions/lfh-menu-button.js'),
      ]);
      extensions = [
        inputGateMod.LFHInputGate,
        leadMod.LastFrontierLeadForm_v4_Unified,
        feedbackMod.FeedbackExtension10,
        ssWidgetMod.LastFrontierBrowserSelfService_v4_Unified,
        lodgeWidgetMod.LFHLodgeCompareWidgetV2Unified,
        tourGridMod.LFHTourExplorerGridBookingUnified,
        weatherWidgetMod.LFHWeatherConditionsWidgetV2Unified,
        welcomeGridMod.LastFrontierWelcomeGridV2,
        snowfallMod.SnowfallExtension1,
        hubModalMod.LastFrontierHub,
      ].filter(Boolean);
    }
    console.log('[LFH] Extensions loaded:', extensions.length);
  } catch (err) {
    console.error('[LFH] Extension load error:', err);
    // Widget still works as text-only chat if extensions fail
  }

  // ============================================
  // 4. LOAD VOICEFLOW CHAT
  // ============================================
  await window.voiceflow.chat.load({
    verify: { projectID: VF_PROJECT_ID },
    url: 'https://general-runtime.voiceflow.com',
    versionID: VF_VERSION,
    launch: {
      event: {
        type: 'launch',
        payload: sessionData
      }
    },
    assistant: {
      stylesheet: CDN + '/css/LFH_styles.css',
      description: "Smart assistant — always good to double-check details",
      extensions: extensions
    },
    session: {
      resumeOnReload: true
    }
  });

  window.__lfh_load_time = Date.now();

  // ============================================
  // 5. POST-LOAD: Proactive messages (once per session)
  // ============================================
  var proactiveShown = false;
  try { proactiveShown = sessionStorage.getItem('lfh_proactive_shown') === '1'; } catch (e) {}

  if (!proactiveShown && deviceType !== 'mobile') {
    // Track widget open state via VoiceFlow postMessage events
    var widgetIsOpen = false;
    window.addEventListener('message', function(event) {
      try {
        var data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
        if (data.type === 'voiceflow:open') widgetIsOpen = true;
        if (data.type === 'voiceflow:close') widgetIsOpen = false;
      } catch (e) {}
    });

    setTimeout(function() {
      if (widgetIsOpen) return;
      window.voiceflow.chat.proactive.clear();
      window.voiceflow.chat.proactive.push({
        type: 'text',
        payload: { message: 'Curious about heliskiing in Northern BC?' }
      });
    }, 1000);

    setTimeout(function() {
      if (widgetIsOpen) return;
      window.voiceflow.chat.proactive.push({
        type: 'text',
        payload: { message: 'I can show you around!' }
      });
      try { sessionStorage.setItem('lfh_proactive_shown', '1'); } catch (e) {}
    }, 3000);
  }


  // ============================================
  // 6. POST-LOAD: Shadow DOM style injection
  // ============================================
  var shadowScript = document.createElement('script');
  shadowScript.src = CDN + '/styles/lastfrontier-shadow-inject.js?v=1.3.0';
  document.head.appendChild(shadowScript);

  // ============================================
  // 6b. POST-LOAD: Mobile font readability boost
  // ============================================
  var fontBoost = document.createElement('script');
  fontBoost.src = CDN + '/styles/lfh-mobile-font-boost.js?v=1.0.0';
  document.head.appendChild(fontBoost);

  // ============================================
  // 7. POST-LOAD: Notification sound
  // ============================================
  var soundScript = document.createElement('script');
  soundScript.src = CDN + '/styles/notification-sound.js';
  document.head.appendChild(soundScript);

  // ============================================
  // 8. CROSS-PAGE AWARENESS
  // ============================================
  var previousPage = null;
  try { previousPage = sessionStorage.getItem('lfh_current_page'); } catch (e) {}
  try { sessionStorage.setItem('lfh_current_page', pageType); } catch (e) {}

  if (previousPage && previousPage !== pageType) {
    // User navigated to a different page — silently update VoiceFlow variables
    setTimeout(function() {
      try {
        window.voiceflow.chat.interact({
          type: 'event',
          payload: {
            event: 'page_context_update',
            page_type: pageType,
            page_topic: '',
            page_path: window.location.pathname,
            page_url: window.location.href
          }
        });
      } catch (e) {
        console.warn('[LFH] Page context update failed:', e);
      }
    }, 2000);
  }

})();
