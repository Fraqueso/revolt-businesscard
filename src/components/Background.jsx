import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Background() {
    const [lightningActive, setLightningActive] = useState(false);

    useEffect(() => {
        // Random lightning flashes
        const triggerLightning = () => {
            setLightningActive(true);
            setTimeout(() => setLightningActive(false), 200); // Flash duration

            // Schedule next flash (random between 5s and 15s)
            const nextFlash = Math.random() * 10000 + 5000;
            setTimeout(triggerLightning, nextFlash);
        };

        const timeout = setTimeout(triggerLightning, 5000);
        return () => clearTimeout(timeout);
    }, []);

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: -1,
            overflow: 'hidden',
            background: 'var(--color-bg)',
        }}>
            {/* Base Gradient Blobs */}
            <div style={{
                position: 'absolute',
                top: '-20%',
                left: '-10%',
                width: '60%',
                height: '60%',
                background: 'radial-gradient(circle, rgba(112, 66, 248, 0.2) 0%, transparent 70%)',
                filter: 'blur(60px)',
                animation: 'float 20s infinite ease-in-out',
            }} />
            <div style={{
                position: 'absolute',
                bottom: '-20%',
                right: '-10%',
                width: '60%',
                height: '60%',
                background: 'radial-gradient(circle, rgba(0, 212, 255, 0.15) 0%, transparent 70%)',
                filter: 'blur(60px)',
                animation: 'float 25s infinite ease-in-out reverse',
            }} />

            {/* Lightning Effect */}
            <AnimatePresence>
                {lightningActive && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 0.08, 0.02, 0.06, 0] }}
                        exit={{ opacity: 0 }}
                        transition={{
                            duration: 0.4,
                            times: [0, 0.15, 0.35, 0.6, 1],
                            ease: "easeOut"
                        }}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundImage: 'url(/assets/lightning.png)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            mixBlendMode: 'screen',
                            filter: 'brightness(1.5) contrast(1.2)',
                            pointerEvents: 'none',
                        }}
                    />
                )}
            </AnimatePresence>

            <style>{`
        @keyframes float {
          0% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(30px, -50px) rotate(10deg); }
          66% { transform: translate(-20px, 20px) rotate(-5deg); }
          100% { transform: translate(0, 0) rotate(0deg); }
        }

      `}</style>
        </div>
    );
}
