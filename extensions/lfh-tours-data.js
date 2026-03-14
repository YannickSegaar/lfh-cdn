/**
 * LFH Extension: Tours Data Constants
 * Production ID: lfh-tours-data
 * Trace types: N/A (utility)
 * Origin: lfh-tour-explorer-modal.js
 * Dependencies: none
 * Last modified: 2026-03-10
 */

/**
 * Last Frontier Tour Explorer - Shared Modal Module
 *
 * Full-screen overlay modal with filter bar, tour card grid,
 * compare mode, tour detail view with video embeds, and
 * VoiceFlow agent communication.
 *
 * Imported by all 3 in-chat widget variants (grid, carousel, tabs).
 *
 * @version 1.0.0
 * @author Last Frontier Heliskiing / RomAIx
 */

// ============================================================================
// TOUR DATA
// ============================================================================

export const LFH_TOURS = [
  {
    id: '4day',
    name: '4-Day Tour',
    subtitle: 'The Quick Getaway',
    description: 'Perfect for a focused heliski experience. Four days of world-class powder in the remote mountains of Northern BC, with a guaranteed 17,500 meters of vertical skiing. Available in March only.',
    lodges: ['bell2', 'ripley'],
    duration: '4 days',
    durationDays: 4,
    verticalGuarantee: '17,500m',
    months: ['mar'],
    pricing: {
      bell2: { peak: '$13,220' },
      ripley: { peak: '$11,770' },
    },
    pricingWeeks: [
      { tourNo: '2027-14-4', dates: 'Mar 12 - 16', bell2: '$13,220', ripley: '$11,770' },
    ],
    priceFrom: 11770,
    skillLevel: 'Intermediate-Expert / Expert',
    heroImage: 'https://yannicksegaar.github.io/lfh-cdn/images/tour-images/4day/4day_hero.png',
    thumbnailImage: 'https://www.lastfrontierheli.com/wp-content/uploads/2018/08/04_Last_Frontier_Backgrounder_Series_Day_In_The_Life-510x340.jpg',
    galleryImages: [
      'https://yannicksegaar.github.io/lfh-cdn/images/tour-images/4day/4day_hero.png',
      'https://yannicksegaar.github.io/lfh-cdn/images/tour-images/4day/4day_T.jpg',
      'https://yannicksegaar.github.io/lfh-cdn/images/tour-images/4day/4day_H.jpg',
      'https://yannicksegaar.github.io/lfh-cdn/images/tour-images/4day/4day_trees.png',
      'https://yannicksegaar.github.io/lfh-cdn/images/tour-images/4day/4day_heli.png',
      'https://yannicksegaar.github.io/lfh-cdn/images/tour-images/4day/4day_alpine.png',
      'https://www.lastfrontierheli.com/wp-content/uploads/2018/09/01-bell-2-lodge-heliski-village.jpg',
    ],
    bestFor: ['Quick Trip', 'Budget Friendly', 'March Only'],
  },
  {
    id: '5day',
    name: '5-Day Tour',
    subtitle: 'The Sweet Spot',
    description: 'Our most popular package balancing time and value. Five days of helicopter skiing with a 22,000-meter vertical guarantee. Available January through April at both lodges, this tour gives you enough time to settle into the rhythm of mountain life.',
    lodges: ['bell2', 'ripley'],
    duration: '5 days',
    durationDays: 5,
    verticalGuarantee: '22,000m',
    months: ['jan', 'feb', 'mar', 'apr'],
    pricing: {
      bell2: { early: '$13,210 - $14,570', peak: '$15,040 - $16,270', late: '$14,030 - $15,020' },
      ripley: { early: '$11,760 - $12,940', peak: '$13,370 - $14,450', late: '$12,460 - $13,360' },
    },
    pricingWeeks: [
      { tourNo: '2027-5-5', dates: 'Jan 13 - 18', bell2: '$13,210', ripley: '$11,760' },
      { tourNo: '2027-6-5', dates: 'Jan 18 - 23', bell2: '$14,570', ripley: '$12,940' },
      { tourNo: '2027-8-5', dates: 'Jan 30 - Feb 4', bell2: '$15,040', ripley: '$13,370' },
      { tourNo: '2027-9-5', dates: 'Feb 11 - 16', bell2: '$16,270', ripley: '$14,450' },
      { tourNo: '2027-10-5', dates: 'Feb 16 - 21', bell2: '$16,270', ripley: '$14,450' },
      { tourNo: '2027-12-5', dates: 'Feb 28 - Mar 5', bell2: '$16,270', ripley: '$14,450' },
      { tourNo: '2027-14-5', dates: 'Mar 16 - 21', bell2: '$16,270', ripley: '$14,450' },
      { tourNo: '2027-16-5', dates: 'Mar 28 - Apr 2', bell2: '$15,020', ripley: '$13,360' },
      { tourNo: '2027-17-5', dates: 'Apr 2 - 7', bell2: '$14,420', ripley: '$12,810' },
      { tourNo: '2027-18-5', dates: 'Apr 7 - 12', bell2: '$14,030', ripley: '$12,460' },
    ],
    verticalNote: 'Week 05-5 to 06-5: 17,600m guaranteed. Week 08-5 to 18-5: 22,000m guaranteed.',
    priceFrom: 11760,
    skillLevel: 'Intermediate-Expert / Expert',
    heroImage: 'https://yannicksegaar.github.io/lfh-cdn/images/tour-images/5day/5day_hero.png',
    thumbnailImage: 'https://www.lastfrontierheli.com/wp-content/uploads/2018/08/01_Last_Frontier_Backgrounder_Series_Location-510x339.jpg',
    galleryImages: [
      'https://yannicksegaar.github.io/lfh-cdn/images/tour-images/5day/5day_hero.png',
      'https://yannicksegaar.github.io/lfh-cdn/images/tour-images/5day/5day_T.jpg',
      'https://yannicksegaar.github.io/lfh-cdn/images/tour-images/5day/5day_H.jpg',
      'https://yannicksegaar.github.io/lfh-cdn/images/tour-images/5day/5day_trees.png',
      'https://yannicksegaar.github.io/lfh-cdn/images/tour-images/5day/5day_heli.png',
      'https://yannicksegaar.github.io/lfh-cdn/images/tour-images/5day/5day_alpine.png',
      'https://www.lastfrontierheli.com/wp-content/uploads/2018/09/05-bell-2-lodge-dusk.jpg',
    ],
    bestFor: ['Most Popular', 'Available Jan-Apr'],
  },
  {
    id: '7day',
    name: '7-Day Tour',
    subtitle: 'The Full Experience',
    description: 'The flagship Last Frontier tour. Seven days of heliskiing with a 30,500-meter vertical guarantee delivers the full immersion — maximum skiing, deepest disconnect, and the complete mountain lifestyle. The longer you stay, the better it gets.',
    lodges: ['bell2', 'ripley'],
    duration: '7 days',
    durationDays: 7,
    verticalGuarantee: '30,500m',
    months: ['jan', 'feb', 'mar'],
    pricing: {
      bell2: { early: '$16,750 - $18,030', peak: '$20,270 - $21,820', late: '$20,970' },
      ripley: { early: '$15,580 - $18,010', peak: '$19,380', late: '$18,630' },
    },
    pricingWeeks: [
      { tourNo: '2027-4', dates: 'Dec 30 - Jan 6', bell2: '$16,750', ripley: null },
      { tourNo: '2027-5', dates: 'Jan 6 - 13', bell2: '$18,030', ripley: '$15,580' },
      { tourNo: '2027-7', dates: 'Jan 23 - 30', bell2: '$20,270', ripley: '$18,010' },
      { tourNo: '2027-9', dates: 'Feb 4 - 11', bell2: '$21,820', ripley: '$19,380' },
      { tourNo: '2027-11', dates: 'Feb 21 - 28', bell2: '$21,820', ripley: '$19,380' },
      { tourNo: '2027-13', dates: 'Mar 5 - 12', bell2: '$21,820', ripley: '$19,380' },
      { tourNo: '2027-15', dates: 'Mar 21 - 28', bell2: '$20,970', ripley: '$18,630' },
    ],
    verticalNote: 'Week 04-07: 24,400m guaranteed. Week 09-15: 30,500m guaranteed.',
    priceFrom: 15580,
    skillLevel: 'Intermediate-Expert / Expert',
    heroImage: 'https://yannicksegaar.github.io/lfh-cdn/images/tour-images/7day/7day_hero.png',
    thumbnailImage: 'https://www.lastfrontierheli.com/wp-content/uploads/2018/08/03_Last_Frontier_Backgrounder_Series_Terrain-496x350.jpg',
    galleryImages: [
      'https://yannicksegaar.github.io/lfh-cdn/images/tour-images/7day/7day_hero.png',
      'https://yannicksegaar.github.io/lfh-cdn/images/tour-images/7day/7day_T.jpg',
      'https://yannicksegaar.github.io/lfh-cdn/images/tour-images/7day/7day_H.jpg',
      'https://yannicksegaar.github.io/lfh-cdn/images/tour-images/7day/7day_trees.png',
      'https://yannicksegaar.github.io/lfh-cdn/images/tour-images/7day/7day_heli.png',
      'https://yannicksegaar.github.io/lfh-cdn/images/tour-images/7day/7day_alpine.png',
      'https://www.lastfrontierheli.com/wp-content/uploads/2018/09/06-dining-room-bell-2-lodge.jpg',
    ],
    bestFor: ['Deeper Immersion', 'Great Value', 'Longer Weather Window'],
  },
  {
    id: 'safari7',
    name: '7-Day Safari',
    subtitle: 'Two Lodges, One Epic Journey',
    description: 'The flagship lodge-to-lodge safari — split between Bell 2 Lodge and Ripley Creek with a ground transfer in between. Three days at one lodge, four at the other, linking the high alpine glaciers of the Skeena Mountains with the steep pitches and tall timber of the Coast Mountains.',
    lodges: ['both'],
    duration: '7 days',
    durationDays: 7,
    verticalGuarantee: '30,500m',
    months: ['feb'],
    pricing: {
      safari: { peak: '$20,940' },
    },
    pricingWeeks: [
      { tourNo: '2027-9', dates: 'Feb 4 - 11', price: '$20,940' },
    ],
    priceFrom: 20940,
    skillLevel: 'Intermediate-Expert',
    heroImage: 'https://yannicksegaar.github.io/lfh-cdn/images/tour-images/safari7/safari7_hero.png',
    thumbnailImage: 'https://www.lastfrontierheli.com/wp-content/uploads/2018/08/02_Last_Frontier_Backgrounder_Series_Lodging-510x340.jpg',
    galleryImages: [
      'https://yannicksegaar.github.io/lfh-cdn/images/tour-images/safari7/safari7_hero.png',
      'https://yannicksegaar.github.io/lfh-cdn/images/tour-images/safari7/safari7_T.jpg',
      'https://yannicksegaar.github.io/lfh-cdn/images/tour-images/safari7/safari7_H.jpg',
      'https://yannicksegaar.github.io/lfh-cdn/images/tour-images/safari7/safari7_trees.png',
      'https://yannicksegaar.github.io/lfh-cdn/images/tour-images/safari7/safari7_heli.png',
      'https://yannicksegaar.github.io/lfh-cdn/images/tour-images/safari7/safari7_alpine.png',
      'https://yannicksegaar.github.io/lfh-cdn/images/tour-images/safari_tours_explanation.png',
      'https://www.lastfrontierheli.com/wp-content/uploads/2018/09/01-bell-2-lodge-heliski-village.jpg',
      'https://www.lastfrontierheli.com/wp-content/uploads/2018/09/02-ripley-creek-inn-stewart.jpg',
    ],
    videoId: '237992712',
    bestFor: ['Dual Lodge Experience', 'Full Terrain Immersion'],
  },
  {
    id: 'safari9',
    name: '9-Day Safari',
    subtitle: 'The In-Between',
    description: 'Five days at one lodge, four at the other — split between Bell 2 Lodge and Ripley Creek with a ground transfer in between.',
    lodges: ['both'],
    duration: '9 days',
    durationDays: 9,
    verticalGuarantee: '39,500m',
    months: ['mar'],
    pricing: {
      safari: { peak: '$25,070' },
    },
    pricingWeeks: [
      { tourNo: '2027-14-9', dates: 'Mar 12 - 21', price: '$25,070' },
    ],
    priceFrom: 25070,
    skillLevel: 'Intermediate-Expert',
    heroImage: 'https://yannicksegaar.github.io/lfh-cdn/images/tour-images/safari9/safari9_hero.png',
    thumbnailImage: 'https://yannicksegaar.github.io/lfh-cdn/images/tour-images/safari9/safari9_hero.png',
    galleryImages: [
      'https://yannicksegaar.github.io/lfh-cdn/images/tour-images/safari9/safari9_hero.png',
      'https://yannicksegaar.github.io/lfh-cdn/images/tour-images/safari9/safari9_T.jpg',
      'https://yannicksegaar.github.io/lfh-cdn/images/tour-images/safari9/safari9_H.jpg',
      'https://yannicksegaar.github.io/lfh-cdn/images/tour-images/safari9/safari9_trees.png',
      'https://yannicksegaar.github.io/lfh-cdn/images/tour-images/safari9/safari9_heli.png',
      'https://yannicksegaar.github.io/lfh-cdn/images/tour-images/safari9/safari9_alpine.png',
      'https://yannicksegaar.github.io/lfh-cdn/images/tour-images/safari_tours_explanation.png',
      'https://www.lastfrontierheli.com/wp-content/uploads/2018/09/01-bell-2-lodge-heliski-village.jpg',
      'https://www.lastfrontierheli.com/wp-content/uploads/2018/09/02-ripley-creek-inn-stewart.jpg',
    ],
    videoId: '237992712',
    bestFor: ['Dual Lodge Experience', 'Full Terrain Immersion', 'Legs of Steel'],
  },
  {
    id: 'safari10',
    name: '10-Day Safari',
    subtitle: 'The Ultimate Experience',
    description: 'The ultimate Last Frontier experience: five days at each lodge with a ground transfer in between. A 44,000-meter vertical guarantee across the full terrain spectrum of both the Coast and Skeena Mountains.',
    lodges: ['both'],
    duration: '10 days',
    durationDays: 10,
    verticalGuarantee: '44,000m',
    months: ['jan', 'feb', 'mar', 'apr'],
    pricing: {
      safari: { early: '$23,620', peak: '$27,660', late: '$25,020' },
    },
    pricingWeeks: [
      { tourNo: '2027-5-10', dates: 'Jan 13 - 23', price: '$23,620' },
      { tourNo: '2027-9-10', dates: 'Feb 11 - 21', price: '$27,660' },
      { tourNo: '2027-16-10', dates: 'Mar 28 - Apr 7', price: '$25,020' },
    ],
    priceFrom: 23620,
    skillLevel: 'Intermediate-Expert',
    heroImage: 'https://yannicksegaar.github.io/lfh-cdn/images/tour-images/safari10/safari10_hero.png',
    thumbnailImage: 'https://www.lastfrontierheli.com/wp-content/uploads/2018/08/06_Last_Frontier_Backgrounder_Series_The_Crew-510x340.jpg',
    galleryImages: [
      'https://yannicksegaar.github.io/lfh-cdn/images/tour-images/safari10/safari10_hero.png',
      'https://yannicksegaar.github.io/lfh-cdn/images/tour-images/safari10/safari10_T.jpg',
      'https://yannicksegaar.github.io/lfh-cdn/images/tour-images/safari10/safari10_H.jpg',
      'https://yannicksegaar.github.io/lfh-cdn/images/tour-images/safari10/safari10_trees.png',
      'https://yannicksegaar.github.io/lfh-cdn/images/tour-images/safari10/safari10_heli.png',
      'https://yannicksegaar.github.io/lfh-cdn/images/tour-images/safari10/safari10_alpine.png',
      'https://yannicksegaar.github.io/lfh-cdn/images/tour-images/safari_tours_explanation.png',
      'https://www.lastfrontierheli.com/wp-content/uploads/2018/09/01-bell-2-lodge-heliski-village.jpg',
      'https://www.lastfrontierheli.com/wp-content/uploads/2018/09/02-ripley-creek-inn-stewart.jpg',
    ],
    videoId: '256697044',
    bestFor: ['Dual Lodge Experience', 'Full Terrain Immersion', 'Legs of Steel'],
  },
  {
    id: 'private',
    name: 'Private Heli',
    subtitle: 'Your helicopter, private guide and unlimited vertical.',
    description: 'The most exclusive heliskiing concept: unlimited vertical with your own dedicated A-Star helicopter and two private ACMG-certified guides. Includes private transfers and meet-and-greet at all airports.',
    lodges: ['bell2', 'ripley'],
    duration: '5-7 days',
    durationDays: 6,
    verticalGuarantee: 'Unlimited',
    months: ['jan', 'feb', 'mar', 'apr'],
    pricing: {
      bell2: { early: 'From $93,150', peak: 'From $112,700' },
      ripley: { early: 'From $86,910', peak: 'From $103,900' },
    },
    pricingTwoGroup: {
      bell2: { early: 'From $145,250', peak: 'From $172,350' },
      ripley: { early: 'From $134,900', peak: 'From $157,360' },
    },
    priceFrom: 86910,
    skillLevel: 'Intermediate-Expert / Expert',
    heroImage: 'https://yannicksegaar.github.io/lfh-cdn/images/tour-images/private/private_hero.png',
    thumbnailImage: 'https://www.lastfrontierheli.com/wp-content/uploads/2018/08/05_Last_Frontier_Backgrounder_Series_Safety-510x340.jpg',
    galleryImages: [
      'https://yannicksegaar.github.io/lfh-cdn/images/tour-images/private/private_hero.png',
      'https://yannicksegaar.github.io/lfh-cdn/images/tour-images/private/private_T.jpg',
      'https://yannicksegaar.github.io/lfh-cdn/images/tour-images/private/private_H.jpg',
      'https://yannicksegaar.github.io/lfh-cdn/images/tour-images/private/private_trees.png',
      'https://yannicksegaar.github.io/lfh-cdn/images/tour-images/private/private_heli.png',
      'https://yannicksegaar.github.io/lfh-cdn/images/tour-images/private/private_alpine.png',
    ],
    videoId: '251401988',
    bestFor: ['Exclusive Groups', 'Unlimited Vertical', 'VIP Experience'],
  },
];

