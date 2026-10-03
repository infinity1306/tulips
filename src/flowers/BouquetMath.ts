import * as THREE from 'three';

const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5)); // ~2.399963

export function getBouquetTarget(index: number, total: number) {
  if (total <= 1) {
    return {
      position: [0, 0.5, 0] as [number, number, number],
      rotation: [0, 0, 0] as [number, number, number]
    };
  }

  // Fibonacci spiral on a hemisphere
  const theta = GOLDEN_ANGLE * index;
  // y goes from 1.0 (top center) down to 0.2 (edge)
  const y = 1 - (index / Math.max(1, total - 1)) * 0.8; 
  const radiusAtY = Math.sqrt(1 - y * y);
  
  // Adjusted radius to find the perfect sweet spot (not too close, not too far)
  const bouquetRadius = 0.42 + Math.pow(total, 0.42) * 0.15;
  
  const px = Math.cos(theta) * radiusAtY * bouquetRadius;
  let py = (y * bouquetRadius) + 0.7; // Lowered slightly so they sit nicely in the paper
  const pz = Math.sin(theta) * radiusAtY * bouquetRadius;
  
  // PREMIUM FLORIST TWEAK: 
  // Real bouquets are tiered! Flowers in the back (-z) are taller, flowers in front (+z) are lower.
  py -= pz * 0.8; 
  // Also push everything slightly forward and up so it sits nicely in the wrapper
  py += 0.2;

  const position: [number, number, number] = [px, py, pz];

  // Rotate flower so its stem (-Y) points to a "grip" point deep inside the wrap
  const dummy = new THREE.Object3D();
  const grip = new THREE.Vector3(0, -1.2, 0);
  const head = new THREE.Vector3(px, py, pz);
  const direction = new THREE.Vector3().subVectors(head, grip).normalize();
  
  const defaultUp = new THREE.Vector3(0, 1, 0);
  const quaternion = new THREE.Quaternion().setFromUnitVectors(defaultUp, direction);
  dummy.quaternion.copy(quaternion);

  // Add slight rotational variance around its own Y axis for organic look
  dummy.rotateY(index * Math.PI * 0.6);

  const rotation: [number, number, number] = [
    dummy.rotation.x,
    dummy.rotation.y,
    dummy.rotation.z
  ];

  return { position, rotation };
}
