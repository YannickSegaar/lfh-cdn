/**
 * LFH Extension: Snowfall Animation
 * Production ID: lfh-snowfall
 * Trace types: ext_snowfall1
 * Origin: snowfall.js
 * Dependencies: none
 * Last modified: 2026-03-10
 */

// YRS: SNOWFALL EXTENSION VERSION 1 (27 OCT 2025)

// This extension is now designed to work with the Snowify library.
export const SnowfallExtension1 = {
  name: 'Snowfall',
  type: 'effect',

  // Match the exact Custom Action name from Voiceflow
  match: ({ trace }) => trace.type === 'ext_snowfall1',

  effect: ({ trace }) => {
    console.log('Snowfall extension triggered!', trace);

    // Wait for library to be available
    if (typeof initSnowify === 'undefined') {
      console.error('Snowify library not loaded yet, retrying...');
      setTimeout(() => {
        if (typeof initSnowify !== 'undefined') {
          executeSnowfall(trace);
        } else {
          console.error('Snowify library failed to load');
        }
      }, 1000);
      return;
    }

    executeSnowfall(trace);
  }
};

function executeSnowfall(trace) {
  const action = trace.payload?.action || 'start';

  if (action === 'start') {
    console.log('Starting Snowify effect...');
    const options = trace.payload?.options || {};
    initSnowify(options);
    // Auto-stop after 15 seconds with 2s fade-out
    setTimeout(() => {
      const snow = document.getElementById('snowify__snow');
      if (snow) {
        snow.style.transition = 'opacity 2s ease-out';
        snow.style.opacity = '0';
        setTimeout(() => snow.remove(), 2100);
      }
    }, 15000);
  } else if (action === 'stop') {
    console.log('Stopping Snowify effect...');
    const snow = document.getElementById('snowify__snow');
    if (snow) {
      snow.remove();
    }
  }
}

export default SnowfallExtension1;
