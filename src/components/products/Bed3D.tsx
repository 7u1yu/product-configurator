import { RoundedBox } from '@react-three/drei';
import type { PartConfig } from '../../types';

interface Props {
  parts: PartConfig[];
  selectedPart: string;
  selectPart: (id: string) => void;
  exploded?: boolean;
  wireframe?: boolean;
  showDimensions?: boolean;
}

const hoverIn = () => { document.body.style.cursor = 'pointer'; };
const hoverOut = () => { document.body.style.cursor = 'auto'; };

export function Bed3D({ parts, selectedPart, selectPart, exploded = false }: Props) {
  const get = (id: string) => parts.find((p) => p.id === id);
  const m = (id: string) => {
    const p = get(id);
    const isMetal = p?.material === 'metal';
    return { color: p?.color || '#ccc', roughness: isMetal ? 0.3 : p?.material === 'glossy' ? 0.15 : p?.material === 'satin' ? 0.4 : 0.8, metalness: isMetal ? 0.9 : 0 };
  };
  const sel = (id: string) => selectedPart === id ? { emissive: '#ffffff', emissiveIntensity: 0.12 } : {};

  const hbV = get('headboard')?.variant || 'tall';
  const frameV = get('frame')?.variant || 'slatted';
  const legV = get('legs')?.variant || 'tapered';
  const exp = exploded ? 0.35 : 0;

  const fY = 0.3, fW = 1.9, fD = 2.1, fH = 0.14;
  const hbMat = { ...m('headboard'), ...sel('headboard') };
  const frameMat = { ...m('frame'), ...sel('frame') };
  const legMat = { ...m('legs'), ...sel('legs') };

  return (
    <group position={[0, 0, 0]}>
      {/* ====== HEADBOARD ====== */}
      {hbV !== 'none' && (
        <group onClick={(e) => { e.stopPropagation(); selectPart('headboard'); }} onPointerOver={hoverIn} onPointerOut={hoverOut}>
          <group position={[0, fY + fH + (hbV === 'tall' ? 0.4 : 0.15) + exp * 0.5, -fD / 2 + 0.03 - exp]}>
            {/* Main panel */}
            <RoundedBox args={[fW - 0.06, hbV === 'tall' ? 0.78 : 0.28, 0.06]} radius={0.025} castShadow receiveShadow>
              <meshStandardMaterial {...hbMat} />
            </RoundedBox>
            {/* Top molding */}
            <mesh position={[0, hbV === 'tall' ? 0.4 : 0.15, 0]}>
              <boxGeometry args={[fW - 0.02, 0.03, 0.07]} />
              <meshStandardMaterial {...hbMat} roughness={0.35} />
            </mesh>
            {/* Side posts */}
            <mesh position={[fW / 2 - 0.04, 0, -0.005]}>
              <boxGeometry args={[0.04, hbV === 'tall' ? 0.78 : 0.28, 0.07]} />
              <meshStandardMaterial {...hbMat} roughness={0.35} />
            </mesh>
            <mesh position={[-fW / 2 + 0.04, 0, -0.005]}>
              <boxGeometry args={[0.04, hbV === 'tall' ? 0.78 : 0.28, 0.07]} />
              <meshStandardMaterial {...hbMat} roughness={0.35} />
            </mesh>
          </group>
        </group>
      )}

      {/* ====== FRAME + MATTRESS ====== */}
      <group onClick={(e) => { e.stopPropagation(); selectPart('frame'); }} onPointerOver={hoverIn} onPointerOut={hoverOut}>
        {/* Frame base */}
        {frameV === 'slatted' && (
          <group position={[0, fY, 0]}>
            <RoundedBox args={[0.07, fH, fD]} radius={0.01} position={[0.9, 0, 0]} castShadow>
              <meshStandardMaterial {...frameMat} />
            </RoundedBox>
            <RoundedBox args={[0.07, fH, fD]} radius={0.01} position={[-0.9, 0, 0]} castShadow>
              <meshStandardMaterial {...frameMat} />
            </RoundedBox>
            {[-0.75, -0.35, 0.05, 0.45, 0.75].map((z, i) => (
              <RoundedBox key={i} args={[1.7, 0.025, 0.06]} radius={0.005} position={[0, 0.02, z]} castShadow>
                <meshStandardMaterial {...frameMat} />
              </RoundedBox>
            ))}
          </group>
        )}
        {frameV === 'platform' && (
          <RoundedBox args={[fW, fH, fD]} radius={0.02} position={[0, fY, 0]} castShadow receiveShadow>
            <meshStandardMaterial {...frameMat} />
          </RoundedBox>
        )}
        {frameV === 'panel' && (
          <group position={[0, fY, 0]}>
            <RoundedBox args={[fW - 0.1, fH - 0.01, fD - 0.1]} radius={0.015} position={[0, -0.02, 0]} castShadow receiveShadow>
              <meshStandardMaterial {...frameMat} />
            </RoundedBox>
            <RoundedBox args={[0.06, fH, fD]} radius={0.008} position={[0.93, 0, 0]} castShadow>
              <meshStandardMaterial {...frameMat} />
            </RoundedBox>
            <RoundedBox args={[0.06, fH, fD]} radius={0.008} position={[-0.93, 0, 0]} castShadow>
              <meshStandardMaterial {...frameMat} />
            </RoundedBox>
          </group>
        )}

        {/* Mattress */}
        <RoundedBox args={[fW - 0.12, 0.18, fD - 0.12]} radius={0.06} position={[0, fY + fH + 0.08, 0]} castShadow>
          <meshStandardMaterial color="#FAFAFA" roughness={0.85} metalness={0} />
        </RoundedBox>
        {/* Mattress top stitching */}
        <mesh position={[0, fY + fH + 0.18, 0]}>
          <boxGeometry args={[fW - 0.25, 0.005, fD - 0.25]} />
          <meshStandardMaterial color="#F0F0F0" roughness={1} />
        </mesh>

        {/* Pillows */}
        <RoundedBox args={[0.55, 0.1, 0.35]} radius={0.06} position={[-0.38, fY + fH + 0.2, -fD / 2 + 0.25]} castShadow>
          <meshStandardMaterial color="#F5F5F5" roughness={0.9} />
        </RoundedBox>
        <RoundedBox args={[0.55, 0.1, 0.35]} radius={0.06} position={[0.38, fY + fH + 0.2, -fD / 2 + 0.25]} castShadow>
          <meshStandardMaterial color="#F5F5F5" roughness={0.9} />
        </RoundedBox>
      </group>

      {/* ====== LEGS ====== */}
      <group onClick={(e) => { e.stopPropagation(); selectPart('legs'); }} onPointerOver={hoverIn} onPointerOut={hoverOut}>
        {[[0.78 + exp * 0.4, 0.8 + exp * 0.4], [-0.78 - exp * 0.4, 0.8 + exp * 0.4],
          [0.78 + exp * 0.4, -0.8 - exp * 0.4], [-0.78 - exp * 0.4, -0.8 - exp * 0.4]].map(([x, z], i) => {
          const legH = fY - fH / 2 + 0.01;
          const legCY = legH / 2;
          return (
          <group key={i}>
            <mesh position={[x, legCY, z]} castShadow receiveShadow>
              {legV === 'block' ? <boxGeometry args={[0.07, legH, 0.07]} /> :
               legV === 'straight' ? <cylinderGeometry args={[0.035, 0.035, legH, 16]} /> :
               <cylinderGeometry args={[0.025, 0.045, legH, 16]} />}
              <meshStandardMaterial {...legMat} />
            </mesh>
          </group>
        );
        })}
      </group>
    </group>
  );
}
