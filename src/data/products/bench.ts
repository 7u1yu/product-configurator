import type { PartConfig } from '../../types';

export const benchParts: PartConfig[] = [
  { id: 'seat', name: 'Seat', nameZh: '座面', color: '#D4A76A', material: 'satin', variant: 'flat', availableVariants: [
    { id: 'flat', name: 'Flat', nameZh: '平板' },
    { id: 'curved', name: 'Curved', nameZh: '曲面' },
    { id: 'slatted', name: 'Slatted', nameZh: '横条' },
  ]},
  { id: 'legs', name: 'Legs', nameZh: '腿', color: '#3D3D3D', material: 'metal', variant: 'a-frame', availableVariants: [
    { id: 'a-frame', name: 'A-Frame', nameZh: 'A型腿' },
    { id: 'straight', name: 'Straight', nameZh: '直腿' },
    { id: 'block', name: 'Block', nameZh: '方块腿' },
  ]},
  { id: 'backrest', name: 'Backrest', nameZh: '靠背', color: '#D4A76A', material: 'satin', variant: 'none', availableVariants: [
    { id: 'none', name: 'None', nameZh: '无靠背' },
    { id: 'low', name: 'Low', nameZh: '低靠背' },
    { id: 'full', name: 'Full', nameZh: '全高靠背' },
  ]},
];
