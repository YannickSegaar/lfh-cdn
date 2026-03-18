/**
 * Last Frontier Tour Explorer - Enhanced Modal with Booking
 * VoiceFlow-Ready — Unified Event Architecture
 *
 * Self-contained version for VoiceFlow widget (no ES module imports).
 * Cross-modal navigation uses window.__lfh namespace.
 *
 * Uses the Unified Event Architecture for all agent interactions:
 *   - ext_user_action  (tour_inquiry, booking_request_submitted)
 *   - ext_modal_closed (tour_explorer)
 *
 * @version 2.0.0-vf
 * @author Last Frontier Heliskiing / RomAIx
 */

// ============================================================================
// SHARED CONSTANTS (inlined — no ES module import)
// ============================================================================

const LFH_COLORS_TE = {
  primaryRed: '#e62b1e',
  textPrimary: '#42494e',
  textSecondary: '#666666',
  background: '#FFFFFF',
  infoBox: '#F5F5F5',
  border: '#E5E8EB',
  selectedTint: 'rgba(230, 43, 30, 0.04)',
};

const LFH_ASSETS_TE = {
  bgImage: 'https://yannicksegaar.github.io/RomAIx-Logo/LFH_bg_content_and_image_black.png',
  logo: 'https://yannicksegaar.github.io/RomAIx-Logo/LFH_Logo_FullName_White.svg',
  videoMask: 'https://www.lastfrontierheli.com/wp-content/themes/lastfrontier/dist/images/videos-img-mask.png',
};

const LFH_VIDEOS_TE = {
  dayInLife: { id: 'liycyjm5xs8', platform: 'youtube', title: 'A Day in the Life' },
  location: { id: '4CaKMMpebJM', platform: 'youtube', title: 'Location' },
  lodging: { id: 'RwYTOkbnEgw', platform: 'youtube', title: 'Lodging' },
  terrain: { id: '1zneyNdALjc', platform: 'youtube', title: 'Terrain' },
  safety: { id: '251401988', platform: 'vimeo', title: 'Safety' },
  crew: { id: '256697044', platform: 'vimeo', title: 'The Crew' },
};

function _teGetVideoEmbedUrl(videoId) {
  // YouTube IDs contain letters; Vimeo IDs are purely numeric
  if (/^\d+$/.test(videoId)) {
    return 'https://player.vimeo.com/video/' + videoId + '?autoplay=1&title=0&byline=0&portrait=0';
  }
  return 'https://www.youtube.com/embed/' + videoId + '?autoplay=1&rel=0';
}

const LFH_TOURS_TE = [
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
    heroImage: { url: 'https://yannicksegaar.github.io/RomAIx-Logo/tour-images/4day/4day_hero.png', position: 'center center' },
    thumbnailImage: { url: 'https://www.lastfrontierheli.com/wp-content/uploads/2018/08/04_Last_Frontier_Backgrounder_Series_Day_In_The_Life.jpg', position: 'center 40%' },
    galleryImages: [
      { url: 'https://yannicksegaar.github.io/RomAIx-Logo/tour-images/4day/4day_AS.jpg', position: 'center 40%' },
      { url: 'https://yannicksegaar.github.io/RomAIx-Logo/tour-images/4day/4day_T.jpg', position: 'center 35%' },
      { url: 'https://yannicksegaar.github.io/RomAIx-Logo/tour-images/4day/4day_H.jpg', position: 'center 60%' },
      { url: 'https://yannicksegaar.github.io/RomAIx-Logo/tour-images/4day/4day_trees.png', position: 'center center' },
      { url: 'https://yannicksegaar.github.io/RomAIx-Logo/tour-images/4day/4day_heli.png', position: 'center center' },
      { url: 'https://yannicksegaar.github.io/RomAIx-Logo/tour-images/4day/4day_alpine.png', position: 'center center' },
      { url: 'https://www.lastfrontierheli.com/wp-content/uploads/2018/09/01-bell-2-lodge-heliski-village.jpg', position: 'center' },
    ],
    videoId: '4CaKMMpebJM',
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
    heroImage: { url: 'https://yannicksegaar.github.io/RomAIx-Logo/tour-images/5day/5day_hero.png', position: 'center center' },
    thumbnailImage: { url: 'https://www.lastfrontierheli.com/wp-content/uploads/2018/08/01_Last_Frontier_Backgrounder_Series_Location.jpg', position: 'center' },
    galleryImages: [
      { url: 'https://yannicksegaar.github.io/RomAIx-Logo/tour-images/5day/5day_AS.jpg', position: 'center 40%' },
      { url: 'https://yannicksegaar.github.io/RomAIx-Logo/tour-images/5day/5day_T.jpg', position: 'center 30%' },
      { url: 'https://yannicksegaar.github.io/RomAIx-Logo/tour-images/5day/5day_H.jpg', position: 'center 60%' },
      { url: 'https://yannicksegaar.github.io/RomAIx-Logo/tour-images/5day/5day_trees.png', position: 'center center' },
      { url: 'https://yannicksegaar.github.io/RomAIx-Logo/tour-images/5day/5day_heli.png', position: 'center center' },
      { url: 'https://yannicksegaar.github.io/RomAIx-Logo/tour-images/5day/5day_alpine.png', position: 'center center' },
      { url: 'https://www.lastfrontierheli.com/wp-content/uploads/2018/09/05-bell-2-lodge-dusk.jpg', position: 'center' },
    ],
    videoId: 'liycyjm5xs8',
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
    heroImage: { url: 'https://yannicksegaar.github.io/RomAIx-Logo/tour-images/7day/7day_hero.png', position: 'center center' },
    thumbnailImage: { url: 'https://www.lastfrontierheli.com/wp-content/uploads/2018/08/03_Last_Frontier_Backgrounder_Series_Terrain.jpg', position: 'center 35%' },
    galleryImages: [
      { url: 'https://yannicksegaar.github.io/RomAIx-Logo/tour-images/7day/7day_AS.jpg', position: 'center 40%' },
      { url: 'https://yannicksegaar.github.io/RomAIx-Logo/tour-images/7day/7day_T.jpg', position: 'center 30%' },
      { url: 'https://yannicksegaar.github.io/RomAIx-Logo/tour-images/7day/7day_H.jpg', position: 'center 55%' },
      { url: 'https://yannicksegaar.github.io/RomAIx-Logo/tour-images/7day/7day_trees.png', position: 'center center' },
      { url: 'https://yannicksegaar.github.io/RomAIx-Logo/tour-images/7day/7day_heli.png', position: 'center center' },
      { url: 'https://yannicksegaar.github.io/RomAIx-Logo/tour-images/7day/7day_alpine.png', position: 'center center' },
      { url: 'https://www.lastfrontierheli.com/wp-content/uploads/2018/09/06-dining-room-bell-2-lodge.jpg', position: 'center' },
    ],
    videoId: '1zneyNdALjc',
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
    heroImage: { url: 'https://yannicksegaar.github.io/RomAIx-Logo/tour-images/safari7/safari7_hero.png', position: 'center center' },
    thumbnailImage: { url: 'https://www.lastfrontierheli.com/wp-content/uploads/2018/08/02_Last_Frontier_Backgrounder_Series_Lodging.jpg', position: 'center' },
    galleryImages: [
      { url: 'https://yannicksegaar.github.io/RomAIx-Logo/tour-images/safari7/safari7_AS.jpg', position: 'center 35%' },
      { url: 'https://yannicksegaar.github.io/RomAIx-Logo/tour-images/safari7/safari7_T.jpg', position: 'center 30%' },
      { url: 'https://yannicksegaar.github.io/RomAIx-Logo/tour-images/safari7/safari7_H.jpg', position: 'center 55%' },
      { url: 'https://yannicksegaar.github.io/RomAIx-Logo/tour-images/safari7/safari7_trees.png', position: 'center center' },
      { url: 'https://yannicksegaar.github.io/RomAIx-Logo/tour-images/safari7/safari7_heli.png', position: 'center center' },
      { url: 'https://yannicksegaar.github.io/RomAIx-Logo/tour-images/safari7/safari7_alpine.png', position: 'center center' },
      { url: 'https://yannicksegaar.github.io/RomAIx-Logo/tour-images/safari_tours_explanation.png', position: 'center center' },
      { url: 'https://www.lastfrontierheli.com/wp-content/uploads/2018/09/01-bell-2-lodge-heliski-village.jpg', position: 'center' },
      { url: 'https://www.lastfrontierheli.com/wp-content/uploads/2018/09/02-ripley-creek-inn-stewart.jpg', position: 'center' },
    ],
    videoId: '109863996',
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
    heroImage: { url: 'https://yannicksegaar.github.io/RomAIx-Logo/tour-images/safari9/safari9_hero.png', position: 'center center' },
    thumbnailImage: { url: 'https://www.lastfrontierheli.com/wp-content/uploads/2018/08/02_Last_Frontier_Backgrounder_Series_Lodging.jpg', position: 'center' },
    galleryImages: [
      { url: 'https://yannicksegaar.github.io/RomAIx-Logo/tour-images/safari9/safari9_AS.jpg', position: 'center 35%' },
      { url: 'https://yannicksegaar.github.io/RomAIx-Logo/tour-images/safari9/safari9_T.jpg', position: 'center 30%' },
      { url: 'https://yannicksegaar.github.io/RomAIx-Logo/tour-images/safari9/safari9_H.jpg', position: 'center 55%' },
      { url: 'https://yannicksegaar.github.io/RomAIx-Logo/tour-images/safari9/safari9_trees.png', position: 'center center' },
      { url: 'https://yannicksegaar.github.io/RomAIx-Logo/tour-images/safari9/safari9_heli.png', position: 'center center' },
      { url: 'https://yannicksegaar.github.io/RomAIx-Logo/tour-images/safari9/safari9_alpine.png', position: 'center center' },
      { url: 'https://yannicksegaar.github.io/RomAIx-Logo/tour-images/safari_tours_explanation.png', position: 'center center' },
      { url: 'https://www.lastfrontierheli.com/wp-content/uploads/2018/09/01-bell-2-lodge-heliski-village.jpg', position: 'center' },
      { url: 'https://www.lastfrontierheli.com/wp-content/uploads/2018/09/02-ripley-creek-inn-stewart.jpg', position: 'center' },
    ],
    videoId: '109863996',
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
    heroImage: { url: 'https://yannicksegaar.github.io/RomAIx-Logo/tour-images/safari10/safari10_hero.png', position: 'center center' },
    thumbnailImage: { url: 'https://www.lastfrontierheli.com/wp-content/uploads/2018/08/06_Last_Frontier_Backgrounder_Series_The_Crew.jpg', position: 'center 30%' },
    galleryImages: [
      { url: 'https://yannicksegaar.github.io/RomAIx-Logo/tour-images/safari10/safari10_AS.jpg', position: 'center 40%' },
      { url: 'https://yannicksegaar.github.io/RomAIx-Logo/tour-images/safari10/safari10_T.jpg', position: 'center 30%' },
      { url: 'https://yannicksegaar.github.io/RomAIx-Logo/tour-images/safari10/safari10_H.jpg', position: 'center 55%' },
      { url: 'https://yannicksegaar.github.io/RomAIx-Logo/tour-images/safari10/safari10_trees.png', position: 'center center' },
      { url: 'https://yannicksegaar.github.io/RomAIx-Logo/tour-images/safari10/safari10_heli.png', position: 'center center' },
      { url: 'https://yannicksegaar.github.io/RomAIx-Logo/tour-images/safari10/safari10_alpine.png', position: 'center center' },
      { url: 'https://yannicksegaar.github.io/RomAIx-Logo/tour-images/safari_tours_explanation.png', position: 'center center' },
      { url: 'https://www.lastfrontierheli.com/wp-content/uploads/2018/09/01-bell-2-lodge-heliski-village.jpg', position: 'center' },
      { url: 'https://www.lastfrontierheli.com/wp-content/uploads/2018/09/02-ripley-creek-inn-stewart.jpg', position: 'center' },
    ],
    videoId: '109863996',
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
    heroImage: { url: 'https://yannicksegaar.github.io/RomAIx-Logo/tour-images/private/private_hero.png', position: 'center center' },
    thumbnailImage: { url: 'https://www.lastfrontierheli.com/wp-content/uploads/2018/08/05_Last_Frontier_Backgrounder_Series_Safety.jpg', position: 'center' },
    galleryImages: [
      { url: 'https://yannicksegaar.github.io/RomAIx-Logo/tour-images/private/private_AS.jpg', position: 'center 35%' },
      { url: 'https://yannicksegaar.github.io/RomAIx-Logo/tour-images/private/private_T.jpg', position: 'center 30%' },
      { url: 'https://yannicksegaar.github.io/RomAIx-Logo/tour-images/private/private_H.jpg', position: 'center 60%' },
      { url: 'https://yannicksegaar.github.io/RomAIx-Logo/tour-images/private/private_trees.png', position: 'center center' },
      { url: 'https://yannicksegaar.github.io/RomAIx-Logo/tour-images/private/private_heli.png', position: 'center center' },
      { url: 'https://yannicksegaar.github.io/RomAIx-Logo/tour-images/private/private_alpine.png', position: 'center center' },
    ],
    videoId: '1017723435',
    bestFor: ['Exclusive Groups', 'Unlimited Vertical', 'VIP Experience'],
  },
];

