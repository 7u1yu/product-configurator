import { Suspense, useEffect, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Html } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { ProductRenderer } from './ProductRenderer';
import { useProductStore } from '../store/useProductStore';
import { Toolbar } from './Toolbar';
import { hasWebGL } from '../utils/webgl';

const envPresets: Record<string, 'studio' | 'apartment' | 'sunset'> = {
  studio: 'studio', showroom: 'apartment', outdoor: 'sunset',
};

const views = [
  { label: '正面', pos: [0, 1.5, 4] as [number, number, number] },
  { label: '侧面', pos: [4, 1.5, 0] as [number, number, number] },
  { label: '3/4', pos: [2.5, 1.8, 2.8] as [number, number, number] },
  { label: '俯视', pos: [0, 4, 0.5] as [number, number, number] },
];

const productCameras: Record<string, [number, number, number]> = {
  chair: [2.5, 1.8, 2.8],
  table: [2.8, 2.2, 3.0],
  bed: [3.0, 1.5, 3.5],
  lamp: [1.8, 1.5, 2.2],
  shelf: [2.5, 2.0, 3.0],
  cabinet: [2.2, 1.5, 2.5],
  sofa: [3.5, 1.8, 3.5],
  desk: [2.8, 2.0, 3.0],
  bench: [3.0, 1.5, 2.5],
  coatrack: [1.8, 2.0, 2.5],
};

interface Props { isCompare?: boolean; }

