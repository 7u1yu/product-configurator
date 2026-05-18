import type { PartConfig } from '../../types';

export const chairParts: PartConfig[] = [
  {
    id: 'seat',
    name: 'Seat',
    nameZh: '座面',
    color: '#E8D5B7',
    material: 'satin',
    variant: 'flat',
    availableVariants: [
      { id: 'flat', name: 'Flat', nameZh: '平直' },
      { id: 'cushioned', name: 'Cushioned', nameZh: '加厚' },
      { id: 'sculpted', name: 'Sculpted', nameZh: '曲面' },
    ],
  },
  {
    id: 'legs',
    name: 'Legs',
    nameZh: '椅腿',
    color: '#3D3D3D',
    material: 'metal',
    variant: 'metal-straight',
    availableVariants: [
      { id: 'metal-straight', name: 'Metal Straight', nameZh: '金属直腿' },
      { id: 'wooden-tapered', name: 'Wooden Tapered', nameZh: '木锥腿' },
      { id: 'sled', name: 'Sled Base', nameZh: '滑雪板底座' },
    ],
  },
  {
    id: 'backrest',
    name: 'Backrest',
    nameZh: '靠背',
    color: '#E8D5B7',
    material: 'satin',
    variant: 'tall-panel',
    availableVariants: [
      { id: 'tall-panel', name: 'Tall Panel', nameZh: '高面板' },
      { id: 'short-panel', name: 'Short Panel', nameZh: '低面板' },
      { id: 'slatted', name: 'Slatted', nameZh: '横条' },
    ],
  },
  {
    id: 'armrests',
    name: 'Armrests',
    nameZh: '扶手',
    color: '#3D3D3D',
    material: 'metal',
    variant: 'standard',
    availableVariants: [
      { id: 'standard', name: 'Standard', nameZh: '标准' },
      { id: 'none', name: 'None', nameZh: '无扶手' },
    ],
  },
];
