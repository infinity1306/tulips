import { Suspense, useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { ContactShadows, OrbitControls, PerformanceMonitor, AdaptiveDpr, Environment, Float } from '@react-three/drei';

import { FlowerFactory } from '../flowers/FlowerFactory';
import { useFlowerStore } from '@/store/useFlowerStore';

export function MainScene() {
  const [dpr, setDpr] = useState(1.5);
  const controlsRef = useRef<any>(null);

  useEffect(() => {
    const handleZoomIn = () => {
      if (controlsRef.current) {
        const camera = controlsRef.current.object;
        const target = controlsRef.current.target;
        camera.position.sub(target).multiplyScalar(0.8).add(target);
        controlsRef.current.update();
      }
    };
    const handleZoomOut = () => {
      if (controlsRef.current) {
        const camera = controlsRef.current.object;
        const target = controlsRef.current.target;
        camera.position.sub(target).multiplyScalar(1.2).add(target);
        controlsRef.current.update();
      }
    };
    
    window.addEventListener('zoom-in', handleZoomIn);
    window.addEventListener('zoom-out', handleZoomOut);
    
    return () => {
      window.removeEventListener('zoom-in', handleZoomIn);
      window.removeEventListener('zoom-out', handleZoomOut);
    };
  }, []);

  return (
    <Canvas
      gl={{ 
        antialias: false,
        powerPreference: "high-performance",
        alpha: false 
      }}
      camera={{ position: [0, 0, 15], fov: 35 }}
      dpr={dpr}
      onPointerMissed={() => useFlowerStore.getState().setSelectedFlowerId(null)}
    >
      <Suspense fallback={null}>
        <PerformanceMonitor onIncline={() => setDpr(2)} onDecline={() => setDpr(1)}>
          <AdaptiveDpr pixelated />
        </PerformanceMonitor>

        {/* Dynamic Background: Premium warm studio white vs deep night */}
        <color attach="background" args={['#050510']} />
        
        {/* Photorealistic Environment Reflections */}
        <Environment preset="night" blur={0.8} />

        {/* Dynamic Lighting Rig */}
        <ambientLight intensity={0.8} />
        <directionalLight 
          position={[5, 10, 5]} 
          intensity={2.5} 
          color="#ffffff"
          castShadow 
          shadow-mapSize={[512, 512]} 
        />
        <directionalLight 
          position={[-5, 5, -5]} 
          intensity={0.8} 
          color="#88bbff" 
        />

        {/* Shadows */}
        <ContactShadows 
          position={[0, -2.5, 0]} 
          opacity={0.6} 
          scale={20} 
          blur={2.5} 
          far={10} 
          resolution={256}
          frames={1}
        />

        {/* Group holding the flowers - Added Float for organic breathing/swaying motion */}
        <Float 
          speed={1.5} 
          rotationIntensity={0.1} 
          floatIntensity={0.2} 
          floatingRange={[-0.05, 0.05]}
        >
          {/* Moved up from -1 to -1.0 to place the bouquet higher in the frame */}
          <group position={[0, -1.0, 0]}>
            <FlowerFactory />
          </group>
        </Float>

        <OrbitControls 
          ref={controlsRef}
          makeDefault 
          enablePan={false} 
          minPolarAngle={Math.PI / 4} 
          maxPolarAngle={Math.PI / 1.5}
          minDistance={3}
          maxDistance={15}
          enableDamping
          dampingFactor={0.05}
        />


      </Suspense>
    </Canvas>
  );
}
