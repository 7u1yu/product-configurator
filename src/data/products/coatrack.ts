import type { PartConfig } from '../../types';

export const coatrackParts: PartConfig[] = [
  { id: 'pole', name: 'Pole', nameZh: '立杆', color: '#3D3D3D', material: 'metal', variant: 'straight', availableVariants: [
    { id: 'straight', name: 'Straight', nameZh: '直杆' },
    { id: 'curved', name: 'Curved Top', nameZh: '弯顶' },
    { id: 'segmented', name: 'Segmented', nameZh: '分段式' },
  ]},
  { id: 'hooks', name: 'Hooks', nameZh: '挂钩', color: '#D4A76A', material: 'satin', variant: 'six', availableVariants: [
    { id: 'three', name: '3 Hooks', nameZh: '三钩' },
    { id: 'six', name: '6 Hooks', nameZh: '六钩' },
    { id: 'spiral', name: 'Spiral', nameZh: '螺旋式' },
  ]},
  { id: 'base', name: 'Base', nameZh: '底座', color: '#3D3D3D', material: 'metal', variant: 'round', availableVariants: [
    { id: 'round', name: 'Round', nameZh: '圆盘' },
    { id: 'cross', name: 'Cross', nameZh: '十字' },
    { id: 'tripod', name: 'Tripod', nameZh: '三脚' },
  ]},
];
