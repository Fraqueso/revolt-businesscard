import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <header className="header">
            <div className="container header-content">
                <Link to="/" className="logo">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Revolt
                </Link>

                <nav className="nav-links">
                    <Link to="/" className="nav-link">Features</Link>
                    <Link to="/integrations" className="nav-link">Integrations</Link>
                    <Link to="/journey-map" className="nav-link">Journey Map</Link>
                    <Link to="/simulator" className="nav-link">Simulator</Link>
                </nav>

                <button className="btn btn-primary">
                    Talk to AI
                </button>
            </div>
        </header>
    );
}