const INCLUDED_ITEMS_REGULAR_TE = [
  'Only 3 groups of 4 guests.',
  'Double occupancy accommodation and meals.',
  'Certified mountain guide services.',
  'Ski and snowboard equipment.',
  'All safety gear — ABS airbag, radio, probe and shovel.',
  'Return ground transfers from Terrace.',
];

const INCLUDED_ITEMS_PRIVATE_TE = [
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
// CROSS-MODAL NAMESPACE
// ============================================================================

window.__lfh = window.__lfh || {};

// ============================================================================
// HELPERS (prefixed to avoid collisions)
// ============================================================================

/** Extract url/position from image config (supports string or {url, position} object) */
function _teImgUrl(img) { return typeof img === 'string' ? img : img.url; }
function _teImgPos(img) { return (typeof img === 'string' ? 'center' : img.position) || 'center'; }

function _teLodgeName(id) {
  if (id === 'bell2') return 'Bell 2 Lodge';
  if (id === 'ripley') return 'Ripley Creek';
  if (id === 'both') return 'Both Lodges';
  if (id === 'safari') return 'Safari';
  return id;
}

function _teLodgeBadgeColor(lodges) {
  if (lodges.includes('both')) return '#8B6914';
  if (lodges.includes('ripley') && lodges.includes('bell2')) return LFH_COLORS_TE.primaryRed;
  if (lodges.includes('ripley')) return '#2E7D32';
  return '#1565C0';
}

function _teBuildTwoGroupPricingHTML(tour, isMobile, onCompareLodges) {
  if (!tour.pricingTwoGroup) return '';
  if (isMobile) {
    var cardsHTML = '';
    var lodgeKeys = Object.keys(tour.pricingTwoGroup);
    lodgeKeys.forEach(function (key) {
      var p = tour.pricingTwoGroup[key];
      cardsHTML += '\
        <div class="lfhte-pricing-card">\
          <div class="lfhte-pricing-card-label"><strong>' + _teLodgeName(key) + '</strong></div>\
          ' + (p.early ? '<div class="lfhte-pricing-card-row"><span>Dec-Jan</span><strong>' + p.early + '</strong></div>' : '') + '\
          ' + (p.peak ? '<div class="lfhte-pricing-card-row"><span>Feb-Apr</span><strong>' + p.peak + '</strong></div>' : '') + '\
        </div>\
      ';
    });
    return '<div class="lfhte-pricing-cards">' + cardsHTML + '</div>';
  } else {
    var rows = '';
    var lodgeKeys = Object.keys(tour.pricingTwoGroup);
    lodgeKeys.forEach(function (key) {
      var p = tour.pricingTwoGroup[key];
      rows += '<tr><td><strong>' + _teLodgeName(key) + '</strong></td><td>' + (p.early || '\u2014') + '</td><td>' + (p.peak || '\u2014') + '</td></tr>';
    });
    return '\
      <table class="lfhte-pricing-table">\
        <thead><tr><th>Lodge</th><th>Dec-Jan</th><th>Feb-Apr</th></tr></thead>\
        <tbody>' + rows + '</tbody>\
      </table>\
    ';
  }
}

function _teSilentVariableUpdate(name, value) {
  try {
    if (window.voiceflow?.chat) {
      window.voiceflow.chat.proactive.push({ type: 'save', payload: { [name]: value } });
    }
  } catch (e) { /* silent */ }
}

function _teInteractWithAgent(eventName, data) {
  try {
    window.voiceflow?.chat?.interact({
      type: 'event',
      payload: {
        event: { name: eventName },
        data: data
      }
    });
  } catch (e) { console.log('[TourExplorer] interact error:', e); }
}

// ============================================================================
// MODAL: Open
// ============================================================================

/**
 * @param {string|null} focusTourId - Tour ID to focus on immediately
 * @param {Object} config
 * @param {string} [config.bookingVariant='replace'] - 'replace' or 'slide'
 * @param {string} [config.webhookUrl=''] - n8n webhook endpoint
 * @param {string|null} [config.conversationId]
 * @param {string|null} [config.userId]
 * @param {string} [config.initialLodgeFilter='all']
 * @param {Function|null} [config.onCompareLodges]
 * @param {Function|null} [config.onCheckConditions]
 */
function openTourExplorerModal(focusTourId, config) {
  if (document.getElementById('lfh-tour-explorer-modal')) return;

  focusTourId = focusTourId || null;
  config = config || {};

  var bookingVariant = config.bookingVariant || 'replace';
  var webhookUrl = config.webhookUrl || '';
  var conversationId = config.conversationId || null;
  var userId = config.userId || null;
  var initialLodgeFilter = config.initialLodgeFilter || 'all';
  var isMobile = config.isMobile || false;
  var onCompareLodges = config.onCompareLodges || null;
  var onCheckConditions = config.onCheckConditions || null;

  var C = LFH_COLORS_TE;

  // State
  var filteredTours = LFH_TOURS_TE.slice();
  var activeFilters = { lodge: initialLodgeFilter, duration: 'all', season: [] };
  var compareTours = [];
  var currentView = 'grid'; // 'grid' | 'detail' | 'compare' | 'booking'
  var currentTourId = null;
  var actionTaken = false;
  var abortController = new AbortController();

  // --- Create Modal Shell ---
  var backdrop = document.createElement('div');
  backdrop.id = 'lfh-tour-explorer-modal';
  backdrop.style.cssText = '\
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;\
    background: rgba(0, 0, 0, 0.7); z-index: 10000;\
    display: flex; justify-content: center; align-items: center;\
    animation: lfhte-fadeIn 0.3s ease;\
  ';

  var modal = document.createElement('div');
  modal.style.cssText = '\
    width: 90%; max-width: 1000px; height: 85%; max-height: 800px;\
    background: ' + C.background + '; border-radius: 12px;\
    overflow: hidden; display: flex; flex-direction: column;\
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);\
    animation: lfhte-slideUp 0.4s ease;\
    position: relative;\
  ';

  // --- Inject Styles ---
  var styleEl = document.createElement('style');
  styleEl.textContent = _teBuildModalStyles(C) + _teBuildSlidePanelStyles(C) + (isMobile ? _teBuildMobileOverrides(C) : '');
  modal.appendChild(styleEl);

  // Apply mobile class for CSS targeting
  if (isMobile) modal.classList.add('lfhte-mobile');

  // --- Header Bar ---
  var headerBar = document.createElement('div');
  headerBar.className = 'lfhte-header-bar';
  headerBar.innerHTML = '\
    <span class="lfhte-header-title">Last Frontier Heliskiing</span>\
    <button class="lfhte-close-btn" aria-label="Close">&times;</button>\
  ';
  modal.appendChild(headerBar);

  // --- Filter Bar ---
  var filterBar = document.createElement('div');
  filterBar.className = 'lfhte-filter-bar';
  filterBar.id = 'lfhte-filter-bar';
  filterBar.innerHTML = '\
    <div class="lfhte-filters-row">\
      <div class="lfhte-filter-group">\
        <label>Lodge</label>\
        <select id="lfhte-filter-lodge">\
          <option value="all">All Lodges</option>\
          <option value="bell2">Bell 2 Lodge</option>\
          <option value="ripley">Ripley Creek</option>\
          <option value="both">Safari (Both)</option>\
        </select>\
      </div>\
      <div class="lfhte-filter-group">\
        <label>Duration</label>\
        <select id="lfhte-filter-duration">\
          <option value="all">All Durations</option>\
          <option value="4">4-Day</option>\
          <option value="5">5-Day</option>\
          <option value="7">7-Day</option>\
          <option value="safari">Safari</option>\
          <option value="private">Private</option>\
        </select>\
      </div>\
      <div class="lfhte-filter-group lfhte-season-multi">\
        <label>Time of Season</label>\
        <div class="lfhte-multi-select" id="lfhte-filter-season">\
          <div class="lfhte-multi-select-btn" id="lfhte-season-btn">All Months</div>\
          <div class="lfhte-multi-select-dropdown" id="lfhte-season-dropdown" style="display:none;">\
            <label class="lfhte-multi-select-item"><input type="checkbox" value="jan"> January</label>\
            <label class="lfhte-multi-select-item"><input type="checkbox" value="feb"> February</label>\
            <label class="lfhte-multi-select-item"><input type="checkbox" value="mar"> March</label>\
            <label class="lfhte-multi-select-item"><input type="checkbox" value="apr"> April</label>\
          </div>\
        </div>\
      </div>\
      <span class="lfhte-results-count" id="lfhte-results-count">' + LFH_TOURS_TE.length + ' tours</span>\
      ' + (onCompareLodges ? '<button class="lfhte-compare-lodges-link" id="lfhte-compare-lodges-btn">&#9776; Compare Lodges</button>' : '') + '\
      ' + (onCheckConditions ? '<button class="lfhte-conditions-link" id="lfhte-check-conditions-btn">&#9729; Conditions</button>' : '') + '\
    </div>\
  ';
  modal.appendChild(filterBar);

  // --- Compare Lodges button handler ---
  if (onCompareLodges) {
    filterBar.querySelector('#lfhte-compare-lodges-btn')?.addEventListener('click', function () {
      actionTaken = true;
      actualCloseModal();
      setTimeout(function () { onCompareLodges(); }, 350);
    });
  }

  // --- Check Conditions button handler ---
  if (onCheckConditions) {
    filterBar.querySelector('#lfhte-check-conditions-btn')?.addEventListener('click', function () {
      actionTaken = true;
      actualCloseModal();
      setTimeout(function () { onCheckConditions(); }, 350);
    });
  }

  // --- Main Content Area ---
  var content = document.createElement('div');
  content.className = 'lfhte-content';
  content.id = 'lfhte-content';
  modal.appendChild(content);

  // --- Compare Tray ---
  var compareTray = document.createElement('div');
  compareTray.className = 'lfhte-compare-tray';
  compareTray.id = 'lfhte-compare-tray';
  compareTray.style.display = 'none';
  modal.appendChild(compareTray);

  // --- Slide Panel (for 'slide' variant) ---
  var slidePanel = document.createElement('div');
  slidePanel.className = 'lfhte-sp-overlay';
  slidePanel.id = 'lfhte-sp-overlay';
  slidePanel.style.display = 'none';
  slidePanel.innerHTML = '\
    <div class="lfhte-sp-backdrop"></div>\
    <div class="lfhte-sp-panel" id="lfhte-sp-panel">\
      <div class="lfhte-sp-header">\
        <button class="lfhte-sp-back" id="lfhte-sp-back">&larr; Back to Tour</button>\
        <span class="lfhte-sp-title">Booking Request</span>\
      </div>\
      <div class="lfhte-sp-content" id="lfhte-sp-content"></div>\
    </div>\
  ';
  modal.appendChild(slidePanel);

  backdrop.appendChild(modal);
  document.body.appendChild(backdrop);

  // --- Apply initial lodge filter if set ---
  if (initialLodgeFilter !== 'all') {
    modal.querySelector('#lfhte-filter-lodge').value = initialLodgeFilter;
    filteredTours = LFH_TOURS_TE.filter(function (tour) {
      if (initialLodgeFilter === 'both') {
        return tour.lodges.includes('both');
      }
      return tour.lodges.includes(initialLodgeFilter) || tour.lodges.includes('both');
    });
    modal.querySelector('#lfhte-results-count').textContent =
      filteredTours.length + ' tour' + (filteredTours.length !== 1 ? 's' : '');
  }

  // --- Render Initial Grid ---
  renderTourGrid();

  if (focusTourId) {
    var focusTour = LFH_TOURS_TE.find(function (t) { return t.id === focusTourId; });
    if (focusTour) {
      setTimeout(function () { renderTourDetail(focusTour); }, 300);
    }
  }

  _teSilentVariableUpdate('ext_last_action', 'tour_explorer_booking_opened');

  // ========================================================================
  // RENDER: Tour Grid
  // ========================================================================

  function renderTourGrid() {
    currentView = 'grid';
    filterBar.style.display = '';

    var grid = document.createElement('div');
    grid.className = 'lfhte-tour-grid';

    if (filteredTours.length === 0) {
      grid.innerHTML = '\
        <div class="lfhte-no-results">\
          <div class="lfhte-no-results-icon">&#9968;</div>\
          <p>No tours match your filters</p>\
          <button class="lfhte-btn-outline" id="lfhte-clear-filters">Clear Filters</button>\
        </div>\
      ';
      content.innerHTML = '';
      content.appendChild(grid);
      content.querySelector('#lfhte-clear-filters')?.addEventListener('click', function () {
        activeFilters = { lodge: 'all', duration: 'all', season: [] };
        modal.querySelector('#lfhte-filter-lodge').value = 'all';
        modal.querySelector('#lfhte-filter-duration').value = 'all';
        modal.querySelectorAll('#lfhte-season-dropdown input').forEach(function (cb) { cb.checked = false; });
        modal.querySelector('#lfhte-season-btn').textContent = 'All Months';
        applyFilters();
      });
      return;
    }

    filteredTours.forEach(function (tour) {
      var card = document.createElement('div');
      card.className = 'lfhte-tour-card';
      var isComparing = compareTours.includes(tour.id);
      var lodgeBadges = tour.lodges.includes('both')
        ? '<span class="lfhte-lodge-badge" style="background:' + _teLodgeBadgeColor(tour.lodges) + '">Both Lodges</span>'
        : tour.lodges.length > 1
          ? '<span class="lfhte-lodge-badge" style="background:' + _teLodgeBadgeColor(tour.lodges) + '">' + tour.lodges.map(_teLodgeName).join(' or ') + '</span>'
          : '<span class="lfhte-lodge-badge" style="background:' + _teLodgeBadgeColor(tour.lodges) + '">' + _teLodgeName(tour.lodges[0]) + '</span>';
      var priceDisplay = 'From $' + tour.priceFrom.toLocaleString() + ' CAD';

      card.innerHTML = '\
        <div class="lfhte-card-image" style="background-image: url(\'' + _teImgUrl(tour.heroImage) + '\'); background-position: ' + _teImgPos(tour.heroImage) + '">\
          <div class="lfhte-card-badges">' + lodgeBadges + '</div>\
        </div>\
        <div class="lfhte-card-body">\
          <h3 class="lfhte-card-title">' + tour.name + '</h3>\
          <div class="lfhte-card-stats">\
            <span>' + tour.duration + '</span>\
            <span class="lfhte-stat-divider">|</span>\
            <span>' + tour.verticalGuarantee + '</span>\
            <span class="lfhte-stat-divider">|</span>\
            <span>Skiing in groups of 4</span>\
          </div>\
          <p class="lfhte-card-price">' + priceDisplay + '</p>\
          <p class="lfhte-card-desc">' + tour.description.substring(0, 100) + '...</p>\
          <div class="lfhte-card-actions">\
            <button class="lfhte-btn-outline lfhte-compare-toggle ' + (isComparing ? 'active' : '') + '" data-tour-id="' + tour.id + '">\
              ' + (isComparing ? '&#10003; Comparing' : 'Compare') + '\
            </button>\
            <button class="lfhte-btn-primary lfhte-view-detail" data-tour-id="' + tour.id + '">View Details</button>\
          </div>\
        </div>\
      ';
      grid.appendChild(card);
    });

    content.innerHTML = '';
    content.appendChild(grid);

    content.querySelectorAll('.lfhte-view-detail').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var tour = LFH_TOURS_TE.find(function (t) { return t.id === btn.dataset.tourId; });
        if (tour) renderTourDetail(tour);
      });
    });

    content.querySelectorAll('.lfhte-compare-toggle').forEach(function (btn) {
      btn.addEventListener('click', function () { toggleCompare(btn.dataset.tourId); });
    });
  }

  // ========================================================================
  // RENDER: Tour Detail (with booking button override)
  // ========================================================================

  function renderTourDetail(tour) {
    currentView = 'detail';
    currentTourId = tour.id;
    filterBar.style.display = '';
    _teSilentVariableUpdate('ext_current_tour', tour.id);

    var detail = document.createElement('div');
    detail.className = 'lfhte-detail';

    var videoEntry = Object.values(LFH_VIDEOS_TE).find(function (v) { return v.id === tour.videoId; });
    var videoTitle = videoEntry ? videoEntry.title : 'A Day in the Life';

    // Pricing: stacked cards on mobile, table on desktop
    var pricingHTML = '';
    if (isMobile) {
      // Mobile: stacked card layout
      if (tour.pricing.safari) {
        pricingHTML = '\
          <div class="lfhte-pricing-cards">\
            <div class="lfhte-pricing-card">\
              <div class="lfhte-pricing-card-label">Safari Rate</div>\
              <div class="lfhte-pricing-card-row"><span>Peak Season</span><strong>' + (tour.pricing.safari.peak || '\u2014') + '</strong></div>\
            </div>\
          </div>\
        ';
      } else {
        var lodgeKeys = Object.keys(tour.pricing);
        var cardsHTML = '';
        lodgeKeys.forEach(function (key) {
          var p = tour.pricing[key];
          var lodgeLabel = onCompareLodges
            ? '<button class="lfhte-lodge-name-link" data-lodge-id="' + key + '">' + _teLodgeName(key) + '</button>'
            : '<strong>' + _teLodgeName(key) + '</strong>';
          cardsHTML += '\
            <div class="lfhte-pricing-card">\
              <div class="lfhte-pricing-card-label">' + lodgeLabel + '</div>\
              ' + (p.early ? '<div class="lfhte-pricing-card-row"><span>Early (Dec-Jan)</span><strong>' + p.early + '</strong></div>' : '') + '\
              ' + (p.peak ? '<div class="lfhte-pricing-card-row"><span>Peak (Feb-Mar)</span><strong>' + p.peak + '</strong></div>' : '') + '\
              ' + (p.late ? '<div class="lfhte-pricing-card-row"><span>Late (Apr)</span><strong>' + p.late + '</strong></div>' : '') + '\
            </div>\
          ';
        });
        pricingHTML = '<div class="lfhte-pricing-cards">' + cardsHTML + '</div>';
      }
    } else {
      // Desktop: table layout
      var pricingRows = '';
      if (tour.pricing.safari) {
        pricingRows = '<tr><td>Safari Rate</td><td>' + (tour.pricing.safari.peak || '\u2014') + '</td></tr>';
      } else {
        var lodgeKeys = Object.keys(tour.pricing);
        lodgeKeys.forEach(function (key) {
          var p = tour.pricing[key];
          var lodgeLabel = onCompareLodges
            ? '<button class="lfhte-lodge-name-link" data-lodge-id="' + key + '">' + _teLodgeName(key) + '</button>'
            : '<strong>' + _teLodgeName(key) + '</strong>';
          pricingRows += '\
            <tr>\
              <td>' + lodgeLabel + '</td>\
              <td>' + (p.early || '\u2014') + '</td>\
              <td>' + (p.peak || '\u2014') + '</td>\
              <td>' + (p.late || '\u2014') + '</td>\
            </tr>\
          ';
        });
      }
      var pricingHeader = tour.pricing.safari
        ? '<tr><th>Rate Type</th><th>Peak Season</th></tr>'
        : '<tr><th>Lodge</th><th>Early (Dec-Jan)</th><th>Peak (Feb-Mar)</th><th>Late (Apr)</th></tr>';
      pricingHTML = '\
        <table class="lfhte-pricing-table">\
          <thead>' + pricingHeader + '</thead>\
          <tbody>' + pricingRows + '</tbody>\
        </table>\
      ';
    }

    var galleryHTML = tour.galleryImages
      .map(function (img, i) { return '<div class="lfhte-gallery-thumb" style="background-image: url(\'' + _teImgUrl(img) + '\'); background-position: ' + _teImgPos(img) + '" data-index="' + i + '"></div>'; })
      .join('');

    var includedItems = tour.id === 'private' ? INCLUDED_ITEMS_PRIVATE_TE : INCLUDED_ITEMS_REGULAR_TE;
    var includedHTML = includedItems.map(function (item) {
      return '<div class="lfhte-included-item"><span class="lfhte-check-icon">&#10003;</span> ' + item + '</div>';
    }).join('');

    var bestForHTML = tour.bestFor
      .map(function (bf) { return '<span class="lfhte-best-for-badge">' + bf + '</span>'; })
      .join('');

    detail.innerHTML = '\
      <div class="lfhte-detail-header">\
        <button class="lfhte-back-btn" id="lfhte-back-to-grid">&larr; All Tours</button>\
        <h2 class="lfhte-detail-title">' + tour.name + '</h2>\
        <span class="lfhte-detail-subtitle">' + tour.subtitle + '</span>\
      </div>\
      <div class="lfhte-detail-scroll">\
        <div class="lfhte-hero-media" id="lfhte-hero-media">\
          <div class="lfhte-hero-image" style="background-image: url(\'' + _teImgUrl(tour.heroImage) + '\'); background-position: ' + _teImgPos(tour.heroImage) + '">\
            <button class="lfhte-play-btn" id="lfhte-play-video" data-video-id="' + tour.videoId + '">\
              <span class="lfhte-play-triangle"></span>\
            </button>\
            <div class="lfhte-hero-label">Watch: ' + videoTitle + '</div>\
          </div>\
        </div>\
        <div class="lfhte-gallery-strip">' + galleryHTML + '</div>\
        <div class="lfhte-detail-section">\
          <p class="lfhte-full-desc">' + tour.description + '</p>\
          <div class="lfhte-best-for">' + bestForHTML + '</div>\
        </div>\
        <div class="lfhte-stats-bar">\
          <div class="lfhte-stat-box">\
            <div class="lfhte-stat-value">' + tour.duration + '</div>\
            <div class="lfhte-stat-label">Duration</div>\
          </div>\
          <div class="lfhte-stat-box">\
            <div class="lfhte-stat-value">' + tour.verticalGuarantee + (tour.id !== 'private' ? '*' : '') + '</div>\
            <div class="lfhte-stat-label">Vertical Guarantee</div>\
          </div>\
          <div class="lfhte-stat-box">\
            <div class="lfhte-stat-value">' + (tour.id === 'private' ? '1-2 groups' : '4') + '</div>\
            <div class="lfhte-stat-label">' + (tour.id === 'private' ? 'of 4 (up to 8 pax)' : 'Guests per Guide') + '</div>\
          </div>\
        </div>\
        ' + (tour.id !== 'private' ? '<p class="lfhte-vertical-note">*Vertical guarantee varies by week and time of season.</p>' : '') + '\
        <div class="lfhte-detail-section">\
          <h3 class="lfhte-section-title">' + (tour.pricingTwoGroup ? 'Pricing — 1 Group (4 guests)' : 'Pricing (CAD per person)') + '</h3>\
          ' + pricingHTML + '\
          ' + (tour.pricingTwoGroup ? '<h3 class="lfhte-section-title" style="margin-top:16px;">Pricing — 2 Groups (8 guests)</h3>' + _teBuildTwoGroupPricingHTML(tour, isMobile, onCompareLodges) : '') + '\
          <p class="lfhte-pricing-note">' + (tour.id === 'private' ? '5% GST applies. 20% deposit to confirm. Unlimited vertical included \u2014 no extra charges.' : '5% GST applies. 20% deposit to confirm. Extra vertical: $218/1,000m.') + '</p>\
        </div>\
        <div class="lfhte-detail-section">\
          <h3 class="lfhte-section-title">What\'s Included</h3>\
          <div class="lfhte-included-grid">' + includedHTML + '</div>\
        </div>\
        <div class="lfhte-detail-actions">\
          <div class="lfhte-actions-row">\
            <button class="lfhte-btn-primary lfhte-action-book" data-tour-id="' + tour.id + '">Check Availability</button>\
            <button class="lfhte-btn-outline lfhte-action-ask" data-tour-id="' + tour.id + '">Ask About This Tour</button>\
          </div>\
          <div class="lfhte-actions-row">\
            <button class="lfhte-btn-outline lfhte-back-link" id="lfhte-back-link">&larr; Back to All Tours</button>\
            ' + (onCompareLodges ? '<button class="lfhte-btn-outline lfhte-compare-lodges-detail" id="lfhte-compare-lodges-detail">Compare Lodges</button>' : '') + '\
          </div>\
        </div>\
      </div>\
    ';

    content.innerHTML = '';
    content.appendChild(detail);

    // Event Listeners
    detail.querySelector('#lfhte-back-to-grid')?.addEventListener('click', renderTourGrid);
    detail.querySelector('#lfhte-back-link')?.addEventListener('click', renderTourGrid);

    // Gallery thumbnails
    detail.querySelectorAll('.lfhte-gallery-thumb').forEach(function (thumb) {
      thumb.addEventListener('click', function () {
        var idx = parseInt(thumb.dataset.index);
        var heroMedia = detail.querySelector('#lfhte-hero-media');
        heroMedia.innerHTML = '\
          <div class="lfhte-hero-image" style="background-image: url(\'' + _teImgUrl(tour.galleryImages[idx]) + '\'); background-position: ' + _teImgPos(tour.galleryImages[idx]) + '">\
            <button class="lfhte-play-btn" id="lfhte-play-video" data-video-id="' + tour.videoId + '">\
              <span class="lfhte-play-triangle"></span>\
            </button>\
            <div class="lfhte-hero-label">Watch: ' + videoTitle + '</div>\
          </div>\
        ';
        heroMedia.querySelector('#lfhte-play-video')?.addEventListener('click', function (e) {
          heroMedia.innerHTML = '\
            <div class="lfhte-video-embed">\
              <iframe src="' + _teGetVideoEmbedUrl(e.currentTarget.dataset.videoId) + '"\
                allow="autoplay; fullscreen" allowfullscreen></iframe>\
            </div>\
          ';
        });
        detail.querySelectorAll('.lfhte-gallery-thumb').forEach(function (t) { t.style.borderColor = 'transparent'; });
        thumb.style.borderColor = C.primaryRed;
      });
    });

    detail.querySelector('#lfhte-play-video')?.addEventListener('click', function (e) {
      var heroMedia = detail.querySelector('#lfhte-hero-media');
      heroMedia.innerHTML = '\
        <div class="lfhte-video-embed">\
          <iframe src="' + _teGetVideoEmbedUrl(e.currentTarget.dataset.videoId) + '"\
            allow="autoplay; fullscreen" allowfullscreen></iframe>\
        </div>\
      ';
    });

    // ===== BOOKING BUTTON =====
    detail.querySelector('.lfhte-action-book')?.addEventListener('click', function () {
      if (bookingVariant === 'slide') {
        openSlidePanel(tour);
      } else {
        openReplaceBooking(tour);
      }
    });

    detail.querySelector('.lfhte-action-ask')?.addEventListener('click', function () {
      _teInteractWithAgent('ext_user_action', {
        action: 'tour_inquiry',
        source: 'tour_explorer',
        tourId: tour.id,
        tourName: tour.name,
        lodge: tour.lodges.join(', '),
        duration: tour.duration,
      });
      actionTaken = true;
      actualCloseModal();
    });

    // Compare Lodges - pricing table lodge name links
    if (onCompareLodges) {
      detail.querySelectorAll('.lfhte-lodge-name-link').forEach(function (link) {
        link.addEventListener('click', function (e) {
          e.stopPropagation();
          var lodgeId = link.dataset.lodgeId;
          actionTaken = true;
          actualCloseModal();
          setTimeout(function () { onCompareLodges(lodgeId); }, 350);
        });
      });

      // Compare Lodges - detail actions text button
      detail.querySelector('#lfhte-compare-lodges-detail')?.addEventListener('click', function () {
        actionTaken = true;
        actualCloseModal();
        setTimeout(function () { onCompareLodges(); }, 350);
      });
    }
  }

  // ========================================================================
  // BOOKING: Variant A - Replace Content
  // ========================================================================

  function openReplaceBooking(tour) {
    currentView = 'booking';
    filterBar.style.display = 'none';
    _teSilentVariableUpdate('ext_last_action', 'booking_form_opened');

    var bookingContainer = document.createElement('div');
    bookingContainer.style.cssText = 'height:100%;overflow-y:auto;';

    // Back button header
    var backHeader = document.createElement('div');
    backHeader.style.cssText = '\
      padding: 12px 20px; border-bottom: 1px solid ' + C.border + ';\
      display: flex; align-items: center; gap: 12px;\
    ';
    backHeader.innerHTML = '\
      <button class="lfhte-back-btn" id="lfhte-booking-back">&larr; Back to ' + tour.name + '</button>\
      <span style="font-family:\'Nexa Rust Sans Black 2\',sans-serif;font-size:14px;font-weight:900;color:' + C.textPrimary + ';text-transform:uppercase;letter-spacing:1px;">Booking Request</span>\
    ';

    var formContainer = document.createElement('div');
    formContainer.style.cssText = 'flex:1;overflow-y:auto;';

    bookingContainer.appendChild(backHeader);
    bookingContainer.appendChild(formContainer);

    content.innerHTML = '';
    content.appendChild(bookingContainer);

    // Render the booking form — use window.__lfh.renderBookingForm if available
    if (window.__lfh && typeof window.__lfh.renderBookingForm === 'function') {
      window.__lfh.renderBookingForm(formContainer, {
        tour: tour,
        webhookUrl: webhookUrl,
        variant: 'replace',
        conversationId: conversationId,
        userId: userId,
        onSubmitSuccess: function (payload) { handleBookingSuccess(tour, payload); },
        onBack: function () { renderTourDetail(tour); },
      });
    } else {
      // Fallback: no booking form available
      formContainer.innerHTML = '\
        <div style="padding:40px 20px;text-align:center;font-family:Inter,sans-serif;">\
          <p style="font-size:16px;color:' + C.textPrimary + ';margin:0 0 12px;">Please contact us to book</p>\
          <p style="font-size:13px;color:' + C.textSecondary + ';margin:0 0 20px;">Our team will be happy to help you arrange your ' + tour.name + ' trip.</p>\
          <a href="https://www.lastfrontierheli.com/contact/" target="_blank" style="\
            display:inline-block;padding:12px 28px;background:' + C.primaryRed + ';color:#fff;\
            border-radius:6px;text-decoration:none;font-size:13px;font-weight:600;\
          ">Contact Last Frontier</a>\
        </div>\
      ';
    }

    // Back button
    backHeader.querySelector('#lfhte-booking-back')?.addEventListener('click', function () {
      renderTourDetail(tour);
    });
  }

  // ========================================================================
  // BOOKING: Variant B - Slide-in Panel
  // ========================================================================

  function openSlidePanel(tour) {
    _teSilentVariableUpdate('ext_last_action', 'booking_form_opened');

    var overlay = modal.querySelector('#lfhte-sp-overlay');
    var panelContent = modal.querySelector('#lfhte-sp-content');
    var backBtn = modal.querySelector('#lfhte-sp-back');

    overlay.style.display = 'block';
    // Trigger animation
    requestAnimationFrame(function () {
      overlay.classList.add('open');
    });

    // Render the booking form — use window.__lfh.renderBookingForm if available
    if (window.__lfh && typeof window.__lfh.renderBookingForm === 'function') {
      window.__lfh.renderBookingForm(panelContent, {
        tour: tour,
        webhookUrl: webhookUrl,
        variant: 'slide',
        conversationId: conversationId,
        userId: userId,
        onSubmitSuccess: function (payload) { handleBookingSuccess(tour, payload); },
        onBack: function () { closeSlidePanel(); },
      });
    } else {
      // Fallback: no booking form available
      panelContent.innerHTML = '\
        <div style="padding:40px 20px;text-align:center;font-family:Inter,sans-serif;">\
          <p style="font-size:16px;color:' + C.textPrimary + ';margin:0 0 12px;">Please contact us to book</p>\
          <p style="font-size:13px;color:' + C.textSecondary + ';margin:0 0 20px;">Our team will be happy to help you arrange your ' + tour.name + ' trip.</p>\
          <a href="https://www.lastfrontierheli.com/contact/" target="_blank" style="\
            display:inline-block;padding:12px 28px;background:' + C.primaryRed + ';color:#fff;\
            border-radius:6px;text-decoration:none;font-size:13px;font-weight:600;\
          ">Contact Last Frontier</a>\
        </div>\
      ';
    }

    // Back handler
    var handleBack = function () { closeSlidePanel(); };
    backBtn.addEventListener('click', handleBack, { once: true });

    // Backdrop click to close
    var spBackdrop = overlay.querySelector('.lfhte-sp-backdrop');
    spBackdrop.addEventListener('click', handleBack, { once: true });
  }

  function closeSlidePanel() {
    var overlay = modal.querySelector('#lfhte-sp-overlay');
    overlay.classList.remove('open');
    setTimeout(function () {
      overlay.style.display = 'none';
      var panelContent = modal.querySelector('#lfhte-sp-content');
      if (panelContent) panelContent.innerHTML = '';
    }, 300);
  }

  // ========================================================================
  // BOOKING: Post-Submit
  // ========================================================================

  function handleBookingSuccess(tour, payload) {
    // Fire interact event for VoiceFlow — no PII (email/name/phone)
    // PII is sent directly to the webhook by the booking form, not through VoiceFlow
    _teInteractWithAgent('ext_user_action', {
      action: 'booking_request_submitted',
      source: 'tour_explorer',
      tourId: tour.id,
      tourName: tour.name,
      requestType: payload.bookingRequest.requestType,
    });

    // Suppress duplicate ext_modal_closed since action was already fired
    actionTaken = true;

    // Auto-close modal after delay
    setTimeout(function () {
      actualCloseModal();
    }, 2500);
  }

  // ========================================================================
  // RENDER: Compare View
  // ========================================================================

  function renderCompareView() {
    currentView = 'compare';
    var tours = compareTours.map(function (id) { return LFH_TOURS_TE.find(function (t) { return t.id === id; }); }).filter(Boolean);
    _teSilentVariableUpdate('ext_tours_compared', compareTours.join(','));

    var compare = document.createElement('div');
    compare.className = 'lfhte-compare';

    var headerCells = tours.map(function (t) {
      return '<th class="lfhte-compare-th"><div class="lfhte-compare-tour-name">' + t.name + '</div><div class="lfhte-compare-tour-sub">' + t.subtitle + '</div></th>';
    }).join('');

    var rows = [
      { label: 'Duration', fn: function (t) { return t.duration; } },
      { label: 'Vertical Guarantee', fn: function (t) { return t.verticalGuarantee; } },
      { label: 'Lodges', fn: function (t) { return t.lodges.includes('both') ? 'Both Lodges' : t.lodges.map(_teLodgeName).join(' or '); } },
      { label: 'Skill Level', fn: function (t) { return t.skillLevel; } },
      { label: 'Starting Price', fn: function (t) { return '$' + t.priceFrom.toLocaleString() + ' CAD'; } },
      { label: 'Best For', fn: function (t) { return t.bestFor.join(', '); } },
    ];

    var rowsHTML = rows
      .map(function (row) {
        return '<tr><td class="lfhte-compare-label">' + row.label + '</td>' + tours.map(function (t) { return '<td>' + row.fn(t) + '</td>'; }).join('') + '</tr>';
      }).join('');

    var compareBody;
    if (isMobile) {
      // Stacked cards: one card per attribute, tour values listed beneath
      var cardsHTML = rows.map(function (row) {
        var valuesHTML = tours.map(function (t) {
          return '<div class="lfhte-compare-card-value"><span class="lfhte-compare-card-tour">' + t.name + '</span><span>' + row.fn(t) + '</span></div>';
        }).join('');
        return '<div class="lfhte-compare-card"><div class="lfhte-compare-card-label">' + row.label + '</div>' + valuesHTML + '</div>';
      }).join('');
      compareBody = '<div class="lfhte-compare-cards">' + cardsHTML + '</div>';
    } else {
      compareBody = '\
        <div class="lfhte-compare-scroll">\
          <table class="lfhte-compare-table">\
            <thead><tr><th></th>' + headerCells + '</tr></thead>\
            <tbody>' + rowsHTML + '</tbody>\
          </table>\
        </div>';
    }

    compare.innerHTML = '\
      <div class="lfhte-compare-header">\
        <button class="lfhte-back-btn" id="lfhte-compare-back">&larr; Back to Tours</button>\
        <h2 class="lfhte-compare-title">Comparing ' + tours.length + ' Tours</h2>\
      </div>\
      ' + compareBody + '\
      <div class="lfhte-compare-actions">\
        <button class="lfhte-btn-outline" id="lfhte-compare-clear">Clear Comparison</button>\
      </div>\
    ';

    content.innerHTML = '';
    content.appendChild(compare);

    compare.querySelector('#lfhte-compare-back')?.addEventListener('click', renderTourGrid);
    compare.querySelector('#lfhte-compare-clear')?.addEventListener('click', function () {
      compareTours = [];
      updateCompareTray();
      renderTourGrid();
    });
  }

  // ========================================================================
  // COMPARE: Toggle & Tray
  // ========================================================================

  function toggleCompare(tourId) {
    var idx = compareTours.indexOf(tourId);
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
    var thumbs = compareTours.map(function (id) {
      var t = LFH_TOURS_TE.find(function (tour) { return tour.id === id; });
      return t
        ? '<div class="lfhte-tray-thumb">\
             <div class="lfhte-tray-img" style="background-image:url(\'' + _teImgUrl(t.thumbnailImage) + '\'); background-position: ' + _teImgPos(t.thumbnailImage) + '"></div>\
             <span>' + t.name + '</span>\
             <button class="lfhte-tray-remove" data-tour-id="' + id + '">&times;</button>\
           </div>'
        : '';
    }).join('');

    compareTray.innerHTML = '\
      <div class="lfhte-tray-tours">' + thumbs + '</div>\
      <button class="lfhte-btn-primary lfhte-tray-compare-btn">Compare ' + compareTours.length + ' Tours</button>\
    ';

    compareTray.querySelectorAll('.lfhte-tray-remove').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
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
    filteredTours = LFH_TOURS_TE.filter(function (tour) {
      if (activeFilters.lodge !== 'all') {
        if (activeFilters.lodge === 'both') {
          if (!tour.lodges.includes('both')) return false;
        } else {
          if (!tour.lodges.includes(activeFilters.lodge) && !tour.lodges.includes('both')) return false;
        }
      }
      if (activeFilters.duration !== 'all') {
        if (activeFilters.duration === 'safari') {
          if (!tour.id.startsWith('safari')) return false;
        } else if (activeFilters.duration === 'private') {
          if (tour.id !== 'private') return false;
        } else {
          if (tour.durationDays !== parseInt(activeFilters.duration)) return false;
        }
      }
      if (activeFilters.season.length > 0) {
        if (!tour.months || !tour.months.some(function (m) { return activeFilters.season.indexOf(m) !== -1; })) return false;
      }
      return true;
    });

    _teSilentVariableUpdate('ext_filters_applied', JSON.stringify(activeFilters));
    modal.querySelector('#lfhte-results-count').textContent =
      filteredTours.length + ' tour' + (filteredTours.length !== 1 ? 's' : '');
    renderTourGrid();
  }

  modal.querySelector('#lfhte-filter-lodge')?.addEventListener('change', function (e) {
    activeFilters.lodge = e.target.value;
    _teSilentVariableUpdate('ext_current_lodge', e.target.value);
    applyFilters();
  });

  modal.querySelector('#lfhte-filter-duration')?.addEventListener('change', function (e) {
    activeFilters.duration = e.target.value;
    applyFilters();
  });

  // Season multi-select dropdown
  var seasonBtn = modal.querySelector('#lfhte-season-btn');
  var seasonDropdown = modal.querySelector('#lfhte-season-dropdown');
  seasonBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    var isOpen = seasonDropdown.style.display !== 'none';
    seasonDropdown.style.display = isOpen ? 'none' : 'block';
  });
  seasonDropdown.addEventListener('click', function (e) { e.stopPropagation(); });
  modal.querySelectorAll('#lfhte-season-dropdown input').forEach(function (cb) {
    cb.addEventListener('change', function () {
      var selected = [];
      modal.querySelectorAll('#lfhte-season-dropdown input:checked').forEach(function (c) {
        selected.push(c.value);
      });
      activeFilters.season = selected;
      var labels = { jan: 'Jan', feb: 'Feb', mar: 'Mar', apr: 'Apr' };
      seasonBtn.textContent = selected.length === 0
        ? 'All Months'
        : selected.map(function (s) { return labels[s]; }).join(', ');
      applyFilters();
    });
  });
  document.addEventListener('click', function (e) {
    if (!modal.querySelector('#lfhte-filter-season')?.contains(e.target)) {
      seasonDropdown.style.display = 'none';
    }
  });

  // ========================================================================
  // CLOSE MODAL
  // ========================================================================

  function showCloseConfirmation() {
    // Don't show a second overlay if one is already showing
    if (backdrop.querySelector('.lfhte-close-confirm-overlay')) return;

    var overlay = document.createElement('div');
    overlay.className = 'lfhte-close-confirm-overlay';
    overlay.innerHTML = '\
      <div class="lfhte-close-confirm-card">\
        <p class="lfhte-close-confirm-title">Are you sure you want to return to the conversation?</p>\
        <p class="lfhte-close-confirm-sub">You can reopen this anytime by asking the agent (e.g., \'show me tours\' or \'show me lodges\')</p>\
        <div class="lfhte-close-confirm-buttons">\
          <button class="lfhte-close-confirm-yes">Yes, return to chat</button>\
          <button class="lfhte-close-confirm-no">No, stay here</button>\
        </div>\
      </div>\
    ';

    // "Yes" button closes modal
    overlay.querySelector('.lfhte-close-confirm-yes').addEventListener('click', function () {
      actualCloseModal();
    });

    // "No" button dismisses overlay
    overlay.querySelector('.lfhte-close-confirm-no').addEventListener('click', function () {
      overlay.remove();
    });

    // Clicking overlay background (not card) dismisses
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) overlay.remove();
    });

    backdrop.querySelector('div').appendChild(overlay);
  }

  function actualCloseModal() {
    if (!actionTaken) {
      _teInteractWithAgent('ext_modal_closed', {
        modal: 'tour_explorer',
        lastViewed: currentTourId,
        toursCompared: compareTours,
      });
    }

    abortController.abort();
    backdrop.style.animation = 'lfhte-fadeOut 0.3s ease forwards';
    setTimeout(function () { backdrop.remove(); }, 300);
  }

  function closeModal() {
    showCloseConfirmation();
  }

  headerBar.querySelector('.lfhte-close-btn')?.addEventListener('click', closeModal);
  backdrop.addEventListener('click', function (e) {
    if (e.target === backdrop) closeModal();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && document.contains(backdrop)) {
      // Dismiss close confirmation if showing
      var confirmOverlay = backdrop.querySelector('.lfhte-close-confirm-overlay');
      if (confirmOverlay) {
        confirmOverlay.remove();
        return;
      }
      // Close slide panel first if open
      var overlay = document.querySelector('#lfhte-sp-overlay.open');
      if (overlay) {
        closeSlidePanel();
      } else {
        closeModal();
      }
    }
  }, { signal: abortController.signal });
}

