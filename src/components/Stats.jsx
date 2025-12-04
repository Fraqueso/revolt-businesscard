import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useModal } from '../context/ModalContext';
import HourglassBackground from './HourglassBackground';

export default function Stats() {
    const { openModal } = useModal();
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const stats = [
        {
            value: "78%",
            label: "of prospects buy from whoever responds FIRST, not best",
            subtext: "Speed-to-lead isn't optional. It's survival.",
            source: "Velocify"
        },
        {
            value: <React.Fragment>47 <span style={{ fontSize: '0.6em' }}>hours</span></React.Fragment>,
            label: "Average response time with human teams",
            subtext: "That's two full days. Your competitor called 46 hours ago.",
            source: "Harvard Business Review"
        },
        {
            value: "62%",
            label: "of your inbound calls go completely unanswered",
            subtext: "You're spending money on ads to generate leads you never even talk to.",
            source: "Based on 38% answer rate, Bridge Group SDR/BDR Report"
        },
        {
            value: <React.Fragment>3 <span style={{ fontSize: '0.6em' }}>seconds</span></React.Fragment>,
            label: "How long it takes prospects to detect robotic AI and hang up",
            subtext: "Fast response doesn't matter if your AI sounds like garbage.",
            source: ""
        }
    ];

    return (
        <section ref={containerRef} className="section-padding" style={{ position: 'relative', height: '300vh' }}>
            <div className="sticky-wrapper" style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '100%', height: '100%' }}>
                    {/* Header Overlay - Always visible */}
                    <div
                        style={{ 
                            textAlign: 'center', 
                            position: 'absolute', 
                            top: '10%', 
                            width: '100%', 
                            zIndex: 10,
                            pointerEvents: 'none'
                        }}
                    >
                        <h2 
                            style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '1rem', textShadow: '0 4px 20px rgba(0,0,0,0.8)' }}
                        >
                            Speed-To-Lead Is <span style={{ color: '#ff4d4d' }}>Killing</span> Your Close Rate
                        </h2>
                    </div>

                    <div style={{ position: 'relative', height: '100vh', width: '100vw', margin: '0 auto', left: '50%', transform: 'translateX(-50%)' }}>
                        {stats.map((stat, index) => {
                            // Calculate start/end scroll ranges for each card
                            const start = index * 0.25;
                            const end = start + 0.25;
                            
                            // Transform properties based on scroll progress
                            // For the first card (index 0), start visible (opacity 1)
                            const opacityRange = index === 0 
                                ? [start, end - 0.05, end] 
                                : [start, start + 0.05, end - 0.05, end];
                                
                            const opacityOutput = index === 0
                                ? [1, 1, 0]
                                : [0, 1, 1, 0];

                            const opacity = useTransform(scrollYProgress, opacityRange, opacityOutput);
                            
                            // Scale logic: keep it slight to avoid motion sickness
                            const scaleRange = index === 0
                                ? [start, end]
                                : [start, start + 0.05, end - 0.05, end];
                            
                            const scaleOutput = index === 0
                                ? [1, 1.05]
                                : [0.95, 1, 1, 1.05];

                            const scale = useTransform(scrollYProgress, scaleRange, scaleOutput);

                            // The last card should stay visible longer
                            const isLast = index === stats.length - 1;
                            const finalOpacity = isLast ? useTransform(scrollYProgress, [start, start + 0.05], [0, 1]) : opacity;
                            const finalScale = isLast ? useTransform(scrollYProgress, [start, start + 0.05], [0.95, 1]) : scale;

                            return (
                                <motion.div
                                    key={index}
                                    style={{
                                        opacity: finalOpacity,
                                        scale: finalScale,
                                        position: 'absolute',
                                        top: '-5%', // Shift everything up
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        pointerEvents: 'none' // Prevent interaction with hidden cards
                                    }}
                                >
                                    <div style={{
                                        background: 'transparent',
                                        border: 'none',
                                        borderRadius: '0',
                                        padding: '0',
                                        textAlign: 'center',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        position: 'relative',
                                        overflow: 'hidden',
                                        width: '100%',
                                        height: '100%',
                                        pointerEvents: 'auto',
                                        boxShadow: 'none'
                                    }}>
                                        <div style={{ position: 'relative', zIndex: 1, padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
                                            <div style={{
                                                fontSize: 'min(15vw, 8rem)',
                                                fontWeight: '800',
                                                marginBottom: '2rem',
                                                background: 'var(--gradient-primary)',
                                                WebkitBackgroundClip: 'text',
                                                WebkitTextFillColor: 'transparent',
                                                lineHeight: 1
                                            }}>
                                                {stat.value}
                                            </div>
                                            <p style={{ fontSize: 'min(5vw, 2.5rem)', fontWeight: '600', marginBottom: '2rem', color: 'var(--color-text)' }}>
                                                {stat.label}
                                            </p>
                                            <p style={{ fontSize: 'min(4vw, 1.5rem)', color: 'var(--color-text-secondary)', lineHeight: '1.6', marginBottom: '1rem', maxWidth: '800px', margin: '0 auto' }}>
                                                {stat.subtext}
                                            </p>
                                        </div>
                                        <div style={{ position: 'absolute', bottom: '2rem', width: '100%', textAlign: 'center', zIndex: 1, padding: '0 1rem' }}>
                                            {stat.source && (
                                                <div style={{ 
                                                    fontSize: '1rem', 
                                                    color: 'var(--color-text-secondary)', 
                                                    opacity: 0.6, 
                                                    fontStyle: 'italic',
                                                    maxWidth: '280px',
                                                    margin: '0 auto' 
                                                }}>
                                                    Source: {stat.source}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    <motion.div
                        style={{ textAlign: 'center', position: 'absolute', bottom: '20%', width: '100%', zIndex: 10 }}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <button onClick={openModal} className="btn btn-primary btn-glow-hover" style={{ fontSize: '1.2rem', padding: '0.6rem 3rem', boxShadow: '0 0 20px rgba(0,0,0,0.5)' }}>
                            Book A Demo
                        </button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
