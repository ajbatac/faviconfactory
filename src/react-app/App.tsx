import { BrowserRouter as Router, Routes, Route } from 'react-router';
import Home from '@/react-app/pages/Home';
import Features from '@/react-app/pages/Features';
import SeasonalThemes from '@/react-app/pages/SeasonalThemes';
import Animations from '@/react-app/pages/Animations';
import PrivacyPolicy from '@/react-app/pages/PrivacyPolicy';
import TermsOfService from '@/react-app/pages/TermsOfService';
import ContactSupport from '@/react-app/pages/ContactSupport';

import Gallery from '@/react-app/pages/Gallery';
import Changelog from '@/react-app/pages/Changelog';


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/features" element={<Features />} />
        <Route path="/seasonal-themes" element={<SeasonalThemes />} />
        <Route path="/animations" element={<Animations />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/contact-support" element={<ContactSupport />} />
        <Route path="/changelog" element={<Changelog />} />
      </Routes>
    </Router>
  );
}
