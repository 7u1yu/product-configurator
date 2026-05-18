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

const productTypes: ProductType[] = ['chair', 'table', 'bed', 'lamp', 'shelf', 'cabinet', 'sofa', 'desk', 'bench', 'coatrack'];

const descriptions: Record<string, string> = {
  chair: '经典休闲椅，可自由搭配座面、椅腿、靠背与扶手造型',
  table: '多功能桌，支持圆形/方形/长方形桌面与多种底座',
  bed: '现代床架，床头板、床架、床腿样式随心切换',
  lamp: '氛围台灯，锥形/圆顶/方形灯罩搭配不同灯身底座',
  shelf: '模块化置物架，层数可变，金属/木质/悬浮支架',
  cabinet: '收纳柜，双门/单门/抽屉结构，平板或玻璃面板',
  sofa: '组合沙发，双人/三人/L型可选，自由搭配框架与扶手',
  desk: '书桌，支持L型/紧凑型桌面，可选抽屉收纳方向',
  bench: '长凳，平板/曲面/横条座面，可选低靠背或全高靠背',
  coatrack: '衣帽架，直杆/弯顶/分段杆体，三钩/六钩/螺旋挂钩',
};

const designNotes: Record<string, string> = {
  chair: '椅子是工业设计中最经典的产品类型。本配置器的休闲椅融入 Scandinavian 设计语言，座面圆角减少视觉重量，椅腿三方案满足不同结构表达。',
  table: '桌面与底座的比例平衡是桌子设计的核心。圆形搭配柱式呈雕塑感，方形配四腿强调功能主义，支架式带中古风格。',
  bed: '床头板比例与床架呼吸感决定卧室氛围。高板稳重、低板现代、无板极简；排骨架透氣、平台式利落、面板式带木工细节。',
  lamp: '台灯是 CMF 表现力最强的产品。灯罩形态决定光的氛围——锥形集中、圆顶柔散、方形现代。灯身与底座的材质搭配彻底改变风格。',
  shelf: '置物架是功能与结构美学的对话。层数决定收纳量，支架系统定义性格——金属架轻盈，木侧板温暖，悬浮支架极简。',
  cabinet: '储物柜的 UX 在「藏」与「露」的平衡。双门大容量、抽屉分类便；门板从实木到玻璃框到开放，决定与空间的关系。',
  sofa: '沙发的尺度与比例是客厅的视觉锚点。双人/三人/L型覆盖不同空间需求，框架高度与扶手宽度直接影响舒适感与风格表达。',
  desk: '书桌的核心在于工作面积与收纳效率的平衡。L型扩展操作空间，紧凑型适合小房间。抽屉位置影响使用习惯——右抽屉适合右利手场景。',
  bench: '长凳是最纯粹的坐具形态。从平板到曲面到横条，座面的变化定义了不同的使用感受。靠背的加入让它从「坐」升级为「倚」。',
  coatrack: '衣帽架是雕塑感最强的家居单品。杆体从极简直杆到有机弯顶到工业分段，挂钩从功能三角到全周环绕到螺旋生长，底座从稳定圆盘到轻巧十字。',
};

const productIcons: Record<string, string> = {
  chair: '🪑', table: '🪵', bed: '🛏️', lamp: '💡',
  shelf: '📚', cabinet: '🗄️', sofa: '🛋️', desk: '💻',
  bench: '🪑', coatrack: '🧥',
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
        <h2 className="text-lg font-display font-semibold text-surface-50 tracking-tight">
          {products[currentProduct].nameZh}
        </h2>
        <p className="text-xs text-surface-400 mt-0.5">
          {descriptions[currentProduct] || ''}
        </p>
        <button
          onClick={() => setShowNotes(!showNotes)}
          className="mt-2 text-[11px] text-surface-500 hover:text-surface-300 transition-colors"
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
        <div className="grid grid-cols-2 gap-2">
          {productTypes.map((type) => (
            <motion.button
              key={type}
              whileTap={{ scale: 0.95 }}
              onClick={() => switchProduct(type)}
              className={`relative flex flex-col items-center gap-1 py-2.5 px-2 rounded-xl text-xs font-medium transition-all duration-200 ${
                currentProduct === type
                  ? 'bg-surface-50/10 text-surface-50 border border-surface-50/15 shadow-sm'
                  : 'bg-surface-800/40 text-surface-400 border border-surface-700/30 hover:border-surface-600/50 hover:text-surface-200'
              }`}
            >
              <span className="text-base">{productIcons[type]}</span>
              <span>{products[type].nameZh}</span>
              {currentProduct === type && (
                <motion.div
                  layoutId="activeProduct"
                  className="absolute bottom-1 left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full bg-blue-400"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
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
        <BackgroundColorPicker />
      </div>

      {/* Actions */}
      <div className="p-5 mt-auto border-t border-surface-700/30 space-y-2">
        <div className="flex gap-2">
          <button
            onClick={randomize}
            className="flex-1 py-2 px-3 text-sm text-surface-400 bg-surface-800/50 border border-surface-700/40 rounded-xl hover:text-surface-50 hover:bg-surface-800 transition-all duration-200"
          >
            🎲 随机灵感
          </button>
          <button
            onClick={() => onOpenSaved?.()}
            className="flex-1 py-2 px-3 text-sm text-surface-400 bg-surface-800/50 border border-surface-700/40 rounded-xl hover:text-surface-50 hover:bg-surface-800 transition-all duration-200"
          >
            💾 保存/加载
          </button>
        </div>
        <button
          onClick={resetAll}
          className="w-full py-2.5 px-4 text-sm text-surface-400 bg-surface-800/50 border border-surface-700/40 rounded-xl hover:text-surface-50 hover:bg-surface-800 transition-all duration-200"
        >
          重置为默认
        </button>
      </div>
    </motion.div>
  );
}

function BackgroundColorPicker() {
  const bgColor = useProductStore((s) => s.bgColor);
  const setBgColor = useProductStore((s) => s.setBgColor);
  const colors = ['#1a1a1a', '#2a2a2a', '#3a3a3a', '#F5F5F0', '#E8E0D5', '#D5E0E8', '#1a2a3a', '#2a1a2a'];
  return (
    <div>
      <h3 className="text-xs font-semibold text-surface-400 uppercase tracking-wider mb-2">背景色</h3>
      <div className="flex gap-1.5 flex-wrap">
        {colors.map((c) => (
          <button key={c} onClick={() => setBgColor(c)}
            className={`w-6 h-6 rounded-full border-2 transition-all ${bgColor === c ? 'border-white scale-110' : 'border-transparent hover:scale-105'}`}
            style={{ backgroundColor: c }} />
        ))}
      </div>
    </div>
  );
}
