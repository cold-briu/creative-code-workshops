// Preview sketches for the "What you'll learn" cards
(function initPreviewSketches() {
    const containers = document.querySelectorAll('.preview-sketch');

    // Bouncy Circle Sketch (Card 1)
    const bouncySketch = (p) => {
        let y, vy, gravity, bounce, radius, circleColor;

        p.setup = () => {
            const container = p.canvas.parentElement;
            p.createCanvas(container.offsetWidth, container.offsetHeight);
            p.pixelDensity(1);
            p.frameRate(15);
            resetBall();
            gravity = 0.6;
            bounce = -0.75;
            radius = 20;
            circleColor = p.color(49, 36, 178);
        };

        function resetBall() {
            y = 30;
            vy = 0;
            circleColor = p.color(p.random(100, 200), p.random(50, 150), p.random(200, 255));
        }

        p.draw = () => {
            p.background(250, 252, 255, 150);

            // Draw floor line
            p.stroke(220);
            p.line(0, p.height - 10, p.width, p.height - 10);

            // Update physics
            vy += gravity;
            y += vy;

            // Collision with floor
            if (y + radius > p.height - 10) {
                y = p.height - 10 - radius;
                vy *= bounce;

                // Stop when velocity is very low
                if (p.abs(vy) < 1) vy = 0;
            }

            // Draw ball
            p.noStroke();
            p.fill(circleColor);
            p.ellipse(p.width / 2, y, radius * 2);
        };

        const handleInteraction = () => {
            if (p.mouseX > 0 && p.mouseX < p.width && p.mouseY > 0 && p.mouseY < p.height) {
                resetBall();
                return false; // Prevent scrolling when interacting with sketch
            }
        };

        p.mousePressed = handleInteraction;
        p.touchStarted = handleInteraction;

        p.windowResized = () => {
            const container = p.canvas.parentElement;
            p.resizeCanvas(container.offsetWidth, container.offsetHeight);
        };
    };

    // Audio Player Sketch (Card 2) - Lazy loads audio.ogg in background
    const audioSketch = (p) => {
        let sound, amplitude, fft, playing = false, loading = true;
        let buttonSize = 50;

        p.setup = () => {
            const container = p.canvas.parentElement;
            p.createCanvas(container.offsetWidth, container.offsetHeight);
            p.pixelDensity(1);
            p.frameRate(15);

            // Lazy load sound library and audio.ogg in the background
            setTimeout(() => {
                if (!window.p5.prototype.loadSound) {
                    let script = document.getElementById('p5-sound-script');
                    if (!script) {
                        script = document.createElement('script');
                        script.id = 'p5-sound-script';
                        script.src = "https://cdn.jsdelivr.net/npm/p5@1.9.4/lib/addons/p5.sound.min.js";
                        document.head.appendChild(script);
                    }

                    script.addEventListener('load', () => {
                        if (!sound) { // prevent double load
                            sound = p.loadSound('audio.ogg', () => {
                                if (!amplitude) amplitude = new p5.Amplitude();
                                if (!fft) fft = new p5.FFT(0.8);
                                loading = false;
                                sound.onended(() => {
                                    playing = false;
                                });
                            });
                        }
                    });
                } else if (!sound) {
                    sound = p.loadSound('audio.ogg', () => {
                        if (!amplitude) amplitude = new p5.Amplitude();
                        if (!fft) fft = new p5.FFT(0.8);
                        loading = false;
                        sound.onended(() => {
                            playing = false;
                        });
                    });
                }
            }, 1000); // Wait 1 second after setup to ensure page render priority
        };

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
                    // Radius modulated by volume + fine waveform detail
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

            // Button hover effect
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

        const handleInteraction = () => {
            const cx = p.width / 2;
            const cy = p.height / 2;
            const d = p.dist(p.mouseX, p.mouseY, cx, cy);

            if (d < buttonSize / 2) {
                if (loading || !sound || !sound.isLoaded()) return false;
                togglePlay();
                return false; // Prevent scrolling when interacting with button
            }
        };

        p.mousePressed = handleInteraction;
        p.touchStarted = handleInteraction;

        function togglePlay() {
            if (sound.isPlaying()) {
                sound.pause();
                playing = false;
            } else {
                sound.play(); // Play once, no loop
                playing = true;
            }
        }

        p.windowResized = () => {
            const container = p.canvas.parentElement;
            p.resizeCanvas(container.offsetWidth, container.offsetHeight);
        };
    };

    // LED Sketch (Card 3) - Simple simulation of an interactive electronic component
    const ledSketch = (p) => {
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
            const container = p.canvas.parentElement;
            p.createCanvas(container.offsetWidth, container.offsetHeight);
            p.pixelDensity(1);
            p.frameRate(15);
            blinkStartTime = p.millis();
            ledColor = p.color(255, 0, 255); // initial Magenta
        };

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
            // Check if mouse/touch is within card area
            if (p.mouseX > 0 && p.mouseX < p.width && p.mouseY > 0 && p.mouseY < p.height) {
                // Restart blink timer and pick a random vibrant color from the selective palette
                blinkStartTime = p.millis();
                const c = p.random(palette);
                ledColor = p.color(c[0], c[1], c[2]);
                return false; // Prevent scrolling when interacting with LED
            }
        };

        p.mousePressed = handleInteraction;
        p.touchStarted = handleInteraction;

        p.windowResized = () => {
            const container = p.canvas.parentElement;
            p.resizeCanvas(container.offsetWidth, container.offsetHeight);
        };
    };

    // Initialize specific sketches by ID
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const instance = entry.target._p5_instance;
            if (instance) {
                if (entry.isIntersecting) {
                    instance.loop();
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
