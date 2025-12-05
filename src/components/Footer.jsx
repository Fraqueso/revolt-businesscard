import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useModal } from '../context/ModalContext';

export default function Footer() {
    const { openModal } = useModal();
    
    const handleLinkClick = () => {
        window.scrollTo(0, 0);
    };

    const handleContactClick = (e) => {
        e.preventDefault();
        openModal();
    };

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
                            {/* Removed Integrations, Pricing */}
                            {['Features', 'Journey Map', 'Simulator'].map((item, i) => (
                                <li key={i} style={{ marginBottom: '0.75rem' }}>
                                    <Link 
                                        to={item === 'Journey Map' ? '/journey-map' : item === 'Simulator' ? '/simulator' : '/'} 
                                        onClick={handleLinkClick}
                                        style={{ color: 'var(--color-text-secondary)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }} 
                                        className="footer-link"
                                    >
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 2 - Resources */}
                    <div>
                        <h4 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '1.5rem', color: 'white' }}>Resources</h4>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            {/* Removed Blog, Documentation */}
                            {['Case Studies', 'Support'].map((item, i) => (
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
                            {/* Removed Careers */}
                            <li style={{ marginBottom: '0.75rem' }}>
                                <Link 
                                    to="/about"
                                    onClick={handleLinkClick}
                                    style={{ color: 'var(--color-text-secondary)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }} 
                                    className="footer-link"
                                >
                                    About
                                </Link>
                            </li>
                            <li style={{ marginBottom: '0.75rem' }}>
                                <a 
                                    href="#"
                                    onClick={handleContactClick}
                                    style={{ color: 'var(--color-text-secondary)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }} 
                                    className="footer-link"
                                >
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Column 4 - Legal */}
                    <div>
                        <h4 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '1.5rem', color: 'white' }}>Legal</h4>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            {['Privacy Policy', 'Terms of Service', 'Security'].map((item, i) => (
                                <li key={i} style={{ marginBottom: '0.75rem' }}>
                                    <Link 
                                        to={item === 'Privacy Policy' ? '/privacy' : item === 'Terms of Service' ? '/terms' : '#'}
                                        onClick={handleLinkClick}
                                        style={{ color: 'var(--color-text-secondary)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }} 
                                        className="footer-link"
                                    >
                                        {item}
                                    </Link>
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
                    {/* Removed Social Icons */}
                </div>
            </div>
        </footer>
    );
}
