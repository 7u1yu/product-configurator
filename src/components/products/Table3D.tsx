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

export function Table3D({ parts, selectedPart, selectPart, exploded = false }: Props) {
  const get = (id: string) => parts.find((p) => p.id === id);
  const m = (id: string) => {
    const p = get(id);
    const isMetal = p?.material === 'metal';
    return { color: p?.color || '#ccc', roughness: isMetal ? 0.3 : p?.material === 'glossy' ? 0.15 : p?.material === 'satin' ? 0.4 : 0.8, metalness: isMetal ? 0.9 : 0 };
  };
  const sel = (id: string) => selectedPart === id ? { emissive: '#ffffff', emissiveIntensity: 0.12 } : {};

  const topV = get('top')?.variant || 'rectangle';
  const legV = get('legs')?.variant || 'four-legs';
  const exp = exploded ? 0.3 : 0;
  const topH = 0.85;
  const topT = 0.06;

  const topMat = { ...m('top'), ...sel('top') };
  const legMat = { ...m('legs'), ...sel('legs') };

  return (
    <group position={[0, -0.05, 0]}>
      {/* ====== TOP ====== */}
      <group onClick={(e) => { e.stopPropagation(); selectPart('top'); }} onPointerOver={hoverIn} onPointerOut={hoverOut}>
        <group position={[0, topH + exp, 0]}>
          {/* Main surface */}
          {topV === 'round' && (
            <mesh castShadow receiveShadow>
              <cylinderGeometry args={[0.65, 0.65, topT, 48]} />
              <meshStandardMaterial {...topMat} />
            </mesh>
          )}
          {topV === 'rectangle' && (
            <>
              <RoundedBox args={[1.4, topT, 0.85]} radius={0.03} castShadow receiveShadow>
                <meshStandardMaterial {...topMat} />
              </RoundedBox>
              {/* Underside bevel */}
              <mesh position={[0, -0.028, 0]}>
                <boxGeometry args={[1.36, 0.01, 0.81]} />
                <meshStandardMaterial {...topMat} roughness={0.6} />
              </mesh>
            </>
          )}
          {topV === 'square' && (
            <>
              <RoundedBox args={[0.9, topT, 0.9]} radius={0.03} castShadow receiveShadow>
                <meshStandardMaterial {...topMat} />
              </RoundedBox>
              <mesh position={[0, -0.028, 0]}>
                <boxGeometry args={[0.86, 0.01, 0.86]} />
                <meshStandardMaterial {...topMat} roughness={0.6} />
              </mesh>
            </>
          )}
        </group>
      </group>

      {/* ====== LEGS ====== */}
      <group onClick={(e) => { e.stopPropagation(); selectPart('legs'); }} onPointerOver={hoverIn} onPointerOut={hoverOut}>
        {legV === 'four-legs' && (
          <>
            {[[0.55 + exp, 0.3 + exp], [-0.55 - exp, 0.3 + exp], [0.55 + exp, -0.3 - exp], [-0.55 - exp, -0.3 - exp]].map(([x, z], i) => {
              const legH = topH - topT + 0.03; // ground to table bottom
              const legCY = legH / 2; // center of leg from ground
              return (
                <group key={i}>
                  <mesh position={[x, legCY, z]} castShadow receiveShadow>
                    <cylinderGeometry args={[0.035, 0.04, legH, 16]} />
                    <meshStandardMaterial {...legMat} />
                  </mesh>
                </group>
              );
            })}
            {/* Cross stretchers */}
            {!exploded && (
              <>
                <mesh position={[0, topH * 0.35, 0.3]} rotation={[0, 0, Math.PI / 2]} castShadow>
                  <cylinderGeometry args={[0.018, 0.018, 1.05, 8]} />
                  <meshStandardMaterial {...legMat} />
                </mesh>
                <mesh position={[0.55, topH * 0.35, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
                  <cylinderGeometry args={[0.018, 0.018, 0.55, 8]} />
                  <meshStandardMaterial {...legMat} />
                </mesh>
                <mesh position={[-0.55, topH * 0.35, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
                  <cylinderGeometry args={[0.018, 0.018, 0.55, 8]} />
                  <meshStandardMaterial {...legMat} />
                </mesh>
              </>
            )}
          </>
        )}

        {legV === 'pedestal' && (
          <>
            <mesh position={[0, 0.05, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[0.22, 0.28, 0.1, 32]} />
              <meshStandardMaterial {...legMat} />
            </mesh>
            <mesh position={[0, 0.46, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[0.08, 0.1, 0.72, 24]} />
              <meshStandardMaterial {...legMat} />
            </mesh>
            <mesh position={[0, topH - topT / 2, 0]}>
              <cylinderGeometry args={[0.1, 0.08, 0.04, 24]} />
              <meshStandardMaterial {...legMat} roughness={0.25} metalness={0.85} />
            </mesh>
          </>
        )}

        {legV === 'trestle' && (
          <>
            <RoundedBox args={[0.9, 0.04, 0.07]} radius={0.01} position={[0, topH - topT - 0.02, 0]} castShadow>
              <meshStandardMaterial {...legMat} />
            </RoundedBox>
            {[-0.4 - exp * 0.3, 0.4 + exp * 0.3].map((x, g) => {
              const legH = topH - topT;
              return (
              <group key={g}>
                {[0.14, -0.14].map((zOff, i) => (
                  <mesh key={i} position={[x, legH / 2, zOff]} rotation={[0.15 * (i === 0 ? 1 : -1), 0, 0]} castShadow>
                    <boxGeometry args={[0.05, legH, 0.05]} />
                    <meshStandardMaterial {...legMat} />
                  </mesh>
                ))}
              </group>
            );
            })}
          </>
        )}
      </group>
    </group>
  );
}
