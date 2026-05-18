import { RoundedBox } from '@react-three/drei';
import type { PartConfig } from '../../types';
import { getWoodTexture, getBrushedMetalTexture, isWoodColor } from '../../utils/proceduralTextures';
import { useEffect, useState, useRef } from 'react';
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

export function Chair3D({ parts, selectedPart, selectPart, exploded = false, wireframe = false }: Props) {
  const get = (id: string) => parts.find((p) => p.id === id);
  const texturesRef = useRef<{ metal?: any; wood: Record<string, any> }>({ wood: {} });
  const [, setReady] = useState(false);
  useEffect(() => { texturesRef.current.metal = getBrushedMetalTexture(); setReady(true); }, []);
  const m = (id: string) => {
    const p = get(id);
    const isMetal = p?.material === 'metal';
    const mat: any = {
      color: p?.color || '#ccc',
      roughness: isMetal ? 0.3 : p?.material === 'glossy' ? 0.15 : p?.material === 'satin' ? 0.4 : 0.8,
      metalness: isMetal ? 0.9 : 0,
    };
    if (isMetal && texturesRef.current.metal) mat.map = texturesRef.current.metal;
    if (!isMetal && p?.material !== 'glossy' && isWoodColor(p?.color || '')) {
      const c = p?.color || '#D4A76A';
      if (!texturesRef.current.wood[c]) texturesRef.current.wood[c] = getWoodTexture(c);
      mat.map = texturesRef.current.wood[c];
    }
    return mat;
  };
  const sel = (id: string) => selectedPart === id ? { emissive: '#ffffff', emissiveIntensity: 0.12 } : {};

  const seatV = get('seat')?.variant || 'flat';
  const legV = get('legs')?.variant || 'metal-straight';
  const backV = get('backrest')?.variant || 'tall-panel';
  const armV = get('armrests')?.variant || 'standard';
  const exp = exploded ? 0.35 : 0;

  const isWoodLeg = legV === 'wooden-tapered';
  const legMat = { ...m('legs'), ...sel('legs') };
  const seatMat = { ...m('seat'), ...sel('seat') };
  const backMat = { ...m('backrest'), ...sel('backrest') };
  const armMat = { ...m('armrests'), ...sel('armrests') };

  return (
    <group position={[0, 0.05, 0]}>
      {/* ====== SEAT ====== */}
      <group onClick={(e) => { e.stopPropagation(); selectPart('seat'); }}
        onPointerOver={hoverIn('座面')} onPointerOut={hoverOut}>
        {/* Main seat shell */}
        <RoundedBox args={[1.15, 0.06, 0.95]} radius={0.04} position={[0, 0.4, 0]} castShadow receiveShadow>
          <meshStandardMaterial {...seatMat} />
        </RoundedBox>

        {/* Cushion top */}
        {seatV === 'cushioned' && (
          <>
            <RoundedBox args={[1.05, 0.06, 0.82]} radius={0.05} position={[0, 0.47, 0.02]} castShadow>
              <meshStandardMaterial {...seatMat} roughness={0.9} />
            </RoundedBox>
            {/* Stitching groove */}
            <mesh position={[0, 0.5, 0.02]}>
              <boxGeometry args={[0.9, 0.005, 0.7]} />
              <meshStandardMaterial color="#1a1a1a" roughness={1} />
            </mesh>
          </>
        )}

        {/* Sculpted contour lip */}
        {seatV === 'sculpted' && (
          <RoundedBox args={[1.0, 0.04, 0.22]} radius={0.03} position={[0, 0.43, 0.18]} rotation={[-0.2, 0, 0]} castShadow>
            <meshStandardMaterial {...seatMat} />
          </RoundedBox>
        )}

        {/* Wireframe */}
        {wireframe && <mesh position={[0, 0.4, 0]}><boxGeometry args={[1.17, 0.08, 0.97]} /><meshBasicMaterial color="#fff" wireframe transparent opacity={0.4} /></mesh>}
      </group>

      {/* ====== BACKREST ====== */}
      <group onClick={(e) => { e.stopPropagation(); selectPart('backrest'); }}
        onPointerOver={hoverIn('靠背')} onPointerOut={hoverOut}>
        <group position={[0, backV === 'short-panel' ? 0.6 : 0.75, -0.42 - exp]} rotation={[-0.25, 0, 0]}>
          {backV !== 'slatted' ? (
            <>
              {/* Main panel */}
              <RoundedBox args={[1.05, backV === 'short-panel' ? 0.45 : 0.72, 0.05]} radius={0.03} castShadow receiveShadow>
                <meshStandardMaterial {...backMat} />
              </RoundedBox>
              {/* Frame border - recessed from edges */}
              <mesh position={[0, backV === 'short-panel' ? 0.24 : 0.38, 0.003]} castShadow>
                <boxGeometry args={[1.0, 0.03, 0.05]} />
                <meshStandardMaterial {...backMat} />
              </mesh>
              <mesh position={[0, backV === 'short-panel' ? -0.24 : -0.38, 0.003]} castShadow>
                <boxGeometry args={[1.0, 0.03, 0.05]} />
                <meshStandardMaterial {...backMat} />
              </mesh>
              <mesh position={[0.51, 0, 0.003]} castShadow>
                <boxGeometry args={[0.025, backV === 'short-panel' ? 0.4 : 0.7, 0.05]} />
                <meshStandardMaterial {...backMat} />
              </mesh>
              <mesh position={[-0.51, 0, 0.003]} castShadow>
                <boxGeometry args={[0.025, backV === 'short-panel' ? 0.4 : 0.7, 0.05]} />
                <meshStandardMaterial {...backMat} />
              </mesh>
            </>
          ) : (
            /* Slatted */
            [0.27, 0.07, -0.13].map((y, i) => (
              <RoundedBox key={i} args={[1.0, 0.06, 0.05]} radius={0.015} position={[0, y, 0]} castShadow>
                <meshStandardMaterial {...backMat} />
              </RoundedBox>
            ))
          )}
          {wireframe && <mesh><boxGeometry args={[1.07, backV === 'short-panel' ? 0.47 : 0.77, 0.08]} /><meshBasicMaterial color="#fff" wireframe transparent opacity={0.4} /></mesh>}
        </group>
      </group>

      {/* ====== LEGS ====== */}
      <group onClick={(e) => { e.stopPropagation(); selectPart('legs'); }}
        onPointerOver={hoverIn('椅腿')} onPointerOut={hoverOut}>
        {(legV === 'metal-straight' || legV === 'wooden-tapered') && (
          <>
            {[[0.38 + exp, 0.3 + exp / 2], [-0.38 - exp, 0.3 + exp / 2],
              [0.35 + exp, -0.32 - exp / 2], [-0.35 - exp, -0.32 - exp / 2]].map(([x, z], i) => (
              <group key={i}>
                {/* Leg shaft */}
                <mesh position={[x, -0.05, z]} castShadow receiveShadow>
                  <cylinderGeometry args={[isWoodLeg ? 0.03 : 0.032, isWoodLeg ? 0.042 : 0.038, 0.82, 16]} />
                  <meshStandardMaterial {...legMat} />
                </mesh>
                {/* Floor cap */}
                <mesh position={[x, -0.43, z]} castShadow>
                  <cylinderGeometry args={[isWoodLeg ? 0.042 : 0.04, isWoodLeg ? 0.048 : 0.045, 0.04, 16]} />
                  <meshStandardMaterial {...legMat} roughness={0.6} metalness={0.2} />
                </mesh>
                {/* Joint connector at seat */}
                <mesh position={[x, 0.36, z]}>
                  <cylinderGeometry args={[isWoodLeg ? 0.035 : 0.038, isWoodLeg ? 0.028 : 0.03, 0.06, 16]} />
                  <meshStandardMaterial {...legMat} roughness={isWoodLeg ? 0.4 : 0.3} />
                </mesh>
              </group>
            ))}
            {/* Cross stretchers: front legs (z=0.3) and rear legs (z=-0.32) */}
            {!exploded && (
              <>
                <mesh position={[0, -0.2, 0.3]} rotation={[0, 0, Math.PI / 2]} castShadow>
                  <cylinderGeometry args={[0.02, 0.02, 0.72, 8]} />
                  <meshStandardMaterial {...legMat} />
                </mesh>
                <mesh position={[0, -0.22, -0.32]} rotation={[0, 0, Math.PI / 2]} castShadow>
                  <cylinderGeometry args={[0.02, 0.02, 0.66, 8]} />
                  <meshStandardMaterial {...legMat} />
                </mesh>
              </>
            )}
          </>
        )}
        {legV === 'sled' && <SledBaseDetailed mat={legMat} exp={exp} />}
      </group>

      {/* ====== ARMRESTS ====== */}
      {armV !== 'none' && (
        <group onClick={(e) => { e.stopPropagation(); selectPart('armrests'); }}
          onPointerOver={hoverIn('扶手')} onPointerOut={hoverOut}>
          {[1, -1].map((side) => {
            const sx = side * (0.58 + exp);
            return (
              <group key={side}>
                {/* Front support */}
                <mesh position={[sx, 0.42, 0.3]} castShadow>
                  <cylinderGeometry args={[0.022, 0.025, 0.38, 12]} />
                  <meshStandardMaterial {...armMat} />
                </mesh>
                {/* Back support */}
                <mesh position={[sx, 0.42, -0.3]} castShadow>
                  <cylinderGeometry args={[0.022, 0.025, 0.38, 12]} />
                  <meshStandardMaterial {...armMat} />
                </mesh>
                {/* Connecting bracket front */}
                <mesh position={[sx, 0.6, 0.3]} castShadow>
                  <boxGeometry args={[0.03, 0.03, 0.06]} />
                  <meshStandardMaterial {...armMat} roughness={0.3} metalness={0.8} />
                </mesh>
                {/* Connecting bracket back */}
                <mesh position={[sx, 0.6, -0.3]} castShadow>
                  <boxGeometry args={[0.03, 0.03, 0.06]} />
                  <meshStandardMaterial {...armMat} roughness={0.3} metalness={0.8} />
                </mesh>
                {/* Top rail */}
                <RoundedBox args={[0.06, 0.04, 0.82]} radius={0.012} position={[sx, 0.63, 0]} castShadow>
                  <meshStandardMaterial {...armMat} />
                </RoundedBox>
                {/* Rail padding top */}
                <RoundedBox args={[0.07, 0.015, 0.78]} radius={0.01} position={[sx, 0.655, 0]}>
                  <meshStandardMaterial {...armMat} roughness={0.9} />
                </RoundedBox>
              </group>
            );
          })}
        </group>
      )}
    </group>
  );
}

function SledBaseDetailed({ mat, exp }: { mat: Record<string, unknown>; exp: number }) {
  return (
    <group>
      {[0.3 + exp, -0.3 - exp].map((x, i) => (
        <group key={i}>
          {/* Runner */}
          <RoundedBox args={[0.05, 0.05, 0.85]} radius={0.015} position={[x, -0.38, 0.2 - exp / 2]} castShadow receiveShadow>
            <meshStandardMaterial {...mat} />
          </RoundedBox>
          {/* Runner tip (front curve) */}
          <mesh position={[x, -0.36, 0.62 - exp / 2]} rotation={[-0.3, 0, 0]}>
            <cylinderGeometry args={[0.025, 0.025, 0.06, 8]} />
            <meshStandardMaterial {...mat} />
          </mesh>
          {/* Vertical supports: seat bottom(~0.34) to runner top(-0.355) */}
          {[0.62 - exp / 2, -0.22 - exp / 2].map((z, j) => (
            <mesh key={j} position={[x, -0.01, z]} castShadow receiveShadow>
              <cylinderGeometry args={[0.022, 0.022, 0.62, 12]} />
              <meshStandardMaterial {...mat} />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}
