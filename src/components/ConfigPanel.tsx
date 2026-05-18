import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PartSelector } from './PartSelector';
import { VariantSelector } from './VariantSelector';
import { PresetCards } from './PresetCards';
import { ColorPicker } from './ColorPicker';
import { MaterialSelector } from './MaterialSelector';
import { EnvironmentPresets } from './EnvironmentPresets';
import { useProductStore } from '../store/useProductStore';
import { products } from '../data/products';
import type { ProductType } from '../types';

const productTypes: ProductType[] = ['chair', 'table', 'bed', 'lamp', 'shelf', 'cabinet'];

const descriptions: Record<string, string> = {
  chair: '经典休闲椅，可自由搭配座面、椅腿、靠背与扶手造型',
  table: '多功能桌，支持圆形/方形/长方形桌面与多种底座',
  bed: '现代床架，床头板、床架、床腿样式随心切换',
  lamp: '氛围台灯，锥形/圆顶/方形灯罩搭配不同灯身底座',
  shelf: '模块化置物架，层数可变，金属/木质/悬浮支架',
  cabinet: '收纳柜，双门/单门/抽屉结构，平板或玻璃面板',
};

const designNotes: Record<string, string> = {
  chair: '椅子是工业设计中最经典的产品类型。本配置器中的休闲椅从 Scandinavian 设计语言出发，座面采用圆角处理减少视觉重量，椅腿提供金属直腿、木质锥腿和滑雪板底座三种结构方案，靠背可选高面板、低面板或横条风格。',
  table: '桌子的核心设计挑战在于桌面与底座的视觉平衡。圆形桌面搭配柱式底座呈现雕塑感，长方形桌面配合四腿结构强调功能主义，支架式底座则带有中古风格。桌面边缘的圆角处理让整体更亲和。',
  bed: '床的设计重点在于床头板的比例与床架的呼吸感。高床头板营造稳重氛围，低板或无边设计则更现代。排骨架保留空气流通，平台式简洁利落，面板式带有传统木工细节。',
  lamp: '台灯是 CMF 表现力最强的产品类型。灯罩形态决定光的氛围——锥形集中、圆顶柔散、方形现代。灯身材质与底座造型的搭配可以彻底改变一盏灯的风格，从工业风的弯管到极简柱体。',
  shelf: '置物架是功能与结构美学的直接对话。层数决定收纳容量，支架系统定义视觉性格——纤细金属架轻盈通透，实木侧板温暖稳重，悬浮式隐藏支架则最大化极简效果。',
  cabinet: '储物柜的 UX 在于「藏」与「露」的平衡。双门结构适合大容量收纳，抽屉式便于分类存取。柜门材质从实木平板到玻璃框再到开放式，决定了柜体与空间的关系。',
};

interface Props {
  onOpenSaved?: () => void;
}

export function ConfigPanel({ onOpenSaved }: Props) {
  const currentProduct = useProductStore((s) => s.currentProduct);
  const selectedPart = useProductStore((s) => s.selectedPart);
  const parts = useProductStore((s) => s.parts);
  const switchProduct = useProductStore((s) => s.switchProduct);
  const resetAll = useProductStore((s) => s.resetAll);
  const randomize = useProductStore((s) => s.randomize);
  const [showNotes, setShowNotes] = useState(false);

  const currentPart = parts.find((p) => p.id === selectedPart);

  return (
    <motion.div
      initial={{ x: 320, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-[320px] h-full bg-surface-900/60 backdrop-blur-xl border-l border-surface-700/40 flex flex-col overflow-y-auto"
    >
      {/* Header */}
      <div className="p-5 border-b border-surface-700/30">
        <h2 className="text-lg font-display font-semibold text-white tracking-tight">
          {products[currentProduct].nameZh}
        </h2>
        <p className="text-xs text-surface-400 mt-0.5">
          {descriptions[currentProduct] || ''}
        </p>
        <button
          onClick={() => setShowNotes(!showNotes)}
          className="mt-2 text-[10px] text-surface-500 hover:text-surface-300 transition-colors"
        >
          {showNotes ? '收起设计说明 ▲' : '设计说明 ▼'}
        </button>
        <AnimatePresence>
          {showNotes && (
            <motion.p
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mt-2 text-[11px] text-surface-400 leading-relaxed overflow-hidden"
            >
              {designNotes[currentProduct] || ''}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Product Switcher */}
      <div className="p-4 border-b border-surface-700/30">
        <div className="flex gap-1.5">
          {productTypes.map((type) => (
            <motion.button
              key={type}
              whileTap={{ scale: 0.95 }}
              onClick={() => switchProduct(type)}
              className={`flex-1 py-2 rounded-xl text-xs font-medium transition-all duration-200 ${
                currentProduct === type
                  ? 'bg-white/15 text-white border border-white/20 shadow-lg'
                  : 'bg-surface-800/40 text-surface-400 border border-surface-700/30 hover:border-surface-600/50 hover:text-surface-200'
              }`}
            >
              {products[type].nameZh}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Presets */}
      <div className="p-5 border-b border-surface-700/30 space-y-3">
        <PresetCards />
      </div>

      {/* Part Selection */}
      {currentPart && (
        <div className="p-5 border-b border-surface-700/30 space-y-4">
          <PartSelector />
        </div>
      )}

      {/* Variant Selector */}
      {currentPart && currentPart.availableVariants.length > 1 && (
        <motion.div
          key={selectedPart + '-variant'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-5 border-b border-surface-700/30 space-y-3"
        >
          <VariantSelector />
        </motion.div>
      )}

      {/* Color Picker */}
      {currentPart && (
        <motion.div
          key={selectedPart + '-color'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-5 border-b border-surface-700/30 space-y-3"
        >
          <div>
            <h3 className="text-xs font-semibold text-surface-400 uppercase tracking-wider mb-3">
              颜色
            </h3>
            <ColorPicker />
          </div>
        </motion.div>
      )}

      {/* Material Selector */}
      {currentPart && (
        <motion.div
          key={selectedPart + '-material'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-5 border-b border-surface-700/30 space-y-3"
        >
          <div>
            <h3 className="text-xs font-semibold text-surface-400 uppercase tracking-wider mb-3">
              材质
            </h3>
            <MaterialSelector />
          </div>
        </motion.div>
      )}

      {/* Environment */}
      <div className="p-5 border-b border-surface-700/30 space-y-3">
        <div>
          <h3 className="text-xs font-semibold text-surface-400 uppercase tracking-wider mb-3">
            灯光环境
          </h3>
          <EnvironmentPresets />
        </div>
      </div>

      {/* Actions */}
      <div className="p-5 mt-auto border-t border-surface-700/30 space-y-2">
        <div className="flex gap-2">
          <button
            onClick={randomize}
            className="flex-1 py-2 px-3 text-sm text-surface-400 bg-surface-800/50 border border-surface-700/40 rounded-xl hover:text-white hover:bg-surface-800 transition-all duration-200"
          >
            🎲 随机灵感
          </button>
          <button
            onClick={() => onOpenSaved?.()}
            className="flex-1 py-2 px-3 text-sm text-surface-400 bg-surface-800/50 border border-surface-700/40 rounded-xl hover:text-white hover:bg-surface-800 transition-all duration-200"
          >
            💾 保存/加载
          </button>
        </div>
        <button
          onClick={resetAll}
          className="w-full py-2.5 px-4 text-sm text-surface-400 bg-surface-800/50 border border-surface-700/40 rounded-xl hover:text-white hover:bg-surface-800 transition-all duration-200"
        >
          重置为默认
        </button>
      </div>
    </motion.div>
  );
}
