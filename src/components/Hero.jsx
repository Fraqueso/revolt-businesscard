import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import ReCAPTCHA from 'react-google-recaptcha';

export default function Hero() {
    const [textIndex, setTextIndex] = useState(0);
    const [agreedToCall, setAgreedToCall] = useState(false);
    const [showCaptcha, setShowCaptcha] = useState(false);
    const [captchaToken, setCaptchaToken] = useState(null);
    const recaptchaRef = useRef(null);
    const texts = ["Service Businesses", "HVAC Pros", "Plumbers", "Electricians"];

    useEffect(() => {
        const interval = setInterval(() => {
            setTextIndex((prev) => {
                if (prev === texts.length) {
                    return 1;
                }
                return prev + 1;
            });
        }, 3000);
        return () => clearInterval(interval);
    }, [texts.length]);

    return (
        <section className="hero">
            <div className="container hero-content">
                <motion.div
                    className="hero-text"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    style={{ position: 'relative' }}
                >
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '600px',
                        height: '600px',
                        background: 'radial-gradient(circle, rgba(112, 66, 248, 0.15) 0%, transparent 70%)',
                        zIndex: -1,
                        filter: 'blur(40px)',
                        pointerEvents: 'none'
                    }} />
                    <h1>
                        The AI Employee for <br />
                        <span style={{ display: 'inline-flex', height: '1.2em', overflow: 'hidden', verticalAlign: 'bottom', position: 'relative' }}>
                            <motion.div
                                animate={{ y: `-${textIndex * 100}%` }}
                                transition={{ duration: textIndex === 0 ? 0 : 0.8, ease: "easeInOut" }}
                                style={{ display: 'flex', flexDirection: 'column' }}
                                onAnimationComplete={() => {
                                    if (textIndex === texts.length) {
                                        setTextIndex(0);
                                    }
                                }}
                            >
                                {texts.map((text, i) => (
                                    <span key={i} className="text-gradient" style={{ height: '1.2em', display: 'block', lineHeight: '1.2em' }}>
                                        {text}
                                    </span>
                                ))}
                                <span className="text-gradient" style={{ height: '1.2em', display: 'block', lineHeight: '1.2em' }}>
                                    {texts[0]}
                                </span>
                            </motion.div>
                        </span>
                    </h1>
                    <p>
                        Revolt answers calls, schedules appointments, and manages your leads 24/7.
                        Stop missing business and start growing with the first AI designed for the trades.
                    </p>

                    <div className="hero-stats">
                        {[
                            { val: "24/7", label: "Availability" },
                            { val: "< 1s", label: "Response Time" },
                            { val: "100%", label: "Lead Capture" }
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                className="stat-item"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 + (i * 0.1) }}
                            >
                                <h3>{stat.val}</h3>
                                <p>{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    className="hero-form-card"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    style={{
                        background: 'rgba(255, 255, 255, 0.03)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '1rem',
                        padding: '2rem',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
                    }}
                >
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        if (!showCaptcha) {
                            setShowCaptcha(true);
                        }
                    }}>
                        <div className="form-group" style={{ marginBottom: '1rem' }}>
                            <label className="form-label">Full Name</label>
                            <input type="text" className="form-input" placeholder="John Doe" />
                        </div>
                        <div className="form-group" style={{ marginBottom: '1rem' }}>
                            <label className="form-label">Business Email</label>
                            <input type="email" className="form-input" placeholder="john@company.com" />
                        </div>
                        <div className="form-group" style={{ marginBottom: '1rem' }}>
                            <label className="form-label">Phone Number</label>
                            <input type="tel" className="form-input" placeholder="(555) 123-4567" />
                        </div>
                        <motion.button
                            type="submit"
                            className="btn btn-accent"
                            style={{
                                width: '100%',
                                marginTop: '1rem',
                                position: 'relative',
                                overflow: 'hidden',
                                opacity: agreedToCall ? 1 : 0.5,
                                cursor: agreedToCall ? 'pointer' : 'not-allowed'
                            }}
                            whileHover={agreedToCall ? { scale: 1.02, boxShadow: "0 0 30px rgba(112, 66, 248, 0.6)" } : {}}
                            whileTap={agreedToCall ? { scale: 0.98 } : {}}
                            disabled={!agreedToCall}
                        >
                            <span style={{ position: 'relative', zIndex: 1 }}>Talk to Revolt</span>
                            {agreedToCall && (
                                <motion.div
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                                        translateX: '-100%'
                                    }}
                                    animate={{ translateX: ['-100%', '100%'] }}
                                    transition={{ repeat: Infinity, duration: 2, ease: "linear", repeatDelay: 3 }}
                                />
                            )}
                        </motion.button>
                        <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <input
                                type="checkbox"
                                id="phone-consent"
                                checked={agreedToCall}
                                onChange={(e) => setAgreedToCall(e.target.checked)}
                                style={{
                                    width: '16px',
                                    height: '16px',
                                    cursor: 'pointer',
                                    accentColor: 'var(--color-primary)'
                                }}
                            />
                            <label
                                htmlFor="phone-consent"
                                style={{
                                    fontSize: '0.8rem',
                                    color: 'var(--color-text-secondary)',
                                    cursor: 'pointer',
                                    userSelect: 'none'
                                }}
                            >
                                I agree to allow Revolt to call this phone number
                            </label>
                        </div>
                        <p style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: 'var(--color-text-secondary)', textAlign: 'center' }}>
                            We'll call you instantly to demonstrate Revolt
                        </p>
                        {showCaptcha && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center' }}
                            >
                                <ReCAPTCHA
                                    ref={recaptchaRef}
                                    sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" // Test key - replace with your actual key
                                    onChange={(token) => {
                                        setCaptchaToken(token);
                                        // TODO: Call your webhook here with the form data and captcha token
                                        console.log('Captcha verified! Token:', token);
                                        console.log('Ready to call webhook with form data');
                                        // Example webhook call:
                                        // fetch('/api/webhook', {
                                        //   method: 'POST',
                                        //   body: JSON.stringify({ captchaToken: token, formData: {...} })
                                        // });
                                    }}
                                    theme="dark"
                                />
                            </motion.div>
                        )}
                    </form>
                </motion.div>
            </div>
        </section>
    );
}
