import { CanvasTexture, RepeatWrapping } from 'three';

const textureCache = new Map<string, CanvasTexture>();

export function getWoodTexture(baseColor: string): CanvasTexture {
  const key = `wood_${baseColor}`;
  if (textureCache.has(key)) return textureCache.get(key)!;

  const canvas = document.createElement('canvas');
  canvas.width = 128; canvas.height = 128;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = baseColor;
  ctx.fillRect(0, 0, 128, 128);
  for (let i = 0; i < 20; i++) {
    const alpha = 0.03 + Math.random() * 0.06;
    ctx.strokeStyle = `rgba(0,0,0,${alpha})`;
    ctx.lineWidth = 1 + Math.random();
    ctx.beginPath();
    const y = i * 6.4 + Math.sin(i * 0.4) * 10;
    ctx.moveTo(0, y);
    ctx.bezierCurveTo(32, y + (Math.random() - 0.5) * 15, 96, y + (Math.random() - 0.5) * 15, 128, y);
    ctx.stroke();
  }
  const tex = new CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = RepeatWrapping;
  tex.repeat.set(3, 2);
  tex.colorSpace = 'srgb' as any;
  textureCache.set(key, tex);
  return tex;
}

export function getBrushedMetalTexture(): CanvasTexture {
  if (textureCache.has('metal')) return textureCache.get('metal')!;
  const canvas = document.createElement('canvas');
  canvas.width = 128; canvas.height = 128;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = '#888';
  ctx.fillRect(0, 0, 64, 64);
  for (let i = 0; i < 200; i++) {
    ctx.fillStyle = `rgba(${Math.random() > 0.5 ? 200 : 60},${Math.random() > 0.5 ? 200 : 60},${Math.random() > 0.5 ? 200 : 60},0.04)`;
    ctx.fillRect(0, Math.random() * 64, 64, 1 + Math.random() * 2);
  }
  const tex = new CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = RepeatWrapping;
  tex.repeat.set(4, 4);
  tex.colorSpace = 'srgb' as any;
  textureCache.set('metal', tex);
  return tex;
}

export function isWoodColor(color: string): boolean {
  const woodHexes = ['#D4A76A', '#C49A6C', '#6B4226', '#F5E6D3', '#E8D5B7', '#C4B8A8'];
  return woodHexes.includes(color.toUpperCase());
}
