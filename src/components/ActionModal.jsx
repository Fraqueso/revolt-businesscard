import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReCAPTCHA from "react-google-recaptcha";
import Cal, { getCalApi } from "@calcom/embed-react";
import { useModal } from '../context/ModalContext';
import { submitToN8n } from '../utils/api';

export default function ActionModal() {
    const { isModalOpen, closeModal, scrollToHero } = useModal();
    const [step, setStep] = useState('initial'); // initial, demo-choice, phone-input, email-input
    const [formData, setFormData] = useState({ phone: '', email: '', name: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showCaptcha, setShowCaptcha] = useState(false);
    const [captchaToken, setCaptchaToken] = useState(null);
    const [isAgreed, setIsAgreed] = useState(false);
    const recaptchaRef = useRef(null);

    useEffect(() => {
        (async function () {
            const cal = await getCalApi({"namespace":"demo"});
            cal("ui", {"theme":"dark","cssVarsPerTheme":{"dark":{"cal-brand":"#433dbf"}},"hideEventTypeDetails":false,"layout":"month_view"});
        })();
    }, []);

    // Lock body scroll when modal is open
    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isModalOpen]);

    if (!isModalOpen) return null;

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            closeModal();
            setStep('initial');
            setShowCaptcha(false);
            setCaptchaToken(null);
            setIsAgreed(false);
        }
    };

    const handleTryItYourself = () => {
        scrollToHero();
        setStep('initial');
    };

    const performSubmission = async (token) => {
        setIsSubmitting(true);
        try {
            // Determine the data payload based on the current step
            const payload = {
                source: 'action_modal',
                type: step === 'phone-input' ? 'phone' : 'email',
                captchaToken: token
            };

            if (step === 'phone-input') {
                payload.phone = formData.phone;
                // Add email if present in the phone input step
                if (formData.email) payload.email = formData.email;
            } else {
                payload.email = formData.email;
            }
            
            // Add name if present
            if (formData.name) payload.name = formData.name;

            await submitToN8n(payload);
            alert("Sweet! We'll Call You Immediately, Make Sure You're Not on DND");
            closeModal();
            setStep('initial');
            setFormData({ phone: '', email: '', name: '' });
            setShowCaptcha(false);
            setCaptchaToken(null);
            setIsAgreed(false);
        } catch (error) {
            console.error(error);
            alert(`Error: ${error.message || 'Something went wrong. Please check your connection.'}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (captchaToken) {
            performSubmission(captchaToken);
        } else {
            setShowCaptcha(true);
        }
    };

    return (
        <AnimatePresence>
            {isModalOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={handleBackdropClick}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(0, 0, 0, 0.8)',
                        backdropFilter: 'blur(5px)',
                        zIndex: 1000,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '1rem'
                    }}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        style={{
                            background: 'var(--color-bg-secondary)',
                            border: '1px solid var(--color-border)',
                            borderRadius: 'var(--radius-lg)',
                            padding: '3rem',
                            width: '100%',
                            maxWidth: '750px',
                            position: 'relative',
                            // Removed inline boxShadow to let class handle it
                        }}
                        className="breathing-glow"
                    >
                        <button
                            onClick={() => { closeModal(); setStep('initial'); }}
                            style={{
                                position: 'absolute',
                                top: '1rem',
                                right: '1rem',
                                background: 'none',
                                border: 'none',
                                color: 'var(--color-text-secondary)',
                                cursor: 'pointer',
                                fontSize: '1.5rem'
                            }}
                        >
                            ×
                        </button>

                        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                            <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '1rem' }}>Talk to Revolt</h2>
                            <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.2rem' }}>
                                Book a call with our team
                            </p>
                        </div>

                        {step === 'initial' && (
                            <div style={{ display: 'grid', gap: '1rem' }}>
                                <button
                                    onClick={() => setStep('demo-choice')}
                                    className="btn-glass-pill"
                                >
                                    Book a Demo
                                </button>
                                <button
                                    onClick={handleTryItYourself}
                                    className="btn-glass-pill"
                                >
                                    Try it out for yourself
                                </button>
                            </div>
                        )}

                        {step === 'demo-choice' && (
                            <div style={{ display: 'grid', gap: '1rem' }}>
                                <button
                                    onClick={() => setStep('phone-input')}
                                    className="btn-glass-pill"
                                >
                                    By Phone
                                </button>
                                <button
                                    onClick={() => setStep('email-captcha')}
                                    className="btn-glass-pill"
                                >
                                    By Email
                                </button>
                                <button
                                    onClick={() => setStep('initial')}
                                    style={{ background: 'none', border: 'none', color: 'var(--color-text-secondary)', marginTop: '0.5rem', cursor: 'pointer' }}
                                >
                                    Back
                                </button>
                            </div>
                        )}

                        {step === 'phone-input' && (
                            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-text-secondary)' }}>First Name</label>
                                    <input
                                        type="text"
                                        placeholder="Your Name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem',
                                            background: 'rgba(0, 0, 0, 0.2)',
                                            border: '1px solid var(--color-border)',
                                            borderRadius: '0.5rem',
                                            color: 'white',
                                            fontSize: '16px'
                                        }}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-text-secondary)' }}>
                                        Email <span style={{ color: 'var(--color-primary)' }}>*</span>
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        placeholder="your@email.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem',
                                            background: 'rgba(0, 0, 0, 0.2)',
                                            border: '1px solid var(--color-border)',
                                            borderRadius: '0.5rem',
                                            color: 'white',
                                            fontSize: '16px'
                                        }}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-text-secondary)' }}>
                                        Phone Number <span style={{ color: 'var(--color-primary)' }}>*</span>
                                    </label>
                                    <input
                                        type="tel"
                                        required
                                        placeholder="(555) 123-4567"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem',
                                            background: 'rgba(0, 0, 0, 0.2)',
                                            border: '1px solid var(--color-border)',
                                            borderRadius: '0.5rem',
                                            color: 'white',
                                            fontSize: '16px'
                                        }}
                                    />
                                </div>
                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                                    <input 
                                        type="checkbox" 
                                        id="modal-consent" 
                                        required 
                                        checked={isAgreed}
                                        onChange={(e) => setIsAgreed(e.target.checked)}
                                        style={{ marginTop: '0.25rem' }} 
                                    />
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <label htmlFor="modal-consent" style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: '1.2', cursor: 'pointer' }}>
                                            I agree to allow Revolt to call this phone number
                                        </label>
                                        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginTop: '0.2rem', opacity: 0.8 }}>
                                            We'll call you to demonstrate Revolt with a real call
                                        </p>
                                    </div>
                                </div>
                                <button 
                                    type="submit" 
                                    className={`btn btn-primary ${isAgreed ? 'sweeping-animation' : (formData.phone.length > 0 ? 'btn-glow-border' : '')}`}
                                    style={{ width: '100%', padding: '1rem', opacity: isSubmitting ? 0.7 : 1 }}
                                    disabled={!isAgreed || isSubmitting}
                                >
                                    {isSubmitting ? 'Submitting...' : 'Submit'}
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
                                                performSubmission(token);
                                            }}
                                            theme="dark"
                                        />
                                    </motion.div>
                                )}

                                <button
                                    type="button"
                                    onClick={() => setStep('demo-choice')}
                                    style={{ background: 'none', border: 'none', color: 'var(--color-text-secondary)', marginTop: '0.5rem', cursor: 'pointer' }}
                                >
                                    Back
                                </button>
                            </form>
                        )}

                        {step === 'email-captcha' && (
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                                <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>
                                    Please verify you are human to continue
                                </p>
                                <ReCAPTCHA
                                    sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                                    onChange={(token) => {
                                        if (token) {
                                            setStep('email-input');
                                        }
                                    }}
                                    theme="dark"
                                />
                                <button
                                    type="button"
                                    onClick={() => setStep('demo-choice')}
                                    style={{ background: 'none', border: 'none', color: 'var(--color-text-secondary)', marginTop: '1rem', cursor: 'pointer' }}
                                >
                                    Back
                                </button>
                            </div>
                        )}

                        {step === 'email-input' && (
                            <div style={{ display: 'grid', gap: '1rem', height: '450px' }}>
                                <Cal 
                                    namespace="demo"
                                    calLink="dantebrunelli/demo"
                                    style={{width:"100%",height:"100%",overflow:"scroll"}}
                                    config={{"layout":"month_view","theme":"dark"}}
                                />
                                <button
                                    type="button"
                                    onClick={() => setStep('demo-choice')}
                                    style={{ background: 'none', border: 'none', color: 'var(--color-text-secondary)', marginTop: '0.5rem', cursor: 'pointer' }}
                                >
                                    Back
                                </button>
                            </div>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
