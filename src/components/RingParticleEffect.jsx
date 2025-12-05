import React, { useRef, useEffect } from 'react';

const RingParticleEffect = ({ scrollYProgress, isMobile }) => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const requestRef = useRef();

  // Initialize particles
  useEffect(() => {
    const particleCount = isMobile ? 20 : 50;
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random(), // 0-1 (normalized width)
        y: 0.7 + Math.random() * 0.3, // Start at bottom 30% (normalized height)
        baseX: Math.random(), // Store original relative X
        baseY: 0.7 + Math.random() * 0.3, // Store original relative Y
        offset: Math.random() * 1000, // Random starting time offset
        speed: 0.5 + Math.random() * 0.5,
        driftX: (Math.random() - 0.5) * 0.2, // Random horizontal drift
        driftY: -0.2 - Math.random() * 0.5, // Upward drift
      });
    }
    particlesRef.current = particles;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;

    // Handle resize
    const resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        width = entry.contentRect.width;
        height = entry.contentRect.height;
        canvas.width = width;
        canvas.height = height;
      }
    });
    resizeObserver.observe(canvas);

    const animate = () => {
      const progress = scrollYProgress.get();
      
      // Optimization: Stop animation if outside relevant range
      if (progress <= 0 || progress >= 1) {
         ctx.clearRect(0, 0, width, height);
         // Still request frame to check for re-entry, but skip drawing
         // Or rely on useEffect dependency to restart? 
         // Better to keep loop running but cheap if inactive, or handle active state in parent.
         // Given the requirements, we'll keep it running but clear if < 0 or >= 1.
         // Actually, if it's 0, we might want to hide it.
      }

      ctx.clearRect(0, 0, width, height);

      if (progress > 0 && progress < 1) {
        
        // --- calculate global phase properties ---
        
        // Jitter Intensity
        // 0 at 0%, max at 85%, then maybe drops off? 
        // User said: "Increase in intensity as scroll progresses" (until Climax 70-85%)
        let jitterIntensity = 0;
        if (progress < 0.85) {
             // Scale from 0 to 1 between 0 and 0.85
             jitterIntensity = Math.max(0, progress / 0.85);
        } else {
             jitterIntensity = 1; 
        }

        // Global Opacity Fade Out (85-100%)
        let globalAlpha = 1;
        if (progress > 0.85) {
            globalAlpha = 1 - (progress - 0.85) / 0.15;
            globalAlpha = Math.max(0, globalAlpha);
        }

        // Color Interpolation
        // Start: purple (#8b5cf6) -> rgb(139, 92, 246)
        // Mid: violet (#a855f7) -> rgb(168, 85, 247)
        // Peak: fuchsia (#c026d3) -> rgb(192, 38, 211)
        
        // Simplified interpolation based on progress
        let r, g, b;
        if (progress < 0.5) {
            // Interpolate Start to Mid
            const t = progress * 2; // 0 to 1
            r = 139 + (168 - 139) * t;
            g = 92 + (85 - 92) * t;
            b = 246 + (247 - 246) * t;
        } else {
            // Interpolate Mid to Peak
            const t = (progress - 0.5) * 2; // 0 to 1
            r = 168 + (192 - 168) * t;
            g = 85 + (38 - 85) * t;
            b = 247 + (211 - 247) * t;
        }
        const color = `rgba(${Math.floor(r)}, ${Math.floor(g)}, ${Math.floor(b)},`; // Leave alpha open

        // --- Draw Particles ---
        particlesRef.current.forEach((p, i) => {
             // 1. Calculate base position based on scroll phase
             
             // Phase 1 (0-20%): Bottom third
             // Phase 2 (20-70%): Drift towards camera/center
             // Phase 3 (70-85%): Converge/Fill screen
             
             // We can interpolate current normalized position (nx, ny)
             // Start (0%): ny = p.baseY (0.7-1.0)
             // End (85%): ny = spread across 0-1
             
             // Simple linear interpolation of "target" y
             // Let's make them rise up. 
             // At progress 0: y is p.baseY
             // At progress 0.85: y is random distribution? Or just p.baseY - (something * progress)?
             
             // Let's use the description: "Drift toward camera/viewer" usually implies getting bigger and moving outwards or center.
             // "Spread across more of the screen"
             
             let targetY = p.baseY;
             let targetX = p.baseX;
             
             if (progress > 0.2) {
                 // Move particles up and spread them
                 const moveFactor = (progress - 0.2) / 0.65; // 0 to 1 from 20% to 85%
                 
                 // Move up
                 targetY = p.baseY - (moveFactor * 0.8); // Move up by 80% of screen height
                 
                 // Spread X from center
                 const distFromCenter = p.baseX - 0.5;
                 targetX = 0.5 + distFromCenter * (1 + moveFactor * 0.5); // Spread out slightly
             }
             
             // Apply wrap-around or clamping if needed, but text can go off screen
             
             // 2. Size Calculation
             // Start: 12-16px
             // End (85%): 60-100px
             let size = 14; // Average start
             if (progress > 0.2) {
                 const sizeFactor = Math.min(1, (progress - 0.2) / 0.5); // Max size at 70%
                 // Interpolate 14 -> 80
                 size = 14 + (66 * sizeFactor);
             }
             
             // 3. Opacity Calculation
             // Start: 0.05 - 0.15
             // End (85%): 0.5 - 0.8
             let alpha = 0.1;
             if (progress > 0.2) {
                 const alphaFactor = Math.min(1, (progress - 0.2) / 0.5); // Max opacity at 70%
                 alpha = 0.1 + (0.6 * alphaFactor);
             }
             
             // Apply global fade out
             alpha *= globalAlpha;

             if (alpha <= 0) return;

             // 4. Jitter
             // Jitter intensity factors
             const baseJitter = 2;
             const maxJitter = 15; // px
             const currentJitter = (baseJitter + (jitterIntensity * maxJitter)) * (size / 50); // Scale jitter with size
             
             const jitterX = (Math.random() - 0.5) * currentJitter;
             const jitterY = (Math.random() - 0.5) * currentJitter;
             const jitterRot = (Math.random() - 0.5) * (0.1 + jitterIntensity * 0.5); // radians
             const jitterScale = 1 + (Math.random() - 0.5) * 0.1 * jitterIntensity;

             // 5. Draw
             const xPos = targetX * width + jitterX;
             const yPos = targetY * height + jitterY;
             
             ctx.save();
             ctx.translate(xPos, yPos);
             ctx.rotate(jitterRot);
             ctx.scale(jitterScale, jitterScale);
             
             ctx.font = `${size}px sans-serif`; // Or monospace/specific font
             ctx.fillStyle = `${color} ${alpha})`;
             ctx.textAlign = 'center';
             ctx.textBaseline = 'middle';
             ctx.fillText('ring', 0, 0);
             
             ctx.restore();
        });
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
        if (requestRef.current) cancelAnimationFrame(requestRef.current);
        resizeObserver.disconnect();
    };
  }, [scrollYProgress, isMobile]);

  return (
    <canvas 
      ref={canvasRef}
      className="ring-particle-canvas"
      style={{ 
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0 // Will need to verify z-index requirements
      }}
    />
  );
};

export default RingParticleEffect;

