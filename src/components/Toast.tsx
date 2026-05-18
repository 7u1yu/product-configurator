import { AnimatePresence, motion } from 'framer-motion';
import { useToastStore } from '../store/toastStore';

const colors: Record<string, { bg: string; border: string; text: string; icon: string }> = {
  success: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-300', icon: '✓' },
  info: { bg: 'bg-sky-500/10', border: 'border-sky-500/30', text: 'text-sky-300', icon: 'i' },
  error: { bg: 'bg-rose-500/10', border: 'border-rose-500/30', text: 'text-rose-300', icon: '✕' },
};

export function ToastContainer() {
  const toasts = useToastStore((s) => s.toasts);
  const remove = useToastStore((s) => s.remove);

  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map((t) => {
          const c = colors[t.type];
          return (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -5, scale: 0.98 }}
              onClick={() => remove(t.id)}
              className={`pointer-events-auto flex items-center gap-2.5 px-4 py-3 rounded-2xl border backdrop-blur-2xl shadow-2xl cursor-pointer ${c.bg} ${c.border} ${c.text}`}
            >
              <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold">{c.icon}</span>
              <span className="text-sm">{t.message}</span>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
