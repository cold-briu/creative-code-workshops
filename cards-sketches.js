// Preview sketches for the "What you'll learn" cards
(function initPreviewSketches() {
    const containers = document.querySelectorAll('.preview-sketch');

    // Shared helper for touch/mouse coordinates
    const getTapPoint = (p) => {
        if (p.touches && p.touches.length > 0) {
            return { x: p.touches[0].x, y: p.touches[0].y };
        }
        return { x: p.mouseX, y: p.mouseY };
    };

    // Shared canvas setup — creates a canvas sized to the container
    const setupCanvas = (p, frameRate = 60) => {
        const container = p.canvas.parentElement;
        p.createCanvas(container.offsetWidth, container.offsetHeight);
        p.pixelDensity(1);
        p.frameRate(frameRate);
    };

    // Shared window-resize handler — resizes canvas to fit its container
    const makeResizeHandler = (p, onResize) => () => {
        const container = p.canvas.parentElement;
        p.resizeCanvas(container.offsetWidth, container.offsetHeight);
        if (onResize) onResize();
    };

    // Bouncy Circle Sketch (Card 1)
    const bouncySketch = (p) => {
        let gravity, bounce, radius, circleColor, y, vy;
        p.started = false;

        p.setup = () => {
            setupCanvas(p, 60);
            gravity = 0.6;
            bounce = -0.75;
            radius = 20;
            circleColor = p.color(49, 36, 178);
            // Initial position: Bottom of the sketch
            y = p.height - 10 - radius;
            vy = 0;
            p.noLoop(); // Stay static until first touch
        };

        function kickBall() {
            vy = -11; // Weaker upward impulse (set, not added)
            circleColor = p.color(p.random(100, 200), p.random(50, 150), p.random(200, 255));
        }

        p.draw = () => {
            p.background(250, 252, 255, 150);

            // Draw floor line
            p.stroke(220);
            p.line(0, p.height - 10, p.width, p.height - 10);

            // Update physics only if simulation has started
            if (p.started) {
                vy += gravity;
                y += vy;

                // Ceiling collision (upper boundary)
                if (y - radius < 0) {
                    y = radius;
                    vy *= -0.3; // Slight bounce off ceiling
                }

                // Collision with floor
                if (y + radius > p.height - 10) {
                    y = p.height - 10 - radius;
                    vy *= bounce;

                    // Stop when velocity is very low
                    if (p.abs(vy) < 1) vy = 0;
                }
            }

            // Draw ball
            p.noStroke();
            p.fill(circleColor);
            p.ellipse(p.width / 2, y, radius * 2);
        };

        const handleInteraction = () => {
            const { x, y: tapY } = getTapPoint(p);
            const ballX = p.width / 2;
            const d = p.dist(x, tapY, ballX, y);

            // If tapped on the ball, kick it and block scroll
            if (d < radius * 2.5) {
                if (!p.started) {
                    p.started = true;
                    p.loop();
                }
                kickBall();
                return false; // Prevent scrolling only when interacting with the ball
            }

            // Tapped canvas but missed ball — start animation, allow scroll
            if (!p.started) {
                p.started = true;
                p.loop();
            }
        };

        p.mousePressed = handleInteraction;
        p.touchStarted = handleInteraction;

        p.windowResized = makeResizeHandler(p, () => {
            // Keep ball pinned to the floor until the user interacts
            if (!p.started) y = p.height - 10 - radius;
        });
    };

    // Audio Player Sketch (Card 2) - Loads audio.ogg only on user interaction
    const audioSketch = (p) => {
        p.started = true;
        let sound, amplitude, fft, playing = false, loading = false;
        let buttonSize = 50;

        p.setup = () => { setupCanvas(p, 30); };

        p.draw = () => {
            p.background(250, 252, 255);
            const cx = p.width / 2;
            const cy = p.height / 2;

            // Dynamic Organic Waveform
            if (playing && sound && sound.isLoaded() && amplitude && fft) {
                const waveform = fft.waveform();
                const level = amplitude.getLevel();

                p.noFill();
                p.strokeWeight(1.5);
                p.stroke(255, 0, 255, 150);

                p.beginShape();
                for (let i = 0; i < waveform.length; i += 8) {
                    let angle = p.map(i, 0, waveform.length, 0, p.TWO_PI);
                    let r = (50 + level * 40) + waveform[i] * 35;
                    let x = cx + r * p.cos(angle);
                    let y = cy + r * p.sin(angle);
                    p.curveVertex(x, y);
                }
                p.endShape(p.CLOSE);

                // Subtle background pulse
                p.stroke(255, 0, 255, 60);
                p.circle(cx, cy, 110 + level * 80);
            }

            // Button hover effect (mouse only; touch doesn't update mouseX/mouseY mid-draw)
            const d = p.dist(p.mouseX, p.mouseY, cx, cy);
            const hover = d < buttonSize / 2;

            p.noStroke();
            p.fill(49, 36, 178, hover ? 255 : 230);
            p.circle(cx, cy, buttonSize);

            // Draw icon (Loading, Play, or Pause)
            p.fill(255);
            if (loading) {
                // Spinner
                p.push();
                p.translate(cx, cy);
                p.rotate(p.frameCount * 0.1);
                p.stroke(255);
                p.strokeWeight(3);
                p.noFill();
                p.arc(0, 0, 20, 20, 0, p.HALF_PI);
                p.pop();
            } else if (playing) {
                // Pause Icon
                p.rect(cx - 7, cy - 10, 4, 20, 2);
                p.rect(cx + 3, cy - 10, 4, 20, 2);
            } else {
                // Play Icon
                p.triangle(cx - 5, cy - 10, cx - 5, cy + 10, cx + 10, cy);
            }
        };

        // Track whether the AudioContext has been unlocked by a user gesture
        let audioUnlocked = false;
        let isUnlocking = false;

        /**
         * Unlock the Web Audio API AudioContext — browsers require this to happen
         * inside a direct user-gesture handler.
         */
        const unlockAudioContext = () => {
            if (audioUnlocked || isUnlocking) return;
            isUnlocking = true;

            const ctx = typeof getAudioContext === 'function' ? getAudioContext() : null;
            const resume = ctx && ctx.state !== 'running' ? ctx.resume() : Promise.resolve();
            const p5start = typeof p.userStartAudio === 'function' ? p.userStartAudio() : Promise.resolve();

            Promise.all([resume, p5start])
                .then(() => {
                    audioUnlocked = true;
                    isUnlocking = false;
                })
                .catch(err => {
                    console.warn("AudioContext unlock failed:", err);
                    isUnlocking = false;
                });
        };

        const loadAndPlaySound = () => {
            if (loading) return;
            loading = true;

            if (typeof p.loadSound === 'function') {
                sound = p.loadSound('lib/audio.mp3',
                    () => {
                        amplitude = new p5.Amplitude();
                        fft = new p5.FFT(0.8);
                        loading = false;
                        sound.onended(() => { playing = false; });
                        togglePlay();
                    },
                    (err) => {
                        console.error("Failed to load audio:", err);
                        loading = false;
                        sound = null;
                    }
                );
            } else {
                console.error("p5.sound library not found");
                loading = false;
            }
        };

        const handleInteraction = () => {
            // This function runs synchronously inside a user-gesture event, so
            // unlocking the AudioContext here satisfies the browser's autoplay policy.
            unlockAudioContext();

            const cx = p.width / 2;
            const cy = p.height / 2;
            const { x, y } = getTapPoint(p);
            const d = p.dist(x, y, cx, cy);

            if (d < buttonSize * 0.8) { // Generous hit area for mobile
                if (loading) return false;

                if (!sound || !sound.isLoaded()) {
                    loadAndPlaySound();
                } else {
                    togglePlay();
                }
                return false; // Prevent page scroll on touch
            }
        };

        p.mousePressed = handleInteraction;
        p.touchStarted = handleInteraction;

        function togglePlay() {
            if (!sound || !sound.isLoaded()) return;

            if (sound.isPlaying()) {
                sound.pause();
                playing = false;
            } else {
                sound.play();
                playing = true;
            }
        }

        p.windowResized = makeResizeHandler(p);
    };

    // LED Sketch (Card 3) - Simple simulation of an interactive electronic component
    const ledSketch = (p) => {
        p.started = true;
        let ledColor;
        let blinkStartTime;
        const blinkDuration = 500;
        const palette = [
            [0, 255, 255],   // Cyan
            [255, 0, 255],   // Magenta
            [255, 255, 0],   // Yellow
            [0, 0, 255],     // Blue
            [0, 255, 0],     // Green
            [255, 0, 0]      // Red
        ];

        p.setup = () => {
            setupCanvas(p, 30);
            blinkStartTime = p.millis();
            ledColor = p.color(255, 0, 255); // initial Magenta
        };

        // Called by the IntersectionObserver each time the card enters view
        p.resetBlink = () => { blinkStartTime = p.millis(); };

        p.draw = () => {
            p.background(250, 252, 255);
            const cx = p.width / 2;
            const cy = p.height / 2 + 10;
            const elapsed = p.millis() - blinkStartTime;

            // Logic: Blink for 0.5 seconds, then stay off
            // Using elapsed for the phase ensures it starts 'on' and blinks fast immediately on click
            const isOn = (elapsed < blinkDuration) ? (p.sin(elapsed * 0.04) > 0) : false;

            p.push();
            p.translate(cx, cy);

            // LED Legs
            p.stroke(200);
            p.strokeWeight(2);
            p.line(-4, 0, -4, 30);
            p.line(4, 0, 4, 35);

            // LED Glow effect
            if (isOn) {
                p.noStroke();
                for (let r = 0; r < 12; r++) {
                    let alpha = p.map(r, 0, 12, 35, 0);
                    p.fill(p.red(ledColor), p.green(ledColor), p.blue(ledColor), alpha);
                    p.ellipse(0, -15, 25 + r * 6, 30 + r * 6);
                }
            }

            // LED Body
            p.noStroke();
            let bodyAlpha = isOn ? 255 : 80; // Dimmer when off
            p.fill(p.red(ledColor), p.green(ledColor), p.blue(ledColor), bodyAlpha);
            p.rect(-10, -5, 20, 5, 1); // plastic ring base
            p.arc(0, -5, 20, 32, p.PI, p.TWO_PI); // Dome top

            // Material highlight
            p.fill(255, 150);
            p.ellipse(-4, -13, 3, 6);

            p.pop();
        };

        const handleInteraction = () => {
            const { x, y: tapY } = getTapPoint(p);
            const cx = p.width / 2;
            const cy = p.height / 2 + 10;
            const d = p.dist(x, tapY, cx, cy - 15); // Hit area around the LED dome

            if (d < 45) { // Interactive area for the LED
                blinkStartTime = p.millis();
                const c = p.random(palette);
                ledColor = p.color(c[0], c[1], c[2]);
                return false; // Prevent scrolling only when interacting with the LED
            }
        };

        p.mousePressed = handleInteraction;
        p.touchStarted = handleInteraction;

        p.windowResized = makeResizeHandler(p);
    };

    // Initialize specific sketches by ID
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const instance = entry.target._p5_instance;
            if (instance) {
                if (entry.isIntersecting) {
                    // Only start looping if the sketch has been activated
                    // (or doesn't use the p.started pattern)
                    if (instance.started !== false) {
                        instance.loop();
                    }
                    // Reset LED blink so it plays fresh each time the card enters view
                    if (typeof instance.resetBlink === 'function') {
                        instance.resetBlink();
                    }
                } else {
                    instance.noLoop();
                }
            }
        });
    }, { threshold: 0.1 });

    containers.forEach(container => {
        let instance;
        if (container.id === 'sketch-1') {
            instance = new p5(bouncySketch, container);
        } else if (container.id === 'sketch-2') {
            instance = new p5(audioSketch, container);
        } else if (container.id === 'sketch-3') {
            instance = new p5(ledSketch, container);
        }
        if (instance) {
            container._p5_instance = instance;
            observer.observe(container);
        }
    });
})();
