import { lazy, Suspense, useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ToastContainer } from './components/Toast';
import { LandingPage } from './components/LandingPage';

const ConfiguratorPage = lazy(() => import('./components/ConfiguratorPage'));

function LoadingScreen() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => Math.min(p + Math.random() * 12, 90));
    }, 300);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-surface-950">
      <div className="text-center">
        <div className="relative w-16 h-16 mx-auto mb-6">
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-blue-400/20"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
          <div className="absolute inset-2 rounded-full bg-blue-400/10 flex items-center justify-center">
            <span className="text-blue-400 text-lg">✦</span>
          </div>
        </div>
        <div className="w-48 h-1 mx-auto mb-4 bg-surface-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <p className="text-surface-400 text-xs">正在加载 3D 引擎...</p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/config"
          element={
            <Suspense fallback={<LoadingScreen />}>
              <ConfiguratorPage />
            </Suspense>
          }
        />
      </Routes>
    </>
  );
}
