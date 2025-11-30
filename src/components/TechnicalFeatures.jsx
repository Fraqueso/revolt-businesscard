import React from 'react';
import { motion } from 'framer-motion';
import { useModal } from '../context/ModalContext';

export default function TechnicalFeatures() {
    const { openModal } = useModal();
    const features = [
        // ... features data ...
        {
            title: "Sub-500ms Latency",
            desc: "Zero awkward silences. Your agent responds instantly, mid-sentence, just like humans do. No robotic pauses that scream 'I'm AI.'",
            icon: "⚡"
        },
        {
            title: "Natural Interruptions",
            desc: "Doesn't wait for long pauses to respond. Jumps in naturally, handles crosstalk, feels like a real conversation—because that's what we trained it on.",
            icon: "🌊"
        },
        {
            title: "Emotional Calibration",
            desc: "Automatically matches your prospect's energy. Excited buyer gets enthusiasm back. Skeptical prospect gets consultative patience. Real-time tone adjustment.",
            icon: "🎭"
        },
        {
            title: "Real-Time Objection Handling",
            desc: "Not scripted responses. Actually trained on YOUR objection library and YOUR industry. Handles curveballs because it learned from YOUR best reps.",
            icon: "🛡️"
        },
        {
            title: "Custom Voice Training",
            desc: "Built from your actual sales recordings. Your brand voice. Your industry language. Your close techniques. Not a template someone else uses.",
            icon: "🎙️"
        },
        {
            title: "Seamless CRM Integration",
            desc: "Auto-logs every call, books meetings, syncs with Salesforce, HubSpot, and 500+ platforms. Zero manual data entry. Completed in 10-14 days with zero downtime.",
            icon: "🔄"
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
                        What Makes Revolt Sound This Good <span className="text-gradient">AND Respond This Fast</span>
                    </h2>
                    <p style={{ fontSize: '1.2rem', color: 'var(--color-text-secondary)', maxWidth: '700px', margin: '0 auto' }}>
                        The technical magic behind natural conversations at AI speed.
                    </p>
                </motion.div>

                <div className="features-grid" style={{ marginBottom: '4rem' }}>
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            className="feature-card"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div className="feature-icon" style={{ fontSize: '1.5rem' }}>
                                {feature.icon}
                            </div>
                            <h3 className="feature-title">{feature.title}</h3>
                            <p className="feature-desc">{feature.desc}</p>
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
                        See The Tech In Action
                    </button>
                </motion.div>
            </div>
        </section>
    );
}
