import { RoundedBox } from '@react-three/drei';
import type { PartConfig } from '../../types';
import { makeHoverIn, makeHoverOut } from '../../utils/interaction';

interface Props {
  parts: PartConfig[];
  selectedPart: string;
  selectPart: (id: string) => void;
  exploded?: boolean;
  wireframe?: boolean;
  showDimensions?: boolean;
}

const hoverIn = (name: string) => makeHoverIn(name);
const hoverOut = makeHoverOut();

export function Shelf3D({ parts, selectedPart, selectPart, exploded = false }: Props) {
  const get = (id: string) => parts.find((p) => p.id === id);
  const m = (id: string) => {
    const p = get(id);
    const isMetal = p?.material === 'metal';
    return { color: p?.color || '#ccc', roughness: isMetal ? 0.3 : p?.material === 'glossy' ? 0.15 : p?.material === 'satin' ? 0.4 : 0.8, metalness: isMetal ? 0.9 : 0 };
  };
  const sel = (id: string) => selectedPart === id ? { emissive: '#ffffff', emissiveIntensity: 0.12 } : {};

  const shelfV = get('shelves')?.variant || 'three';
  const supportV = get('supports')?.variant || 'metal';
  const exp = exploded ? 0.2 : 0;
  const layers = shelfV === 'four' ? 4 : shelfV === 'two' ? 2 : 3;
  const sW = 1.15, sD = 0.38, sT = 0.04;
  const spacing = 0.38;

  const shelfMat = { ...m('shelves'), ...sel('shelves') };
  const supMat = { ...m('supports'), ...sel('supports') };

  return (
    <group position={[0, 0.05, 0]}>
      {/* ====== SHELVES ====== */}
      <group onClick={(e) => { e.stopPropagation(); selectPart('shelves'); }} onPointerOver={hoverIn} onPointerOut={hoverOut}>
        {Array.from({ length: layers }).map((_, i) => {
          const y = 0.15 + i * spacing + (exploded ? exp * (i - (layers - 1) / 2) : 0);
          return (
            <group key={i}>
              <RoundedBox args={[sW, sT, sD]} radius={0.015} position={[0, y, 0]} castShadow receiveShadow>
                <meshStandardMaterial {...shelfMat} />
              </RoundedBox>
              {/* Edge banding */}
              <mesh position={[0, y - sT / 2 + 0.002, 0]}>
                <boxGeometry args={[sW, 0.005, sD]} />
                <meshStandardMaterial {...shelfMat} roughness={0.5} />
              </mesh>
            </group>
          );
        })}
      </group>

      {/* ====== SUPPORTS ====== */}
      <group onClick={(e) => { e.stopPropagation(); selectPart('supports'); }} onPointerOver={hoverIn} onPointerOut={hoverOut}>
        {supportV === 'metal' && (
          <>
            {[sW / 2 + 0.01, -sW / 2 - 0.01].map((x, si) => (
              <group key={si}>
                {/* Vertical post */}
                <mesh position={[x, 0.15 + (layers - 1) * spacing / 2, 0]} castShadow>
                  <boxGeometry args={[0.03, layers * spacing + 0.05, 0.03]} />
                  <meshStandardMaterial {...supMat} />
                </mesh>
                {/* Shelf brackets */}
                {Array.from({ length: layers }).map((_, i) => (
                  <mesh key={i} position={[x, 0.15 + i * spacing - 0.05, 0]} castShadow>
                    <boxGeometry args={[0.025, 0.06, 0.06]} />
                    <meshStandardMaterial {...supMat} roughness={0.3} metalness={0.85} />
                  </mesh>
                ))}
              </group>
            ))}
          </>
        )}

        {supportV === 'wood' && (
          <>
            {[sW / 2 + 0.02, -sW / 2 - 0.02].map((x, si) => (
              <RoundedBox key={si} args={[0.07, layers * spacing + 0.08, sD - 0.04]} radius={0.01}
                position={[x, 0.15 + (layers - 1) * spacing / 2, 0]} castShadow>
                <meshStandardMaterial {...supMat} />
              </RoundedBox>
            ))}
            {/* Back panel (thin) */}
            <mesh position={[0, 0.15 + (layers - 1) * spacing / 2, -sD / 2 + 0.02]} castShadow>
              <boxGeometry args={[sW - 0.14, layers * spacing + 0.06, 0.015]} />
              <meshStandardMaterial {...supMat} roughness={0.5} />
            </mesh>
          </>
        )}

        {supportV === 'floating' && (
          <>
            {[sW / 2 - 0.05, -sW / 2 + 0.05].map((x, si) => (
              <group key={si}>
                {Array.from({ length: layers }).map((_, i) => (
                  <group key={i}>
                    {/* Hidden bracket */}
                    <mesh position={[x, 0.15 + i * spacing - 0.04, sD / 2 - 0.04]} castShadow>
                      <boxGeometry args={[0.03, 0.04, 0.02]} />
                      <meshStandardMaterial {...supMat} roughness={0.3} metalness={0.85} />
                    </mesh>
                    <mesh position={[x, 0.15 + i * spacing - 0.04, -sD / 2 + 0.04]} castShadow>
                      <boxGeometry args={[0.03, 0.04, 0.02]} />
                      <meshStandardMaterial {...supMat} roughness={0.3} metalness={0.85} />
                    </mesh>
                  </group>
                ))}
              </group>
            ))}
          </>
        )}
      </group>
    </group>
  );
}