export function Canvas3D({ isCompare = false }: Props) {
  const environment = useProductStore((s) => s.environment);
  const autoRotate = useProductStore((s) => s.autoRotate);
  const currentProduct = useProductStore((s) => s.currentProduct);
  const bgColor = useProductStore((s) => s.bgColor);
  const performanceMode = useProductStore((s) => s.performanceMode);
  const [webglOk] = useState(hasWebGL);

  if (!webglOk) {
    return (
      <div className="flex items-center justify-center h-full min-h-0 flex-1 bg-surface-950">
        <div className="text-center p-8">
          <p className="text-4xl mb-4">⚠️</p>
          <h3 className="text-white font-semibold mb-2">WebGL 不可用</h3>
          <p className="text-surface-400 text-sm max-w-md">
            您的浏览器或设备不支持 WebGL。请使用最新版 Chrome、Edge 或 Safari 打开。
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full min-h-0 flex-1">
      <Canvas
        shadows="soft"
        camera={{ position: productCameras[currentProduct] || [2.5, 1.8, 2.8], fov: 40 }}
        gl={{ antialias: true, toneMapping: 4, toneMappingExposure: 1.1, preserveDrawingBuffer: true, powerPreference: 'high-performance' }}
        style={{ width: '100%', height: '100%' }}
      >
        <Suspense fallback={null}>
          <Environment preset={envPresets[environment] || 'studio'} background blur={0.4} />
          <ambientLight intensity={0.3} />
          <directionalLight position={[8, 10, 4]} intensity={1.2} castShadow shadow-mapSize={performanceMode ? 512 : 2048} shadow-bias={-0.0003} shadow-normalBias={0.02} />
          <directionalLight position={[-4, 3, -3]} intensity={0.4} />
          <color attach="background" args={[bgColor]} />
          <ProductRenderer isCompare={isCompare} />
          <PartTooltip />
          <ContactShadows position={[0, -0.75, 0]} opacity={0.45} scale={5} blur={2.5} far={1.5} />
          <CameraController />
          <OrbitControls enableDamping dampingFactor={0.08} minDistance={1.2} maxDistance={7}
            minPolarAngle={0.2} maxPolarAngle={Math.PI / 2 + 0.2} autoRotate={autoRotate} autoRotateSpeed={0.8} />
          <EffectComposer>
            <Bloom luminanceThreshold={0.85} luminanceSmoothing={0.95} intensity={0.15} mipmapBlur />
            <Vignette darkness={0.25} offset={0.35} />
          </EffectComposer>
        </Suspense>
      </Canvas>

      {!isCompare && (
        <>
          <Toolbar />
          <div className="absolute bottom-4 left-4 flex items-center gap-1.5 z-10">
            {views.map((v, i) => (
              <button key={v.label}
                onClick={() => window.dispatchEvent(new CustomEvent('camera-preset', { detail: v.pos }))}
                className="px-2.5 py-1 text-[11px] rounded-lg bg-surface-900/60 border border-surface-700/40 text-surface-400 hover:text-white hover:border-surface-600/50 backdrop-blur-md transition-all"
                title={`快捷键: ${i + 1}`}>
                {v.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function CameraController() {
  const { camera } = useThree();
  const autoRotate = useProductStore((s) => s.autoRotate);
  const setAutoRotate = useProductStore((s) => s.setAutoRotate);
  const setExploded = useProductStore((s) => s.setExploded);
  const setWireframe = useProductStore((s) => s.setWireframe);
  const selectPart = useProductStore((s) => s.selectPart);
  const parts = useProductStore((s) => s.parts);

  useEffect(() => {
    const handler = (e: Event) => {
      const pos = (e as CustomEvent).detail as [number, number, number];
      const start = camera.position.clone();
      const end = { x: pos[0], y: pos[1], z: pos[2] };
      const st = performance.now();
      const dur = 800;
      function animate(now: number) {
        const t = Math.min((now - st) / dur, 1);
        const ease = 1 - Math.pow(1 - t, 3);
        camera.position.set(start.x + (end.x - start.x) * ease, start.y + (end.y - start.y) * ease, start.z + (end.z - start.z) * ease);
        if (t < 1) requestAnimationFrame(animate);
      }
      requestAnimationFrame(animate);
    };
    window.addEventListener('camera-preset', handler);
    return () => window.removeEventListener('camera-preset', handler);
  }, [camera]);

  // Keyboard shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      switch (e.key.toLowerCase()) {
        case ' ': e.preventDefault(); setAutoRotate(!autoRotate); break;
        case 'r': camera.position.set(2.5, 1.8, 2.8); camera.lookAt(0, 0.5, 0); break;
        case 'e': setExploded(!useProductStore.getState().exploded); break;
        case 'w': setWireframe(!useProductStore.getState().wireframe); break;
        case '1': window.dispatchEvent(new CustomEvent('camera-preset', { detail: views[0].pos })); break;
        case '2': window.dispatchEvent(new CustomEvent('camera-preset', { detail: views[1].pos })); break;
        case '3': window.dispatchEvent(new CustomEvent('camera-preset', { detail: views[2].pos })); break;
        case '4': window.dispatchEvent(new CustomEvent('camera-preset', { detail: views[3].pos })); break;
        case 'arrowleft': selectPart(parts[(parts.findIndex(p => p.id === useProductStore.getState().selectedPart) - 1 + parts.length) % parts.length]?.id); break;
        case 'arrowright': selectPart(parts[(parts.findIndex(p => p.id === useProductStore.getState().selectedPart) + 1) % parts.length]?.id); break;
        case 'z': if (e.metaKey || e.ctrlKey) { e.preventDefault(); if (e.shiftKey) useProductStore.getState().redo(); else useProductStore.getState().undo(); } break;
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [camera, autoRotate, parts]);

  return null;
}

function PartTooltip() {
  const [info, setInfo] = useState<{ name: string; x: number; y: number; z: number } | null>(null);
  useEffect(() => {
    const show = (e: Event) => setInfo((e as CustomEvent).detail);
    const hide = () => setInfo(null);
    window.addEventListener('part-hover', show);
    window.addEventListener('part-hover-out', hide);
    return () => { window.removeEventListener('part-hover', show); window.removeEventListener('part-hover-out', hide); };
  }, []);
  if (!info) return null;
  return (
    <Html position={[info.x, info.y + 0.15, info.z]} center style={{ pointerEvents: 'none' }}>
      <div className="bg-surface-900/90 text-white text-[11px] px-2.5 py-1 rounded-lg border border-surface-700/50 whitespace-nowrap backdrop-blur-md">
        {info.name}
      </div>
    </Html>
  );
}
