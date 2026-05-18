import type { PartConfig } from '../../types';

export const lampParts: PartConfig[] = [
  {
    id: 'shade',
    name: 'Shade',
    nameZh: '灯罩',
    color: '#F5F0E8',
    material: 'satin',
    variant: 'cone',
    availableVariants: [
      { id: 'cone', name: 'Cone', nameZh: '锥形' },
      { id: 'dome', name: 'Dome', nameZh: '圆顶' },
      { id: 'square', name: 'Square', nameZh: '方形' },
    ],
  },
  {
    id: 'body',
    name: 'Body',
    nameZh: '灯身',
    color: '#3D3D3D',
    material: 'metal',
    variant: 'straight',
    availableVariants: [
      { id: 'straight', name: 'Straight', nameZh: '直杆' },
      { id: 'curved', name: 'Curved', nameZh: '弯管' },
      { id: 'pillar', name: 'Pillar', nameZh: '柱体' },
    ],
  },
  {
    id: 'base',
    name: 'Base',
    nameZh: '底座',
    color: '#3D3D3D',
    material: 'metal',
    variant: 'round',
    availableVariants: [
      { id: 'round', name: 'Round', nameZh: '圆盘' },
      { id: 'square', name: 'Square', nameZh: '方块' },
      { id: 'none', name: 'None', nameZh: '无底座' },
    ],
  },
];