// Register on namespace
window.__lfh.openTourExplorer = openTourExplorerModal;

// ============================================================================
// VOICEFLOW EXTENSION WRAPPER
// ============================================================================

export const LastFrontierTourExplorer = {
  name: 'LastFrontierTourExplorer',
  type: 'response',
  match: ({ trace }) =>
    trace.type === 'ext_tourExplorer' ||
    trace.payload?.name === 'ext_tourExplorer',
  render: ({ trace, element }) => {
    const payload = trace.payload || {};
    openTourExplorerModal(payload.tourId || null, {
      initialLodgeFilter: payload.lodgeFilter || 'all',
      isMobile: payload.device_type === 'mobile',
      onCompareLodges: (lodgeId) => window.__lfh.openLodgeCompare?.(lodgeId || null),
      onCheckConditions: () => window.__lfh.openWeatherConditions?.(),
    });
  },
};

// ============================================================================
// STYLES
// ============================================================================

function _teBuildModalStyles(C) {
  return '\
@import url(\'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap\');\
\
@font-face {\
  font-family: \'Nexa Rust Sans Black 2\';\
  src: url(\'https://yannicksegaar.github.io/lastfrontier-voiceflow-styles/fonts/NexaRustSansBlack2.woff2\') format(\'woff2\');\
  font-weight: 900; font-style: normal; font-display: swap;\
}\
\
@keyframes lfhte-fadeIn { from { opacity: 0; } to { opacity: 1; } }\
@keyframes lfhte-fadeOut { from { opacity: 1; } to { opacity: 0; } }\
\
.lfhte-close-confirm-overlay {\
  position: absolute; top: 0; left: 0; width: 100%; height: 100%;\
  background: rgba(0,0,0,0.5); z-index: 200;\
  display: flex; align-items: center; justify-content: center;\
  animation: lfhte-fadeIn 0.2s ease;\
}\
.lfhte-close-confirm-card {\
  background: #fff; border-radius: 12px; padding: 24px;\
  max-width: 320px; width: 90%; text-align: center;\
  font-family: \'Inter\', sans-serif;\
  box-shadow: 0 8px 32px rgba(0,0,0,0.2);\
}\
.lfhte-close-confirm-title {\
  font-size: 16px; font-weight: 700; color: ' + C.textPrimary + ';\
  margin: 0;\
}\
.lfhte-close-confirm-sub {\
  font-size: 13px; color: ' + C.textSecondary + '; margin: 8px 0 0;\
  line-height: 1.5;\
}\
.lfhte-close-confirm-buttons {\
  display: flex; flex-direction: column; gap: 12px; margin-top: 20px;\
}\
.lfhte-close-confirm-yes {\
  width: 100%; padding: 10px 16px;\
  background: ' + C.primaryRed + '; color: #fff;\
  border: none; border-radius: 8px;\
  font-family: \'Inter\', sans-serif; font-size: 13px;\
  font-weight: 600; cursor: pointer; transition: background 0.2s;\
}\
.lfhte-close-confirm-yes:hover { background: #c4221a; }\
.lfhte-close-confirm-no {\
  width: 100%; padding: 10px 16px;\
  background: #fff; color: ' + C.textPrimary + ';\
  border: 1px solid ' + C.border + '; border-radius: 8px;\
  font-family: \'Inter\', sans-serif; font-size: 13px;\
  font-weight: 600; cursor: pointer; transition: all 0.2s;\
}\
.lfhte-close-confirm-no:hover { border-color: ' + C.primaryRed + '; color: ' + C.primaryRed + '; }\
@keyframes lfhte-slideUp {\
  from { opacity: 0; transform: translateY(30px); }\
  to { opacity: 1; transform: translateY(0); }\
}\
\
.lfhte-header-bar {\
  display: flex; align-items: center; justify-content: space-between;\
  padding: 14px 20px; background: ' + C.textPrimary + '; flex-shrink: 0;\
}\
.lfhte-header-title {\
  font-family: \'Nexa Rust Sans Black 2\', sans-serif;\
  font-size: 20px; font-weight: 900; color: #fff;\
  text-transform: uppercase; letter-spacing: 2px;\
}\
.lfhte-close-btn {\
  background: transparent; border: none; color: #fff;\
  font-size: 28px; cursor: pointer; padding: 0;\
  width: 36px; height: 36px; display: flex;\
  align-items: center; justify-content: center;\
  border-radius: 50%; transition: background 0.2s;\
}\
.lfhte-close-btn:hover { background: rgba(255,255,255,0.15); }\
\
.lfhte-filter-bar {\
  padding: 12px 20px; background: ' + C.infoBox + ';\
  border-bottom: 1px solid ' + C.border + '; flex-shrink: 0;\
}\
.lfhte-filters-row { display: flex; gap: 12px; align-items: center; flex-wrap: wrap; }\
.lfhte-filter-group { display: flex; flex-direction: column; gap: 2px; flex: 1; min-width: 130px; }\
.lfhte-filter-group label {\
  font-family: \'Inter\', sans-serif; font-size: 10px;\
  font-weight: 700; color: ' + C.textSecondary + ';\
  text-transform: uppercase; letter-spacing: 0.5px;\
}\
.lfhte-filter-group select {\
  padding: 8px 10px; border: 1px solid ' + C.border + ';\
  border-radius: 6px; font-family: \'Inter\', sans-serif;\
  font-size: 12px; color: ' + C.textPrimary + ';\
  background: #fff; cursor: pointer; outline: none;\
}\
.lfhte-filter-group select:focus { border-color: ' + C.primaryRed + '; }\
.lfhte-multi-select { position: relative; }\
.lfhte-multi-select-btn {\
  padding: 8px 10px; border: 1px solid ' + C.border + ';\
  border-radius: 6px; font-family: \'Inter\', sans-serif;\
  font-size: 12px; color: ' + C.textPrimary + ';\
  background: #fff; cursor: pointer; min-width: 100px;\
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;\
}\
.lfhte-multi-select-btn:hover { border-color: ' + C.primaryRed + '; }\
.lfhte-multi-select-dropdown {\
  position: absolute; top: 100%; left: 0; z-index: 100;\
  background: #fff; border: 1px solid ' + C.border + ';\
  border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);\
  margin-top: 4px; min-width: 150px; padding: 6px 0;\
}\
.lfhte-multi-select-item {\
  display: flex; align-items: center; gap: 8px;\
  padding: 6px 12px; font-family: \'Inter\', sans-serif;\
  font-size: 12px; color: ' + C.textPrimary + '; cursor: pointer;\
}\
.lfhte-multi-select-item:hover { background: ' + C.infoBox + '; }\
.lfhte-multi-select-item input { accent-color: ' + C.primaryRed + '; }\
.lfhte-results-count {\
  font-family: \'Inter\', sans-serif; font-size: 12px;\
  font-weight: 600; color: ' + C.textSecondary + ';\
  white-space: nowrap; margin-left: auto;\
}\
.lfhte-compare-lodges-link {\
  padding: 6px 14px; background: ' + C.infoBox + ';\
  border: 1.5px solid ' + C.border + '; border-radius: 20px;\
  font-family: \'Inter\', sans-serif; font-size: 11px;\
  font-weight: 600; color: ' + C.textSecondary + ';\
  cursor: pointer; transition: all 0.2s; white-space: nowrap;\
}\
.lfhte-compare-lodges-link:hover {\
  border-color: ' + C.primaryRed + '; color: ' + C.primaryRed + ';\
}\
.lfhte-conditions-link {\
  padding: 6px 14px; background: ' + C.infoBox + ';\
  border: 1.5px solid ' + C.border + '; border-radius: 20px;\
  font-family: \'Inter\', sans-serif; font-size: 11px;\
  font-weight: 600; color: ' + C.textSecondary + ';\
  cursor: pointer; transition: all 0.2s; white-space: nowrap;\
}\
.lfhte-conditions-link:hover {\
  border-color: ' + C.primaryRed + '; color: ' + C.primaryRed + ';\
}\
.lfhte-lodge-name-link {\
  background: none; border: none; padding: 0;\
  font-weight: 700; font-size: inherit; font-family: inherit;\
  color: ' + C.primaryRed + '; cursor: pointer;\
  text-decoration: underline; text-decoration-style: dotted;\
  text-underline-offset: 2px; transition: color 0.2s;\
}\
.lfhte-lodge-name-link:hover { color: #c4221a; }\
\
.lfhte-content {\
  flex: 1; overflow-y: auto; padding: 20px;\
  font-family: \'Inter\', sans-serif;\
}\
.lfhte-content::-webkit-scrollbar { width: 6px; }\
.lfhte-content::-webkit-scrollbar-track { background: ' + C.infoBox + '; }\
.lfhte-content::-webkit-scrollbar-thumb { background: ' + C.border + '; border-radius: 3px; }\
\
.lfhte-tour-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }\
@media (max-width: 700px) { .lfhte-tour-grid { grid-template-columns: 1fr; } }\
\
.lfhte-tour-card {\
  border: 1.5px solid ' + C.border + '; border-radius: 10px;\
  overflow: hidden; transition: all 0.2s ease; background: #fff;\
}\
.lfhte-tour-card:hover {\
  border-color: ' + C.primaryRed + ';\
  box-shadow: 0 4px 16px rgba(230, 43, 30, 0.1);\
}\
.lfhte-card-image {\
  height: 160px; background-size: cover; position: relative;\
}\
.lfhte-card-badges {\
  position: absolute; top: 10px; right: 10px;\
  display: flex; gap: 6px; flex-wrap: wrap;\
}\
.lfhte-lodge-badge {\
  padding: 4px 10px; border-radius: 20px;\
  font-size: 10px; font-weight: 600; color: #fff;\
  text-transform: uppercase; letter-spacing: 0.3px;\
}\
.lfhte-card-body { padding: 14px; }\
.lfhte-card-title {\
  font-size: 16px; font-weight: 700;\
  color: ' + C.primaryRed + '; margin: 0 0 8px;\
}\
.lfhte-card-stats {\
  font-size: 11px; color: ' + C.textSecondary + '; margin-bottom: 6px;\
}\
.lfhte-stat-divider { margin: 0 6px; opacity: 0.4; }\
.lfhte-card-price {\
  font-size: 14px; font-weight: 700;\
  color: ' + C.textPrimary + '; margin: 0 0 8px;\
}\
.lfhte-card-desc {\
  font-size: 12px; color: ' + C.textSecondary + ';\
  line-height: 1.5; margin: 0 0 12px;\
  display: -webkit-box; -webkit-line-clamp: 2;\
  -webkit-box-orient: vertical; overflow: hidden;\
}\
.lfhte-card-actions { display: flex; gap: 8px; }\
\
.lfhte-btn-primary {\
  flex: 1; padding: 10px 16px;\
  background: ' + C.primaryRed + '; color: #fff;\
  border: none; border-radius: 6px; font-family: \'Inter\', sans-serif;\
  font-size: 12px; font-weight: 600; cursor: pointer;\
  transition: all 0.2s; text-align: center;\
}\
.lfhte-btn-primary:hover { background: #c4221a; transform: translateY(-1px); }\
.lfhte-btn-outline {\
  flex: 1; padding: 10px 16px;\
  background: #fff; color: ' + C.textPrimary + ';\
  border: 1.5px solid ' + C.border + '; border-radius: 6px;\
  font-family: \'Inter\', sans-serif; font-size: 12px;\
  font-weight: 600; cursor: pointer; transition: all 0.2s; text-align: center;\
}\
.lfhte-btn-outline:hover { border-color: ' + C.primaryRed + '; color: ' + C.primaryRed + '; }\
.lfhte-btn-outline.active {\
  background: ' + C.selectedTint + ';\
  border-color: ' + C.primaryRed + '; color: ' + C.primaryRed + ';\
}\
.lfhte-btn-text {\
  background: transparent; border: none;\
  color: ' + C.textSecondary + '; font-family: \'Inter\', sans-serif;\
  font-size: 12px; cursor: pointer; padding: 8px; transition: color 0.2s;\
}\
.lfhte-btn-text:hover { color: ' + C.primaryRed + '; }\
\
.lfhte-no-results { grid-column: 1 / -1; text-align: center; padding: 60px 20px; }\
.lfhte-no-results-icon { font-size: 48px; margin-bottom: 12px; }\
.lfhte-no-results p { font-size: 16px; color: ' + C.textSecondary + '; margin-bottom: 16px; }\
\
.lfhte-detail { display: flex; flex-direction: column; height: 100%; }\
.lfhte-detail-header {\
  display: flex; align-items: center; gap: 12px; margin-bottom: 16px; flex-wrap: wrap;\
}\
.lfhte-back-btn {\
  background: ' + C.infoBox + '; border: 1px solid ' + C.border + ';\
  border-radius: 6px; padding: 8px 14px;\
  font-family: \'Inter\', sans-serif; font-size: 11px;\
  font-weight: 700; color: ' + C.textSecondary + ';\
  cursor: pointer; transition: all 0.2s; text-transform: uppercase;\
}\
.lfhte-back-btn:hover {\
  background: #eee; border-color: ' + C.primaryRed + ';\
  color: ' + C.textPrimary + ';\
}\
.lfhte-detail-title {\
  font-size: 22px; font-weight: 900; color: ' + C.textPrimary + ';\
  margin: 0; font-family: \'Nexa Rust Sans Black 2\', sans-serif;\
  text-transform: uppercase; letter-spacing: 1px;\
}\
.lfhte-detail-subtitle { font-size: 13px; color: ' + C.textSecondary + '; font-style: italic; }\
.lfhte-detail-scroll { flex: 1; overflow-y: auto; }\
\
.lfhte-hero-media { margin-bottom: 12px; }\
.lfhte-hero-image {\
  width: 100%; height: 280px; background-size: cover; border-radius: 10px;\
  position: relative; display: flex;\
  align-items: center; justify-content: center; cursor: pointer;\
}\
.lfhte-hero-image::after {\
  content: \'\'; position: absolute; inset: 0;\
  background: linear-gradient(transparent 50%, rgba(0,0,0,0.6));\
  border-radius: 10px; pointer-events: none;\
}\
.lfhte-play-btn {\
  position: relative; z-index: 2;\
  width: 64px; height: 64px; border-radius: 50%;\
  background: rgba(255,255,255,0.9); border: none;\
  cursor: pointer; display: flex; align-items: center;\
  justify-content: center; transition: all 0.2s;\
}\
.lfhte-play-btn:hover { background: ' + C.primaryRed + '; transform: scale(1.1); }\
.lfhte-play-btn:hover .lfhte-play-triangle { border-left-color: #fff; }\
.lfhte-play-triangle {\
  width: 0; height: 0;\
  border-left: 18px solid ' + C.textPrimary + ';\
  border-top: 11px solid transparent;\
  border-bottom: 11px solid transparent;\
  margin-left: 4px; transition: border-color 0.2s;\
}\
.lfhte-hero-label {\
  position: absolute; bottom: 14px; left: 14px; z-index: 2;\
  color: #fff; font-size: 12px; font-weight: 600;\
  text-shadow: 0 1px 4px rgba(0,0,0,0.5);\
}\
.lfhte-video-embed {\
  width: 100%; aspect-ratio: 16/9; border-radius: 10px;\
  overflow: hidden; background: #000;\
}\
.lfhte-video-embed iframe { width: 100%; height: 100%; border: none; }\
\
.lfhte-gallery-strip {\
  display: flex; gap: 8px; overflow-x: auto;\
  padding-bottom: 8px; margin-bottom: 16px;\
}\
.lfhte-gallery-strip::-webkit-scrollbar { height: 4px; }\
.lfhte-gallery-strip::-webkit-scrollbar-thumb { background: ' + C.border + '; border-radius: 2px; }\
.lfhte-gallery-thumb {\
  flex: 0 0 120px; height: 80px; border-radius: 8px;\
  background-size: cover;\
  border: 2px solid transparent; cursor: pointer; transition: all 0.2s;\
}\
.lfhte-gallery-thumb:hover { border-color: ' + C.primaryRed + '; }\
\
.lfhte-detail-section { margin-bottom: 20px; }\
.lfhte-section-title {\
  font-size: 14px; font-weight: 700; color: ' + C.textPrimary + ';\
  margin: 0 0 10px; text-transform: uppercase; letter-spacing: 0.5px;\
}\
.lfhte-full-desc {\
  font-size: 13px; line-height: 1.7; color: ' + C.textPrimary + '; margin: 0 0 12px;\
}\
.lfhte-best-for { display: flex; gap: 6px; flex-wrap: wrap; }\
.lfhte-best-for-badge {\
  padding: 4px 12px; background: ' + C.infoBox + ';\
  border: 1px solid ' + C.border + '; border-radius: 20px;\
  font-size: 11px; font-weight: 600; color: ' + C.textSecondary + ';\
}\
\
.lfhte-stats-bar {\
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-bottom: 20px;\
}\
.lfhte-stat-box {\
  text-align: center; padding: 12px 8px;\
  background: ' + C.infoBox + '; border-radius: 8px;\
}\
.lfhte-stat-value {\
  font-size: 14px; font-weight: 700; color: ' + C.primaryRed + '; margin-bottom: 2px;\
}\
.lfhte-stat-label {\
  font-size: 10px; color: ' + C.textSecondary + ';\
  text-transform: uppercase; letter-spacing: 0.3px;\
}\
\
.lfhte-pricing-table { width: 100%; border-collapse: collapse; font-size: 12px; }\
.lfhte-pricing-table th {\
  padding: 10px 8px; background: ' + C.textPrimary + ';\
  color: #fff; text-align: left; font-weight: 600;\
  font-size: 11px; text-transform: uppercase;\
}\
.lfhte-pricing-table td {\
  padding: 10px 8px; border-bottom: 1px solid ' + C.border + ';\
  color: ' + C.textPrimary + ';\
}\
.lfhte-pricing-table tbody tr:hover { background: ' + C.selectedTint + '; }\
.lfhte-pricing-note {\
  font-size: 11px; color: ' + C.textSecondary + ';\
  margin-top: 8px; font-style: italic;\
}\
.lfhte-vertical-note {\
  font-size: 11px; color: ' + C.textSecondary + ';\
  font-style: italic; margin: 4px 0 0 0; text-align: center;\
}\
\
.lfhte-included-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; }\
.lfhte-included-item {\
  font-size: 12px; color: ' + C.textPrimary + ';\
  display: flex; align-items: center; gap: 6px;\
}\
.lfhte-check-icon { color: #2E7D32; font-weight: 700; }\
\
.lfhte-detail-actions {\
  display: flex; flex-direction: column; gap: 10px;\
  padding: 16px 0; border-top: 1px solid ' + C.border + ';\
  margin-top: 8px;\
}\
.lfhte-actions-row { display: flex; gap: 10px; }\
\
.lfhte-compare-tray {\
  display: flex; align-items: center; gap: 12px;\
  padding: 12px 20px; background: ' + C.textPrimary + ';\
  border-top: 1px solid rgba(255,255,255,0.1); flex-shrink: 0;\
}\
.lfhte-tray-tours { display: flex; gap: 10px; flex: 1; overflow-x: auto; }\
.lfhte-tray-thumb {\
  display: flex; align-items: center; gap: 8px;\
  padding: 6px 10px; background: rgba(255,255,255,0.1);\
  border-radius: 6px; flex-shrink: 0;\
}\
.lfhte-tray-img {\
  width: 32px; height: 32px; border-radius: 4px;\
  background-size: cover;\
}\
.lfhte-tray-thumb span { color: #fff; font-size: 11px; font-weight: 600; }\
.lfhte-tray-remove {\
  background: transparent; border: none; color: rgba(255,255,255,0.6);\
  cursor: pointer; font-size: 16px; padding: 0; margin-left: 4px;\
}\
.lfhte-tray-remove:hover { color: #fff; }\
.lfhte-tray-compare-btn {\
  padding: 10px 20px; background: ' + C.primaryRed + ';\
  color: #fff; border: none; border-radius: 6px;\
  font-family: \'Inter\', sans-serif; font-size: 12px;\
  font-weight: 600; cursor: pointer; white-space: nowrap;\
  transition: background 0.2s;\
}\
.lfhte-tray-compare-btn:hover { background: #c4221a; }\
\
.lfhte-compare { display: flex; flex-direction: column; height: 100%; }\
.lfhte-compare-header {\
  display: flex; align-items: center; gap: 12px; margin-bottom: 16px;\
}\
.lfhte-compare-title {\
  font-size: 18px; font-weight: 700; color: ' + C.textPrimary + '; margin: 0;\
}\
.lfhte-compare-scroll { flex: 1; overflow: auto; }\
.lfhte-compare-table { width: 100%; border-collapse: collapse; font-size: 13px; }\
.lfhte-compare-table th, .lfhte-compare-table td {\
  padding: 12px; border: 1px solid ' + C.border + ';\
  text-align: left; vertical-align: top; color: ' + C.textPrimary + ';\
}\
.lfhte-compare-th { background: ' + C.infoBox + '; min-width: 160px; }\
.lfhte-compare-tour-name { font-size: 14px; font-weight: 700; color: ' + C.primaryRed + '; }\
.lfhte-compare-tour-sub { font-size: 11px; color: ' + C.textSecondary + '; margin-top: 2px; }\
.lfhte-compare-label { font-weight: 600; background: ' + C.infoBox + '; white-space: nowrap; }\
.lfhte-compare-actions {\
  display: flex; gap: 10px; padding: 16px 0;\
  border-top: 1px solid ' + C.border + '; margin-top: 8px;\
}\
\
@media (max-width: 500px) {\
  .lfhte-stats-bar { grid-template-columns: repeat(2, 1fr); }\
  .lfhte-pricing-table { display: block; overflow-x: auto; }\
  .lfhte-compare-table { min-width: 500px; }\
  .lfhte-hero-image { height: 200px; }\
  .lfhte-filter-bar { padding: 10px 12px; }\
  .lfhte-filter-group { min-width: 100px; }\
  .lfhte-filter-group select { padding: 6px 8px; }\
  .lfhte-included-grid { grid-template-columns: 1fr; }\
}\
';
}

