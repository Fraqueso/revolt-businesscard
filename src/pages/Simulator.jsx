import React, { useState } from 'react';

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
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h1 style={{ fontSize: '3rem', fontWeight: '700', marginBottom: '1rem' }}>
                        Speed-to-Lead <span className="text-gradient">Impact Calculator</span>
                    </h1>
                    <p style={{ color: 'var(--color-text-secondary)', maxWidth: '700px', margin: '0 auto', fontSize: '1.2rem' }}>
                        See exactly how much revenue slow response times are costing you every single month.
                    </p>
                </div>

                <div style={{
                    maxWidth: '800px',
                    margin: '0 auto',
                    background: 'var(--color-bg-secondary)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '3rem'
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
                        <div style={{ fontSize: '3rem', fontWeight: '700', color: 'var(--color-primary)' }}>
                            ${calculateLostRevenue().toLocaleString()}{calculateLostRevenue() >= MAX_REVENUE ? '+' : ''}
                        </div>
                        <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', marginTop: '1rem' }}>
                            With Revolt's instant response, you could capture 50% more of your missed opportunities.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
