import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from './components/Toast';
import { LandingPage } from './components/LandingPage';

const ConfiguratorPage = lazy(() => import('./components/ConfiguratorPage'));

function LoadingScreen() {
  return (
    <div className="flex items-center justify-center h-screen w-screen bg-surface-950">
      <div className="text-center">
        <div className="w-10 h-10 mx-auto mb-4 rounded-full border-2 border-blue-400 border-t-transparent animate-spin" />
        <p className="text-surface-400 text-sm">加载 3D 引擎中...</p>
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
