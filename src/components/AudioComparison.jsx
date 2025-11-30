import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useModal } from '../context/ModalContext';

const AudioPlayer = ({ label, subLabel, type }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);

    // Mock progress animation for demo purposes
    useEffect(() => {
        let interval;
        if (isPlaying) {
            interval = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 100) {
                        setIsPlaying(false);
                        return 0;
                    }
                    return prev + 1;
                });
            }, 100); // 10 seconds duration approx
        } else {
            setProgress(0);
        }
        return () => clearInterval(interval);
    }, [isPlaying]);

    return (
        <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '1rem',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.25rem' }}>{label}</h3>
                    <p style={{ fontSize: '0.85rem', color: type === 'bad' ? '#ff4d4d' : 'var(--color-primary)' }}>{subLabel}</p>
                </div>
                <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        background: isPlaying ? 'var(--color-primary)' : 'rgba(255,255,255,0.1)',
                        border: 'none',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                    }}
                >
                    {isPlaying ? '⏸' : '▶'}
                </button>
            </div>

            {/* Waveform Visualization (Mock) */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '3px', height: '40px', opacity: 0.7 }}>
                {[...Array(30)].map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{
                            height: isPlaying ? [10, Math.random() * 30 + 10, 10] : 10,
                            backgroundColor: i / 30 * 100 < progress ? 'var(--color-primary)' : 'rgba(255,255,255,0.2)'
                        }}
                        transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.05 }}
                        style={{
                            width: '4px',
                            borderRadius: '2px',
                            height: '10px'
                        }}
                    />
                ))}
            </div>

            {/* Progress Bar */}
            <div style={{
                width: '100%',
                height: '4px',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '2px',
                overflow: 'hidden'
            }}>
                <motion.div
                    style={{
                        width: `${progress}%`,
                        height: '100%',
                        background: 'var(--color-primary)'
                    }}
                />
            </div>
        </div>
    );
};

export default function AudioComparison() {
    const { openModal } = useModal();

    return (
        <section className="section-padding" style={{ position: 'relative', overflow: 'hidden' }}>
            <div className="container">
                <motion.div
                    style={{ textAlign: 'center', marginBottom: '4rem' }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '1rem' }}>
                        Most AI Agents Get Hung Up On In <span style={{ color: '#ff4d4d' }}>3 Seconds</span>. Yours Won't.
                    </h2>
                    <p style={{ fontSize: '1.2rem', color: 'var(--color-text-secondary)', maxWidth: '700px', margin: '0 auto' }}>
                        Listen to the difference between template AI and custom-trained Revolt agents that sound like your best reps.
                    </p>
                </motion.div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '2rem',
                    marginBottom: '4rem'
                }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        <AudioPlayer
                            label="Generic AI Agent"
                            subLabel="Robotic, scripted, obvious AI"
                            type="bad"
                        />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <AudioPlayer
                            label="Revolt Agent: Solar Sales"
                            subLabel="Custom-trained, natural, conversational"
                            type="good"
                        />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        <AudioPlayer
                            label="Revolt Agent: B2B SaaS"
                            subLabel="Custom-trained for tech sales"
                            type="good"
                        />
                    </motion.div>
                </div>

                <motion.div
                    style={{ textAlign: 'center' }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                >
                    <div style={{
                        display: 'inline-block',
                        background: 'rgba(112, 66, 248, 0.1)',
                        border: '1px solid rgba(112, 66, 248, 0.3)',
                        borderRadius: '2rem',
                        padding: '1rem 2rem',
                        marginBottom: '2rem'
                    }}>
                        <span style={{ fontSize: '1.1rem', fontWeight: '600' }}>
                            In blind A/B tests, <span className="text-gradient">87% of prospects</span> couldn't tell our agents from human sales reps.
                        </span>
                    </div>

                    <div>
                        <button onClick={openModal} className="btn btn-primary btn-glow-hover" style={{ fontSize: '1.2rem', padding: '1rem 3rem' }}>
                            Build Your Perfect Agent
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
