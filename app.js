/* ==========================================================================
   MILDSUGAR STYLE INTERACTIVE ENGINE (app.js)
   Custom Japanese Digital Craftsmanship, Stalker Cursor & Case Switcher
   ========================================================================== */

// Global Lightbox Handler
window.openLightbox = function(src, title, tag, desc, specs) {
  const lightbox = document.getElementById('posterLightbox');
  const img = document.getElementById('lightboxImg');
  const tagEl = document.getElementById('lightboxTag');
  const titleEl = document.getElementById('lightboxTitle');
  const descEl = document.getElementById('lightboxDesc');
  const specsEl = document.getElementById('lightboxSpecs');
  
  if (lightbox && img) {
    img.src = src;
    if (tagEl) tagEl.textContent = tag || 'CREATIVE ASSET';
    if (titleEl) titleEl.textContent = title || '';
    if (descEl) descEl.textContent = desc || '';
    if (specsEl) {
      if (Array.isArray(specs) && specs.length > 0) {
        specsEl.innerHTML = specs.map(item => `
          <div class="lightbox-spec-item">
            <span class="lightbox-spec-label">${item[0]}</span>
            <span class="lightbox-spec-val">${item[1]}</span>
          </div>
        `).join('');
      } else {
        specsEl.innerHTML = '';
      }
    }
    lightbox.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  }
};

window.closeLightbox = function() {
  const lightbox = document.getElementById('posterLightbox');
  if (lightbox) {
    lightbox.classList.remove('is-active');
    document.body.style.overflow = '';
  }
};

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    window.closeLightbox();
    const modal = document.getElementById('caseModalOverlay');
    if (modal) modal.classList.remove('is-active');
  }
});

