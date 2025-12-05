import React from 'react';
import { motion } from 'framer-motion';
import { useModal } from '../context/ModalContext';

const ClockIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </svg>
);

export default function RiskFreeSection() {
    const { openModal } = useModal();

    return (
        <section className="section-padding" style={{ position: 'relative', overflow: 'hidden' }}>
            
            {/* Decorative Background Elements */}
            <div style={{
                position: 'absolute',
                bottom: '0%',
                left: '0%',
                width: '300px',
                height: '300px',
                background: 'radial-gradient(circle, #22C55E 0%, transparent 70%)',
                filter: 'blur(100px)',
                opacity: 0.15,
                pointerEvents: 'none',
                zIndex: 0
            }} />
            
            <div style={{
                position: 'absolute',
                top: '0%',
                right: '0%',
                width: '400px',
                height: '400px',
                background: 'radial-gradient(circle, #8B5CF6 0%, transparent 70%)',
                filter: 'blur(120px)',
                opacity: 0.2,
                pointerEvents: 'none',
                zIndex: 0
            }} />

            {/* Network Lines (Simulated) */}
            <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', opacity: 0.4, zIndex: 0 }}>
                <circle cx="10%" cy="20%" r="2" fill="rgba(139, 92, 246, 0.4)" />
                <circle cx="85%" cy="15%" r="2" fill="rgba(139, 92, 246, 0.4)" />
                <circle cx="50%" cy="50%" r="2" fill="rgba(139, 92, 246, 0.4)" />
                <line x1="10%" y1="20%" x2="50%" y2="50%" stroke="rgba(139, 92, 246, 0.1)" strokeWidth="1" />
                <line x1="85%" y1="15%" x2="50%" y2="50%" stroke="rgba(139, 92, 246, 0.1)" strokeWidth="1" />
            </svg>

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                
                {/* Case Study Hero Component */}
                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: '4rem', marginBottom: '6rem' }}>
                    
                    {/* Left Column (60%) */}
                    <div style={{ flex: '1 1 60%', minWidth: '300px' }}>
                        <p style={{ color: '#8B5CF6', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '1rem' }}>
                            CASE STUDY
                        </p>
                        <h2 style={{ fontSize: 'min(8vw, 42px)', fontWeight: 'bold', color: 'white', marginBottom: '1.5rem', lineHeight: '1.2' }}>
                            30-Second Response Time Generates $85K+ Pipeline in 30 Days
                        </h2>
                        <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.7)', lineHeight: '1.6', marginBottom: '2rem' }}>
                            Digital marketing agency transforms cold leads into booked appointments with instant voice agent follow-up
                        </p>
                        
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '2.5rem' }}>
                            <div style={{ background: 'rgba(34, 197, 94, 0.1)', padding: '10px', borderRadius: '50%' }}>
                                <ClockIcon className="w-6 h-6" style={{ width: '24px', height: '24px', color: '#22C55E' }} />
                            </div>
                            <div>
                                <p style={{ color: 'white', fontWeight: 'bold', fontSize: '16px', marginBottom: '0.2rem' }}>
                                    30 seconds vs. 47 hours average
                                </p>
                                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px' }}>
                                    Response time that captures peak interest
                                </p>
                            </div>
                        </div>

                        <a 
                            href="/assets/Case Study Speed to Lead for Digital Marketing Agencies.pdf" 
                            download="Speed_To_Lead_Case_Study.pdf"
                            style={{ 
                                display: 'inline-block',
                                padding: '12px 24px', 
                                border: '1px solid #8B5CF6', 
                                borderRadius: '8px', 
                                color: '#8B5CF6', 
                                textDecoration: 'none', 
                                fontWeight: '500',
                                transition: 'all 0.3s ease',
                                cursor: 'pointer'
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.backgroundColor = '#8B5CF6';
                                e.target.style.color = 'white';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.backgroundColor = 'transparent';
                                e.target.style.color = '#8B5CF6';
                            }}
                        >
                            Read Full Case Study
                        </a>
                    </div>

                    {/* Right Column (40%) - Stats Card */}
                    <div style={{ flex: '1 1 35%', minWidth: '300px' }}>
                        <div style={{
                            background: 'rgba(30, 30, 50, 0.5)',
                            border: '1px solid rgba(139, 92, 246, 0.3)',
                            borderRadius: '16px',
                            backdropFilter: 'blur(10px)',
                            overflow: 'hidden'
                        }}>
                            {/* 2x2 Stats Grid */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', padding: '2rem' }}>
                                <div>
                                    <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#22C55E', marginBottom: '0.5rem' }}>$85K+</div>
                                    <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)' }}>Pipeline Generated</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#8B5CF6', marginBottom: '0.5rem' }}>30sec</div>
                                    <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)' }}>Response Time</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '36px', fontWeight: 'bold', color: 'white', marginBottom: '0.5rem' }}>17</div>
                                    <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)' }}>Appointments Booked</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#3B82F6', marginBottom: '0.5rem' }}>40.1%</div>
                                    <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)' }}>Answer Rate</div>
                                </div>
                            </div>

                            {/* Bottom Stats Bar */}
                            <div style={{
                                background: 'rgba(20, 20, 35, 0.6)',
                                borderTop: '1px solid rgba(255,255,255,0.1)',
                                padding: '1.5rem 2rem',
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
                                gap: '1.5rem'
                            }}>
                                <div>
                                    <div style={{ color: 'white', fontWeight: 'bold', fontSize: '24px' }}>339</div>
                                    <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px' }}>Total Calls Made</div>
                                </div>
                                <div>
                                    <div style={{ color: 'white', fontWeight: 'bold', fontSize: '24px' }}>166</div>
                                    <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px' }}>Unique Contacts</div>
                                </div>
                                <div>
                                    <div style={{ color: 'white', fontWeight: 'bold', fontSize: '24px' }}>10.2%</div>
                                    <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px' }}>Conversion Rate</div>
                                </div>
                                <div>
                                    <div style={{ color: 'white', fontWeight: 'bold', fontSize: '24px' }}>30</div>
                                    <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px' }}>Days to Results</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Risk Free Trial Card - Kept as requested */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    style={{
                        border: '1px solid var(--color-primary)',
                        borderRadius: '1rem',
                        padding: '4rem 2rem',
                        textAlign: 'center',
                        position: 'relative',
                        maxWidth: '900px',
                        margin: '0 auto'
                    }}
                >
                    {/* Glow effect */}
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '100%',
                        height: '100%',
                        background: 'radial-gradient(circle at center, rgba(112, 66, 248, 0.15) 0%, transparent 70%)',
                        pointerEvents: 'none'
                    }} />

                    <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '1.5rem' }}>
                        Try Revolt <span className="text-gradient">Risk-Free</span>
                    </h2>
                    
                    <p style={{ fontSize: '1.25rem', color: 'var(--color-text)', marginBottom: '1rem', fontWeight: '500' }}>
                        Your first 3 days worth of calls are on us!
                    </p>
                    
                    <p style={{ fontSize: '1.1rem', color: 'var(--color-text-secondary)', marginBottom: '2.5rem', lineHeight: '1.6', maxWidth: '700px', marginLeft: 'auto', marginRight: 'auto' }}>
                        No contracts. Not unless you're satisfied. If you're not seeing results in 3 days, we'll refund every penny and part as friends.
                    </p>

                    <button 
                        onClick={openModal}
                        className="btn btn-primary btn-glow-hover"
                        style={{ fontSize: '1.2rem', padding: '1rem 3rem' }}
                    >
                        Start Your Risk-Free Trial
                    </button>
                </motion.div>
            </div>
        </section>
    );
}
