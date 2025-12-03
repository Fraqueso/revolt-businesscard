import React from 'react';
import { motion } from 'framer-motion';
import { useModal } from '../context/ModalContext';

export default function ChallengeSection() {
    const { openModal } = useModal();

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

    const challenges = [
        {
            icon: "📞",
            title: "Missed Calls",
            emoji: "",
            desc: "Every ring unanswered is revenue lost."
        },
        {
            icon: "⏰",
            title: "No After-Hours Bookings",
            emoji: "",
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
            emoji: "",
            desc: "Your people are tied up instead of showing up."
        },
        {
            icon: "🙄",
            title: "Visitors Waiting",
            emoji: "",
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
        <section className="section-padding" style={{ paddingTop: '1rem' }}>
            <div className="container">
                <motion.div
                    {...fadeInUp}
                    style={{ textAlign: 'center', marginBottom: '6rem' }}
                >
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
                            variants={itemVariants}
                            className="feature-card"
                            style={{ textAlign: 'center' }}
                        >
                            <div className="feature-emoji">
                                {item.icon}
                            </div>
                            <h3 className="feature-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                                {item.title} 
                                {item.emoji && <span className="glass-card-sm">{item.emoji}</span>}
                            </h3>
                            <p className="feature-desc">{item.desc}</p>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    {...fadeInUp}
                    style={{ textAlign: 'center', marginTop: '4rem' }}
                >
                    <button onClick={openModal} className="btn btn-primary btn-glow-hover" style={{ fontSize: '1.2rem', padding: '1rem 3rem' }}>
                        Try The Tech
                    </button>
                </motion.div>
            </div>
        </section>
    );
}

