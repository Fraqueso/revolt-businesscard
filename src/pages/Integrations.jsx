import React from 'react';

export default function Integrations() {
    const integrations = [
        "ServiceTitan", "Housecall Pro", "Jobber", "FieldEdge", "Workiz", "Successware"
    ];

    return (
        <div className="page-content" style={{ paddingTop: '8rem' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h1 style={{ fontSize: '3.5rem', fontWeight: '700', marginBottom: '1.5rem' }}>
                        Connect Revolt with your <span className="text-gradient">favorite tools</span>
                    </h1>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto' }}>
                        Revolt integrates seamlessly with the software you already use to run your business.
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '2rem',
                    marginBottom: '6rem'
                }}>
                    {integrations.map((tool, index) => (
                        <div key={index} style={{
                            background: 'var(--color-bg-secondary)',
                            border: '1px solid var(--color-border)',
                            borderRadius: 'var(--radius-lg)',
                            padding: '2rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.2rem',
                            fontWeight: '600',
                            minHeight: '120px'
                        }}>
                            {tool}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
