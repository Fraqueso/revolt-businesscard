import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import ReCAPTCHA from "react-google-recaptcha";
import { useModal } from '../context/ModalContext';
import { submitToN8n } from '../utils/api';

export default function Hero() {
    const { openModal, registerHeroForm } = useModal();
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isAgreed, setIsAgreed] = useState(false);
    const [showCaptcha, setShowCaptcha] = useState(false);
    const [captchaToken, setCaptchaToken] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const recaptchaRef = useRef(null);
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
                name: name || undefined, // Only send if not empty 
                captchaToken: token,
                source: 'hero_form'
            });
            alert("Sweet! We'll Call You Immediately, Make Sure You're Not on DND");
            setPhone('');
            setEmail('');
            setIsAgreed(false);
            setCaptchaToken(null);
            setShowCaptcha(false);
        } catch (error) {
            console.error(error);
            alert(`Error: ${error.message || 'Something went wrong. Please check your connection.'}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Always require captcha
        if (!captchaToken) {
            setShowCaptcha(true);
            return;
        }

        submitHeroForm(captchaToken);
    };

    return (
        <section className="hero">
            <div className="container">
                <div className="hero-content">
                    <div className="hero-text">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            style={{ backgroundColor: 'transparent', willChange: 'transform' }}
                        >
                            <span style={{ display: 'inline-block' }}>You Can't Answer Every Call.</span>
                            <span className="text-gradient" style={{ display: 'block', marginTop: '0.2em' }}>Revolt Can.</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            style={{ backgroundColor: 'transparent', willChange: 'transform' }}
                        >
                            Revolt is the first conversational AI built for speed-to-lead. It calls your leads in under 60 seconds, handles objections like a top performer, and books appointments 24/7.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="hero-cta"
                            style={{ backgroundColor: 'transparent' }}
                        >
<button onClick={openModal} className="btn btn-primary hero-cta-btn btn-glow-hover">
                                Book A Demo
</button>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
                                <span style={{ width: '10px', height: '10px', background: '#22c55e', borderRadius: '50%', display: 'inline-block', flexShrink: 0 }}></span>
                                current average dial time: 22.4 seconds
                            </div>
                        </motion.div>

                        <div className="hero-stats">
                            <div className="stat-item">
                                <h3>&lt;60s</h3>
                                <p>Speed to Lead</p>
                            </div>
                            <div className="stat-item">
                                <h3>24/7</h3>
                                <p>Availability</p>
                            </div>
                            <div className="stat-item">
                                <h3>3x</h3>
                                <p>Conversion Rate</p>
                            </div>
                        </div>
                    </div>

                    <motion.div
                        ref={formRef}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="hero-form hero-form-container"
                        style={{ willChange: 'transform', marginTop: '2.5rem' }}
                    >
                        <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem', textAlign: 'center' }}>
                            Talk To Revolt
                        </h3>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group" style={{ marginBottom: '1rem' }}>
                                <label className="form-label">First Name</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    placeholder="Your Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
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
                                    required
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
                                    required
                                />
                            </div>

                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', marginTop: '1rem' }}>
                                <input 
                                    type="checkbox" 
                                    id="consent" 
                                    required 
                                    checked={isAgreed}
                                    onChange={(e) => setIsAgreed(e.target.checked)}
                                    style={{ marginTop: '0.25rem' }} 
                                />
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <label htmlFor="consent" style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', lineHeight: '1.2', whiteSpace: 'nowrap' }}>
                                        I agree to allow Revolt to call this phone number
                                    </label>
                                    <p style={{ fontSize: '0.7rem', color: 'var(--color-text-secondary)', marginTop: '0.2rem', opacity: 0.8, whiteSpace: 'nowrap' }}>
                                        We'll call you to demonstrate Revolt with a real call
                                    </p>
                                </div>
                            </div>

                            {/* Captcha - Appears after consent checked */}
                            {isAgreed && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center' }}
                                >
                                    <ReCAPTCHA
                                        ref={recaptchaRef}
                                        sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                                        onChange={(token) => {
                                            setCaptchaToken(token);
                                        }}
                                        theme="dark"
                                    />
                                </motion.div>
                            )}

                            <button 
                                type="submit" 
                                disabled={!isAgreed || isSubmitting || !captchaToken}
                                className={`btn btn-primary ${isAgreed && captchaToken ? 'sweeping-animation' : ''}`}
                                style={{ 
                                    width: '100%', 
                                    marginTop: '1.5rem', 
                                    opacity: (isSubmitting || !captchaToken) ? 0.5 : 1, 
                                    fontSize: '1.1em',
                                    transition: 'all 0.3s ease' 
                                }}
                            >
                                {isSubmitting ? 'Submitting...' : 'Call Me Now'}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
