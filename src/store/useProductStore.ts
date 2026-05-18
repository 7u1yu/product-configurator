import { create } from 'zustand';
import type { ProductType, MaterialType, EnvironmentPreset, PartConfig } from '../types';
import { products } from '../data/products';
import { presets } from '../data/presets';
import { colorPalettes } from '../data/colorPalettes';
import { materialPresets } from '../data/materials';
import { saveConfigToStorage, type SavedConfig } from '../utils/storage';

const defaultProduct: ProductType = 'chair';
const undoStack: PartConfig[][] = [];
const redoStack: PartConfig[][] = [];
const MAX_HISTORY = 50;

function pushUndo(parts: PartConfig[]) {
  undoStack.push(parts.map((p) => ({ ...p })));
  if (undoStack.length > MAX_HISTORY) undoStack.shift();
  redoStack.length = 0;
}

interface ProductState {
  currentProduct: ProductType;
  parts: PartConfig[];
  selectedPart: string;
  environment: EnvironmentPreset;
  autoRotate: boolean;
  exploded: boolean;
  wireframe: boolean;
  showDimensions: boolean;
  compareMode: boolean;
  compareProduct: ProductType;
  compareParts: PartConfig[];
  compareSelectedPart: string;

  selectPart: (id: string) => void;
  setPartColor: (partId: string, color: string) => void;
  setPartMaterial: (partId: string, material: MaterialType) => void;
  setPartVariant: (partId: string, variant: string) => void;
  switchProduct: (type: ProductType) => void;
  setEnvironment: (env: EnvironmentPreset) => void;
  setAutoRotate: (on: boolean) => void;
  setExploded: (on: boolean) => void;
  setWireframe: (on: boolean) => void;
  setShowDimensions: (on: boolean) => void;
  setCompareMode: (on: boolean) => void;
  selectComparePart: (id: string) => void;
  setComparePartColor: (partId: string, color: string) => void;
  setComparePartMaterial: (partId: string, material: MaterialType) => void;
  setComparePartVariant: (partId: string, variant: string) => void;
  switchCompareProduct: (type: ProductType) => void;
  performanceMode: boolean;
  setPerformanceMode: (on: boolean) => void;
  bgColor: string;
  setBgColor: (color: string) => void;
  randomize: () => void;
  applyPreset: (presetId: string) => void;
  saveConfig: (name: string) => void;
  loadConfig: (data: SavedConfig) => void;
  undo: () => void;
  redo: () => void;
  resetAll: () => void;
}

function getDefaults(type: ProductType): PartConfig[] {
  return products[type].parts.map((p) => ({ ...p }));
}

export const useProductStore = create<ProductState>((set) => ({
  currentProduct: defaultProduct,
  parts: getDefaults(defaultProduct),
  selectedPart: products[defaultProduct].parts[0]?.id || '',
  environment: 'studio',
  autoRotate: true,
  exploded: false,
  wireframe: false,
  showDimensions: false,
  compareMode: false,
  compareProduct: defaultProduct,
  compareParts: getDefaults(defaultProduct),
  compareSelectedPart: products[defaultProduct].parts[0]?.id || '',
  performanceMode: false,
  bgColor: '#1a1a1a',

  selectPart: (id) => set({ selectedPart: id }),

  setPartColor: (partId, color) =>
    set((state) => { pushUndo(state.parts); return { parts: state.parts.map((p) => (p.id === partId ? { ...p, color } : p)) }; }),

  setPartMaterial: (partId, material) =>
    set((state) => { pushUndo(state.parts); return { parts: state.parts.map((p) => (p.id === partId ? { ...p, material } : p)) }; }),

  setPartVariant: (partId, variant) =>
    set((state) => { pushUndo(state.parts); return { parts: state.parts.map((p) => (p.id === partId ? { ...p, variant } : p)) }; }),

  switchProduct: (type) => {
    const newParts = getDefaults(type);
    set({
      currentProduct: type,
      parts: newParts,
      selectedPart: newParts[0]?.id || '',
    });
  },

  setEnvironment: (env) => set({ environment: env }),

  setAutoRotate: (on) => set({ autoRotate: on }),
  setExploded: (on) => set({ exploded: on }),
  setWireframe: (on) => set({ wireframe: on }),
  setShowDimensions: (on) => set({ showDimensions: on }),
  setPerformanceMode: (on) => set({ performanceMode: on }),
  setBgColor: (color) => set({ bgColor: color }),

  undo: () => set((state) => {
    if (undoStack.length === 0) return {};
    redoStack.push(state.parts.map((p) => ({ ...p })));
    return { parts: undoStack.pop()! };
  }),
  redo: () => set((state) => {
    if (redoStack.length === 0) return {};
    undoStack.push(state.parts.map((p) => ({ ...p })));
    return { parts: redoStack.pop()! };
  }),

  setCompareMode: (on) => {
    if (on) {
      set((state) => ({
        compareMode: true,
        compareProduct: state.currentProduct,
        compareParts: state.parts.map((p) => ({ ...p })),
        compareSelectedPart: state.selectedPart,
      }));
    } else {
      set({ compareMode: false });
    }
  },

  selectComparePart: (id) => set({ compareSelectedPart: id }),

  setComparePartColor: (partId, color) =>
    set((state) => ({
      compareParts: state.compareParts.map((p) =>
        p.id === partId ? { ...p, color } : p
      ),
    })),

  setComparePartMaterial: (partId, material) =>
    set((state) => ({
      compareParts: state.compareParts.map((p) =>
        p.id === partId ? { ...p, material } : p
      ),
    })),

  setComparePartVariant: (partId, variant) =>
    set((state) => ({
      compareParts: state.compareParts.map((p) =>
        p.id === partId ? { ...p, variant } : p
      ),
    })),

  switchCompareProduct: (type) => {
    const newParts = getDefaults(type);
    set({ compareProduct: type, compareParts: newParts, compareSelectedPart: newParts[0]?.id || '' });
  },

  randomize: () =>
    set((state) => ({
      parts: state.parts.map((p) => ({
        ...p,
        color: colorPalettes[Math.floor(Math.random() * colorPalettes.length)].colors[
          Math.floor(Math.random() * 4)
        ],
        material: materialPresets[Math.floor(Math.random() * materialPresets.length)].id,
        variant: p.availableVariants[Math.floor(Math.random() * p.availableVariants.length)]?.id || p.variant,
      })),
    })),

  applyPreset: (presetId) => {
    const preset = presets.find((p) => p.id === presetId);
    if (!preset) return;
    set((state) => ({
      parts: state.parts.map((part) => {
        const override = preset.parts.find((pp) => pp.id === part.id);
        if (!override) return part;
        return {
          ...part,
          color: override.color,
          material: override.material as MaterialType,
          variant: override.variant,
        };
      }),
    }));
  },

  saveConfig: (name) => {
    set((state) => {
      const config: SavedConfig = {
        id: Date.now().toString(),
        name,
        productType: state.currentProduct,
        parts: state.parts.map((p) => ({ ...p })),
        timestamp: Date.now(),
      };
      saveConfigToStorage(config);
      return {};
    });
  },

  loadConfig: (data) => {
    set({
      currentProduct: data.productType,
      parts: data.parts.map((p) => ({ ...p })),
      selectedPart: data.parts[0]?.id || '',
    });
  },

  resetAll: () =>
    set((state) => ({
      parts: getDefaults(state.currentProduct),
      selectedPart: products[state.currentProduct].parts[0]?.id || '',
      environment: 'studio',
      autoRotate: true,
      exploded: false,
      wireframe: false,
      showDimensions: false,
    })),
}));
