import type { PartConfig } from '../../types';

export const deskParts: PartConfig[] = [
  { id: 'top', name: 'Top', nameZh: '桌面', color: '#D4A76A', material: 'satin', variant: 'rectangle', availableVariants: [
    { id: 'rectangle', name: 'Rectangle', nameZh: '长方形' },
    { id: 'l-shape', name: 'L-Shape', nameZh: 'L型' },
    { id: 'compact', name: 'Compact', nameZh: '紧凑型' },
  ]},
  { id: 'legs', name: 'Legs', nameZh: '腿', color: '#3D3D3D', material: 'metal', variant: 'four-legs', availableVariants: [
    { id: 'four-legs', name: 'Four Legs', nameZh: '四腿' },
    { id: 'pedestal', name: 'Pedestal', nameZh: '柱式' },
    { id: 'sawhorse', name: 'Sawhorse', nameZh: '锯架式' },
  ]},
  { id: 'storage', name: 'Storage', nameZh: '收纳', color: '#E8D5B7', material: 'satin', variant: 'right', availableVariants: [
    { id: 'right', name: 'Right', nameZh: '右侧抽屉' },
    { id: 'left', name: 'Left', nameZh: '左侧抽屉' },
    { id: 'none', name: 'None', nameZh: '无收纳' },
  ]},
];
