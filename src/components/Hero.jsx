import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import ReCAPTCHA from "react-google-recaptcha";
import { useModal } from '../context/ModalContext';

export default function Hero() {
    const { openModal, registerHeroForm } = useModal();
    const [phone, setPhone] = useState('');
    const [isAgreed, setIsAgreed] = useState(false);
    const [showCaptcha, setShowCaptcha] = useState(false);
    const [captchaToken, setCaptchaToken] = useState(null);
    const recaptchaRef = useRef(null);
    const formRef = useRef(null);

    useEffect(() => {
        if (formRef.current) {
            registerHeroForm(formRef);
        }
    }, [registerHeroForm]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (phone.length > 9) {
            setShowCaptcha(true);
        }
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
                        >
                            THERE'S VOICE AI <br />
                            <span className="text-gradient">THEN THERE'S REVOLT</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            Revolt is the first conversational AI built for speed-to-lead. It calls your leads in under 60 seconds, handles objections like a top performer, and books appointments 24/7.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}
                        >
                            <button onClick={openModal} className="btn btn-primary" style={{ fontSize: '1.2rem', padding: '1rem 2.5rem' }}>
                                Hear The Difference
                            </button>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
                                <span style={{ width: '10px', height: '10px', background: '#22c55e', borderRadius: '50%', display: 'inline-block' }}></span>
                                98% Human Accuracy
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
                    >
                        <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem', textAlign: 'center' }}>
                            Talk To Revolt
                        </h3>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label className="form-label">Phone Number</label>
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
                                    <label htmlFor="consent" style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', lineHeight: '1.4' }}>
                                        I agree to allow Revolt to call this phone number
                                    </label>
                                    <p style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginTop: '0.25rem', opacity: 0.8 }}>
                                        We'll call you to demonstrate Revolt with a real call
                                    </p>
                                </div>
                            </div>

                            <button 
                                type="submit" 
                                disabled={!isAgreed}
                                className={`btn btn-primary ${isAgreed ? 'sweeping-animation' : ''}`}
                                style={{ width: '100%', marginTop: '1.5rem' }}
                            >
                                Call Me Now
                            </button>
                            {showCaptcha && (
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
                                            console.log('Captcha verified! Token:', token);
                                        }}
                                        theme="dark"
                                    />
                                </motion.div>
                            )}
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
