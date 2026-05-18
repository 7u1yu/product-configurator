import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const features = [
  { icon: '🪑', title: '6 种产品', desc: '椅子·桌子·床·台灯·置物架·储物柜' },
  { icon: '🎨', title: '16 色 × 4 材质', desc: '暖色·冷色·木色·高亮 / 哑光·半光·亮光·金属' },
  { icon: '🔄', title: '部件样式切换', desc: '每个部件多种几何造型可选' },
  { icon: '💥', title: '专业展示工具', desc: '爆炸视图·线框模式·CMF规格卡·对比模式' },
  { icon: '📱', title: '响应式设计', desc: '桌面端侧边栏 / 移动端底部面板' },
  { icon: '🔗', title: '一键分享', desc: '配置编码到链接，复制即分享' },
];

const techStack = ['React', 'TypeScript', 'Three.js', 'R3F', 'Drei', 'Zustand', 'Framer Motion', 'Tailwind CSS', 'Vite'];

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-surface-950 text-white overflow-x-hidden">
      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center">
        {/* Background glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/8 rounded-full blur-[100px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-sm font-medium text-blue-400 tracking-widest uppercase mb-4">
            Industrial Design × Frontend Engineering
          </p>
          <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight mb-6">
            3D Product<br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Configurator
            </span>
          </h1>
          <p className="max-w-lg mx-auto text-lg text-surface-400 mb-10 leading-relaxed">
            一个面向工业设计师的在线产品配置工具。
            实时切换材质、颜色、部件样式，支持爆炸视图、CMF 规格卡导出。
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/config')}
              className="px-8 py-3.5 bg-white text-black font-semibold rounded-2xl text-base shadow-lg shadow-white/10 hover:shadow-white/20 transition-shadow"
            >
              开始配置 →
            </motion.button>
            <a href="https://github.com" target="_blank" rel="noopener"
              className="px-8 py-3.5 border border-surface-600/50 text-surface-300 font-medium rounded-2xl text-base hover:border-surface-400 hover:text-white transition-colors">
              View on GitHub
            </a>
          </div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 flex flex-col items-center gap-2 text-surface-500 text-xs"
        >
          <span>向下滚动</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-5 h-8 rounded-full border border-surface-600 flex justify-center pt-2"
          >
            <div className="w-1 h-2 rounded-full bg-surface-500" />
          </motion.div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-6 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-display font-bold mb-4">核心功能</h2>
          <p className="text-surface-400">为工业设计师打造的完整工作流</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="p-6 rounded-2xl bg-surface-900/50 border border-surface-700/30 hover:border-surface-600/50 transition-colors"
            >
              <span className="text-2xl mb-3 block">{f.icon}</span>
              <h3 className="font-semibold text-white mb-1">{f.title}</h3>
              <p className="text-sm text-surface-400">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Tech + Footer */}
      <section className="border-t border-surface-800 py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h3 className="text-sm text-surface-500 uppercase tracking-wider mb-6">Built with</h3>
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {techStack.map((t) => (
              <span key={t} className="px-3 py-1.5 rounded-full bg-surface-800/60 border border-surface-700/40 text-xs text-surface-400">
                {t}
              </span>
            ))}
          </div>
          <p className="text-xs text-surface-600">
            Designed & Built by 李浩言 · 工业设计 × 前端开发
          </p>
        </div>
      </section>
    </div>
  );
}
