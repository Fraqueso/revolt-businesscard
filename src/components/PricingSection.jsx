import React from 'react';
import { motion } from 'framer-motion';
import { useModal } from '../context/ModalContext';

export default function PricingSection() {
    const { openModal } = useModal();

    const tiers = [
        {
            name: "Starter",
            target: "Solopreneur",
            desc: "Least flexible, perfect for handling inbound calls.",
            features: [
                "AI Receptionist",
                "Basic Call Forwarding",
                "Voicemail Transcription",
                "Email Notifications",
                "Standard Voice Options"
            ],
            highlight: false
        },
        {
            name: "Growth",
            target: "SMB",
            desc: "Multi-channel support for growing businesses.",
            features: [
                "Everything in Starter",
                "SMS Capabilities",
                "Webchat Widget",
                "Phone Support",
                "CRM Integration (Basic)",
                "Custom Knowledge Base"
            ],
            highlight: true
        },
        {
            name: "Enterprise",
            target: "Large Scale",
            desc: "Full suite of tools for maximum impact.",
            price: "Custom Pricing",
            features: [
                "Everything in Growth",
                "Full Suite of Tools",
                "Advanced CRM Workflows",
                "Inbound & Outbound",
                "Cold Calling Capabilities",
                "Dedicated Account Manager",
                "Priority Support"
            ],
            highlight: false
        }
    ];

    return (
        <section className="section-padding" style={{ position: 'relative', overflow: 'hidden' }}>
            {/* Background elements */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '100%',
                height: '100%',
                background: 'radial-gradient(circle at center, rgba(112, 66, 248, 0.05) 0%, transparent 70%)',
                pointerEvents: 'none',
                zIndex: 0
            }} />

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <motion.div
                    style={{ textAlign: 'center', marginBottom: '5rem' }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '1rem' }}>
                        Simple, Scalable <span className="text-gradient">Pricing</span>
                    </h2>
                    <p style={{ fontSize: '1.2rem', color: 'var(--color-text-secondary)', maxWidth: '700px', margin: '0 auto 2rem' }}>
                        Starting at <span style={{ color: 'var(--color-primary)', fontWeight: '700' }}>$332/month</span> with exponential room for scale.
                    </p>
                    
                    <div style={{ 
                        display: 'inline-block',
                        background: 'rgba(34, 197, 94, 0.1)',
                        border: '1px solid rgba(34, 197, 94, 0.3)',
                        borderRadius: '2rem',
                        padding: '0.75rem 1.5rem',
                        color: '#22c55e',
                        fontWeight: '600',
                        fontSize: '0.9rem'
                    }}>
                        💰 Most customers see 3-10x ROI within 90 days
                    </div>
                </motion.div>

                <div className="pricing-grid" style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                    gap: '2rem',
                    marginBottom: '4rem'
                }}>
                    {tiers.map((tier, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            style={{
                                background: tier.highlight ? 'rgba(112, 66, 248, 0.08)' : 'rgba(255, 255, 255, 0.03)',
                                border: tier.highlight ? '1px solid var(--color-primary)' : '1px solid rgba(255, 255, 255, 0.1)',
                                borderRadius: '1rem',
                                padding: '2.5rem',
                                position: 'relative',
                                display: 'flex',
                                flexDirection: 'column',
                                boxShadow: tier.highlight ? '0 0 30px rgba(112, 66, 248, 0.15)' : 'none'
                            }}
                        >
                            {tier.highlight && (
                                <div style={{
                                    position: 'absolute',
                                    top: '-12px',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    background: 'var(--color-primary)',
                                    color: 'white',
                                    padding: '0.25rem 1rem',
                                    borderRadius: '1rem',
                                    fontSize: '0.8rem',
                                    fontWeight: '700',
                                    whiteSpace: 'nowrap'
                                }}>
                                    MOST POPULAR
                                </div>
                            )}

                            <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                                <h3 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '0.5rem' }}>{tier.name}</h3>
                                <div style={{ color: 'var(--color-primary)', fontWeight: '600', marginBottom: '1rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                    {tier.target}
                                </div>
                                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                                    {tier.desc}
                                </p>
                            </div>

                            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2.5rem 0', flex: 1 }}>
                                {tier.features.map((feature, i) => (
                                    <li key={i} style={{ 
                                        display: 'flex', 
                                        alignItems: 'start', 
                                        gap: '0.75rem', 
                                        marginBottom: '1rem',
                                        color: 'var(--color-text-secondary)',
                                        fontSize: '0.95rem'
                                    }}>
                                        <span style={{ color: 'var(--color-primary)', flexShrink: 0 }}>✓</span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <button 
                                onClick={openModal} 
                                className="btn btn-primary btn-glow-hover"
                                style={{ width: '100%' }}
                            >
                                {tier.name === "Enterprise" ? "Contact Sales" : "Book A Demo"}
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

