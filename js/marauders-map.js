/**
 * MaraudersMapTracker: Extended page-wide scroll-driven footsteps leading visitors between all sections
 */
class MaraudersMapTracker {
  constructor() {
    this.container = null;
    this.footsteps = [];
    this.milestones = [];
  }

  init() {
    this.container = document.querySelector('.map-trail-container');
    if (!this.container) return;

    this.milestones = Array.from(document.querySelectorAll('.map-milestone'));
    this.generateTrailFootsteps();

    // Scroll listeners
    const scrollTarget = document.getElementById('app-container') || window;
    scrollTarget.addEventListener('scroll', () => this.handleScroll(), { passive: true });
    window.addEventListener('scroll', () => this.handleScroll(), { passive: true });

    this.handleScroll();
  }

  generateTrailFootsteps() {
    // 24 footsteps winding across the full path
    const positions = [
      { x: 50, y: 30, angle: 10, isLeft: true },
      { x: 58, y: 75, angle: 20, isLeft: false },
      { x: 68, y: 125, angle: 25, isLeft: true },
      { x: 74, y: 175, angle: 10, isLeft: false },
      { x: 70, y: 225, angle: -15, isLeft: true },
      { x: 58, y: 275, angle: -30, isLeft: false },
      { x: 42, y: 325, angle: -35, isLeft: true },
      { x: 28, y: 380, angle: -15, isLeft: false },
      { x: 25, y: 440, angle: 10, isLeft: true },
      { x: 30, y: 500, angle: 28, isLeft: false },
      { x: 42, y: 560, angle: 35, isLeft: true },
      { x: 58, y: 620, angle: 20, isLeft: false },
      { x: 68, y: 680, angle: 0, isLeft: true },
      { x: 66, y: 740, angle: -18, isLeft: false },
      { x: 54, y: 800, angle: -25, isLeft: true },
      { x: 45, y: 860, angle: -5, isLeft: false },
      { x: 48, y: 920, angle: 12, isLeft: true },
      { x: 56, y: 980, angle: 18, isLeft: false },
      { x: 62, y: 1040, angle: 0, isLeft: true },
      { x: 58, y: 1100, angle: -15, isLeft: false }
    ];

    const leftSvg = `
      <svg viewBox="0 0 40 70">
        <ellipse cx="20" cy="54" rx="9" ry="12" fill="#44240e" opacity="0.85"/>
        <path d="M11 28 C9 14, 25 10, 29 22 C32 32, 27 40, 19 40 C14 40, 11 36, 11 28 Z" fill="#44240e" opacity="0.85"/>
        <circle cx="15" cy="9" r="2.2" fill="#44240e"/>
        <circle cx="21" cy="7.5" r="2.5" fill="#44240e"/>
        <circle cx="27" cy="8.5" r="2.2" fill="#44240e"/>
      </svg>
    `;

    const rightSvg = `
      <svg viewBox="0 0 40 70">
        <ellipse cx="20" cy="54" rx="9" ry="12" fill="#44240e" opacity="0.85"/>
        <path d="M29 28 C31 14, 15 10, 11 22 C8 32, 13 40, 21 40 C26 40, 29 36, 29 28 Z" fill="#44240e" opacity="0.85"/>
        <circle cx="25" cy="9" r="2.2" fill="#44240e"/>
        <circle cx="19" cy="7.5" r="2.5" fill="#44240e"/>
        <circle cx="13" cy="8.5" r="2.2" fill="#44240e"/>
      </svg>
    `;

    positions.forEach((pos) => {
      const node = document.createElement('div');
      node.className = 'footstep-node';
      node.style.left = `${pos.x}%`;
      node.style.top = `${pos.y}px`;
      node.style.transform = `translate(-50%, -50%) rotate(${pos.angle}deg) scale(0.6)`;
      node.dataset.baseAngle = pos.angle;
      node.innerHTML = pos.isLeft ? leftSvg : rightSvg;

      this.container.appendChild(node);
      this.footsteps.push({ elem: node, y: pos.y, revealed: false });
    });
  }

  handleScroll() {
    const rect = this.container.getBoundingClientRect();
    const windowH = window.innerHeight;

    // Relative scroll progress
    const progress = Math.min(1, Math.max(0, (windowH * 0.75 - rect.top) / (rect.height * 0.9)));
    const activeCount = Math.floor(progress * (this.footsteps.length + 2));

    this.footsteps.forEach((step, idx) => {
      if (idx <= activeCount) {
        if (!step.revealed) {
          step.revealed = true;
          step.elem.classList.add('visible');
          const angle = step.elem.dataset.baseAngle;
          step.elem.style.transform = `translate(-50%, -50%) rotate(${angle}deg) scale(1)`;
        }
      } else {
        if (step.revealed) {
          step.revealed = false;
          step.elem.classList.remove('visible');
          const angle = step.elem.dataset.baseAngle;
          step.elem.style.transform = `translate(-50%, -50%) rotate(${angle}deg) scale(0.6)`;
        }
      }
    });

    // Milestone animations
    this.milestones.forEach((m) => {
      const mRect = m.getBoundingClientRect();
      if (mRect.top < windowH * 0.85) {
        m.classList.add('active');
      }
    });
  }
}

window.MaraudersMap = new MaraudersMapTracker();