// ============================================================================
// SLIDE PANEL STYLES
// ============================================================================

function _teBuildSlidePanelStyles(C) {
  return '\
.lfhte-sp-overlay {\
  position: absolute; inset: 0; z-index: 100;\
  display: flex; pointer-events: none;\
}\
.lfhte-sp-overlay.open { pointer-events: auto; }\
\
.lfhte-sp-backdrop {\
  flex: 1; background: rgba(0,0,0,0);\
  transition: background 0.3s ease;\
}\
.lfhte-sp-overlay.open .lfhte-sp-backdrop {\
  background: rgba(0,0,0,0.3);\
}\
\
.lfhte-sp-panel {\
  width: 70%; max-width: 480px; height: 100%;\
  background: ' + C.background + ';\
  box-shadow: -4px 0 20px rgba(0,0,0,0.15);\
  display: flex; flex-direction: column;\
  transform: translateX(100%);\
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);\
  overflow: hidden;\
}\
.lfhte-sp-overlay.open .lfhte-sp-panel {\
  transform: translateX(0);\
}\
\
.lfhte-sp-header {\
  display: flex; align-items: center; gap: 12px;\
  padding: 14px 16px; background: ' + C.textPrimary + ';\
  flex-shrink: 0;\
}\
.lfhte-sp-back {\
  background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2);\
  border-radius: 6px; padding: 6px 12px;\
  font-family: \'Inter\', sans-serif; font-size: 11px;\
  font-weight: 700; color: #fff; cursor: pointer;\
  transition: all 0.2s; text-transform: uppercase;\
}\
.lfhte-sp-back:hover { background: rgba(255,255,255,0.2); }\
.lfhte-sp-title {\
  font-family: \'Nexa Rust Sans Black 2\', sans-serif;\
  font-size: 13px; font-weight: 900; color: #fff;\
  text-transform: uppercase; letter-spacing: 1.5px;\
}\
\
.lfhte-sp-content {\
  flex: 1; overflow-y: auto;\
}\
.lfhte-sp-content::-webkit-scrollbar { width: 5px; }\
.lfhte-sp-content::-webkit-scrollbar-thumb {\
  background: ' + C.border + '; border-radius: 3px;\
}\
\
@media (max-width: 600px) {\
  .lfhte-sp-panel { width: 100%; max-width: 100%; }\
}\
';
}

