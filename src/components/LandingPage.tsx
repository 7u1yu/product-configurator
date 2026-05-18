import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const features = [
  { icon: '🎯', color: 'from-blue-500/20 to-blue-600/10', title: '10 种产品', desc: '椅子·桌子·床·台灯·置物架·储物柜·沙发·书桌·长凳·衣帽架' },
  { icon: '🎨', color: 'from-purple-500/20 to-purple-600/10', title: '自由配置', desc: '16 色 × 4 材质 × 每部件 2-3 种几何造型' },
  { icon: '⚡', color: 'from-amber-500/20 to-amber-600/10', title: '专业工具', desc: '爆炸视图·线框模式·CMF规格卡·对比模式·Undo/Redo' },
  { icon: '🔗', color: 'from-emerald-500/20 to-emerald-600/10', title: '一键分享', desc: '配置编码到链接，复制即分享·在线体验' },
  { icon: '🖥️', color: 'from-cyan-500/20 to-cyan-600/10', title: '产品化体验', desc: '暗色/亮色主题·快捷键·悬停提示·性能模式' },
  { icon: '📱', color: 'from-rose-500/20 to-rose-600/10', title: '响应式', desc: '桌面侧边栏 / 移动端底部面板·10 产品无缝切换' },
];

const scenes = [
  { icon: '🏠', title: '家居展厅', desc: '在工作室灯光下预览产品，切换暗色/亮色环境，感受真实材质质感' },
  { icon: '🏢', title: '设计评审', desc: '导出 CMF 规格卡和截图，快速分享设计方案给团队和客户' },
  { icon: '🛒', title: '电商展示', desc: '通过分享链接让客户在浏览器中自由切换颜色材质，所见即所得' },
];

const techStack = ['React', 'TypeScript', 'Three.js', 'R3F', 'Drei', 'Postprocessing', 'Zustand', 'Framer Motion', 'Tailwind CSS', 'Vite'];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-surface-950 text-surface-50 overflow-x-hidden">
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
              className="relative px-10 py-4 bg-surface-50 text-surface-950 font-semibold rounded-2xl text-base shadow-xl shadow-surface-50/10 hover:shadow-surface-50/20 transition-shadow group"
            >
              <span className="relative z-10 flex items-center gap-2">
                开始配置
                <motion.span animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>→</motion.span>
              </span>
              <motion.div animate={{ opacity: [0.4, 0.8, 0.4] }} transition={{ repeat: Infinity, duration: 2 }}
                className="absolute inset-0 rounded-2xl bg-surface-50/20 blur-md" />
            </motion.button>
            <a href="https://github.com/7u1yu/product-configurator" target="_blank" rel="noopener"
              className="px-10 py-4 border border-surface-600/40 text-surface-300 font-medium rounded-2xl text-base hover:border-surface-400 hover:text-surface-50 hover:bg-surface-50/5 transition-all">
              GitHub →
            </a>
          </div>

          {/* Product Preview Gallery */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="mt-20 grid grid-cols-2 sm:grid-cols-5 gap-3 max-w-2xl mx-auto"
          >
            {[
              { icon: '🪑', name: '椅子', gradient: 'from-blue-500/10 to-blue-600/5' },
              { icon: '🛋️', name: '沙发', gradient: 'from-purple-500/10 to-purple-600/5' },
              { icon: '💡', name: '台灯', gradient: 'from-amber-500/10 to-amber-600/5' },
              { icon: '🪵', name: '桌子', gradient: 'from-emerald-500/10 to-emerald-600/5' },
              { icon: '🗄️', name: '柜子', gradient: 'from-rose-500/10 to-rose-600/5' },
            ].map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.1 }}
                whileHover={{ y: -4, scale: 1.03 }}
                className={`group relative flex flex-col items-center gap-2 p-4 rounded-2xl bg-gradient-to-b ${p.gradient} border border-surface-700/20 hover:border-surface-600/40 cursor-default transition-all duration-300`}
              >
                <span className="text-3xl transition-transform duration-300 group-hover:scale-110">{p.icon}</span>
                <span className="text-xs text-surface-400 group-hover:text-surface-200 transition-colors">{p.name}</span>
              </motion.div>
            ))}
          </motion.div>
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
              className="group relative p-6 rounded-2xl bg-surface-900/40 border border-surface-700/20 hover:border-surface-600/50 hover:bg-surface-900/60 transition-all cursor-default overflow-hidden">
              <div className={`absolute inset-0 bg-gradient-to-br ${f.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              <div className="relative z-10">
                <div className={`w-10 h-10 mb-4 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center text-xl`}>
                  {f.icon}
                </div>
                <h3 className="font-semibold text-surface-50 mb-1.5">{f.title}</h3>
                <p className="text-sm text-surface-400 leading-relaxed">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Scenes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 text-center mb-16"
        >
          <span className="text-sm text-emerald-400 font-medium tracking-wide uppercase">Use Cases</span>
          <h2 className="text-3xl md:text-4xl font-display font-bold mt-3 mb-4">使用场景</h2>
          <p className="text-surface-400 text-lg">从展厅到电商，适配多种工作流程</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {scenes.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl bg-surface-900/30 border border-surface-700/15 text-center"
            >
              <span className="text-4xl mb-4 block">{s.icon}</span>
              <h3 className="font-semibold text-surface-50 mb-2">{s.title}</h3>
              <p className="text-sm text-surface-400 leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
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
