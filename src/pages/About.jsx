import React from 'react';
import { motion } from 'framer-motion';

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
                staggerChildren: 0.1
            }
        }
    };

    const challenges = [
        {
            icon: "📞",
            title: "Missed Calls",
            emoji: "😠",
            desc: "Every ring unanswered is revenue lost."
        },
        {
            icon: "⏰",
            title: "No After-Hours Bookings",
            emoji: "😢",
            desc: "Your clients are ready when you're closed."
        },
        {
            icon: "😤",
            title: "Frustrated Clients",
            emoji: "",
            desc: "They won't wait... they'll go somewhere else."
        },
        {
            icon: "☎️",
            title: "Staff Stuck on Phones",
            emoji: "😩",
            desc: "Your people are tied up instead of showing up."
        },
        {
            icon: "🙄",
            title: "Visitors Waiting",
            emoji: "😕",
            desc: "The floor's full, but the phone keeps stealing attention."
        },
        {
            icon: "💸",
            title: "Lost Revenue",
            emoji: "",
            desc: "You worked hard to earn attention! Now you're losing it to silence."
        }
    ];

    return (
        <div className="page-content" style={{ paddingTop: '8rem', paddingBottom: '8rem' }}>
            <div className="container">
                {/* Example Calls Section */}
                <motion.div
                    {...fadeInUp}
                    style={{ textAlign: 'center', marginBottom: '4rem' }}
                >
                    <h1 style={{ fontSize: '3.5rem', fontWeight: '700', marginBottom: '1.5rem' }}>
                        See Revolt Handling <span className="text-gradient">Real Conversations</span>
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
                    <motion.div variants={fadeInUp} className="feature-card">
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
                    <motion.div variants={fadeInUp} className="feature-card">
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
                    <motion.div variants={fadeInUp} className="feature-card">
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
                    style={{ textAlign: 'center', marginBottom: '4rem', padding: '2rem', background: 'var(--glass-bg)', borderRadius: 'var(--radius-lg)', border: 'var(--glass-border)' }}
                >
                    <p style={{ fontSize: '1.5rem', fontWeight: '600' }}>
                        All calls booked from the same phone number, simple & easy
                    </p>
                </motion.div>

                {/* The Challenge Section */}
                <motion.div
                    {...fadeInUp}
                    style={{ textAlign: 'center', marginBottom: '6rem' }}
                >
                    <h2 style={{ fontSize: '1rem', color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1rem' }}>
                        The Challenge
                    </h2>
                    <h1 style={{ fontSize: '3rem', fontWeight: '700', marginBottom: '1.5rem' }}>
                        Powered by Pain. <span className="text-gradient">Solved by You.</span>
                    </h1>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto' }}>
                        When nobody's available, opportunity slips away. Missed calls, no bookings, and frustrated clients cost you real money... every single day.
                    </p>
                </motion.div>

                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-50px" }}
                    className="features-grid"
                >
                    {challenges.map((item, index) => (
                        <motion.div
                            key={index}
                            variants={fadeInUp}
                            className="feature-card"
                            style={{ textAlign: 'center' }}
                        >
                            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                                {item.icon}
                            </div>
                            <h3 className="feature-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                                {item.title} {item.emoji && <span>{item.emoji}</span>}
                            </h3>
                            <p className="feature-desc">{item.desc}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
