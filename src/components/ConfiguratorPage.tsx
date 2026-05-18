import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas3D } from './Canvas3D';
import { ConfigPanel } from './ConfigPanel';
import { ComparePanel } from './ComparePanel';
import { SavedConfigsModal } from './SavedConfigsModal';
import { useProductStore } from '../store/useProductStore';
import { decodeShareUrl } from '../utils/shareUrl';
import type { MaterialType } from '../types';

export default function ConfiguratorPage() {
  const [panelOpen, setPanelOpen] = useState(false);
  const [savedOpen, setSavedOpen] = useState(false);
  const [showGuide, setShowGuide] = useState(() => {
    return !localStorage.getItem('guide-shown');
  });
  const compareMode = useProductStore((s) => s.compareMode);
  const switchProduct = useProductStore((s) => s.switchProduct);

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    const state = decodeShareUrl(hash);
    if (state) {
      switchProduct(state.p);
      const store = useProductStore.getState();
      state.parts.forEach((sp) => {
        store.setPartColor(sp.id, sp.c);
        store.setPartMaterial(sp.id, sp.m as MaterialType);
        store.setPartVariant(sp.id, sp.v);
      });
      history.replaceState(null, '', window.location.pathname);
    }
  }, []);

  useEffect(() => {
    const handler = () => setSavedOpen(true);
    window.addEventListener('open-saved-configs', handler);
    return () => window.removeEventListener('open-saved-configs', handler);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row h-screen w-screen bg-surface-950 overflow-hidden">
      <Canvas3D />

      {compareMode && (
        <>
          <div className="w-px bg-surface-700/50" />
          <Canvas3D isCompare />
        </>
      )}

      {!compareMode && (
        <div className="hidden lg:block h-full">
          <ConfigPanel onOpenSaved={() => setSavedOpen(true)} />
        </div>
      )}

      {compareMode && (
        <div className="hidden lg:block h-full w-[320px]">
          <ComparePanel />
        </div>
      )}

      <button
        onClick={() => setPanelOpen(!panelOpen)}
        className="lg:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-30 px-5 py-2.5 bg-surface-900/90 backdrop-blur-xl border border-surface-700/50 rounded-full text-sm text-surface-50 shadow-2xl"
      >
        {panelOpen ? '关闭面板' : '自定义配置'}
      </button>

      <SavedConfigsModal open={savedOpen} onClose={() => setSavedOpen(false)} />

      {panelOpen && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div className="absolute inset-0 bg-black/60" onClick={() => setPanelOpen(false)} />
          <div className="absolute bottom-0 left-0 right-0 max-h-[70vh] overflow-y-auto rounded-t-3xl">
            <ConfigPanel onOpenSaved={() => setSavedOpen(true)} />
          </div>
        </div>
      )}

      {/* Onboarding Guide */}
      <AnimatePresence>
        {showGuide && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
            onClick={() => {
              localStorage.setItem('guide-shown', 'true');
              setShowGuide(false);
            }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-surface-900 border border-surface-700/50 rounded-2xl p-8 w-[360px] max-w-[90vw] text-center"
            >
              <span className="text-4xl mb-4 block">🏗️</span>
              <h2 className="text-lg font-display font-semibold text-surface-50 mb-2">欢迎使用 3D 产品配置器</h2>
              <p className="text-sm text-surface-400 mb-6">快速上手指南</p>
              <div className="space-y-3 text-left mb-6">
                {[
                  { icon: '🖱️', text: '拖拽旋转视角，滚轮缩放，右键平移' },
                  { icon: '🎨', text: '右侧面板切换产品、颜色和材质' },
                  { icon: '⌨️', text: 'Space 自动旋转 · E 爆炸视图 · W 线框' },
                ].map((tip) => (
                  <div key={tip.text} className="flex items-start gap-3 p-3 rounded-xl bg-surface-800/40">
                    <span className="text-lg shrink-0">{tip.icon}</span>
                    <span className="text-sm text-surface-300">{tip.text}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => {
                  localStorage.setItem('guide-shown', 'true');
                  setShowGuide(false);
                }}
                className="px-8 py-2.5 bg-blue-500 text-surface-50 rounded-xl text-sm font-medium hover:bg-blue-600 transition-colors"
              >
                开始体验
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
