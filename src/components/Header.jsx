import React from 'react';
import { Link } from 'react-router-dom';
import { useModal } from '../context/ModalContext';

export default function Header() {
    const { scrollToHero } = useModal();

    return (
        <header style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            zIndex: 100,
            background: 'rgba(3, 0, 20, 0.8)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
        }}>
            <div className="container">
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    height: '80px'
                }}>
                    {/* Logo */}
                    <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{
                            width: '40px',
                            height: '40px',
                            background: 'var(--gradient-primary)',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.5rem'
                        }}>
                            ⚡
                        </div>
                        <span style={{
                            fontSize: '1.5rem',
                            fontWeight: '800',
                            color: 'white',
                            letterSpacing: '-0.02em'
                        }}>
                            Revolt
                        </span>
                    </Link>

                    {/* Navigation */}
                    <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                        <Link to="/integrations" className="nav-link">Integrations</Link>
                        <Link to="/journey-map" className="nav-link">Journey Map</Link>
                        <Link to="/simulator" className="nav-link">Simulator</Link>

                        <button
                            onClick={scrollToHero}
                            className="btn btn-primary"
                            style={{
                                padding: '0.5rem 1.5rem',
                                fontSize: '0.9rem'
                            }}
                        >
                            Talk to AI
                        </button>
                    </nav>
                </div>
            </div>
        </header>
    );
}
