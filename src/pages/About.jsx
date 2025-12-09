import React from 'react';
import { motion } from 'framer-motion';
import DualProblem from '../components/DualProblem';

export default function About() {
    const fadeInUp = {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: '-100px' },
        transition: { duration: 0.6, ease: 'easeOut' }
    };

    const stagger = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.1 }
        }
    };

    const card = {
        hidden: { opacity: 0, y: 20 },
        show: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.45, ease: 'easeOut' }
        }
    };

    const stats = [
        { label: 'Conversion lift', value: '+42%', detail: 'Speed-to-lead conversions we see after deployment.' },
        { label: 'Coverage', value: '24/7/365', detail: 'No lapses, no “after hours” bounce. Every call matters.' },
        { label: 'Consistency', value: '100%', detail: 'Your best objection handling, repeated on every single call.' },
        { label: 'Speed to voice', value: '<1000ms', detail: 'Picks up before your competitor opens their CRM.' }
    ];

    const differentiators = [
        {
            title: 'Sounds human. Thinks surgical.',
            desc: 'Tone, pacing, and micro-pauses that feel natural - paired with ruthless qualifying and next-step setting.',
            icon: '🎙️'
        },
        {
            title: 'Built from your proof, not a template.',
            desc: 'We ingest your top-call recordings, scripts, and playbooks so Revolt mirrors what already closes for you.',
            icon: '🧠'
        },
        {
            title: 'Revenue outcomes, not “AI demos.”',
            desc: 'Optimized for booked appointments, warm transfers, and payment capture - not chit-chat.',
            icon: '🚀'
        }
    ];

    const process = [
        {
            step: '01',
            title: 'Harvest your best calls',
            copy: 'We pull recordings, transcripts, and objection libraries to learn your winning patterns.'
        },
        {
            step: '02',
            title: 'Train, stress-test, refine',
            copy: 'We simulate real prospect friction - price pushes, timing stalls, insurance hurdles - until Revolt wins.'
        },
        {
            step: '03',
            title: 'Ship, monitor, improve',
            copy: 'Live in days, not months. We monitor every call, tighten prompts, and ship updates without retraining reps.'
        }
    ];

    const principles = [
        'Speed beats brand loyalty; we answer first.',
        'Clarity over cleverness - plain talk that earns trust.',
        'Every call is a sales call: qualify, route, or book.',
        'Human-grade empathy with machine-grade consistency.',
        'Measure what matters: bookings, transfers, revenue.'
    ];

    return (
        <>
            <div className="page-content" style={{ paddingTop: '7rem', paddingBottom: '7rem' }}>
                <div className="container">
                    <motion.section {...fadeInUp} style={{ marginBottom: '4rem', textAlign: 'center' }}>
                        <div style={{ display: 'inline-flex', gap: '0.5rem', alignItems: 'center', padding: '0.5rem 1rem', borderRadius: '999px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)', marginBottom: '1.5rem' }}>
                            <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--color-primary)', boxShadow: '0 0 12px rgba(112, 66, 248, 0.7)' }} />
                            <span style={{ fontSize: '0.95rem', letterSpacing: '0.02em', color: 'var(--color-text)', textTransform: 'uppercase' }}>About Revolt</span>
                        </div>
                        <h1 className="about-hero-title" style={{ marginBottom: '1rem' }}>
                            Why Voice Agents?
                            <br />
                            <span className="text-gradient">More Importantly: Why Revolt?</span>
                        </h1>
                        <p style={{ maxWidth: 840, margin: '0 auto', color: 'var(--color-text-secondary)', fontSize: '1.1rem', lineHeight: 1.7 }}>
                            Revolt turns your best sales calls into a 24/7 voice agent that greets, qualifies, handles objections, and books the next step - before a human team could even pick up the phone.
                        </p>
                    </motion.section>

                    <motion.section {...fadeInUp} style={{ marginBottom: '4.5rem' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', alignItems: 'center' }}>
                            <div className="glass-card" style={{ padding: '2.5rem' }}>
                                <h2 className="page-title" style={{ fontSize: '2.8rem', marginBottom: '1rem' }}>
                                    <em>Speed</em>...<br />
                                    The Only Differentiator Left.
                                </h2>
                                <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.75, marginBottom: '1rem', fontSize: '1.1rem' }}>
                                    Customers call whoever answers first. Traditional staffing can’t keep up, and generic AI kills trust. Revolt is your best rep, cloned from your wins, trained on your voice—ready 24/7.
                                </p>
                            </div>
                            <div className="glass-card" style={{ padding: 0, overflow: 'hidden', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                                <img
                                    src="/assets/f7c2059a-f683-4758-9a40-733b87d24124.png"
                                    alt="Revolt voice agents"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                                />
                            </div>
                        </div>
                    </motion.section>


                    <DualProblem />

                    <motion.section
                        variants={stagger}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: '-50px' }}
                        className="stats-grid"
                        style={{ gap: '1rem', marginBottom: '5rem', marginTop: '5rem' }}
                    >
                        {stats.map((stat) => (
                            <motion.div key={stat.label} variants={card} className="glass-card" style={{ textAlign: 'left' }}>
                                <p style={{ color: 'var(--color-text-secondary)', marginBottom: '0.35rem', letterSpacing: '0.02em' }}>{stat.label}</p>
                                <h3 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.35rem' }}>{stat.value}</h3>
                                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>{stat.detail}</p>
                            </motion.div>
                        ))}
                    </motion.section>

                    <motion.section
                        variants={stagger}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: '-50px' }}
                        className="features-grid"
                        style={{ marginBottom: '4.5rem' }}
                    >
                        {differentiators.map((item) => (
                            <motion.div key={item.title} variants={card} className="feature-card">
                                <div className="feature-emoji">{item.icon}</div>
                                <h3 className="feature-title" style={{ marginBottom: '0.75rem' }}>{item.title}</h3>
                                <p className="feature-desc" style={{ color: 'var(--color-text-secondary)', lineHeight: 1.65 }}>{item.desc}</p>
                            </motion.div>
                        ))}
                    </motion.section>

                    <motion.section {...fadeInUp} className="glass-card" style={{ marginBottom: '4.5rem', textAlign: 'left', padding: '2.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
                            <h2 className="page-title" style={{ fontSize: '2.4rem', marginBottom: 0 }}>How we build with you</h2>
                            <span style={{ padding: '0.4rem 0.8rem', borderRadius: '999px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', fontSize: '0.95rem' }}>
                                Low-lift for your team
                            </span>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
                            {process.map((item) => (
                                <div key={item.title} style={{ padding: '1.5rem', borderRadius: '1rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                                    <p style={{ fontSize: '0.95rem', letterSpacing: '0.08em', color: 'var(--color-primary)', marginBottom: '0.35rem' }}>{item.step}</p>
                                    <h4 style={{ marginBottom: '0.5rem', fontSize: '1.2rem' }}>{item.title}</h4>
                                    <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>{item.copy}</p>
                                </div>
                            ))}
                        </div>
                    </motion.section>

                    <motion.section {...fadeInUp} style={{ marginBottom: '4.5rem' }}>
                        <div className="glass-card" style={{ textAlign: 'left', padding: '2.5rem' }}>
                            <h2 className="page-title" style={{ fontSize: '2.3rem', marginBottom: '1rem' }}>What we refuse to compromise</h2>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '0.85rem' }}>
                                {principles.map((line) => (
                                    <li key={line} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                                        <span style={{ color: 'var(--color-primary)', fontWeight: 700 }}>•</span>
                                        <span>{line}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.section>

                    <motion.section {...fadeInUp} className="glass-card" style={{ textAlign: 'center', padding: '2.5rem', borderColor: 'rgba(112,66,248,0.35)' }}>
                        <p style={{ fontSize: '1.2rem', color: 'var(--color-text-secondary)', marginBottom: '0.75rem' }}>Ready for the only “AI” that cares about revenue as much as you do?</p>
                        <h3 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>
                            Deploy a voice closer in days. <span className="text-gradient">Keep every caller.</span>
                        </h3>
                        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <a className="btn btn-accent" href="/simulator" style={{ padding: '0.85rem 1.4rem', minWidth: '200px' }}>
                                See it work
                            </a>
                            <a className="btn btn-primary" href="/pricing" style={{ padding: '0.85rem 1.4rem', minWidth: '200px' }}>
                                See pricing
                            </a>
                        </div>
                    </motion.section>
                </div>
            </div>
        </>
    );
}
