import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useModal } from '../context/ModalContext';
import { submitToN8n } from '../utils/api';

const PERSONAS = [
    { title: "Revolt B2B SaaS Cold Caller", color: "#3b82f6" },
    { title: "Revolt Realtor in Los Angeles", color: "#10b981" },
    { title: "Revolt Family Law Firm", color: "#8b5cf6" },
    { title: "Revolt Home Handymen", color: "#f59e0b" },
    { title: "Revolt Dental Office", color: "#ec4899" }
];

export default function SimulatorCarousel() {
    const { registerHeroForm } = useModal();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isAgreed, setIsAgreed] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const formRef = useRef(null);

    useEffect(() => {
        if (formRef.current) {
            registerHeroForm(formRef);
        }
    }, [registerHeroForm]);

    const submitHeroForm = async (token) => {
        setIsSubmitting(true);
        try {
            await submitToN8n({ 
                phone,
                email,
                name: name || undefined,
                captchaToken: token,
                source: 'simulator_carousel',
                persona: PERSONAS[currentIndex].title
            });
            alert("Sweet! We'll Call You Immediately, Make Sure You're Not on DND");
            setPhone('');
            setEmail('');
            setIsAgreed(false);
        } catch (error) {
            console.error(error);
            alert(`Error: ${error.message || 'Something went wrong. Please check your connection.'}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        submitHeroForm('bypass-captcha'); 
    };

    const handleNext = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % PERSONAS.length);
    };

    const handlePrev = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + PERSONAS.length) % PERSONAS.length);
    };

    const getCardVariant = (index) => {
        if (index === currentIndex) return 'center';
        
        const len = PERSONAS.length;
        const nextIndex = (currentIndex + 1) % len;
        const prevIndex = (currentIndex - 1 + len) % len;
        
        if (index === nextIndex) return 'right';
        if (index === prevIndex) return 'left';
        
        // Return hidden state for non-adjacent cards to prevent glitches
        return 'hidden'; 
    };

    const variants = {
        center: { 
            x: 0, 
            scale: 1, 
            zIndex: 10, 
            opacity: 1,
            rotateY: 0,
            filter: 'blur(0px)',
            display: 'block'
        },
        left: { 
            x: '-18%', 
            scale: 0.9, 
            zIndex: 5, 
            opacity: 0.6,
            rotateY: 5,
            filter: 'blur(1px)',
            display: 'block'
        },
        right: { 
            x: '18%', 
            scale: 0.9, 
            zIndex: 5, 
            opacity: 0.6,
            rotateY: -5,
            filter: 'blur(1px)',
            display: 'block'
        },
        hidden: { 
            x: 0, 
            scale: 0.8, 
            zIndex: 0, 
            opacity: 0,
            rotateY: 0,
            filter: 'blur(10px)',
            display: 'none'
        }
    };

    const swipeConfidenceThreshold = 10000;
    const swipePower = (offset, velocity) => {
        return Math.abs(offset) * velocity;
    };

    return (
        <div style={{ 
            position: 'relative', 
            width: '100%',
            maxWidth: '600px',
            margin: '0 auto', 
            perspective: '1000px',
            padding: '0 60px'
        }}>
            {/* Navigation Buttons */}
            <button 
                onClick={handlePrev}
                style={{
                    position: 'absolute',
                    left: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    cursor: 'pointer',
                    zIndex: 20,
                    backdropFilter: 'blur(10px)'
                }}
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 18l-6-6 6-6" />
                </svg>
            </button>

            <button 
                onClick={handleNext}
                style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    cursor: 'pointer',
                    zIndex: 20,
                    backdropFilter: 'blur(10px)'
                }}
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 18l6-6-6-6" />
                </svg>
            </button>

            <div style={{ position: 'relative', height: '600px' }}>
                {PERSONAS.map((persona, index) => {
                    const variant = getCardVariant(index);
                    const isCenter = variant === 'center';

                    return (
                        <motion.div
                            key={index}
                            variants={variants}
                            initial="hidden"
                            animate={variant}
                            transition={{
                                x: { type: "spring", stiffness: 300, damping: 30 },
                                opacity: { duration: 0.2 },
                                scale: { duration: 0.2 },
                                rotateY: { duration: 0.2 }
                            }}
                            drag={isCenter ? "x" : false}
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={1}
                            onDragEnd={(e, { offset, velocity }) => {
                                const swipe = swipePower(offset.x, velocity.x);
                                if (swipe < -swipeConfidenceThreshold) {
                                    handleNext();
                                } else if (swipe > swipeConfidenceThreshold) {
                                    handlePrev();
                                }
                            }}
                            style={{
                                width: '100%',
                                position: 'absolute',
                                cursor: isCenter ? 'grab' : 'default',
                                pointerEvents: isCenter ? 'auto' : 'none',
                                top: 0
                            }}
                            whileTap={isCenter ? { cursor: 'grabbing' } : {}}
                        >
                             {/* Card Container */}
                            <div style={{
                                background: isCenter ? 'rgba(10, 5, 30, 0.95)' : 'rgba(10, 5, 30, 0.4)',
                                borderRadius: '1.5rem',
                                padding: '2.5rem',
                                backdropFilter: 'blur(40px)',
                                boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                                position: 'relative',
                                border: '1px solid rgba(255, 255, 255, 0.05)',
                                overflow: 'hidden',
                                height: '100%'
                            }}>
                                 {/* Animated Border */}
                                <div style={{
                                    position: 'absolute',
                                    inset: '-2px',
                                    borderRadius: '1.6rem',
                                    padding: '2px',
                                    background: `linear-gradient(90deg, ${persona.color} 0%, white 50%, ${persona.color} 100%)`,
                                    backgroundSize: '200% auto',
                                    animation: 'sweep 3s linear infinite',
                                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                                    WebkitMaskComposite: 'xor',
                                    maskComposite: 'exclude',
                                    zIndex: -1,
                                    opacity: 0.8,
                                    pointerEvents: 'none'
                                }} />

                                <h3 style={{ 
                                    fontSize: '1.5rem', 
                                    fontWeight: '700', 
                                    marginBottom: isCenter ? '1.5rem' : '0', 
                                    textAlign: 'center',
                                    textShadow: '0 0 20px rgba(255, 255, 255, 0.5)',
                                    minHeight: '3.6rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    {persona.title}
                                </h3>

                                <motion.div
                                    animate={{ opacity: isCenter ? 1 : 0 }}
                                    transition={{ duration: 0.2 }}
                                    style={{ 
                                        // Keep space occupied even when invisible to prevent height collapse
                                        visibility: isCenter ? 'visible' : 'hidden' 
                                    }}
                                >
                                    <form onSubmit={handleFormSubmit}>
                                    <div className="form-group" style={{ marginBottom: '1rem' }}>
                                        <label className="form-label">First Name</label>
                                        <input
                                            type="text"
                                            className="form-input"
                                            placeholder="Your Name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            tabIndex={isCenter ? 0 : -1}
                                        />
                                    </div>

                                    <div className="form-group" style={{ marginBottom: '1rem' }}>
                                        <label className="form-label">Email <span style={{ color: 'var(--color-primary)' }}>*</span></label>
                                        <input
                                            type="email"
                                            className="form-input"
                                            placeholder="your@email.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required={isCenter}
                                            tabIndex={isCenter ? 0 : -1}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Phone Number <span style={{ color: 'var(--color-primary)' }}>*</span></label>
                                        <input
                                            type="tel"
                                            className="form-input"
                                            placeholder="(555) 123-4567"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            required={isCenter}
                                            tabIndex={isCenter ? 0 : -1}
                                        />
                                    </div>

                                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', marginTop: '1rem' }}>
                                        <input 
                                            type="checkbox" 
                                            id={`consent-${index}`}
                                            required={isCenter}
                                            checked={isAgreed}
                                            onChange={(e) => setIsAgreed(e.target.checked)}
                                            style={{ marginTop: '0.25rem' }} 
                                            tabIndex={isCenter ? 0 : -1}
                                        />
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <label htmlFor={`consent-${index}`} style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', lineHeight: '1.2', whiteSpace: 'nowrap' }}>
                                                I agree to allow Revolt to call this phone number
                                            </label>
                                            <p style={{ fontSize: '0.7rem', color: 'var(--color-text-secondary)', marginTop: '0.2rem', opacity: 0.8, whiteSpace: 'nowrap' }}>
                                                We'll call you to demonstrate Revolt with a real call
                                            </p>
                                        </div>
                                    </div>

                                    <button 
                                        type="submit" 
                                        className="hero-cta-btn"
                                        style={{ 
                                            width: '100%', 
                                            marginTop: '1.5rem',
                                            background: persona.color,
                                            border: 'none',
                                            borderRadius: '0.5rem',
                                            color: 'white',
                                            fontWeight: 'bold',
                                            cursor: isCenter ? 'pointer' : 'default',
                                            boxShadow: `0 0 20px ${persona.color}66`
                                        }}
                                        disabled={isSubmitting || !isCenter}
                                        tabIndex={isCenter ? 0 : -1}
                                    >
                                        {isSubmitting ? 'Calling...' : 'Call Me Now'}
                                    </button>
                                    </form>
                                </motion.div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