document.addEventListener('DOMContentLoaded', () => {
  // --------------------------------------------------------------------------
    // --------------------------------------------------------------------------
  // Brand Header Dynamic Animated Role Typewriter (Clean Pure Text - No Emojis)
  // --------------------------------------------------------------------------
  const dynamicTextEl = document.getElementById('brandDynamicText');

  if (dynamicTextEl) {
    const roles = [
      "Digital Growth & Acquisition",
      "Paid Ads & 4.2x ROAS Execution",
      "Social Media & Viral Hooks",
      "High-Retention Creative & Motion",
      "Marketing Automation & Data Systems"
    ];

    let roleIdx = 0;
    let charIdx = roles[0].length;
    let isDeleting = true;
    let typeSpeed = 70;

    function runTypewriter() {
      const fullText = roles[roleIdx];

      if (isDeleting) {
        charIdx--;
        typeSpeed = 26;
      } else {
        charIdx++;
        typeSpeed = 65;
      }

      dynamicTextEl.textContent = fullText.substring(0, charIdx);

      if (!isDeleting && charIdx === fullText.length) {
        isDeleting = true;
        typeSpeed = 2600; // Hold for 2.6 seconds
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
        typeSpeed = 350; // Pause before typing next
      }

      setTimeout(runTypewriter, typeSpeed);
    }

    // Start with first role fully rendered, wait before starting backspace
    setTimeout(runTypewriter, 2600);
  }

  // 1. Mouse Stalker Cursor Follower
  const stalker = document.getElementById('stalker');
  const stalkerText = document.getElementById('stalkerText');
  let mouseX = -200, mouseY = -200;
  let currentX = -200, currentY = -200;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (stalker && !stalker.classList.contains('is-active')) {
      stalker.classList.add('is-active');
    }
  });

  const renderStalker = () => {
    currentX += (mouseX - currentX) * 0.2;
    currentY += (mouseY - currentY) * 0.2;
    if (stalker) {
      stalker.style.left = `${currentX}px`;
      stalker.style.top = `${currentY}px`;
    }
    requestAnimationFrame(renderStalker);
  };
  requestAnimationFrame(renderStalker);

  // Stalker hover interactions
  const bindStalkerHover = (selector, text, isHoverClass = true) => {
    document.querySelectorAll(selector).forEach(el => {
      el.addEventListener('mouseenter', () => {
        if (!stalker) return;
        if (stalkerText) stalkerText.textContent = text;
        if (isHoverClass) stalker.classList.add('is-hovering');
      });
      el.addEventListener('mouseleave', () => {
        if (!stalker) return;
        if (stalkerText) stalkerText.textContent = '';
        stalker.classList.remove('is-hovering');
      });
    });
  };

  bindStalkerHover('.case-card__visual', 'View ↗');
  bindStalkerHover('.mildsugar-btn', 'Explore ✦');
  bindStalkerHover('.discipline-box', 'Inspect ✦');
  bindStalkerHover('.time-toggle-btn', 'Theme');
  bindStalkerHover('.action-btn-pill', 'Connect');
  bindStalkerHover('.poster-card', 'Preview 🔍');
  bindStalkerHover('.exp-card', 'Details ✦');
  bindStalkerHover('.offer-card', 'Pricing ✦');

  // 2. Day & Night Mode (Room Time Toggle)
  const timeToggleBtn = document.getElementById('timeToggleBtn');
  const savedTheme = localStorage.getItem('mildsugar_theme') || 'day';

  const applyTheme = (theme) => {
    if (theme === 'night') {
      document.documentElement.setAttribute('data-theme', 'night');
      if (timeToggleBtn) {
        timeToggleBtn.innerHTML = `<span class="icon">🌙</span> Night`;
      }
      const dayImg = document.getElementById('heroImgDay');
      const nightImg = document.getElementById('heroImgNight');
      if (dayImg) dayImg.style.opacity = '0';
      if (nightImg) nightImg.style.opacity = '1';
    } else {
      document.documentElement.removeAttribute('data-theme');
      if (timeToggleBtn) {
        timeToggleBtn.innerHTML = `<span class="icon">☀️</span> Day`;
      }
      const dayImg = document.getElementById('heroImgDay');
      const nightImg = document.getElementById('heroImgNight');
      if (dayImg) dayImg.style.opacity = '1';
      if (nightImg) nightImg.style.opacity = '0';
    }
    localStorage.setItem('mildsugar_theme', theme);
  };
  applyTheme(savedTheme);

  if (timeToggleBtn) {
    timeToggleBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') === 'night' ? 'night' : 'day';
      applyTheme(current === 'night' ? 'day' : 'night');
    });
  }

  // 3. Header Drawer Menu
  const menuBtn = document.getElementById('menuBtn');
  const menuDrawer = document.getElementById('menuDrawer');

  if (menuBtn && menuDrawer) {
    menuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      menuBtn.classList.toggle('is-open');
      menuDrawer.classList.toggle('is-open');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!menuDrawer.contains(e.target) && !menuBtn.contains(e.target)) {
        menuBtn.classList.remove('is-open');
        menuDrawer.classList.remove('is-open');
      }
    });

    // Close menu on link click
    menuDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuBtn.classList.remove('is-open');
        menuDrawer.classList.remove('is-open');
      });
    });
  }

  // 4. Interactive 5-Case Studies Switcher & Ghost Background Sync
  const caseCards = document.querySelectorAll('.case-card');
  const navItems = document.querySelectorAll('.p-cases__nav-item');
  const bgGhostQuote = document.getElementById('bgGhostQuote');

  const ghostQuotes = [
    "From viral hook to community loyalty. 85K+ followers & 4.2M views.",
    "Words that persuade, stories that convert. High-impact content strategy.",
    "Visual identity that commands attention. From logo system to social kit.",
    "Data-driven performance marketing. Slashing CPA by 52% and 4.2x ROAS.",
    "Precision data architecture. 100% accuracy, automated workflows & clean databases."
  ];

  const setActiveCase = (index) => {
    caseCards.forEach((card, idx) => {
      if (idx === index) {
        card.classList.add('is-active');
      } else {
        card.classList.remove('is-active');
      }
    });

    navItems.forEach((nav, idx) => {
      if (idx === index) {
        nav.classList.add('is-current');
      } else {
        nav.classList.remove('is-current');
      }
    });

    if (bgGhostQuote && ghostQuotes[index]) {
      bgGhostQuote.style.opacity = '0';
      bgGhostQuote.style.transform = 'translateY(20px)';
      setTimeout(() => {
        bgGhostQuote.textContent = ghostQuotes[index];
        bgGhostQuote.style.opacity = '0.12';
        bgGhostQuote.style.transform = 'translateY(0)';
      }, 250);
    }
  };

  navItems.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetCase = parseInt(btn.dataset.caseIndex, 10);
      setActiveCase(targetCase);
    });
  });

  // 5. Case Deep-Dive Modal Data (Option A: Outcome & Impact Architecture)
  const caseDetails = [
    {
      badge: "VIRAL SOCIAL REACH & SHORTS",
      metric: "+85K Followers & 4.2M Views",
      title: "01 // Viral Growth Engine: From Cold Scrollers to 85K+ Engaged Community",
      tagline: "Short-Form Video Strategy, Kinetic Hooks & DM Lead Automation",
      client: "International Creator Channels & Direct-to-Consumer Brands",
      whatsappTopic: "Case 01: Viral Growth Engine & 85K+ Community Scaling",
      stats: [
        { val: "+85,000", label: "Organic Audience" },
        { val: "4.2M+", label: "Video Impressions" },
        { val: "18.0%", label: "Engagement Lift" },
        { val: "310+", label: "Automated Inbounds" }
      ],
      challenge: "Organic reach was stagnating below 1.2% due to algorithmic fatigue and generic formats. Viewers consistently dropped off within the first 1.5 seconds of vertical videos, preventing algorithmic promotion. Furthermore, zero automated capture mechanism existed to turn view counts into qualified direct message inquiries or discovery calls.",
      phases: [
        {
          step: "01",
          title: "3-Second Psychological Hook Sprint",
          desc: "Formulated and A/B tested 25+ pattern-interrupt hook formulas (Contrarian, Shock-Stat, Visual Twist) isolating winning formats within 48 hours."
        },
        {
          step: "02",
          title: "Kinetic Video Pacing & Narrative Rhythm",
          desc: "Engineered rapid CapCut cuts every 1.8 seconds with bespoke kinetic typography and sound design to elevate average watch time past 82%."
        },
        {
          step: "03",
          title: "Conversational Inbound DM Funnels",
          desc: "Configured automated comment-to-DM triggers (e.g., 'GROWTH', 'TEMPLATE') routing viewers directly into pre-qualified sales conversations."
        }
      ],
      evidence: [
        {
          src: "showcase_viral_motion_hook.jpg",
          caption: "Retention-Engineered Kinetic Hook Visual Framework",
          alt: "Viral Motion Hook"
        }
      ],
      results: [
        "Scaled organic followers from zero to 85,000+ targeted audience within 90 days",
        "Generated 4,200,000+ verified short-form video views across key hero campaigns",
        "Elevated average community engagement rate from 1.2% to 18.0%",
        "Direct message automated funnels converted 310+ high-intent inbound client inquiries"
      ],
      tools: ["CapCut Pro", "Instagram Reels", "TikTok Creator Studio", "Metricool", "Canva Pro", "Notion Content Hub"]
    },
    {
      badge: "EXECUTIVE BRANDING & B2B COPY",
      metric: "42 Qualified Inbound Leads Monthly",
      title: "02 // Conversion Copywriting & Content Architecture: Generating 42 Inbound B2B Leads/mo",
      tagline: "High-Ticket Copywriting, SEO Pillar Hubs & LinkedIn Thought Leadership",
      client: "B2B SaaS Founders, Enterprise Consultants & Advisory Firms",
      whatsappTopic: "Case 02: Conversion Copywriting & 42 Inbound Leads/mo",
      stats: [
        { val: "42/mo", label: "Qualified B2B Leads" },
        { val: "120K+", label: "Monthly Impressions" },
        { val: "46.8%", label: "Email Open Rate" },
        { val: "Top 5", label: "14 Google Keywords" }
      ],
      challenge: "The client's sales pipeline was bone-dry and reliant on exhausting outbound cold pitches with dwindling reply rates. Website copy was passive and feature-centric without addressing executive purchase hesitation. Additionally, the founder lacked a personal thought-leadership presence on LinkedIn.",
      phases: [
        {
          step: "01",
          title: "Customer Persona & Objection Extraction",
          desc: "Conducted stakeholder interviews extracting exact client vernacular, key ROI criteria, and primary enterprise purchase friction points."
        },
        {
          step: "02",
          title: "Executive Thought Leadership Editorial",
          desc: "Authored 3x weekly authority carousels and contrarian breakdowns following the Hook-Problem-Proof-Offer framework on LinkedIn."
        },
        {
          step: "03",
          title: "Friction-Free Wireframes & Email Nurture",
          desc: "Redrafted landing page copy with social proof stacking and deployed a 6-part automated email series with 46.8% open rates."
        }
      ],
      evidence: [
        {
          src: "ChatGPT Image Jul 8, 2026, 04_39_44 PM.png",
          caption: "Executive Content Architecture & B2B Inbound Desk",
          alt: "Conversion Copywriting Architecture"
        }
      ],
      results: [
        "Consistently generated 42 qualified inbound B2B consulting inquiries every month",
        "Surpassed 120,000+ monthly organic impressions on executive LinkedIn brand",
        "Ranked 14 high-intent industry keywords in Google Top 5 search positions",
        "Automated email nurture sequences delivered a sustained 46.8% open rate and 11.2% CTR"
      ],
      tools: ["Notion", "Google Docs", "Ahrefs", "LinkedIn Creator Mode", "Shield Analytics", "Grammarly Business"]
    },
    {
      badge: "BRAND IDENTITY & DESIGN SYSTEMS",
      metric: "+3.8% Ad CTR & 15+ Touchpoints",
      title: "03 // Brand Identity & Creative Kit: Elevating Brand Perception Across 15 Channels",
      tagline: "Swiss-Grade Visual Architecture, High-CTR Paid Ad Kits & Pitch Decks",
      client: "Helvetiqa Swiss Horology, Modern Tech Startups & Luxury Brands",
      whatsappTopic: "Case 03: Brand Identity & High-CTR Creative Systems",
      stats: [
        { val: "+3.8%", label: "Ad CTR Improvement" },
        { val: "15+", label: "Brand Touchpoints" },
        { val: "100+", label: "Bespoke Vector Assets" },
        { val: "95%", label: "1st Round Approvals" }
      ],
      challenge: "Fragmented visual branding across channels diluted credibility and hurt conversion rates among high-net-worth buyers. Paid advertising creatives suffered from low CTR (<1.1%) due to generic templates, while presentation decks lacked executive typographic polish.",
      phases: [
        {
          step: "01",
          title: "Swiss-Inspired Identity Guidelines",
          desc: "Constructed comprehensive brand rules: strict typography hierarchy, geometric spacing scales, and Pantone color psychology direction."
        },
        {
          step: "02",
          title: "High-CTR Paid Creative Production Matrix",
          desc: "Designed 40+ modular paid ad assets across high-contrast statics, motion teasers, and multi-slide educational carousels."
        },
        {
          step: "03",
          title: "Executive & Investor Pitch Packaging",
          desc: "Created investor pitch collateral in Figma/Illustrator with data visualization layouts engineered for high-stakes presentations."
        }
      ],
      evidence: [
        {
          src: "showcase_helvetiqa_identity.jpg",
          caption: "Helvetiqa Swiss Precision Corporate Identity Kit & Guidelines",
          alt: "Helvetiqa Branding Guidelines"
        }
      ],
      results: [
        "Boosted paid ad click-through rate (CTR) by an immediate +3.8% across ad sets",
        "Seamless visual identity deployed across 15+ international marketing touchpoints",
        "Authored 100+ bespoke vector graphics, ad variants, and presentation assets",
        "Achieved client and stakeholder sign-off in 95% of first-round creative reviews"
      ],
      tools: ["Adobe Illustrator", "Photoshop", "Figma Enterprise", "Canva Enterprise", "After Effects"]
    },
    {
      badge: "PERFORMANCE MARKETING & PAID ADS",
      metric: "4.2x to 6.8x ROAS & -52% CPA",
      title: "04 // Full-Funnel Paid Advertising: Slashing CPA by 52% and Scaling ROAS to 4.2x–6.8x",
      tagline: "Dynamic Creative Testing (DCT), Meta/Google Paid Media & GA4 Attribution",
      client: "Direct-to-Consumer Brands & Scaled E-Commerce Retainers",
      whatsappTopic: "Case 04: Full-Funnel Paid Ads & ROAS Scaling",
      stats: [
        { val: "4.2x–6.8x", label: "Blended Ad ROAS" },
        { val: "-52%", label: "CPA Reduction" },
        { val: "+$48K", label: "Abandoned Cart Revenue" },
        { val: "$25K+", label: "Monthly Profitable Spend" }
      ],
      challenge: "Customer acquisition costs were skyrocketing ($54+ CPA) with volatile returns eating away operating margins. Attribution tracking suffered from severe iOS privacy signal loss, and campaigns suffered from creative fatigue with no dynamic testing structure.",
      phases: [
        {
          step: "01",
          title: "Attribution Audit & Meta CAPI Setup",
          desc: "Integrated server-side Meta Conversions API (CAPI) and GA4 custom events recovering 98%+ signal tracking accuracy."
        },
        {
          step: "02",
          title: "Dynamic Creative Testing (DCT) Engine",
          desc: "Deployed rapid testing matrix pairing 3 emotional angles × 3 hooks × 3 creatives to isolate scalable winners without ad spend waste."
        },
        {
          step: "03",
          title: "Omnichannel Retargeting & Scaling",
          desc: "Structured full-funnel retargeting with urgency-driven abandoned cart workflows scaling profitably from $3,000 to $25,000+ monthly spend."
        }
      ],
      evidence: [
        {
          src: "showcase_apex_audio_ad.jpg",
          caption: "High-ROAS Direct-Response Paid Creative Staging",
          alt: "High-ROAS Creative Staging"
        }
      ],
      results: [
        "Maintained sustained 4.2x to 6.8x Return on Ad Spend (ROAS) across all scaling sprints",
        "Slashed Cost Per Acquisition (CPA) by 52% within 60 days of campaign restructuring",
        "Recovered over $48,000 in abandoned checkout revenue via targeted retargeting funnels",
        "Successfully scaled ad spend profitably from $3,000 to $25,000+ monthly budget"
      ],
      tools: ["Meta Ads Manager", "Google Ads (Certified)", "Google Analytics 4", "Looker Studio", "Shopify", "Klaviyo"]
    },
    {
      badge: "COMMERCIAL DATA & INVENTORY SYSTEMS",
      metric: "100% Accuracy & 25,000+ SKUs",
      title: "05 // Precision Commercial Data Systems: 100% Accuracy Across 25,000+ Records",
      tagline: "Dynamic Spreadsheet Architecture, Multi-Channel Reconciliation & Inventory ERP",
      client: "Enterprise Construction, Logistics Facilities & Commercial E-Commerce",
      whatsappTopic: "Case 05: Commercial Data Systems & Inventory Precision",
      stats: [
        { val: "100%", label: "Precision Rate" },
        { val: "25,000+", label: "SKU Items Audited" },
        { val: "80%", label: "Manual Hours Saved" },
        { val: "0 Penalties", label: "7 Years Clean Audits" }
      ],
      challenge: "Fragmented manual spreadsheets caused physical inventory variance, stock discrepancies, and delayed executive visibility. Managers spent 15+ hours weekly compiling manual status sheets, and duplicate records led to frequent stockouts.",
      phases: [
        {
          step: "01",
          title: "Ledger Audit & Deduplication Sprint",
          desc: "Cleaned and normalized 25,000+ line items, removing duplicate entries and enforcing standard data entry schemas across departments."
        },
        {
          step: "02",
          title: "Advanced Formula Pipelines & Validation",
          desc: "Engineered automated Excel and Google Sheets models utilizing dynamic XLOOKUP, INDEX/MATCH, and automated error-flagging logic."
        },
        {
          step: "03",
          title: "Executive Inventory Dashboard & Reorder Triggers",
          desc: "Constructed real-time stock dashboards with conditional automated alerts triggering before popular items reach critical thresholds."
        }
      ],
      evidence: [
        {
          src: "Professional at a Modern Office Desk.png",
          caption: "Commercial Data Operations & Precision Architecture System",
          alt: "Commercial Data Operations"
        }
      ],
      results: [
        "Maintained 100% data entry precision across 25,000+ technical components and logistics items",
        "Reduced weekly executive inventory compilation time from 6 hours to real-time automated sheets",
        "Cleaned and enriched 10,000+ client CRM records eliminating duplicate data by 99.4%",
        "Zero audit penalties across 7 consecutive years of external commercial audits"
      ],
      tools: ["Advanced MS Excel (XLOOKUP)", "Google Sheets (Apps Script)", "ERP Systems", "Power Query", "Oracle Inventory"]
    }
  ];

  const modalOverlay = document.getElementById('caseModalOverlay');
  const modalBody = document.getElementById('caseModalBody');
  const modalClose = document.getElementById('caseModalClose');

  window.openCaseModal = function(index) {
    const data = caseDetails[index];
    if (!data || !modalBody || !modalOverlay) return;

    const waEncoded = encodeURIComponent(`Hi Shahid! I reviewed your "${data.title}" case study and would like to discuss a similar project.`);

    modalBody.innerHTML = `
      <div class="case-modal-badge-row">
        <span class="case-modal-badge">${data.badge}</span>
        <span class="case-modal-metric-badge">${data.metric}</span>
      </div>

      <h2 class="case-modal-title">${data.title}</h2>
      <div class="case-modal-client">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
        <span>${data.client}</span>
      </div>

      <!-- 4-Stat Impact Bar -->
      <div class="case-modal-stats-grid">
        ${data.stats.map(s => `
          <div class="case-stat-box">
            <span class="case-stat-val">${s.val}</span>
            <span class="case-stat-label">${s.label}</span>
          </div>
        `).join('')}
      </div>

      <!-- Section 1: The Bottleneck (Challenge) -->
      <div class="case-modal-sec">
        <h4 class="case-modal-sec-title">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
          The Core Challenge & Bottleneck
        </h4>
        <p class="case-modal-sec-text">${data.challenge}</p>
      </div>

      <!-- Section 2: 3-Phase Execution Roadmap -->
      <div class="case-modal-sec">
        <h4 class="case-modal-sec-title">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
          Strategic Execution (3-Phase Roadmap)
        </h4>
        <div class="case-modal-phases">
          ${data.phases.map(p => `
            <div class="case-phase-item">
              <span class="case-phase-pill">PHASE ${p.step}</span>
              <div class="case-phase-content">
                <strong>${p.title}</strong>
                <p>${p.desc}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Section 3: Visual Evidence & Insights Gallery -->
      <div class="case-modal-sec">
        <h4 class="case-modal-sec-title">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
          Visual Evidence & Insights Gallery
        </h4>
        <div class="case-modal-evidence-wrap">
          ${data.evidence.map(e => `
            <div class="case-evidence-card" onclick="openLightbox('${e.src}', '${data.title}', '${data.badge}', '${e.caption}', [['CATEGORY', '${data.badge}'], ['METRIC', '${data.metric}']])" title="Click to inspect in fullscreen">
              <img src="${e.src}" alt="${e.alt}" loading="lazy">
              <div class="case-evidence-caption">
                <span>${e.caption}</span>
                <span class="case-evidence-zoom-hint">ZOOM ↗</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Section 4: Verified Outcomes -->
      <div class="case-modal-sec">
        <h4 class="case-modal-sec-title">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
          Verified Key Results & Commercial Impact
        </h4>
        <div class="case-results-grid">
          ${data.results.map(r => `
            <div class="case-result-row">
              <span class="case-result-chk" aria-hidden="true">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </span>
              <span>${r}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Section 5: Toolkit & Stack -->
      <div class="case-modal-sec">
        <h4 class="case-modal-sec-title">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
          Applied Toolkit & Systems
        </h4>
        <div class="case-chips-wrap">
          ${data.tools.map(t => `<span class="disc-chip">${t}</span>`).join('')}
        </div>
      </div>

      <!-- Section 6: Action Buttons -->
      <div class="case-modal-cta-row">
        <a href="https://wa.me/923004822560?text=${waEncoded}" target="_blank" rel="noopener noreferrer" class="case-modal-wa-btn">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
          </svg>
          <span>Discuss via WhatsApp</span>
        </a>
        <button type="button" onclick="sendCaseBrief(${index})" class="case-modal-brief-btn">
          <span>Send Project Brief ↓</span>
        </button>
      </div>
    `;

    modalOverlay.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  };

  // Global Brief Dispatch from Case Modal
  window.sendCaseBrief = function(index) {
    const data = caseDetails[index];
    if (!data) return;

    modalOverlay.classList.remove('is-active');
    document.body.style.overflow = '';

    setTimeout(() => {
      const contactSec = document.getElementById('mildContactForm') || document.getElementById('contact');
      if (contactSec) {
        contactSec.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      const serviceSelect = document.getElementById('contactService');
      const msgField = document.getElementById('contactMessage');

      const serviceMap = [
        "Social Media Strategy & Viral Growth",
        "Content Strategy & Conversion Copywriting",
        "Graphic Design & Creative Brand Identity",
        "Performance Marketing & Paid Ads (ROAS)",
        "Inventory Operations & Commercial Data Systems"
      ];

      if (serviceSelect && serviceMap[index]) {
        serviceSelect.value = serviceMap[index];
      }

      if (msgField) {
        msgField.value = `Hi Shahid,

I saw your "${data.title}" case study and would like to explore a similar strategy for my brand.

Project Overview:
• Brand / Company: 
• Target Goal / Objective: 
• Target Timeline: 

Looking forward to your response!`;

        msgField.focus();
        msgField.scrollTop = 0;
        const cursorTarget = '• Brand / Company: ';
        const cIdx = msgField.value.indexOf(cursorTarget);
        if (cIdx !== -1) {
          const targetPos = cIdx + cursorTarget.length;
          msgField.setSelectionRange(targetPos, targetPos);
        }

        const formCard = document.querySelector('.contact-card-mild');
        if (formCard) {
          formCard.style.transition = 'box-shadow 0.4s ease, border-color 0.4s ease';
          formCard.style.borderColor = 'var(--color-orange)';
          formCard.style.boxShadow = '0 0 0 3px rgba(254, 168, 49, 0.35)';
          setTimeout(() => {
            formCard.style.borderColor = '';
            formCard.style.boxShadow = '';
          }, 2200);
        }
      }
    }, 160);
  };

    if (modalClose && modalOverlay) {
    modalClose.addEventListener('click', () => modalOverlay.classList.remove('is-active'));
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) modalOverlay.classList.remove('is-active');
    });
  }

  // Bind clicks on case visual cards to open deep-dive
  caseCards.forEach((card, idx) => {
    const visual = card.querySelector('.case-card__visual');
    if (visual) {
      visual.addEventListener('click', () => openCaseModal(idx));
    }
  });

    // 6. Dual-Dispatch Contact Form (WhatsApp + Direct Email)
  const contactForm = document.getElementById('mildContactForm');
  const btnWhatsApp = document.getElementById('btnSubmitWhatsApp');
  const btnEmail = document.getElementById('btnSubmitEmail');

  function getFormPayload() {
    if (contactForm && !contactForm.reportValidity()) return null;
    return {
      name: (document.getElementById('contactName')?.value || '').trim(),
      service: (document.getElementById('contactService')?.value || '').trim(),
      message: (document.getElementById('contactMessage')?.value || '').trim()
    };
  }

  if (btnWhatsApp) {
    btnWhatsApp.addEventListener('click', () => {
      const payload = getFormPayload();
      if (!payload) return;
      const waText = encodeURIComponent(
        `Hi Shahid! I came across your portfolio.\n\n*From:* ${payload.name}\n*Service:* ${payload.service}\n*Details:* ${payload.message}`
      );
      window.open(`https://wa.me/923004822560?text=${waText}`, '_blank');
      contactForm.reset();
    });
  }

  if (btnEmail) {
    btnEmail.addEventListener('click', () => {
      const payload = getFormPayload();
      if (!payload) return;
      const subject = encodeURIComponent(`Project Inquiry: ${payload.service} - ${payload.name}`);
      const body = encodeURIComponent(
        `Hi Shahid,\n\nI came across your portfolio and would like to discuss a project with you.\n\nFrom: ${payload.name}\nService Needed: ${payload.service}\n\nProject Requirements / Details:\n${payload.message}\n\nLooking forward to hearing from you!`
      );
      window.location.href = `mailto:heyshahidakram@gmail.com?subject=${subject}&body=${body}`;
      contactForm.reset();
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (btnWhatsApp) btnWhatsApp.click();
    });
  }
});


