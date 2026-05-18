import { motion } from 'framer-motion';
import { useProductStore } from '../store/useProductStore';
import { environments } from '../data/environments';

export function EnvironmentPresets() {
  const currentEnv = useProductStore((s) => s.environment);
  const setEnvironment = useProductStore((s) => s.setEnvironment);

  return (
    <div className="flex gap-2">
      {environments.map((env) => (
        <motion.button
          key={env.id}
          whileTap={{ scale: 0.95 }}
          onClick={() => setEnvironment(env.id)}
          className={`flex-1 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 ${
            currentEnv === env.id
              ? 'bg-white/15 text-white border border-white/20 shadow-lg'
              : 'bg-surface-800/40 text-surface-400 border border-surface-700/30 hover:border-surface-600/50 hover:text-surface-200'
          }`}
        >
          {env.nameZh}
        </motion.button>
      ))}
    </div>
  );
}
