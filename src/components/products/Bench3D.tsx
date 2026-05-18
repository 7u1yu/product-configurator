import { RoundedBox } from '@react-three/drei';
import type { PartConfig } from '../../types';

interface Props { parts: PartConfig[]; selectedPart: string; selectPart: (id: string) => void; exploded?: boolean; wireframe?: boolean; showDimensions?: boolean; }
import { makeHoverIn, makeHoverOut } from '../../utils/interaction';

export function Bench3D({ parts, selectedPart, selectPart, exploded = false }: Props) {
  const get = (id: string) => parts.find((p) => p.id === id);
  const m = (id: string) => { const p = get(id); const isMetal = p?.material === 'metal'; return { color: p?.color || '#ccc', roughness: isMetal ? 0.3 : p?.material === 'glossy' ? 0.15 : p?.material === 'satin' ? 0.4 : 0.8, metalness: isMetal ? 0.9 : 0 }; };
  const sel = (id: string) => selectedPart === id ? { emissive: '#ffffff', emissiveIntensity: 0.12 } : {};
  const seatV = get('seat')?.variant || 'flat';
  const legV = get('legs')?.variant || 'a-frame';
  const backV = get('backrest')?.variant || 'none';
  const exp = exploded ? 0.25 : 0;
  const sw = 2.0, sd = 0.45, st = 0.06, seatY = 0.45;

  return (<group position={[0, 0.05, 0]}>
    {/* SEAT */}
    <group onClick={(e) => { e.stopPropagation(); selectPart('seat'); }} onPointerOver={makeHoverIn('座面')} onPointerOut={makeHoverOut()}>
      {seatV === 'slatted' ? (<>
        {[-0.2, -0.1, 0, 0.1, 0.2].map((z, i) => (<RoundedBox key={i} args={[sw - 0.1, st, 0.06]} radius={0.01} position={[0, seatY, z]} castShadow><meshStandardMaterial {...m('seat')} {...sel('seat')} /></RoundedBox>))}
      </>) : (<RoundedBox args={[sw, st, sd]} radius={seatV === 'curved' ? 0.05 : 0.02} position={[0, seatY, 0]} castShadow receiveShadow><meshStandardMaterial {...m('seat')} {...sel('seat')} /></RoundedBox>)}
      {seatV === 'curved' && (<mesh position={[0, seatY - 0.01, 0]}><boxGeometry args={[sw - 0.04, 0.015, sd - 0.04]} /><meshStandardMaterial {...m('seat')} roughness={0.5} /></mesh>)}
    </group>

    {/* LEGS */}
    <group onClick={(e) => { e.stopPropagation(); selectPart('legs'); }} onPointerOver={makeHoverIn('腿')} onPointerOut={makeHoverOut()}>
      {legV === 'a-frame' ? (<>
        {[-1, 1].map((side) => (<group key={side}>
          <mesh position={[side * (sw / 2 - 0.1) + (exploded ? side * exp : 0), 0.22, 0]} rotation={[0, 0, side * 0.12]} castShadow><boxGeometry args={[0.05, 0.42, 0.05]} /><meshStandardMaterial {...m('legs')} {...sel('legs')} /></mesh>
          <mesh position={[side * (sw / 2 - 0.1) + (exploded ? side * exp : 0), 0.22, 0]} rotation={[0, 0, -side * 0.12]} castShadow><boxGeometry args={[0.05, 0.42, 0.05]} /><meshStandardMaterial {...m('legs')} {...sel('legs')} /></mesh>
        </group>))}
      </>) : (<>
        {[[sw / 2 - 0.1, sd / 2 - 0.05], [-sw / 2 + 0.1, sd / 2 - 0.05], [sw / 2 - 0.1, -sd / 2 + 0.05], [-sw / 2 + 0.1, -sd / 2 + 0.05]].map((pos, i) => {
          const [x, z] = pos as number[];
          if (legV === 'block') return <mesh key={i} position={[x, 0.1, z]} castShadow><boxGeometry args={[0.06, 0.2, 0.06]} /><meshStandardMaterial {...m('legs')} {...sel('legs')} /></mesh>;
          return <mesh key={i} position={[x, 0.22, z]} castShadow receiveShadow><cylinderGeometry args={[0.025, 0.035, 0.42, 12]} /><meshStandardMaterial {...m('legs')} {...sel('legs')} /></mesh>;
        })}
      </>)}
    </group>

    {/* BACKREST */}
    {backV !== 'none' && (<group onClick={(e) => { e.stopPropagation(); selectPart('backrest'); }} onPointerOver={makeHoverIn('靠背')} onPointerOut={makeHoverOut()}>
      <RoundedBox args={[sw - 0.1, backV === 'full' ? 0.4 : 0.15, 0.04]} radius={0.015} position={[0, seatY + (backV === 'full' ? 0.2 : 0.08), -sd / 2 + 0.02 + (exploded ? -exp : 0)]} castShadow><meshStandardMaterial {...m('backrest')} {...sel('backrest')} /></RoundedBox>
      {/* Support posts */}
      <mesh position={[sw / 2 - 0.15, seatY - 0.05, -sd / 2 + 0.02]} castShadow><cylinderGeometry args={[0.015, 0.015, seatY + 0.1, 8]} /><meshStandardMaterial {...m('backrest')} {...sel('backrest')} /></mesh>
      <mesh position={[-sw / 2 + 0.15, seatY - 0.05, -sd / 2 + 0.02]} castShadow><cylinderGeometry args={[0.015, 0.015, seatY + 0.1, 8]} /><meshStandardMaterial {...m('backrest')} {...sel('backrest')} /></mesh>
    </group>)}
  </group>);
}