// ==========================================
// BLOG & GROWTH INSIGHTS DYNAMIC ARCHITECTURE
// ==========================================
// Add as many articles as you want here!
// Each article will automatically render in the slider without making the page longer.
const DEFAULT_ARTICLES = [
  {
    tag: "Growth Strategy",
    title: "Vanity Metrics vs. Revenue: Why 5,000 Followers Can Outperform 100,000",
    snippet: "Why follower counts don't pay bills in 2026, and the exact 3-step high-intent funnel framework we use to convert cold scrollers into booked high-ticket clients.",
    content: `
      <p style="font-size: 16px; line-height: 1.8; margin-bottom: 18px;">
        A brand with 5,000 hyper-engaged followers can easily generate more predictable monthly revenue than a generic account with 100,000 empty followers. In 2026, the biggest trap in social media marketing remains the <strong>"Vanity Metric Bubble"</strong>.
      </p>
      <h4 style="font-size: 18px; color: var(--color-orange); margin: 24px 0 10px 0;">1. Broad Content Attracts Tourists; High-Intent Solves Pain</h4>
      <p style="font-size: 15px; line-height: 1.7; margin-bottom: 14px;">
        When brands create generic lifestyle content, they get random likes from people who will never buy. Our Helvetiqa framework focuses on addressing specific client bottlenecks, demonstrating direct ROI, and showcasing deep domain expertise.
      </p>
      <h4 style="font-size: 18px; color: var(--color-orange); margin: 24px 0 10px 0;">2. Build a Frictionless Funnel</h4>
      <p style="font-size: 15px; line-height: 1.7; margin-bottom: 14px;">
        A viral post without a next step is wasted attention. Every carousel, Reel, and tweet must offer an intentional call to action: direct message automation, a high-value resource download, or an executive discovery call link.
      </p>
      <h4 style="font-size: 18px; color: var(--color-orange); margin: 24px 0 10px 0;">3. Track What Moves Cash Flow</h4>
      <p style="font-size: 15px; line-height: 1.7; margin-bottom: 14px;">
        Stop reporting impressions to leadership. Measure Cost Per Lead (CPL), Click-Through Rate (CTR), and Sales Pipeline Velocity. Content builds awareness; disciplined strategy builds revenue.
      </p>
    `
  },
  {
    tag: "Short-Form Video",
    title: "The 3&#8209;Second Psychological Hook Framework for Viral Reels & TikToks",
    snippet: "How to defeat algorithmic drop-offs using visual pattern interrupts, pacing, and emotional curiosity gaps that retain viewers past the critical 5-second mark.",
    content: `
      <p style="font-size: 16px; line-height: 1.8; margin-bottom: 18px;">
        Algorithms don't reward effort; they reward viewer retention. If your video loses more than 50% of its audience in the first 3 seconds, the algorithm immediately chokes its organic distribution.
      </p>
      <h4 style="font-size: 18px; color: var(--color-orange); margin: 24px 0 10px 0;">1. Visual Pattern Interrupts</h4>
      <p style="font-size: 15px; line-height: 1.7; margin-bottom: 14px;">
        Never start a video standing still and saying "Hello guys". Start in media res: dynamic camera movement, instant on-screen kinetic typography, or an intriguing visual action that breaks the user's subconscious scroll trance.
      </p>
      <h4 style="font-size: 18px; color: var(--color-orange); margin: 24px 0 10px 0;">2. The Cognitive Curiosity Gap</h4>
      <p style="font-size: 15px; line-height: 1.7; margin-bottom: 14px;">
        State a controversial or high-stakes premise: <em>"The single biggest mistake cost us $14,000 on Meta last month..."</em>. The viewer's brain is naturally hardwired to watch until that tension is resolved.
      </p>
      <h4 style="font-size: 18px; color: var(--color-orange); margin: 24px 0 10px 0;">3. Dynamic Sound & Pacing</h4>
      <p style="font-size: 15px; line-height: 1.7; margin-bottom: 14px;">
        Use snappy cut transitions every 1.5–2.5 seconds in CapCut, supplemented with subtle sound effects (whoosh, pop, click) to keep engagement peaked throughout the runtime.
      </p>
    `
  },
  {
    tag: "Paid Performance",
    title: "Slashing Meta Ads CPA by 52%: Our Dynamic Creative Testing Matrix",
    snippet: "A step-by-step blueprint on structuring DCT ad sets, rapid visual iteration, and audience retargeting to achieve 4.2x ROAS without burning ad spend.",
    content: `
      <p style="font-size: 16px; line-height: 1.8; margin-bottom: 18px;">
        Most media buyers burn their budget by running a single ad creative to a broad audience and hoping for miracles. Achieving a scalable 4.2x ROAS requires a systematic creative testing protocol.
      </p>
      <h4 style="font-size: 18px; color: var(--color-orange); margin: 24px 0 10px 0;">1. The 3:2:2 Dynamic Creative Testing (DCT) Setup</h4>
      <p style="font-size: 15px; line-height: 1.7; margin-bottom: 14px;">
        In every test campaign, upload 3 distinct video/image hooks, 2 primary copy variations (short vs. story-driven), and 2 bold headlines. Let Meta's machine learning find the winning mathematical combinations.
      </p>
      <h4 style="font-size: 18px; color: var(--color-orange); margin: 24px 0 10px 0;">2. Kill Fast, Scale Aggressively</h4>
      <p style="font-size: 15px; line-height: 1.7; margin-bottom: 14px;">
        Analyze results after 2x–3x target CPA spend. Immediately turn off creatives with low outbound CTR (<1.2%), and migrate the winning post IDs into your primary scaling campaign.
      </p>
      <h4 style="font-size: 18px; color: var(--color-orange); margin: 24px 0 10px 0;">3. Retargeting with Social Proof</h4>
      <p style="font-size: 15px; line-height: 1.7; margin-bottom: 14px;">
        Warm retargeting audiences should never see the same cold hook. Show them customer transformation videos, case study carousel breakdowns, and risk-reversal guarantees to close the loop.
      </p>
    `
  },
  {
    tag: "Personal Branding",
    title: "The Executive LinkedIn Inbound Engine: Turning Profile Views Into High&#8209;Ticket Retainers",
    snippet: "How to engineer an executive profile headline, structure 3 high-trust content pillars, and leverage creator mode to attract enterprise recruiter outreach.",
    content: `
      <p style="font-size: 16px; line-height: 1.8; margin-bottom: 18px;">
        LinkedIn is not an online resume; it is a high-intent landing page for your personal brand. When founders and recruiters land on your profile, you have exactly 6 seconds to establish undeniable domain authority.
      </p>
      <h4 style="font-size: 18px; color: var(--color-orange); margin: 24px 0 10px 0;">1. The Benefit-Driven Headline Formula</h4>
      <p style="font-size: 15px; line-height: 1.7; margin-bottom: 14px;">
        Replace passive titles like <em>"Marketing Specialist"</em> with tangible outcomes: <em>"Helping B2B Founders Scale from $20k to $100k/mo via High-CTR Paid Ads &amp; Dedicated Social Media Systems."</em>
      </p>
      <h4 style="font-size: 18px; color: var(--color-orange); margin: 24px 0 10px 0;">2. The 3 Core Content Pillars</h4>
      <p style="font-size: 15px; line-height: 1.7; margin-bottom: 14px;">
        Post 3 to 4 times a week alternating between: <strong>Case Study Proof</strong> (real numbers &amp; ROAS), <strong>Process Breakdowns</strong> (how you actually execute), and <strong>Industry Hot Takes</strong> (challenging obsolete vanity metrics).
      </p>
      <h4 style="font-size: 18px; color: var(--color-orange); margin: 24px 0 10px 0;">3. Inbound Conversion Optimization</h4>
      <p style="font-size: 15px; line-height: 1.7; margin-bottom: 14px;">
        Utilize the custom profile action button (e.g. <em>"Book a Consultation"</em>) pointing directly to your calendar or portfolio, transforming passive profile visitors into scheduled discovery calls.
      </p>
    `
  }
];

