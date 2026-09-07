/**
 * EnchantedQuillRSVP: Interactive quill writing simulation, house sorting & owl dispatch
 */
class EnchantedQuillRSVP {
  constructor() {
    this.nameInput = null;
    this.quill = null;
    this.houseCards = [];
    this.attendancePills = [];
    this.dispatchBtn = null;
    this.scrollContainer = null;
    this.confirmationModal = null;
    this.selectedHouse = 'Gryffindor';
    this.isAttending = true;
  }

  init() {
    this.nameInput = document.getElementById('rsvp-guest-name');
    this.quill = document.querySelector('.floating-quill-holder');
    this.houseCards = Array.from(document.querySelectorAll('.house-radio-card'));
    this.attendancePills = Array.from(document.querySelectorAll('.pill-option'));
    this.dispatchBtn = document.getElementById('btn-dispatch-owl');
    this.scrollContainer = document.querySelector('.rsvp-parchment-scroll');
    this.confirmationModal = document.querySelector('.owl-dispatched-confirmation');

    this.bindQuillTyping();
    this.bindHouseSelection();
    this.bindAttendanceToggle();
    this.bindOwlDispatch();
  }

  bindQuillTyping() {
    if (!this.nameInput || !this.quill) return;

    let scratchTimer = null;
    this.nameInput.addEventListener('input', () => {
      this.quill.classList.add('writing');
      if (window.EnchantedAudio) {
        window.EnchantedAudio.playQuillScratch();
      }

      clearTimeout(scratchTimer);
      scratchTimer = setTimeout(() => {
        this.quill.classList.remove('writing');
      }, 300);
    });

    this.nameInput.addEventListener('focus', () => {
      this.quill.classList.add('writing');
    });

    this.nameInput.addEventListener('blur', () => {
      this.quill.classList.remove('writing');
    });
  }

  bindHouseSelection() {
    this.houseCards.forEach((card) => {
      card.addEventListener('click', () => {
        this.houseCards.forEach((c) => c.classList.remove('selected'));
        card.classList.add('selected');
        this.selectedHouse = card.dataset.house || 'Gryffindor';

        if (window.EnchantedAudio) {
          window.EnchantedAudio.playChime(622.25, 0.4);
        }
      });
    });
  }

  bindAttendanceToggle() {
    this.attendancePills.forEach((pill) => {
      pill.addEventListener('click', () => {
        this.attendancePills.forEach((p) => p.classList.remove('active'));
        pill.classList.add('active');
        this.isAttending = pill.dataset.attend === 'yes';

        if (window.EnchantedAudio) {
          window.EnchantedAudio.playChime(440, 0.3);
        }
      });
    });
  }

  bindOwlDispatch() {
    if (!this.dispatchBtn || !this.scrollContainer) return;

    this.dispatchBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const guestName = (this.nameInput && this.nameInput.value.trim()) || "Honored Guest";

      // Owl hoot and wand sound
      if (window.EnchantedAudio) {
        window.EnchantedAudio.playOwlHoot();
        setTimeout(() => window.EnchantedAudio.playWandWhoosh(), 400);
      }

      const rect = this.dispatchBtn.getBoundingClientRect();
      if (window.WandFX) {
        window.WandFX.burst(rect.left + rect.width / 2, rect.top, 50, 'gold');
      }

      // Fold letter into flying origami owl
      this.scrollContainer.classList.add('dispatched');

      // Populate confirmation certificate
      const nameFillEl = document.getElementById('confirmation-guest-name');
      const houseFillEl = document.getElementById('confirmation-house');
      if (nameFillEl) nameFillEl.textContent = guestName;
      if (houseFillEl) houseFillEl.textContent = this.selectedHouse;

      // Reveal confirmation scroll
      setTimeout(() => {
        if (this.confirmationModal) {
          this.confirmationModal.classList.add('show');
        }
        if (window.WandFX) {
          window.WandFX.burst(window.innerWidth / 2, window.innerHeight * 0.4, 40, 'cosmic');
        }
      }, 1400);
    });
  }
}

window.RSVPDesk = new EnchantedQuillRSVP();
