import { motion } from 'framer-motion';
import { useProductStore } from '../store/useProductStore';

const icons: Record<string, string> = {
  seat: '□', legs: '∥', backrest: '▯', armrests: '=',
  top: '⊟', headboard: '▮', frame: '▬',
};

export function PartSelector() {
  const parts = useProductStore((s) => s.parts);
  const selectedPart = useProductStore((s) => s.selectedPart);
  const selectPart = useProductStore((s) => s.selectPart);

  return (
    <div>
      <h3 className="text-xs font-semibold text-surface-400 uppercase tracking-wider mb-3">
        部件
      </h3>
      <div className="grid grid-cols-2 gap-2">
        {parts.map((p) => (
          <motion.button
            key={p.id}
            whileTap={{ scale: 0.95 }}
            onClick={() => selectPart(p.id)}
            className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
              selectedPart === p.id
                ? 'bg-white/15 text-white border border-white/20 shadow-lg'
                : 'bg-surface-800/40 text-surface-400 border border-surface-700/30 hover:border-surface-600/50 hover:text-surface-200'
            }`}
          >
            <span className="text-lg">{icons[p.id] || '●'}</span>
            <span>{p.nameZh}</span>
            {selectedPart === p.id && (
              <motion.div
                layoutId="activePart"
                className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-400"
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