// Dynamic Slider & Filter Logic
let currentFilterCategory = 'all';

function renderInsightsCards(cat = 'all') {
  const track = document.getElementById('insightsTrack');
  const counter = document.getElementById('insightsCounter');
  if (!track) return;

  currentFilterCategory = cat;
  const articlesList = window.BLOG_ARTICLES || DEFAULT_ARTICLES;
  const filtered = cat === 'all' 
    ? articlesList.map((a, i) => ({ ...a, originalIndex: i }))
    : articlesList.map((a, i) => ({ ...a, originalIndex: i })).filter(a => a.tag.toLowerCase() === cat.toLowerCase());

  if (filtered.length === 0) {
    track.innerHTML = `<div style="padding: 40px; color: var(--color-black); opacity: 0.6; font-family: var(--font-mono);">No articles found in this category yet. New playbooks drop weekly!</div>`;
    if (counter) counter.textContent = `0 / 0`;
    return;
  }

  track.innerHTML = filtered.map(art => `
    <article class="insight-card" onclick="openBlogModal(${art.originalIndex})">
      <div class="insight-card__meta">
        <span class="insight-tag">${art.tag}</span>
        
      </div>
      <h3 class="insight-card__title">${art.title}</h3>
      <p class="insight-card__snippet">${art.snippet}</p>
      <div class="insight-card__footer">
        <span class="read-more-link">Read Full Playbook &rarr;</span>
      </div>
    </article>
  `).join('');

  updateSliderCounter();
}

