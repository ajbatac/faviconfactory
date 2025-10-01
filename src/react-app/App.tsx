import { BrowserRouter as Router, Routes, Route } from 'react-router';
import Home from '@/react-app/pages/Home';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}
