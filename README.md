# ⚡ An Unbreakable Vow | Harry Potter-Themed Interactive Wedding Experience

[![Java 21+](https://img.shields.io/badge/Backend-Java%2021%2B-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)](https://github.com/siya2040/harry-potter-wedding-experience/)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-ffd700?style=for-the-badge&logo=github)](https://siya2040.github.io/harry-potter-wedding-experience/)
[![Mobile First](https://img.shields.io/badge/Design-Mobile--First-7c0a02?style=for-the-badge)](https://siya2040.github.io/harry-potter-wedding-experience/)
[![WebGL](https://img.shields.io/badge/Shaders-WebGL%20Distortion-1b263b?style=for-the-badge&logo=webgl)](https://siya2040.github.io/harry-potter-wedding-experience/)
[![Web Audio API](https://img.shields.io/badge/Audio-Hedwig's%20Theme-2b180d?style=for-the-badge)](https://siya2040.github.io/harry-potter-wedding-experience/)

> A mobile-first, one-page interactive wedding experience created for the UI/UX Design internship assignment.
> 
> Rather than a conventional wedding website with a top navigation bar and static rectangular blocks, this experience unfolds as an enchanted digital story that reacts dynamically to scrolling, swiping, tapping, and pointer movement.

---

## 🌐 Live Experience
Explore the live website directly on any mobile phone or browser:  
👉 **[https://siya2040.github.io/harry-potter-wedding-experience/](https://siya2040.github.io/harry-potter-wedding-experience/)**

*(For desktop review, a top toolbar toggle allows switching between an **iPhone 16 Pro mockup frame** and **Full-Screen Cinematic mode**).*

---

## 🪄 Narrative Acts & Key Interactions

### 1. Act I: Cinematic Prologue & 3D Wax Seal Opening
- **Text Reveal**: As specified in the assignment brief, glowing text fades in: *"You are invited..."*, dissolves into golden stardust, followed by *"...to a magical wedding."*
- **Falling Hogwarts Letters**: 18 envelopes with wax seals tumble through the air with 3D rotation, evoking the iconic Privet Drive chimney flurry.
- **3D Wax Seal**: An owl delivers the sealed parchment envelope. Tapping or dragging the crimson wax seal (`J & S` monogram) shatters the wax with sound and bursting particles, opening the 3D envelope flap and unrolling the gold-trimmed letter for *Lord Julian Vance & Lady Seraphina Sterling*.

### 2. Act II: Marauder's Map (Scroll-Driven Footsteps & Ink Path)
- Headlined with *"I solemnly swear that we are up to no good."*
- Dynamic footsteps (alternating left and right shoe prints) stamp onto the aged parchment background following a winding ink trail as the visitor scrolls down.
- Story milestones reveal the couple's journey: *The Restricted Section*, *Harmonic Silver Patronuses*, and *The Astronomy Tower Vow*, concluding with *"Mischief Managed..."*

### 3. Act III: The Daily Prophet & WebGL Liquid Distortion Gallery
- Inspired by the [Codrops Liquid Distortion Slider](https://tympanus.net/Development/LiquidDistortion/) referenced in the brief.
- Framed in a vintage wizarding newspaper layout with halftone newsprint grain and breathing photo parallax.
- **Liquid Shader Distortion**: Touch swiping or dragging across portraits triggers a fluid WebGL displacement wave morphing between photos.
- **Lumos Secret Message**: Moving your wand (finger/mouse) illuminates the photograph with a glowing wand spotlight, revealing hidden romantic notes written in invisible ink.

### 4. Act IV: The Enchanted Time-Turner & Countdown
- A 3D interactive golden gyroscope with 3 nested rotating rings (Days with Roman numerals, Hours/Minutes, and an inner hourglass with moving sand particles).
- Visitors can drag and tilt the rings in 3D space with celestial chime notes and sparkling dust.
- Displays a live real-time countdown (Days, Hours, Minutes, Seconds).

### 5. Act V: Order of Events (The Hogwarts Feast & Wards)
- An unfolded parchment itinerary map with a glowing gold timeline spine and wax markers.
- Interactive events: *Astronomy Tower Gathering & Elixirs*, *The Unbreakable Vow*, *Great Hall Banquet*, *The Yule Ball*, and *Lumos Maxima Send-Off*.
- Tapping any card smoothly expands secret lore, dress code advice ("Wizarding Formal Robes or Muggle Black Tie"), and seating arrangements.

### 6. Act VI: The Enchanted Quill & Talking Sorting Hat RSVP
- An antique mahogany desk with a hovering gold feather quill that pens text in real-time cursive ink script as you type.
- **Talking Sorting Hat**: Tap the animated Sorting Hat to hear classic deliberation (*"Hmm, difficult... very difficult... plenty of courage, I see..."*) before being placed into Gryffindor, Slytherin, Ravenclaw, or Hufflepuff!
- **Owl Post Dispatch**: Clicking *"Dispatch via Owl Post"* folds the letter into an origami envelope; an owl hoots and flies off into the night sky, revealing a personalized acceptance scroll.

### 7. Act VII: 3D Platform 9 ¾ Ticket & Save the Date
- A golden Snitch flutters across the screen with buzzing wings. Tapping the Snitch casts *Lumos Maxima*, triggering a radiant light burst that illuminates a starry constellation date.
- **3D Platform 9 ¾ Hogwarts Express Ticket**: An interactive embossed golden train ticket customized dynamically with the guest's name from the RSVP form! Tapping flips the ticket to reveal the official Ministry pass and the **"Add to Muggle Calendar (.ics)"** download button.

---

## 🪄 Interactive Wand Spellcaster Dock
A floating spell dock enables visitors to cast 4 iconic spells anytime:
- 🪄 **`Lumos Maxima`**: Radiant white burst of light that illuminates invisible ink secrets.
- 🦌 **`Expecto Patronum`**: Summons a glowing Silver Stag and Swan Patronus leaping across the screen trailing luminescent mist and chords.
- 🔓 **`Alohomora`**: Plays an ancient lock tumbler click and unlocks all secret itinerary drawers.
- 🪶 **`Wingardium Leviosa`**: Puts letters, portraits, and parchments into an anti-gravity floating state.

---

## 🎵 Sound Design with Web Audio API
The experience features a completely procedural, zero-dependency synthesizer (no external MP3 404s or CORS issues!):
- **Hedwig's Theme**: Authentic opening 16-note melody on celesta with bell harmonics.
- **Patronus Chords**: Ethereal multi-octave sweep and choir chime.
- **Hogwarts Express**: Distant steam train whistle.
- **Wax Crack & Crumble**: Organic snap when the wax seal breaks.
- **Quill Pen**: Scratchy whisper when typing in the RSVP field.
- **Owl Post**: Gentle two-tone soothing owl call.

---

## ☕ Java Backend Architecture & Domain Models
In addition to the interactive client-side web experience, this project includes a complete **Java 21+ backend architecture** (`src/main/java/com/hogwarts/wedding/`):

### Core Architecture:
- **`MagicalWeddingServer.java`**: Embedded, zero-dependency HTTP server using `com.sun.net.httpserver.HttpServer` with modern virtual threads.
- **`model/HogwartsHouse.java`**: House enum with colors, mascots, mottos, and character traits.
- **`model/Guest.java`**: Guest domain model encapsulating registration metadata and attendance.
- **`model/TicketPassage.java`**: Platform 9 ¾ ticket generator and coach assignment logic.
- **`model/WeddingTimelineEvent.java`**: Ceremony milestone record model.
- **`service/SortingHatService.java`**: Ceremony deliberator calculating house sorting logic.
- **`service/MaraudersMapPathfinder.java`**: Mathematical waypoint pathfinding engine generating footstep coordinates across the parchment map.
- **`service/OwlPostDispatcher.java`**: Thread-safe message queue simulating flight duration and dragon wax seals.
- **`service/PatronusManifestationService.java`**: Corporeal Patronus generator mapping happiest memories to celestial forms.

### REST APIs:
- `POST /api/rsvp` — Receives guest RSVPs, persists names and house affiliations to a thread-safe registry.
- `GET /api/sorting-hat` — Server-side Sorting Hat logic and wisdom determination.
- `GET /api/countdown` — High-precision server-side temporal calculations using `java.time.Duration`.

---

## 📁 Project Structure

```
harry-potter-wedding-experience/
├── index.html                   # Core semantic markup, SVG definitions, canvas overlays
├── pom.xml                      # Maven project configuration for Java 21+
├── .gitattributes               # Linguist language configuration
├── run_java_server.bat          # 1-Click compiler & runner for Java backend (Port 8080)
├── run_local_server.bat         # 1-Click local server runner (Port 8000)
├── css/
│   ├── main.css                 # Theme variables, typography, floating candles
│   ├── envelope.css             # 3D folding envelope & wax seal shatter
│   ├── marauder.css             # Aged parchment map, ink trails & footsteps
│   ├── gallery.css              # Daily Prophet newsprint & living portrait frames
│   ├── timeturner.css           # 3D spinning concentric rings countdown
│   ├── timeline.css             # Unfolded parchment folding map for order of events
│   ├── rsvp.css                 # Quill desk, house crests & owl fly-off animation
│   ├── savedate.css             # Snitch hovering & starry constellation reveal
│   ├── spells.css               # Wand spellcaster dock, patronus & letter cascade
│   └── ticket.css               # 3D Platform 9 ¾ embossed golden ticket
├── js/
│   ├── app.js                   # Application coordinator & live sync
│   ├── audio.js                 # Web Audio API synthesizer (Hedwig's Theme)
│   ├── wand-particles.js        # 60 FPS Canvas particle engine for sparks & embers
│   ├── spells.js                # Interactive spell controller (Lumos, Patronus, etc.)
│   ├── sorting-hat.js           # Talking Sorting Hat ceremony logic
│   ├── envelope.js              # Wax seal break & invitation reveal
│   ├── marauders-map.js         # Scroll-driven footstep placement along SVG paths
│   ├── liquid-distortion.js     # WebGL displacement ripple shader for portraits
│   ├── time-turner.js           # 3D interactive spinning countdown timer
│   ├── rsvp.js                  # Interactive quill typing & owl post dispatch
│   └── save-date.js             # Snitch animation & .ics calendar file generator
└── src/main/java/com/hogwarts/wedding/
    ├── MagicalWeddingServer.java # Java HTTP & REST API server
    ├── model/
    │   ├── Guest.java
    │   ├── HogwartsHouse.java
    │   ├── TicketPassage.java
    │   └── WeddingTimelineEvent.java
    └── service/
        ├── MaraudersMapPathfinder.java
        ├── OwlPostDispatcher.java
        ├── PatronusManifestationService.java
        └── SortingHatService.java
```

---

## 💻 How to Run Locally

### Option 1: Java Backend Server (Recommended for Java Developers)
- **Windows**: Double-click `run_java_server.bat`
- **Command Line**:
  ```bash
  javac -d bin src/main/java/com/hogwarts/wedding/MagicalWeddingServer.java
  java -cp bin com.hogwarts.wedding.MagicalWeddingServer
  ```
  Then visit `http://localhost:8080/`.

### Option 2: Lightweight Local Server
- **Windows**: Double-click `run_local_server.bat`
- **Command Line**: `py -m http.server 8000` or `npx serve`
  Then visit `http://localhost:8000/`.

### Option 3: Direct Browser Open
Double-click `index.html` to open it directly in Chrome, Edge, Safari, or Firefox!

---

## 👩‍💻 Author
**Siya Chauhan**
- GitHub: [@siya2040](https://github.com/siya2040)
- Repository: [harry-potter-wedding-experience](https://github.com/siya2040/harry-potter-wedding-experience)