function updateSliderCounter() {
  const viewport = document.getElementById('insightsViewport');
  const prevBtn = document.getElementById('insightsPrevBtn');
  const nextBtn = document.getElementById('insightsNextBtn');

  if (!viewport) return;

  if (prevBtn) prevBtn.disabled = viewport.scrollLeft <= 10;
  if (nextBtn) nextBtn.disabled = viewport.scrollLeft >= (viewport.scrollWidth - viewport.clientWidth - 15);
}

// Attach Slider Navigation & Filter Listeners
document.addEventListener('DOMContentLoaded', () => {
  renderInsightsCards('all');

  const viewport = document.getElementById('insightsViewport');
  const prevBtn = document.getElementById('insightsPrevBtn');
  const nextBtn = document.getElementById('insightsNextBtn');

  if (viewport) {
    viewport.addEventListener('scroll', updateSliderCounter);
  }

  if (prevBtn && viewport) {
    prevBtn.addEventListener('click', () => {
      const card = viewport.querySelector('.insight-card');
      const step = card ? card.offsetWidth + 24 : 380;
      viewport.scrollBy({ left: -step, behavior: 'smooth' });
    });
  }

  if (nextBtn && viewport) {
    nextBtn.addEventListener('click', () => {
      const card = viewport.querySelector('.insight-card');
      const step = card ? card.offsetWidth + 24 : 380;
      viewport.scrollBy({ left: step, behavior: 'smooth' });
    });
  }

  // Filter Buttons
  const filterPills = document.querySelectorAll('.insights-filter-pill');
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('is-active'));
      pill.classList.add('is-active');
      const cat = pill.getAttribute('data-cat') || 'all';
      renderInsightsCards(cat);
      if (viewport) viewport.scrollTo({ left: 0, behavior: 'smooth' });
    });
  });

  // Tools Filter Tabs Interactive Logic
  const toolPills = document.querySelectorAll('.tool-filter-pill');
  const toolCards = document.querySelectorAll('.tool-card');
  if (toolPills.length > 0 && toolCards.length > 0) {
    toolPills.forEach(pill => {
      pill.addEventListener('click', () => {
        toolPills.forEach(p => p.classList.remove('is-active'));
        pill.classList.add('is-active');
        const selectedCat = pill.getAttribute('data-cat') || 'all';

        toolCards.forEach(card => {
          const cardCat = card.getAttribute('data-category');
          if (selectedCat === 'all' || cardCat === selectedCat) {
            card.classList.remove('is-hidden');
            card.style.animation = 'none';
            void card.offsetWidth;
            card.style.animation = 'cardAppear 0.35s ease forwards';
          } else {
            card.classList.add('is-hidden');
          }
        });
      });
    });
  }

});


// Modal Reader Function
window.openBlogModal = function(index) {
  const articlesList = window.BLOG_ARTICLES || DEFAULT_ARTICLES;
  const article = articlesList[index];
  if (!article) return;

  const modalOverlay = document.getElementById('caseModalOverlay');
  const modalBody = document.getElementById('caseModalBody');
  if (modalOverlay && modalBody) {
    modalBody.innerHTML = `
      <div style="margin-bottom: 20px;">
        <span style="font-family: var(--font-mono); font-size: 11.5px; font-weight: 700; color: var(--color-orange); background: rgba(254, 168, 49, 0.12); padding: 5px 14px; border-radius: 999px; text-transform: uppercase;">
          ${article.tag}
        </span>
      </div>
      <h2 style="font-family: var(--font-en-display); font-size: 26px; line-height: 1.3; color: var(--color-black); margin-bottom: 24px;">
        ${article.title}
      </h2>
      <div style="color: var(--color-black); opacity: 0.9;">
        ${article.content}
      </div>
      <div style="margin-top: 36px; padding-top: 20px; border-top: 1px solid var(--color-card-border); display: flex; justify-content: space-between; align-items: center;">
        <span style="font-size: 13.5px; color: var(--color-black); opacity: 0.7;">Written by Shahid Akram</span>
        <a href="#contact" onclick="document.getElementById('caseModalOverlay').classList.remove('is-active')" class="hero-cta-btn" style="padding: 8px 20px; font-size: 13px;">
          Discuss Strategy &rarr;
        </a>
      </div>
    `;
    modalOverlay.classList.add('is-active');
  }
};

