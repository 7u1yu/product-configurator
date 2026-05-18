import { CanvasTexture, RepeatWrapping } from 'three';

const textureCache = new Map<string, CanvasTexture>();

export function getWoodTexture(baseColor: string): CanvasTexture {
  const key = `wood_${baseColor}`;
  if (textureCache.has(key)) return textureCache.get(key)!;

  const canvas = document.createElement('canvas');
  canvas.width = 256; canvas.height = 256;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = baseColor;
  ctx.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 40; i++) {
    const alpha = 0.02 + Math.random() * 0.08;
    ctx.strokeStyle = `rgba(0,0,0,${alpha})`;
    ctx.lineWidth = 1 + Math.random() * 2;
    ctx.beginPath();
    const y = i * 6.4 + Math.sin(i * 0.4) * 15;
    ctx.moveTo(0, y);
    ctx.bezierCurveTo(64, y + (Math.random() - 0.5) * 20, 192, y + (Math.random() - 0.5) * 20, 256, y);
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
  ctx.fillStyle = '#888888';
  ctx.fillRect(0, 0, 128, 128);
  for (let i = 0; i < 800; i++) {
    ctx.fillStyle = `rgba(${Math.random() > 0.5 ? 200 : 50},${Math.random() > 0.5 ? 200 : 50},${Math.random() > 0.5 ? 200 : 50},0.03)`;
    ctx.fillRect(0, Math.random() * 128, 128, 1 + Math.random() * 2);
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
