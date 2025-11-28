import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useModal } from '../context/ModalContext';

export default function ActionModal() {
    const { isModalOpen, closeModal, scrollToHero } = useModal();
    const [step, setStep] = useState('initial'); // initial, demo-choice, phone-input, email-input
    const [formData, setFormData] = useState({ phone: '', email: '' });

    if (!isModalOpen) return null;

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            closeModal();
            setStep('initial');
        }
    };

    const handleTryItYourself = () => {
        scrollToHero();
        setStep('initial');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would handle the actual submission logic
        alert("Thanks! We'll be in touch shortly.");
        closeModal();
        setStep('initial');
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
                            padding: '2rem',
                            width: '100%',
                            maxWidth: '500px',
                            position: 'relative',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                        }}
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

                        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                            <h2 style={{ fontSize: '1.8rem', fontWeight: '700', marginBottom: '0.5rem' }}>Talk to Revolt</h2>
                            <p style={{ color: 'var(--color-text-secondary)' }}>
                                We'll call you to demonstrate Revolt with a real call
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
                                    onClick={() => setStep('email-input')}
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
                                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-text-secondary)' }}>Phone Number</label>
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
                                <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem' }}>
                                    Submit
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setStep('demo-choice')}
                                    style={{ background: 'none', border: 'none', color: 'var(--color-text-secondary)', marginTop: '0.5rem', cursor: 'pointer' }}
                                >
                                    Back
                                </button>
                            </form>
                        )}

                        {step === 'email-input' && (
                            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-text-secondary)' }}>Business Email</label>
                                    <input
                                        type="email"
                                        required
                                        placeholder="john@company.com"
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
                                <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem' }}>
                                    Submit
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setStep('demo-choice')}
                                    style={{ background: 'none', border: 'none', color: 'var(--color-text-secondary)', marginTop: '0.5rem', cursor: 'pointer' }}
                                >
                                    Back
                                </button>
                            </form>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
