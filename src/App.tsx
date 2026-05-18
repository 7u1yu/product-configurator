import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from './components/Toast';
import { LandingPage } from './components/LandingPage';
import { ConfiguratorPage } from './components/ConfiguratorPage';

export default function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/config" element={<ConfiguratorPage />} />
      </Routes>
    </>
  );
}
