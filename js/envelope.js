/**
 * EnvelopeCeremony: 3D Wax Seal Opening & Invitation Reveal
 */
class EnvelopeOpeningCeremony {
  constructor() {
    this.stage = null;
    this.waxSeal = null;
    this.owlWrapper = null;
    this.isOpened = false;
  }

  init() {
    this.stage = document.getElementById('envelope-stage');
    this.waxSeal = document.getElementById('wax-seal-target');
    this.owlWrapper = document.getElementById('flying-owl-intro');

    if (!this.stage || !this.waxSeal) return;

    // Trigger owl flight entrance after a brief delay
    setTimeout(() => {
      if (this.owlWrapper) {
        this.owlWrapper.classList.add('fly-in');
        if (window.EnchantedAudio) {
          window.EnchantedAudio.playOwlHoot();
        }
      }
    }, 600);

    // Wax seal click or tap
    this.waxSeal.addEventListener('click', (e) => {
      e.stopPropagation();
      this.breakSeal(e);
    });

    // Also support tapping the envelope body to open
    this.stage.addEventListener('click', (e) => {
      if (!this.isOpened) {
        this.breakSeal(e);
      }
    });
  }

  breakSeal(event) {
    if (this.isOpened) return;
    this.isOpened = true;

    const rect = this.waxSeal.getBoundingClientRect();
    const burstX = rect.left + rect.width / 2;
    const burstY = rect.top + rect.height / 2;

    // Wax crackle sound & sparks
    if (window.EnchantedAudio) {
      window.EnchantedAudio.init();
      window.EnchantedAudio.playWaxCrack();
    }

    if (window.WandFX) {
      window.WandFX.burst(burstX, burstY, 45, 'wax');
      setTimeout(() => {
        window.WandFX.burst(burstX, burstY - 40, 25, 'gold');
      }, 350);
    }

    // Wax seal animation
    const waxWrapper = document.querySelector('.wax-seal-wrapper');
    if (waxWrapper) {
      waxWrapper.classList.add('broken');
    }

    // Open envelope flap and unfold letter
    setTimeout(() => {
      this.stage.classList.add('opened');
      if (window.EnchantedAudio) {
        window.EnchantedAudio.playWandWhoosh();
      }
    }, 250);

    // Dispatch event
    window.dispatchEvent(new CustomEvent('magicalEnvelopeOpened'));
  }
}

window.EnvelopeExperience = new EnvelopeOpeningCeremony();