// --------------------------------------------------------------------------
// Pricing & Retainer Packages Modal Logic
// --------------------------------------------------------------------------
const packageDetails = [
  {
    badge: "EXECUTIVE BRANDING",
    title: "LinkedIn Profile Writing & Optimization",
    price: "$180",
    period: "complete makeover",
    desc: "Transform your LinkedIn profile into an inbound conversion magnet for high-ticket clients, executive recruiters, and strategic partners.",
    deliverables: [
      "High-converting Headline & Story-driven 'About' bio rewrite",
      "Custom branded 4K Header Banner design (Canva / Photoshop)",
      "Complete Experience section formatting with measurable metrics & achievements",
      "SEO Keyword Indexing for top recruiter & client search rankings",
      "Featured Section curation & media link embedding",
      "5 plug-and-play viral LinkedIn thought-leadership post drafts"
    ],
    timeline: "2-3 business days delivery",
    support: "1-on-1 revision cycle included until 100% satisfaction",
    btnText: "Book LinkedIn Makeover ($180)"
  },
  {
    badge: "🔥 MOST POPULAR PARTNERSHIP",
    title: "Dedicated Social Media Handler Retainer",
    price: "$450",
    period: "per month",
    desc: "Complete done-for-you day-to-day social media operations taking your brand presence, video creation, and audience growth completely off your hands.",
    deliverables: [
      "Full Operations across Instagram + Facebook + LinkedIn channels",
      "4 to 5 high-retention Reels & carousels created, edited & posted weekly (CapCut/Canva)",
      "Daily story scheduling, trend research & sound hook strategy",
      "Active community management & automated DM prospect handling",
      "Meta Ads campaign setup, audience lookalike scaling & dynamic creative testing",
      "Weekly analytics reporting dashboard & 30-day visual content calendar"
    ],
    timeline: "Dedicated Monday to Friday operations • Onboarding within 24-48 hrs",
    support: "Direct Slack / WhatsApp channel sync + Weekly strategy calls",
    btnText: "Hire Social Media Handler ($450/mo)"
  },
  {
    badge: "CREATIVE DESIGN",
    title: "Graphic Design & Brand Identity Kit",
    price: "$250",
    period: "complete brand kit",
    desc: "A scroll-stopping visual identity package engineered to elevate brand perception, establish authority, and increase ad click-through rates.",
    deliverables: [
      "Comprehensive Brand Guidelines (Color palette, typography scale & vector assets)",
      "20 high-converting social media templates & ad banners (Photoshop / Canva Pro)",
      "15-slide investor pitch deck or executive client presentation design",
      "Custom YouTube/Podcast thumbnails & high-contrast carousel covers",
      "Print-ready stationary vectors & digital stationery mockups",
      "Full source files provided (AI, PSD, PNG, SVG)"
    ],
    timeline: "5-7 business days delivery with phased previews",
    support: "2 comprehensive rounds of design revisions",
    btnText: "Get Brand Creative Kit ($250)"
  },
  {
    badge: "FULL-SCALE GROWTH",
    title: "All-in-One Digital Growth Partner",
    price: "$650",
    period: "per month",
    desc: "The ultimate end-to-end partnership covering social media handling, paid performance ads, custom creative design, and CRM data automation.",
    deliverables: [
      "Full Dedicated Social Media Handler operations across all brand channels",
      "Meta & Google Ads performance management targeting 4.2x+ ROAS",
      "Unlimited graphic design & short-form video creative iterations",
      "Advanced Excel/Sheets CRM automation & lead tracking pipeline",
      "Omnichannel retargeting funnels & cart abandonment email flows",
      "Priority 24/7 executive support and weekly ROI review meetings"
    ],
    timeline: "Full-scale dedicated retainer with priority execution queue",
    support: "Dedicated private Slack channel + 24/7 priority communication",
    btnText: "Discuss Full-Scale Retainer ($650/mo)"
  }
];

window.openPackageModal = function(index) {
  const pkg = packageDetails[index];
  if (!pkg) return;
  
  const modal = document.getElementById('packageModalOverlay');
  const body = document.getElementById('packageModalBody');
  if (!modal || !body) return;
  
  body.innerHTML = `
    <div class="pkg-modal-header">
      <span class="pkg-modal-badge">${pkg.badge}</span>
      <div class="pkg-modal-price-wrap">
        <span class="pkg-modal-price">${pkg.price}</span>
        <span class="pkg-modal-period">${pkg.period}</span>
      </div>
    </div>
    
    <h2 class="pkg-modal-title">${pkg.title}</h2>
    <p class="pkg-modal-desc">${pkg.desc}</p>
    
    <div class="pkg-modal-section">
      <h4 class="pkg-modal-subhead">Comprehensive Deliverables & Scope:</h4>
      <ul class="pkg-modal-list">
        ${pkg.deliverables.map(item => `<li><span class="chk-icon">✔</span> <span>${item}</span></li>`).join('')}
      </ul>
    </div>
    
    <div class="pkg-modal-meta-grid">
      <div class="pkg-modal-meta-item">
        <span class="meta-label">Turnaround & SLA</span>
        <span class="meta-val">${pkg.timeline}</span>
      </div>
      <div class="pkg-modal-meta-item">
        <span class="meta-label">Dedicated Support</span>
        <span class="meta-val">${pkg.support}</span>
      </div>
    </div>
    
    <div class="pkg-modal-actions">
      <a href="#contact" class="pkg-modal-cta" onclick="selectPackageForContact('${pkg.title}'); closePackageModal();">
        <span>${pkg.btnText} &rarr;</span>
      </a>
      <a href="https://wa.me/923004822560?text=Hi%20Shahid,%20I%20am%20interested%20in%20your%20${encodeURIComponent(pkg.title)}%20package." target="_blank" rel="noopener noreferrer" class="pkg-modal-wa">
        <span>Chat on WhatsApp</span>
      </a>
    </div>
  `;
  
  modal.classList.add('is-active');
  document.body.style.overflow = 'hidden';
};

window.closePackageModal = function() {
  const modal = document.getElementById('packageModalOverlay');
  if (modal) {
    modal.classList.remove('is-active');
    document.body.style.overflow = '';
  }
};

window.selectPackageForContact = function(pkgName) {
  const subjectInput = document.querySelector('input[name="subject"], select[name="package"], input[name="package"]');
  const messageInput = document.querySelector('textarea[name="message"]');
  if (subjectInput) {
    subjectInput.value = `Inquiry regarding ${pkgName}`;
  }
  if (messageInput && !messageInput.value) {
    messageInput.value = `Hi Shahid, I am interested in discussing your ${pkgName} package. Please let me know the next steps for onboarding.`;
  }
};

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closePackageModal();
  }
});

