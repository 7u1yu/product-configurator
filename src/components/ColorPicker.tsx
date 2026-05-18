import { motion } from 'framer-motion';
import { useProductStore } from '../store/useProductStore';
import { colorPalettes } from '../data/colorPalettes';

export function ColorPicker() {
  const selectedPart = useProductStore((s) => s.selectedPart);
  const parts = useProductStore((s) => s.parts);
  const setPartColor = useProductStore((s) => s.setPartColor);

  const currentColor = parts.find((p) => p.id === selectedPart)?.color;

  return (
    <div className="space-y-4">
      {colorPalettes.map((palette) => (
        <div key={palette.name}>
          <p className="text-[11px] text-surface-500 uppercase tracking-wider mb-2">
            {palette.nameZh}
          </p>
          <div className="flex gap-2 flex-wrap">
            {palette.colors.map((color) => (
              <motion.button
                key={color}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setPartColor(selectedPart, color)}
                aria-label={`${palette.nameZh} - ${color}`}
                className={`relative w-8 h-8 rounded-full border-2 transition-all duration-200 cursor-pointer ${
                  currentColor === color
                    ? 'border-surface-50 shadow-lg shadow-surface-50/20'
                    : 'border-transparent hover:border-surface-400'
                }`}
                style={{ backgroundColor: color }}
                title={`${palette.nameZh} - ${color}`}
              >
                {currentColor === color && (
                  <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] text-surface-300 whitespace-nowrap">
                    {palette.nameZh}
                  </span>
                )}
              </motion.button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
