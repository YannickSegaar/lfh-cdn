// YRS: LAST FRONTIER HELISKIING BROWSER SELF-SERVICE EXTENSION VERSION 1 (03 FEB 2026)
// NOTE: This is a copy for reference. The active version is at:
// /website-reference/LFH_website/extensions/browser-self-service.js

export const LastFrontierBrowserSelfService_v4_Unified = {
  name: 'LastFrontierBrowserSelfService',
  type: 'response',
  match: ({ trace }) =>
    trace.type === 'ext_browserSelfService' || trace.payload?.name === 'ext_browserSelfService',
  render: ({ trace, element }) => {
    // --- Configuration from Voiceflow Payload ---
    const {
      formTitle = 'Discover Heliskiing',
      formSubtitle = 'Explore our videos, FAQs, and resources',
      initialTab = 'videos',
      height = '520',
      backgroundColor = '#FFFFFF',
      maxWidth = '460px',
      primaryColor = '#ee2d24',
      secondaryColor = '#1a1a1a',
      accentColor = '#FFFFFF',
      textColor = '#2C3E50',
      lightGray = '#F8F9FA',
      borderColor = '#E5E8EB',
      borderRadius = '16px',
      shadowColor = 'rgba(238, 45, 36, 0.25)',
      shadowSize = '12px',
      animateIn = true,
      logoUrl = 'https://www.lastfrontierheli.com/wp-content/themes/lastfrontier/dist/images/logo-desktop.svg',
      showLogo = true,
    } = trace.payload || {};

    // ========================================================================
    // DATA
    // ========================================================================

    const data = {
      videos: [
        {
          id: 'location',
          title: 'Location',
          videoId: '4CaKMMpebJM',
          platform: 'youtube',
          description: 'Where we fly - Northern BC\'s Skeena Mountains'
        },
        {
          id: 'lodging',
          title: 'Lodging',
          videoId: 'RwYTOkbnEgw',
          platform: 'youtube',
          description: 'Where you stay - Two unique lodge experiences'
        },
        {
          id: 'terrain',
          title: 'Terrain',
          videoId: '1zneyNdALjc',
          platform: 'youtube',
          description: 'What you ski - From alpine bowls to gladed trees'
        },
        {
          id: 'day-in-life',
          title: 'Day in the Life',
          videoId: 'liycyjm5xs8',
          platform: 'youtube',
          description: 'How a day unfolds - 8-12 runs, 15,000+ feet'
        },
        {
          id: 'safety',
          title: 'Safety',
          videoId: '251401988',
          platform: 'vimeo',
          description: 'How we keep you safe - Protocols and equipment'
        },
        {
          id: 'crew',
          title: 'The Crew',
          videoId: '256697044',
          platform: 'vimeo',
          description: 'Who you\'ll meet - Guides, pilots, and staff'
        }
      ],

      faqs: [
        {
          id: 'skill',
          question: 'How good do I have to be?',
          answer: 'You should be a strong intermediate skier comfortable on ungroomed terrain. You don\'t need to be a pro, but you do need confident parallel turns and the ability to handle varied snow conditions. For Ripley Creek specifically, expert-level skills are required.'
        },
        {
          id: 'included',
          question: 'What\'s included?',
          answer: 'Your package includes helicopter access, certified guides, all meals, lodging, powder skis/poles, and complete safety equipment (transceivers, ABS airbags). You just need to bring your boots and outerwear.'
        },
        {
          id: 'safety',
          question: 'Is it safe?',
          answer: 'Safety is our top priority. All guests are trained on avalanche equipment, travel with ACMG-certified guides, and carry ABS airbag systems. Our guides assess conditions daily and choose terrain accordingly.'
        },
        {
          id: 'day',
          question: 'What does a typical day look like?',
          answer: 'After breakfast, you\'ll fly out around 8:30 AM. Expect 8-12 runs totaling 15,000-20,000+ vertical feet. Lunch is in the mountains. You\'re usually back at the lodge by 4 PM for hot tub, sauna, and dinner.'
        },
        {
          id: 'lodge',
          question: 'Which lodge should I choose?',
          answer: 'Bell 2 Lodge is great for strong intermediate to expert skiers who want a remote, off-grid experience. Ripley Creek is for experts only - steeper terrain, 30% more snow, quirky historic town setting.'
        },
        {
          id: 'bring',
          question: 'What do I need to bring?',
          answer: 'Your ski or snowboard boots, outerwear, thermal layers, goggles, helmet, gloves, and comfortable evening clothes. We provide powder skis, poles, and all safety equipment.'
        }
      ],

      resources: [
        {
          id: 'faq',
          title: 'FAQ for First-Timers',
          description: 'Comprehensive answers to common questions',
          url: 'https://lastfrontierheli.com/heliski-resource-guide/faq-first-time-heli-skiers/'
        },
        {
          id: 'prep',
          title: 'Is Heliskiing For Me?',
          description: 'Honest guide to skill and fitness requirements',
          url: 'https://lastfrontierheli.com/is-heliskiing-for-me/'
        },
        {
          id: 'youtube',
          title: 'YouTube Channel',
          description: 'More videos and guest footage',
          url: 'https://youtube.com/LastFrontierHeli1'
        },
        {
          id: 'lodges',
          title: 'Compare Lodges',
          description: 'Bell 2 vs Ripley Creek in detail',
          url: 'https://lastfrontierheli.com/lodges/'
        }
      ]
    };

    // ========================================================================
    // STATE
    // ========================================================================

    let currentTab = initialTab;
    let currentVideoId = null;

    // ========================================================================
    // SETUP CONTAINER
    // ========================================================================

    element.innerHTML = '';
    const container = document.createElement('div');
    container.style.cssText = 'width: 100%; display: flex; justify-content: center; align-items: flex-start; background-color: transparent; margin: 0; padding: 8px 0;';

    const wrapper = document.createElement('div');
    wrapper.className = 'lfh-selfservice-wrapper';
    wrapper.style.cssText = `
      width: ${maxWidth}; min-width: ${maxWidth}; max-width: ${maxWidth};
      border: 1px solid ${borderColor}; border-radius: ${borderRadius};
      overflow: hidden; background: ${backgroundColor};
      backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
      box-shadow: 0 8px ${shadowSize} ${shadowColor}, 0 0 0 1px rgba(255,255,255,0.1);
      height: ${height}px; display: flex; flex-direction: column; margin: 0 auto; position: relative;
    `;

    if (animateIn) {
      wrapper.style.opacity = '0';
      wrapper.style.transform = 'translateY(15px) scale(0.98)';
      wrapper.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
    }

    wrapper.innerHTML = `
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap');

        .lfh-selfservice-wrapper * { box-sizing: border-box; }

        /* Header */
        .lfh-ss-header {
          background: linear-gradient(135deg, ${primaryColor} 0%, #c51e15 100%);
          color: white;
          padding: 16px 20px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .lfh-ss-header::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: linear-gradient(45deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(255,255,255,0.05) 100%);
          pointer-events: none;
        }
        .lfh-ss-logo {
          margin-bottom: 10px;
          position: relative;
          z-index: 1;
        }
        .lfh-ss-logo img {
          max-height: 40px;
          max-width: 180px;
          object-fit: contain;
          filter: brightness(0) invert(1);
        }
        .lfh-ss-title {
          margin: 0 0 4px 0;
          font-family: 'Inter', sans-serif;
          font-size: 19px;
          font-weight: 900;
          letter-spacing: -0.4px;
          position: relative;
          z-index: 1;
          text-transform: uppercase;
        }
        .lfh-ss-subtitle {
          margin: 0;
          font-family: 'Inter', sans-serif;
          font-size: 12px;
          opacity: 0.95;
          line-height: 1.4;
          position: relative;
          z-index: 1;
        }

        /* Tab Navigation */
        .lfh-ss-tabs {
          display: flex;
          background: ${lightGray};
          border-bottom: 1px solid ${borderColor};
          padding: 0;
          margin: 0;
          list-style: none;
        }
        .lfh-ss-tab {
          flex: 1;
          padding: 12px 8px;
          text-align: center;
          font-family: 'Inter', sans-serif;
          font-size: 12px;
          font-weight: 700;
          color: #64748B;
          cursor: pointer;
          border: none;
          background: transparent;
          transition: all 0.2s ease;
          border-bottom: 3px solid transparent;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .lfh-ss-tab:hover {
          background: #eee;
          color: ${textColor};
        }
        .lfh-ss-tab.active {
          color: ${primaryColor};
          border-bottom-color: ${primaryColor};
          background: ${accentColor};
        }

        /* Content Area */
        .lfh-ss-content {
          flex: 1;
          padding: 16px;
          font-family: 'Inter', sans-serif;
          background: ${backgroundColor};
          overflow-y: auto;
          overflow-x: hidden;
        }
        .lfh-ss-panel {
          display: none;
          animation: fadeInUp 0.3s ease-out;
        }
        .lfh-ss-panel.active {
          display: block;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Video Grid */
        .lfh-ss-video-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
        }
        .lfh-ss-video-card {
          position: relative;
          border-radius: 8px;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          background: linear-gradient(135deg, #42494e 0%, #2a2f33 100%);
          aspect-ratio: 16/10;
          border: 2px solid transparent;
        }
        .lfh-ss-video-card:hover {
          transform: scale(1.02);
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          border-color: ${primaryColor};
        }
        .lfh-ss-video-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(transparent, rgba(0,0,0,0.85));
          padding: 20px 10px 10px;
          color: #fff;
        }
        .lfh-ss-video-title {
          font-size: 12px;
          font-weight: 700;
          margin: 0;
          text-transform: uppercase;
          letter-spacing: 0.3px;
        }
        .lfh-ss-play-icon {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 36px;
          height: 36px;
          background: ${primaryColor};
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          box-shadow: 0 2px 8px rgba(238, 45, 36, 0.4);
        }
        .lfh-ss-video-card:hover .lfh-ss-play-icon {
          transform: translate(-50%, -50%) scale(1.1);
          box-shadow: 0 4px 12px rgba(238, 45, 36, 0.5);
        }
        .lfh-ss-play-icon::after {
          content: '';
          width: 0;
          height: 0;
          border-left: 10px solid #fff;
          border-top: 6px solid transparent;
          border-bottom: 6px solid transparent;
          margin-left: 2px;
        }

        /* Video Player */
        .lfh-ss-player {
          display: none;
        }
        .lfh-ss-player.active {
          display: block;
        }
        .lfh-ss-player-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
        }
        .lfh-ss-back-btn {
          background: ${lightGray};
          border: 1px solid ${borderColor};
          border-radius: 6px;
          padding: 8px 14px;
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          font-weight: 700;
          color: #64748B;
          cursor: pointer;
          transition: all 0.2s ease;
          text-transform: uppercase;
          letter-spacing: 0.3px;
        }
        .lfh-ss-back-btn:hover {
          background: #eee;
          color: ${textColor};
          border-color: ${primaryColor};
        }
        .lfh-ss-player-title {
          font-size: 14px;
          font-weight: 900;
          color: ${textColor};
          margin: 0;
          text-transform: uppercase;
          letter-spacing: 0.3px;
        }
        .lfh-ss-player-frame {
          width: 100%;
          aspect-ratio: 16/9;
          border-radius: 8px;
          overflow: hidden;
          background: #000;
        }
        .lfh-ss-player-frame iframe {
          width: 100%;
          height: 100%;
          border: none;
        }
        .lfh-ss-player-desc {
          font-size: 12px;
          color: #64748B;
          margin: 10px 0;
          line-height: 1.4;
        }
        .lfh-ss-related {
          margin-top: 12px;
        }
        .lfh-ss-related-label {
          font-size: 10px;
          font-weight: 700;
          color: #64748B;
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .lfh-ss-related-row {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          padding-bottom: 4px;
        }
        .lfh-ss-related-card {
          flex: 0 0 80px;
          border-radius: 6px;
          overflow: hidden;
          cursor: pointer;
          position: relative;
          aspect-ratio: 16/10;
          background: linear-gradient(135deg, #42494e 0%, #2a2f33 100%);
          border: 2px solid transparent;
          transition: all 0.2s ease;
        }
        .lfh-ss-related-card:hover {
          border-color: ${primaryColor};
        }
        .lfh-ss-related-card span {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: rgba(0,0,0,0.8);
          color: #fff;
          font-size: 9px;
          font-weight: 600;
          padding: 4px;
          text-align: center;
          text-transform: uppercase;
        }

        /* FAQ Accordion */
        .lfh-ss-faq-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .lfh-ss-faq-item {
          border: 2px solid ${borderColor};
          border-radius: 8px;
          overflow: hidden;
          transition: border-color 0.2s ease;
        }
        .lfh-ss-faq-item:hover {
          border-color: #ccc;
        }
        .lfh-ss-faq-item.open {
          border-color: ${primaryColor};
        }
        .lfh-ss-faq-question {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding: 12px 14px;
          background: ${accentColor};
          border: none;
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          font-weight: 700;
          color: ${textColor};
          cursor: pointer;
          text-align: left;
          transition: background 0.2s ease;
        }
        .lfh-ss-faq-question:hover {
          background: ${lightGray};
        }
        .lfh-ss-faq-icon {
          font-size: 16px;
          font-weight: 700;
          color: ${primaryColor};
          transition: transform 0.2s ease;
          flex-shrink: 0;
          margin-left: 10px;
        }
        .lfh-ss-faq-item.open .lfh-ss-faq-icon {
          transform: rotate(45deg);
        }
        .lfh-ss-faq-answer {
          display: none;
          padding: 0 14px 14px;
          font-size: 12px;
          color: #64748B;
          line-height: 1.6;
          background: ${accentColor};
        }
        .lfh-ss-faq-item.open .lfh-ss-faq-answer {
          display: block;
        }

        /* Resources */
        .lfh-ss-resources {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .lfh-ss-resource-card {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px;
          background: ${accentColor};
          border: 2px solid ${borderColor};
          border-radius: 8px;
          text-decoration: none;
          transition: all 0.2s ease;
        }
        .lfh-ss-resource-card:hover {
          border-color: ${primaryColor};
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(238, 45, 36, 0.15);
        }
        .lfh-ss-resource-icon {
          width: 36px;
          height: 36px;
          background: linear-gradient(135deg, ${primaryColor} 0%, #c51e15 100%);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .lfh-ss-resource-icon svg {
          width: 18px;
          height: 18px;
          color: white;
        }
        .lfh-ss-resource-info {
          flex: 1;
          min-width: 0;
        }
        .lfh-ss-resource-title {
          font-size: 13px;
          font-weight: 700;
          color: ${textColor};
          margin: 0 0 2px 0;
        }
        .lfh-ss-resource-desc {
          font-size: 11px;
          color: #64748B;
          margin: 0;
        }
        .lfh-ss-resource-arrow {
          color: ${primaryColor};
          font-size: 16px;
          flex-shrink: 0;
        }

        /* Footer */
        .lfh-ss-footer {
          padding: 12px 16px;
          background: ${lightGray};
          border-top: 1px solid ${borderColor};
          text-align: center;
        }
        .lfh-ss-footer-text {
          font-family: 'Inter', sans-serif;
          font-size: 12px;
          color: #64748B;
          margin: 0;
        }
        .lfh-ss-footer-text strong {
          color: ${textColor};
          font-weight: 700;
        }

        /* Scrollbar */
        .lfh-ss-content::-webkit-scrollbar {
          width: 6px;
        }
        .lfh-ss-content::-webkit-scrollbar-track {
          background: ${lightGray};
          border-radius: 10px;
        }
        .lfh-ss-content::-webkit-scrollbar-thumb {
          background: ${borderColor};
          border-radius: 10px;
        }
        .lfh-ss-content::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      </style>

      <div class="lfh-ss-header">
        ${showLogo ? `
          <div class="lfh-ss-logo">
            <img src="${logoUrl}" alt="Last Frontier Heliskiing" />
          </div>
        ` : ''}
        <h2 class="lfh-ss-title">${formTitle}</h2>
        <p class="lfh-ss-subtitle">${formSubtitle}</p>
      </div>

      <ul class="lfh-ss-tabs" role="tablist">
        <li class="lfh-ss-tab ${initialTab === 'videos' ? 'active' : ''}" role="tab" data-tab="videos">Videos</li>
        <li class="lfh-ss-tab ${initialTab === 'faq' ? 'active' : ''}" role="tab" data-tab="faq">FAQ</li>
        <li class="lfh-ss-tab ${initialTab === 'resources' ? 'active' : ''}" role="tab" data-tab="resources">Resources</li>
      </ul>

      <div class="lfh-ss-content">
        <!-- Videos Panel -->
        <div class="lfh-ss-panel ${initialTab === 'videos' ? 'active' : ''}" data-panel="videos">
          <div class="lfh-ss-video-grid" id="video-grid">
            ${data.videos.map(video => `
              <div class="lfh-ss-video-card" data-video-id="${video.id}" data-vimeo="${video.videoId}">
                <div class="lfh-ss-play-icon"></div>
                <div class="lfh-ss-video-overlay">
                  <p class="lfh-ss-video-title">${video.title}</p>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Video Player -->
        <div class="lfh-ss-player" id="video-player">
          <div class="lfh-ss-player-header">
            <button class="lfh-ss-back-btn" id="back-to-grid">Back</button>
            <h3 class="lfh-ss-player-title" id="player-title"></h3>
          </div>
          <div class="lfh-ss-player-frame" id="player-frame"></div>
          <p class="lfh-ss-player-desc" id="player-desc"></p>
          <div class="lfh-ss-related">
            <p class="lfh-ss-related-label">Up next</p>
            <div class="lfh-ss-related-row" id="related-videos"></div>
          </div>
        </div>

        <!-- FAQ Panel -->
        <div class="lfh-ss-panel ${initialTab === 'faq' ? 'active' : ''}" data-panel="faq">
          <div class="lfh-ss-faq-list">
            ${data.faqs.map(faq => `
              <div class="lfh-ss-faq-item" data-faq="${faq.id}">
                <button class="lfh-ss-faq-question">
                  <span>${faq.question}</span>
                  <span class="lfh-ss-faq-icon">+</span>
                </button>
                <div class="lfh-ss-faq-answer">${faq.answer}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Resources Panel -->
        <div class="lfh-ss-panel ${initialTab === 'resources' ? 'active' : ''}" data-panel="resources">
          <div class="lfh-ss-resources">
            ${data.resources.map(resource => `
              <a class="lfh-ss-resource-card" href="${resource.url}" target="_blank" rel="noopener" data-resource="${resource.id}">
                <div class="lfh-ss-resource-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                </div>
                <div class="lfh-ss-resource-info">
                  <p class="lfh-ss-resource-title">${resource.title}</p>
                  <p class="lfh-ss-resource-desc">${resource.description}</p>
                </div>
                <span class="lfh-ss-resource-arrow">→</span>
              </a>
            `).join('')}
          </div>
        </div>
      </div>

      <div class="lfh-ss-footer">
        <p class="lfh-ss-footer-text">Still have questions? <strong>Just ask!</strong></p>
      </div>
    `;

    container.appendChild(wrapper);
    element.appendChild(container);

    // Animate in
    if (animateIn) {
      setTimeout(() => {
        wrapper.style.opacity = '1';
        wrapper.style.transform = 'translateY(0) scale(1)';
      }, 50);
    }

    // ========================================================================
    // HELPER FUNCTIONS
    // ========================================================================

    function getVideoEmbedUrl(id) {
      if (/^\d+$/.test(id)) return 'https://player.vimeo.com/video/' + id + '?autoplay=1&title=0&byline=0&portrait=0';
      return 'https://www.youtube.com/embed/' + id + '?autoplay=1&rel=0';
    }

    function trackEvent(eventName, eventData) {
      if (window.voiceflow?.chat?.interact) {
        window.voiceflow.chat.interact({
          type: 'event',
          payload: {
            name: `self_service_${eventName}`,
            ...eventData
          }
        });
      }
    }

    function showVideoPlayer(videoId) {
      const video = data.videos.find(v => v.id === videoId);
      if (!video) return;

      currentVideoId = videoId;

      // Hide grid, show player
      wrapper.querySelector('[data-panel="videos"]').classList.remove('active');
      wrapper.querySelector('#video-player').classList.add('active');

      // Set player content
      wrapper.querySelector('#player-title').textContent = video.title;
      wrapper.querySelector('#player-desc').textContent = video.description;
      wrapper.querySelector('#player-frame').innerHTML = `
        <iframe
          src="${getVideoEmbedUrl(video.videoId)}"
          allow="autoplay; fullscreen"
          allowfullscreen>
        </iframe>
      `;

      // Set related videos
      const relatedVideos = data.videos.filter(v => v.id !== videoId).slice(0, 3);
      wrapper.querySelector('#related-videos').innerHTML = relatedVideos.map(v => `
        <div class="lfh-ss-related-card" data-video-id="${v.id}" data-vimeo="${v.videoId}">
          <span>${v.title}</span>
        </div>
      `).join('');

      trackEvent('video_viewed', { videoId: video.id, title: video.title });
    }

    function hideVideoPlayer() {
      wrapper.querySelector('#player-frame').innerHTML = '';
      wrapper.querySelector('#video-player').classList.remove('active');
      wrapper.querySelector('[data-panel="videos"]').classList.add('active');
      currentVideoId = null;
    }

    // ========================================================================
    // EVENT HANDLERS
    // ========================================================================

    // Tab navigation
    wrapper.querySelectorAll('.lfh-ss-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        const tabName = tab.dataset.tab;

        // If in video player, go back first
        if (currentVideoId && tabName === 'videos') {
          hideVideoPlayer();
        }

        // Update tabs
        wrapper.querySelectorAll('.lfh-ss-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        // Update panels
        wrapper.querySelectorAll('.lfh-ss-panel').forEach(p => p.classList.remove('active'));
        wrapper.querySelector(`[data-panel="${tabName}"]`)?.classList.add('active');

        // Hide video player if switching away
        if (tabName !== 'videos' && currentVideoId) {
          hideVideoPlayer();
        }

        // Also hide player panel when switching tabs
        wrapper.querySelector('#video-player').classList.remove('active');

        currentTab = tabName;
        trackEvent('tab_switched', { tab: tabName });
      });
    });

    // Video card clicks
    wrapper.addEventListener('click', (e) => {
      const videoCard = e.target.closest('[data-video-id]');
      if (videoCard) {
        showVideoPlayer(videoCard.dataset.videoId);
      }
    });

    // Back button
    wrapper.querySelector('#back-to-grid')?.addEventListener('click', hideVideoPlayer);

    // FAQ accordion
    wrapper.querySelectorAll('.lfh-ss-faq-question').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = btn.closest('.lfh-ss-faq-item');
        const wasOpen = item.classList.contains('open');

        // Close all others
        wrapper.querySelectorAll('.lfh-ss-faq-item').forEach(i => i.classList.remove('open'));

        // Toggle this one
        if (!wasOpen) {
          item.classList.add('open');
          trackEvent('faq_opened', { faqId: item.dataset.faq });
        }
      });
    });

    // Resource clicks
    wrapper.querySelectorAll('.lfh-ss-resource-card').forEach(card => {
      card.addEventListener('click', () => {
        trackEvent('resource_clicked', { resourceId: card.dataset.resource });
      });
    });

    // Track initial render
    trackEvent('extension_opened', { initialTab });

    return function cleanup() {
      // Cleanup if needed
    };
  }
};

export default LastFrontierBrowserSelfService_v4_Unified;
