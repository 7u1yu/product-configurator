export function makeHoverIn(name: string) {
  return (e: any) => {
    e.stopPropagation();
    document.body.style.cursor = 'pointer';
    const pt = e.point;
    window.dispatchEvent(new CustomEvent('part-hover', { detail: { name, x: pt.x, y: pt.y, z: pt.z } }));
  };
}

export function makeHoverOut() {
  return () => {
    document.body.style.cursor = 'auto';
    window.dispatchEvent(new CustomEvent('part-hover-out'));
  };
}

export function makeDoubleClick(_partId: string) {
  return (e: any) => {
    e.stopPropagation();
    const pt = e.point;
    window.dispatchEvent(new CustomEvent('part-focus', { detail: [pt.x, pt.y + 0.4, pt.z + 1.5] }));
  };
}
