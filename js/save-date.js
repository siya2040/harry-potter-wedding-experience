/**
 * SaveTheDateExperience: Lumos Maxima light burst, Snitch animation, and .ics calendar generation
 */
class SaveTheDateExperience {
  constructor() {
    this.snitchBox = null;
    this.burstOverlay = null;
    this.addCalendarBtn = null;
    this.shareDecreeBtn = null;
    this.replayBtn = null;
  }

  init() {
    this.snitchBox = document.querySelector('.snitch-interactive-box');
    this.burstOverlay = document.querySelector('.lumos-burst-overlay');
    this.addCalendarBtn = document.getElementById('btn-add-calendar');
    this.shareDecreeBtn = document.getElementById('btn-share-decree');
    this.replayBtn = document.getElementById('btn-replay-journey');

    this.bindSnitchInteraction();
    this.bindCalendarDownload();
    this.bindReplay();
  }

  bindSnitchInteraction() {
    if (!this.snitchBox) return;

    this.snitchBox.addEventListener('click', (e) => {
      this.castLumosMaxima();
    });
  }

  castLumosMaxima() {
    if (window.EnchantedAudio) {
      window.EnchantedAudio.playWandWhoosh();
      setTimeout(() => window.EnchantedAudio.playChime(783.99, 1.2), 200);
    }

    if (this.burstOverlay) {
      this.burstOverlay.classList.remove('burst');
      // trigger reflow
      void this.burstOverlay.offsetWidth;
      this.burstOverlay.classList.add('burst');
    }

    if (window.WandFX) {
      window.WandFX.burst(window.innerWidth / 2, window.innerHeight / 2, 70, 'cosmic');
    }
  }

  bindCalendarDownload() {
    if (!this.addCalendarBtn) return;

    this.addCalendarBtn.addEventListener('click', () => {
      if (window.EnchantedAudio) {
        window.EnchantedAudio.playChime(587.33, 0.5);
      }

      // Generate authentic .ics calendar payload
      const icsContent = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//The Daily Prophet//Enchanted Wedding Invitation//EN",
        "CALSCALE:GREGORIAN",
        "METHOD:PUBLISH",
        "BEGIN:VEVENT",
        "UID:magical-wedding-julian-seraphina-2026@hogwarts.magic",
        "DTSTAMP:20260907T100000Z",
        "DTSTART:20261031T160000",
        "DTEND:20261101T010000",
        "SUMMARY:Wedding of Julian Vance & Seraphina Sterling (Unbreakable Vow)",
        "DESCRIPTION:Witness the sacred union of Julian Vance and Seraphina Sterling.\\n\\nSchedule:\\n4:00 PM - Astronomy Tower Gathering\\n5:30 PM - The Unbreakable Vow\\n7:00 PM - Great Hall Feast\\n9:00 PM - Yule Ball Celebration\\n\\nDress Code: Wizarding Formal Robes or Muggle Black Tie.",
        "LOCATION:The Astronomy Tower & Great Hall, Hogwarts Castle",
        "STATUS:CONFIRMED",
        "SEQUENCE:0",
        "BEGIN:VALARM",
        "TRIGGER:-P1D",
        "ACTION:DISPLAY",
        "DESCRIPTION:Reminder: Julian & Seraphina's Magical Wedding Tomorrow!",
        "END:VALARM",
        "END:VEVENT",
        "END:VCALENDAR"
      ].join("\r\n");

      const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'Julian_and_Seraphina_Magical_Wedding.ics';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      if (window.WandFX) {
        window.WandFX.burst(window.innerWidth / 2, window.innerHeight * 0.8, 30, 'gold');
      }
    });

    if (this.shareDecreeBtn) {
      this.shareDecreeBtn.addEventListener('click', () => {
        if (navigator.share) {
          navigator.share({
            title: "Julian & Seraphina's Magical Wedding",
            text: "You are cordially invited to witness an Unbreakable Vow under the stars.",
            url: window.location.href
          }).catch(() => {});
        } else {
          // Copy link to clipboard
          navigator.clipboard.writeText(window.location.href);
          const origText = this.shareDecreeBtn.textContent;
          this.shareDecreeBtn.textContent = "✦ Magical Link Copied! ✦";
          setTimeout(() => {
            this.shareDecreeBtn.textContent = origText;
          }, 2500);
        }
      });
    }
  }

  bindReplay() {
    if (!this.replayBtn) return;

    this.replayBtn.addEventListener('click', () => {
      const scrollTarget = document.getElementById('app-container');
      if (scrollTarget && scrollTarget.scrollHeight > scrollTarget.clientHeight) {
        scrollTarget.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }

      if (window.EnchantedAudio) {
        window.EnchantedAudio.playWandWhoosh();
      }
    });
  }
}

window.SaveTheDate = new SaveTheDateExperience();