// ==========================================
// CORE DISCIPLINES & SERVICES MODAL DATA
// ==========================================
const DISCIPLINE_DETAILS = [
  {
    badge: "ORGANIC SOCIAL & VIRAL VIDEO",
    title: "Social Media Strategy & Viral Growth",
    tagline: "End-to-end social media architecture, daily feed operations & high-retention video pacing that transforms scrollers into buyers.",
    deliverables: [
      { name: "Monthly 30-Day Notion Content Calendar", desc: "Complete scheduled grid with video hooks, captions, targeted hashtags, and publishing times." },
      { name: "15–25 Short-Form Videos / Reels / TikToks", desc: "9:16 high-retention video production with pattern interrupts, animated captions, and sound design." },
      { name: "Multi-Slide Educational Carousel Systems", desc: "High-CTR graphic carousels engineered in Figma and Canva to maximize saves and shares." },
      { name: "Active Community Management & DM Funnels", desc: "Daily comment responses, keyword comment seeding, and automated DM lead routing." },
      { name: "Weekly Performance & Attribution Audits", desc: "In-depth analytics reviewing watch time past 3s, follower growth velocity, and lead attribution." }
    ],
    workflow: [
      { step: "01", title: "Audit & Hook Ideation", desc: "Reverse-engineer top competitors, discover winning algorithmic angles, and establish brand visual guidelines (Days 1–3)." },
      { step: "02", title: "Batch Asset Production", desc: "Script, design, edit, and assemble the first 15-day batch of videos and carousel assets for sign-off (Days 4–7)." },
      { step: "03", title: "Algorithmic Scaling", desc: "Daily scheduled publishing, real-time comment management, and weekly creative iteration based on retention data." }
    ],
    turnaround: "Initial batch ready in 72 hours; ongoing weekly delivery batches.",
    tools: ["Meta Business Suite", "CapCut Pro", "TikTok Creative Center", "Canva Enterprise", "Notion"],
    metric: "+85K Organic Reach & Active Community Scaling",
    whatsappTopic: "Social Media Strategy & Viral Growth"
  },
  {
    badge: "EXECUTIVE BRANDING & B2B INBOUND",
    title: "LinkedIn Profile Writing & Optimization",
    tagline: "Executive personal branding that positions founders, executives, and consultants as industry authorities, generating high-ticket inbound leads.",
    deliverables: [
      { name: "SEO Keyword Indexing & Algorithmic Headline", desc: "Strategic headline restructuring ensuring your profile ranks in top search results for your niche." },
      { name: "Story-Driven 'About' Narrative", desc: "High-converting founder/executive personal story following the Hook-Problem-Proof-Offer framework." },
      { name: "Experience Section Transformation", desc: "Converting dry job duties into quantified business accomplishments and proof-backed case studies." },
      { name: "Custom 4K Branded Profile Banner Design", desc: "High-resolution bespoke header banner reflecting corporate stature, credibility, and brand colors." },
      { name: "30-Day Executive Thought Leadership Framework", desc: "12 custom post templates (Story, Breakdown, Carousel, Contrarian Take) ready to publish." }
    ],
    workflow: [
      { step: "01", title: "Executive Career Deep-Dive", desc: "Comprehensive 45-minute consultation to extract career milestones, authority angles, and business goals." },
      { step: "02", title: "Copywriting & Asset Sprint", desc: "Drafting complete Headline, About, quantified Experience, and designing custom 4K header banner (48 Hours)." },
      { step: "03", title: "Profile Rollout & Inbound Launch", desc: "Guide profile rollout, configure Creator Mode features, and launch the inbound posting system." }
    ],
    turnaround: "48 to 72 hours for complete executive profile transformation.",
    tools: ["LinkedIn Creator Mode", "Canva Pro", "Shield Analytics", "Copywriting Frameworks"],
    metric: "+320% Inbound Profile Views & Inbound Lead Lift",
    whatsappTopic: "LinkedIn Profile Writing & Executive Branding"
  },
  {
    badge: "VISUAL IDENTITY & PERFORMANCE CREATIVES",
    title: "Graphic Design & Creative Brand Identity",
    tagline: "Visual storytelling engineered to stop the scroll. Cohesive brand kits, high-CTR paid ad creatives, corporate pitch decks, and visual packaging.",
    deliverables: [
      { name: "Complete Brand Identity Guidelines", desc: "Custom color palettes, typography hierarchy, logo usage rules, and digital moodboard direction." },
      { name: "High-CTR Social Ad Creatives", desc: "Statics, carousels, and motion banners engineered to stop the feed scroll within 1.5 seconds." },
      { name: "Multi-Slide Educational Carousels", desc: "Seamless typography-focused swipe carousels for LinkedIn, Instagram, and corporate decks." },
      { name: "Investor & Sales Pitch Decks", desc: "Executive presentation decks designed in PowerPoint/Figma for fundraising and client pitching." },
      { name: "Full Vector & Source Asset Packaging", desc: "Delivery in .SVG, .PNG, .PDF, .AI, and editable Figma/Canva links for seamless internal handoff." }
    ],
    workflow: [
      { step: "01", title: "Moodboard & Style Alignment", desc: "Curate visual benchmarks, color psychology, and typographic combinations for approval (Day 1)." },
      { step: "02", title: "Creative Concept Sprint", desc: "Produce 2 distinct visual concepts for feedback, testing, and collaborative refinement (Days 2–3)." },
      { step: "03", title: "Final Asset Packaging", desc: "Export all production files, web-optimized formats, vector masters, and editable template kits (Day 4)." }
    ],
    turnaround: "2 to 4 business days per creative design sprint.",
    tools: ["Adobe Illustrator", "Photoshop", "Figma", "Canva Enterprise"],
    metric: "+3.8% Ad Click-Through Rate (CTR) Improvement",
    whatsappTopic: "Graphic Design & Creative Brand Identity"
  },
  {
    badge: "PAID ACQUISITION & PERFORMANCE MEDIA",
    title: "Performance Marketing & Paid Ads (ROAS)",
    tagline: "Quantitative paid media execution across Meta & Google Ads. Full-funnel roadmaps that lower CPA, protect margins, and scale profitably.",
    deliverables: [
      { name: "Full-Funnel Campaign Architecture", desc: "TOFU (Cold traffic testing), MOFU (Engagement retargeting), and BOFU (High-intent purchase conversions)." },
      { name: "Dynamic Creative Testing (DCT) Matrix", desc: "Rapid testing of 3 angles × 3 hooks × 3 creatives to isolate winning combinations without ad waste." },
      { name: "Direct-Response Ad Copywriting", desc: "Multi-angle copy (Pain-Agitate-Solve, Social Proof, Urgency) tailored for high-conversion clicks." },
      { name: "GA4 & Server-Side Event Tracking", desc: "Clean custom conversion events, Server-Side API integration, and granular UTM tracking parameters." },
      { name: "Weekly Executive ROI Dashboard", desc: "Live Looker Studio / Google Sheets reporting CPA, Blended ROAS, CAC, and ad spend efficiency." }
    ],
    workflow: [
      { step: "01", title: "Account & Pixel Audit", desc: "Audit existing ad accounts, fix tracking attribution, and isolate historical winning data (Week 1)." },
      { step: "02", title: "Creative Testing Sprints", desc: "Launch low-budget testing ad sets to discover the lowest CAC audiences and hook creative (Weeks 1–2)." },
      { step: "03", title: "Profitable Scaling", desc: "Scale winning ad combinations while strictly maintaining 4.2x+ ROAS and low blended CPA targets." }
    ],
    turnaround: "Campaigns live within 5 business days; daily monitoring & optimization.",
    tools: ["Meta Ads Manager", "Google Ads (Certified)", "Google Analytics 4", "Looker Studio"],
    metric: "4.2x – 6.8x Return on Ad Spend (ROAS)",
    whatsappTopic: "Performance Marketing & Paid Ads (ROAS)"
  },
  {
    badge: "CONTENT ARCHITECTURE & CONVERSION COPY",
    title: "Content Strategy & Conversion Copywriting",
    tagline: "Persuasive direct-response messaging engineered with buyer psychology. Crafting clear narratives that command attention and drive sales.",
    deliverables: [
      { name: "High-Converting Landing Page & Sales Copy", desc: "Wireframe copy with emotional triggers, social proof stacking, and friction-reducing CTAs." },
      { name: "0–3s Short-Form Video Hook Scripts", desc: "Psychological pattern-interrupt scripts built specifically for vertical video retention past 80%." },
      { name: "Executive Ghostwriting & Articles", desc: "Long-form strategic articles and LinkedIn newsletters positioning you as the leading category authority." },
      { name: "Automated Email Nurture Sequences", desc: "5–7 part automated drip email series that turns cold subscribers into booked discovery calls." },
      { name: "SEO Editorial Content Calendars", desc: "Target keyword clusters, competitor search gap analysis, and content briefs for Google ranking." }
    ],
    workflow: [
      { step: "01", title: "Voice & Persona Extraction", desc: "Analyze customer pain points, vernacular, and primary purchase hesitations to establish tone (Day 1)." },
      { step: "02", title: "Draft Sprint & Formatting", desc: "Deliver raw copywriting drafts structured with visual layout cues and conversion psychology notes (Days 2–3)." },
      { step: "03", title: "Polish & A/B Variations", desc: "Polish copy rhythm, generate alternative headline variants, and finalize deliverables for publication." }
    ],
    turnaround: "2 to 3 days per copywriting asset or sequence.",
    tools: ["AIDA & PAS Psychology", "Notion", "Google Docs", "Direct-Response Swipe Files"],
    metric: "42 Qualified Inbound Leads Generated Monthly",
    whatsappTopic: "Content Strategy & Conversion Copywriting"
  },
  {
    badge: "COMMERCIAL DATA & INVENTORY CONTROL",
    title: "Inventory Operations & Commercial Data Systems",
    tagline: "15,000+ SKU catalog auditing, POS/ERP synchronization & flawless spreadsheet architecture ensuring 99.4% stock precision.",
    deliverables: [
      { name: "Advanced Spreadsheet Architecture", desc: "Custom Excel & Google Sheets models using dynamic XLOOKUP, INDEX/MATCH, and Power Query pipelines." },
      { name: "15,000+ SKU Stock Reconciliation", desc: "Daily and monthly shrinkage audits, warehouse variance reconciliation with 99.4% physical precision." },
      { name: "Automated Stock Level & Reorder Triggers", desc: "Formula-driven dashboards that alert managers before popular SKUs reach critical stock-out thresholds." },
      { name: "POS & E-Commerce Catalog Integration", desc: "Bridging physical store POS transactions with digital online inventory and warehouse channels." },
      { name: "Executive Operations KPI Dashboard", desc: "Clean automated summary views cutting manual calculation time by up to 80%." }
    ],
    workflow: [
      { step: "01", title: "Data Audit & Ledger Diagnostics", desc: "Audit current catalog databases, identify discrepancies, and normalize raw transaction records (Days 1–2)." },
      { step: "02", title: "Formula & Workflow Automation", desc: "Build automated reconciliation sheets, lookup pipelines, and inventory dashboard views (Days 3–4)." },
      { step: "03", title: "Floor Rollout & Maintenance", desc: "Implement routine physical audit checklists and train team members on daily entry protocols." }
    ],
    turnaround: "Initial system audit in 48 hours; custom dashboard deployed in 5 days.",
    tools: ["Advanced Excel (XLOOKUP)", "Power Query", "Google Sheets", "POS / ERP Databases"],
    metric: "99.4% Physical vs. Digital Stock Reconciliation Accuracy",
    whatsappTopic: "Inventory Operations & Commercial Data Systems"
  }
];

