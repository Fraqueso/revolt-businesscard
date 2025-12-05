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
                <div className="header-inner">
                    {/* Logo */}
                    <Link to="/" onClick={() => handleNavClick('/')} className="header-logo">
                        <div className="logo-icon">
                            ⚡
                        </div>
                        <span className="logo-text">
                            Revolt
                        </span>
                    </Link>

                    {/* Navigation */}
                    <nav className="header-nav">
                        <Link to="/about" className="nav-link" onClick={() => handleNavClick('/about')}>About</Link>
                        <Link to="/journey-map" className="nav-link" onClick={() => handleNavClick('/journey-map')}>Journey Map</Link>
                        <Link to="/simulator" className="nav-link" onClick={() => handleNavClick('/simulator')}>Simulator</Link>

                        <button
                            onClick={handleTalkToAIClick}
                            className="btn btn-primary nav-btn btn-glow-hover"
                        >
                            Get Started
                        </button>
                    </nav>
                </div>
            </div>
        </header>
    );
}
