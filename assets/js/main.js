/**
 * Dheerajsorbit — Portfolio Core Interactions
 * Compliant with Figma Design System & WCAG 2.2 AA Accessibility Standards
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initHeaderScroll();
  initContactModal();
  initCopyEmail();
  initPasswordGate();
  initOrbitPlanet();
});

/**
 * 1. Navigation & Active Route State
 */
function initNavigation() {
  const currentPath = window.location.pathname;
  const isWork = currentPath.endsWith('work.html');
  const isAbout = currentPath.endsWith('about.html');
  
  const navWork = document.getElementById('nav-work');
  const navAbout = document.getElementById('nav-about');

  if (navWork && navAbout) {
    if (isWork) {
      navWork.classList.add('text-[#EB5624]', 'active-nav');
      navWork.setAttribute('aria-current', 'page');
      navAbout.classList.remove('text-[#EB5624]', 'active-nav');
    } else if (isAbout) {
      navAbout.classList.add('text-[#EB5624]', 'active-nav');
      navAbout.setAttribute('aria-current', 'page');
      navWork.classList.remove('text-[#EB5624]', 'active-nav');
    } else {
      // Home page: both are ink (#111112)
      navWork.classList.remove('text-[#EB5624]', 'active-nav');
      navAbout.classList.remove('text-[#EB5624]', 'active-nav');
    }
  }
}

/**
 * 2. Sticky Floating Header Glass Blur Effect on Scroll
 */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  function onScroll() {
    if (window.scrollY > 8) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/**
 * 3. Contact Modal Interactivity (DJ About Modal & Global Let's Talk)
 */
function initContactModal() {
  const modal = document.getElementById('contact-modal');
  if (!modal) return;

  const openTriggers = document.querySelectorAll('.js-open-contact, #lets-talk-btn, #work-email-link');
  const closeTriggers = modal.querySelectorAll('.js-close-contact, #modal-close-btn');
  const dialogCard = modal.querySelector('.modal-dialog');
  let previousActiveElement = null;

  function openModal(e) {
    if (e) e.preventDefault();
    previousActiveElement = document.activeElement;
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Set focus to the modal dialog card without triggering focus ring
    if (dialogCard) {
      dialogCard.setAttribute('tabindex', '-1');
      dialogCard.style.outline = 'none';
      setTimeout(() => dialogCard.focus({ preventScroll: true }), 50);
    }
  }

  function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    // Restore focus
    if (previousActiveElement && typeof previousActiveElement.focus === 'function') {
      previousActiveElement.focus();
    }
  }

  openTriggers.forEach(btn => {
    btn.addEventListener('click', openModal);
  });

  closeTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      closeModal();
    });
  });

  // Click outside dialog to close
  modal.addEventListener('click', (e) => {
    if (dialogCard && !dialogCard.contains(e.target)) {
      closeModal();
    }
  });

  // Keyboard accessibility: ESC key to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  // Deep-link / URL hash support (#contact or ?contact=true)
  if (window.location.hash === '#contact' || window.location.search.includes('contact=open') || window.location.search.includes('modal=open')) {
    setTimeout(openModal, 100);
  }
}

/**
 * 3. Copy Email to Clipboard with Accessible Feedback & Toast
 */
