# 3D Product Configurator

**在线 3D 产品配置器** — 面向工业设计师，用代码生成的参数化 3D 模型替代传统渲染。

[在线体验](https://haoyan-3d.surge.sh)

## 功能

- **6 种产品**：椅子 · 桌子 · 床 · 台灯 · 置物架 · 储物柜
- **部件样式切换**：每个部件 2-3 种几何造型变体
- **PBR 材质系统**：哑光 · 半光 · 亮光 · 金属（roughness / metalness 控制）
- **16 色色板**：暖色 · 冷色 · 木色 · 高亮
- **专业展示工具**：爆炸视图 · 线框模式 · 尺寸标注 · 对比模式
- **CMF 规格卡导出**：Canvas API 合成产品截图 + 色彩/材质信息
- **配置分享**：当前状态 Base64 编码到 URL，复制即分享
- **风格预设**：每产品 3 套搭配（北欧/工业/中古/撞色）
- **键盘快捷键**：Space 旋转 · E 爆炸 · W 线框 · 1-4 视角 · 方向键切换部件
- **后处理**：Bloom 发光 + Vignette 暗角
- **响应式**：桌面侧边栏 / 移动端底部面板

## 技术栈

| 层 | 技术 |
|---|------|
| 框架 | React 18 + TypeScript |
| 构建 | Vite |
| 3D 渲染 | Three.js + @react-three/fiber + @react-three/drei |
| 后处理 | @react-three/postprocessing (Bloom, Vignette) |
| 状态管理 | Zustand |
| UI 动效 | Framer Motion |
| 样式 | Tailwind CSS 3 |
| 路由 | React Router |
| 部署 | Surge.sh |

## 本地运行

```bash
git clone https://github.com/7u1yu/product-configurator.git
cd product-configurator
npm install
npm run dev
```

打开 http://localhost:5173

## 项目结构

```
src/
├── components/
│   ├── products/        # Chair3D, Table3D, Bed3D, Lamp3D, Shelf3D, Cabinet3D
│   ├── Canvas3D.tsx      # R3F 场景：灯光、后处理、轨道控制
│   ├── ConfigPanel.tsx   # 配置面板：产品/部件/样式/颜色/材质
│   ├── Toolbar.tsx       # 工具栏：截图/分享/CMF/爆炸/线框
│   └── LandingPage.tsx   # 首页
├── store/
│   ├── useProductStore.ts # Zustand 全局状态
│   └── toastStore.ts      # Toast 通知
├── data/
│   ├── products/         # 6 产品数据文件
│   ├── presets.ts        # 风格预设
│   └── colorPalettes.ts  # 16 色色板
└── types/index.ts
```

## License

MIT
