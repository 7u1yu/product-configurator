import type { PartConfig } from '../../types';

export const shelfParts: PartConfig[] = [
  {
    id: 'shelves',
    name: 'Shelves',
    nameZh: '搁板',
    color: '#D4A76A',
    material: 'satin',
    variant: 'three',
    availableVariants: [
      { id: 'three', name: '3 Layers', nameZh: '三层' },
      { id: 'four', name: '4 Layers', nameZh: '四层' },
      { id: 'two', name: '2 Layers', nameZh: '两层' },
    ],
  },
  {
    id: 'supports',
    name: 'Supports',
    nameZh: '支架',
    color: '#3D3D3D',
    material: 'metal',
    variant: 'metal',
    availableVariants: [
      { id: 'metal', name: 'Metal Frame', nameZh: '金属架' },
      { id: 'wood', name: 'Wood Panel', nameZh: '木侧板' },
      { id: 'floating', name: 'Floating', nameZh: '悬浮式' },
    ],
  },
];