// ============================================================================
// SHARED CONSTANTS
// ============================================================================

export const LFH_COLORS = {
  primaryRed: '#e62b1e',
  textPrimary: '#42494e',
  textSecondary: '#666666',
  background: '#FFFFFF',
  infoBox: '#F5F5F5',
  border: '#E5E8EB',
  selectedTint: 'rgba(230, 43, 30, 0.04)',
};

export const LFH_ASSETS = {
  bgImage: 'https://yannicksegaar.github.io/lfh-cdn/images/LFH_bg_content_and_image_black.png',
  logo: 'https://yannicksegaar.github.io/lfh-cdn/images/LFH_Logo_FullName_White.svg',
  videoMask: 'https://www.lastfrontierheli.com/wp-content/themes/lastfrontier/dist/images/videos-img-mask.png',
};

export const LFH_VIDEOS = {
  dayInLife: { id: 'liycyjm5xs8', platform: 'youtube', title: 'A Day in the Life' },
  location: { id: '4CaKMMpebJM', platform: 'youtube', title: 'Location' },
  lodging: { id: 'RwYTOkbnEgw', platform: 'youtube', title: 'Lodging' },
  terrain: { id: '1zneyNdALjc', platform: 'youtube', title: 'Terrain' },
  safety: { id: 'irLz2GR0tpU', platform: 'youtube', title: 'Safety' },
  crew: { id: '256697044', platform: 'vimeo', title: 'The Crew' },
};

