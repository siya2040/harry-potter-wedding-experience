/**
 * SortingHatCeremony: Interactive talking Sorting Hat for House placement in RSVP
 */
class SortingHatCeremony {
  constructor() {
    this.hatElem = null;
    this.speechElem = null;
    this.quotes = {
      Gryffindor: "“Where dwell the brave at heart! Their daring, nerve, and chivalry set Gryffindors apart!”",
      Slytherin: "“Or perhaps in Slytherin you'll make your real friends, those cunning folk use any means to achieve their ends!”",
      Ravenclaw: "“Where those of wit and learning will always find their kind!”",
      Hufflepuff: "“Where they are just and loyal, those patient Hufflepuffs are true and unafraid of toil!”"
    };
  }

  init() {
    this.hatElem = document.getElementById('sorting-hat-interactive');
    this.speechElem = document.getElementById('sorting-hat-speech');
    if (!this.hatElem || !this.speechElem) return;

    this.hatElem.addEventListener('click', () => {
      this.deliberate();
    });

    // Listen for house selection updates
    const houseCards = document.querySelectorAll('.house-radio-card');
    houseCards.forEach((card) => {
      card.addEventListener('click', () => {
        const house = card.dataset.house || 'Gryffindor';
        this.speakForHouse(house);
      });
    });
  }

  deliberate() {
    if (window.EnchantedAudio) {
      window.EnchantedAudio.playChime(392.0, 0.6);
    }
    this.speechElem.textContent = "“Hmm... difficult. Very difficult. Plenty of courage, I see. Not a bad mind, either...”";
    this.speechElem.classList.add('visible');

    setTimeout(() => {
      const houses = ['Gryffindor', 'Slytherin', 'Ravenclaw', 'Hufflepuff'];
      const picked = houses[Math.floor(Math.random() * houses.length)];
      this.speakForHouse(picked);
      // Select the corresponding card
      const targetCard = document.querySelector(`.house-radio-card[data-house="${picked}"]`);
      if (targetCard) targetCard.click();
    }, 1800);
  }

  speakForHouse(house) {
    if (this.speechElem && this.quotes[house]) {
      this.speechElem.textContent = `${house.toUpperCase()}! ${this.quotes[house]}`;
      this.speechElem.classList.add('visible');
      if (window.WandFX) {
        const rect = this.hatElem.getBoundingClientRect();
        window.WandFX.burst(rect.left + rect.width / 2, rect.top + rect.height / 2, 25, 'gold');
      }
    }
  }
}

window.SortingHat = new SortingHatCeremony();
