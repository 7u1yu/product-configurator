import { AnimatePresence, motion } from 'framer-motion';
import { useToastStore } from '../store/toastStore';

const colors = {
  success: 'border-green-500/40 bg-green-500/10 text-green-300',
  info: 'border-blue-500/40 bg-blue-500/10 text-blue-300',
  error: 'border-red-500/40 bg-red-500/10 text-red-300',
};

export function ToastContainer() {
  const toasts = useToastStore((s) => s.toasts);
  const remove = useToastStore((s) => s.remove);

  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, x: 100, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 50, scale: 0.95 }}
            className={`pointer-events-auto px-4 py-2.5 rounded-xl border text-sm backdrop-blur-xl ${colors[t.type]}`}
            onClick={() => remove(t.id)}
          >
            {t.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
