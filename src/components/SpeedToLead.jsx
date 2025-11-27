import React from 'react';
import { motion } from 'framer-motion';

export default function SpeedToLead() {
    const comparisonData = [
        {
            feature: "Cost",
            ai: {
                title: "As low as $1.40 / talk-minute",
                desc: "24/7 Coverage - 60 second speed to lead"
            },
            human: {
                title: "National average $2.77 / talk-minute",
                desc: "Salary, benefits, tools, ramp, and turnover risk."
            }
        },
        {
            feature: "Coverage",
            ai: {
                title: "24/7/365.",
                desc: "Never misses a lead."
            },
            human: {
                title: "8 hrs × 5 days.",
                desc: "Nights and weekends are dark."
            }
        },
        {
            feature: "Response speed",
            ai: {
                title: "Under 60 seconds.",
                desc: "Every time."
            },
            human: {
                title: "47 hours on average.",
                desc: "If the lead is even seen."
            }
        },
        {
            feature: "Ramp",
            ai: {
                title: "White-glove launch in 10 days.",
                desc: "ROI within 2 weeks."
            },
            human: {
                title: "4 to 6 weeks to get started.",
                desc: "Hiring and onboarding eat cash."
            }
        },
        {
            feature: "Turnover",
            ai: {
                title: "0 percent churn.",
                desc: "No retraining."
            },
            human: {
                title: "35 percent or more churn.",
                desc: "Constant backfill."
            }
        },
        {
            feature: "Compliance",
            ai: {
                title: "Built in.",
                desc: "Opt-outs auto-logged and managed."
            },
            human: {
                title: "Manual and slow.",
                desc: "Error prone."
            }
        },
        {
            feature: "Scaling seats",
            ai: {
                title: "Add capacity in minutes.",
                desc: "No extra salary."
            },
            human: {
                title: "$80k plus per new rep.",
                desc: "Salary and tools repeat every hire."
            }
        }
    ];

    const stats = [
        {
            value: "78%",
            desc: "of prospects NEVER shop around - they buy from whoever responds FIRST."
        },
        {
            value: "47 hours",
            desc: "Average response time for getting back to potential customers (costing you deals!)"
        },
        {
            value: "$80k+",
            desc: "What each SDR COSTS you before generating a single dollar of ROI"
        },
        {
            value: "38%",
            desc: "The REAL percentage of calls your team answers (meaning 62% lost)"
        }
    ];

    return (
        <section className="section-padding">
            <div className="container">
                {/* Header */}
                <motion.div
                    style={{ textAlign: 'center', marginBottom: '5rem' }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '1rem' }}>
                        Close More Deals — <span className="text-gradient">For Up to 50% Less</span> Than Human Reps
                    </h2>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto' }}>
                        Human-quality calls at a lower cost—plus instant response and zero churn.
                    </p>
                </motion.div>

                {/* Comparison Table */}
                <div className="comparison-grid" style={{
                    marginBottom: '6rem',
                    background: 'var(--glass-bg)',
                    border: 'var(--glass-border)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '2rem',
                    backdropFilter: 'var(--glass-backdrop)'
                }}>
                    {/* Table Header */}
                    <div className="comparison-header" style={{
                        paddingBottom: '1rem',
                        borderBottom: '1px solid var(--color-border)',
                        fontWeight: 'bold',
                        fontSize: '1.2rem'
                    }}>
                        <div>Feature</div>
                        <div style={{ color: 'var(--color-primary)' }}>Revolt</div>
                        <div style={{ color: 'var(--color-text-secondary)' }}>Human Sales Reps</div>
                    </div>

                    {/* Table Rows */}
                    {comparisonData.map((item, index) => (
                        <motion.div
                            key={index}
                            className="comparison-row"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            style={{
                                padding: '1.5rem 0',
                                borderBottom: index !== comparisonData.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none'
                            }}
                        >
                            <div style={{ fontWeight: '600', display: 'flex', alignItems: 'center' }}>{item.feature}</div>
                            <div>
                                <div style={{ fontWeight: '600', color: 'var(--color-text)', marginBottom: '0.25rem' }}>{item.ai.title}</div>
                                <div style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>{item.ai.desc}</div>
                            </div>
                            <div>
                                <div style={{ fontWeight: '600', color: 'var(--color-text-secondary)', marginBottom: '0.25rem' }}>{item.human.title}</div>
                                <div style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', opacity: 0.8 }}>{item.human.desc}</div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Stats Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '1rem' }}>
                            Speed-to-Lead Is <span style={{ color: '#ff4d4d' }}>Killing</span> Your Close Rate
                        </h2>
                        <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                            Every minute you wait, a competitor calls your lead first.
                        </p>
                        <p style={{ color: 'var(--color-text)', fontWeight: '600' }}>
                            Slow follow-up = lost deals and wasted ad spend.
                        </p>
                    </div>

                    <div className="stats-grid" style={{ gap: '2rem' }}>
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ y: -5 }}
                                style={{
                                    background: 'rgba(255, 255, 255, 0.03)',
                                    border: '1px solid rgba(255, 255, 255, 0.05)',
                                    borderRadius: 'var(--radius-lg)',
                                    padding: '2rem',
                                    textAlign: 'center'
                                }}
                            >
                                <div style={{
                                    fontSize: '3.5rem',
                                    fontWeight: '800',
                                    background: 'var(--gradient-primary)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    marginBottom: '1rem'
                                }}>
                                    {stat.value}
                                </div>
                                <p style={{ color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
                                    {stat.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    <div style={{
                        marginTop: '3rem',
                        textAlign: 'center',
                        fontSize: '0.9rem',
                        color: 'var(--color-text-secondary)',
                        opacity: 0.6
                    }}>
                        Sources: Velocify, Hbr and Business Review, Bridge Group SDR/BDR Report
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
