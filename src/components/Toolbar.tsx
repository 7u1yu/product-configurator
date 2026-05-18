import { useCallback } from 'react';
import { useProductStore } from '../store/useProductStore';
import { useToastStore } from '../store/toastStore';
import { useThemeStore } from '../store/themeStore';
import { encodeShareUrl } from '../utils/shareUrl';
import { generateCmfCard } from '../utils/cmfCard';
import { products } from '../data/products';

const btnBase = 'relative group px-2.5 py-1.5 text-[11px] rounded-lg border backdrop-blur-md transition-all duration-200';

export function Toolbar() {
  const currentProduct = useProductStore((s) => s.currentProduct);
  const parts = useProductStore((s) => s.parts);
  const autoRotate = useProductStore((s) => s.autoRotate);
  const setAutoRotate = useProductStore((s) => s.setAutoRotate);
  const exploded = useProductStore((s) => s.exploded);
  const setExploded = useProductStore((s) => s.setExploded);
  const wireframe = useProductStore((s) => s.wireframe);
  const setWireframe = useProductStore((s) => s.setWireframe);
  const showDimensions = useProductStore((s) => s.showDimensions);
  const setShowDimensions = useProductStore((s) => s.setShowDimensions);
  const compareMode = useProductStore((s) => s.compareMode);
  const setCompareMode = useProductStore((s) => s.setCompareMode);
  const randomize = useProductStore((s) => s.randomize);
  const addToast = useToastStore((s) => s.add);
  const theme = useThemeStore((s) => s.theme);
  const toggleTheme = useThemeStore((s) => s.toggle);

  const btn = (active: boolean) =>
    `${btnBase} ${active ? 'bg-white/10 border-white/20 text-white' : 'bg-surface-900/60 border-surface-700/40 text-surface-400 hover:text-white hover:border-surface-600/50'}`;

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
    const url = window.location.origin + '/config' + hash;
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

  const handleRandom = useCallback(() => {
    randomize();
    addToast('随机灵感已生成', 'info');
  }, [randomize]);

  return (
    <div className="absolute top-4 left-4 right-4 flex flex-wrap items-center gap-1.5 z-10">
      <Tooltip label="自动旋转 (Space)">
        <button onClick={() => setAutoRotate(!autoRotate)} className={btn(autoRotate)}>⟳</button>
      </Tooltip>
      <Tooltip label="截图 (S)">
        <button onClick={handleScreenshot} className={btn(false)}>📷</button>
      </Tooltip>
      <Tooltip label="分享链接">
        <button onClick={handleShare} className={btn(false)}>🔗</button>
      </Tooltip>
      <Tooltip label="CMF 规格卡">
        <button onClick={handleCmf} className={btn(false)}>🏷</button>
      </Tooltip>
      <span className="w-px h-5 bg-surface-700/50 mx-1" />
      <Tooltip label="爆炸视图 (E)">
        <button onClick={() => setExploded(!exploded)} className={btn(exploded)}>💥</button>
      </Tooltip>
      <Tooltip label="线框模式 (W)">
        <button onClick={() => setWireframe(!wireframe)} className={btn(wireframe)}>🔲</button>
      </Tooltip>
      <Tooltip label="尺寸标注">
        <button onClick={() => setShowDimensions(!showDimensions)} className={btn(showDimensions)}>📐</button>
      </Tooltip>
      <Tooltip label="对比模式">
        <button onClick={() => setCompareMode(!compareMode)} className={btn(compareMode)}>⇆</button>
      </Tooltip>
      <Tooltip label="随机灵感">
        <button onClick={handleRandom} className={btn(false)}>🎲</button>
      </Tooltip>
      <span className="w-px h-5 bg-surface-700/50 mx-1" />
      <Tooltip label={theme === 'dark' ? '亮色模式' : '暗色模式'}>
        <button onClick={toggleTheme} className={btn(false)}>
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </Tooltip>
    </div>
  );
}

function Tooltip({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="relative group">
      {children}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 text-[10px] rounded-md bg-surface-800 text-surface-200 border border-surface-700/50 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
        {label}
      </div>
    </div>
  );
}
