import React from 'react';
import { motion } from 'framer-motion';
import { useModal } from '../context/ModalContext';

export default function Stats() {
    const { openModal } = useModal();
    const stats = [
        // ... stats data ...
        {
            value: "78%",
            label: "of prospects buy from whoever responds FIRST, not best",
            subtext: "Speed-to-lead isn't optional. It's survival.",
            source: "Velocify"
        },
        {
            value: "47 hours",
            label: "Average response time with human teams",
            subtext: "That's two full days. Your competitor called 46 hours ago.",
            source: "Harvard Business Review"
        },
        {
            value: "62%",
            label: "of your inbound calls go completely unanswered",
            subtext: "You're spending money on ads to generate leads you never even talk to.",
            source: "Based on 38% answer rate, Bridge Group SDR/BDR Report"
        },
        {
            value: "3 seconds",
            label: "How long it takes prospects to detect robotic AI and hang up",
            subtext: "Fast response doesn't matter if your AI sounds like garbage.",
            source: ""
        }
    ];

    return (
        <section className="section-padding" style={{ position: 'relative', overflow: 'hidden' }}>
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
                        Speed-To-Lead Is <span style={{ color: '#ff4d4d' }}>Killing</span> Your Close Rate
                    </h2>
                    <p style={{ fontSize: '1.2rem', color: 'var(--color-text-secondary)', maxWidth: '800px', margin: '0 auto 1rem' }}>
                        Every minute you wait, a competitor calls first. But responding fast with garbage AI is just as bad. You need both.
                    </p>
                    <p style={{ fontSize: '1.1rem', color: 'var(--color-text)', fontWeight: '600' }}>
                        Slow follow-up = lost deals. Robotic AI = hung-up prospects. Here's the data:
                    </p>
                </motion.div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
                    {stats.map((stat, index) => (
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
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between'
                            }}
                        >
                            <div>
                                <div style={{
                                    fontSize: '3.5rem',
                                    fontWeight: '800',
                                    marginBottom: '1rem',
                                    background: 'var(--gradient-primary)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    lineHeight: 1
                                }}>
                                    {stat.value}
                                </div>
                                <p style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '1rem', color: 'var(--color-text)' }}>
                                    {stat.label}
                                </p>
                                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: '1.6', marginBottom: '1rem' }}>
                                    {stat.subtext}
                                </p>
                            </div>
                            {stat.source && (
                                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', opacity: 0.6, fontStyle: 'italic' }}>
                                    Source: {stat.source}
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>

                <div style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '0.9rem', color: 'var(--color-text-secondary)', opacity: 0.6 }}>
                    Sources: Velocify, Harvard Business Review, Bridge Group SDR/BDR Report
                </div>

                <motion.div
                    style={{ textAlign: 'center' }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                >
                    <button onClick={openModal} className="btn btn-primary btn-glow-hover" style={{ fontSize: '1.2rem', padding: '1rem 3rem' }}>
                        Fix Both Problems With Revolt
                    </button>
                </motion.div>
            </div>
        </section>
    );
}
