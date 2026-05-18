import { useProductStore } from '../store/useProductStore';
import { products } from '../data/products';

export function ComparePanel() {
  const setCompareMode = useProductStore((s) => s.setCompareMode);
  const switchCompareProduct = useProductStore((s) => s.switchCompareProduct);
  const compareProduct = useProductStore((s) => s.compareProduct);
  const compareParts = useProductStore((s) => s.compareParts);
  const compareSelectedPart = useProductStore((s) => s.compareSelectedPart);
  const selectComparePart = useProductStore((s) => s.selectComparePart);
  const setComparePartColor = useProductStore((s) => s.setComparePartColor);
  const setComparePartMaterial = useProductStore((s) => s.setComparePartMaterial);
  const setComparePartVariant = useProductStore((s) => s.setComparePartVariant);

  const currentPart = compareParts.find((p) => p.id === compareSelectedPart);

  return (
    <div className="h-full bg-surface-900/60 backdrop-blur-xl border-l border-surface-700/40 flex flex-col overflow-y-auto">
      <div className="p-4 border-b border-surface-700/30">
        <h3 className="text-sm font-semibold text-surface-50">对比模式 - B面</h3>
        <div className="flex gap-1.5 mt-3">
          {(['chair', 'table', 'bed', 'lamp', 'shelf', 'cabinet', 'sofa', 'desk', 'bench', 'coatrack'] as const).map((type) => (
            <button key={type} onClick={() => switchCompareProduct(type)}
              className={`flex-1 py-1.5 rounded-lg text-[10px] font-medium transition-all ${compareProduct === type ? 'bg-surface-50/15 text-surface-50 border border-surface-50/20' : 'bg-surface-800/40 text-surface-400 border border-surface-700/30'}`}>
              {products[type]?.nameZh || type}
            </button>
          ))}
        </div>
      </div>
      {currentPart && (
        <div className="p-4 space-y-3">
          <div className="grid grid-cols-2 gap-1.5">
            {compareParts.map((p) => (
              <button key={p.id} onClick={() => selectComparePart(p.id)}
                className={`px-2 py-1.5 rounded-lg text-xs transition-all ${compareSelectedPart === p.id ? 'bg-surface-50/15 text-surface-50 border border-surface-50/20' : 'bg-surface-800/40 text-surface-400'}`}>
                {p.nameZh}
              </button>
            ))}
          </div>
          {currentPart.availableVariants.length > 1 && (
            <div>
              <p className="text-[10px] text-surface-500 mb-1.5">样式</p>
              <div className="flex flex-wrap gap-1">
                {currentPart.availableVariants.map((v) => (
                  <button key={v.id} onClick={() => setComparePartVariant(compareSelectedPart, v.id)}
                    className={`px-2 py-1 rounded text-[10px] ${currentPart.variant === v.id ? 'bg-surface-50/15 text-surface-50' : 'bg-surface-800/40 text-surface-400'}`}>
                    {v.nameZh}
                  </button>
                ))}
              </div>
            </div>
          )}
          <div>
            <p className="text-[10px] text-surface-500 mb-1.5">颜色</p>
            <div className="flex gap-1.5 flex-wrap">
              {['#F5F0E8','#C4B8A8','#3D3D3D','#2C3E50','#D4A76A','#6B4226','#F7DC6F','#E74C3C'].map((c) => (
                <button key={c} onClick={() => setComparePartColor(compareSelectedPart, c)}
                  className={`w-6 h-6 rounded-full border-2 ${currentPart.color === c ? 'border-white' : 'border-transparent'}`}
                  style={{ backgroundColor: c }} />
              ))}
            </div>
          </div>
          <div>
            <p className="text-[10px] text-surface-500 mb-1.5">材质</p>
            <div className="flex gap-1">
              {(['matte','satin','glossy','metal'] as const).map((mt) => (
                <button key={mt} onClick={() => setComparePartMaterial(compareSelectedPart, mt)}
                  className={`px-2 py-1 rounded text-[10px] ${currentPart.material === mt ? 'bg-surface-50/15 text-surface-50' : 'bg-surface-800/40 text-surface-400'}`}>
                  {mt === 'matte' ? '哑光' : mt === 'satin' ? '半光' : mt === 'glossy' ? '亮光' : '金属'}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      <div className="p-4 mt-auto border-t border-surface-700/30">
        <button onClick={() => setCompareMode(false)} className="w-full py-2 text-sm text-surface-400 hover:text-surface-50 rounded-lg transition-colors">
          退出对比
        </button>
      </div>
    </div>
  );
}
