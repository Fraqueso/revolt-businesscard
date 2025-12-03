import React from 'react';
import { motion } from 'framer-motion';
import DualProblem from '../components/DualProblem';

export default function About() {
    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-100px" },
        transition: { duration: 0.6, ease: "easeOut" }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { 
            opacity: 1, 
            y: 0, 
            transition: { duration: 0.5, ease: "easeOut" } 
        }
    };

    return (
        <>
            <div className="page-content" style={{ paddingTop: '8rem', paddingBottom: '8rem' }}>
                <div className="container">
                {/* Why Voice Agents Section */}
                <motion.div
                    {...fadeInUp}
                    style={{ marginTop: '0', marginBottom: '8rem' }}
                >
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <h2 className="page-title" style={{ marginBottom: '1.5rem' }}>
                            Why Voice Agents? <br/>
                            <span className="text-gradient">More Importantly: Why Revolt?</span>
                        </h2>
                    </div>

                    <div className="why-revolt-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
                        <div className="glass-card" style={{ padding: '0', overflow: 'hidden', aspectRatio: '16/9', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255, 255, 255, 0.05)' }}>
                            {/* Placeholder for Image */}
                            <div style={{ color: 'rgba(255, 255, 255, 0.3)', textAlign: 'center' }}>
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '1rem' }}>
                                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                                    <polyline points="21 15 16 10 5 21"></polyline>
                                </svg>
                                <p>Insert Image Here</p>
                            </div>
                            {/* <img src="/path/to/your/image.jpg" alt="Why Revolt" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> */}
                        </div>

                        <div className="editorial-content">
                            <p style={{ fontSize: '0.95rem', lineHeight: '1.6', color: 'var(--color-text-secondary)', marginBottom: '1.2rem' }}>
                                In a world where attention is the new currency, <span style={{ color: 'var(--color-text)', fontWeight: '500' }}>speed is the only differentiator that matters.</span> Traditional staffing models are breaking. They are crumbling under the pressure of 24/7 demand. Your customers don't wait for business hours—they wait for answers.
                            </p>
                            <p style={{ fontSize: '1.05rem', lineHeight: '1.7', color: 'var(--color-text-secondary)', marginBottom: '1.2rem' }}>
                                Voice agents aren't just about automation. They're about <strong style={{ color: 'var(--color-text)' }}>consistency</strong>. A human has bad days. They get tired. They miss details. Revolt never sleeps. It never forgets. It treats your 1000th caller with the exact same enthusiasm as your first.
                            </p>
                            <p style={{ fontSize: '1rem', lineHeight: '1.6', color: 'var(--color-text-secondary)' }}>
                                But why Revolt specifically? Because we didn't just build a robot. We built a top-performer. We analyzed thousands of successful sales calls to engineer an AI that doesn't just "take messages"—it handles objections, builds rapport, and drives revenue. It's not just a voice agent; it's your best employee, cloned.
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Example Calls Section */}
                <motion.div
                    {...fadeInUp}
                    style={{ textAlign: 'center', marginBottom: '4rem' }}
                >
                    <h1 className="about-hero-title">
                        See Revolt Handling <br />
                        <span className="text-gradient about-hero-gradient">
                            <span className="highlight-real">REAL</span><br />Conversations
                        </span>
                    </h1>
                </motion.div>

                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-50px" }}
                    className="features-grid"
                    style={{ marginBottom: '10rem' }}
                >
                    {/* Example Chat */}
                    <motion.div variants={itemVariants} className="feature-card">
                        <div className="feature-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                            </svg>
                        </div>
                        <h3 className="feature-title">Example Chat</h3>
                        <div className="feature-desc" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <p><strong style={{ color: 'var(--color-primary)' }}>Customer:</strong> Hello?</p>
                            <p><strong style={{ color: 'var(--color-primary)' }}>Assistant:</strong> Hey John, are you interested in booking another appointment? I remember last time you had questions about our services, how can i help you today?</p>
                            <p><strong style={{ color: 'var(--color-primary)' }}>John:</strong> Yes, book me on the first available day.</p>
                            <p><strong style={{ color: 'var(--color-primary)' }}>Assistant:</strong> Sure thing! Our availability is....</p>
                        </div>
                    </motion.div>

                    {/* Transfer Call */}
                    <motion.div variants={itemVariants} className="feature-card">
                        <div className="feature-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                                <path d="M16 3h5v5"></path>
                                <path d="M21 3L14 10"></path>
                            </svg>
                        </div>
                        <h3 className="feature-title">Transfer Call</h3>
                        <div className="feature-desc" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <p style={{ fontStyle: 'italic', opacity: 0.8 }}>*Ringing Receptionist*</p>
                            <p style={{ fontStyle: 'italic', opacity: 0.8 }}>*Receptionist Answers*</p>
                            <p><strong style={{ color: 'var(--color-primary)' }}>Assistant:</strong> Hey! I have a caller by the name of John on the line and he's trying to book an appointment but unsure if he meets our requirements</p>
                            <p style={{ fontStyle: 'italic', opacity: 0.8 }}>*Directly Transfers call between the receptionist and John*</p>
                        </div>
                    </motion.div>

                    {/* Post Call Analysis */}
                    <motion.div variants={itemVariants} className="feature-card">
                        <div className="feature-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M3 3v18h18"></path>
                                <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"></path>
                            </svg>
                        </div>
                        <h3 className="feature-title">Post Call Analysis</h3>
                        <div className="feature-desc">
                            <p>The call involved John discussing his desire to book an appointment with the agent, John expressed his interest in TRT for the first time.</p>
                        </div>
                    </motion.div>
                </motion.div>

                <motion.div
                    {...fadeInUp}
                    className="glass-card"
                    style={{ marginBottom: '4rem', textAlign: 'center' }}
                >
                    <p style={{ fontSize: '1.5rem', fontWeight: '600' }}>
                        All calls booked from the same phone number, simple & easy
                    </p>
                </motion.div>

            </div>
        </div>
        <DualProblem />
    </>
    );
}
