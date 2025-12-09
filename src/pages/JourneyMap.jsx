import React from 'react';
import { motion } from 'framer-motion';
import { useModal } from '../context/ModalContext';

export default function Pricing() {
    const { openModal } = useModal();

    const plans = [
        {
            name: 'Starter',
            label: 'Solopreneur',
            price: '$332/mo',
            summary: 'Least flexible—built to perfectly handle inbound call volume with a proven playbook.',
            features: [
                'Inbound coverage, biz hours',
                'Call recording & CRM notes',
                'Booking + warm transfers',
                'One trained brand voice'
            ],
            cta: 'Book a demo'
        },
        {
            name: 'Growth',
            label: 'Most teams',
            price: 'Usage-based',
            summary: 'Scale past one location with live transfers, follow-ups, and blended inbound/outbound.',
            features: [
                '24/7 coverage w/ escalation',
                'Multi-location routing',
                'Outbound speed-to-lead callbacks',
                'QA + continuous tuning'
            ],
            badge: 'Most popular',
            cta: 'Book a demo'
        },
        {
            name: 'Enterprise',
            label: 'Custom',
            price: 'Talk to us',
            summary: 'For regulated, multi-brand, high-volume teams that need tight control.',
            features: [
                'Custom SLAs & deployment',
                'Analytics exports & reviews',
                'Security reviews & data residency',
                'Dedicated enablement + integration'
            ],
            cta: 'Contact sales'
        }
    ];

    const journeySteps = [
        { step: '1. Lead Inbound', val: '100%', color: '#3b82f6' },
        { step: '2. Response < 5min', val: '42%', color: '#8b5cf6' },
        { step: '3. Conversation Started', val: '28%', color: '#ec4899' },
        { step: '4. Appointment Booked', val: '15%', color: '#10b981' }
    ];

    const collapsedHeight = 340;
    const expandedHeight = 560;

    const cardVariants = {
        rest: {
            y: 0,
            scale: 1,
            height: collapsedHeight,
            borderColor: 'rgba(255,255,255,0.08)',
            background: 'linear-gradient(180deg, rgba(112,66,248,0.20) 0%, rgba(46,24,120,0.26) 100%)',
            boxShadow: '0 10px 40px rgba(112,66,248,0.18)'
        },
        hover: {
            y: -8,
            scale: 1.015,
            height: expandedHeight,
            borderColor: 'rgba(112,66,248,0.6)',
            background: 'linear-gradient(180deg, #2a155f 0%, #120a2c 100%)',
            boxShadow: '0 14px 48px rgba(112,66,248,0.35)'
        }
    };

    const hintVariants = {
        rest: { opacity: 1, height: 'auto', marginTop: '0.35rem' },
        hover: { opacity: 0, height: 0, marginTop: 0 }
    };

    const revealVariants = {
        rest: { opacity: 0, maxHeight: 0 },
        hover: { opacity: 1, maxHeight: 800 }
    };

    return (
        <div className="page-content pricing-page" style={{ paddingTop: '8rem', paddingBottom: '5rem' }}>
            <style>{`
                @media (max-width: 480px) {
                    .pricing-page .page-title {
                        font-size: clamp(1.6rem, 7vw, 2.2rem);
                        line-height: 1.2;
                    }
                    .pricing-page .plan-card {
                        padding: 1.5rem !important;
                        gap: 0.75rem !important;
                    }
                    .pricing-page .plan-label {
                        font-size: 0.85rem !important;
                        letter-spacing: 0.12em !important;
                    }
                    .pricing-page .plan-name {
                        font-size: 2.1rem !important;
                        letter-spacing: 0.08em !important;
                    }
                    .pricing-page .plan-cta {
                        width: 100%;
                    }
                    .pricing-page .hero-pill {
                        margin-top: 0.75rem !important;
                    }
                    .pricing-page .growth-card {
                        padding: 1.5rem !important;
                    }
                    .pricing-page .growth-card h2 {
                        font-size: clamp(1.4rem, 5.5vw, 1.8rem) !important;
                        line-height: 1.15 !important;
                        margin-bottom: 0.35rem !important;
                    }
                    .pricing-page .growth-card p {
                        font-size: 0.92rem !important;
                        line-height: 1.45 !important;
                        margin-bottom: 0.75rem !important;
                    }
                    .pricing-page .growth-card span {
                        font-size: 0.85rem !important;
                    }
                    .pricing-page .growth-card .glass-card {
                        padding: 1rem !important;
                    }
                    .pricing-page .growth-card .growth-pill {
                        padding: 0.4rem 0.7rem !important;
                        letter-spacing: 0.02em !important;
                    }
                    .pricing-page .growth-card .roi-card div {
                        font-size: 0.95rem !important;
                        line-height: 1.45 !important;
                    }
                    .pricing-page .growth-card .roi-card div div:first-child {
                        font-size: 1.05rem !important;
                    }
                }
            `}</style>
            <div className="container">
                <motion.section
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.5 }}
                    style={{ textAlign: 'center', marginBottom: '3.5rem' }}
                >
                    <div style={{ display: 'inline-flex', gap: '0.5rem', alignItems: 'center', padding: '0.5rem 1rem', borderRadius: '999px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)', marginBottom: '1.25rem' }}>
                        <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--color-primary)', boxShadow: '0 0 10px rgba(112, 66, 248, 0.7)' }} />
                        <span style={{ letterSpacing: '0.05em', textTransform: 'uppercase', fontSize: '0.9rem', color: 'var(--color-text)' }}>Pricing</span>
                    </div>
                    <h1 className="page-title" style={{ marginBottom: '1rem' }}>
                        Simple, Scalable Pricing <span className="text-gradient">Starting at $332/month</span>
                    </h1>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.55rem 0.9rem', background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: '999px', marginTop: '1rem', color: '#a5f3bc', fontWeight: 600 }}>
                        <span style={{ fontSize: '0.85rem' }}>Most customers see 3-10x ROI within 90 days</span>
                    </div>
                    <div style={{ marginTop: '1.75rem', display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                        <button
                            onClick={openModal}
                            className="btn btn-primary btn-glow-hover"
                            style={{ padding: '0.9rem 1.8rem', fontSize: '1rem' }}
                        >
                            Talk pricing with us
                        </button>
                        <a className="btn btn-accent" href="/simulator" style={{ padding: '0.9rem 1.8rem', fontSize: '1rem' }}>
                            Hear the agent live
                        </a>
                    </div>
                </motion.section>

                <motion.section
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.5, delay: 0.05 }}
                    style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '4rem' }}
                >
                    {plans.map((plan) => (
                        <motion.div
                            key={plan.name}
                            className="glass-card plan-card"
                            variants={cardVariants}
                            initial="rest"
                            animate="rest"
                            whileHover="hover"
                            style={{
                                padding: '2rem',
                                border: '1px solid rgba(112,66,248,0.35)',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1rem',
                                position: 'relative',
                                overflow: 'hidden',
                                justifyContent: 'center'
                            }}
                        >
                            <div style={{ textAlign: 'center', margin: '0 auto' }}>
                                <p style={{
                                    margin: 0,
                                    color: 'var(--color-primary)',
                                    letterSpacing: 'clamp(0.06em, 0.5vw, 0.16em)',
                                    fontWeight: 800,
                                    textTransform: 'uppercase',
                                    fontSize: 'clamp(0.8rem, 1.9vw, 0.95rem)',
                                    opacity: 0.8,
                                    whiteSpace: 'nowrap'
                                }} className="plan-label">
                                    {plan.label}
                                </p>
                                <h2 style={{
                                    margin: '0.5rem 0',
                                    fontSize: 'clamp(1.2rem, 5vw, 2.6rem)',
                                    fontWeight: 900,
                                    letterSpacing: 'clamp(0.04em, 1vw, 0.12em)',
                                    textTransform: 'uppercase',
                                    lineHeight: 1.05,
                                    wordBreak: 'normal',
                                    whiteSpace: 'nowrap',
                                    maxWidth: '100%',
                                    overflow: 'hidden'
                                }} className="plan-name">
                                    {plan.name}
                                </h2>
                                <motion.button
                                    type="button"
                                    variants={hintVariants}
                                    style={{
                                        padding: '0.35rem 0.75rem',
                                        borderRadius: '999px',
                                        border: '1px solid rgba(255,255,255,0.16)',
                                        background: 'rgba(255,255,255,0.05)',
                                        color: 'var(--color-text)',
                                        fontSize: '0.8rem',
                                        letterSpacing: '0.05em',
                                        textTransform: 'uppercase',
                                        cursor: 'default'
                                    }}
                                >
                                    Hover to discover
                                </motion.button>
                            </div>

                            <motion.div
                                variants={revealVariants}
                                transition={{ duration: 0.35, ease: 'easeOut' }}
                                style={{ overflow: 'hidden', display: 'grid', gap: '0.75rem' }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem' }}>
                                    <div>
                                        <p style={{ margin: 0, color: 'var(--color-text-secondary)', fontSize: '0.95rem', letterSpacing: '0.02em' }}>Billed monthly</p>
                                        <div style={{ fontSize: '1.6rem', fontWeight: 800 }}>{plan.price}</div>
                                    </div>
                                </div>
                                <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: 0 }}>{plan.summary}</p>
                                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '0.6rem' }}>
                                    {plan.features.map((feature) => (
                                        <li key={feature} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                                            <span style={{ color: 'var(--color-primary)', fontWeight: 700 }}>✓</span>
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <button
                                    onClick={openModal}
                                    className={`btn ${plan.cta === 'Contact sales' ? 'btn-accent' : 'btn-primary'} btn-glow-hover plan-cta`}
                                    style={{ marginTop: 'auto' }}
                                >
                                    {plan.cta}
                                </button>
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.section>

                <motion.section
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="glass-card growth-card"
                    style={{ padding: '2.25rem', marginBottom: '4rem' }}
                >
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', alignItems: 'center' }}>
                        <div>
                            <h2 className="page-title" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                                Built to grow with you
                            </h2>
                            <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: '1rem' }}>
                                Start lean, then layer on locations, numbers, languages, and outbound sequences without renegotiating every time volume spikes.
                            </p>
                            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                                {['No seat minimums', 'Month-to-month friendly', 'Volume-based discounts', 'White-glove onboarding'].map((item) => (
                                    <span key={item} className="growth-pill" style={{ padding: '0.5rem 0.85rem', borderRadius: '999px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="glass-card roi-card" style={{ background: 'rgba(255,255,255,0.03)', border: '1px dashed rgba(255,255,255,0.08)', padding: '1.5rem' }}>
                            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', color: 'var(--color-text-secondary)', fontSize: '1.05rem', lineHeight: 1.6 }}>
                                <span style={{ fontSize: '1.6rem' }}>💰</span>
                                <div>
                                    <div style={{ fontWeight: 700, color: 'var(--color-text)' }}>ROI Stack</div>
                                    <div>Fewer missed calls → More booked revenue → Faster payback.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.section>
            </div>

            {/* Speed-to-lead context anchored at the bottom */}
            <section style={{ width: '100%', padding: '0 5%', marginBottom: '4rem' }}>
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.5 }}
                    style={{ textAlign: 'center', marginBottom: '2.5rem', display: 'grid', gap: '0.65rem' }}
                >
                    <p style={{ letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--color-primary)', fontWeight: 700, marginBottom: '0.5rem' }}>
                        Speed-to-lead journey
                    </p>
                    <h2 className="page-title" style={{ marginBottom: '0.75rem' }}>
                        See where leads leak… and where pricing pays for itself
                    </h2>
                    <p style={{ color: 'var(--color-text-secondary)', maxWidth: '900px', margin: '0 auto', lineHeight: 1.7 }}>
                        Keep the full funnel in view while you choose a plan. Improving each handoff is how most teams unlock 3-10x ROI inside 90 days.
                    </p>
                </motion.div>
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '2rem',
                        maxWidth: '1800px',
                        margin: '0 auto'
                    }}
                >
                    {journeySteps.map((item, i) => (
                        <motion.div
                            key={item.step}
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-80px' }}
                            transition={{ duration: 0.45, delay: i * 0.05 }}
                            style={{
                                background: 'linear-gradient(180deg, var(--color-bg-secondary) 0%, rgba(112, 66, 248, 0.05) 100%)',
                                border: '1px solid var(--color-border)',
                                borderRadius: 'var(--radius-lg)',
                                padding: '3rem 2rem',
                                textAlign: 'center',
                                position: 'relative',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                minHeight: '350px'
                            }}
                        >
                            <div style={{
                                fontSize: '1.1rem',
                                color: 'var(--color-text)',
                                marginBottom: '1.5rem',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                                fontWeight: '600'
                            }}>
                                {item.step}
                            </div>
                            <div style={{
                                fontSize: '5rem',
                                fontWeight: '700',
                                color: item.color,
                                lineHeight: '1'
                            }}>
                                {item.val}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.5 }}
                    className="glass-card"
                    style={{ textAlign: 'center', padding: '2.5rem', borderColor: 'rgba(112,66,248,0.35)' }}
                >
                    <p style={{ fontSize: '1.15rem', color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>
                        Most businesses lose 60% of leads before a conversation even starts.
                    </p>
                    <h3 style={{ fontSize: '1.9rem', marginBottom: '1.25rem' }}>
                        Fix your funnel with Revolt. Keep every caller.
                    </h3>
                    <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <button 
                            onClick={openModal} 
                            className="btn btn-primary btn-glow-hover"
                            style={{ padding: '0.9rem 1.6rem' }}
                        >
                            Talk to sales
                        </button>
                        <a className="btn btn-accent" href="/simulator" style={{ padding: '0.9rem 1.6rem' }}>
                            See pricing in action
                        </a>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
