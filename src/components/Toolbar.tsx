import { useCallback } from 'react';
import { useProductStore } from '../store/useProductStore';
import { useToastStore } from '../store/toastStore';
import { useThemeStore } from '../store/themeStore';
import { encodeShareUrl } from '../utils/shareUrl';
import { generateCmfCard } from '../utils/cmfCard';
import { products } from '../data/products';

const btnBase = 'relative group w-8 h-8 flex items-center justify-center rounded-xl border backdrop-blur-md transition-all duration-200 hover:scale-105';

function Icon({ d }: { d: string; active?: boolean }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}

export function Toolbar() {
  const currentProduct = useProductStore((s) => s.currentProduct);
  const parts = useProductStore((s) => s.parts);
  const autoRotate = useProductStore((s) => s.autoRotate);
  const setAutoRotate = useProductStore((s) => s.setAutoRotate);
  const exploded = useProductStore((s) => s.exploded);
  const setExploded = useProductStore((s) => s.setExploded);
  const wireframe = useProductStore((s) => s.wireframe);
  const setWireframe = useProductStore((s) => s.setWireframe);
  const compareMode = useProductStore((s) => s.compareMode);
  const setCompareMode = useProductStore((s) => s.setCompareMode);
  const randomize = useProductStore((s) => s.randomize);
  const undo = useProductStore((s) => s.undo);
  const redo = useProductStore((s) => s.redo);
  const performanceMode = useProductStore((s) => s.performanceMode);
  const setPerformanceMode = useProductStore((s) => s.setPerformanceMode);
  const addToast = useToastStore((s) => s.add);
  const theme = useThemeStore((s) => s.theme);
  const toggleTheme = useThemeStore((s) => s.toggle);

  const btn = (active: boolean) =>
    `${btnBase} ${active ? 'bg-white/15 border-white/30 text-white shadow-lg' : 'bg-surface-900/50 border-surface-700/30 text-surface-400 hover:text-white hover:border-surface-600/50'}`;

  const handleScreenshot = useCallback(() => {
    const canvas = document.querySelector('canvas');
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `${currentProduct}-config-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    addToast('截图已下载', 'success');
  }, [currentProduct]);

  const handleShare = useCallback(() => {
    const hash = encodeShareUrl(currentProduct, parts);
    const url = window.location.origin + '/#/config' + hash;
    navigator.clipboard.writeText(url).then(() => {
      addToast('链接已复制到剪贴板', 'success');
    }).catch(() => {
      prompt('复制此链接分享:', url);
    });
  }, [currentProduct, parts]);

  const handleCmf = useCallback(() => {
    generateCmfCard(parts, products[currentProduct].nameZh);
    addToast('CMF 卡片已下载', 'success');
  }, [parts, currentProduct]);

  return (
    <div className="absolute top-4 left-4 flex items-center gap-1.5 z-10 flex-wrap">
      <Tip label="自动旋转 (Space)">
        <button onClick={() => setAutoRotate(!autoRotate)} className={btn(autoRotate)}><Icon d="M12 2a10 10 0 1010 10" /></button>
      </Tip>
      <Tip label="截图">
        <button onClick={handleScreenshot} className={btn(false)}><Icon d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2v9" /><circle cx="12" cy="13" r="3" fill="currentColor" /></button>
      </Tip>
      <Tip label="分享链接">
        <button onClick={handleShare} className={btn(false)}><Icon d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13" /></button>
      </Tip>
      <Tip label="CMF 规格卡">
        <button onClick={handleCmf} className={btn(false)}><Icon d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8zM14 2v6h6M16 13H8M16 17H8" /></button>
      </Tip>
      <span className="w-px h-6 bg-surface-700/30 mx-1" />
      <Tip label="爆炸视图 (E)">
        <button onClick={() => setExploded(!exploded)} className={btn(exploded)}><Icon d="M12 2l10 6.5v7L12 22l-10-6.5v-7L12 2zM12 22V12M2 8.5l10 6.5M22 8.5l-10 6.5" /></button>
      </Tip>
      <Tip label="线框模式 (W)">
        <button onClick={() => setWireframe(!wireframe)} className={btn(wireframe)}><Icon d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z" /></button>
      </Tip>
      <Tip label="对比模式">
        <button onClick={() => setCompareMode(!compareMode)} className={btn(compareMode)}><Icon d="M16 3h5v5M8 3H3v5M3 16v5h5M21 16v5h-5M8 12h8" /></button>
      </Tip>
      <span className="w-px h-6 bg-surface-700/30 mx-1" />
      <Tip label="撤销 (Ctrl+Z)">
        <button onClick={undo} className={btn(false)}><Icon d="M3 10h10a5 5 0 010 10H9M3 10l4-4M3 10l4 4" /></button>
      </Tip>
      <Tip label="重做 (Ctrl+Shift+Z)">
        <button onClick={redo} className={btn(false)}><Icon d="M21 10H11a5 5 0 000 10h4M21 10l-4-4M21 10l-4 4" /></button>
      </Tip>
      <Tip label="随机灵感">
        <button onClick={() => { randomize(); addToast('随机灵感已生成', 'info'); }} className={btn(false)}><Icon d="M18 6L6 18M6 6l12 12" /><circle cx="12" cy="12" r="1" fill="currentColor" /></button>
      </Tip>
      <Tip label={performanceMode ? '标准模式' : '性能模式'}>
        <button onClick={() => setPerformanceMode(!performanceMode)} className={btn(performanceMode)}><Icon d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></button>
      </Tip>
      <Tip label="重置视角 (R)">
        <button onClick={() => window.dispatchEvent(new CustomEvent('camera-preset', { detail: [2.5, 1.8, 2.8] }))} className={btn(false)}><Icon d="M1 4v6h6M23 20v-6h-6M20.49 9A9 9 0 005.64 5.64L1 10M23 14l-4.64 4.36A9 9 0 013.51 15" /></button>
      </Tip>
      <span className="w-px h-6 bg-surface-700/30 mx-1" />
      <Tip label={theme === 'dark' ? '亮色模式' : '暗色模式'}>
        <button onClick={toggleTheme} className={btn(false)}><Icon d={theme === 'dark' ? 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z' : 'M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z'} /></button>
      </Tip>
    </div>
  );
}

function Tip({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="relative group">
      {children}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 text-[10px] rounded-md bg-surface-800 text-surface-200 border border-surface-700/50 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
        {label}
      </div>
    </div>
  );
}
