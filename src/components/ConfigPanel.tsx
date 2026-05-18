import { motion } from 'framer-motion';
import { PartSelector } from './PartSelector';
import { VariantSelector } from './VariantSelector';
import { PresetCards } from './PresetCards';
import { ColorPicker } from './ColorPicker';
import { MaterialSelector } from './MaterialSelector';
import { EnvironmentPresets } from './EnvironmentPresets';
import { useProductStore } from '../store/useProductStore';
import { products } from '../data/products';
import type { ProductType } from '../types';

const productTypes: ProductType[] = ['chair', 'table', 'bed', 'lamp', 'shelf', 'cabinet'];

const descriptions: Record<string, string> = {
  chair: '经典休闲椅，可自由搭配座面、椅腿、靠背与扶手造型',
  table: '多功能桌，支持圆形/方形/长方形桌面与多种底座',
  bed: '现代床架，床头板、床架、床腿样式随心切换',
  lamp: '氛围台灯，锥形/圆顶/方形灯罩搭配不同灯身底座',
  shelf: '模块化置物架，层数可变，金属/木质/悬浮支架',
  cabinet: '收纳柜，双门/单门/抽屉结构，平板或玻璃面板',
};

interface Props {
  onOpenSaved?: () => void;
}

export function ConfigPanel({ onOpenSaved }: Props) {
  const currentProduct = useProductStore((s) => s.currentProduct);
  const selectedPart = useProductStore((s) => s.selectedPart);
  const parts = useProductStore((s) => s.parts);
  const switchProduct = useProductStore((s) => s.switchProduct);
  const resetAll = useProductStore((s) => s.resetAll);
  const randomize = useProductStore((s) => s.randomize);

  const currentPart = parts.find((p) => p.id === selectedPart);

  return (
    <motion.div
      initial={{ x: 320, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-[320px] h-full bg-surface-900/60 backdrop-blur-xl border-l border-surface-700/40 flex flex-col overflow-y-auto"
    >
      {/* Header */}
      <div className="p-5 border-b border-surface-700/30">
        <h2 className="text-lg font-display font-semibold text-white tracking-tight">
          Product Configurator
        </h2>
        <p className="text-xs text-surface-400 mt-0.5">
          {descriptions[currentProduct] || ''}
        </p>
      </div>

      {/* Product Switcher */}
      <div className="p-4 border-b border-surface-700/30">
        <div className="flex gap-1.5">
          {productTypes.map((type) => (
            <motion.button
              key={type}
              whileTap={{ scale: 0.95 }}
              onClick={() => switchProduct(type)}
              className={`flex-1 py-2 rounded-xl text-xs font-medium transition-all duration-200 ${
                currentProduct === type
                  ? 'bg-white/15 text-white border border-white/20 shadow-lg'
                  : 'bg-surface-800/40 text-surface-400 border border-surface-700/30 hover:border-surface-600/50 hover:text-surface-200'
              }`}
            >
              {products[type].nameZh}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Presets */}
      <div className="p-5 border-b border-surface-700/30 space-y-3">
        <PresetCards />
      </div>

      {/* Part Selection */}
      {currentPart && (
        <div className="p-5 border-b border-surface-700/30 space-y-4">
          <PartSelector />
        </div>
      )}

      {/* Variant Selector */}
      {currentPart && currentPart.availableVariants.length > 1 && (
        <motion.div
          key={selectedPart + '-variant'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-5 border-b border-surface-700/30 space-y-3"
        >
          <VariantSelector />
        </motion.div>
      )}

      {/* Color Picker */}
      {currentPart && (
        <motion.div
          key={selectedPart + '-color'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-5 border-b border-surface-700/30 space-y-3"
        >
          <div>
            <h3 className="text-xs font-semibold text-surface-400 uppercase tracking-wider mb-3">
              颜色
            </h3>
            <ColorPicker />
          </div>
        </motion.div>
      )}

      {/* Material Selector */}
      {currentPart && (
        <motion.div
          key={selectedPart + '-material'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-5 border-b border-surface-700/30 space-y-3"
        >
          <div>
            <h3 className="text-xs font-semibold text-surface-400 uppercase tracking-wider mb-3">
              材质
            </h3>
            <MaterialSelector />
          </div>
        </motion.div>
      )}

      {/* Environment */}
      <div className="p-5 border-b border-surface-700/30 space-y-3">
        <div>
          <h3 className="text-xs font-semibold text-surface-400 uppercase tracking-wider mb-3">
            灯光环境
          </h3>
          <EnvironmentPresets />
        </div>
      </div>

      {/* Actions */}
      <div className="p-5 mt-auto border-t border-surface-700/30 space-y-2">
        <div className="flex gap-2">
          <button
            onClick={randomize}
            className="flex-1 py-2 px-3 text-sm text-surface-400 bg-surface-800/50 border border-surface-700/40 rounded-xl hover:text-white hover:bg-surface-800 transition-all duration-200"
          >
            🎲 随机灵感
          </button>
          <button
            onClick={() => onOpenSaved?.()}
            className="flex-1 py-2 px-3 text-sm text-surface-400 bg-surface-800/50 border border-surface-700/40 rounded-xl hover:text-white hover:bg-surface-800 transition-all duration-200"
          >
            💾 保存/加载
          </button>
        </div>
        <button
          onClick={resetAll}
          className="w-full py-2.5 px-4 text-sm text-surface-400 bg-surface-800/50 border border-surface-700/40 rounded-xl hover:text-white hover:bg-surface-800 transition-all duration-200"
        >
          重置为默认
        </button>
      </div>
    </motion.div>
  );
}
