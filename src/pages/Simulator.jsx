import React, { useState } from 'react';
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

    return (
        <div className="page-content" style={{ paddingTop: '8rem', paddingBottom: '4rem' }}>
            <div className="container">
                <div style={{ marginBottom: '6rem' }}>
                    <SimulatorCarousel />
                </div>

                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h1 className="page-title">
                        Speed-to-Lead <span className="text-gradient">Impact Calculator</span>
                    </h1>
                    <p style={{ color: 'var(--color-text-secondary)', maxWidth: '900px', margin: '0 auto', fontSize: '1.5rem', lineHeight: '1.4' }}>
                        See exactly how much revenue slow response times are costing you every single month.
                    </p>
                </div>

                <div style={{
                    maxWidth: '800px',
                    margin: '0 auto',
                    background: 'var(--color-bg-secondary)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-lg)',
                    padding: 'clamp(1.5rem, 5vw, 3rem)' // Responsive padding
                }}>
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
                </div>
            </div>
        </div>
    );
}
