import React, { useEffect, useRef } from 'react';

// Seeded random number generator
const mulberry32 = (a) => {
    return function() {
        var t = a += 0x6D2B79F5;
        t = Math.imul(t ^ t >>> 15, t | 1);
        t ^= t + Math.imul(t ^ t >>> 7, t | 61);
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }
}

export default function Background() {
    const canvasRef = useRef(null);
    const particlesRef = useRef([]); // Persist particles across re-renders

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let resizeTimeout;

        const initParticles = (width, height) => {
            // Always use the same seed for deterministic positions
            const rng = mulberry32(12345); 
            
            // Fixed number of particles based on a reference resolution (e.g. 1920x1080)
            // This ensures consistent density across different screen sizes
            const baseParticleCount = 100; 
            
            if (particlesRef.current.length > 0) {
                return;
            }

            const newParticles = [];
            for (let i = 0; i < baseParticleCount; i++) {
                newParticles.push({
                    // Store position as normalized coordinates (0-1)
                    relX: rng(),
                    relY: rng(),
                    vx: (rng() - 0.5) * 0.5,
                    vy: (rng() - 0.5) * 0.5,
                    size: rng() * 2 + 1,
                    alpha: rng() * 0.5 + 0.1
                });
            }
            particlesRef.current = newParticles;
        };

        const handleResize = () => {
            const dpr = window.devicePixelRatio || 1;
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            ctx.scale(dpr, dpr);
            // No need to add/remove particles, they will just redistribute
        };

        // Initial setup
        const dpr = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        ctx.scale(dpr, dpr);
        initParticles(window.innerWidth, window.innerHeight);

        const draw = () => {
            ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

            // Update and draw particles
            ctx.fillStyle = 'rgba(112, 66, 248, 0.5)';
            
            const width = window.innerWidth;
            const height = window.innerHeight;

            // Calculate active particle count based on current width
            // This ensures density scales down on smaller screens
            // Logic: width / 15 capped at 100 (desktop) or total available particles
            const density = 15;
            const activeCount = Math.min(
                Math.floor(width / density), 
                100, 
                particlesRef.current.length
            );

            particlesRef.current.forEach((p, index) => {
                // Update relative position based on velocity (scaled by viewport)
                // This keeps velocity visually consistent regardless of screen size
                p.relX += p.vx / width;
                p.relY += p.vy / height;

                // Wrap around screen (in normalized coordinates)
                if (p.relX < 0) p.relX = 1;
                if (p.relX > 1) p.relX = 0;
                if (p.relY < 0) p.relY = 1;
                if (p.relY > 1) p.relY = 0;

                // Only draw if within the active count for this resolution
                if (index < activeCount) {
                    // Convert relative to absolute for drawing
                    const x = p.relX * width;
                    const y = p.relY * height;

                    ctx.beginPath();
                    ctx.arc(x, y, p.size, 0, Math.PI * 2);
                    ctx.fill();
                }
            });

            // Draw connections (lightning effect)
            ctx.strokeStyle = 'rgba(112, 66, 248, 0.15)';
            ctx.lineWidth = 1;
            
            // Optimization: Limit checks for connections to avoid N^2 on large screens
            const maxDist = 150;
            
            for (let i = 0; i < activeCount; i++) {
                for (let j = i + 1; j < activeCount; j++) {
                    const p1 = particlesRef.current[i];
                    const p2 = particlesRef.current[j];

                    // Convert to absolute for distance check
                    const x1 = p1.relX * width;
                    const y1 = p1.relY * height;
                    const x2 = p2.relX * width;
                    const y2 = p2.relY * height;

                    const dx = x1 - x2;
                    const dy = y1 - y2;
                    
                    // Quick check before sqrt
                    if (Math.abs(dx) > maxDist || Math.abs(dy) > maxDist) continue;

                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < maxDist) {
                        ctx.beginPath();
                        ctx.moveTo(x1, y1);
                        ctx.lineTo(x2, y2);
                        ctx.stroke();
                    }
                }
            }

            animationFrameId = requestAnimationFrame(draw);
        };

        draw();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
            if (resizeTimeout) clearTimeout(resizeTimeout);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -10,
                pointerEvents: 'none'
            }}
        />
    );
}
