import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { a, useSpring } from '@react-spring/three';
import { useTexture, TransformControls } from '@react-three/drei';
import * as THREE from 'three';
import type { FlowerData } from '@/store/useFlowerStore';
import { useFlowerStore } from '@/store/useFlowerStore';
import { FlowerRegistry } from './FlowerRegistry';
import { getBouquetTarget } from './BouquetMath';

interface BaseFlowerProps {
  data: FlowerData;
  index: number;
  total: number;
}

const materialCache: Record<string, THREE.MeshPhysicalMaterial> = {};

function getMaterial(texture: THREE.Texture) {
  if (!materialCache[texture.uuid]) {
    const mat = new THREE.MeshPhysicalMaterial({
      map: texture,
      transparent: false,
      side: THREE.DoubleSide,
      roughness: 0.4,
    });
    mat.onBeforeCompile = (shader) => {
      shader.fragmentShader = shader.fragmentShader.replace(
        '#include <map_fragment>',
        `
        #include <map_fragment>
        if (diffuseColor.r < 0.08 && diffuseColor.g < 0.08 && diffuseColor.b < 0.08) {
          discard;
        }
        `
      );
    };
    materialCache[texture.uuid] = mat;
  }
  return materialCache[texture.uuid];
}

export function BaseFlower({ data, index, total }: BaseFlowerProps) {
  useThree();
  const isBouquetMode = useFlowerStore(state => state.isBouquetMode);
  
  const isSelected = useFlowerStore(state => state.selectedFlowerId) === data.id;
  const controlMode = useFlowerStore(state => state.controlMode);
  const setSelectedFlowerId = useFlowerStore(state => state.setSelectedFlowerId);
  const updateFlowerData = useFlowerStore(state => state.updateFlowerData);

  const groupRef = useRef<THREE.Group>(null!);
  const timeRef = useRef(0);
  const assetPath = FlowerRegistry[data.type];
  const texture = useTexture(assetPath);
  texture.colorSpace = THREE.SRGBColorSpace;

  const bouquetTarget = useMemo(() => {
    return getBouquetTarget(index, total);
  }, [index, total]);

  const targetPosition = isBouquetMode ? bouquetTarget.position : data.position;
  const targetRotation = isBouquetMode ? bouquetTarget.rotation : data.rotation;

  const { position, scale, rotation } = useSpring({
    position: targetPosition,
    rotation: targetRotation,
    scale: data.scale,
    immediate: isSelected && !isBouquetMode,
    config: { mass: 1.5, tension: 100, friction: 20 }
  });

  useFrame((_state, delta) => {
    if (groupRef.current && !isBouquetMode && !isSelected) {
      timeRef.current += delta;
      const t = timeRef.current;
      const offset = parseInt(data.id.substring(0, 4), 16);
      groupRef.current.rotation.z = targetRotation[2] + Math.sin(t + offset) * 0.03;
      groupRef.current.rotation.x = targetRotation[0] + Math.sin(t * 0.8 + offset) * 0.03;
    }
  });

  return (
    <>
      {isSelected && !isBouquetMode && (
        <TransformControls
          object={groupRef}
          mode={controlMode}
          onMouseUp={() => {
            if (groupRef.current) {
              updateFlowerData(data.id, {
                position: groupRef.current.position.toArray() as [number, number, number],
                rotation: [
                  groupRef.current.rotation.x,
                  groupRef.current.rotation.y,
                  groupRef.current.rotation.z
                ],
                scale: groupRef.current.scale.x
              });
            }
          }}
        />
      )}
      <a.group
        ref={groupRef}
        // @ts-ignore
        position={position}
        // @ts-ignore
        scale={scale}
        // @ts-ignore
        rotation={rotation}
        onPointerDown={(e) => {
          if (!isBouquetMode) {
            e.stopPropagation();
            setSelectedFlowerId(data.id);
          }
        }}
        onPointerOver={() => !isBouquetMode && (document.body.style.cursor = 'pointer')}
        onPointerOut={() => !isBouquetMode && (document.body.style.cursor = 'auto')}
      >
        <mesh material={getMaterial(texture)}>
          <planeGeometry args={[2, 2]} />
        </mesh>
        
        <mesh rotation={[0, Math.PI / 2, 0]} material={getMaterial(texture)}>
          <planeGeometry args={[2, 2]} />
        </mesh>
      </a.group>
    </>
  );
}

Object.values(FlowerRegistry).forEach(path => {
  useTexture.preload(path);
});
