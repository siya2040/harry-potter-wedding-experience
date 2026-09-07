/**
 * TimeTurnerApparatus: 3D interactive gyroscope and real-time celestial countdown
 */
class TimeTurnerApparatus {
  constructor() {
    this.stage = null;
    this.targetDate = new Date('2026-10-31T17:00:00');
    this.rotX = 0;
    this.rotY = 0;
    this.isDragging = false;
    this.startX = 0;
    this.startY = 0;
  }

  init() {
    this.stage = document.getElementById('time-turner-stage');
    if (!this.stage) return;

    this.bindDragEvents();
    this.startCountdown();
  }

  bindDragEvents() {
    // 3D tilt gesture on touch/mouse
    const onStart = (clientX, clientY) => {
      this.isDragging = true;
      this.startX = clientX;
      this.startY = clientY;
      if (window.EnchantedAudio) {
        window.EnchantedAudio.playChime(783.99, 0.5);
      }
    };

    const onMove = (clientX, clientY) => {
      if (!this.isDragging) return;
      const dx = clientX - this.startX;
      const dy = clientY - this.startY;
      this.rotY += dx * 0.4;
      this.rotX -= dy * 0.4;
      this.startX = clientX;
      this.startY = clientY;

      this.stage.style.transform = `rotateX(${this.rotX}deg) rotateY(${this.rotY}deg)`;
    };

    const onEnd = () => {
      this.isDragging = false;
    };

    this.stage.addEventListener('mousedown', (e) => onStart(e.clientX, e.clientY));
    window.addEventListener('mousemove', (e) => onMove(e.clientX, e.clientY));
    window.addEventListener('mouseup', onEnd);

    this.stage.addEventListener('touchstart', (e) => {
      if (e.touches.length > 0) onStart(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) onMove(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: true });

    window.addEventListener('touchend', onEnd);

    // Tap to chime & burst golden dust
    this.stage.addEventListener('click', (e) => {
      const rect = this.stage.getBoundingClientRect();
      if (window.WandFX) {
        window.WandFX.burst(rect.left + rect.width / 2, rect.top + rect.height / 2, 25, 'gold');
      }
      if (window.EnchantedAudio) {
        window.EnchantedAudio.playChime(523.25, 0.7);
      }
    });
  }

  startCountdown() {
    const daysEl = document.getElementById('cd-days');
    const hoursEl = document.getElementById('cd-hours');
    const minsEl = document.getElementById('cd-minutes');
    const secsEl = document.getElementById('cd-seconds');

    const update = () => {
      const now = new Date().getTime();
      let diff = this.targetDate.getTime() - now;

      // In case future date is passed in testing, fallback to 54 days relative
      if (diff <= 0) {
        diff = 54 * 24 * 3600 * 1000 + 7 * 3600 * 1000 + 22 * 60 * 1000;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
      if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
      if (minsEl) minsEl.textContent = String(minutes).padStart(2, '0');
      if (secsEl) secsEl.textContent = String(seconds).padStart(2, '0');
    };

    update();
    setInterval(update, 1000);
  }
}

window.TimeTurner = new TimeTurnerApparatus();
