import React from 'react';
import { motion } from 'framer-motion';
import { useModal } from '../context/ModalContext';

export default function RiskFreeSection() {
    const { openModal } = useModal();

    return (
        <section className="section-padding" style={{ position: 'relative', overflow: 'hidden' }}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    style={{
                        background: 'linear-gradient(135deg, rgba(112, 66, 248, 0.1) 0%, rgba(3, 0, 20, 0.4) 100%)',
                        border: '1px solid var(--color-primary)',
                        borderRadius: '1rem',
                        padding: '4rem 2rem',
                        textAlign: 'center',
                        position: 'relative',
                        maxWidth: '900px',
                        margin: '0 auto'
                    }}
                >
                    {/* Glow effect */}
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '100%',
                        height: '100%',
                        background: 'radial-gradient(circle at center, rgba(112, 66, 248, 0.15) 0%, transparent 70%)',
                        pointerEvents: 'none'
                    }} />

                    <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '1.5rem' }}>
                        Try Revolt <span className="text-gradient">Risk-Free</span>
                    </h2>
                    
                    <p style={{ fontSize: '1.25rem', color: 'var(--color-text)', marginBottom: '1rem', fontWeight: '500' }}>
                        Your first 3 days worth of calls are on us!
                    </p>
                    
                    <p style={{ fontSize: '1.1rem', color: 'var(--color-text-secondary)', marginBottom: '2.5rem', lineHeight: '1.6', maxWidth: '700px', marginLeft: 'auto', marginRight: 'auto' }}>
                        No contracts. Not unless you're satisfied. If you're not seeing results in 3 days, we'll refund every penny and part as friends.
                    </p>

                    <button 
                        onClick={openModal}
                        className="btn btn-primary btn-glow-hover"
                        style={{ fontSize: '1.2rem', padding: '1rem 3rem' }}
                    >
                        Start Your Risk-Free Trial
                    </button>
                </motion.div>
            </div>
        </section>
    );
}

