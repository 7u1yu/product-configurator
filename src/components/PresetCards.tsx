import { motion } from 'framer-motion';
import { useProductStore } from '../store/useProductStore';
import { presets } from '../data/presets';

export function PresetCards() {
  const currentProduct = useProductStore((s) => s.currentProduct);
  const applyPreset = useProductStore((s) => (s as any).applyPreset);

  const productPresets = presets.filter((p) => p.productType === currentProduct);

  if (productPresets.length === 0) return null;

  return (
    <div>
      <h3 className="text-xs font-semibold text-surface-400 uppercase tracking-wider mb-2">
        风格预设
      </h3>
      <div className="flex gap-2">
        {productPresets.map((preset) => (
          <motion.button
            key={preset.id}
            whileTap={{ scale: 0.95 }}
            onClick={() => applyPreset?.(preset.id)}
            className="flex-1 py-2 px-1 rounded-lg text-xs font-medium bg-surface-800/40 text-surface-400 border border-surface-700/30 hover:border-surface-600/50 hover:text-surface-200 transition-all duration-200"
          >
            {preset.nameZh}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
