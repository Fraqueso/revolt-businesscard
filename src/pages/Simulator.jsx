import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SimulatorCarousel from '../components/SimulatorCarousel';

export default function Simulator() {
    const [leads, setLeads] = useState(100);
    const [conversionRate, setConversionRate] = useState(2);
    const [dealValue, setDealValue] = useState(500);

    const calculateRevenue = () => {
        return leads * (conversionRate / 100) * dealValue;
    };

    const MAX_REVENUE = 9999999999999999;

    const calculateLostRevenue = () => {
        // Assuming 50% improvement with Revolt
        const revenue = calculateRevenue() * 0.5;
        return revenue > MAX_REVENUE ? MAX_REVENUE : revenue;
    };

    const fadeInUp = {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: '-100px' },
        transition: { duration: 0.6, ease: 'easeOut' }
    };

    return (
        <div className="page-content" style={{ paddingTop: '8rem', paddingBottom: '4rem' }}>
            <div className="container">
                <motion.section {...fadeInUp} style={{ marginBottom: '6rem', textAlign: 'center' }}>
                    <div style={{ display: 'inline-flex', gap: '0.5rem', alignItems: 'center', padding: '0.5rem 1rem', borderRadius: '999px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)', marginBottom: '1.5rem' }}>
                        <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--color-primary)', boxShadow: '0 0 10px rgba(112, 66, 248, 0.7)' }} />
                        <span style={{ letterSpacing: '0.05em', textTransform: 'uppercase', fontSize: '0.9rem', color: 'var(--color-text)' }}>Simulator</span>
                    </div>
                    <h2 className="page-title" style={{ 
                        textAlign: 'center', 
                        marginBottom: '3rem' 
                    }}>
                        Simulate Revolt's <span className="text-gradient">Many Use Cases</span>
                    </h2>
                    <SimulatorCarousel />
                </motion.section>

                <motion.section {...fadeInUp} style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h1 className="page-title">
                        Speed-to-Lead <span className="text-gradient">Impact Calculator</span>
                    </h1>
                    <p style={{ color: 'var(--color-text-secondary)', maxWidth: '900px', margin: '0 auto', fontSize: '1.5rem', lineHeight: '1.4' }}>
                        See exactly how much revenue slow response times are costing you every single month.
                    </p>
                </motion.section>

                <motion.section
                    {...fadeInUp}
                    style={{
                        maxWidth: '800px',
                        margin: '0 auto',
                        background: 'var(--color-bg-secondary)',
                        border: '1px solid var(--color-border)',
                        borderRadius: 'var(--radius-lg)',
                        padding: 'clamp(1.5rem, 5vw, 3rem)' // Responsive padding
                    }}
                >
                    <div style={{ display: 'grid', gap: '2rem', marginBottom: '3rem' }}>
                        <div className="form-group">
                            <label className="form-label">Monthly Leads</label>
                            <input
                                type="number"
                                className="form-input"
                                value={leads}
                                onChange={(e) => setLeads(e.target.value === '' ? '' : Number(e.target.value))}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Current Conversion Rate (%)</label>
                            <input
                                type="number"
                                className="form-input"
                                min="0"
                                max="100"
                                value={conversionRate}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    if (val === '') {
                                        setConversionRate('');
                                    } else {
                                        const num = Number(val);
                                        setConversionRate(num > 100 ? 100 : num);
                                    }
                                }}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Average Deal Value ($)</label>
                            <input
                                type="number"
                                className="form-input"
                                value={dealValue}
                                onChange={(e) => setDealValue(e.target.value === '' ? '' : Number(e.target.value))}
                            />
                        </div>
                    </div>

                    <div style={{
                        background: 'rgba(59, 130, 246, 0.1)',
                        borderRadius: 'var(--radius-md)',
                        padding: '2rem',
                        textAlign: 'center'
                    }}>
                        <h3 style={{ marginBottom: '0.5rem' }}>Potential Monthly Revenue Increase</h3>
                        <div className="simulator-result" style={{ 
                            fontSize: 'clamp(1.5rem, 5vw, 3rem)', 
                            fontWeight: '700', 
                            color: 'var(--color-primary)',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                        }}>
                            ${calculateLostRevenue().toLocaleString(undefined, { maximumFractionDigits: 2 })}{calculateLostRevenue() >= MAX_REVENUE ? '+' : ''}
                        </div>
                        
                        {/* Mobile font adjustment */}
                        <style>{`
                            @media (max-width: 480px) {
                                .simulator-result {
                                    font-size: clamp(1rem, 8vw, 2rem) !important;
                                }
                            }
                        `}</style>

                        <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', marginTop: '1rem' }}>
                            With Revolt's instant response, you could capture 50% more of your missed opportunities.
                            <br />
                            <small>*Results may vary</small>
                        </p>
                    </div>
                </motion.section>
            </div>
        </div>
    );
}
