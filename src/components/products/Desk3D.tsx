import { RoundedBox } from '@react-three/drei';
import type { PartConfig } from '../../types';

interface Props { parts: PartConfig[]; selectedPart: string; selectPart: (id: string) => void; exploded?: boolean; wireframe?: boolean; showDimensions?: boolean; }
const hi = () => { document.body.style.cursor = 'pointer'; };
const ho = () => { document.body.style.cursor = 'auto'; };

export function Desk3D({ parts, selectedPart, selectPart, exploded = false }: Props) {
  const get = (id: string) => parts.find((p) => p.id === id);
  const m = (id: string) => { const p = get(id); const isMetal = p?.material === 'metal'; return { color: p?.color || '#ccc', roughness: isMetal ? 0.3 : p?.material === 'glossy' ? 0.15 : p?.material === 'satin' ? 0.4 : 0.8, metalness: isMetal ? 0.9 : 0 }; };
  const sel = (id: string) => selectedPart === id ? { emissive: '#ffffff', emissiveIntensity: 0.12 } : {};
  const topV = get('top')?.variant || 'rectangle';
  const legV = get('legs')?.variant || 'four-legs';
  const stV = get('storage')?.variant || 'right';
  const exp = exploded ? 0.25 : 0;
  const topH = 0.78;
  const isL = topV === 'l-shape';

  return (<group position={[0, -0.05, 0]}>
    {/* TOP */}
    <group onClick={(e) => { e.stopPropagation(); selectPart('top'); }} onPointerOver={hi} onPointerOut={ho}>
      <RoundedBox args={[topV === 'compact' ? 1.0 : 1.4, 0.05, 0.65]} radius={0.02} position={[0, topH + exp, 0]} castShadow receiveShadow><meshStandardMaterial {...m('top')} {...sel('top')} /></RoundedBox>
      {isL && (<RoundedBox args={[0.8, 0.05, 0.65]} radius={0.02} position={[1.05, topH + exp, 0.35]} rotation={[0, Math.PI / 2, 0]} castShadow><meshStandardMaterial {...m('top')} {...sel('top')} /></RoundedBox>)}
    </group>

    {/* LEGS */}
    <group onClick={(e) => { e.stopPropagation(); selectPart('legs'); }} onPointerOver={hi} onPointerOut={ho}>
      {legV === 'four-legs' && ([[0.55, 0.25], [-0.55, 0.25], [0.55, -0.25], [-0.55, -0.25]] as [number,number][]).map(([x, z], i) => (
        <mesh key={i} position={[x, (topH - 0.05) / 2, z]} castShadow receiveShadow><cylinderGeometry args={[0.03, 0.035, topH - 0.05, 16]} /><meshStandardMaterial {...m('legs')} {...sel('legs')} /></mesh>
      ))}
      {legV === 'pedestal' && (<>
        <mesh position={[0, 0.04, 0]} castShadow receiveShadow><cylinderGeometry args={[0.2, 0.25, 0.08, 32]} /><meshStandardMaterial {...m('legs')} {...sel('legs')} /></mesh>
        <mesh position={[0, 0.4, 0]} castShadow receiveShadow><cylinderGeometry args={[0.06, 0.1, 0.7, 24]} /><meshStandardMaterial {...m('legs')} {...sel('legs')} /></mesh>
      </>)}
      {legV === 'sawhorse' && (<>
        {[-0.35, 0.35].map((x, g) => (<group key={g} position={[x, 0.35, 0]}>
          {[[0, 0], [0, 0]].map((_, i) => (<group key={i}>
            <mesh position={[0, 0, (i === 0 ? 0.08 : -0.08) + (exploded ? (i === 0 ? exp : -exp) : 0)]} rotation={[i === 0 ? 0.18 : -0.18, 0, 0]} castShadow><boxGeometry args={[0.04, 0.65, 0.04]} /><meshStandardMaterial {...m('legs')} {...sel('legs')} /></mesh>
          </group>))}
        </group>))}
      </>)}
    </group>

    {/* STORAGE */}
    {stV !== 'none' && (<group onClick={(e) => { e.stopPropagation(); selectPart('storage'); }} onPointerOver={hi} onPointerOut={ho}>
      {(() => {
        const side = stV === 'left' ? -1 : 1;
        const sx = side * 0.55 + (exploded ? side * exp : 0);
        return (<group position={[sx, 0, 0]}>
          <RoundedBox args={[0.35, 0.5, 0.6]} radius={0.02} position={[0, 0.3, 0]} castShadow receiveShadow><meshStandardMaterial {...m('storage')} {...sel('storage')} /></RoundedBox>
          {[0.15, 0.3, 0.45].map((y, i) => (<group key={i} position={[0, y, 0.32 + (exploded ? exp * 0.3 : 0)]}>
            <RoundedBox args={[0.3, 0.12, 0.02]} radius={0.005}><meshStandardMaterial {...m('storage')} {...sel('storage')} /></RoundedBox>
            <mesh position={[0.1, 0, 0.015]}><boxGeometry args={[0.06, 0.008, 0.008]} /><meshStandardMaterial color="#C0C0C0" roughness={0.15} metalness={0.95} /></mesh>
          </group>))}
        </group>);
      })()}
    </group>)}
  </group>);
}
