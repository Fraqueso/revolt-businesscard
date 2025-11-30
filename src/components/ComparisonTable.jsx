import React from 'react';
import { motion } from 'framer-motion';
import { useModal } from '../context/ModalContext';

export default function ComparisonTable() {
    const { openModal } = useModal();
    const comparisonData = [
        // ... data ...
        {
            feature: "RESPONSE SPEED",
            revolt: "Under 60 seconds, 24/7/365. Never misses a lead, even at 3am.",
            human: "47 hours average. Nights and weekends are dark. Leads go cold."
        },
        {
            feature: "SOUND QUALITY",
            revolt: "Custom-trained on YOUR best calls. Sounds exactly like your top rep. 87% indistinguishable from human.",
            human: "Sounds human (obviously) but inconsistent quality across team. New reps sound like new reps."
        },
        {
            feature: "COST",
            revolt: "As low as $1.40 per talk-minute. No salary, benefits, or churn.",
            human: "National average $2.77/min PLUS $80k+ salary, benefits, tools, training, and 35% annual turnover."
        },
        {
            feature: "OBJECTION HANDLING",
            revolt: "Trained specifically on YOUR industry objections and close techniques. Never forgets the playbook.",
            human: "Quality varies by rep. Playbook adherence inconsistent. Top performers quit and take knowledge with them."
        },
        {
            feature: "SCALING",
            revolt: "Add capacity in minutes. Handle 1 million concurrent calls if needed. No extra salary per 'seat'.",
            human: "Each new rep = $80k+, 4-6 weeks hiring/onboarding, constant backfill from churn."
        }
    ];

    return (
        <section className="section-padding">
            {/* ... existing content ... */}
            <div className="container">
                {/* ... existing content ... */}
                <motion.div
                    style={{ textAlign: 'center', marginBottom: '5rem' }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '1rem' }}>
                        Human-Quality Conversations at <span className="text-gradient">AI Speed and Economics</span>
                    </h2>
                    <p style={{ fontSize: '1.2rem', color: 'var(--color-text-secondary)', maxWidth: '700px', margin: '0 auto' }}>
                        Stop choosing between fast and good. Get both.
                    </p>
                </motion.div>

                <div className="comparison-grid" style={{
                    marginBottom: '4rem',
                    background: 'var(--glass-bg)',
                    border: 'var(--glass-border)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '2rem',
                    backdropFilter: 'var(--glass-backdrop)'
                }}>
                    {/* Table Header */}
                    <div className="comparison-header" style={{
                        paddingBottom: '1rem',
                        borderBottom: '1px solid var(--color-border)',
                        fontWeight: 'bold',
                        fontSize: '1.1rem',
                        display: 'grid',
                        gridTemplateColumns: '1fr 1.5fr 1.5fr',
                        gap: '2rem'
                    }}>
                        <div>FEATURE</div>
                        <div style={{ color: 'var(--color-primary)' }}>REVOLT</div>
                        <div style={{ color: 'var(--color-text-secondary)' }}>HUMAN SALES REPS</div>
                    </div>

                    {/* Table Rows */}
                    {comparisonData.map((item, index) => (
                        <motion.div
                            key={index}
                            className="comparison-row"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            style={{
                                padding: '2rem 0',
                                borderBottom: index !== comparisonData.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                                display: 'grid',
                                gridTemplateColumns: '1fr 1.5fr 1.5fr',
                                gap: '2rem',
                                alignItems: 'start'
                            }}
                        >
                            <div style={{ fontWeight: '700', fontSize: '0.9rem', letterSpacing: '0.05em', color: 'var(--color-text-secondary)' }}>
                                {item.feature}
                            </div>
                            <div style={{ color: 'var(--color-text)', lineHeight: '1.6', position: 'relative', paddingLeft: '1.5rem' }}>
                                <span style={{ position: 'absolute', left: 0, color: 'var(--color-primary)', fontWeight: 'bold' }}>✓</span>
                                {item.revolt}
                            </div>
                            <div style={{ color: 'var(--color-text-secondary)', lineHeight: '1.6', position: 'relative', paddingLeft: '1.5rem', opacity: 0.8 }}>
                                <span style={{ position: 'absolute', left: 0, color: '#ff4d4d', fontWeight: 'bold' }}>✕</span>
                                {item.human}
                            </div>
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
                        See Revolt In Action
                    </button>
                </motion.div>
            </div>
        </section>
    );
}
