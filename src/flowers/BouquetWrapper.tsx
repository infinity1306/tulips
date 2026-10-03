import { useFlowerStore } from '@/store/useFlowerStore';
import { useSpring, a } from '@react-spring/three';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

export function BouquetWrapper() {
  const isBouquetMode = useFlowerStore(state => state.isBouquetMode);
  const wrapperStyle = useFlowerStore(state => state.wrapperStyle);
  
  // Preload textures
  const newspaperTexture = useTexture('/assets/newspaper.png');
  const kraftTexture = useTexture('/assets/kraft.png');
  
  // Apply correct color space
  newspaperTexture.colorSpace = THREE.SRGBColorSpace;
  kraftTexture.colorSpace = THREE.SRGBColorSpace;

  // Determine material properties based on style
  const getMaterialProps = () => {
    switch (wrapperStyle) {
      case 'newspaper':
        return { map: newspaperTexture, color: '#ffffff', roughness: 0.7, clearcoat: 0.1 };
      case 'kraft':
        return { map: kraftTexture, color: '#ffffff', roughness: 0.9 };
      case 'black':
      default:
        // Premium frosted black paper
        return { map: null, color: '#151515', roughness: 0.4, clearcoat: 0.3, transmission: 0.1, thickness: 0.5 };
    }
  };

  const matProps = getMaterialProps();

  // Animate the wrapper appearing
  const { scale, position } = useSpring({
    // Flatten it slightly on Z axis so it's wider horizontally
    scale: isBouquetMode ? [1.1, 1, 0.8] : [0.01, 0.01, 0.01],
    position: isBouquetMode ? [0, -0.2, 0] : [0, -4, 0],
    config: { mass: 2, tension: 100, friction: 14 }
  });

  return (
    <a.group 
      // @ts-ignore
      scale={scale} 
      // @ts-ignore
      position={position}
    >
      {/* --- KOREAN STYLE FLORIST WRAP --- */}
      
      {/* INNER LAYER: Translucent, frosted tissue paper that hugs the flowers closely */}
      <group position={[0, 0, 0]}>
        {/* Inner Back Left: height 2.8, center Y = 0.4 */}
        <mesh castShadow receiveShadow position={[0, 0.4, 0]} rotation={[-0.05, Math.PI * 0.9, 0.05]}>
          <cylinderGeometry args={[1.5, 0.1, 2.8, 24, 1, true, 0, Math.PI * 0.7]} />
          <meshPhysicalMaterial color="#ffffff" roughness={0.3} transmission={0.5} thickness={0.1} transparent opacity={0.7} side={THREE.DoubleSide} />
        </mesh>
        {/* Inner Back Right: height 2.9, center Y = 0.45 */}
        <mesh castShadow receiveShadow position={[0, 0.45, 0]} rotation={[-0.02, Math.PI * 1.4, -0.05]}>
          <cylinderGeometry args={[1.4, 0.1, 2.9, 24, 1, true, 0, Math.PI * 0.7]} />
          <meshPhysicalMaterial color="#ffffff" roughness={0.3} transmission={0.5} thickness={0.1} transparent opacity={0.7} side={THREE.DoubleSide} />
        </mesh>
        {/* Inner Front: height 1.8, center Y = -0.1 */}
        <mesh castShadow receiveShadow position={[0, -0.1, 0]} rotation={[0.05, Math.PI * 0.2, 0]}>
          <cylinderGeometry args={[1.3, 0.1, 1.8, 24, 1, true, 0, Math.PI * 0.6]} />
          <meshPhysicalMaterial color="#ffffff" roughness={0.3} transmission={0.5} thickness={0.1} transparent opacity={0.7} side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* OUTER LAYER: Stiff overlapping premium paper sheets */}
      <group position={[0, 0, 0]}>
        {/* Outer Back Left: height 2.7, center Y = 0.35 */}
        <mesh castShadow receiveShadow position={[0, 0.35, 0]} rotation={[-0.1, Math.PI * 1.0, 0.05]}>
          <cylinderGeometry args={[1.8, 0.12, 2.7, 32, 1, true, 0, Math.PI * 0.6]} />
          <meshPhysicalMaterial {...matProps} side={THREE.DoubleSide} />
        </mesh>
        
        {/* Outer Back Right: height 2.6, center Y = 0.3 */}
        <mesh castShadow receiveShadow position={[0, 0.3, 0]} rotation={[-0.05, Math.PI * 1.4, -0.05]}>
          <cylinderGeometry args={[1.9, 0.13, 2.6, 32, 1, true, 0, Math.PI * 0.6]} />
          <meshPhysicalMaterial {...matProps} side={THREE.DoubleSide} />
        </mesh>

        {/* Outer Left Side: height 2.2, center Y = 0.1 */}
        <mesh castShadow receiveShadow position={[0, 0.1, 0]} rotation={[0, Math.PI * 0.6, 0.1]}>
          <cylinderGeometry args={[1.6, 0.14, 2.2, 32, 1, true, 0, Math.PI * 0.5]} />
          <meshPhysicalMaterial {...matProps} side={THREE.DoubleSide} />
        </mesh>

        {/* Outer Right Side: height 2.1, center Y = 0.05 */}
        <mesh castShadow receiveShadow position={[0, 0.05, 0]} rotation={[0, Math.PI * 1.9, -0.1]}>
          <cylinderGeometry args={[1.6, 0.14, 2.1, 32, 1, true, 0, Math.PI * 0.5]} />
          <meshPhysicalMaterial {...matProps} side={THREE.DoubleSide} />
        </mesh>

        {/* Outer Front Fold: height 1.5, center Y = -0.25 */}
        <mesh castShadow receiveShadow position={[0, -0.25, 0]} rotation={[0.15, Math.PI * 0.25, 0]}>
          <cylinderGeometry args={[1.4, 0.15, 1.5, 32, 1, true, 0, Math.PI * 0.5]} />
          <meshPhysicalMaterial {...matProps} side={THREE.DoubleSide} />
        </mesh>
      </group>
      <mesh castShadow receiveShadow position={[0, -1.4, 0]}>
        <cylinderGeometry args={[0.15, 0.4, 0.8, 32, 1, true]} />
        <meshPhysicalMaterial {...matProps} side={THREE.DoubleSide} />
      </mesh>


      {/* 5. Beautiful cascading silk ribbon at the cinch point */}
      <group position={[0, -1.0, 0]} rotation={[0.1, 0, 0]}>
        {/* The main knotted ring */}
        <mesh castShadow receiveShadow>
          <torusGeometry args={[0.22, 0.05, 32, 64]} />
          <meshPhysicalMaterial 
            color="#d4af37" 
            roughness={0.25} 
            metalness={0.4} 
            clearcoat={1.0}
            clearcoatRoughness={0.15}
          />
        </mesh>

        {/* Left cascading ribbon tail */}
        <mesh castShadow receiveShadow position={[-0.1, -0.4, 0.18]} rotation={[0, 0, 0.15]}>
          <planeGeometry args={[0.08, 0.9]} />
          <meshPhysicalMaterial 
            color="#d4af37" 
            roughness={0.25} 
            metalness={0.4} 
            side={THREE.DoubleSide} 
            clearcoat={1.0}
          />
        </mesh>

        {/* Right cascading ribbon tail (slightly longer for realism) */}
        <mesh castShadow receiveShadow position={[0.1, -0.5, 0.2]} rotation={[0, 0, -0.1]}>
          <planeGeometry args={[0.08, 1.1]} />
          <meshPhysicalMaterial 
            color="#d4af37" 
            roughness={0.25} 
            metalness={0.4} 
            side={THREE.DoubleSide} 
            clearcoat={1.0}
          />
        </mesh>
      </group>
    </a.group>
  );
}
