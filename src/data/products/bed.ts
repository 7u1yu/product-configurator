import type { PartConfig } from '../../types';

export const bedParts: PartConfig[] = [
  {
    id: 'headboard',
    name: 'Headboard',
    nameZh: '床头板',
    color: '#C4B8A8',
    material: 'satin',
    variant: 'tall',
    availableVariants: [
      { id: 'tall', name: 'Tall', nameZh: '高' },
      { id: 'low', name: 'Low', nameZh: '低' },
      { id: 'none', name: 'None', nameZh: '无' },
    ],
  },
  {
    id: 'frame',
    name: 'Frame',
    nameZh: '床架',
    color: '#6B4226',
    material: 'satin',
    variant: 'slatted',
    availableVariants: [
      { id: 'slatted', name: 'Slatted', nameZh: '排骨架' },
      { id: 'platform', name: 'Platform', nameZh: '平台式' },
      { id: 'panel', name: 'Panel', nameZh: '面板式' },
    ],
  },
  {
    id: 'legs',
    name: 'Legs',
    nameZh: '床腿',
    color: '#3D3D3D',
    material: 'metal',
    variant: 'tapered',
    availableVariants: [
      { id: 'tapered', name: 'Tapered', nameZh: '锥形' },
      { id: 'straight', name: 'Straight', nameZh: '直腿' },
      { id: 'block', name: 'Block', nameZh: '方块' },
    ],
  },
];
