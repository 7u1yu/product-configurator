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
  // Sofa presets
  { id: 'sofa-nordic', name: 'Nordic', nameZh: '北欧风', productType: 'sofa', parts: [{ id: 'cushions', color: '#F5F0E8', material: 'satin', variant: 'three-seat' },{ id: 'frame', color: '#D4A76A', material: 'satin', variant: 'low' },{ id: 'legs', color: '#D4A76A', material: 'satin', variant: 'tapered' },{ id: 'armrests', color: '#F5F0E8', material: 'satin', variant: 'standard' }] },
  { id: 'sofa-modern', name: 'Modern', nameZh: '现代风', productType: 'sofa', parts: [{ id: 'cushions', color: '#3D3D3D', material: 'satin', variant: 'two-seat' },{ id: 'frame', color: '#3D3D3D', material: 'metal', variant: 'high' },{ id: 'legs', color: '#3D3D3D', material: 'metal', variant: 'block' },{ id: 'armrests', color: '#3D3D3D', material: 'metal', variant: 'wide' }] },
  // Desk presets
  { id: 'desk-nordic', name: 'Nordic', nameZh: '北欧风', productType: 'desk', parts: [{ id: 'top', color: '#F5E6D3', material: 'satin', variant: 'rectangle' },{ id: 'legs', color: '#D4A76A', material: 'satin', variant: 'four-legs' },{ id: 'storage', color: '#F5E6D3', material: 'satin', variant: 'right' }] },
  { id: 'desk-industrial', name: 'Industrial', nameZh: '工业风', productType: 'desk', parts: [{ id: 'top', color: '#D4A76A', material: 'satin', variant: 'l-shape' },{ id: 'legs', color: '#3D3D3D', material: 'metal', variant: 'sawhorse' },{ id: 'storage', color: '#3D3D3D', material: 'metal', variant: 'left' }] },
  // Bench presets
  { id: 'bench-nordic', name: 'Nordic', nameZh: '北欧风', productType: 'bench', parts: [{ id: 'seat', color: '#D4A76A', material: 'satin', variant: 'curved' },{ id: 'legs', color: '#D4A76A', material: 'satin', variant: 'a-frame' },{ id: 'backrest', color: '#D4A76A', material: 'satin', variant: 'low' }] },
  { id: 'bench-minimal', name: 'Minimal', nameZh: '极简风', productType: 'bench', parts: [{ id: 'seat', color: '#3D3D3D', material: 'matte', variant: 'flat' },{ id: 'legs', color: '#3D3D3D', material: 'metal', variant: 'straight' },{ id: 'backrest', color: '#3D3D3D', material: 'matte', variant: 'none' }] },
  // Coat rack presets
  { id: 'coatrack-nordic', name: 'Nordic', nameZh: '北欧风', productType: 'coatrack', parts: [{ id: 'pole', color: '#D4A76A', material: 'satin', variant: 'straight' },{ id: 'hooks', color: '#D4A76A', material: 'satin', variant: 'six' },{ id: 'base', color: '#D4A76A', material: 'satin', variant: 'round' }] },
  { id: 'coatrack-industrial', name: 'Industrial', nameZh: '工业风', productType: 'coatrack', parts: [{ id: 'pole', color: '#3D3D3D', material: 'metal', variant: 'segmented' },{ id: 'hooks', color: '#3D3D3D', material: 'metal', variant: 'spiral' },{ id: 'base', color: '#3D3D3D', material: 'metal', variant: 'tripod' }] },
];
