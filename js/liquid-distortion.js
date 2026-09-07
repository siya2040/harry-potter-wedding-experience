/**
 * LiquidDistortionSlider: WebGL displacement shader slider inspired by Codrops Liquid Distortion
 * Features fluid watery transitions between magical portraits, swipe gestures, and Lumos secret messages.
 */
class LiquidDistortionSlider {
  constructor() {
    this.canvas = null;
    this.gl = null;
    this.program = null;
    this.textures = [];
    this.currentIndex = 0;
    this.nextIndex = 1;
    this.transitionProgress = 0;
    this.isTransitioning = false;
    this.displacementIntensity = 0;
    this.touchStartX = 0;
    this.touchDiff = 0;
    this.isDragging = false;

    // Portrait gallery metadata
    this.slides = [
      {
        title: "The Restricted Section",
        lore: "Midnight study sessions among levitating grimoires.",
        secret: "“Where two wandering sparks first caught fire.”",
        colorA: "#2b1c3d", colorB: "#ffcc66", accent: "#d4af37"
      },
      {
        title: "The Silver Patronuses",
        lore: "An ethereal stag and graceful swan dancing across the Black Lake.",
        secret: "“Expecto Patronum — you are my happiest memory.”",
        colorA: "#0b2545", colorB: "#8da9c4", accent: "#94d2bd"
      },
      {
        title: "The Astronomy Tower",
        lore: "A golden vow whispered under the alignment of Orion and Venus.",
        secret: "“Until the very end. Always.”",
        colorA: "#3d131a", colorB: "#f4a261", accent: "#ffd700"
      },
      {
        title: "The Great Hall Banquet",
        lore: "Floating candles and enchanted ceilings anticipating our celebration.",
        secret: "“May our table be full and our magic forever unbroken.”",
        colorA: "#1b4332", colorB: "#d8f3dc", accent: "#52b788"
      }
    ];
  }

  init() {
    this.canvas = document.getElementById('distortion-canvas');
    if (!this.canvas) return;

    this.initWebGL();
    this.createProceduralPortraits();
    this.bindEvents();
    this.updateCaption();
    this.render();
  }

