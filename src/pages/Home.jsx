import React from 'react';
import Hero from '../components/Hero';
import DualProblem from '../components/DualProblem';
import AudioComparison from '../components/AudioComparison';
import BuildProcess from '../components/BuildProcess';
import ComparisonTable from '../components/ComparisonTable';
import Stats from '../components/Stats';
import TechnicalFeatures from '../components/TechnicalFeatures';
import SocialProof from '../components/SocialProof';
// VoltageField removed from here as it is now global in App.jsx

export default function Home() {
    return (
        <>
            <Hero />
            <DualProblem />
            <AudioComparison />
            <BuildProcess />
            <ComparisonTable />
            <Stats />
            <TechnicalFeatures />
            <SocialProof />
        </>
    );
}
