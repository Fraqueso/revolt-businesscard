import React from 'react';
import { motion } from 'framer-motion';

export default function Footer() {
    return (
        <footer style={{
            background: 'rgba(3, 0, 20, 0.95)',
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            padding: '4rem 0 2rem',
            position: 'relative',
            zIndex: 10
        }}>
            <div className="container">
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '3rem',
                    marginBottom: '4rem'
                }}>
                    {/* Column 1 - Product */}
                    <div>
                        <h4 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '1.5rem', color: 'white' }}>Product</h4>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            {['Features', 'Integrations', 'Journey Map', 'Simulator', 'Pricing'].map((item, i) => (
                                <li key={i} style={{ marginBottom: '0.75rem' }}>
                                    <a href="#" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }} className="footer-link">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 2 - Resources */}
                    <div>
                        <h4 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '1.5rem', color: 'white' }}>Resources</h4>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            {['Case Studies', 'Blog', 'Documentation', 'Support'].map((item, i) => (
                                <li key={i} style={{ marginBottom: '0.75rem' }}>
                                    <a href="#" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }} className="footer-link">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3 - Company */}
                    <div>
                        <h4 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '1.5rem', color: 'white' }}>Company</h4>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            {['About', 'Careers', 'Contact'].map((item, i) => (
                                <li key={i} style={{ marginBottom: '0.75rem' }}>
                                    <a href="#" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }} className="footer-link">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 4 - Legal */}
                    <div>
                        <h4 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '1.5rem', color: 'white' }}>Legal</h4>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            {['Privacy Policy', 'Terms of Service', 'Security'].map((item, i) => (
                                <li key={i} style={{ marginBottom: '0.75rem' }}>
                                    <a href="#" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }} className="footer-link">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div style={{
                    borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                    paddingTop: '2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '1rem',
                    textAlign: 'center'
                }}>
                    <div className="logo" style={{ fontSize: '1.5rem' }}>
                        Revolt
                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
                        © 2025 Revolt. All rights reserved.
                    </p>
                    <div style={{ display: 'flex', gap: '1.5rem' }}>
                        {/* Social Icons Placeholder */}
                        {['Twitter', 'LinkedIn', 'GitHub'].map((social, i) => (
                            <a key={i} href="#" style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', textDecoration: 'none' }}>
                                {social}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
