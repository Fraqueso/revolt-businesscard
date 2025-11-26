import React from 'react';

export default function Privacy() {
    return (
        <div className="page-content" style={{ paddingTop: '8rem', paddingBottom: '4rem' }}>
            <div className="container" style={{ maxWidth: '800px' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '2rem' }}>Privacy Policy</h1>
                <div style={{ color: 'var(--color-text-secondary)', lineHeight: '1.8' }}>
                    <p style={{ marginBottom: '1rem' }}>Last updated: November 25, 2025</p>
                    <p style={{ marginBottom: '1rem' }}>
                        At Revolt ("we", "us", or "our"), we are committed to protecting your personal information and your right to privacy.
                        If you have any questions or concerns about this privacy notice, or our practices with regards to your personal information,
                        please contact us at support@revolt.com.
                    </p>
                    <h2 style={{ fontSize: '1.5rem', color: 'var(--color-text)', marginTop: '2rem', marginBottom: '1rem' }}>
                        1. WHAT INFORMATION DO WE COLLECT?
                    </h2>
                    <p style={{ marginBottom: '1rem' }}>
                        We collect personal information that you voluntarily provide to us when you register on the Website,
                        express an interest in obtaining information about us or our products and Services, when you participate
                        in activities on the Website or otherwise when you contact us.
                    </p>
                    <h2 style={{ fontSize: '1.5rem', color: 'var(--color-text)', marginTop: '2rem', marginBottom: '1rem' }}>
                        2. HOW DO WE USE YOUR INFORMATION?
                    </h2>
                    <p style={{ marginBottom: '1rem' }}>
                        We use personal information collected via our Website for a variety of business purposes described below.
                        We process your personal information for these purposes in reliance on our legitimate business interests,
                        in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
                    </p>
                </div>
            </div>
        </div>
    );
}