  initWebGL() {
    const gl = this.canvas.getContext('webgl') || this.canvas.getContext('experimental-webgl');
    if (!gl) {
      console.warn('WebGL not supported, falling back to Canvas 2D');
      this.initCanvasFallback();
      return;
    }
    this.gl = gl;

    // Resize canvas resolution
    const rect = this.canvas.parentElement.getBoundingClientRect();
    this.canvas.width = (rect.width || 380) * 1.5;
    this.canvas.height = (rect.height || 450) * 1.5;
    gl.viewport(0, 0, this.canvas.width, this.canvas.height);

    // Vertex shader
    const vsSource = `
      attribute vec2 a_position;
      attribute vec2 a_texCoord;
      varying vec2 v_texCoord;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
        v_texCoord = a_texCoord;
      }
    `;

    // Liquid ripple displacement fragment shader
    const fsSource = `
      precision mediump float;
      varying vec2 v_texCoord;
      uniform sampler2D u_textureCurrent;
      uniform sampler2D u_textureNext;
      uniform float u_progress;
      uniform float u_intensity;
      uniform float u_time;

      void main() {
        vec2 uv = v_texCoord;
        
        // Fluid wave disturbance
        float wave = sin(uv.y * 18.0 + u_time * 3.0) * 0.03 * u_intensity;
        float wave2 = cos(uv.x * 22.0 + u_time * 2.5) * 0.02 * u_intensity;
        
        vec2 distortedUV1 = uv + vec2(wave + u_progress * 0.08 * u_intensity, wave2);
        vec2 distortedUV2 = uv - vec2(wave + (1.0 - u_progress) * 0.08 * u_intensity, wave2);

        vec4 col1 = texture2D(u_textureCurrent, clamp(distortedUV1, 0.0, 1.0));
        vec4 col2 = texture2D(u_textureNext, clamp(distortedUV2, 0.0, 1.0));

        // Smooth liquid blend with chromatic magical fringing
        vec4 finalColor = mix(col1, col2, u_progress);
        
        // Golden liquid shimmer along ripple crests
        float shimmer = abs(sin(uv.y * 25.0 + u_time * 4.0)) * u_intensity * 0.18;
        finalColor.rgb += vec3(0.9, 0.75, 0.3) * shimmer;

        gl_FragColor = finalColor;
      }
    `;

    const program = this.createShaderProgram(gl, vsSource, fsSource);
    if (!program) return;
    this.program = program;
    gl.useProgram(program);

    // Position and UV buffer
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1,  0, 1,
       1, -1,  1, 1,
      -1,  1,  0, 0,
      -1,  1,  0, 0,
       1, -1,  1, 1,
       1,  1,  1, 0,
    ]), gl.STATIC_DRAW);

    const aPosition = gl.getAttribLocation(program, 'a_position');
    const aTexCoord = gl.getAttribLocation(program, 'a_texCoord');

    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 16, 0);

    gl.enableVertexAttribArray(aTexCoord);
    gl.vertexAttribPointer(aTexCoord, 2, gl.FLOAT, false, 16, 8);

    this.uProgress = gl.getUniformLocation(program, 'u_progress');
    this.uIntensity = gl.getUniformLocation(program, 'u_intensity');
    this.uTime = gl.getUniformLocation(program, 'u_time');
    this.uTexCurrent = gl.getUniformLocation(program, 'u_textureCurrent');
    this.uTexNext = gl.getUniformLocation(program, 'u_textureNext');
  }

  createShaderProgram(gl, vsSource, fsSource) {
    const vs = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vs, vsSource);
    gl.compileShader(vs);

    const fs = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fs, fsSource);
    gl.compileShader(fs);

    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    return program;
  }

  // Generate high-resolution authentic wizarding living portraits procedurally
  createProceduralPortraits() {
    this.slides.forEach((slide, index) => {
      const offCanvas = document.createElement('canvas');
      offCanvas.width = 600;
      offCanvas.height = 750;
      const ctx = offCanvas.getContext('2d');

      // Atmospheric gradient background
      const grad = ctx.createRadialGradient(300, 320, 50, 300, 375, 450);
      grad.addColorStop(0, slide.colorB);
      grad.addColorStop(0.6, slide.colorA);
      grad.addColorStop(1, '#05060a');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 600, 750);

      // Gothic architectural arches and stained glass pattern
      ctx.strokeStyle = slide.accent;
      ctx.lineWidth = 4;
      ctx.strokeRect(30, 30, 540, 690);
      ctx.lineWidth = 1.5;
      ctx.strokeRect(45, 45, 510, 660);

      // Pointed Gothic arch
      ctx.beginPath();
      ctx.moveTo(80, 400);
      ctx.lineTo(80, 250);
      ctx.quadraticCurveTo(300, 50, 520, 250);
      ctx.lineTo(520, 400);
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.45)';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Stylized silhouette of the couple in wizarding attire
      ctx.fillStyle = '#08080f';
      // Groom silhouette
      ctx.beginPath();
      ctx.ellipse(240, 380, 45, 120, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(240, 260, 30, 0, Math.PI * 2);
      ctx.fill();

      // Bride silhouette with flowing veil/dress
      ctx.beginPath();
      ctx.ellipse(350, 400, 55, 130, -0.05, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(350, 265, 28, 0, Math.PI * 2);
      ctx.fill();

      // Golden magical aura & sparks
      for (let s = 0; s < 45; s++) {
        const sx = 60 + Math.random() * 480;
        const sy = 80 + Math.random() * 550;
        const sr = 1.5 + Math.random() * 3;
        ctx.fillStyle = slide.accent;
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#ffd700';
        ctx.beginPath();
        ctx.arc(sx, sy, sr, 0, Math.PI * 2);
        ctx.fill();
      }

      // Title banner at bottom of portrait
      ctx.shadowBlur = 0;
      ctx.fillStyle = 'rgba(12, 14, 24, 0.85)';
      ctx.fillRect(50, 610, 500, 75);
      ctx.strokeStyle = '#c4ab7a';
      ctx.lineWidth = 2;
      ctx.strokeRect(50, 610, 500, 75);

      ctx.fillStyle = '#fceec5';
      ctx.font = 'bold 30px Cinzel, Georgia, serif';
      ctx.textAlign = 'center';
      ctx.fillText(slide.title, 300, 655);

      if (this.gl) {
        const gl = this.gl;
        const tex = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, offCanvas);
        this.textures.push(tex);
      } else {
        this.textures.push(offCanvas);
      }
    });
  }

  bindEvents() {
    const prevBtn = document.getElementById('btn-gallery-prev');
    const nextBtn = document.getElementById('btn-gallery-next');
    const viewport = document.querySelector('.distortion-viewport');

    if (prevBtn) prevBtn.addEventListener('click', () => this.navigate(-1));
    if (nextBtn) nextBtn.addEventListener('click', () => this.navigate(1));

    // Touch swipe gestures
    if (viewport) {
      viewport.addEventListener('touchstart', (e) => {
        if (e.touches.length > 0) {
          this.touchStartX = e.touches[0].clientX;
          this.isDragging = true;
        }
      }, { passive: true });

      viewport.addEventListener('touchmove', (e) => {
        if (!this.isDragging || e.touches.length === 0) return;
        this.touchDiff = e.touches[0].clientX - this.touchStartX;
        this.displacementIntensity = Math.min(1.5, Math.abs(this.touchDiff) / 80);
      }, { passive: true });

      viewport.addEventListener('touchend', () => {
        if (!this.isDragging) return;
        this.isDragging = false;
        if (this.touchDiff < -40) {
          this.navigate(1);
        } else if (this.touchDiff > 40) {
          this.navigate(-1);
        }
        this.touchDiff = 0;
      });

      // Lumos Wand Inspection (reveals invisible ink)
      const lumosLayer = document.querySelector('.lumos-secret-reveal');
      const handleLumos = (x, y) => {
        const rect = viewport.getBoundingClientRect();
        const px = ((x - rect.left) / rect.width) * 100;
        const py = ((y - rect.top) / rect.height) * 100;
        viewport.style.setProperty('--lumos-x', `${px}%`);
        viewport.style.setProperty('--lumos-y', `${py}%`);
        if (lumosLayer) lumosLayer.classList.add('revealed');
      };

      viewport.addEventListener('mousemove', (e) => handleLumos(e.clientX, e.clientY));
      viewport.addEventListener('mouseleave', () => {
        if (lumosLayer) lumosLayer.classList.remove('revealed');
      });
    }
  }

  navigate(direction) {
    if (this.isTransitioning) return;
    this.isTransitioning = true;
    this.nextIndex = (this.currentIndex + direction + this.slides.length) % this.slides.length;

    if (window.EnchantedAudio) {
      window.EnchantedAudio.playWandWhoosh();
    }

    const startTime = performance.now();
    const duration = 850; // ms for liquid wave morph

    const animateTransition = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(1, elapsed / duration);
      
      // Smooth sinusoidal cubic easing
      this.transitionProgress = 0.5 - 0.5 * Math.cos(progress * Math.PI);
      this.displacementIntensity = Math.sin(progress * Math.PI) * 1.8;

      if (progress < 1) {
        requestAnimationFrame(animateTransition);
      } else {
        this.currentIndex = this.nextIndex;
        this.transitionProgress = 0;
        this.displacementIntensity = 0;
        this.isTransitioning = false;
        this.updateCaption();
      }
    };

    requestAnimationFrame(animateTransition);
  }

  updateCaption() {
    const slide = this.slides[this.currentIndex];
    const titleEl = document.querySelector('.caption-photo-title');
    const loreEl = document.querySelector('.caption-photo-lore');
    const secretEl = document.querySelector('.lumos-secret-text');

    if (titleEl) titleEl.textContent = slide.title;
    if (loreEl) loreEl.textContent = slide.lore;
    if (secretEl) secretEl.textContent = slide.secret;
  }

  render() {
    if (!this.gl || !this.program || this.textures.length === 0) return;

    const gl = this.gl;
    gl.useProgram(this.program);

    gl.uniform1f(this.uProgress, this.transitionProgress);
    gl.uniform1f(this.uIntensity, this.displacementIntensity + (this.isDragging ? 0.3 : 0));
    gl.uniform1f(this.uTime, performance.now() * 0.001);

    // Bind current texture to unit 0
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.textures[this.currentIndex]);
    gl.uniform1i(this.uTexCurrent, 0);

    // Bind next texture to unit 1
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, this.textures[this.nextIndex]);
    gl.uniform1i(this.uTexNext, 1);

    gl.drawArrays(gl.TRIANGLES, 0, 6);

    requestAnimationFrame(() => this.render());
  }

  initCanvasFallback() {
    // Graceful 2D canvas fallback if WebGL is disabled
    const ctx = this.canvas.getContext('2d');
    const draw = () => {
      if (this.textures[this.currentIndex]) {
        ctx.drawImage(this.textures[this.currentIndex], 0, 0, this.canvas.width, this.canvas.height);
      }
      requestAnimationFrame(draw);
    };
    draw();
  }
}

window.LiquidDistortion = new LiquidDistortionSlider();
