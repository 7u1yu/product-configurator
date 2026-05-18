import type { PartConfig } from '../../types';

interface Props { parts: PartConfig[]; selectedPart: string; selectPart: (id: string) => void; exploded?: boolean; wireframe?: boolean; showDimensions?: boolean; }
const hi = () => { document.body.style.cursor = 'pointer'; };
const ho = () => { document.body.style.cursor = 'auto'; };

export function CoatRack3D({ parts, selectedPart, selectPart }: Props) {
  const get = (id: string) => parts.find((p) => p.id === id);
  const m = (id: string) => { const p = get(id); const isMetal = p?.material === 'metal'; return { color: p?.color || '#ccc', roughness: isMetal ? 0.3 : p?.material === 'glossy' ? 0.15 : p?.material === 'satin' ? 0.4 : 0.8, metalness: isMetal ? 0.9 : 0 }; };
  const sel = (id: string) => selectedPart === id ? { emissive: '#ffffff', emissiveIntensity: 0.12 } : {};
  const poleV = get('pole')?.variant || 'straight';
  const hookV = get('hooks')?.variant || 'six';
  const baseV = get('base')?.variant || 'round';
  const poleH = 1.8;
  const hookCount = hookV === 'three' ? 3 : hookV === 'six' ? 6 : 8;

  return (<group position={[0, 0, 0]}>
    {/* POLE */}
    <group onClick={(e) => { e.stopPropagation(); selectPart('pole'); }} onPointerOver={hi} onPointerOut={ho}>
      {poleV === 'segmented' ? (<>
        {[0.4, 0.9, 1.4].map((y) => (<mesh key={y} position={[0, y, 0]} castShadow><cylinderGeometry args={[0.025, 0.025, 0.35, 16]} /><meshStandardMaterial {...m('pole')} {...sel('pole')} /></mesh>))}
        {[0.575, 1.075, 1.575].map((y) => (<mesh key={'j'+y} position={[0, y, 0]}><cylinderGeometry args={[0.03, 0.03, 0.03, 16]} /><meshStandardMaterial {...m('pole')} {...sel('pole')} roughness={0.25} metalness={0.85} /></mesh>))}
      </>) : (<>
        <mesh position={[0, poleH / 2, 0]} castShadow receiveShadow><cylinderGeometry args={[0.025, 0.03, poleV === 'curved' ? poleH - 0.3 : poleH, 16]} /><meshStandardMaterial {...m('pole')} {...sel('pole')} /></mesh>
        {poleV === 'curved' && (<mesh position={[0, poleH - 0.05, 0.1]} rotation={[0.5, 0, 0]} castShadow><cylinderGeometry args={[0.025, 0.02, 0.35, 12]} /><meshStandardMaterial {...m('pole')} {...sel('pole')} /></mesh>)}
        {/* Top finial */}
        <mesh position={[0, poleH, 0]}><sphereGeometry args={[0.035, 8, 8]} /><meshStandardMaterial {...m('pole')} {...sel('pole')} roughness={0.25} metalness={0.85} /></mesh>
      </>)}
    </group>

    {/* HOOKS */}
    <group onClick={(e) => { e.stopPropagation(); selectPart('hooks'); }} onPointerOver={hi} onPointerOut={ho}>
      {hookV === 'spiral' ? (<>
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i / 8) * Math.PI * 2;
          const y = 1.2 + i * 0.08;
          const r = 0.15;
          return (<group key={i} position={[Math.cos(angle) * r, y, Math.sin(angle) * r]}>
            <mesh rotation={[0, -angle + Math.PI / 2, 0.5]}><cylinderGeometry args={[0.012, 0.012, 0.18, 8]} /><meshStandardMaterial {...m('hooks')} {...sel('hooks')} /></mesh>
            <mesh position={[0.06, 0, 0]}><sphereGeometry args={[0.018, 6, 6]} /><meshStandardMaterial {...m('hooks')} {...sel('hooks')} roughness={0.2} metalness={0.9} /></mesh>
          </group>);
        })}
      </>) : (<>
        {Array.from({ length: hookCount }).map((_, i) => {
          const angle = (i / hookCount) * Math.PI * 2;
          const y = 1.3 + (i % 3) * 0.18 + (Math.floor(i / 3) * 0.05);
          const r = 0.12;
          return (<group key={i} position={[Math.cos(angle) * r, y, Math.sin(angle) * r]}>
            <mesh rotation={[Math.PI / 3, -angle + Math.PI / 2, 0]}><cylinderGeometry args={[0.01, 0.01, 0.16, 8]} /><meshStandardMaterial {...m('hooks')} {...sel('hooks')} /></mesh>
            <mesh position={[0.05, 0.01, 0]}><sphereGeometry args={[0.016, 6, 6]} /><meshStandardMaterial {...m('hooks')} {...sel('hooks')} roughness={0.2} metalness={0.9} /></mesh>
          </group>);
        })}
      </>)}
    </group>

    {/* BASE */}
    <group onClick={(e) => { e.stopPropagation(); selectPart('base'); }} onPointerOver={hi} onPointerOut={ho}>
      {baseV === 'round' && (<mesh position={[0, 0.03, 0]} castShadow receiveShadow><cylinderGeometry args={[0.25, 0.28, 0.05, 32]} /><meshStandardMaterial {...m('base')} {...sel('base')} /></mesh>)}
      {baseV === 'cross' && (<>
        <mesh position={[0, 0.03, 0]} castShadow><boxGeometry args={[0.55, 0.05, 0.06]} /><meshStandardMaterial {...m('base')} {...sel('base')} /></mesh>
        <mesh position={[0, 0.03, 0]} castShadow><boxGeometry args={[0.06, 0.05, 0.55]} /><meshStandardMaterial {...m('base')} {...sel('base')} /></mesh>
      </>)}
      {baseV === 'tripod' && (<>
        {[0, 2.09, 4.19].map((angle, i) => (<mesh key={i} position={[Math.cos(angle) * 0.2, 0.03, Math.sin(angle) * 0.2]} rotation={[0, -angle, 0.2]} castShadow><boxGeometry args={[0.04, 0.05, 0.3]} /><meshStandardMaterial {...m('base')} {...sel('base')} /></mesh>))}
      </>)}
    </group>
  </group>);
}
