import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getSavedConfigs, deleteSavedConfig, type SavedConfig } from '../utils/storage';
import { useProductStore } from '../store/useProductStore';

interface Props {
  open: boolean;
  onClose: () => void;
}

export function SavedConfigsModal({ open, onClose }: Props) {
  const [configs, setConfigs] = useState<SavedConfig[]>([]);
  const [saved, setSaved] = useState(false);
  const loadConfig = useProductStore((s) => s.loadConfig);
  const saveConfig = useProductStore((s) => s.saveConfig);
  const [name, setName] = useState('');

  useEffect(() => {
    if (open) setConfigs(getSavedConfigs());
  }, [open]);

  const handleSave = () => {
    if (!name.trim()) return;
    saveConfig?.(name.trim());
    setName('');
    setSaved(true);
    setConfigs(getSavedConfigs());
    setTimeout(() => setSaved(false), 1500);
  };

  const handleDelete = (id: string) => {
    deleteSavedConfig(id);
    setConfigs(getSavedConfigs());
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-surface-900 border border-surface-700/50 rounded-2xl p-6 w-[380px] max-h-[70vh] flex flex-col"
          >
            <h3 className="text-base font-semibold text-surface-50 mb-4">已保存配置</h3>

            {/* Save new */}
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="输入配置名称..."
                className="flex-1 px-3 py-2 bg-surface-800 border border-surface-700/40 rounded-lg text-sm text-surface-50 placeholder-surface-500 outline-none focus:border-surface-500"
                onKeyDown={(e) => e.key === 'Enter' && handleSave()}
              />
              <motion.button
                onClick={handleSave}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  saved
                    ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                    : 'bg-surface-50/10 border-surface-50/20 text-surface-50 hover:bg-surface-50/20'
                } border`}
              >
                {saved ? '✓ 已保存' : '保存'}
              </motion.button>
            </div>

            {/* Saved list */}
            <div className="flex-1 overflow-y-auto space-y-2">
              {configs.length === 0 && (
                <p className="text-sm text-surface-500 text-center py-8">暂无保存的配置</p>
              )}
              {configs.map((c) => (
                <div
                  key={c.id}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg bg-surface-800/40 border border-surface-700/30"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-surface-50 truncate">{c.name}</p>
                    <p className="text-[11px] text-surface-500">
                      {c.productType} · {new Date(c.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    onClick={() => { loadConfig?.(c); onClose(); }}
                    className="px-3 py-1 text-xs rounded-lg bg-surface-50/10 text-surface-50 hover:bg-surface-50/20 transition-colors"
                  >
                    加载
                  </button>
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="px-2 py-1 text-xs text-red-400 hover:text-red-300 transition-colors"
                  >
                    删除
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={onClose}
              className="mt-4 w-full py-2 rounded-lg text-sm text-surface-400 hover:text-surface-50 transition-colors"
            >
              关闭
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