window.openDisciplineModal = function(index) {
  const d = DISCIPLINE_DETAILS[index];
  if (!d) return;

  const modal = document.getElementById('disciplineModalOverlay');
  const body = document.getElementById('disciplineModalBody');
  if (!modal || !body) return;

  const waEncoded = encodeURIComponent(`Hi Shahid! I saw your portfolio and would like to discuss: ${d.whatsappTopic}`);

  body.innerHTML = `
    <div class="disc-modal-head">
      <div class="disc-modal-badge-row">
        <span class="disc-modal-badge">${d.badge}</span>
        <span class="disc-modal-metric">${d.metric}</span>
      </div>
      <h2 class="disc-modal-title">${d.title}</h2>
      <p class="disc-modal-tagline">${d.tagline}</p>
    </div>

    <!-- Section 1: Exact Deliverables -->
    <div class="disc-modal-sec">
      <h4 class="disc-modal-sec-title">Exactly What You Receive (Deliverables):</h4>
      <div class="disc-modal-deliverables">
        ${d.deliverables.map(del => `
          <div class="disc-deliv-item">
            <div class="disc-deliv-chk" aria-hidden="true">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <div class="disc-deliv-text">
              <strong>${del.name}</strong>
              <p>${del.desc}</p>
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Section 2: 3-Step Execution Workflow -->
    <div class="disc-modal-sec">
      <h4 class="disc-modal-sec-title">How We Execute (3-Step Workflow):</h4>
      <div class="disc-modal-steps">
        ${d.workflow.map(w => `
          <div class="disc-step-card">
            <span class="disc-step-num">STEP ${w.step}</span>
            <h5 class="disc-step-title">${w.title}</h5>
            <p class="disc-step-desc">${w.desc}</p>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Section 3: Timeline & Tools -->
    <div class="disc-modal-meta-grid">
      <div class="disc-meta-box">
        <span class="disc-meta-label">DELIVERY PACE</span>
        <span class="disc-meta-val">${d.turnaround}</span>
      </div>
      <div class="disc-meta-box">
        <span class="disc-meta-label">TOOLKIT &amp; SYSTEMS</span>
        <div class="disc-meta-chips">
          ${d.tools.map(t => `<span class="disc-chip">${t}</span>`).join('')}
        </div>
      </div>
    </div>

    <!-- Section 4: Action Buttons -->
    <div class="disc-modal-cta-row">
      <a href="https://wa.me/923004822560?text=${waEncoded}" target="_blank" rel="noopener noreferrer" class="disc-modal-wa-btn">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
        </svg>
        <span>Discuss on WhatsApp</span>
      </a>
      <button type="button" onclick="sendServiceBrief(${index})" class="disc-modal-brief-btn">
        <span>Send Project Brief ↓</span>
      </button>
    </div>
  `;

  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
};

window.closeDisciplineModal = function() {
  const modal = document.getElementById('disciplineModalOverlay');
  if (!modal) return;
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
};

window.sendServiceBrief = function(index) {
  const d = (typeof DISCIPLINE_DETAILS !== 'undefined' && DISCIPLINE_DETAILS[index]) ? DISCIPLINE_DETAILS[index] : null;
  closeDisciplineModal();

  setTimeout(() => {
    const contactSec = document.getElementById('mildContactForm') || document.getElementById('contact');
    if (contactSec) {
      contactSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    if (!d) return;

    // Service mapping for the dropdown in the contact form - exact 1-to-1 match
    const serviceSelect = document.getElementById('contactService');
    if (serviceSelect && serviceSelect.options.length > index + 1) {
      serviceSelect.selectedIndex = index + 1;
    }

    // Pre-populate the message field and focus it
    const msgField = document.getElementById('contactMessage');
    if (msgField) {
      const delivBullets = (d.deliverables && d.deliverables.length >= 2)
        ? `  • ${d.deliverables[0].name}\n  • ${d.deliverables[1].name}`
        : (d.deliverables && d.deliverables[0] ? `  • ${d.deliverables[0].name}` : '  • Full Scope Execution');

      msgField.value = 
`Hi Shahid,

I would like to inquire about your "${d.title}" service.

Target Deliverables:
${delivBullets}

Project Overview:
• Brand / Company: 
• Primary Goal: 
• Target Timeline: 

Looking forward to your response!`;

      msgField.focus();
      msgField.scrollTop = 0;

      // Place cursor right after "• Brand / Company: " for instant typing
      const cursorTarget = '• Brand / Company: ';
      const cIdx = msgField.value.indexOf(cursorTarget);
      if (cIdx !== -1) {
        const targetPos = cIdx + cursorTarget.length;
        msgField.setSelectionRange(targetPos, targetPos);
      }

      const formCard = document.querySelector('.contact-card-mild');
      if (formCard) {
        formCard.style.transition = 'box-shadow 0.4s ease, border-color 0.4s ease';
        formCard.style.borderColor = 'var(--color-orange)';
        formCard.style.boxShadow = '0 0 0 3px rgba(254, 168, 49, 0.35)';
        setTimeout(() => {
          formCard.style.borderColor = '';
          formCard.style.boxShadow = '';
        }, 2200);
      }
    }
  }, 160);
};


// Keyboard ESC to close discipline modal
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeDisciplineModal();
  }
});
// Auto-open discipline modal if hash is #service-0 to #service-5
window.addEventListener('DOMContentLoaded', () => {
  if (window.location.hash.startsWith('#service-')) {
    const sIdx = parseInt(window.location.hash.replace('#service-', ''), 10);
    if (!isNaN(sIdx) && sIdx >= 0 && sIdx < 6) {
      setTimeout(() => openDisciplineModal(sIdx), 300);
    }
  }
});

// ==========================================================================
// FAQ Interactive Accordions
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  const faqItems = document.querySelectorAll('.p-faq__item');
  faqItems.forEach(item => {
    const btn = item.querySelector('.p-faq__question');
    if (btn) {
      btn.addEventListener('click', () => {
        const isActive = item.classList.contains('is-active');
        // Close other items
        faqItems.forEach(other => {
          if (other !== item) {
            other.classList.remove('is-active');
            const otherBtn = other.querySelector('.p-faq__question');
            if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          }
        });
        // Toggle current item
        if (isActive) {
          item.classList.remove('is-active');
          btn.setAttribute('aria-expanded', 'false');
        } else {
          item.classList.add('is-active');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    }
  });
});
