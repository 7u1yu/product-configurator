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
          <p className="text-[10px] text-surface-500 uppercase tracking-wider mb-2">
            {palette.nameZh}
          </p>
          <div className="flex gap-2 flex-wrap">
            {palette.colors.map((color) => (
              <motion.button
                key={color}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setPartColor(selectedPart, color)}
                className={`w-8 h-8 rounded-full border-2 transition-all duration-200 cursor-pointer ${
                  currentColor === color
                    ? 'border-white shadow-lg shadow-white/20'
                    : 'border-transparent hover:border-surface-400'
                }`}
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