// ============================================================================
// MOBILE OVERRIDES (applied when isMobile is true via device_type)
// ============================================================================

function _teBuildMobileOverrides(C) {
  return '\
/* Mobile overrides via device_type */\
.lfhte-mobile .lfhte-tour-grid { grid-template-columns: 1fr; }\
.lfhte-mobile .lfhte-hero-image { height: 180px; }\
.lfhte-mobile .lfhte-filters-row { flex-direction: column; gap: 8px; }\
.lfhte-mobile .lfhte-filter-group { min-width: unset; }\
.lfhte-mobile .lfhte-results-count { margin-left: 0; }\
.lfhte-mobile .lfhte-stats-bar { grid-template-columns: repeat(2, 1fr); }\
.lfhte-mobile .lfhte-included-grid { grid-template-columns: 1fr; }\
.lfhte-mobile .lfhte-compare-table { min-width: unset; }\
.lfhte-mobile .lfhte-card-image { height: 120px; }\
\
/* Mobile pricing cards */\
.lfhte-pricing-cards {\
  display: flex; flex-direction: column; gap: 12px;\
}\
.lfhte-pricing-card {\
  background: ' + C.infoBox + '; border: 1px solid ' + C.border + ';\
  border-radius: 8px; overflow: hidden;\
}\
.lfhte-pricing-card-label {\
  padding: 10px 14px; background: ' + C.textPrimary + '; color: #fff;\
  font-size: 13px; font-weight: 700;\
}\
.lfhte-pricing-card-label button {\
  background: none; border: none; color: #fff; font-weight: 700;\
  font-size: 13px; font-family: inherit; cursor: pointer;\
  text-decoration: underline; text-decoration-style: dotted;\
  text-underline-offset: 2px; padding: 0;\
}\
.lfhte-pricing-card-row {\
  display: flex; justify-content: space-between; align-items: center;\
  padding: 10px 14px; border-bottom: 1px solid ' + C.border + ';\
  font-size: 12px; color: ' + C.textPrimary + ';\
}\
.lfhte-pricing-card-row:last-child { border-bottom: none; }\
.lfhte-pricing-card-row strong { font-weight: 700; }\
\
/* Mobile compare view: stacked cards */\
.lfhte-compare-cards {\
  display: flex; flex-direction: column; gap: 10px;\
  padding: 0 2px;\
}\
.lfhte-compare-card {\
  border: 1px solid ' + C.border + '; border-radius: 8px; overflow: hidden;\
}\
.lfhte-compare-card-label {\
  padding: 10px 14px; background: ' + C.textPrimary + '; color: #fff;\
  font-size: 13px; font-weight: 700;\
}\
.lfhte-compare-card-value {\
  display: flex; justify-content: space-between; align-items: center;\
  padding: 10px 14px; border-bottom: 1px solid ' + C.border + ';\
  font-size: 12px; color: ' + C.textPrimary + ';\
}\
.lfhte-compare-card-value:last-child { border-bottom: none; }\
.lfhte-compare-card-tour {\
  font-weight: 700; font-size: 12px; flex-shrink: 0; margin-right: 12px;\
}\
';
}