export function getVideoEmbedUrl(videoId) {
  if (/^\d+$/.test(videoId)) {
    return 'https://player.vimeo.com/video/' + videoId + '?autoplay=1&title=0&byline=0&portrait=0';
  }
  return 'https://www.youtube.com/embed/' + videoId + '?autoplay=1&rel=0';
}

const INCLUDED_ITEMS_REGULAR = [
  'Only 3 groups of 4 guests.',
  'Double occupancy accommodation and meals.',
  'Certified mountain guide services.',
  'Ski and snowboard equipment.',
  'All safety gear — ABS airbag, radio, probe and shovel.',
  'Return ground transfers from Terrace.',
];

const INCLUDED_ITEMS_PRIVATE = [
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
// HELPER: Lodge display name
// ============================================================================

function lodgeName(id) {
  if (id === 'bell2') return 'Bell 2 Lodge';
  if (id === 'ripley') return 'Ripley Creek';
  if (id === 'both') return 'Both Lodges';
  if (id === 'safari') return 'Safari';
  return id;
}

function lodgeBadgeColor(lodges) {
  if (lodges.includes('both')) return '#8B6914';
  if (lodges.includes('ripley') && lodges.includes('bell2')) return LFH_COLORS.primaryRed;
  if (lodges.includes('ripley')) return '#2E7D32';
  return '#1565C0';
}

// ============================================================================
// HELPER: VoiceFlow Agent Communication
// ============================================================================

function silentVariableUpdate(name, value) {
  try {
    if (window.voiceflow?.chat) {
      window.voiceflow.chat.proactive.push({ type: 'save', payload: { [name]: value } });
    }
  } catch (e) {
    // Silent fail - VF may not be available in test
  }
}

function interactWithAgent(type, payload) {
  try {
    if (window.voiceflow?.chat) {
      window.voiceflow.chat.interact({ type, payload });
    }
  } catch (e) {
    console.log('[TourExplorer] interact:', type, payload);
  }
}

// ============================================================================
// MODAL: Open
// ============================================================================

export function openTourExplorerModal(focusTourId = null) {
  if (document.getElementById('lfh-tour-explorer-modal')) return;

  // State
  let filteredTours = [...LFH_TOURS];
  let activeFilters = { lodge: 'all', duration: 'all', skill: 'all' };
  let compareTours = [];
  let currentView = 'grid'; // 'grid' | 'detail' | 'compare'
  let currentTourId = null;

  // --- Create Modal Shell ---
  const backdrop = document.createElement('div');
  backdrop.id = 'lfh-tour-explorer-modal';
  backdrop.style.cssText = `
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(0, 0, 0, 0.7); z-index: 10000;
    display: flex; justify-content: center; align-items: center;
    animation: lfhte-fadeIn 0.3s ease;
  `;

  const modal = document.createElement('div');
  modal.style.cssText = `
    width: 90%; max-width: 1000px; height: 85%; max-height: 800px;
    background: ${LFH_COLORS.background}; border-radius: 12px;
    overflow: hidden; display: flex; flex-direction: column;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    animation: lfhte-slideUp 0.4s ease;
  `;

  // --- Inject Styles ---
  const styleEl = document.createElement('style');
  styleEl.textContent = buildModalStyles();
  modal.appendChild(styleEl);

  // --- Header Bar ---
  const headerBar = document.createElement('div');
  headerBar.className = 'lfhte-header-bar';
  headerBar.innerHTML = `
    <div class="lfhte-header-left">
      <img src="${LFH_ASSETS.logo}" alt="LFH" class="lfhte-header-logo" />
      <span class="lfhte-header-title">Tour Explorer</span>
    </div>
    <button class="lfhte-close-btn" aria-label="Close">&times;</button>
  `;
  modal.appendChild(headerBar);

  // --- Filter Bar ---
  const filterBar = document.createElement('div');
  filterBar.className = 'lfhte-filter-bar';
  filterBar.innerHTML = `
    <div class="lfhte-filters-row">
      <div class="lfhte-filter-group">
        <label>Lodge</label>
        <select id="lfhte-filter-lodge">
          <option value="all">All Lodges</option>
          <option value="bell2">Bell 2 Lodge</option>
          <option value="ripley">Ripley Creek</option>
          <option value="both">Safari (Both)</option>
        </select>
      </div>
      <div class="lfhte-filter-group">
        <label>Duration</label>
        <select id="lfhte-filter-duration">
          <option value="all">All Durations</option>
          <option value="4">4-Day</option>
          <option value="5">5-Day</option>
          <option value="7">7-Day</option>
          <option value="safari7">7-Day Safari</option>
          <option value="safari9">9-Day Safari</option>
          <option value="safari10">10-Day Safari</option>
          <option value="private">Private</option>
        </select>
      </div>
      <div class="lfhte-filter-group">
        <label>Skill Level</label>
        <select id="lfhte-filter-skill">
          <option value="all">All Levels</option>
          <option value="intermediate">Intermediate-Expert</option>
          <option value="expert">Expert Only</option>
        </select>
      </div>
      <span class="lfhte-results-count" id="lfhte-results-count">${LFH_TOURS.length} tours</span>
    </div>
  `;
  modal.appendChild(filterBar);

  // --- Main Content Area ---
  const content = document.createElement('div');
  content.className = 'lfhte-content';
  content.id = 'lfhte-content';
  modal.appendChild(content);

  // --- Compare Tray (initially hidden) ---
  const compareTray = document.createElement('div');
  compareTray.className = 'lfhte-compare-tray';
  compareTray.id = 'lfhte-compare-tray';
  compareTray.style.display = 'none';
  modal.appendChild(compareTray);

  backdrop.appendChild(modal);
  document.body.appendChild(backdrop);

  // --- Render Initial Grid ---
  renderTourGrid();

  // Focus on specific tour if requested
  if (focusTourId) {
    const tour = LFH_TOURS.find((t) => t.id === focusTourId);
    if (tour) {
      setTimeout(() => renderTourDetail(tour), 300);
    }
  }

  // Silent variable update
  silentVariableUpdate('ext_last_action', 'tour_explorer_opened');

  // ========================================================================
  // RENDER: Tour Grid
  // ========================================================================

  function renderTourGrid() {
    currentView = 'grid';
    const grid = document.createElement('div');
    grid.className = 'lfhte-tour-grid';

    if (filteredTours.length === 0) {
      grid.innerHTML = `
        <div class="lfhte-no-results">
          <div class="lfhte-no-results-icon">&#9968;</div>
          <p>No tours match your filters</p>
          <button class="lfhte-btn-outline" id="lfhte-clear-filters">Clear Filters</button>
        </div>
      `;
      content.innerHTML = '';
      content.appendChild(grid);
      content.querySelector('#lfhte-clear-filters')?.addEventListener('click', () => {
        activeFilters = { lodge: 'all', duration: 'all', skill: 'all' };
        modal.querySelector('#lfhte-filter-lodge').value = 'all';
        modal.querySelector('#lfhte-filter-duration').value = 'all';
        modal.querySelector('#lfhte-filter-skill').value = 'all';
        applyFilters();
      });
      return;
    }

    filteredTours.forEach((tour) => {
      const card = document.createElement('div');
      card.className = 'lfhte-tour-card';
      const isComparing = compareTours.includes(tour.id);
      const lodgeBadges = tour.lodges.includes('both')
        ? `<span class="lfhte-lodge-badge" style="background:${lodgeBadgeColor(tour.lodges)}">Both Lodges</span>`
        : tour.lodges.length > 1
          ? `<span class="lfhte-lodge-badge" style="background:${lodgeBadgeColor(tour.lodges)}">${tour.lodges.map(lodgeName).join(' or ')}</span>`
          : `<span class="lfhte-lodge-badge" style="background:${lodgeBadgeColor(tour.lodges)}">${lodgeName(tour.lodges[0])}</span>`;
      const priceDisplay = `From $${tour.priceFrom.toLocaleString()} CAD`;

      card.innerHTML = `
        <div class="lfhte-card-image" style="background-image: url('${tour.heroImage}')">
          <div class="lfhte-card-badges">${lodgeBadges}</div>
        </div>
        <div class="lfhte-card-body">
          <h3 class="lfhte-card-title">${tour.name}</h3>
          <div class="lfhte-card-stats">
            <span>${tour.duration}</span>
            <span class="lfhte-stat-divider">|</span>
            <span>${tour.verticalGuarantee}</span>
            <span class="lfhte-stat-divider">|</span>
            <span>4 guests/guide</span>
          </div>
          <p class="lfhte-card-price">${priceDisplay}</p>
          <p class="lfhte-card-desc">${tour.description.substring(0, 100)}...</p>
          <div class="lfhte-card-actions">
            <button class="lfhte-btn-outline lfhte-compare-toggle ${isComparing ? 'active' : ''}" data-tour-id="${tour.id}">
              ${isComparing ? '&#10003; Comparing' : 'Compare'}
            </button>
            <button class="lfhte-btn-primary lfhte-view-detail" data-tour-id="${tour.id}">View Details</button>
          </div>
        </div>
      `;
      grid.appendChild(card);
    });

    content.innerHTML = '';
    content.appendChild(grid);

    // Attach event listeners
    content.querySelectorAll('.lfhte-view-detail').forEach((btn) => {
      btn.addEventListener('click', () => {
        const tour = LFH_TOURS.find((t) => t.id === btn.dataset.tourId);
        if (tour) renderTourDetail(tour);
      });
    });

    content.querySelectorAll('.lfhte-compare-toggle').forEach((btn) => {
      btn.addEventListener('click', () => toggleCompare(btn.dataset.tourId));
    });
  }

  // ========================================================================
  // RENDER: Tour Detail
  // ========================================================================

  function renderTourDetail(tour) {
    currentView = 'detail';
    currentTourId = tour.id;
    silentVariableUpdate('ext_current_tour', tour.id);

    const detail = document.createElement('div');
    detail.className = 'lfhte-detail';

    // Look up video title from LFH_VIDEOS
    const videoEntry = tour.videoId ? Object.values(LFH_VIDEOS).find((v) => v.id === tour.videoId) : null;
    const videoTitle = videoEntry ? videoEntry.title : '';

    // For tours without a dedicated video, pick a random one for the gallery
    const videoIds = Object.values(LFH_VIDEOS).map(v => v.id);
    const randomVideoId = !tour.videoId ? videoIds[Math.floor(Math.random() * videoIds.length)] : null;
    const randomVideoEntry = randomVideoId ? Object.values(LFH_VIDEOS).find(v => v.id === randomVideoId) : null;

    // Pricing: per-week tables when pricingWeeks exists, else fallback to Early/Peak
    let pricingHTML = '';
    const verticalNoteHTML = tour.verticalNote
      ? `<p class="lfhte-pricing-note" style="margin-top:6px;font-style:italic;">${tour.verticalNote}</p>`
      : '';

    if (tour.pricingWeeks) {
      const isSafari = tour.pricingWeeks[0] && tour.pricingWeeks[0].price;
      let rows = '';
      if (isSafari) {
        tour.pricingWeeks.forEach((week) => {
          rows += `<tr><td>${week.tourNo}</td><td>${week.dates}</td><td><strong>${week.price}</strong></td></tr>`;
        });
        pricingHTML = `
          <table class="lfhte-pricing-table">
            <thead><tr><th>Tour No.</th><th>Dates</th><th>Price</th></tr></thead>
            <tbody>${rows}</tbody>
          </table>
        ` + verticalNoteHTML;
      } else {
        tour.pricingWeeks.forEach((week) => {
          rows += `<tr><td>${week.tourNo}</td><td>${week.dates}</td><td>${week.bell2 || '—'}</td><td>${week.ripley || '—'}</td></tr>`;
        });
        pricingHTML = `
          <table class="lfhte-pricing-table">
            <thead><tr><th>Tour No.</th><th>Dates</th><th>Bell 2 Lodge</th><th>Ripley Creek</th></tr></thead>
            <tbody>${rows}</tbody>
          </table>
        ` + verticalNoteHTML;
      }
    } else {
      // Fallback: Early/Peak table (private tours)
      let pricingRows = '';
      if (tour.pricing.safari) {
        pricingRows = `<tr><td>Safari Rate</td><td>${tour.pricing.safari.peak || '—'}</td></tr>`;
      } else {
        const lodgeKeys = Object.keys(tour.pricing);
        lodgeKeys.forEach((key) => {
          const p = tour.pricing[key];
          pricingRows += `
            <tr>
              <td><strong>${lodgeName(key)}</strong></td>
              <td>${p.early || '—'}</td>
              <td>${p.peak || '—'}</td>
            </tr>
          `;
        });
      }
      const pricingHeader = tour.pricing.safari
        ? '<tr><th>Rate Type</th><th>Peak Season</th></tr>'
        : '<tr><th>Lodge</th><th>Dec &amp; Jan</th><th>Feb - Apr</th></tr>';
      pricingHTML = `
        <table class="lfhte-pricing-table">
          <thead>${pricingHeader}</thead>
          <tbody>${pricingRows}</tbody>
        </table>
      `;
    }

    // Gallery strip
    let galleryHTML = tour.galleryImages
      .map(
        (img, i) => `
        <div class="lfhte-gallery-thumb" style="background-image: url('${img}')" data-index="${i}"></div>
      `
      )
      .join('');

    // Add video thumbnail at end of gallery for tours without dedicated video
    if (randomVideoId) {
      galleryHTML += `<div class="lfhte-gallery-thumb lfhte-video-thumb" data-video-id="${randomVideoId}" data-video-title="${randomVideoEntry?.title || 'Video'}">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="white" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);filter:drop-shadow(0 1px 3px rgba(0,0,0,.5))"><polygon points="8,5 19,12 8,19"/></svg>
      </div>`;
    }

    // Included items
    const includedList = tour.id === 'private' ? INCLUDED_ITEMS_PRIVATE : INCLUDED_ITEMS_REGULAR;
    const includedHTML = includedList.map(
      (item) => `<div class="lfhte-included-item"><span class="lfhte-check-icon">&#10003;</span> ${item}</div>`
    ).join('');

    // Best for badges
    const bestForHTML = tour.bestFor
      .map((bf) => `<span class="lfhte-best-for-badge">${bf}</span>`)
      .join('');

    detail.innerHTML = `
      <div class="lfhte-detail-header">
        <button class="lfhte-back-btn" id="lfhte-back-to-grid">&larr; All Tours</button>
        <h2 class="lfhte-detail-title">${tour.name}</h2>
        <span class="lfhte-detail-subtitle">${tour.subtitle}</span>
      </div>

      <div class="lfhte-detail-scroll">
        <!-- Hero Media -->
        <div class="lfhte-hero-media" id="lfhte-hero-media">
          <div class="lfhte-hero-image" style="background-image: url('${tour.heroImage}')">
            ${tour.videoId ? `<button class="lfhte-play-btn" id="lfhte-play-video" data-video-id="${tour.videoId}">
              <span class="lfhte-play-triangle"></span>
            </button>
            <div class="lfhte-hero-label">Watch: ${videoTitle}</div>` : ''}
          </div>
        </div>

        <!-- Gallery Strip -->
        <div class="lfhte-gallery-strip">${galleryHTML}</div>

        <!-- Description -->
        <div class="lfhte-detail-section">
          <p class="lfhte-full-desc">${tour.description}</p>

          <div class="lfhte-best-for">${bestForHTML}</div>
        </div>

        <!-- Quick Stats -->
        <div class="lfhte-stats-bar">
          <div class="lfhte-stat-box">
            <div class="lfhte-stat-value">${tour.duration}</div>
            <div class="lfhte-stat-label">Duration</div>
          </div>
          <div class="lfhte-stat-box">
            <div class="lfhte-stat-value">${tour.verticalGuarantee}${tour.id !== 'private' ? '*' : ''}</div>
            <div class="lfhte-stat-label">Vertical Guarantee</div>
          </div>
          <div class="lfhte-stat-box">
            <div class="lfhte-stat-value">${tour.skillLevel.replace(' / Expert', '')}</div>
            <div class="lfhte-stat-label">Skill Level</div>
          </div>
          <div class="lfhte-stat-box">
            <div class="lfhte-stat-value">${tour.id === 'private' ? '1-2 groups' : '4:1'}</div>
            <div class="lfhte-stat-label">${tour.id === 'private' ? 'of 4 (up to 8 pax)' : 'Guest:Guide'}</div>
          </div>
        </div>
        ${tour.id !== 'private' ? '<p class="lfhte-vertical-note">*Vertical guarantee varies by week and time of season.</p>' : ''}

        <!-- Pricing Table -->
        <div class="lfhte-detail-section">
          <h3 class="lfhte-section-title">Pricing (CAD per person)</h3>
          ${pricingHTML}
          <p class="lfhte-pricing-note">${tour.id === 'private'
            ? '5% GST applies. 20% deposit to confirm. Unlimited vertical included — no extra charges.'
            : '5% GST applies. 20% deposit to confirm. Extra vertical: $218/1,000m.'
          }</p>
        </div>

        <!-- What's Included -->
        <div class="lfhte-detail-section">
          <h3 class="lfhte-section-title">What's Included</h3>
          <div class="lfhte-included-grid">${includedHTML}</div>
        </div>

        <!-- Action Buttons -->
        <div class="lfhte-detail-actions">
          <button class="lfhte-btn-primary lfhte-action-book" data-tour-id="${tour.id}">I Want to Book</button>
          <button class="lfhte-btn-outline lfhte-action-ask" data-tour-id="${tour.id}">Ask About This Tour</button>
          <button class="lfhte-btn-text lfhte-back-link" id="lfhte-back-link">Back to All Tours</button>
        </div>
      </div>
    `;

    content.innerHTML = '';
    content.appendChild(detail);

    // Event Listeners
    detail.querySelector('#lfhte-back-to-grid')?.addEventListener('click', renderTourGrid);
    detail.querySelector('#lfhte-back-link')?.addEventListener('click', renderTourGrid);

    // Gallery thumbnail click → swap hero image or play video
    detail.querySelectorAll('.lfhte-gallery-thumb').forEach((thumb) => {
      thumb.addEventListener('click', () => {
        const heroMedia = detail.querySelector('#lfhte-hero-media');
        const vidId = thumb.dataset.videoId;

        if (vidId) {
          // Video thumbnail — play the video
          heroMedia.innerHTML = `
            <div class="lfhte-video-embed">
              <iframe src="${getVideoEmbedUrl(vidId)}"
                allow="autoplay; fullscreen" allowfullscreen></iframe>
            </div>
          `;
        } else {
          // Photo thumbnail — show the image (no play button)
          const idx = parseInt(thumb.dataset.index);
          heroMedia.innerHTML = `
            <div class="lfhte-hero-image" style="background-image: url('${tour.galleryImages[idx]}')">
            </div>
          `;
        }
        // Highlight active thumbnail
        detail.querySelectorAll('.lfhte-gallery-thumb').forEach((t) => (t.style.borderColor = 'transparent'));
        thumb.style.borderColor = LFH_COLORS.primaryRed;
      });
    });

    detail.querySelector('#lfhte-play-video')?.addEventListener('click', (e) => {
      const videoId = e.currentTarget.dataset.videoId;
      const heroMedia = detail.querySelector('#lfhte-hero-media');
      heroMedia.innerHTML = `
        <div class="lfhte-video-embed">
          <iframe src="${getVideoEmbedUrl(videoId)}"
            allow="autoplay; fullscreen" allowfullscreen></iframe>
        </div>
      `;
    });

    detail.querySelector('.lfhte-action-book')?.addEventListener('click', () => {
      const priceRange = tour.pricing.safari
        ? tour.pricing.safari.peak
        : `From $${tour.priceFrom.toLocaleString()}`;
      interactWithAgent('booking_intent', {
        tourId: tour.id,
        tourName: tour.name,
        lodge: tour.lodges.join(', '),
        priceRange,
      });
      closeModal();
    });

    detail.querySelector('.lfhte-action-ask')?.addEventListener('click', () => {
      interactWithAgent('tour_inquiry', {
        tourId: tour.id,
        tourName: tour.name,
        lodge: tour.lodges.join(', '),
        duration: tour.duration,
      });
      closeModal();
    });
  }

  // ========================================================================
  // RENDER: Compare View
  // ========================================================================

  function renderCompareView() {
    currentView = 'compare';
    const tours = compareTours.map((id) => LFH_TOURS.find((t) => t.id === id)).filter(Boolean);

    silentVariableUpdate('ext_tours_compared', compareTours.join(','));

    const compare = document.createElement('div');
    compare.className = 'lfhte-compare';

    const headerCells = tours.map((t) => `<th class="lfhte-compare-th"><div class="lfhte-compare-tour-name">${t.name}</div><div class="lfhte-compare-tour-sub">${t.subtitle}</div></th>`).join('');

    const rows = [
      { label: 'Duration', fn: (t) => t.duration },
      { label: 'Vertical Guarantee', fn: (t) => t.verticalGuarantee },
      { label: 'Lodges', fn: (t) => t.lodges.map(lodgeName).join(' & ') },
      { label: 'Skill Level', fn: (t) => t.skillLevel },
      { label: 'Starting Price', fn: (t) => `$${t.priceFrom.toLocaleString()} CAD` },
      { label: 'Best For', fn: (t) => t.bestFor.join(', ') },
    ];

    const rowsHTML = rows
      .map(
        (row) =>
          `<tr><td class="lfhte-compare-label">${row.label}</td>${tours.map((t) => `<td>${row.fn(t)}</td>`).join('')}</tr>`
      )
      .join('');

    compare.innerHTML = `
      <div class="lfhte-compare-header">
        <button class="lfhte-back-btn" id="lfhte-compare-back">&larr; Back to Tours</button>
        <h2 class="lfhte-compare-title">Comparing ${tours.length} Tours</h2>
      </div>
      <div class="lfhte-compare-scroll">
        <table class="lfhte-compare-table">
          <thead><tr><th></th>${headerCells}</tr></thead>
          <tbody>${rowsHTML}</tbody>
        </table>
      </div>
      <div class="lfhte-compare-actions">
        <button class="lfhte-btn-outline" id="lfhte-compare-clear">Clear Comparison</button>
      </div>
    `;

    content.innerHTML = '';
    content.appendChild(compare);

    compare.querySelector('#lfhte-compare-back')?.addEventListener('click', renderTourGrid);
    compare.querySelector('#lfhte-compare-clear')?.addEventListener('click', () => {
      compareTours = [];
      updateCompareTray();
      renderTourGrid();
    });
  }

  // ========================================================================
  // COMPARE: Toggle & Tray
  // ========================================================================

  function toggleCompare(tourId) {
    const idx = compareTours.indexOf(tourId);
    if (idx >= 0) {
      compareTours.splice(idx, 1);
    } else if (compareTours.length < 3) {
      compareTours.push(tourId);
    }
    updateCompareTray();
    if (currentView === 'grid') renderTourGrid();
  }

  function updateCompareTray() {
    if (compareTours.length < 2) {
      compareTray.style.display = 'none';
      return;
    }

    compareTray.style.display = 'flex';
    const thumbs = compareTours
      .map((id) => {
        const t = LFH_TOURS.find((tour) => tour.id === id);
        return t
          ? `<div class="lfhte-tray-thumb">
               <div class="lfhte-tray-img" style="background-image:url('${t.thumbnailImage}')"></div>
               <span>${t.name}</span>
               <button class="lfhte-tray-remove" data-tour-id="${id}">&times;</button>
             </div>`
          : '';
      })
      .join('');

    compareTray.innerHTML = `
      <div class="lfhte-tray-tours">${thumbs}</div>
      <button class="lfhte-btn-primary lfhte-tray-compare-btn">Compare ${compareTours.length} Tours</button>
    `;

    compareTray.querySelectorAll('.lfhte-tray-remove').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleCompare(btn.dataset.tourId);
      });
    });

    compareTray.querySelector('.lfhte-tray-compare-btn')?.addEventListener('click', renderCompareView);
  }

  // ========================================================================
  // FILTERS
  // ========================================================================

  function applyFilters() {
    filteredTours = LFH_TOURS.filter((tour) => {
      // Lodge filter
      if (activeFilters.lodge !== 'all') {
        if (activeFilters.lodge === 'both') {
          if (!tour.lodges.includes('both')) return false;
        } else {
          if (!tour.lodges.includes(activeFilters.lodge) && !tour.lodges.includes('both')) return false;
        }
      }

      // Duration filter
      if (activeFilters.duration !== 'all') {
        const d = activeFilters.duration;
        if (d === 'private') {
          if (tour.id !== 'private') return false;
        } else if (d.startsWith('safari')) {
          if (tour.id !== d) return false;
        } else {
          if (tour.durationDays !== parseInt(d) || tour.id.startsWith('safari')) return false;
        }
      }

      // Skill filter
      if (activeFilters.skill !== 'all') {
        if (activeFilters.skill === 'expert' && !tour.skillLevel.includes('Expert')) return false;
        if (activeFilters.skill === 'intermediate' && tour.skillLevel === 'Expert Only') return false;
      }

      return true;
    });

    silentVariableUpdate('ext_filters_applied', JSON.stringify(activeFilters));
    modal.querySelector('#lfhte-results-count').textContent = `${filteredTours.length} tour${filteredTours.length !== 1 ? 's' : ''}`;
    renderTourGrid();
  }

  // Filter event listeners
  modal.querySelector('#lfhte-filter-lodge')?.addEventListener('change', (e) => {
    activeFilters.lodge = e.target.value;
    silentVariableUpdate('ext_current_lodge', e.target.value);
    applyFilters();
  });

  modal.querySelector('#lfhte-filter-duration')?.addEventListener('change', (e) => {
    activeFilters.duration = e.target.value;
    applyFilters();
  });

  modal.querySelector('#lfhte-filter-skill')?.addEventListener('change', (e) => {
    activeFilters.skill = e.target.value;
    applyFilters();
  });

  // ========================================================================
  // CLOSE MODAL
  // ========================================================================

  function showCloseConfirmation() {
    if (backdrop.querySelector('.lfhte-close-confirm-overlay')) return;

    const overlay = document.createElement('div');
    overlay.className = 'lfhte-close-confirm-overlay';
    overlay.innerHTML = `
      <div class="lfhte-close-confirm-card">
        <p class="lfhte-close-confirm-title">Are you sure you want to return to the conversation?</p>
        <p class="lfhte-close-confirm-sub">Want to come back? Just use the <strong>Menu</strong> button below the chat to open this again anytime.</p>
        <div class="lfhte-close-confirm-buttons">
          <button class="lfhte-close-confirm-yes">Yes, return to chat</button>
          <button class="lfhte-close-confirm-no">No, stay here</button>
        </div>
      </div>
    `;

    overlay.querySelector('.lfhte-close-confirm-yes').addEventListener('click', () => actualCloseModal());
    overlay.querySelector('.lfhte-close-confirm-no').addEventListener('click', () => overlay.remove());
    overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });

    backdrop.querySelector('div').appendChild(overlay);
  }

  function actualCloseModal() {
    interactWithAgent('tour_explorer_closed', {
      lastViewed: currentTourId,
      toursCompared: compareTours,
    });

    backdrop.style.animation = 'lfhte-fadeOut 0.3s ease forwards';
    setTimeout(() => {
      backdrop.remove();
    }, 300);
  }

  function closeModal() {
    showCloseConfirmation();
  }

  // Close handlers
  headerBar.querySelector('.lfhte-close-btn')?.addEventListener('click', closeModal);
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) closeModal();
  });
  document.addEventListener('keydown', function escHandler(e) {
    if (e.key === 'Escape' && document.getElementById('lfh-tour-explorer-modal')) {
      const confirmOverlay = backdrop.querySelector('.lfhte-close-confirm-overlay');
      if (confirmOverlay) {
        confirmOverlay.remove();
        return;
      }
      closeModal();
      document.removeEventListener('keydown', escHandler);
    }
  });
}

