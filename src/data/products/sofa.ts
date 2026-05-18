import type { PartConfig } from '../../types';

export const sofaParts: PartConfig[] = [
  { id: 'cushions', name: 'Cushions', nameZh: '座垫', color: '#C4B8A8', material: 'satin', variant: 'three-seat', availableVariants: [
    { id: 'two-seat', name: '2-Seat', nameZh: '双人座' },
    { id: 'three-seat', name: '3-Seat', nameZh: '三人座' },
    { id: 'l-shape', name: 'L-Shape', nameZh: 'L型' },
  ]},
  { id: 'frame', name: 'Frame', nameZh: '框架', color: '#6B4226', material: 'satin', variant: 'low', availableVariants: [
    { id: 'low', name: 'Low Back', nameZh: '矮背' },
    { id: 'high', name: 'High Back', nameZh: '高背' },
  ]},
  { id: 'legs', name: 'Legs', nameZh: '腿', color: '#3D3D3D', material: 'metal', variant: 'tapered', availableVariants: [
    { id: 'tapered', name: 'Tapered', nameZh: '锥形腿' },
    { id: 'block', name: 'Block', nameZh: '方块腿' },
    { id: 'none', name: 'None', nameZh: '无腿' },
  ]},
  { id: 'armrests', name: 'Armrests', nameZh: '扶手', color: '#C4B8A8', material: 'satin', variant: 'standard', availableVariants: [
    { id: 'standard', name: 'Standard', nameZh: '标准' },
    { id: 'wide', name: 'Wide', nameZh: '宽扶手' },
    { id: 'none', name: 'None', nameZh: '无扶手' },
  ]},
];
