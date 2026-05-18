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

export function Lamp3D({ parts, selectedPart, selectPart, exploded = false, wireframe = false }: Props) {
  const get = (id: string) => parts.find((p) => p.id === id);
  const m = (id: string) => {
    const p = get(id);
    const isMetal = p?.material === 'metal';
    return { color: p?.color || '#ccc', roughness: isMetal ? 0.3 : p?.material === 'glossy' ? 0.15 : p?.material === 'satin' ? 0.4 : 0.8, metalness: isMetal ? 0.9 : 0 };
  };
  const sel = (id: string) => selectedPart === id ? { emissive: '#ffffff', emissiveIntensity: 0.12 } : {};

  const shadeV = get('shade')?.variant || 'cone';
  const bodyV = get('body')?.variant || 'straight';
  const baseV = get('base')?.variant || 'round';
  const exp = exploded ? 0.3 : 0;

  const shadeMat = { ...m('shade'), ...sel('shade') };
  const bodyMat = { ...m('body'), ...sel('body') };
  const baseMat = { ...m('base'), ...sel('base') };

  const shadeY = 0.48 + exp;
  const isCurved = bodyV === 'curved';

  return (
    <group position={[0, 0, 0]}>
      {/* BASE */}
      {baseV !== 'none' && (
        <group onClick={(e) => { e.stopPropagation(); selectPart('base'); }} onPointerOver={hoverIn} onPointerOut={hoverOut}>
          {baseV === 'round' && (
            <>
              <mesh position={[0, 0.04 - exp, 0]} castShadow receiveShadow>
                <cylinderGeometry args={[0.22, 0.25, 0.05, 32]} />
                <meshStandardMaterial {...baseMat} />
              </mesh>
              <mesh position={[0, 0.065 - exp, 0]} castShadow>
                <cylinderGeometry args={[0.18, 0.2, 0.03, 32]} />
                <meshStandardMaterial {...baseMat} roughness={0.25} metalness={0.85} />
              </mesh>
            </>
          )}
          {baseV === 'square' && (
            <RoundedBox args={[0.35, 0.05, 0.35]} radius={0.04} position={[0, 0.04 - exp, 0]} castShadow receiveShadow>
              <meshStandardMaterial {...baseMat} />
            </RoundedBox>
          )}
        </group>
      )}

      {/* BODY */}
      <group onClick={(e) => { e.stopPropagation(); selectPart('body'); }} onPointerOver={hoverIn} onPointerOut={hoverOut}>
        {/* Lower joint */}
        {(bodyV === 'straight' || bodyV === 'pillar') && (
          <mesh position={[0, 0.1, 0]} castShadow>
            <cylinderGeometry args={[bodyV === 'pillar' ? 0.06 : 0.04, bodyV === 'pillar' ? 0.05 : 0.025, 0.06, 16]} />
            <meshStandardMaterial {...bodyMat} roughness={0.25} metalness={0.85} />
          </mesh>
        )}

        {/* Main shaft */}
        {(bodyV === 'straight' || bodyV === 'pillar') && (
          <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[bodyV === 'pillar' ? 0.04 : 0.02, bodyV === 'pillar' ? 0.05 : 0.025, 0.45, 16]} />
            <meshStandardMaterial {...bodyMat} />
          </mesh>
        )}

        {bodyV === 'curved' && (
          <>
            <mesh position={[0, 0.1, 0]} castShadow>
              <cylinderGeometry args={[0.04, 0.025, 0.06, 16]} />
              <meshStandardMaterial {...bodyMat} roughness={0.25} metalness={0.85} />
            </mesh>
            <mesh position={[0, 0.35, -0.08]} rotation={[0.3, 0, 0]} castShadow>
              <cylinderGeometry args={[0.02, 0.025, 0.5, 16]} />
              <meshStandardMaterial {...bodyMat} />
            </mesh>
          </>
        )}

        {/* Upper joint (shade connector) */}
        <mesh position={[0, 0.6, isCurved ? -0.05 : 0]} castShadow>
          <cylinderGeometry args={[bodyV === 'pillar' ? 0.05 : 0.03, bodyV === 'pillar' ? 0.04 : 0.02, 0.05, 16]} />
          <meshStandardMaterial {...bodyMat} roughness={0.25} metalness={0.85} />
        </mesh>

        {wireframe && (
          <mesh position={[0, 0.35, 0]}>
            <cylinderGeometry args={[0.06, 0.06, 0.55, 8]} />
            <meshBasicMaterial color="#fff" wireframe transparent opacity={0.4} />
          </mesh>
        )}
      </group>

      {/* SHADE */}
      <group onClick={(e) => { e.stopPropagation(); selectPart('shade'); }} onPointerOver={hoverIn} onPointerOut={hoverOut}>
        <group position={[0, shadeY, isCurved ? -0.08 : 0]}>
          {shadeV === 'cone' && (
            <mesh castShadow>
              <cylinderGeometry args={[0.04, 0.28, 0.35, 32]} />
              <meshStandardMaterial {...shadeMat} />
            </mesh>
          )}
          {shadeV === 'dome' && (
            <mesh castShadow>
              <sphereGeometry args={[0.24, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.45]} />
              <meshStandardMaterial {...shadeMat} />
            </mesh>
          )}
          {shadeV === 'square' && (
            <mesh position={[0, -0.05, 0]} castShadow>
              <boxGeometry args={[0.42, 0.3, 0.42]} />
              <meshStandardMaterial {...shadeMat} />
            </mesh>
          )}
        </group>
      </group>
    </group>
  );
}
