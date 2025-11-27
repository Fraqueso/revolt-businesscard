import React from 'react';
import { motion } from 'framer-motion';

const industries = [
    {
        name: "Contractors & Home Improvement",
        painPoints: [
            "\"We rely on word-of-mouth and referrals, but it's feast or famine\"",
            "\"HomeAdvisor and Thumbtack eat our margins with lead fees\"",
            "\"Can't scale beyond what we can personally handle\"",
            "\"We don't know how to market online - we're tradesman, not marketers\"",
            "\"Our website looks like it's from 2005 and gets zero traffic\"",
            "\"Every job feels like we're starting from scratch to prove ourselves\"",
            "\"We're great at the work, terrible at running the business side\"",
            "\"Can't find good crews, and when we do, they leave or start competing\"",
            "\"Cash flow is inconsistent - big gaps between projects\""
        ]
    },
    {
        name: "Law Firms",
        painPoints: [
            "\"Personal injury cases are getting harder to win with more competition\"",
            "\"Referral sources are drying up as older lawyers retire\"",
            "\"Google Ads are expensive and most leads are tire-kickers\"",
            "\"Prospects shop around and only care about price\"",
            "\"Hard to differentiate from the 50 other lawyers in town\"",
            "\"Takes forever to build trust and close cases\"",
            "\"Managing case load while trying to market is impossible\"",
            "\"Staff turnover is killing our efficiency\"",
            "\"Revenue is unpredictable based on case settlements\""
        ]
    },
    {
        name: "Medspas & Cosmetic Surgeons",
        painPoints: [
            "\"Groupon devalued our services and attracted bargain hunters\"",
            "\"Social media marketing feels overwhelming and time-consuming\"",
            "\"High-end patients are hard to attract consistently\"",
            "\"New medspas opening every month driving prices down\"",
            "\"Patients price-shop and don't understand our expertise difference\"",
            "\"Hard to communicate value of premium treatments\"",
            "\"Patients come once and never return for maintenance\"",
            "\"Seasonal fluctuations hurt cash flow\"",
            "\"Can't scale beyond my personal capacity to perform treatments\""
        ]
    },
    {
        name: "Luxury Real Estate",
        painPoints: [
            "\"Zillow leads are mostly unqualified tire-kickers\"",
            "\"Open houses attract neighbors, not serious buyers\"",
            "\"Most leads want properties outside our price range\"",
            "\"Hard to stand out from other luxury agents\"",
            "\"Sellers question paying premium commission in this market\"",
            "\"Takes forever to build trust with high-net-worth clients\"",
            "\"Income is completely unpredictable - one month amazing, next nothing\"",
            "\"Market shifts kill our pipeline overnight\"",
            "\"Competing against teams with bigger marketing budgets\""
        ]
    },
    {
        name: "Roofers",
        painPoints: [
            "\"Winter months are brutal for cash flow\"",
            "\"Storm work is unpredictable - can't build a business on it\"",
            "\"Insurance jobs take forever to get paid\"",
            "\"Industry has bad reputation - people assume we're scammers\"",
            "\"Homeowners get multiple bids and choose cheapest\"",
            "\"Hard to justify premium pricing for quality work\"",
            "\"Can't find reliable crews who won't start competing\"",
            "\"Material costs keep rising, eating margins\"",
            "\"Customer service suffers when we get busy\""
        ]
    },
    {
        name: "Car Dealerships",
        painPoints: [
            "\"AutoTrader and Cars.com leads cost $500+ each\"",
            "\"Most online leads are already shopping 10 other dealers\"",
            "\"Inventory shortages mean we're fighting for fewer customers\"",
            "\"Customers research everything online - no negotiation room\"",
            "\"Service department can't carry the whole business\"",
            "\"Manufacturer requirements eating into profits\"",
            "\"People hate the car buying process and avoid us\"",
            "\"Takes 4+ hours to close a deal\"",
            "\"Customer reviews can kill us online\""
        ]
    }
];

const universalPainPoints = [
    "\"We're good at what we do, terrible at marketing\"",
    "\"Lead generation is inconsistent - feast or famine\"",
    "\"Can't scale beyond our personal involvement\"",
    "\"Customers only care about price, not value\"",
    "\"Competition is driving margins down\"",
    "\"No predictable system for getting new customers\"",
    "\"Marketing feels overwhelming and time-consuming\"",
    "\"Hard to differentiate from competitors\"",
    "\"Revenue is unpredictable month to month\"",
    "\"We're working IN the business, not ON it\""
];

export default function Industries() {
    return (
        <section className="section-padding" style={{ position: 'relative', zIndex: 1 }}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{ textAlign: 'center', marginBottom: '4rem' }}
                >
                    <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '1rem' }}>
                        Solved for <span className="text-gradient">Every Industry</span>
                    </h2>
                    <p style={{ color: 'var(--color-text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
                        We understand the unique challenges you face. Revolt is built to overcome them.
                    </p>
                </motion.div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
                    {industries.map((industry, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            style={{
                                background: 'rgba(255, 255, 255, 0.03)',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(255, 255, 255, 0.05)',
                                borderRadius: '1rem',
                                padding: '2rem',
                                height: '100%'
                            }}
                        >
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--color-primary)' }}>
                                {industry.name}
                            </h3>
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                {industry.painPoints.slice(0, 3).map((point, i) => (
                                    <li key={i} style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem', color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
                                        <span style={{ color: '#ff4d4d', flexShrink: 0 }}>✕</span>
                                        {point}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{
                        marginTop: '4rem',
                        padding: '3rem',
                        background: 'linear-gradient(145deg, rgba(112, 66, 248, 0.1), rgba(0, 0, 0, 0))',
                        borderRadius: '1rem',
                        border: '1px solid rgba(112, 66, 248, 0.2)'
                    }}
                >
                    <h3 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '1.8rem' }}>Universal Pain Points</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                        {universalPainPoints.map((point, i) => (
                            <div key={i} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                                <span style={{ color: '#ff4d4d', marginTop: '0.2rem' }}>✕</span>
                                <span style={{ color: 'var(--color-text-secondary)', fontStyle: 'italic' }}>{point}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
