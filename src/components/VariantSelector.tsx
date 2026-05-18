import { motion } from 'framer-motion';
import { useProductStore } from '../store/useProductStore';

export function VariantSelector() {
  const parts = useProductStore((s) => s.parts);
  const selectedPart = useProductStore((s) => s.selectedPart);
  const setPartVariant = useProductStore((s) => s.setPartVariant);

  const part = parts.find((p) => p.id === selectedPart);
  if (!part || part.availableVariants.length <= 1) return null;

  return (
    <div>
      <h3 className="text-xs font-semibold text-surface-400 uppercase tracking-wider mb-3">
        样式
      </h3>
      <div className="flex flex-wrap gap-2">
        {part.availableVariants.map((v) => (
          <motion.button
            key={v.id}
            whileTap={{ scale: 0.95 }}
            onClick={() => setPartVariant(selectedPart, v.id)}
            className={`px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
              part.variant === v.id
                ? 'bg-surface-50/15 text-surface-50 border border-surface-50/20 shadow-lg'
                : 'bg-surface-800/40 text-surface-400 border border-surface-700/30 hover:border-surface-600/50 hover:text-surface-200'
            }`}
          >
            {v.nameZh}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
