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

export function Cabinet3D({ parts, selectedPart, selectPart, exploded = false, wireframe = false }: Props) {
  const get = (id: string) => parts.find((p) => p.id === id);
  const m = (id: string) => {
    const p = get(id);
    const isMetal = p?.material === 'metal';
    return { color: p?.color || '#ccc', roughness: isMetal ? 0.3 : p?.material === 'glossy' ? 0.15 : p?.material === 'satin' ? 0.4 : 0.8, metalness: isMetal ? 0.9 : 0 };
  };
  const sel = (id: string) => selectedPart === id ? { emissive: '#ffffff', emissiveIntensity: 0.12 } : {};

  const bodyV = get('body')?.variant || 'double-door';
  const doorV = get('doors')?.variant || 'panel';
  const legV = get('legs')?.variant || 'thin';
  const exp = exploded ? 0.2 : 0;

  const bw = 0.88, bh = 1.05, bd = 0.52;
  const bodyY = legV === 'none' ? 0.15 : 0.28;
  const bodyCY = bh / 2 + bodyY;

  const bodyMat = { ...m('body'), ...sel('body') };
  const doorMat = { ...m('doors'), ...sel('doors') };
  const legMat = { ...m('legs'), ...sel('legs') };

  const isDrawer = bodyV === 'drawers';
  const isOpen = doorV === 'open';
  const isGlass = doorV === 'glass';

  return (
    <group position={[0, 0, 0]}>
      {/* ====== LEGS ====== */}
      {legV !== 'none' && (
        <group onClick={(e) => { e.stopPropagation(); selectPart('legs'); }} onPointerOver={hoverIn} onPointerOut={hoverOut}>
          {legV === 'thin' && (
            [[0.32, 0.2], [-0.32, 0.2], [0.32, -0.2], [-0.32, -0.2]].map(([x, z], i) => {
              const legH = bodyY + 0.02;
              const legCY = legH / 2;
              return (
              <group key={i}>
                <mesh position={[x, legCY, z]} castShadow receiveShadow>
                  <cylinderGeometry args={[0.025, 0.03, legH, 16]} />
                  <meshStandardMaterial {...legMat} />
                </mesh>
              </group>
            );
            })
          )}
          {legV === 'base' && (
            <RoundedBox args={[bw - 0.06, 0.05, bd - 0.06]} radius={0.015} position={[0, 0.025, 0]} castShadow receiveShadow>
              <meshStandardMaterial {...legMat} />
            </RoundedBox>
          )}
        </group>
      )}

      {/* ====== BODY ====== */}
      <group onClick={(e) => { e.stopPropagation(); selectPart('body'); }} onPointerOver={hoverIn} onPointerOut={hoverOut}>
        <RoundedBox args={[bw, bh, bd]} radius={0.025} position={[0, bodyCY, 0]} castShadow receiveShadow>
          <meshStandardMaterial {...bodyMat} />
        </RoundedBox>
        {/* Top surface */}
        <RoundedBox args={[bw - 0.02, 0.015, bd - 0.02]} radius={0.01} position={[0, bodyCY + bh / 2 + 0.005, 0]}>
          <meshStandardMaterial {...bodyMat} roughness={0.35} />
        </RoundedBox>
        {wireframe && (
          <mesh position={[0, bodyCY, 0]}>
            <boxGeometry args={[bw + 0.02, bh + 0.02, bd + 0.02]} />
            <meshBasicMaterial color="#fff" wireframe transparent opacity={0.4} />
          </mesh>
        )}
      </group>

      {/* ====== DOORS ====== */}
      {!isOpen && (
        <group onClick={(e) => { e.stopPropagation(); selectPart('doors'); }} onPointerOver={hoverIn} onPointerOut={hoverOut}>
          {isDrawer ? (
            [0.65, 0.3, -0.02].map((y, i) => (
              <group key={i} position={[0 + (exploded ? exp * (i - 1) : 0), y + bodyY, bd / 2 + 0.018]}>
                <RoundedBox args={[bw - 0.04, 0.2, 0.025]} radius={0.006} castShadow>
                  <meshStandardMaterial {...doorMat} />
                </RoundedBox>
                {/* Handle */}
                <mesh position={[0, -0.02, 0.018]}>
                  <boxGeometry args={[0.08, 0.006, 0.008]} />
                  <meshStandardMaterial color="#C0C0C0" roughness={0.15} metalness={0.95} />
                </mesh>
              </group>
            ))
          ) : (
            <>
              {/* Left door */}
              <group position={[bw / 4 + (exploded ? -exp : 0), bodyCY, bd / 2 + 0.015 + (exploded ? exp : 0)]}>
                <RoundedBox args={[bw / 2 - 0.03, bh - 0.06, 0.025]} radius={0.008} castShadow>
                  <meshStandardMaterial {...doorMat} transparent={isGlass} opacity={isGlass ? 0.25 : 1} />
                </RoundedBox>
                {/* Frame for glass */}
                {isGlass && (
                  <mesh position={[0, 0, 0.002]}>
                    <boxGeometry args={[bw / 2 - 0.03, bh - 0.06, 0.002]} />
                    <meshBasicMaterial color="#2a2a2a" transparent opacity={0.3} />
                  </mesh>
                )}
                {/* Handle */}
                <mesh position={[bw / 4 - 0.06, 0, 0.018]}>
                  <boxGeometry args={[0.012, 0.06, 0.008]} />
                  <meshStandardMaterial color="#C0C0C0" roughness={0.15} metalness={0.95} />
                </mesh>
                {/* Hinge top */}
                <mesh position={[-bw / 4 + 0.02, bh / 2 - 0.08, 0]}>
                  <boxGeometry args={[0.015, 0.04, 0.015]} />
                  <meshStandardMaterial color="#A0A0A0" roughness={0.2} metalness={0.9} />
                </mesh>
                {/* Hinge bottom */}
                <mesh position={[-bw / 4 + 0.02, -bh / 2 + 0.08, 0]}>
                  <boxGeometry args={[0.015, 0.04, 0.015]} />
                  <meshStandardMaterial color="#A0A0A0" roughness={0.2} metalness={0.9} />
                </mesh>
              </group>
              {/* Right door */}
              <group position={[-bw / 4 - (exploded ? -exp : 0), bodyCY, bd / 2 + 0.015 + (exploded ? exp : 0)]}>
                <RoundedBox args={[bw / 2 - 0.03, bh - 0.06, 0.025]} radius={0.008} castShadow>
                  <meshStandardMaterial {...doorMat} transparent={isGlass} opacity={isGlass ? 0.25 : 1} />
                </RoundedBox>
                {isGlass && (
                  <mesh position={[0, 0, 0.002]}>
                    <boxGeometry args={[bw / 2 - 0.03, bh - 0.06, 0.002]} />
                    <meshBasicMaterial color="#2a2a2a" transparent opacity={0.3} />
                  </mesh>
                )}
                <mesh position={[-bw / 4 + 0.06, 0, 0.018]}>
                  <boxGeometry args={[0.012, 0.06, 0.008]} />
                  <meshStandardMaterial color="#C0C0C0" roughness={0.15} metalness={0.95} />
                </mesh>
                <mesh position={[bw / 4 - 0.02, bh / 2 - 0.08, 0]}>
                  <boxGeometry args={[0.015, 0.04, 0.015]} />
                  <meshStandardMaterial color="#A0A0A0" roughness={0.2} metalness={0.9} />
                </mesh>
                <mesh position={[bw / 4 - 0.02, -bh / 2 + 0.08, 0]}>
                  <boxGeometry args={[0.015, 0.04, 0.015]} />
                  <meshStandardMaterial color="#A0A0A0" roughness={0.2} metalness={0.9} />
                </mesh>
              </group>
            </>
          )}
        </group>
      )}
    </group>
  );
}
