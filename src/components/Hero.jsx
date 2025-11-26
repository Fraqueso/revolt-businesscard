import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
    const [textIndex, setTextIndex] = useState(0);
    const texts = ["Service Businesses", "HVAC Pros", "Plumbers", "Electricians"];

    useEffect(() => {
        const interval = setInterval(() => {
            setTextIndex((prev) => (prev + 1) % texts.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="hero">
            <div className="container hero-content">
                <motion.div
                    className="hero-text"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1>
                        The AI Employee for <br />
                        <motion.span
                            key={textIndex}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="text-gradient"
                        >
                            {texts[textIndex]}
                        </motion.span>
                    </h1>
                    <p>
                        Revolt answers calls, schedules appointments, and manages your leads 24/7.
                        Stop missing business and start growing with the first AI designed for the trades.
                    </p>

                    <div className="hero-stats">
                        {[
                            { val: "24/7", label: "Availability" },
                            { val: "< 1s", label: "Response Time" },
                            { val: "100%", label: "Lead Capture" }
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                className="stat-item"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 + (i * 0.1) }}
                            >
                                <h3>{stat.val}</h3>
                                <p>{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    className="hero-form-card"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="form-group">
                            <label className="form-label">Full Name</label>
                            <input type="text" className="form-input" placeholder="John Doe" />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Business Email</label>
                            <input type="email" className="form-input" placeholder="john@company.com" />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Phone Number</label>
                            <input type="tel" className="form-input" placeholder="(555) 123-4567" />
                        </div>
                        <motion.button
                            type="submit"
                            className="btn btn-accent"
                            style={{ width: '100%', marginTop: '1rem' }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Talk to Revolt
                        </motion.button>
                        <p style={{ marginTop: '1rem', fontSize: '0.8rem', color: 'var(--color-text-secondary)', textAlign: 'center' }}>
                            No credit card required. Start your free trial today.
                        </p>
                    </form>
                </motion.div>
            </div>
        </section>
    );
}