function initCopyEmail() {
  const copyBtn = document.getElementById('copy-email-btn');
  const copyIcon = document.getElementById('copy-icon');
  const emailTextEl = document.getElementById('copy-email-text');
  const toast = document.getElementById('toast-msg');

  if (!copyBtn) return;

  const emailToCopy = emailTextEl ? emailTextEl.textContent.trim() : 'dheerajsorbit@gmail.com';

  copyBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(emailToCopy);
      } else {
        // Fallback for non-https or older browsers
        const textarea = document.createElement('textarea');
        textarea.value = emailToCopy;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }

      // Visual feedback on button
      if (copyIcon) {
        copyIcon.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#33CD94" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
      }
      copyBtn.setAttribute('aria-label', 'Email copied to clipboard');

      // Toast notification
      if (toast) {
        toast.textContent = 'Copied to clipboard!';
        toast.classList.add('show');
        setTimeout(() => {
          toast.classList.remove('show');
        }, 2200);
      }

      // Reset button icon after 2 seconds
      setTimeout(() => {
        if (copyIcon) {
          copyIcon.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="13" height="13" x="9" y="9" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`;
        }
        copyBtn.setAttribute('aria-label', 'Copy email address');
      }, 2000);

    } catch (err) {
      console.error('Failed to copy email: ', err);
    }
  });
}

/**
 * 4. Password Gate Interactivity for Work Page
 */
function initPasswordGate() {
  const form = document.getElementById('password-form');
  const input = document.getElementById('password-input');
  const feedback = document.getElementById('password-feedback');
  if (!form || !input) return;

  const ACCEPTED_PASSWORDS = ['orbit31', 'dheeraj', 'portfolio', 'zendesk'];

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const val = input.value.trim().toLowerCase();

    if (!val) {
      showError('Please enter a password');
      return;
    }

    if (ACCEPTED_PASSWORDS.includes(val)) {
      if (feedback) {
        feedback.textContent = 'Access authorized. Loading protected case studies...';
        feedback.className = 'mt-3 text-xs text-[#33CD94] font-medium text-center';
      }
      input.classList.remove('shake-input');
      input.style.borderColor = '#33CD94';

      setTimeout(() => {
        const gateCard = document.querySelector('.password-card');
        if (gateCard) {
          gateCard.innerHTML = `
            <div class="w-12 h-12 rounded-full bg-[#F5F5F5] flex items-center justify-center mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#33CD94" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <h2 class="type-heading-gate font-bold text-center mb-2">Welcome! Work Access Granted</h2>
            <p class="type-body-default text-center mb-6">Private case study presentations for Zendesk AI, Multi-brand Garden Systems, and DHL Enterprise Logistics are available under NDA.</p>
            <div class="flex flex-col gap-3 w-full">
              <a href="mailto:dheerajsorbit@gmail.com?subject=Portfolio%20Presentation%20Deck%20Access" class="modal-email-btn w-full">
                <span>Request NDA Presentation Deck</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
              </a>
              <a href="about.html" class="inline-flex items-center justify-center text-sm font-medium text-[#706F6F] hover:text-[#111112] transition-colors py-2">
                Read About Dheeraj's Design Journey →
              </a>
            </div>
          `;
        }
      }, 600);
    } else {
      showError('Password incorrect. Click Email above to request access.');
    }
  });

  function showError(msg) {
    input.classList.remove('shake-input');
    // Trigger reflow to restart animation
    void input.offsetWidth;
    input.classList.add('shake-input');
    input.focus();

    if (feedback) {
      feedback.textContent = msg;
      feedback.className = 'mt-3 text-xs text-[#EF4444] font-medium text-center';
    }
  }

  input.addEventListener('input', () => {
    input.classList.remove('shake-input');
    if (feedback) {
      feedback.textContent = '';
    }
  });
}

/**
 * 5. Interactive Orbiting Planet & Cosmic Particle Burst/Rejoin System
 * Inspired by Codrops Particle Effects, canvas-particle-morphing, and gravitational n-body physics
 */
function initOrbitPlanet() {
  const canvas = document.getElementById('orbit-planet-canvas');
  const svg = document.getElementById('orbit-svg');
  const ellipse = document.getElementById('orbit-ellipse');
  if (!canvas || !svg || !ellipse) return;

  const ctx = canvas.getContext('2d');
  let dpr = window.devicePixelRatio || 1;
  let width = window.innerWidth;
  let height = window.innerHeight;

  function resize() {
    dpr = window.devicePixelRatio || 1;
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
  }

  window.addEventListener('resize', resize, { passive: true });
  resize();

  // Mathematical Starting Angle: 226.0 degrees sits just above the "Product Designer" headline
  let currentAngle = (226.0 * Math.PI) / 180;
  const NORMAL_ORBIT_SPEED = 0.00030; // Meditative, smooth celestial orbit speed when visible
  const FAST_OFFSCREEN_SPEED = 0.0036; // Fast ~12x speed when off-screen to quickly loop back from bottom
  let currentSpeed = NORMAL_ORBIT_SPEED;

  // Get exact screen coordinates using browser's native SVG transformation matrix
  function getOrbitPoint(angleRad) {
    try {
      const ctm = ellipse.getScreenCTM();
      if (!ctm) return { x: width / 2, y: height / 2 };
      const pt = svg.createSVGPoint();
      pt.x = 757 + 757 * Math.cos(angleRad);
      pt.y = 364 + 364 * Math.sin(angleRad);
      const transformed = pt.matrixTransform(ctm);
      return { x: transformed.x, y: transformed.y };
    } catch (err) {
      return { x: width / 2, y: height / 2 };
    }
  }

  // State Management: 'orbiting' | 'burst' | 'reforming'
  let state = 'orbiting';
  let planetRadius = 7.5;
  let targetRadius = 7.5;
  let isHovered = false;
  let mousePos = { x: -1000, y: -1000 };

  // Particle System
  const particles = [];
  const PARTICLE_COUNT = 48;
  const PARTICLE_PALETTE = [
    '#FFFFFF', // Core stellar white
    '#FFE2D1', // Hot plasma peach
    '#FFA070', // Radiant solar amber
    '#FF7A45', // Figma gradient top
    '#EB5624', // Signature Brand Accent
    '#C23A0E', // Deep core orange
    '#8C2000'  // Dark rim shadow
  ];

  class Particle {
    constructor(originX, originY) {
      this.x = originX;
      this.y = originY;
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 7.5 + 2.5;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
      this.radius = Math.random() * 2.5 + 1.2;
      this.color = PARTICLE_PALETTE[Math.floor(Math.random() * PARTICLE_PALETTE.length)];
      this.friction = 0.925;
      this.delay = Math.floor(Math.random() * 22) + 14; // Staggered expansion before gravitational pull
      this.absorbed = false;
    }

    update(targetX, targetY) {
      if (this.absorbed) return;

      if (this.delay > 0) {
        // Phase 1: Outward cosmic burst with air/space resistance
        this.delay--;
        this.x += this.vx;
        this.y += this.vy;
        this.vx *= this.friction;
        this.vy *= this.friction;
      } else {
        // Phase 2: Gravitational singularity attraction toward moving planet orbit coordinate
        const dx = targetX - this.x;
        const dy = targetY - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 4.5) {
          this.absorbed = true;
          return;
        }

        // Magnetic spring acceleration: stronger as distance increases, dampened near core
        const springForce = Math.min(0.26, 0.05 + (dist / 140) * 0.14);
        this.vx += (dx / dist) * springForce * dist * 0.14;
        this.vy += (dy / dist) * springForce * dist * 0.14;
        this.vx *= 0.87;
        this.vy *= 0.87;

        this.x += this.vx;
        this.y += this.vy;
      }
    }

    draw(ctx) {
      if (this.absorbed) return;
      ctx.save();
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.shadowColor = '#EB5624';
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.restore();
    }
  }

  // Shockwave & Reforming Spring
  let shockwaveRadius = 0;
  let shockwaveAlpha = 0;
  let reformSpring = { scale: 1.0, vel: 0 };
  let flashAlpha = 0;

  function burstPlanet() {
    if (state === 'burst') return;
    const currentPos = getOrbitPoint(currentAngle);
    state = 'burst';
    particles.length = 0;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(new Particle(currentPos.x, currentPos.y));
    }
    shockwaveRadius = planetRadius;
    shockwaveAlpha = 0.9;
  }

  // Animation Loop
  function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, width, height);

    const planetPos = getOrbitPoint(currentAngle);

    // Dynamic orbital speed: slow & majestic when visible on screen, fast loop when offscreen
    const isOffscreen = (
      planetPos.x < -35 ||
      planetPos.x > width + 35 ||
      planetPos.y < -35 ||
      planetPos.y > height + 35
    );
    const targetSpeed = isOffscreen ? FAST_OFFSCREEN_SPEED : NORMAL_ORBIT_SPEED;
    currentSpeed += (targetSpeed - currentSpeed) * 0.12;
    currentAngle += currentSpeed;
    if (currentAngle > Math.PI * 2) currentAngle -= Math.PI * 2;

    // Proximity check for pointer events & cursor
    const distToMouse = Math.hypot(mousePos.x - planetPos.x, mousePos.y - planetPos.y);
    isHovered = distToMouse < 26;
    
    // Dynamically toggle pointer-events so non-planet areas never block page clicks
    if (isHovered || state === 'burst') {
      canvas.style.pointerEvents = 'auto';
      canvas.style.cursor = 'pointer';
    } else {
      canvas.style.pointerEvents = 'none';
      canvas.style.cursor = 'default';
    }

    // Smooth hover scale interpolation
    targetRadius = isHovered ? 9.2 : 7.5;
    planetRadius += (targetRadius - planetRadius) * 0.16;

    if (state === 'orbiting') {
      ctx.save();

      // Atmospheric Halo Pulse on Hover
      if (isHovered) {
        ctx.beginPath();
        ctx.arc(planetPos.x, planetPos.y, planetRadius + 6, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(235, 86, 36, 0.35)';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(planetPos.x, planetPos.y, planetRadius + 12, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(235, 86, 36, 0.12)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Elevation Drop Shadow (matching Figma field guide: -2px 4px 4px rgba(0,0,0,0.25))
      ctx.shadowColor = 'rgba(0, 0, 0, 0.28)';
      ctx.shadowBlur = 4;
      ctx.shadowOffsetX = -2;
      ctx.shadowOffsetY = 4;

      // Perfectly Round 3D Sphere with Precision Radial Gradient
      ctx.beginPath();
      ctx.arc(planetPos.x, planetPos.y, planetRadius, 0, Math.PI * 2);
      const sphereGrad = ctx.createRadialGradient(
        planetPos.x - planetRadius * 0.35,
        planetPos.y - planetRadius * 0.35,
        planetRadius * 0.08,
        planetPos.x,
        planetPos.y,
        planetRadius
      );
      sphereGrad.addColorStop(0, '#FFA274');
      sphereGrad.addColorStop(0.35, '#EB5624');
      sphereGrad.addColorStop(0.85, '#C23A0E');
      sphereGrad.addColorStop(1, '#8C2000');
      ctx.fillStyle = sphereGrad;
      ctx.fill();
      ctx.restore();

    } else if (state === 'burst') {
      // Expanding Supernova Shockwave Ring
      if (shockwaveAlpha > 0.01) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(planetPos.x, planetPos.y, shockwaveRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(235, 86, 36, ${shockwaveAlpha})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.restore();

        shockwaveRadius += (70 - shockwaveRadius) * 0.16;
        shockwaveAlpha *= 0.90;
      }

      // Update & Draw Particles in Flight
      let activeCount = 0;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.update(planetPos.x, planetPos.y);
        p.draw(ctx);
        if (!p.absorbed) activeCount++;
      }

      // Gravitational Singularity Core Indicator (subtle glowing center welcoming particles back)
      ctx.save();
      ctx.beginPath();
      ctx.arc(planetPos.x, planetPos.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(235, 86, 36, 0.4)';
      ctx.shadowColor = '#EB5624';
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.restore();

      // All particles returned -> trigger elastic coalescence snap
      if (activeCount === 0) {
        state = 'reforming';
        reformSpring.scale = 1.45;
        reformSpring.vel = 0;
        flashAlpha = 0.9;
      }

    } else if (state === 'reforming') {
      // Damped Harmonic Oscillator (Spring Elastic Snap)
      reformSpring.vel += (1.0 - reformSpring.scale) * 0.20;
      reformSpring.vel *= 0.70;
      reformSpring.scale += reformSpring.vel;

      const currentR = planetRadius * reformSpring.scale;

      ctx.save();
      // Rebirth Flash Ring
      if (flashAlpha > 0.02) {
        ctx.beginPath();
        ctx.arc(planetPos.x, planetPos.y, currentR + 10 * (1 - flashAlpha), 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 122, 69, ${flashAlpha})`;
        ctx.lineWidth = 2;
        ctx.stroke();
        flashAlpha *= 0.85;
      }

      ctx.shadowColor = 'rgba(235, 86, 36, 0.45)';
      ctx.shadowBlur = 12;
      ctx.shadowOffsetX = -2;
      ctx.shadowOffsetY = 4;

      ctx.beginPath();
      ctx.arc(planetPos.x, planetPos.y, Math.max(1, currentR), 0, Math.PI * 2);
      const reformGrad = ctx.createRadialGradient(
        planetPos.x - currentR * 0.35,
        planetPos.y - currentR * 0.35,
        currentR * 0.08,
        planetPos.x,
        planetPos.y,
        currentR
      );
      reformGrad.addColorStop(0, '#FFBA94');
      reformGrad.addColorStop(0.35, '#EB5624');
      reformGrad.addColorStop(0.85, '#C23A0E');
      reformGrad.addColorStop(1, '#8C2000');
      ctx.fillStyle = reformGrad;
      ctx.fill();
      ctx.restore();

      // Settle back to stable orbit
      if (Math.abs(reformSpring.scale - 1.0) < 0.008 && Math.abs(reformSpring.vel) < 0.003) {
        state = 'orbiting';
      }
    }
  }

  // Event Listeners
  window.addEventListener('mousemove', (e) => {
    mousePos.x = e.clientX;
    mousePos.y = e.clientY;
  }, { passive: true });

  window.addEventListener('click', (e) => {
    const planetPos = getOrbitPoint(currentAngle);
    const dist = Math.hypot(e.clientX - planetPos.x, e.clientY - planetPos.y);
    if (dist < 28) {
      burstPlanet();
    }
  });

  window.addEventListener('touchstart', (e) => {
    if (e.touches && e.touches[0]) {
      const touch = e.touches[0];
      const planetPos = getOrbitPoint(currentAngle);
      const dist = Math.hypot(touch.clientX - planetPos.x, touch.clientY - planetPos.y);
      if (dist < 36) {
        burstPlanet();
      }
    }
  }, { passive: true });

  requestAnimationFrame(animate);
}
