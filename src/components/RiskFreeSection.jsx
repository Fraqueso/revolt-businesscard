import React from 'react';
import { motion } from 'framer-motion';
import { useModal } from '../context/ModalContext';

export default function RiskFreeSection() {
    const { openModal } = useModal();

    return (
        <section className="section-padding" style={{ position: 'relative', overflow: 'hidden' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1rem' }}
                    >
                        Still Not Convinced?
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        style={{ fontSize: '1.2rem', color: 'var(--color-text-secondary)', maxWidth: '600px', margin: '0 auto 2rem' }}
                    >
                        See how a leading agency increased their close rate by 312% using speed-to-lead automation. Read the full breakdown in our LinkedIn Case Study.
                    </motion.p>
                    <motion.a
                        href="/assets/Case Study Speed to Lead for Digital Marketing Agencies.pdf"
                        download="Speed_To_Lead_Case_Study.pdf"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="btn btn-primary btn-glow-hover"
                        style={{ padding: '1rem 2.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.8rem', fontSize: '1.1rem' }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="7 10 12 15 17 10"></polyline>
                            <line x1="12" y1="15" x2="12" y2="3"></line>
                        </svg>
                        Download Case Study PDF
                    </motion.a>
                </div>

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

