import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useModal } from '../context/ModalContext';

// Custom SVG components
const CheckCircle = ({ className, size, color, fill }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" style={{ fill }}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const XCircle = ({ className, size, color, fill }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" style={{ fill }}>
    <circle cx="12" cy="12" r="10" />
    <line x1="15" y1="9" x2="9" y2="15" />
    <line x1="9" y1="9" x2="15" y2="15" />
  </svg>
);

const ChevronLeft = ({ className, size }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ChevronRight = ({ className, size }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

export default function ComparisonTable() {
    const { openModal } = useModal();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const slides = [
        {
            feature: "RESPONSE SPEED",
            revolt: {
                headline: "Under 60 seconds",
                subtext: "24/7/365. Never misses a lead, even at 3am."
            },
            human: {
                headline: "47 hours average",
                subtext: "Nights and weekends are dark. Leads go cold."
            }
        },
        {
            feature: "SOUND QUALITY",
            revolt: {
                headline: "87% indistinguishable",
                subtext: "Custom-trained on YOUR best calls. Sounds exactly like your top rep."
            },
            human: {
                headline: "Inconsistent quality",
                subtext: "Quality varies across team. New reps sound like new reps."
            }
        },
        {
            feature: "COST",
            revolt: {
                headline: "$1.40 per talk-minute",
                subtext: "No salary, benefits, or churn. Just results."
            },
            human: {
                headline: "$2.77/min + $80k+ salary",
                subtext: "Plus benefits, tools, training, and 35% annual turnover."
            }
        },
        {
            feature: "OBJECTION HANDLING",
            revolt: {
                headline: "Never forgets the playbook",
                subtext: "Trained specifically on YOUR industry objections and close techniques."
            },
            human: {
                headline: "Quality varies by rep",
                subtext: "Playbook adherence inconsistent. Top performers quit and take knowledge with them."
            }
        },
        {
            feature: "SCALING",
            revolt: {
                headline: "Add capacity in minutes",
                subtext: "Handle 1 million concurrent calls if needed. No extra salary per 'seat'."
            },
            human: {
                headline: "$80k+ per new rep",
                subtext: "4-6 weeks hiring/onboarding. Constant backfill from churn."
            }
        }
    ];

    const nextSlide = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    };

    const goToSlide = (index) => {
        setDirection(index > currentIndex ? 1 : -1);
        setCurrentIndex(index);
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowLeft') prevSlide();
            if (e.key === 'ArrowRight') nextSlide();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentIndex]);

    const variants = {
        enter: (direction) => ({
            x: direction > 0 ? 100 : -100,
            opacity: 0
        }),
        center: {
            x: 0,
            opacity: 1
        },
        exit: (direction) => ({
            x: direction < 0 ? 100 : -100,
            opacity: 0
        })
    };

    // Generate random stars for background
    // const stars = Array.from({ length: 40 }).map((_, i) => ({ ... }));

    return (
        <section style={{
            position: 'relative',
            minHeight: '600px',
            backgroundColor: '#0A0A1A',
            overflow: 'hidden',
            padding: '60px 0 40px',
            width: '100%',
            display: 'flex',
            flexDirection: 'column'
        }}>
            {/* Star Field Background - REMOVED */}
            {/* {stars.map((star, i) => ( ... ))} */}

            {/* Purple Gradient Orb */}
            <div style={{
                position: 'absolute',
                left: '5%',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '400px',
                height: '400px',
                background: 'radial-gradient(circle, #8B5CF6 0%, #EC4899 100%)',
                filter: 'blur(100px)',
                opacity: 0.35,
                pointerEvents: 'none',
                zIndex: 0
            }} />

            <div className="container" style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column' }}>
                {/* Header Section */}
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <p style={{
                        color: 'rgba(255,255,255,0.5)',
                        fontSize: '12px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.2em',
                        marginBottom: '8px',
                        fontWeight: '500'
                    }}>
                        REVOLT VS HUMAN SALES REPS
                    </p>
                    
                    <AnimatePresence mode="wait">
                        <motion.h2
                            key={currentIndex}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            style={{
                                color: 'white',
                                fontWeight: '700',
                                fontSize: 'min(8vw, 42px)',
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em',
                                margin: 0
                            }}
                        >
                            {slides[currentIndex].feature}
                        </motion.h2>
                    </AnimatePresence>
                </div>

                {/* Comparison Carousel */}
                <div className="comparison-container">
                    {/* Navigation Arrows - Left */}
                    <button
                        onClick={prevSlide}
                        className="comparison-nav-btn left"
                        style={{
                            position: 'absolute',
                            left: '20px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            width: '48px',
                            height: '48px',
                            borderRadius: '50%',
                            background: 'rgba(255,255,255,0.1)',
                            border: '1px solid rgba(255,255,255,0.2)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'rgba(255,255,255,0.7)',
                            cursor: 'pointer',
                            zIndex: 10,
                            transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(139,92,246,0.3)';
                            e.currentTarget.style.color = 'white';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                            e.currentTarget.style.color = 'rgba(255,255,255,0.7)';
                        }}
                    >
                        <ChevronLeft size={24} />
                    </button>

                    {/* Navigation Arrows - Right */}
                    <button
                        onClick={nextSlide}
                        className="comparison-nav-btn right"
                        style={{
                            position: 'absolute',
                            right: '20px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            width: '48px',
                            height: '48px',
                            borderRadius: '50%',
                            background: 'rgba(255,255,255,0.1)',
                            border: '1px solid rgba(255,255,255,0.2)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'rgba(255,255,255,0.7)',
                            cursor: 'pointer',
                            zIndex: 10,
                            transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(139,92,246,0.3)';
                            e.currentTarget.style.color = 'white';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                            e.currentTarget.style.color = 'rgba(255,255,255,0.7)';
                        }}
                    >
                        <ChevronRight size={24} />
                    </button>

                    {/* Cards Wrapper */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '20px',
                        width: '100%',
                        perspective: '1000px',
                        flexWrap: 'wrap'
                    }}>
                        <AnimatePresence mode="wait" custom={direction}>
                            <motion.div
                                key={currentIndex}
                                custom={direction}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{
                                    x: { type: "spring", stiffness: 300, damping: 30 },
                                    opacity: { duration: 0.2 }
                                }}
                                style={{
                                    display: 'flex',
                                    gap: '20px',
                                    width: '100%',
                                    justifyContent: 'center',
                                    flexWrap: 'wrap'
                                }}
                            >
                                {/* REVOLT Card (Winner) */}
                                <div className="comparison-card winner" style={{
                                    flex: '1 1 45%',
                                    maxWidth: '500px',
                                    minWidth: '300px',
                                    background: 'linear-gradient(to bottom right, rgba(139, 92, 246, 0.3), rgba(99, 102, 241, 0.2))',
                                    borderRadius: '16px',
                                    position: 'relative',
                                    padding: '60px 40px',
                                    boxShadow: '0 0 30px rgba(139, 92, 246, 0.3)',
                                    border: '2px solid transparent',
                                    backgroundImage: 'linear-gradient(to bottom right, rgba(139, 92, 246, 0.3), rgba(99, 102, 241, 0.2)), linear-gradient(to right, #8B5CF6, #6366F1)',
                                    backgroundOrigin: 'padding-box, border-box',
                                    backgroundClip: 'padding-box, border-box'
                                }}>
                                    {/* Pill Badge */}
                                    <div style={{
                                        position: 'absolute',
                                        top: '-16px',
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        background: '#8B5CF6',
                                        color: 'white',
                                        padding: '8px 24px',
                                        borderRadius: '999px',
                                        fontSize: '12px',
                                        fontWeight: 'bold',
                                        letterSpacing: '0.1em',
                                        whiteSpace: 'nowrap',
                                        boxShadow: '0 4px 12px rgba(139, 92, 246, 0.4)'
                                    }}>
                                        REVOLT
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', height: '100%' }}>
                                        <div style={{ marginBottom: '24px' }}>
                                            <CheckCircle size={48} color="#22C55E" fill="rgba(34, 197, 94, 0.1)" />
                                        </div>
                                        <h3 style={{
                                            color: 'white',
                                            fontSize: '32px',
                                            fontWeight: 'bold',
                                            marginBottom: '16px',
                                            lineHeight: '1.2'
                                        }}>
                                            {slides[currentIndex].revolt.headline}
                                        </h3>
                                        <p style={{
                                            color: 'rgba(255,255,255,0.7)',
                                            fontSize: '16px',
                                            lineHeight: '1.6',
                                            maxWidth: '300px'
                                        }}>
                                            {slides[currentIndex].revolt.subtext}
                                        </p>
                                    </div>
                                </div>

                                {/* HUMAN Card (Loser) */}
                                <div className="comparison-card loser" style={{
                                    flex: '1 1 45%',
                                    maxWidth: '500px',
                                    minWidth: '300px',
                                    background: 'rgba(40, 40, 55, 0.5)',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    borderRadius: '16px',
                                    position: 'relative',
                                    padding: '60px 40px'
                                }}>
                                    {/* Pill Badge */}
                                    <div style={{
                                        position: 'absolute',
                                        top: '-16px',
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        background: 'rgba(80, 80, 90, 0.8)',
                                        color: 'rgba(255,255,255,0.7)',
                                        padding: '8px 24px',
                                        borderRadius: '999px',
                                        fontSize: '12px',
                                        fontWeight: 'bold',
                                        letterSpacing: '0.1em',
                                        whiteSpace: 'nowrap',
                                        border: '1px solid rgba(255,255,255,0.1)'
                                    }}>
                                        HUMAN SALES REPS
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', height: '100%' }}>
                                        <div style={{ marginBottom: '24px' }}>
                                            <XCircle size={48} color="#EF4444" fill="rgba(239, 68, 68, 0.1)" />
                                        </div>
                                        <h3 style={{
                                            color: 'rgba(255,255,255,0.7)',
                                            fontSize: '32px',
                                            fontWeight: '400',
                                            marginBottom: '16px',
                                            lineHeight: '1.2'
                                        }}>
                                            {slides[currentIndex].human.headline}
                                        </h3>
                                        <p style={{
                                            color: 'rgba(255,255,255,0.5)',
                                            fontSize: '16px',
                                            lineHeight: '1.6',
                                            maxWidth: '300px'
                                        }}>
                                            {slides[currentIndex].human.subtext}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Pagination Dots */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '12px',
                    marginTop: '40px'
                }}>
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            style={{
                                width: '10px',
                                height: '10px',
                                borderRadius: '50%',
                                background: index === currentIndex ? '#8B5CF6' : 'rgba(255,255,255,0.2)',
                                border: 'none',
                                padding: 0,
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                transform: index === currentIndex ? 'scale(1.2)' : 'scale(1)'
                            }}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>

                {/* Demo Button */}
                <div style={{ textAlign: 'center', marginTop: '50px' }}>
                    <button 
                        onClick={openModal} 
                        className="btn btn-primary btn-glow-hover" 
                        style={{ fontSize: '1.2rem', padding: '1rem 3rem' }}
                    >
                        Test A Free Demo Call
                    </button>
                </div>
            </div>

            {/* Mobile styles injection */}
            <style>{`
                .comparison-container {
                    position: relative;
                    padding: 0 80px;
                    flex: 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                @media (max-width: 768px) {
                    .comparison-container {
                        padding: 0 20px;
                    }

                    .comparison-card {
                        width: 100% !important;
                        flex: 1 1 100% !important;
                        min-width: unset !important;
                        padding: 30px 20px !important; /* Smaller padding */
                        margin-bottom: 24px !important; /* Restore spacing between cards */
                    }

                    .comparison-card:last-child {
                        margin-bottom: 0 !important;
                    }

                    .comparison-card h3 {
                        font-size: 24px !important; /* Smaller headlines */
                    }

                    .comparison-card p {
                        font-size: 14px !important; /* Smaller text */
                    }

                    .comparison-nav-btn {
                        display: none !important; /* Hide arrows on mobile */
                    }
                }
            `}</style>
        </section>
    );
}
