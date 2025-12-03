import React from 'react';
import { motion } from 'framer-motion';
import { useModal } from '../context/ModalContext';

export default function VSL() {
    const { scrollToHero } = useModal();

    return (
        <section className="section-padding" style={{ position: 'relative', overflow: 'hidden' }}>
            {/* Optional background glow */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '600px',
                height: '600px',
                background: 'radial-gradient(circle, rgba(112, 66, 248, 0.15) 0%, transparent 70%)',
                pointerEvents: 'none',
                zIndex: 0
            }} />

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    style={{ maxWidth: '900px', margin: '0 auto' }}
                >
                    <div style={{
                        position: 'relative',
                        paddingBottom: '56.25%', /* 16:9 Aspect Ratio */
                        height: 0,
                        background: 'rgba(15, 15, 20, 0.6)',
                        borderRadius: '1rem',
                        overflow: 'hidden',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)',
                        marginBottom: '3rem'
                    }}>
                        {/* Placeholder for Video Embed */}
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'rgba(255, 255, 255, 0.3)'
                        }}>
                            <div style={{
                                width: '80px',
                                height: '80px',
                                borderRadius: '50%',
                                border: '2px solid rgba(255, 255, 255, 0.2)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '1rem'
                            }}>
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" style={{ marginLeft: '4px' }}>
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            </div>
                            <p style={{ fontSize: '1.1rem', fontWeight: '500' }}>Watch VSL</p>
                        </div>
                        
                        {/* 
                        Replace the div above with your iframe or video tag:
                        <iframe 
                            src="https://www.youtube.com/embed/YOUR_VIDEO_ID" 
                            title="VSL"
                            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                        */}
                    </div>

                    <div style={{ textAlign: 'center' }}>
                        <button 
                            onClick={scrollToHero}
                            className="btn btn-primary btn-glow-hover"
                            style={{ fontSize: '1.2rem', padding: '1rem 3rem' }}
                        >
                            Book A Demo With Revolt
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

