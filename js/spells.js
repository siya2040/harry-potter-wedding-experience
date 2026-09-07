/**
 * WizardingSpellsController: Interactive wand spellcaster and cinematic prologue
 */
class WizardingSpellsController {
  constructor() {
    this.activeSpells = {
      lumos: false,
      leviosa: false
    };
  }

  init() {
    this.initCinematicPrologue();
    this.initFallingLetters();
    this.bindSpellButtons();
    this.bindTicketFlip();
  }

  // Cinematic Prologue requested in prompt:
  // "You are invited..." followed by "...to a magical wedding."
  initCinematicPrologue() {
    const overlay = document.getElementById('cinematic-prologue');
    const text1 = document.getElementById('prologue-text-1');
    const text2 = document.getElementById('prologue-text-2');
    if (!overlay || !text1 || !text2) return;

    // Step 1: Reveal "You are invited..."
    setTimeout(() => {
      text1.classList.add('active');
      if (window.EnchantedAudio) {
        window.EnchantedAudio.playChime(493.88, 1.2);
      }
    }, 400);

    // Step 2: Dissolve "You are invited..." into dust
    setTimeout(() => {
      text1.classList.remove('active');
      text1.classList.add('dissolve');
      if (window.WandFX) {
        window.WandFX.burst(window.innerWidth / 2, window.innerHeight * 0.45, 30, 'gold');
      }
    }, 2400);

    // Step 3: Reveal "...to a magical wedding."
    setTimeout(() => {
      text2.classList.add('active');
      if (window.EnchantedAudio) {
        window.EnchantedAudio.playChime(659.25, 1.4);
      }
    }, 3200);

    // Step 4: Fade overlay and reveal the sealed envelope
    setTimeout(() => {
      text2.classList.remove('active');
      text2.classList.add('dissolve');
      overlay.classList.add('hidden');
      if (window.WandFX) {
        window.WandFX.burst(window.innerWidth / 2, window.innerHeight * 0.5, 45, 'cosmic');
      }
    }, 5200);
  }

  // Falling Hogwarts Letters Storm (Privet Drive scene)
  initFallingLetters() {
    const container = document.querySelector('.falling-letters-container');
    if (!container) return;

    const letterCount = 18;
    for (let i = 0; i < letterCount; i++) {
      const letter = document.createElement('div');
      letter.className = 'falling-letter-item';
      letter.style.left = `${Math.random() * 95}%`;
      letter.style.animationDuration = `${6 + Math.random() * 8}s`;
      letter.style.animationDelay = `${Math.random() * 10}s`;
      letter.style.transform = `scale(${0.6 + Math.random() * 0.6})`;
      container.appendChild(letter);
    }
  }

  bindSpellButtons() {
    // 1. Lumos Maxima Spell
    const btnLumos = document.getElementById('spell-lumos');
    if (btnLumos) {
      btnLumos.addEventListener('click', () => {
        this.castLumos();
      });
    }

    // 2. Expecto Patronum Spell
    const btnPatronus = document.getElementById('spell-patronus');
    if (btnPatronus) {
      btnPatronus.addEventListener('click', () => {
        this.castExpectoPatronum();
      });
    }

    // 3. Alohomora Spell
    const btnAlohomora = document.getElementById('spell-alohomora');
    if (btnAlohomora) {
      btnAlohomora.addEventListener('click', () => {
        this.castAlohomora();
      });
    }

    // 4. Wingardium Leviosa Spell
    const btnLeviosa = document.getElementById('spell-leviosa');
    if (btnLeviosa) {
      btnLeviosa.addEventListener('click', () => {
        this.castWingardiumLeviosa();
      });
    }
  }

  castLumos() {
    if (window.EnchantedAudio) {
      window.EnchantedAudio.playWandWhoosh();
    }
    const burstOverlay = document.querySelector('.lumos-burst-overlay');
    if (burstOverlay) {
      burstOverlay.classList.remove('burst');
      void burstOverlay.offsetWidth;
      burstOverlay.classList.add('burst');
    }
    if (window.WandFX) {
      window.WandFX.burst(window.innerWidth / 2, window.innerHeight / 2, 60, 'cosmic');
    }
    // Also reveal invisible ink in the gallery
    const lumosLayer = document.querySelector('.lumos-secret-reveal');
    if (lumosLayer) {
      lumosLayer.classList.toggle('revealed');
    }
  }

  castExpectoPatronum() {
    if (window.EnchantedAudio) {
      window.EnchantedAudio.playPatronusSpell();
    }

    const runner = document.getElementById('patronus-runner');
    if (runner) {
      runner.classList.remove('running');
      void runner.offsetWidth;
      runner.classList.add('running');
    }

    if (window.WandFX) {
      // Trail of silver patronus stardust
      for (let i = 0; i < 5; i++) {
        setTimeout(() => {
          window.WandFX.burst(window.innerWidth * (0.2 + i * 0.15), window.innerHeight * 0.6, 25, 'cosmic');
        }, i * 500);
      }
    }
  }

  castAlohomora() {
    if (window.EnchantedAudio) {
      window.EnchantedAudio.playAlohomora();
    }
    if (window.WandFX) {
      window.WandFX.burst(window.innerWidth / 2, window.innerHeight * 0.5, 40, 'gold');
    }
    // Expand all itinerary event drawers
    const drawers = document.querySelectorAll('.event-item');
    drawers.forEach((d) => d.classList.toggle('expanded'));
  }

  castWingardiumLeviosa() {
    this.activeSpells.leviosa = !this.activeSpells.leviosa;
    const stage = document.getElementById('viewport-stage');
    if (stage) {
      stage.classList.toggle('levitating-active', this.activeSpells.leviosa);
    }
    const btn = document.getElementById('spell-leviosa');
    if (btn) btn.classList.toggle('active', this.activeSpells.leviosa);

    if (window.EnchantedAudio) {
      window.EnchantedAudio.playWandWhoosh();
    }
  }

  bindTicketFlip() {
    const scene = document.querySelector('.ticket-3d-scene');
    if (scene) {
      scene.addEventListener('click', () => {
        scene.classList.toggle('flipped');
        if (window.EnchantedAudio) {
          window.EnchantedAudio.playTrainWhistle();
        }
      });
    }
  }
}

window.SpellsController = new WizardingSpellsController();
