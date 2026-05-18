import type { PartConfig, ProductType } from '../types';

export interface SavedConfig {
  id: string;
  name: string;
  productType: ProductType;
  parts: PartConfig[];
  timestamp: number;
}

const STORAGE_KEY = 'product-configurator-saves';

export function getSavedConfigs(): SavedConfig[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveConfigToStorage(config: SavedConfig): void {
  const configs = getSavedConfigs();
  const idx = configs.findIndex((c) => c.id === config.id);
  if (idx >= 0) {
    configs[idx] = config;
  } else {
    configs.push(config);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(configs));
}

export function deleteSavedConfig(id: string): void {
  const configs = getSavedConfigs().filter((c) => c.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(configs));
}
