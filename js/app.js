/**
 * Master Application Coordinator
 * Initializes all enchanted systems, binds viewport switches, spells, and dynamic tickets
 */
document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Floating Hogwarts Candles
  initFloatingCandles();

  // 2. Initialize Wand Canvas Particle Engine
  if (window.WandFX) {
    window.WandFX.init();
  }

  // 3. Initialize Wizarding Spells & Prologue (Lumos, Patronus, Alohomora, Leviosa)
  if (window.SpellsController) {
    window.SpellsController.init();
  }

  // 4. Initialize Act I: 3D Wax Seal Envelope
  if (window.EnvelopeExperience) {
    window.EnvelopeExperience.init();
  }

  // 5. Initialize Act II: Marauder's Map Footsteps Tracker
  if (window.MaraudersMap) {
    window.MaraudersMap.init();
  }

  // 6. Initialize Act III: Liquid Distortion Living Portraits
  if (window.LiquidDistortion) {
    window.LiquidDistortion.init();
  }

  // 7. Initialize Act IV: Time Turner Countdown
  if (window.TimeTurner) {
    window.TimeTurner.init();
  }

  // 8. Initialize Act V: Order of Events Expandable Cards
  initEventAccordions();

  // 9. Initialize Sorting Hat Ceremony
  if (window.SortingHat) {
    window.SortingHat.init();
  }

  // 10. Initialize Act VI: Enchanted Quill RSVP Desk
  if (window.RSVPDesk) {
    window.RSVPDesk.init();
  }

  // 11. Initialize Act VII: Save The Date, Snitch & Calendar
  if (window.SaveTheDate) {
    window.SaveTheDate.init();
  }

  // 12. Bind Evaluator Toolbar Controls (Device Mockup vs Fullscreen, Audio, Wand)
  initToolbarControls();

  // 13. Dynamic Passenger Name Sync with Platform 9 3/4 Ticket
  bindPassengerNameSync();
});

/**
 * Generate 12 procedurally drifting floating candles
 */
function initFloatingCandles() {
  const container = document.querySelector('.floating-candles-container');
  if (!container) return;

  const count = 14;
  for (let i = 0; i < count; i++) {
    const candle = document.createElement('div');
    candle.className = 'floating-candle';
    const leftPercent = 4 + (i * 92) / count + (Math.random() * 5 - 2.5);
    const topPercent = 8 + Math.random() * 70;
    const delay = (Math.random() * 5).toFixed(2);
    const duration = (5 + Math.random() * 4).toFixed(2);

    candle.style.left = `${leftPercent}%`;
    candle.style.top = `${topPercent}%`;
    candle.style.animationDelay = `${delay}s`;
    candle.style.animationDuration = `${duration}s`;
    candle.style.transform = `scale(${0.7 + Math.random() * 0.4})`;

    container.appendChild(candle);
  }
}

/**
 * Order of Events Accordion
 */
function initEventAccordions() {
  const eventItems = document.querySelectorAll('.event-item');
  eventItems.forEach((item) => {
    item.addEventListener('click', () => {
      const isExpanded = item.classList.contains('expanded');
      eventItems.forEach((other) => other.classList.remove('expanded'));
      if (!isExpanded) {
        item.classList.add('expanded');
        if (window.EnchantedAudio) {
          window.EnchantedAudio.playChime(523.25, 0.3);
        }
      }
    });
  });
}

/**
 * Top Toolbar Controls for Evaluator Review
 */
function initToolbarControls() {
  const viewportStage = document.getElementById('viewport-stage');
  const btnPhone = document.getElementById('btn-view-phone');
  const btnFull = document.getElementById('btn-view-full');
  const btnAudio = document.getElementById('btn-toggle-audio');
  const btnWand = document.getElementById('btn-toggle-lumos');

  if (btnPhone && btnFull && viewportStage) {
    btnPhone.addEventListener('click', () => {
      viewportStage.className = 'viewport-stage mode-phone';
      btnPhone.classList.add('active');
      btnFull.classList.remove('active');
    });

    btnFull.addEventListener('click', () => {
      viewportStage.className = 'viewport-stage mode-fullscreen';
      btnFull.classList.add('active');
      btnPhone.classList.remove('active');
    });
  }

  // Audio Toggle (Hedwig's Theme)
  if (btnAudio && window.EnchantedAudio) {
    const waves = btnAudio.querySelector('.audio-waves');
    btnAudio.addEventListener('click', () => {
      const isPlaying = window.EnchantedAudio.toggle();
      if (isPlaying) {
        btnAudio.classList.add('active');
        if (waves) waves.classList.remove('paused');
      } else {
        btnAudio.classList.remove('active');
        if (waves) waves.classList.add('paused');
      }
    });
  }

  // Wand Particle Trail Toggle
  if (btnWand && window.WandFX) {
    btnWand.addEventListener('click', () => {
      window.WandFX.isLumosActive = !window.WandFX.isLumosActive;
      btnWand.classList.toggle('active', window.WandFX.isLumosActive);
      if (window.EnchantedAudio) {
        window.EnchantedAudio.playWandWhoosh();
      }
    });
  }
}

/**
 * Sync guest name typed in RSVP with Platform 9 3/4 Passenger ticket
 */
function bindPassengerNameSync() {
  const rsvpInput = document.getElementById('rsvp-guest-name');
  const ticketPassenger = document.getElementById('ticket-passenger-name');
  if (rsvpInput && ticketPassenger) {
    rsvpInput.addEventListener('input', () => {
      const val = rsvpInput.value.trim();
      ticketPassenger.textContent = val || "Honored Passenger";
    });
  }
}
