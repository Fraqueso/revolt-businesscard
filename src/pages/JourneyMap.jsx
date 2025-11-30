import React from 'react';
import { motion } from 'framer-motion';
import { useModal } from '../context/ModalContext';

export default function JourneyMap() {
    const { openModal } = useModal();

    return (
        <div className="page-content" style={{ paddingTop: '8rem', paddingBottom: '4rem' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h1 className="page-title">
                        Speed-to-Lead <span className="text-gradient">Journey Map</span>
                    </h1>
                    <p style={{ color: 'var(--color-text-secondary)', maxWidth: '900px', margin: '0 auto', fontSize: '1.5rem', lineHeight: '1.4' }}>
                        Most businesses lose 60% of leads before a conversation even starts. Here's where they're falling out of your funnel—and how Revolt fixes it.
                    </p>
                </div>
            </div>

            <div style={{ width: '100%', padding: '0 5%', marginBottom: '4rem' }}>
                 <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '2rem',
                    maxWidth: '1800px',
                    margin: '0 auto'
                }}>
                    {[
                        { step: "1. Lead Inbound", val: "100%", color: "#3b82f6" },
                        { step: "2. Response < 5min", val: "42%", color: "#8b5cf6" },
                        { step: "3. Conversation Started", val: "28%", color: "#ec4899" },
                        { step: "4. Appointment Booked", val: "15%", color: "#10b981" }
                    ].map((item, i) => (
                        <div key={i} style={{
                            background: 'linear-gradient(180deg, var(--color-bg-secondary) 0%, rgba(112, 66, 248, 0.05) 100%)',
                            border: '1px solid var(--color-border)',
                            borderRadius: 'var(--radius-lg)',
                            padding: '3rem 2rem',
                            textAlign: 'center',
                            position: 'relative',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            minHeight: '350px'
                        }}>
                            <div style={{
                                fontSize: '1.1rem',
                                color: 'var(--color-text)',
                                marginBottom: '1.5rem',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                                fontWeight: '600'
                            }}>
                                {item.step}
                            </div>
                            <div style={{
                                fontSize: '5rem',
                                fontWeight: '700',
                                color: item.color,
                                lineHeight: '1'
                            }}>
                                {item.val}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="container">
                <div style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
                        Most businesses lose 60% of leads before a conversation even starts.
                    </p>
                    <button 
                        onClick={openModal} 
                        className="btn btn-primary btn-glow-hover"
                        style={{ fontSize: '1.5rem', padding: '1rem 3rem' }}
                    >
                        Fix your funnel with Revolt
                    </button>
                </div>
            </div>
        </div>
    );
}
