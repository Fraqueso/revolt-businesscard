import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useModal } from './context/ModalContext';
import ActionModal from './components/ActionModal';
import Header from './components/Header';
import Footer from './components/Footer';
import Background from './components/Background';
import VoltageField from './components/VoltageField';
import ChatResetter from './components/ChatResetter';
import Home from './pages/Home';
import About from './pages/About';
import Simulator from './pages/Simulator';
import JourneyMap from './pages/JourneyMap';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import NotFound from './pages/NotFound';

// ScrollToTop component to handle scrolling on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function AppContent() {
  const { pageKey } = useModal();
  const location = useLocation();

  // Check if we are on the home page
  const isHomePage = location.pathname === '/';

  return (
    <div className="app">
      <ScrollToTop />
      <Background />
      <VoltageField />
      <Header />
      <ActionModal />
      <ChatResetter />
      <Routes key={pageKey}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/simulator" element={<Simulator />} />
        <Route path="/journey-map" element={<JourneyMap />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
