import React from 'react';
import { motion } from 'framer-motion';
import { useModal } from '../context/ModalContext';

export default function BuildProcess() {
    const { openModal } = useModal();
    const steps = [
        {
            number: "1",
            title: "Discovery Call",
            desc: "We analyze your best sales calls, objections, and close techniques. 30-minute call, zero fluff."
        },
        {
            number: "2",
            title: "Custom Training",
            desc: "We build your agent's voice, tone, and playbook from YOUR actual recordings. Not a template."
        },
        {
            number: "3",
            title: "Integration & Testing",
            desc: "We connect to your CRM, test with real scenarios, and refine until it sounds perfect."
        },
        {
            number: "4",
            title: "Go Live",
            desc: "Your agent starts calling leads in under 60 seconds. 24/7/365. Zero downtime."
        }
    ];

    return (
        <section className="section-padding" style={{ position: 'relative', overflow: 'hidden' }}>
            <div className="container">
                <motion.div
                    style={{ textAlign: 'center', marginBottom: '5rem' }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '1rem' }}>
                        How We Build <span className="text-gradient">Your Agent</span>
                    </h2>
                    <p style={{ fontSize: '1.2rem', color: 'var(--color-text-secondary)', maxWidth: '700px', margin: '0 auto' }}>
                        From discovery to deployment in 10-14 days. Custom-built for your business.
                    </p>
                </motion.div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            style={{
                                background: 'rgba(255, 255, 255, 0.03)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                borderRadius: '1rem',
                                padding: '2rem',
                                textAlign: 'center',
                                position: 'relative'
                            }}
                        >
                            <div style={{
                                fontSize: '3rem',
                                fontWeight: '800',
                                background: 'var(--gradient-primary)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                marginBottom: '1rem'
                            }}>
                                {step.number}
                            </div>
                            <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '1rem' }}>{step.title}</h3>
                            <p style={{ color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>{step.desc}</p>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    style={{ textAlign: 'center' }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                >
                    <button onClick={openModal} className="btn btn-primary btn-glow-hover" style={{ fontSize: '1.2rem', padding: '1rem 3rem' }}>
                        Book A Demo
                    </button>
                </motion.div>
            </div>
        </section>
    );
}
