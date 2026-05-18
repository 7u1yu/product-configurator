import type { PartConfig } from '../../types';

export const tableParts: PartConfig[] = [
  {
    id: 'top',
    name: 'Top',
    nameZh: '桌面',
    color: '#D4A76A',
    material: 'satin',
    variant: 'rectangle',
    availableVariants: [
      { id: 'rectangle', name: 'Rectangle', nameZh: '长方形' },
      { id: 'round', name: 'Round', nameZh: '圆形' },
      { id: 'square', name: 'Square', nameZh: '正方形' },
    ],
  },
  {
    id: 'legs',
    name: 'Legs',
    nameZh: '桌腿',
    color: '#3D3D3D',
    material: 'metal',
    variant: 'four-legs',
    availableVariants: [
      { id: 'four-legs', name: 'Four Legs', nameZh: '四腿' },
      { id: 'pedestal', name: 'Pedestal', nameZh: '柱式底座' },
      { id: 'trestle', name: 'Trestle', nameZh: '支架式' },
    ],
  },
];
