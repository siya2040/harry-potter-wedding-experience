/**
 * WandFX: 60 FPS HTML5 Canvas Particle Engine
 * Creates magical wand trails, glowing sparks, wax burst particles, and ambient floating embers.
 */
class WandParticleEngine {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.particles = [];
    this.maxParticles = 120;
    this.ambientEmbers = [];
    this.isLumosActive = true;
    this.mouse = { x: -100, y: -100, lastX: -100, lastY: -100, speed: 0 };
  }

  init() {
    this.canvas = document.getElementById('wand-canvas');
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.resize();

    window.addEventListener('resize', () => this.resize());

    // Mouse events
    window.addEventListener('mousemove', (e) => {
      this.handlePointerMove(e.clientX, e.clientY);
    });

    // Touch events for mobile-first experience
    window.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        this.handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });

    // Ambient floating embers in background
    for (let i = 0; i < 35; i++) {
      this.ambientEmbers.push(this.createAmbientEmber());
    }

    this.animate();
  }

  resize() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  handlePointerMove(x, y) {
    const dx = x - this.mouse.lastX;
    const dy = y - this.mouse.lastY;
    this.mouse.speed = Math.sqrt(dx * dx + dy * dy);
    this.mouse.x = x;
    this.mouse.y = y;
    this.mouse.lastX = x;
    this.mouse.lastY = y;

    if (this.isLumosActive && this.particles.length < this.maxParticles) {
      const spawnCount = Math.min(4, Math.max(1, Math.floor(this.mouse.speed / 4)));
      for (let i = 0; i < spawnCount; i++) {
        this.particles.push(this.createWandSpark(x, y));
      }
    }
  }

  createWandSpark(x, y) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 0.5 + Math.random() * 2.5;
    const colors = ['#ffd700', '#ffeb99', '#ffffff', '#ff9900', '#f4ebd0'];
    return {
      x: x + (Math.random() - 0.5) * 8,
      y: y + (Math.random() - 0.5) * 8,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 0.5,
      size: 2 + Math.random() * 3.5,
      alpha: 1,
      decay: 0.02 + Math.random() * 0.03,
      color: colors[Math.floor(Math.random() * colors.length)],
      isStar: Math.random() > 0.6
    };
  }

  createAmbientEmber() {
    return {
      x: Math.random() * (this.canvas ? this.canvas.width : window.innerWidth),
      y: Math.random() * (this.canvas ? this.canvas.height : window.innerHeight),
      vx: (Math.random() - 0.5) * 0.4,
      vy: -0.2 - Math.random() * 0.5,
      size: 1 + Math.random() * 2,
      alpha: 0.2 + Math.random() * 0.6,
      pulseSpeed: 0.02 + Math.random() * 0.03,
      color: Math.random() > 0.3 ? '#ffd700' : '#ff7700'
    };
  }

  burst(x, y, count = 30, colorType = 'gold') {
    if (!this.ctx) return;
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 6;
      let color = '#ffd700';
      if (colorType === 'wax') {
        const waxColors = ['#8b0000', '#a00e0e', '#c41e3a', '#540000', '#ffd700'];
        color = waxColors[Math.floor(Math.random() * waxColors.length)];
      } else if (colorType === 'cosmic') {
        const cosmicColors = ['#ffffff', '#fff2a3', '#ffd700', '#8be9fd'];
        color = cosmicColors[Math.floor(Math.random() * cosmicColors.length)];
      }

      this.particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 3 + Math.random() * 4,
        alpha: 1,
        decay: 0.015 + Math.random() * 0.025,
        color: color,
        isStar: true
      });
    }
  }

  animate() {
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Render & update ambient floating embers
    for (let i = 0; i < this.ambientEmbers.length; i++) {
      const e = this.ambientEmbers[i];
      e.y += e.vy;
      e.x += e.vx;
      e.alpha += Math.sin(Date.now() * 0.003) * 0.005;

      if (e.y < -10) {
        e.y = this.canvas.height + 10;
        e.x = Math.random() * this.canvas.width;
      }

      this.ctx.save();
      this.ctx.globalAlpha = Math.max(0.1, Math.min(0.8, e.alpha));
      this.ctx.fillStyle = e.color;
      this.ctx.shadowBlur = 6;
      this.ctx.shadowColor = e.color;
      this.ctx.beginPath();
      this.ctx.arc(e.x, e.y, e.size, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    }

    // Render & update wand sparks
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.04; // subtle gravity
      p.alpha -= p.decay;

      if (p.alpha <= 0) {
        this.particles.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.globalAlpha = p.alpha;
      this.ctx.fillStyle = p.color;
      this.ctx.shadowBlur = 10;
      this.ctx.shadowColor = p.color;

      if (p.isStar) {
        // 4-pointed sparkle star
        const s = p.size * 1.5;
        this.ctx.beginPath();
        this.ctx.moveTo(p.x, p.y - s);
        this.ctx.quadraticCurveTo(p.x, p.y, p.x + s, p.y);
        this.ctx.quadraticCurveTo(p.x, p.y, p.x, p.y + s);
        this.ctx.quadraticCurveTo(p.x, p.y, p.x - s, p.y);
        this.ctx.quadraticCurveTo(p.x, p.y, p.x, p.y - s);
        this.ctx.fill();
      } else {
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        this.ctx.fill();
      }

      this.ctx.restore();
    }

    requestAnimationFrame(() => this.animate());
  }
}

window.WandFX = new WandParticleEngine();
