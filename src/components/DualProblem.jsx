import React from 'react';
import { motion } from 'framer-motion';
import { useModal } from '../context/ModalContext';

export default function DualProblem() {
    const { openModal } = useModal();

    return (
        <section className="section-padding" style={{ position: 'relative', overflow: 'hidden' }}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{ textAlign: 'center', marginBottom: '5rem', backgroundColor: 'transparent' }}
                >
                    <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '1rem' }}>
                        The <span className="text-gradient">Dual Problem</span> of Modern Sales
                    </h2>
                    <p style={{ fontSize: '1.2rem', color: 'var(--color-text-secondary)', maxWidth: '700px', margin: '0 auto' }}>
                        You're forced to choose between speed and quality. Revolt gives you both.
                    </p>
                </motion.div>

                <div className="dual-problem-container">
                    {/* Left Side: Speed */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="dual-problem-left"
                        style={{ willChange: 'transform' }}
                    >
                        <div className="dual-problem-icon">⚡</div>
                        <h3 className="dual-problem-title">Speed Without Quality</h3>
                        <p className="dual-problem-desc">
                            Auto-dialers and basic bots call fast, but they sound robotic and annoy your leads.
                        </p>
                        <div className="dual-problem-result">Result: High Volume, Low Conversion</div>
                    </motion.div>

                    {/* Center Callout - Venn Diagram Intersection */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="dual-problem-center"
                        style={{ willChange: 'transform' }}
                    >
                        <h3 className="dual-center-title">
                            You Need BOTH.<br />That's Revolt.
                        </h3>
                        <ul className="dual-center-list">
                            <li>✅ Under 60 seconds AND sounds human</li>
                            <li>✅ 24/7 coverage AND custom-trained</li>
                            <li>✅ Instant response AND natural conversation</li>
                        </ul>
                    </motion.div>

                    {/* Right Side: Quality */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="dual-problem-right"
                        style={{ willChange: 'transform' }}
                    >
                        <div className="dual-problem-icon">🧠</div>
                        <h3 className="dual-problem-title">Quality Without Speed</h3>
                        <p className="dual-problem-desc">
                            Human reps sound great, but they can't call 100 leads in 5 minutes.
                            <br />
                            <br />
                        </p>
                        <div className="dual-problem-result">Result: High Conversion, Low Volume</div>
                    </motion.div>
                </div>

                <div style={{ textAlign: 'center', marginTop: '8rem' }}>
                    <button onClick={openModal} className="btn btn-primary btn-glow-hover" style={{ fontSize: '1.2rem', padding: '1rem 3rem' }}>
                        See How We Do It
                    </button>
                </div>
            </div>
        </section>
    );
}
