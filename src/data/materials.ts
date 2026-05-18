import type { MaterialPreset } from '../types';

export const materialPresets: MaterialPreset[] = [
  { id: 'matte', name: 'Matte', nameZh: '哑光', roughness: 0.8, metalness: 0.0 },
  { id: 'satin', name: 'Satin', nameZh: '半光', roughness: 0.4, metalness: 0.0 },
  { id: 'glossy', name: 'Glossy', nameZh: '亮光', roughness: 0.15, metalness: 0.0 },
  { id: 'metal', name: 'Metal', nameZh: '金属', roughness: 0.3, metalness: 0.9 },
];
