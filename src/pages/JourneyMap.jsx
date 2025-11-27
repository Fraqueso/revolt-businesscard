import React from 'react';
import { motion } from 'framer-motion';
import { useModal } from '../context/ModalContext';

export default function JourneyMap() {
    const { openModal } = useModal();

    return (
        <div className="page-content" style={{ paddingTop: '8rem', paddingBottom: '4rem' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h1 style={{ fontSize: '3rem', fontWeight: '700', marginBottom: '1rem' }}>
                        Speed-to-Lead <span className="text-gradient">Journey Map</span>
                    </h1>
                    <p style={{ color: 'var(--color-text-secondary)', maxWidth: '800px', margin: '0 auto', fontSize: '1.2rem' }}>
                        Most businesses lose 60% of leads before a conversation even starts. Here's where they're falling out of your funnel—and how Revolt fixes it.
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '2rem',
                    marginBottom: '4rem'
                }}>
                    {[
                        { step: "1. Lead Inbound", val: "100%", color: "#3b82f6" },
                        { step: "2. Response < 5min", val: "42%", color: "#8b5cf6" },
                        { step: "3. Conversation Started", val: "28%", color: "#ec4899" },
                        { step: "4. Appointment Booked", val: "15%", color: "#10b981" }
                    ].map((item, i) => (
                        <div key={i} style={{
                            background: 'var(--color-bg-secondary)',
                            border: '1px solid var(--color-border)',
                            borderRadius: 'var(--radius-lg)',
                            padding: '2rem',
                            textAlign: 'center',
                            position: 'relative'
                        }}>
                            <div style={{
                                fontSize: '0.9rem',
                                color: 'var(--color-text-secondary)',
                                marginBottom: '1rem',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em'
                            }}>
                                {item.step}
                            </div>
                            <div style={{
                                fontSize: '3rem',
                                fontWeight: '700',
                                color: item.color
                            }}>
                                {item.val}
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
                        Most businesses lose 60% of leads before a conversation even starts.
                    </p>
                    <button onClick={openModal} className="btn btn-primary">
                        Fix your funnel with Revolt
                    </button>
                </div>
            </div>
        </div>
    );
}
