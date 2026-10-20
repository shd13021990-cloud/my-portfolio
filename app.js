/* ==========================================================================
   MILDSUGAR STYLE INTERACTIVE ENGINE (app.js)
   Custom Japanese Digital Craftsmanship, Stalker Cursor & Case Switcher
   ========================================================================== */

// Global Lightbox Handler
window.openLightbox = function(src, caption) {
  const lightbox = document.getElementById('posterLightbox');
  const img = document.getElementById('lightboxImg');
  const cap = document.getElementById('lightboxCaption');
  if (lightbox && img) {
    img.src = src;
    if (cap) cap.innerHTML = caption || '';
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

  // 1. Mouse Stalker Cursor Follower
  const stalker = document.getElementById('stalker');
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
    currentX += (mouseX - currentX) * 0.15;
    currentY += (mouseY - currentY) * 0.15;
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
        stalker.textContent = text;
        if (isHoverClass) stalker.classList.add('is-hovering');
      });
      el.addEventListener('mouseleave', () => {
        if (!stalker) return;
        stalker.textContent = 'Hey! 🤝';
        stalker.classList.remove('is-hovering');
      });
    });
  };

  bindStalkerHover('.case-card__visual', 'View Detail ↗');
  bindStalkerHover('.mildsugar-btn', 'Explore ✦');
  bindStalkerHover('.discipline-box', 'Inspect ✦');
  bindStalkerHover('.time-toggle-btn', 'Shift Mode');
  bindStalkerHover('.action-btn-pill', 'Say Hey!');
  bindStalkerHover('.poster-card', 'Preview 🔍');
  bindStalkerHover('.exp-card', 'Experience ✦');

  // 2. Day & Night Mode (Room Time Toggle)
  const timeToggleBtn = document.getElementById('timeToggleBtn');
  const savedTheme = localStorage.getItem('mildsugar_theme') || 'day';

  const applyTheme = (theme) => {
    if (theme === 'night') {
      document.documentElement.setAttribute('data-theme', 'night');
      if (timeToggleBtn) {
        timeToggleBtn.innerHTML = `<span class="icon">🌙</span> Night Room`;
      }
      const daySky = document.getElementById('roomDaySky');
      const nightSky = document.getElementById('roomNightSky');
      if (daySky) daySky.style.opacity = '0';
      if (nightSky) nightSky.style.opacity = '1';
    } else {
      document.documentElement.removeAttribute('data-theme');
      if (timeToggleBtn) {
        timeToggleBtn.innerHTML = `<span class="icon">☀️</span> Day Room`;
      }
      const daySky = document.getElementById('roomDaySky');
      const nightSky = document.getElementById('roomNightSky');
      if (daySky) daySky.style.opacity = '1';
      if (nightSky) nightSky.style.opacity = '0';
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

  // 5. Case Deep-Dive Modal Data (Neutral Freelance & Client Proven Results)
  const caseDetails = [
    {
      title: "Case 01: Social Media Growth & Viral Video Engine",
      tagline: "Short-Form Video Strategy, Community Loyalty & Lead Funnels",
      challenge: "Brands and creator accounts faced stagnant organic reach (<1.2%), algorithmic drop-offs, and lacked an automated mechanism to convert viral video views into booked discovery calls.",
      solution: "Engineered 3-second psychological hook frameworks, structured a 30-day viral short-form pipeline (Instagram Reels & TikTok), implemented conversational DM automation funnels, and tracked drop-off analytics in CapCut & Meta Business Suite.",
      results: [
        "Scaled organic followers from scratch to 85,000+ targeted audience in 90 days",
        "Generated 4,200,000+ total short-form video views across key hero campaigns",
        "Elevated average community engagement rate from 1.2% to 18.0%",
        "Direct message automated funnels converted 310+ high-intent inbound inquiries"
      ],
      tools: ["CapCut Pro", "Instagram Reels", "TikTok Creator Studio", "Metricool", "Canva Pro", "Notion Content Hub"]
    },
    {
      title: "Case 02: High-Converting Content Writing & Strategy",
      tagline: "Conversion Copywriting, SEO Hubs & LinkedIn Thought Leadership",
      challenge: "Inbound pipeline was dry, website copy was passive, and executive leadership had zero personal brand authority on LinkedIn.",
      solution: "Designed an authoritative editorial framework: 20+ keyword-targeted SEO long-form guides, high-converting landing page copy based on PAS (Problem-Agitate-Solution), and 3x weekly executive LinkedIn carousels highlighting industry insights.",
      results: [
        "Delivered 120,000+ monthly organic impressions on executive LinkedIn brand",
        "Generated consistent 42 qualified B2B inbound consulting leads every month",
        "Ranked 14 primary target industry keywords in Google Top 5 positions",
        "Email nurture sequences achieved a 46.8% open rate and 11.2% CTR"
      ],
      tools: ["Notion", "Google Docs", "Ahrefs", "LinkedIn Creator Mode", "Grammarly Pro", "WordPress"]
    },
    {
      title: "Case 03: Visual Identity & High-CTR Graphic Design",
      tagline: "Complete Brand Systems, High-CTR Ad Creatives & Pitch Decks",
      challenge: "Inconsistent brand aesthetics across platforms, generic templates, and low click-through rates on paid advertising creatives.",
      solution: "Engineered comprehensive visual identity systems: modern typography pairings, high-impact brand color schemes, 40+ modular social ad templates, high-conversion vector carousels, and investor-ready presentation decks.",
      results: [
        "Boosted paid ad click-through rate (CTR) by an immediate +3.8% across ad sets",
        "Visual identity deployed across 15+ international marketing touchpoints",
        "Created over 100+ bespoke graphics, promotional posters, and deck assets",
        "Secured client approval in 95% of first-round creative reviews"
      ],
      tools: ["Adobe Photoshop", "Adobe Illustrator", "Figma Pro", "Canva Pro", "After Effects"]
    },
    {
      title: "Case 04: Full-Funnel Digital Marketing & ROAS Scaling",
      tagline: "Meta & Google Paid Advertising with Full Conversion Tracking",
      challenge: "Skyrocketing customer acquisition costs ($54+ CPA) and volatile ROAS threatening profit margins across e-commerce & lead gen accounts.",
      solution: "Restructured entire paid acquisition engine: TOFU viral problem-aware video hooks, MOFU value-demonstration retargeting, and aggressive BOFU cart recovery sequences. Implemented server-side GA4 events and Meta Conversions API (CAPI).",
      results: [
        "Maintained sustained 4.2x to 6.8x Return on Ad Spend (ROAS)",
        "Slashed Cost Per Acquisition (CPA) by 52% within 60 days of restructuring",
        "Recovered over $48,000 in abandoned checkout revenue via targeted retargeting",
        "Scaled monthly ad spend profitably from $3,000 to $25,000+"
      ],
      tools: ["Meta Ads Manager", "Google Ads", "Google Analytics 4", "Shopify", "Klaviyo", "Looker Studio"]
    },
    {
      title: "Case 05: Data Entry, Inventory Systems & ERP Architecture",
      tagline: "100% Accuracy, 25,000+ Records & Automated Reporting",
      challenge: "Manual spreadsheet reconciliation, inventory discrepancies, and slow weekly executive reporting wasting 15+ hours weekly across operational units.",
      solution: "Leveraged 7+ years of hands-on technical database systems and inventory precision. Designed automated MS Excel & Google Sheets models with advanced VLOOKUP, XLOOKUP, Index-Match, dynamic Pivot Tables, and automated error-flagging rules.",
      results: [
        "Maintained 100% data entry accuracy across 25,000+ technical components and logistics items",
        "Reduced weekly executive inventory reporting time from 6 hours to automated real-time sheets",
        "Cleaned and enriched 10,000+ client CRM records eliminating duplicate data by 99.4%",
        "Zero audit penalties across 7 consecutive years of external audits"
      ],
      tools: ["Advanced MS Excel", "Google Sheets (Apps Script)", "ERP Systems", "Oracle Inventory", "Airtable"]
    }
  ];

  const modalOverlay = document.getElementById('caseModalOverlay');
  const modalBody = document.getElementById('caseModalBody');
  const modalClose = document.getElementById('caseModalClose');

  const openCaseModal = (index) => {
    const data = caseDetails[index];
    if (!data || !modalBody || !modalOverlay) return;

    modalBody.innerHTML = `
      <div style="font-family: var(--font-en-display); font-size: 14px; color: var(--color-orange); margin-bottom: 8px;">
        ${data.tagline}
      </div>
      <h2 style="font-family: var(--font-en-display); font-size: clamp(24px, 3.5vw, 36px); margin-bottom: 24px; line-height: 1.2;">
        ${data.title}
      </h2>
      
      <div style="margin-bottom: 20px;">
        <h4 style="font-size: 13px; font-family: var(--font-mono); text-transform: uppercase; color: var(--color-orange); margin-bottom: 6px;">The Challenge</h4>
        <p style="font-size: 15px; opacity: 0.85; line-height: 1.6;">${data.challenge}</p>
      </div>

      <div style="margin-bottom: 24px;">
        <h4 style="font-size: 13px; font-family: var(--font-mono); text-transform: uppercase; color: var(--color-orange); margin-bottom: 6px;">Strategic Solution</h4>
        <p style="font-size: 15px; opacity: 0.85; line-height: 1.6;">${data.solution}</p>
      </div>

      <div style="background: var(--color-cream-subtle); padding: 20px 24px; border-radius: 20px; margin-bottom: 24px; border: 1px solid var(--color-card-border);">
        <h4 style="font-family: var(--font-en-display); font-size: 16px; margin-bottom: 12px; color: var(--color-black);">Key Measurable Results</h4>
        <ul style="list-style: none; display: flex; flex-direction: column; gap: 8px;">
          ${data.results.map(r => `<li style="font-size: 14.5px; font-weight: 600; display: flex; align-items: center; gap: 8px;"><span style="color: var(--color-orange);">✓</span> ${r}</li>`).join('')}
        </ul>
      </div>

      <div>
        <h4 style="font-size: 12px; font-family: var(--font-mono); text-transform: uppercase; opacity: 0.6; margin-bottom: 8px;">Core Tools & Stack</h4>
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          ${data.tools.map(t => `<span style="background: var(--color-orange); color: #fff; font-size: 11px; padding: 6px 14px; border-radius: 100px; font-family: var(--font-en-display);">${t}</span>`).join('')}
        </div>
      </div>
    `;
    modalOverlay.classList.add('is-active');
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

  // 6. Contact Form & WhatsApp Direct Dispatch
  const contactForm = document.getElementById('mildContactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contactName').value;
      const service = document.getElementById('contactService').value;
      const message = document.getElementById('contactMessage').value;

      const waText = encodeURIComponent(
        `Hi Shahid! I came across your portfolio.\n\n*From:* ${name}\n*Requirement:* ${service}\n*Details:* ${message}`
      );
      window.open(`https://wa.me/923004822560?text=${waText}`, '_blank');
      contactForm.reset();
    });
  }
});
