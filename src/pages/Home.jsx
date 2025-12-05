import React from 'react';
import Hero from '../components/Hero';
import VSL from '../components/VSL';
import ChallengeSection from '../components/ChallengeSection';
import PainSection from '../components/PainSection';
import AudioComparison from '../components/AudioComparison';
import BuildProcess from '../components/BuildProcess';
import ComparisonTable from '../components/ComparisonTable';
import Stats from '../components/Stats';
import TechnicalFeatures from '../components/TechnicalFeatures';
import PricingSection from '../components/PricingSection';
import RiskFreeSection from '../components/RiskFreeSection';
// VoltageField removed from here as it is now global in App.jsx

export default function Home() {
    return (
        <>
            <Hero />
            <VSL />
            <ChallengeSection />
            <PainSection />
            <BuildProcess />
            <PricingSection />
            <Stats />
            <ComparisonTable />
            <AudioComparison />
            <TechnicalFeatures />
            <RiskFreeSection />
        </>
    );
}
