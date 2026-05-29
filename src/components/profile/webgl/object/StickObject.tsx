import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import { usePlayerStore } from "@/components/profile/store/usePlayerStore";

const BASE = [Math.PI / 2, 0.8, 29.8] as const;
const SPIN_SPEED = Math.PI * 4; // 2회전/초

export const StickObject = () => {
  const animation = usePlayerStore((s) => s.animation);
  const meshRef = useRef<THREE.Mesh>(null);
  const spinY = useRef(0);
  const currentX = useRef(BASE[0]);

  useFrame((_, delta) => {
    const mesh = meshRef.current;
    if (!mesh) return;

    if (animation === "brush01") {
      currentX.current += (0 - currentX.current) * Math.min(1, delta * 8);
      spinY.current += delta * SPIN_SPEED;
    } else {
      currentX.current += (BASE[0] - currentX.current) * Math.min(1, delta * 7);
      spinY.current *= Math.max(0, 1 - delta * 7);
    }

    mesh.rotation.set(currentX.current, BASE[1] + spinY.current, BASE[2]);
  });

  return (
    <mesh
      position={[0, 1, 0]}
      ref={meshRef}
      rotation={[BASE[0], BASE[1], BASE[2]]}
    >
      <cylinderGeometry args={[0.44, 0.32, 14, 10]} />
      <meshToonMaterial color="#111111" />
    </mesh>
  );
};
