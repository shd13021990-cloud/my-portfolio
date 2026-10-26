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
