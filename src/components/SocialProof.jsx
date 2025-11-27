import React from 'react';
import { motion } from 'framer-motion';
import { useModal } from '../context/ModalContext';

export default function SocialProof() {
    const { openModal } = useModal();
    const testimonials = [
        {
            quote: "We were losing 40% of our leads just because we couldn't call them fast enough. Revolt fixed that overnight.",
            author: "Sarah J., VP of Sales",
            role: "Solar Industry"
        },
        {
            quote: "I was skeptical that an AI could handle our complex objections. I was wrong. It sounds better than half my floor.",
            author: "Mike T., Founder",
            role: "SaaS Startup"
        },
        {
            quote: "The custom training is the game changer. It doesn't sound like a generic bot. It sounds like US.",
            author: "Jessica L., Director of Ops",
            role: "Real Estate"
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
                        Built For Companies Who Care About <span className="text-gradient">Close Rates</span>, Not Just Call Volume
                    </h2>
                    <p style={{ fontSize: '1.2rem', color: 'var(--color-text-secondary)', maxWidth: '700px', margin: '0 auto' }}>
                        Revolt agents don't just answer fast—they convert.
                    </p>
                </motion.div>

                {/* Logos Placeholder */}
                <div style={{ marginBottom: '5rem', textAlign: 'center' }}>
                    <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', marginBottom: '2rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                        Trusted by teams closing more deals
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', flexWrap: 'wrap', opacity: 0.5 }}>
                        {/* Placeholders for logos */}
                        {['Company A', 'Company B', 'Company C', 'Company D', 'Company E'].map((logo, i) => (
                            <div key={i} style={{ fontSize: '1.5rem', fontWeight: '700', color: 'white' }}>{logo}</div>
                        ))}
                    </div>
                </div>

                <div className="testimonials-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
                    {testimonials.map((item, index) => (
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
                                position: 'relative'
                            }}
                        >
                            <div style={{ fontSize: '2rem', color: 'var(--color-primary)', marginBottom: '1rem', lineHeight: 1 }}>"</div>
                            <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '1.5rem', fontStyle: 'italic' }}>
                                {item.quote}
                            </p>
                            <div>
                                <div style={{ fontWeight: '700', color: 'white' }}>{item.author}</div>
                                <div style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>{item.role}</div>
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
                    <button onClick={openModal} className="btn btn-primary" style={{ fontSize: '1.2rem', padding: '1rem 3rem' }}>
                        Start Your Custom Build
                    </button>
                </motion.div>
            </div>
        </section>
    );
}
