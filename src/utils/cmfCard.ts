import type { PartConfig } from '../types';

export function generateCmfCard(parts: PartConfig[], productName: string): void {
  const canvas = document.querySelector('canvas');
  if (!canvas) return;

  // Take screenshot first
  const screenshot = canvas.toDataURL('image/png');

  // Create compositing canvas
  const card = document.createElement('canvas');
  card.width = 800;
  card.height = 600 + parts.length * 60;
  const ctx = card.getContext('2d')!;

  // Background
  ctx.fillStyle = '#0A0A0A';
  ctx.fillRect(0, 0, card.width, card.height);

  // Title
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 24px Inter, sans-serif';
  ctx.fillText(`${productName} — CMF Spec`, 40, 50);

  // Screenshot
  const img = new Image();
  img.src = screenshot;
  img.onload = () => {
    const scale = Math.min(720 / img.width, 400 / img.height);
    const sw = img.width * scale;
    const sh = img.height * scale;
    ctx.drawImage(img, 40, 70, sw, sh);

    // CMF Table
    const tableY = 90 + sh;
    ctx.fillStyle = '#1A1A1A';
    ctx.fillRect(40, tableY, 720, parts.length * 50 + 40);
    ctx.fillStyle = '#E5E5E5';
    ctx.font = '14px Inter, sans-serif';

    // Header
    ctx.fillText('Part', 60, tableY + 30);
    ctx.fillText('Color', 220, tableY + 30);
    ctx.fillText('Material', 380, tableY + 30);
    ctx.fillText('Style', 540, tableY + 30);

    // Rows
    parts.forEach((p, i) => {
      const y = tableY + 60 + i * 50;
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '13px Inter, sans-serif';
      ctx.fillText(p.nameZh, 60, y);

      // Color swatch
      ctx.fillStyle = p.color;
      ctx.fillRect(210, y - 14, 24, 24);
      ctx.strokeStyle = '#555';
      ctx.strokeRect(210, y - 14, 24, 24);

      ctx.fillStyle = '#FFFFFF';
      ctx.fillText(p.color.toUpperCase(), 245, y);
      ctx.fillText(p.material, 380, y);

      const variant = p.availableVariants.find((v) => v.id === p.variant);
      ctx.fillText(variant?.nameZh || p.variant, 540, y);
    });

    // Download
    const link = document.createElement('a');
    link.download = `cmf-card-${Date.now()}.png`;
    link.href = card.toDataURL('image/png');
    link.click();
  };
}
