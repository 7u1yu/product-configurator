export interface Preset {
  id: string;
  name: string;
  nameZh: string;
  productType: string;
  parts: Array<{ id: string; color: string; material: string; variant: string }>;
}

export const presets: Preset[] = [
  // Chair presets
  {
    id: 'chair-nordic', name: 'Nordic', nameZh: '北欧风', productType: 'chair',
    parts: [
      { id: 'seat', color: '#F5F0E8', material: 'satin', variant: 'sculpted' },
      { id: 'legs', color: '#D4A76A', material: 'satin', variant: 'wooden-tapered' },
      { id: 'backrest', color: '#F5F0E8', material: 'satin', variant: 'tall-panel' },
      { id: 'armrests', color: '#D4A76A', material: 'satin', variant: 'standard' },
    ],
  },
  {
    id: 'chair-industrial', name: 'Industrial', nameZh: '工业风', productType: 'chair',
    parts: [
      { id: 'seat', color: '#3D3D3D', material: 'metal', variant: 'flat' },
      { id: 'legs', color: '#3D3D3D', material: 'metal', variant: 'metal-straight' },
      { id: 'backrest', color: '#3D3D3D', material: 'metal', variant: 'slatted' },
      { id: 'armrests', color: '#3D3D3D', material: 'metal', variant: 'none' },
    ],
  },
  {
    id: 'chair-midcentury', name: 'Mid-Century', nameZh: '中古风', productType: 'chair',
    parts: [
      { id: 'seat', color: '#C67B5C', material: 'satin', variant: 'cushioned' },
      { id: 'legs', color: '#6B4226', material: 'satin', variant: 'wooden-tapered' },
      { id: 'backrest', color: '#C67B5C', material: 'satin', variant: 'short-panel' },
      { id: 'armrests', color: '#6B4226', material: 'satin', variant: 'standard' },
    ],
  },

  // Table presets
  {
    id: 'table-nordic', name: 'Nordic', nameZh: '北欧风', productType: 'table',
    parts: [
      { id: 'top', color: '#F5E6D3', material: 'satin', variant: 'rectangle' },
      { id: 'legs', color: '#D4A76A', material: 'satin', variant: 'four-legs' },
    ],
  },
  {
    id: 'table-industrial', name: 'Industrial', nameZh: '工业风', productType: 'table',
    parts: [
      { id: 'top', color: '#D4A76A', material: 'satin', variant: 'rectangle' },
      { id: 'legs', color: '#3D3D3D', material: 'metal', variant: 'trestle' },
    ],
  },
  {
    id: 'table-modern', name: 'Modern', nameZh: '现代简约', productType: 'table',
    parts: [
      { id: 'top', color: '#FFFFFF', material: 'glossy', variant: 'round' },
      { id: 'legs', color: '#FFFFFF', material: 'glossy', variant: 'pedestal' },
    ],
  },

  // Bed presets
  {
    id: 'bed-nordic', name: 'Nordic', nameZh: '北欧风', productType: 'bed',
    parts: [
      { id: 'headboard', color: '#F5E6D3', material: 'satin', variant: 'low' },
      { id: 'frame', color: '#D4A76A', material: 'satin', variant: 'slatted' },
      { id: 'legs', color: '#D4A76A', material: 'satin', variant: 'tapered' },
    ],
  },
  {
    id: 'bed-luxury', name: 'Luxury', nameZh: '轻奢风', productType: 'bed',
    parts: [
      { id: 'headboard', color: '#C4B8A8', material: 'satin', variant: 'tall' },
      { id: 'frame', color: '#6B4226', material: 'satin', variant: 'panel' },
      { id: 'legs', color: '#3D3D3D', material: 'metal', variant: 'straight' },
    ],
  },
  {
    id: 'bed-minimal', name: 'Minimal', nameZh: '极简风', productType: 'bed',
    parts: [
      { id: 'headboard', color: '#3D3D3D', material: 'matte', variant: 'none' },
      { id: 'frame', color: '#1A365D', material: 'matte', variant: 'platform' },
      { id: 'legs', color: '#3D3D3D', material: 'metal', variant: 'block' },
    ],
  },

  // Lamp presets
  {
    id: 'lamp-nordic', name: 'Nordic', nameZh: '北欧风', productType: 'lamp',
    parts: [
      { id: 'shade', color: '#F5E6D3', material: 'satin', variant: 'cone' },
      { id: 'body', color: '#D4A76A', material: 'satin', variant: 'straight' },
      { id: 'base', color: '#D4A76A', material: 'satin', variant: 'round' },
    ],
  },
  {
    id: 'lamp-industrial', name: 'Industrial', nameZh: '工业风', productType: 'lamp',
    parts: [
      { id: 'shade', color: '#3D3D3D', material: 'metal', variant: 'dome' },
      { id: 'body', color: '#3D3D3D', material: 'metal', variant: 'curved' },
      { id: 'base', color: '#3D3D3D', material: 'metal', variant: 'round' },
    ],
  },
  {
    id: 'lamp-colorful', name: 'Colorful', nameZh: '撞色风', productType: 'lamp',
    parts: [
      { id: 'shade', color: '#F7DC6F', material: 'glossy', variant: 'square' },
      { id: 'body', color: '#3498DB', material: 'glossy', variant: 'pillar' },
      { id: 'base', color: '#E74C3C', material: 'glossy', variant: 'square' },
    ],
  },
];
