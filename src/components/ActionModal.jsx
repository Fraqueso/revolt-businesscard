import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReCAPTCHA from "react-google-recaptcha";
import Cal, { getCalApi } from "@calcom/embed-react";
import { useModal } from '../context/ModalContext';
import { submitToN8n } from '../utils/api';

// Inline Icons
const CheckIcon = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

const CheckCircleIcon = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
  </svg>
);

const ChevronLeftIcon = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M15 18l-6-6 6-6" />
  </svg>
);

const CloseIcon = ({ className, style }) => (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);

export default function ActionModal() {
    const { isModalOpen, closeModal, scrollToHero } = useModal();
    // Steps: initial, demo-choice, phone-input, email-qualification, email-calendar, email-confirmation
    const [step, setStep] = useState('initial'); 
    const [formData, setFormData] = useState({ 
        name: '', 
        email: '', 
        phone: '',
        interactions: '',
        needs: [],
        painPoint: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showCaptcha, setShowCaptcha] = useState(false);
    const [captchaToken, setCaptchaToken] = useState(null);
    const [isAgreed, setIsAgreed] = useState(false);
    const recaptchaRef = useRef(null);

    // Initialize Cal.com
    useEffect(() => {
        (async function () {
            const cal = await getCalApi({"namespace":"demo"});
            cal("ui", {"theme":"dark","cssVarsPerTheme":{"dark":{"cal-brand":"#8B5CF6"}},"hideEventTypeDetails":false,"layout":"month_view"});
            
            cal("on", {
                action: "bookingSuccessful",
                callback: async (e) => {
                    // e.detail.data contains booking info
                    
                    // Send final booking confirmation to n8n
                    try {
                        await submitToN8n({
                            source: 'action_modal_booking',
                            type: 'booking_confirmed',
                            email: formData.email, // Tie back to the user
                            bookingData: e.detail.data
                        });
                    } catch (error) {
                        console.error("Failed to send booking data:", error);
                    }

                    setStep('email-confirmation');
                }
            });
        })();
    }, []);

    // Lock body scroll
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

    const resetModal = () => {
        setStep('initial');
        setFormData({ name: '', email: '', phone: '', interactions: '', needs: [], painPoint: '' });
        setShowCaptcha(false);
        setCaptchaToken(null);
        setIsAgreed(false);
        setIsSubmitting(false);
    };

    const handleClose = () => {
        closeModal();
        // Delay reset slightly to allow exit animation
        setTimeout(resetModal, 300);
    };

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            handleClose();
        }
    };

    const handleTryItYourself = () => {
        scrollToHero();
        resetModal();
    };

    // Handle Phone Submission (Legacy/Alternative flow)
    const performPhoneSubmission = async (token) => {
        setIsSubmitting(true);
        try {
            const payload = {
                source: 'action_modal',
                type: 'phone',
                captchaToken: token,
                phone: formData.phone,
                email: formData.email,
                name: formData.name
            };
            
            await submitToN8n(payload);
            alert("Sweet! We'll Call You Immediately, Make Sure You're Not on DND");
            handleClose();
        } catch (error) {
            console.error(error);
            alert(`Error: ${error.message || 'Something went wrong.'}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handlePhoneSubmit = (e) => {
        e.preventDefault();
        // Always require captcha token before submitting
        if (captchaToken) {
            performPhoneSubmission(captchaToken);
        }
    };

    // --- Multi-step Email Flow Handlers ---

    const handleQualificationSubmit = async (e) => {
        e.preventDefault();
        
        // Send qualification data to n8n immediately
        try {
            await submitToN8n({
                source: 'action_modal_qualification',
                type: 'email_qualification',
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                interactions: formData.interactions,
                needs: formData.needs,
                painPoint: formData.painPoint
            });
        } catch (error) {
            console.error("Failed to send qualification data:", error);
            // Continue to calendar step anyway so user isn't blocked
        }

        setStep('email-calendar');
    };

    const toggleNeed = (need) => {
        setFormData(prev => {
            const needs = prev.needs.includes(need)
                ? prev.needs.filter(n => n !== need)
                : [...prev.needs, need];
            return { ...prev, needs };
        });
    };

    const getStepIndicator = () => {
        const steps = ['Details', 'Schedule', 'Confirmed'];
        let currentIdx = 0;
        if (step === 'email-qualification') currentIdx = 0;
        if (step === 'email-calendar') currentIdx = 1;
        if (step === 'email-confirmation') currentIdx = 2;

        return (
            <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', marginBottom: '30px' }}>
                {steps.map((label, idx) => {
                    let color = 'rgba(255,255,255,0.3)'; // Upcoming
                    if (idx < currentIdx) color = '#22C55E'; // Completed
                    if (idx === currentIdx) color = '#8B5CF6'; // Active

                    return (
                        <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                            <div style={{ 
                                width: '12px', 
                                height: '12px', 
                                borderRadius: '50%', 
                                background: color,
                                transition: 'background 0.3s'
                            }} />
                            <span style={{ 
                                fontSize: '12px', 
                                color: idx === currentIdx ? 'white' : 'rgba(255,255,255,0.5)',
                                fontWeight: idx === currentIdx ? '600' : '400'
                            }}>
                                {label}
                            </span>
                        </div>
                    );
                })}
            </div>
        );
    };

    // Animation variants
    const contentVariants = {
        hidden: { opacity: 0, x: 20 },
        visible: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -20 }
    };

    if (!isModalOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleBackdropClick}
                style={{
                    position: 'fixed',
                    top: 0, left: 0, right: 0, bottom: 0,
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
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    style={{
                        background: '#0A0A1A',
                        border: '1px solid rgba(139, 92, 246, 0.3)',
                        borderRadius: '16px',
                        padding: '40px',
                        width: '100%',
                        maxWidth: '600px',
                        boxShadow: '0 0 60px rgba(139, 92, 246, 0.15)',
                        position: 'relative',
                        maxHeight: '90vh',
                        overflowY: 'auto'
                    }}
                >
                    {/* Close Button */}
                    <button
                        onClick={handleClose}
                        className="modal-close-btn"
                        style={{
                            position: 'absolute',
                            top: '20px',
                            right: '20px',
                            background: 'none',
                            border: 'none',
                            color: 'rgba(255,255,255,0.5)',
                            cursor: 'pointer',
                            padding: '5px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'color 0.2s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
                        onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
                    >
                        <CloseIcon style={{ width: '24px', height: '24px' }} />
                    </button>

                    {/* Only show step indicator for email flow */}
                    {['email-qualification', 'email-calendar', 'email-confirmation'].includes(step) && getStepIndicator()}

                    {/* Content Container */}
                    <div style={{ position: 'relative' }}>
                        
                        {/* STEP: INITIAL */}
                        {step === 'initial' && (
                            <motion.div variants={contentVariants} initial="visible" animate="visible" exit="exit">
                                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                                    <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '1rem', color: 'white' }}>Talk to Revolt</h2>
                                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '16px' }}>
                                        Book a call with our team
                                    </p>
                                </div>
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
                            </motion.div>
                        )}

                        {/* STEP: DEMO CHOICE */}
                        {step === 'demo-choice' && (
                            <motion.div variants={contentVariants} initial="hidden" animate="visible" exit="exit">
                                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                                    <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '0.5rem', color: 'white' }}>How would you like to connect?</h2>
                                </div>
                                <div style={{ display: 'grid', gap: '1rem' }}>
                                    <button
                                        onClick={() => setStep('phone-input')}
                                        className="btn-glass-pill"
                                    >
                                        Call Me Now (Phone)
                                    </button>
                                    <button
                                        onClick={() => setStep('email-qualification')}
                                        className="btn-glass-pill"
                                    >
                                        Schedule a Call (Calendar)
                                    </button>
                                    <button
                                        onClick={() => setStep('initial')}
                                        style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', marginTop: '0.5rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                                        onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
                                        onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
                                    >
                                        <ChevronLeftIcon style={{ width: '16px', height: '16px' }} /> Back
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {/* STEP: PHONE INPUT (Legacy) */}
                        {step === 'phone-input' && (
                            <motion.div variants={contentVariants} initial="hidden" animate="visible" exit="exit">
                                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                                    <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white' }}>Get an Instant Call</h2>
                                </div>
                                <form onSubmit={handlePhoneSubmit} style={{ display: 'grid', gap: '1rem' }}>
                                    {/* ... Existing Phone Form Inputs ... */}
                                    <div>
                                        <label className="modal-label">First Name</label>
                                        <input
                                            type="text"
                                            className="modal-input"
                                            placeholder="Your Name"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="modal-label">Email <span style={{ color: '#8B5CF6' }}>*</span></label>
                                        <input
                                            type="email"
                                            className="modal-input"
                                            required
                                            placeholder="you@company.com"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="modal-label">Phone Number <span style={{ color: '#8B5CF6' }}>*</span></label>
                                        <input
                                            type="tel"
                                            className="modal-input"
                                            required
                                            placeholder="(555) 123-4567"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        />
                                    </div>
                                    
                                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                                        <input 
                                            type="checkbox" 
                                            id="phone-consent" 
                                            required 
                                            checked={isAgreed}
                                            onChange={(e) => setIsAgreed(e.target.checked)}
                                            style={{ marginTop: '0.25rem' }} 
                                        />
                                        <label htmlFor="phone-consent" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', lineHeight: '1.4' }}>
                                            I agree to allow Revolt to call this phone number. We'll call you to demonstrate Revolt with a real call.
                                        </label>
                                    </div>

                                    {/* Captcha appears immediately when agreed, just like Hero form */}
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
                                        className="modal-cta-btn"
                                        disabled={!isAgreed || isSubmitting || !captchaToken}
                                        style={{ marginTop: '1rem', opacity: (!isAgreed || !captchaToken) ? 0.5 : 1 }}
                                    >
                                        {isSubmitting ? 'Calling...' : 'Call Me Now'}
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setStep('demo-choice')}
                                        className="modal-back-btn"
                                    >
                                        <ChevronLeftIcon style={{ width: '16px', height: '16px' }} /> Back
                                    </button>
                                </form>
                            </motion.div>
                        )}

                        {/* STEP 1: QUALIFICATION FORM */}
                        {step === 'email-qualification' && (
                            <motion.div variants={contentVariants} initial="hidden" animate="visible" exit="exit">
                                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                                    <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>
                                        Get Your Custom Agent Built
                                    </h2>
                                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '16px' }}>
                                        Quick details so we can personalize your demo.
                                    </p>
                                </div>

                                <form onSubmit={handleQualificationSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                    <div>
                                        <label className="modal-label">Name <span style={{ color: '#8B5CF6' }}>*</span></label>
                                        <input
                                            type="text"
                                            required
                                            className="modal-input"
                                            placeholder="Your full name"
                                            value={formData.name}
                                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        />
                                    </div>

                                    <div>
                                        <label className="modal-label">Work Email <span style={{ color: '#8B5CF6' }}>*</span></label>
                                        <input
                                            type="email"
                                            required
                                            className="modal-input"
                                            placeholder="you@company.com"
                                            value={formData.email}
                                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                                        />
                                        <div className="modal-helper">We'll send your calendar invite here.</div>
                                    </div>

                                    <div>
                                        <label className="modal-label">Phone <span style={{ color: '#8B5CF6' }}>*</span></label>
                                        <input
                                            type="tel"
                                            required
                                            className="modal-input"
                                            placeholder="Phone number"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                        />
                                        <div className="modal-helper">We don't sell your information. We won't spam you.</div>
                                    </div>

                                    <div>
                                        <label className="modal-label">How many customer interactions per month?</label>
                                        <select 
                                            className="modal-input" 
                                            value={formData.interactions}
                                            onChange={(e) => setFormData({...formData, interactions: e.target.value})}
                                        >
                                            <option value="">Select...</option>
                                            <option value="<1k">Less than 1,000</option>
                                            <option value="1k-5k">1,000 – 4,999</option>
                                            <option value="5k-50k">5,000 – 49,999</option>
                                            <option value="50k+">50,000+</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="modal-label">What do you need help with?</label>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                                            {['Inbound Calls', 'Speed-to-Lead', 'Outbound Sales', 'Appointment Setting', 'After-Hours Coverage', 'Other'].map(opt => (
                                                <label key={opt} className="checkbox-label">
                                                    <input 
                                                        type="checkbox" 
                                                        checked={formData.needs.includes(opt)}
                                                        onChange={() => toggleNeed(opt)}
                                                    />
                                                    <span>{opt}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="modal-label">Biggest pain point right now?</label>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                            {[
                                                'Leads going cold before we call back', 
                                                'Missing calls outside business hours',
                                                'Reps are inconsistent',
                                                "Can't scale without hiring",
                                                'Current AI sounds too robotic'
                                            ].map(opt => (
                                                <label key={opt} className="radio-label">
                                                    <input 
                                                        type="radio" 
                                                        name="painPoint"
                                                        value={opt}
                                                        checked={formData.painPoint === opt}
                                                        onChange={(e) => setFormData({...formData, painPoint: e.target.value})}
                                                    />
                                                    <span>{opt}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    <div style={{ marginTop: '10px' }}>
                                        <button type="submit" className="modal-cta-btn">
                                            Next: Pick a Time →
                                        </button>
                                        <p style={{ textAlign: 'center', fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginTop: '10px' }}>
                                            Takes 30 seconds. No spam.
                                        </p>
                                    </div>
                                </form>
                            </motion.div>
                        )}

                        {/* STEP 2: CALENDAR */}
                        {step === 'email-calendar' && (
                            <motion.div variants={contentVariants} initial="hidden" animate="visible" exit="exit">
                                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                                    <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', marginBottom: '4px' }}>
                                        Pick a Time
                                    </h2>
                                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>
                                        30-min call with the Revolt team
                                    </p>
                                </div>

                                <div style={{ marginBottom: '20px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', padding: '16px' }}>
                                    <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', marginBottom: '10px' }}>On this call, we'll:</p>
                                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '8px' }}>
                                        {[
                                            'Hear how your team handles calls today',
                                            'Map your ideal customer flow',
                                            'Demo a custom Revolt agent',
                                            'Plan your deployment timeline'
                                        ].map(item => (
                                            <li key={item} style={{ display: 'flex', gap: '10px', fontSize: '14px', color: 'rgba(255,255,255,0.7)' }}>
                                                <span style={{ color: '#22C55E' }}>✓</span> {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div style={{ height: '400px', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
                                    <Cal 
                                        namespace="demo"
                                        calLink={`dantebrunelli/demo?name=${encodeURIComponent(formData.name)}&email=${encodeURIComponent(formData.email)}&phone=${encodeURIComponent(formData.phone)}`}
                                        style={{width:"100%",height:"100%",overflow:"scroll"}}
                                        config={{"layout":"month_view","theme":"dark"}}
                                    />
                                </div>

                                <button
                                    onClick={() => setStep('email-qualification')}
                                    className="modal-back-btn"
                                    style={{ marginTop: '20px' }}
                                >
                                    <ChevronLeftIcon style={{ width: '16px', height: '16px' }} /> Back
                                </button>
                            </motion.div>
                        )}

                        {/* STEP 3: CONFIRMATION */}
                        {step === 'email-confirmation' && (
                            <motion.div variants={contentVariants} initial="hidden" animate="visible" exit="exit" style={{ textAlign: 'center' }}>
                                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                                    <CheckCircleIcon style={{ width: '48px', height: '48px', color: '#22C55E' }} />
                                </div>
                                <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>
                                    You're In.
                                </h2>
                                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '16px', marginBottom: '32px' }}>
                                    Your Revolt Discovery Call is booked.
                                </p>

                                <div style={{ 
                                    background: 'rgba(255,255,255,0.05)', 
                                    border: '1px solid rgba(255,255,255,0.1)', 
                                    borderRadius: '12px', 
                                    padding: '20px',
                                    textAlign: 'left',
                                    marginBottom: '24px'
                                }}>
                                    <div style={{ display: 'grid', gap: '12px' }}>
                                        {/* Note: In a real app, we'd pull actual booked time from Cal.com event data */}
                                        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', color: 'white' }}>
                                            <span style={{ opacity: 0.5 }}>📅</span> Check your email for date & time
                                        </div>
                                        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', color: 'white' }}>
                                            <span style={{ opacity: 0.5 }}>📍</span> Cal Video (link in your email)
                                        </div>
                                    </div>
                                </div>

                                <div style={{ textAlign: 'left', marginBottom: '32px' }}>
                                    <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: 'white', marginBottom: '12px' }}>What happens next:</h3>
                                    <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '12px' }}>
                                        {[
                                            'Check your inbox — Calendar invite coming in 2 min',
                                            'Optional: Send us a recording of your best sales call',
                                            "Show up — We'll have a custom demo ready for you"
                                        ].map((item, i) => (
                                            <li key={i} style={{ display: 'flex', gap: '12px', fontSize: '14px', color: 'rgba(255,255,255,0.7)' }}>
                                                <span style={{ color: '#8B5CF6', fontWeight: 'bold' }}>{i + 1}.</span> {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <button onClick={handleClose} className="modal-cta-btn" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}>
                                    Done
                                </button>
                                
                                <a 
                                    href="#" 
                                    onClick={(e) => { e.preventDefault(); setStep('email-calendar'); }}
                                    style={{ display: 'block', marginTop: '16px', fontSize: '12px', color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}
                                    onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                                    onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
                                >
                                    Need to reschedule? No problem.
                                </a>
                            </motion.div>
                        )}

                    </div>
                </motion.div>

                {/* Modal Styles */}
                <style>{`
                    .modal-label {
                        display: block;
                        margin-bottom: 6px;
                        color: rgba(255,255,255,0.7);
                        font-size: 14px;
                        font-weight: 500;
                    }
                    .modal-input {
                        width: 100%;
                        padding: 12px 16px;
                        background: rgba(255,255,255,0.05);
                        border: 1px solid rgba(255,255,255,0.1);
                        border-radius: 8px;
                        color: white;
                        font-size: 16px;
                        transition: all 0.2s;
                    }
                    .modal-input option {
                        background: #0A0A1A; /* Match modal background */
                        color: white;
                    }
                    .modal-input:focus {
                        outline: none;
                        border-color: #8B5CF6;
                        background: rgba(255,255,255,0.08);
                    }
                    .modal-helper {
                        font-size: 12px;
                        color: rgba(255,255,255,0.4);
                        margin-top: 4px;
                    }
                    .modal-cta-btn {
                        width: 100%;
                        padding: 16px;
                        background: #8B5CF6;
                        color: white;
                        border: none;
                        border-radius: 8px;
                        font-weight: bold;
                        font-size: 16px;
                        cursor: pointer;
                        transition: all 0.2s;
                    }
                    .modal-cta-btn:hover {
                        filter: brightness(1.1);
                        transform: scale(1.02);
                    }
                    .modal-back-btn {
                        background: none;
                        border: none;
                        color: rgba(255,255,255,0.5);
                        cursor: pointer;
                        display: flex;
                        align-items: center;
                        gap: 0.5rem;
                        font-size: 14px;
                        padding: 0;
                        transition: color 0.2s;
                    }
                    .modal-back-btn:hover {
                        color: white;
                    }
                    
                    /* Custom Checkbox/Radio Styling */
                    .checkbox-label, .radio-label {
                        display: flex;
                        align-items: center;
                        gap: 10px;
                        cursor: pointer;
                        font-size: 14px;
                        color: rgba(255,255,255,0.8);
                        padding: 8px 0;
                    }
                    .checkbox-label input, .radio-label input {
                        accent-color: #8B5CF6;
                        width: 16px;
                        height: 16px;
                    }
                `}</style>
            </motion.div>
        </AnimatePresence>
    );
}
