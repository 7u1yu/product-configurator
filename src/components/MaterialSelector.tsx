import { motion } from 'framer-motion';
import { useProductStore } from '../store/useProductStore';
import { materialPresets } from '../data/materials';
import type { MaterialType } from '../types';

export function MaterialSelector() {
  const selectedPart = useProductStore((s) => s.selectedPart);
  const parts = useProductStore((s) => s.parts);
  const setPartMaterial = useProductStore((s) => s.setPartMaterial);

  const currentMaterial = parts.find((p) => p.id === selectedPart)?.material;

  return (
    <div className="grid grid-cols-2 gap-2">
      {materialPresets.map((mat) => (
        <motion.button
          key={mat.id}
          whileTap={{ scale: 0.95 }}
          onClick={() => setPartMaterial(selectedPart, mat.id)}
          className={`flex flex-col items-center gap-1 py-3 px-2 rounded-xl text-xs font-medium transition-all duration-200 ${
            currentMaterial === mat.id
              ? 'bg-surface-50/15 text-surface-50 border border-surface-50/20 shadow-lg'
              : 'bg-surface-800/40 text-surface-400 border border-surface-700/30 hover:border-surface-600/50'
          }`}
        >
          <MaterialSwatch type={mat.id} />
          <span>{mat.nameZh}</span>
        </motion.button>
      ))}
    </div>
  );
}

function MaterialSwatch({ type }: { type: MaterialType }) {
  const config: Record<MaterialType, string> = {
    matte: 'linear-gradient(135deg, #7a7a7a, #5a5a5a)',
    satin: 'linear-gradient(135deg, #b8a88a, #8a7a6a)',
    glossy: 'linear-gradient(135deg, #d0d0d0, #a0a0a0, #f0f0f0)',
    metal: 'linear-gradient(135deg, #c0c0c0, #808080, #e0e0e0)',
  };

  return (
    <div
      className="w-10 h-10 rounded-lg border border-surface-600/50"
      style={{ background: config[type] }}
    />
  );
}
