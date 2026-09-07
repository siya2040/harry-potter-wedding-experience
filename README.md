# An Unbreakable Vow: Harry Potter-Inspired Interactive Wedding Experience

A mobile-first, one-page interactive digital story created for the Design Internship assignment.

Rather than a conventional wedding site with a top navigation bar and static rectangular blocks, this experience unfolds as an enchanted journey through the wizarding world—blending authentic Harry Potter lore, 3D animations, scroll-driven interactions, and procedural sound design.

---

## 🧙‍♂️ Experience Overview & Narrative Acts

1. **Act I: The Owl Delivery & 3D Wax Seal Opening**
   - Starry night sky with drifting castle clouds and floating Hogwarts candles.
   - An owl swoops into view delivering the sealed parchment invitation.
   - **Micro-Interaction**: Tap or drag the 3D crimson wax seal (`J & S` monogram) to break it with bursting wax particles and sound. The envelope flap rotates in 3D, and the gold-trimmed letter unrolls to reveal the couple (*Lord Julian Vance & Lady Seraphina Sterling*).

2. **Act II: Marauder's Map Journey (Scroll-Driven Footsteps & Ink Path)**
   - *"I solemnly swear that we are up to no good."*
   - As the visitor scrolls down, alternating footsteps (left and right shoe prints) stamp onto the aged parchment background following a winding ink trail.
   - Story milestones reveal the couple's history: *The Restricted Section*, *The Silver Patronuses*, and *The Astronomy Tower Vow*.
   - Concludes with *"Mischief Managed..."* as the parchment transitions.

3. **Act III: The Daily Prophet & WebGL Liquid Distortion Gallery**
   - Inspired by the [Codrops Liquid Distortion Slider](https://tympanus.net/Development/LiquidDistortion/).
   - Framed within a vintage wizarding newspaper edition with halftone grain and living photo shimmer.
   - **Interactive WebGL Shader**: Swiping or dragging left/right ripples the portrait with fluid liquid displacement distortion.
   - **Lumos Secret Message**: Moving your wand (finger/mouse) across the portrait illuminates it with a wand spotlight, revealing secret romantic notes in glowing invisible ink.

4. **Act IV: The Enchanted Time-Turner & Astronomical Countdown**
   - 3D interactive gyroscope with concentric spinning golden rings and a miniature hourglass with flowing sand.
   - Users can drag and tilt the rings in 3D space, triggering celestial chime tones and golden sparks.
   - Real-time countdown tracking Days, Hours, Minutes, and Seconds until the wedding.

5. **Act V: Order of Events (The Feast & Ceremony Itinerary)**
   - Designed as a foldout parchment map with a glowing gold timeline spine and wax markers.
   - Interactive events: *Astronomy Tower Gathering & Elixirs*, *The Unbreakable Vow*, *Great Hall Banquet*, *The Yule Ball*, and *Lumos Send-Off*.
   - Tapping any card smoothly expands secret lore, dress code advice, and seating arrangements.

6. **Act VI: The Enchanted Quill & Owl Post RSVP**
   - An antique mahogany desk with a hovering feather quill.
   - As the guest types their name, the quill scratches across the paper in real-time cursive ink script.
   - Interactive house sorting badges (Gryffindor, Slytherin, Ravenclaw, Hufflepuff) with house feast selections.
   - **"Dispatch via Owl Post"**: The parchment folds into an origami envelope, an owl hoots and takes flight into the stars, and a personalized confirmation scroll appears.

7. **Act VII: Cinematic "Lumos Maxima" Finale & Save the Date**
   - A golden Snitch flutters across the screen with buzzing metallic wings.
   - Tapping the Snitch casts *Lumos Maxima*, triggering a radiant light burst and illuminating a starlit constellation that spells out the date.
   - **Muggle Calendar Integration**: Click *"Add to Muggle Calendar"* to automatically generate and download an `.ics` calendar invite compatible with Google Calendar, Apple Calendar, and Outlook.
   - *"Replay Magical Journey"* smoothly scrolls back to the beginning for another pass.

---

## 🎨 Design & Technical Highlights

- **Mobile-First Execution**: Designed specifically around touch ergonomic targets, swipe gestures, and fluid viewport heights (`clamp()`).
- **Evaluator Showcase Mode**: A top toolbar allows evaluators on desktop to toggle between an **iPhone 16 Pro mockup frame** (with realistic bezels, dynamic island, and glass reflections) and **Full-Screen Cinematic Mode**.
- **Wand Particle Engine**: Custom 60 FPS HTML5 Canvas particle system trailing golden sparks, star dust, and floating embers behind every finger touch or cursor move.
- **Procedural Web Audio API**: Completely self-contained sound synthesizer that creates wand swooshes, crystalline music box melodies, wax cracking snaps, quill pen scratches, and owl hoots with zero external audio assets that could fail to load.
- **Zero Build Dependencies**: Pure modern HTML5, CSS3, WebGL, and ES6 JavaScript that runs instantly in any browser without needing `npm install` or complex build steps.

---

## 🚀 How to Run

### Method 1: Double-Click Batch File (Windows)
Double-click `run_local_server.bat` in this folder. It will start a local HTTP server at `http://localhost:8000/` and open your browser automatically.

### Method 2: Python Command Line
```bash
cd C:\Users\siyac\.gemini\antigravity\scratch\magical-wedding-invitation
py -m http.server 8000
```
Then visit `http://localhost:8000/` in your browser.

### Method 3: Direct File Opening
You can also open `index.html` directly in Google Chrome, Microsoft Edge, Safari, or Firefox!