// ============================================================================
// STYLES
// ============================================================================

function buildModalStyles() {
  return `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap');

@font-face {
  font-family: 'Nexa Rust Sans Black 2';
  src: url('https://yannicksegaar.github.io/lfh-cdn/fonts/NexaRustSansBlack2.woff2') format('woff2');
  font-weight: 900;
  font-style: normal;
  font-display: swap;
}

/* Animations */
@keyframes lfhte-fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes lfhte-fadeOut { from { opacity: 1; } to { opacity: 0; } }

/* Close Confirmation */
.lfhte-close-confirm-overlay {
  position: absolute; top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0,0,0,0.5); z-index: 200;
  display: flex; align-items: center; justify-content: center;
  animation: lfhte-fadeIn 0.2s ease;
}
.lfhte-close-confirm-card {
  background: #fff; border-radius: 12px; padding: 24px;
  max-width: 400px; width: 90%; text-align: center;
  font-family: 'Inter', sans-serif;
  box-shadow: 0 8px 32px rgba(0,0,0,0.2);
}
.lfhte-close-confirm-title {
  font-size: 16px; font-weight: 700; color: ${LFH_COLORS.textPrimary};
  margin: 0;
}
.lfhte-close-confirm-sub {
  font-size: 13px; color: #b45309; margin: 12px 0 0;
  line-height: 1.6;
}
.lfhte-close-confirm-buttons {
  display: flex; flex-direction: column; gap: 12px; margin-top: 20px;
}
.lfhte-close-confirm-yes {
  width: 100%; padding: 10px 16px;
  background: ${LFH_COLORS.primaryRed}; color: #fff;
  border: none; border-radius: 8px;
  font-family: 'Inter', sans-serif; font-size: 13px;
  font-weight: 600; cursor: pointer; transition: background 0.2s;
}
.lfhte-close-confirm-yes:hover { background: #c4221a; }
.lfhte-close-confirm-no {
  width: 100%; padding: 10px 16px;
  background: #fff; color: ${LFH_COLORS.textPrimary};
  border: 1px solid ${LFH_COLORS.border}; border-radius: 8px;
  font-family: 'Inter', sans-serif; font-size: 13px;
  font-weight: 600; cursor: pointer; transition: all 0.2s;
}
.lfhte-close-confirm-no:hover { border-color: ${LFH_COLORS.primaryRed}; color: ${LFH_COLORS.primaryRed}; }

@keyframes lfhte-slideUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Header Bar */
.lfhte-header-bar {
  display: flex; align-items: center; justify-content: space-between;
  padding: 14px 20px; background: ${LFH_COLORS.textPrimary};
  flex-shrink: 0;
}
.lfhte-header-left { display: flex; align-items: center; gap: 12px; }
.lfhte-header-logo { height: 28px; filter: brightness(0) invert(1); }
.lfhte-header-title {
  font-family: 'Nexa Rust Sans Black 2', sans-serif;
  font-size: 16px; font-weight: 900; color: #fff;
  text-transform: uppercase; letter-spacing: 2px;
}
.lfhte-close-btn {
  background: rgba(255,255,255,0.1); border: none; color: #fff;
  font-size: 28px; cursor: pointer; padding: 0;
  width: 44px; height: 44px; display: flex;
  align-items: center; justify-content: center;
  border-radius: 50%; transition: background 0.2s;
}
.lfhte-close-btn:hover { background: rgba(255,255,255,0.2); }

/* Filter Bar */
.lfhte-filter-bar {
  padding: 12px 20px; background: ${LFH_COLORS.infoBox};
  border-bottom: 1px solid ${LFH_COLORS.border}; flex-shrink: 0;
}
.lfhte-filters-row {
  display: flex; gap: 12px; align-items: center; flex-wrap: wrap;
}
.lfhte-filter-group { display: flex; flex-direction: column; gap: 2px; flex: 1; min-width: 130px; }
.lfhte-filter-group label {
  font-family: 'Inter', sans-serif; font-size: 10px;
  font-weight: 700; color: ${LFH_COLORS.textSecondary};
  text-transform: uppercase; letter-spacing: 0.5px;
}
.lfhte-filter-group select {
  padding: 8px 10px; border: 1px solid ${LFH_COLORS.border};
  border-radius: 6px; font-family: 'Inter', sans-serif;
  font-size: 12px; color: ${LFH_COLORS.textPrimary};
  background: #fff; cursor: pointer; outline: none;
}
.lfhte-filter-group select:focus { border-color: ${LFH_COLORS.primaryRed}; }
.lfhte-results-count {
  font-family: 'Inter', sans-serif; font-size: 12px;
  font-weight: 600; color: ${LFH_COLORS.textSecondary};
  white-space: nowrap; margin-left: auto;
}

/* Content Area */
.lfhte-content {
  flex: 1; overflow-y: auto; padding: 20px;
  font-family: 'Inter', sans-serif;
}
.lfhte-content::-webkit-scrollbar { width: 6px; }
.lfhte-content::-webkit-scrollbar-track { background: ${LFH_COLORS.infoBox}; }
.lfhte-content::-webkit-scrollbar-thumb { background: ${LFH_COLORS.border}; border-radius: 3px; }

/* Tour Grid */
.lfhte-tour-grid {
  display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;
}
@media (max-width: 700px) {
  .lfhte-tour-grid { grid-template-columns: 1fr; }
}

/* Tour Card */
.lfhte-tour-card {
  border: 1.5px solid ${LFH_COLORS.border}; border-radius: 10px;
  overflow: hidden; transition: all 0.2s ease;
  background: #fff;
}
.lfhte-tour-card:hover {
  border-color: ${LFH_COLORS.primaryRed};
  box-shadow: 0 4px 16px rgba(230, 43, 30, 0.1);
}
.lfhte-card-image {
  height: 160px; background-size: cover;
  background-position: center; position: relative;
}
.lfhte-card-badges {
  position: absolute; top: 10px; right: 10px;
  display: flex; gap: 6px; flex-wrap: wrap;
}
.lfhte-lodge-badge {
  padding: 4px 10px; border-radius: 20px;
  font-size: 10px; font-weight: 600; color: #fff;
  text-transform: uppercase; letter-spacing: 0.3px;
}
.lfhte-card-body { padding: 14px; }
.lfhte-card-title {
  font-size: 16px; font-weight: 700;
  color: ${LFH_COLORS.primaryRed}; margin: 0 0 8px;
}
.lfhte-card-stats {
  font-size: 11px; color: ${LFH_COLORS.textSecondary};
  margin-bottom: 6px;
}
.lfhte-stat-divider { margin: 0 6px; opacity: 0.4; }
.lfhte-card-price {
  font-size: 14px; font-weight: 700;
  color: ${LFH_COLORS.textPrimary}; margin: 0 0 8px;
}
.lfhte-card-desc {
  font-size: 12px; color: ${LFH_COLORS.textSecondary};
  line-height: 1.5; margin: 0 0 12px;
  display: -webkit-box; -webkit-line-clamp: 2;
  -webkit-box-orient: vertical; overflow: hidden;
}
.lfhte-card-actions { display: flex; gap: 8px; }

/* Buttons */
.lfhte-btn-primary {
  flex: 1; padding: 10px 16px;
  background: ${LFH_COLORS.primaryRed}; color: #fff;
  border: none; border-radius: 6px; font-family: 'Inter', sans-serif;
  font-size: 12px; font-weight: 600; cursor: pointer;
  transition: all 0.2s; text-align: center;
}
.lfhte-btn-primary:hover { background: #c4221a; transform: translateY(-1px); }
.lfhte-btn-outline {
  flex: 1; padding: 10px 16px;
  background: #fff; color: ${LFH_COLORS.textPrimary};
  border: 1.5px solid ${LFH_COLORS.border}; border-radius: 6px;
  font-family: 'Inter', sans-serif; font-size: 12px;
  font-weight: 600; cursor: pointer; transition: all 0.2s;
  text-align: center;
}
.lfhte-btn-outline:hover {
  border-color: ${LFH_COLORS.primaryRed};
  color: ${LFH_COLORS.primaryRed};
}
.lfhte-btn-outline.active {
  background: ${LFH_COLORS.selectedTint};
  border-color: ${LFH_COLORS.primaryRed};
  color: ${LFH_COLORS.primaryRed};
}
.lfhte-btn-text {
  background: transparent; border: none;
  color: ${LFH_COLORS.textSecondary}; font-family: 'Inter', sans-serif;
  font-size: 12px; cursor: pointer; padding: 8px;
  transition: color 0.2s;
}
.lfhte-btn-text:hover { color: ${LFH_COLORS.primaryRed}; }

/* No Results */
.lfhte-no-results {
  grid-column: 1 / -1; text-align: center; padding: 60px 20px;
}
.lfhte-no-results-icon { font-size: 48px; margin-bottom: 12px; }
.lfhte-no-results p {
  font-size: 16px; color: ${LFH_COLORS.textSecondary}; margin-bottom: 16px;
}

/* Detail View */
.lfhte-detail { display: flex; flex-direction: column; height: 100%; }
.lfhte-detail-header {
  display: flex; align-items: center; gap: 12px; margin-bottom: 16px; flex-wrap: wrap;
}
.lfhte-back-btn {
  background: ${LFH_COLORS.infoBox}; border: 1px solid ${LFH_COLORS.border};
  border-radius: 6px; padding: 8px 14px;
  font-family: 'Inter', sans-serif; font-size: 11px;
  font-weight: 700; color: ${LFH_COLORS.textSecondary};
  cursor: pointer; transition: all 0.2s; text-transform: uppercase;
}
.lfhte-back-btn:hover {
  background: #eee; border-color: ${LFH_COLORS.primaryRed};
  color: ${LFH_COLORS.textPrimary};
}
.lfhte-detail-title {
  font-size: 22px; font-weight: 900; color: ${LFH_COLORS.textPrimary};
  margin: 0; font-family: 'Nexa Rust Sans Black 2', sans-serif;
  text-transform: uppercase; letter-spacing: 1px;
}
.lfhte-detail-subtitle {
  font-size: 13px; color: ${LFH_COLORS.textSecondary}; font-style: italic;
}
.lfhte-detail-scroll { flex: 1; overflow-y: auto; }

/* Hero Media */
.lfhte-hero-media { margin-bottom: 12px; }
.lfhte-hero-image {
  width: 100%; height: 280px; background-size: cover;
  background-position: center; border-radius: 10px;
  position: relative; display: flex;
  align-items: center; justify-content: center; cursor: pointer;
}
.lfhte-hero-image::after {
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(transparent 50%, rgba(0,0,0,0.6));
  border-radius: 10px; pointer-events: none;
}
.lfhte-play-btn {
  position: relative; z-index: 2;
  width: 64px; height: 64px; border-radius: 50%;
  background: rgba(255,255,255,0.9); border: none;
  cursor: pointer; display: flex; align-items: center;
  justify-content: center; transition: all 0.2s;
}
.lfhte-play-btn:hover {
  background: ${LFH_COLORS.primaryRed}; transform: scale(1.1);
}
.lfhte-play-btn:hover .lfhte-play-triangle {
  border-left-color: #fff;
}
.lfhte-play-triangle {
  width: 0; height: 0;
  border-left: 18px solid ${LFH_COLORS.textPrimary};
  border-top: 11px solid transparent;
  border-bottom: 11px solid transparent;
  margin-left: 4px; transition: border-color 0.2s;
}
.lfhte-hero-label {
  position: absolute; bottom: 14px; left: 14px; z-index: 2;
  color: #fff; font-size: 12px; font-weight: 600;
  text-shadow: 0 1px 4px rgba(0,0,0,0.5);
}
.lfhte-video-embed {
  width: 100%; aspect-ratio: 16/9; border-radius: 10px;
  overflow: hidden; background: #000;
}
.lfhte-video-embed iframe { width: 100%; height: 100%; border: none; }

/* Gallery Strip */
.lfhte-gallery-strip {
  display: flex; gap: 8px; overflow-x: auto;
  padding-bottom: 8px; margin-bottom: 16px;
}
.lfhte-gallery-strip::-webkit-scrollbar { height: 4px; }
.lfhte-gallery-strip::-webkit-scrollbar-thumb { background: ${LFH_COLORS.border}; border-radius: 2px; }
.lfhte-gallery-thumb {
  flex: 0 0 120px; height: 80px; border-radius: 8px;
  background-size: cover; background-position: center;
  border: 2px solid transparent; cursor: pointer; transition: all 0.2s;
}
.lfhte-gallery-thumb:hover { border-color: ${LFH_COLORS.primaryRed}; }
.lfhte-video-thumb {
  position: relative; background: #1a1a1a;
  display: flex; align-items: center; justify-content: center;
}

/* Detail Sections */
.lfhte-detail-section { margin-bottom: 20px; }
.lfhte-section-title {
  font-size: 14px; font-weight: 700; color: ${LFH_COLORS.textPrimary};
  margin: 0 0 10px; text-transform: uppercase; letter-spacing: 0.5px;
}
.lfhte-full-desc {
  font-size: 13px; line-height: 1.7; color: ${LFH_COLORS.textPrimary}; margin: 0 0 12px;
}
.lfhte-best-for { display: flex; gap: 6px; flex-wrap: wrap; }
.lfhte-best-for-badge {
  padding: 4px 12px; background: ${LFH_COLORS.infoBox};
  border: 1px solid ${LFH_COLORS.border}; border-radius: 20px;
  font-size: 11px; font-weight: 600; color: ${LFH_COLORS.textSecondary};
}

/* Stats Bar */
.lfhte-stats-bar {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px;
  margin-bottom: 20px;
}
.lfhte-stat-box {
  text-align: center; padding: 12px 8px;
  background: ${LFH_COLORS.infoBox}; border-radius: 8px;
}
.lfhte-stat-value {
  font-size: 14px; font-weight: 700; color: ${LFH_COLORS.primaryRed};
  margin-bottom: 2px;
}
.lfhte-stat-label {
  font-size: 10px; color: ${LFH_COLORS.textSecondary};
  text-transform: uppercase; letter-spacing: 0.3px;
}

/* Pricing Table */
.lfhte-pricing-table {
  width: 100%; border-collapse: collapse; font-size: 12px;
}
.lfhte-pricing-table th {
  padding: 10px 8px; background: ${LFH_COLORS.textPrimary};
  color: #fff; text-align: left; font-weight: 600;
  font-size: 11px; text-transform: uppercase;
}
.lfhte-pricing-table td {
  padding: 10px 8px; border-bottom: 1px solid ${LFH_COLORS.border};
  color: ${LFH_COLORS.textPrimary};
}
.lfhte-pricing-table tbody tr:hover { background: ${LFH_COLORS.selectedTint}; }
.lfhte-pricing-note {
  font-size: 11px; color: ${LFH_COLORS.textSecondary};
  margin-top: 8px; font-style: italic;
}
.lfhte-vertical-note {
  font-size: 11px; color: ${LFH_COLORS.textSecondary};
  font-style: italic; margin: 4px 0 0 0; text-align: center;
}

/* Included Grid */
.lfhte-included-grid {
  display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px;
}
.lfhte-included-item {
  font-size: 12px; color: ${LFH_COLORS.textPrimary};
  display: flex; align-items: center; gap: 6px;
}
.lfhte-check-icon { color: #2E7D32; font-weight: 700; }

/* Detail Actions */
.lfhte-detail-actions {
  display: flex; gap: 10px; align-items: center;
  padding: 16px 0; border-top: 1px solid ${LFH_COLORS.border};
  margin-top: 8px; flex-wrap: wrap;
}

/* Compare Tray */
.lfhte-compare-tray {
  display: flex; align-items: center; gap: 12px;
  padding: 12px 20px; background: ${LFH_COLORS.textPrimary};
  border-top: 1px solid rgba(255,255,255,0.1); flex-shrink: 0;
}
.lfhte-tray-tours { display: flex; gap: 10px; flex: 1; overflow-x: auto; }
.lfhte-tray-thumb {
  display: flex; align-items: center; gap: 8px;
  padding: 6px 10px; background: rgba(255,255,255,0.1);
  border-radius: 6px; flex-shrink: 0;
}
.lfhte-tray-img {
  width: 32px; height: 32px; border-radius: 4px;
  background-size: cover; background-position: center;
}
.lfhte-tray-thumb span { color: #fff; font-size: 11px; font-weight: 600; }
.lfhte-tray-remove {
  background: transparent; border: none; color: rgba(255,255,255,0.6);
  cursor: pointer; font-size: 16px; padding: 0; margin-left: 4px;
}
.lfhte-tray-remove:hover { color: #fff; }
.lfhte-tray-compare-btn {
  padding: 10px 20px; background: ${LFH_COLORS.primaryRed};
  color: #fff; border: none; border-radius: 6px;
  font-family: 'Inter', sans-serif; font-size: 12px;
  font-weight: 600; cursor: pointer; white-space: nowrap;
  transition: background 0.2s;
}
.lfhte-tray-compare-btn:hover { background: #c4221a; }

/* Compare View */
.lfhte-compare { display: flex; flex-direction: column; height: 100%; }
.lfhte-compare-header {
  display: flex; align-items: center; gap: 12px; margin-bottom: 16px;
}
.lfhte-compare-title {
  font-size: 18px; font-weight: 700; color: ${LFH_COLORS.textPrimary}; margin: 0;
}
.lfhte-compare-scroll { flex: 1; overflow: auto; }
.lfhte-compare-table {
  width: 100%; border-collapse: collapse; font-size: 13px;
}
.lfhte-compare-table th, .lfhte-compare-table td {
  padding: 12px; border: 1px solid ${LFH_COLORS.border};
  text-align: left; vertical-align: top; color: ${LFH_COLORS.textPrimary};
}
.lfhte-compare-th { background: ${LFH_COLORS.infoBox}; min-width: 160px; }
.lfhte-compare-tour-name {
  font-size: 14px; font-weight: 700; color: ${LFH_COLORS.primaryRed};
}
.lfhte-compare-tour-sub {
  font-size: 11px; color: ${LFH_COLORS.textSecondary}; margin-top: 2px;
}
.lfhte-compare-label { font-weight: 600; background: ${LFH_COLORS.infoBox}; white-space: nowrap; }
.lfhte-compare-actions {
  display: flex; gap: 10px; padding: 16px 0;
  border-top: 1px solid ${LFH_COLORS.border}; margin-top: 8px;
}

/* Mobile breakpoint */
@media (max-width: 500px) {
  .lfhte-stats-bar { grid-template-columns: repeat(2, 1fr); }
  .lfhte-pricing-table { display: block; overflow-x: auto; }
  .lfhte-compare-table { min-width: 500px; }
  .lfhte-hero-image { height: 200px; }
  .lfhte-filter-bar { padding: 10px 12px; }
  .lfhte-filter-group { min-width: 100px; }
  .lfhte-filter-group select { padding: 6px 8px; }
  .lfhte-included-grid { grid-template-columns: 1fr; }
}
`;
}
