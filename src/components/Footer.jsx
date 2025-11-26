import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer style={{ borderTop: '1px solid var(--color-border)', padding: '4rem 0', marginTop: '4rem' }}>
            <div className="container">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
                    <div>
                        <div className="logo" style={{ marginBottom: '1rem' }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Revolt
                        </div>
                        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
                            © 2025 Revolt. All rights reserved.
                        </p>
                    </div>

                    <div style={{ display: 'flex', gap: '2rem' }}>
                        <Link to="/privacy" style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>Privacy Policy</Link>
                        <Link to="/terms" style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>Terms of Service</Link>
                        <a href="#" style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>Contact</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
