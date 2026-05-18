import { useState, useEffect } from 'react';
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
        className="lg:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-30 px-5 py-2.5 bg-surface-900/90 backdrop-blur-xl border border-surface-700/50 rounded-full text-sm text-white shadow-2xl"
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
    </div>
  );
}
