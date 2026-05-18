import type { PartConfig } from '../../types';

export const cabinetParts: PartConfig[] = [
  {
    id: 'body',
    name: 'Body',
    nameZh: '柜体',
    color: '#D4A76A',
    material: 'satin',
    variant: 'double-door',
    availableVariants: [
      { id: 'double-door', name: 'Double Door', nameZh: '双门' },
      { id: 'single-door', name: 'Single Door', nameZh: '单门' },
      { id: 'drawers', name: 'Drawers', nameZh: '抽屉' },
    ],
  },
  {
    id: 'doors',
    name: 'Doors',
    nameZh: '柜门',
    color: '#E8D5B7',
    material: 'satin',
    variant: 'panel',
    availableVariants: [
      { id: 'panel', name: 'Panel', nameZh: '平板' },
      { id: 'glass', name: 'Glass Frame', nameZh: '玻璃框' },
      { id: 'open', name: 'Open', nameZh: '开放' },
    ],
  },
  {
    id: 'legs',
    name: 'Legs',
    nameZh: '柜腿',
    color: '#3D3D3D',
    material: 'metal',
    variant: 'thin',
    availableVariants: [
      { id: 'thin', name: 'Thin', nameZh: '细腿' },
      { id: 'base', name: 'Base', nameZh: '底座' },
      { id: 'none', name: 'None', nameZh: '无腿' },
    ],
  },
];
