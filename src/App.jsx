import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Background from './components/Background';
import Home from './pages/Home';
import Integrations from './pages/Integrations';
import Simulator from './pages/Simulator';
import JourneyMap from './pages/JourneyMap';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';

function App() {
  return (
    <Router>
      <div className="app">
        <Background />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/integrations" element={<Integrations />} />
          <Route path="/simulator" element={<Simulator />} />
          <Route path="/journey-map" element={<JourneyMap />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
