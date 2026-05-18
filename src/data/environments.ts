import type { EnvConfig } from '../types';

export const environments: EnvConfig[] = [
  {
    id: 'studio',
    name: 'Studio',
    nameZh: '工作室',
    preset: 'studio',
    background: '#1a1a1a',
  },
  {
    id: 'showroom',
    name: 'Showroom',
    nameZh: '展厅',
    preset: 'apartment',
    background: '#2a2018',
  },
  {
    id: 'outdoor',
    name: 'Outdoor',
    nameZh: '户外',
    preset: 'sunset',
    background: '#1a2a3a',
  },
];
