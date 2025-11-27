import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useModal } from '../context/ModalContext';

export default function Header() {
    const { scrollToHero, refreshPage, setShouldScrollToHero } = useModal();
    const location = useLocation();
    const navigate = useNavigate();

    const handleNavClick = (path) => {
        window.scrollTo(0, 0);
        // Only force refresh if staying on same page to restart animations
        // Otherwise, the route change itself will handle the remount
        if (location.pathname === path) {
            refreshPage();
        }
    };

    const handleTalkToAIClick = () => {
        if (location.pathname === '/') {
            scrollToHero();
        } else {
            setShouldScrollToHero(true);
            navigate('/');
        }
    };

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
                    <Link to="/" onClick={() => handleNavClick('/')} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
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
                        <Link to="/integrations" className="nav-link" onClick={() => handleNavClick('/integrations')}>Integrations</Link>
                        <Link to="/journey-map" className="nav-link" onClick={() => handleNavClick('/journey-map')}>Journey Map</Link>
                        <Link to="/simulator" className="nav-link" onClick={() => handleNavClick('/simulator')}>Simulator</Link>

                        <button
                            onClick={handleTalkToAIClick}
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
