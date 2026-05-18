import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const features = [
  { icon: '🪑', title: '10 种产品', desc: '椅子·桌子·床·台灯·置物架·储物柜·沙发·书桌·长凳·衣帽架' },
  { icon: '🎨', title: '自由配置', desc: '16 色 × 4 材质 × 每部件 2-3 种几何造型' },
  { icon: '💥', title: '专业工具', desc: '爆炸视图·线框模式·CMF规格卡·对比模式·Undo/Redo' },
  { icon: '🔗', title: '一键分享', desc: '配置编码到链接，复制即分享·在线体验' },
  { icon: '🎯', title: '产品化体验', desc: '暗色/亮色主题·快捷键·悬停提示·性能模式' },
  { icon: '📱', title: '响应式', desc: '桌面侧边栏 / 移动端底部面板·10 产品无缝切换' },
];

const techStack = ['React', 'TypeScript', 'Three.js', 'R3F', 'Drei', 'Postprocessing', 'Zustand', 'Framer Motion', 'Tailwind CSS', 'Vite'];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-surface-950 text-white overflow-x-hidden">
      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-blue-500/8 rounded-full blur-[150px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/6 rounded-full blur-[120px]" />
          <div className="absolute top-2/3 left-1/3 w-[400px] h-[400px] bg-cyan-500/4 rounded-full blur-[100px]" />
        </div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/5 text-xs text-blue-400 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            Industrial Design × Frontend
          </span>
          <h1 className="text-5xl md:text-8xl font-display font-bold tracking-tight mb-6 leading-[1.05]">
            Product<br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Configurator
            </span>
          </h1>
          <p className="max-w-lg mx-auto text-lg text-surface-400 mb-12 leading-relaxed">
            为工业设计师打造的在线 3D 产品配置工具。实时切换材质、颜色、部件造型，支持爆炸视图与 CMF 规格卡导出。
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => navigate('/config')}
              className="relative px-10 py-4 bg-white text-black font-semibold rounded-2xl text-base shadow-xl shadow-white/10 hover:shadow-white/20 transition-shadow group"
            >
              <span className="relative z-10 flex items-center gap-2">
                开始配置
                <motion.span animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>→</motion.span>
              </span>
              <motion.div animate={{ opacity: [0.4, 0.8, 0.4] }} transition={{ repeat: Infinity, duration: 2 }}
                className="absolute inset-0 rounded-2xl bg-white/20 blur-md" />
            </motion.button>
            <a href="https://github.com/7u1yu/product-configurator" target="_blank" rel="noopener"
              className="px-10 py-4 border border-surface-600/40 text-surface-300 font-medium rounded-2xl text-base hover:border-surface-400 hover:text-white hover:bg-white/5 transition-all">
              GitHub →
            </a>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
          className="absolute bottom-10 flex flex-col items-center gap-3 text-surface-500 text-xs">
          <span>向下滚动探索</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}
            className="w-6 h-10 rounded-full border border-surface-600/50 flex justify-center pt-2">
            <div className="w-1.5 h-3 rounded-full bg-surface-500/50" />
          </motion.div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 pb-32">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-16">
          <span className="text-sm text-blue-400 font-medium tracking-wide uppercase">Core Features</span>
          <h2 className="text-3xl md:text-4xl font-display font-bold mt-3 mb-4">核心功能</h2>
          <p className="text-surface-400 text-lg">为工业设计师打造的完整工作流</p>
        </motion.div>

        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f) => (
            <motion.div key={f.title} variants={item}
              className="group p-6 rounded-2xl bg-surface-900/40 border border-surface-700/20 hover:border-surface-600/50 hover:bg-surface-900/60 transition-all cursor-default">
              <span className="text-3xl mb-4 block group-hover:scale-110 transition-transform duration-300">{f.icon}</span>
              <h3 className="font-semibold text-white mb-1.5">{f.title}</h3>
              <p className="text-sm text-surface-400 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Footer */}
      <section className="border-t border-surface-800/50 py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-xs text-surface-500 uppercase tracking-widest mb-6">Built with</p>
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {techStack.map((t) => (
              <span key={t} className="px-3 py-1.5 rounded-full bg-surface-800/50 border border-surface-700/30 text-xs text-surface-400 hover:border-surface-600/50 hover:text-surface-300 transition-all cursor-default">
                {t}
              </span>
            ))}
          </div>
          <p className="text-sm text-surface-500">Designed & Built by 李浩言 · 工业设计 × 前端开发</p>
        </div>
      </section>
    </div>
  );
}
