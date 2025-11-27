import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import SpeedToLead from '../components/SpeedToLead';
import Industries from '../components/Industries';
import VoltageField from '../components/VoltageField';

export default function Home() {
    return (
        <>
            <VoltageField />
            <Hero />
            <SpeedToLead />
            <Features />
            <Industries />
        </>
    );
}
