import { RoundedBox } from '@react-three/drei';
import type { PartConfig } from '../../types';

interface Props { parts: PartConfig[]; selectedPart: string; selectPart: (id: string) => void; exploded?: boolean; wireframe?: boolean; showDimensions?: boolean; }
import { makeHoverIn, makeHoverOut } from '../../utils/interaction';

export function Sofa3D({ parts, selectedPart, selectPart, exploded = false }: Props) {
  const get = (id: string) => parts.find((p) => p.id === id);
  const m = (id: string) => {
    const p = get(id); const isMetal = p?.material === 'metal';
    return { color: p?.color || '#ccc', roughness: isMetal ? 0.3 : p?.material === 'glossy' ? 0.15 : p?.material === 'satin' ? 0.4 : 0.8, metalness: isMetal ? 0.9 : 0 };
  };
  const sel = (id: string) => selectedPart === id ? { emissive: '#ffffff', emissiveIntensity: 0.12 } : {};
  const cv = get('cushions')?.variant || 'three-seat';
  const fv = get('frame')?.variant || 'low';
  const lv = get('legs')?.variant || 'tapered';
  const av = get('armrests')?.variant || 'standard';
  const isL = cv === 'l-shape';
  const isHigh = fv === 'high';
  const sw = cv === 'two-seat' ? 1.8 : 2.6;
  const sd = 0.85;
  const seatY = lv === 'none' ? 0.25 : 0.38;
  const backH = isHigh ? 0.7 : 0.45;

  return (<group position={[0, 0.05, 0]}>
    {/* CUSHIONS */}
    <group onClick={(e) => { e.stopPropagation(); selectPart('cushions'); }} onPointerOver={makeHoverIn('座垫')} onPointerOut={makeHoverOut()}>
      {/* Seat cushion */}
      <RoundedBox args={[sw, 0.12, sd]} radius={0.06} position={[0, seatY, 0]} castShadow><meshStandardMaterial {...m('cushions')} {...sel('cushions')} /></RoundedBox>
      {/* Back cushion */}
      <RoundedBox args={[sw - 0.15, backH, 0.1]} radius={0.04} position={[0, seatY + backH / 2, -sd / 2 + 0.08]} castShadow><meshStandardMaterial {...m('cushions')} {...sel('cushions')} roughness={0.85} /></RoundedBox>
      {/* L-shape return */}
      {isL && (<><RoundedBox args={[1.2, 0.12, sd]} radius={0.06} position={[sw / 2 + 0.55, seatY, sd / 2 - 0.1]} rotation={[0, Math.PI / 2, 0]} castShadow><meshStandardMaterial {...m('cushions')} {...sel('cushions')} /></RoundedBox>
        <RoundedBox args={[0.9, backH, 0.1]} radius={0.04} position={[sw / 2 + 0.6, seatY + backH / 2, -sd / 2 + 0.2]} rotation={[0, Math.PI / 2, 0]} castShadow><meshStandardMaterial {...m('cushions')} {...sel('cushions')} roughness={0.85} /></RoundedBox></>)}
    </group>

    {/* FRAME */}
    <group onClick={(e) => { e.stopPropagation(); selectPart('frame'); }} onPointerOver={makeHoverIn('框架')} onPointerOut={makeHoverOut()}>
      <RoundedBox args={[sw + 0.08, 0.08, sd + 0.06]} radius={0.02} position={[0, seatY - 0.08, 0]} castShadow><meshStandardMaterial {...m('frame')} {...sel('frame')} /></RoundedBox>
      {/* Side panels - bottom sits on frame top, top reaches back cushion top */}
      <mesh position={[sw / 2 + 0.02, seatY + backH * 0.3, 0]} castShadow><boxGeometry args={[0.05, seatY + backH - 0.04, sd + 0.02]} /><meshStandardMaterial {...m('frame')} {...sel('frame')} /></mesh>
      <mesh position={[-sw / 2 - 0.02, seatY + backH * 0.3, 0]} castShadow><boxGeometry args={[0.05, seatY + backH - 0.04, sd + 0.02]} /><meshStandardMaterial {...m('frame')} {...sel('frame')} /></mesh>
    </group>

    {/* LEGS */}
    {lv !== 'none' && (<group onClick={(e) => { e.stopPropagation(); selectPart('legs'); }} onPointerOver={makeHoverIn('腿')} onPointerOut={makeHoverOut()}>
      {[[sw / 2 - 0.08, sd / 2 - 0.05], [-sw / 2 + 0.08, sd / 2 - 0.05], [sw / 2 - 0.08, -sd / 2 + 0.05], [-sw / 2 + 0.08, -sd / 2 + 0.05]].map((pos, i) => {
        const [x, z] = pos as number[];
        const legH = seatY - 0.04; // ground to frame bottom
        if (lv === 'block') return <mesh key={i} position={[x, legH / 2, z]} castShadow receiveShadow><boxGeometry args={[0.06, legH, 0.06]} /><meshStandardMaterial {...m('legs')} {...sel('legs')} /></mesh>;
        return <mesh key={i} position={[x, legH / 2, z]} castShadow receiveShadow><cylinderGeometry args={[0.02, 0.035, legH, 12]} /><meshStandardMaterial {...m('legs')} {...sel('legs')} /></mesh>;
      })}
    </group>)}

    {/* ARMRESTS */}
    {av !== 'none' && (<group onClick={(e) => { e.stopPropagation(); selectPart('armrests'); }} onPointerOver={makeHoverIn('扶手')} onPointerOut={makeHoverOut()}>
      {[1, -1].map((side) => {
        const sx = side * (sw / 2 + (exploded ? 0.15 * side : 0));
        const aw = av === 'wide' ? 0.12 : 0.08;
        return (<group key={side}>
          <RoundedBox args={[aw, 0.05, sd - 0.1]} radius={0.02} position={[sx, seatY + 0.18, 0]} castShadow><meshStandardMaterial {...m('armrests')} {...sel('armrests')} /></RoundedBox>
          <mesh position={[sx, seatY + 0.05, sd / 2 - 0.15]} castShadow><boxGeometry args={[aw, 0.25, 0.04]} /><meshStandardMaterial {...m('armrests')} {...sel('armrests')} /></mesh>
          <mesh position={[sx, seatY + 0.05, -sd / 2 + 0.15]} castShadow><boxGeometry args={[aw, 0.25, 0.04]} /><meshStandardMaterial {...m('armrests')} {...sel('armrests')} /></mesh>
        </group>);
      })}
    </group>)}
  </group>);
}
