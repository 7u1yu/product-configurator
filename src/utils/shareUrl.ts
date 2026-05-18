import type { PartConfig, ProductType } from '../types';

interface ShareState {
  p: ProductType;
  parts: Array<{ id: string; c: string; m: string; v: string }>;
}

export function encodeShareUrl(productType: ProductType, parts: PartConfig[]): string {
  const state: ShareState = {
    p: productType,
    parts: parts.map((p) => ({ id: p.id, c: p.color, m: p.material, v: p.variant })),
  };
  const json = JSON.stringify(state);
  const encoded = btoa(unescape(encodeURIComponent(json)));
  return `#${encoded}`;
}

export function decodeShareUrl(hash: string): ShareState | null {
  try {
    const encoded = hash.replace(/^#/, '');
    if (!encoded) return null;
    const json = decodeURIComponent(escape(atob(encoded)));
    const state: ShareState = JSON.parse(json);
    if (!state.p || !state.parts) return null;
    return state;
  } catch {
    return null;
  }
}
