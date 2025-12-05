import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useModal } from '../context/ModalContext';
import RingParticleEffect from './RingParticleEffect';

export default function PainSection() {
    const { openModal } = useModal();
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"]
    });

    // === Ring 1 ===
    // Visible from START (0) to 0.25
    // Fades OUT at 0.25 (when Ring 2 starts)
    const scale1 = useTransform(scrollYProgress, [0, 0.25], [0.6, 0.6]); // Start smaller (0.6)
    const opacity1 = useTransform(scrollYProgress, [0, 0.25, 0.3], [1, 1, 0]); // Start visible, fade out
    // Default desktop transform
    const y1Desktop = useTransform(scrollYProgress, [0, 0.25], ['2rem', '2rem']); 
    // Mobile transform - centers more aggressively (use 17.5vh since flex container is centered)
    const y1Mobile = useTransform(scrollYProgress, [0, 0.25], ['17.5vh', '17.5vh']); 
    
    // === Ring 2 ===
    // Scales from 0.8 to 1.5 (Bigger)
    // Fades IN at 0.25, Fades OUT at 0.5 (when Ring 3 starts)
    const scale2 = useTransform(scrollYProgress, [0.25, 0.4], [0.8, 1.5]);
    const opacity2 = useTransform(scrollYProgress, [0.25, 0.3, 0.45, 0.5], [0, 1, 1, 0]);
    // Default desktop transform
    const y2Desktop = useTransform(scrollYProgress, [0.25, 0.4], [-50, 0]);
    // Mobile transform - centers more aggressively (use 17.5vh since flex container is centered)
    const y2Mobile = useTransform(scrollYProgress, [0.25, 0.4], ['17.5vh', '17.5vh']);

    // === Ring 3 ===
    // Scales from 0.8 to 3 (Massive)
    // Fades IN at 0.5, Stays visible until content starts appearing
    const scale3 = useTransform(scrollYProgress, [0.5, 0.65], [0.8, 3]);
    // Fades out when content appears (0.7 - 0.85)
    const opacity3 = useTransform(scrollYProgress, [0.5, 0.55, 0.7, 0.85], [0, 1, 1, 0]);
    // Default desktop transform
    const y3Desktop = useTransform(scrollYProgress, [0.5, 0.65, 0.85], [-50, 0, -300]);
    // Mobile transform - lifts UP significantly at the end to clear way for text
    const y3Mobile = useTransform(scrollYProgress, [0.5, 0.65, 0.85], ['17.5vh', '17.5vh', '-30vh']);

    // Check if mobile
    const [isMobile, setIsMobile] = React.useState(false);
    React.useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const y1 = isMobile ? y1Mobile : y1Desktop;
    const y2 = isMobile ? y2Mobile : y2Desktop;
    const y3 = isMobile ? y3Mobile : y3Desktop;

    // Content opacity/reveal for the final text
    const contentOpacity = useTransform(scrollYProgress, [0.7, 0.85], [0, 1]);
    const contentY = useTransform(scrollYProgress, [0.7, 0.85], [20, 0]);

    return (
        <section ref={sectionRef} className="section-padding" style={{ position: 'relative', height: '300vh' }}>
            <div style={{ position: 'sticky', top: 0, height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                
                <RingParticleEffect scrollYProgress={scrollYProgress} isMobile={isMobile} />
                
                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ 
                        textAlign: 'center',
                        maxWidth: '900px',
                        margin: '0 auto',
                        position: 'relative',
                        minHeight: '300px', // Reserve space for the rings
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        {/* Stylized 'Ring Ring Ring' - Vertically Stacked & Overlapping Position */}
                        <div style={{ 
                            fontSize: 'min(8vw, 4rem)', 
                            fontWeight: '800', 
                            marginBottom: '2rem',
                            lineHeight: '1.1',
                            fontFamily: 'var(--font-sans)', // Changed from monospace to global sans
                            letterSpacing: '-0.02em', // Adjusted letter spacing to match sans
                            position: 'relative',
                            width: '100%',
                            height: '150px', // Fixed height container
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            {/* Ring 1 Wrapper */}
                            <motion.div 
                                style={{ 
                                    scale: scale1,
                                    opacity: opacity1,
                                    y: y1,
                                    position: 'absolute',
                                    width: '100%',
                                    textAlign: 'center',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center' // Add flex centering
                                }}
                            >
                                <motion.span
                                    style={{ display: 'inline-block' }}
                                    animate={{
                                        x: [1, -1, -3, 3, 1, -1, -3, 3, -1, 1, 1],
                                        y: [1, -2, 0, 2, -1, 2, 1, 1, -1, 2, -2],
                                        rotate: [0, -1, 1, 0, 1, -1, 0, -1, 1, 0, -1]
                                    }}
                                    transition={{
                                        duration: 0.5,
                                        repeat: Infinity,
                                        repeatType: "loop"
                                    }}
                                >
                                    The phone is ringing...
                                </motion.span>
                            </motion.div>
                            
                            {/* Ring 2 Wrapper */}
                            <motion.div 
                                style={{ 
                                    scale: scale2,
                                    opacity: opacity2,
                                    y: y2,
                                    position: 'absolute',
                                    width: '100%',
                                    textAlign: 'center'
                                }}
                            >
                                <motion.span
                                    style={{ display: 'inline-block' }}
                                    animate={{
                                        x: [1, -1, -3, 3, 1, -1, -3, 3, -1, 1, 1],
                                        y: [1, -2, 0, 2, -1, 2, 1, 1, -1, 2, -2],
                                        rotate: [0, -1, 1, 0, 1, -1, 0, -1, 1, 0, -1]
                                    }}
                                    transition={{
                                        duration: 0.5,
                                        repeat: Infinity,
                                        repeatType: "loop",
                                        delay: 0.1
                                    }}
                                >
                                    Ringing...
                                </motion.span>
                            </motion.div>
                            
                            {/* Ring 3 Wrapper */}
                            <motion.div 
                                style={{ 
                                    scale: scale3,
                                    opacity: opacity3,
                                    y: y3,
                                    position: 'absolute',
                                    width: '100%',
                                    textAlign: 'center',
                                    color: 'var(--color-primary)'
                                }}
                            >
                                <motion.span
                                    style={{ display: 'inline-block' }}
                                    animate={{
                                        x: [2, -2, -6, 6, 2, -2, -6, 6, -2, 2, 2],
                                        y: [2, -4, 0, 4, -2, 4, 2, 2, -2, 4, -4],
                                        rotate: [0, -2, 2, 0, 2, -2, 0, -2, 2, 0, -2]
                                    }}
                                    transition={{
                                        duration: 0.3,
                                        repeat: Infinity,
                                        repeatType: "loop",
                                        delay: 0.2
                                    }}
                                >
                                    RINGING!
                                </motion.span>
                            </motion.div>
                        </div>

                        {/* Rest of content fades in normally */}
                        <motion.div
                            style={{ opacity: contentOpacity, y: contentY, position: 'relative', zIndex: 10 }}
                        >
                            {/* Impact text */}
                            <h3 className="pain-impact-title">
                                Every <span style={{ color: '#ff4d4d', whiteSpace: 'nowrap' }}>ring unanswered</span> is <br className="mobile-break" /><span style={{ color: '#ff4d4d' }}>revenue lost</span>.
                            </h3>

                            <p className="pain-impact-text">
                                At <strong style={{ color: 'var(--color-text)' }}>$300/lead</strong>, that's <br className="mobile-break" /><strong style={{ color: 'var(--color-text)', borderBottom: '2px solid #ff4d4d' }}>$9,000/month</strong> walking to competitors.
                            </p>

                            <button 
                                onClick={openModal}
                                className="btn btn-primary btn-glow-hover mobile-responsive-btn"
                                style={{ 
                                    fontSize: '1.2rem', 
                                    padding: '1rem 3rem', 
                                    marginTop: '1.5rem',
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                See How Much <span style={{ color: '#ff4d4d', margin: '0 0.2rem' }}>Your</span> Business Is Losing
                            </button>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
