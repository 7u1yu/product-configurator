export type ProductType = 'chair' | 'table' | 'bed' | 'lamp' | 'shelf' | 'cabinet';

export type MaterialType = 'matte' | 'satin' | 'glossy' | 'metal';

export type EnvironmentPreset = 'studio' | 'showroom' | 'outdoor';

export interface VariantOption {
  id: string;
  name: string;
  nameZh: string;
}

export interface PartConfig {
  id: string;
  name: string;
  nameZh: string;
  color: string;
  material: MaterialType;
  variant: string;
  availableVariants: VariantOption[];
}

export interface ProductDefinition {
  type: ProductType;
  name: string;
  nameZh: string;
  parts: PartConfig[];
}

export interface MaterialPreset {
  id: MaterialType;
  name: string;
  nameZh: string;
  roughness: number;
  metalness: number;
}

export interface EnvConfig {
  id: EnvironmentPreset;
  name: string;
  nameZh: string;
  preset: 'studio' | 'apartment' | 'sunset';
  background: string;
}

export interface ColorPalette {
  name: string;
  nameZh: string;
  colors: string[];
}
