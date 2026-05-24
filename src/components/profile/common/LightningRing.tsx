import { useEffect, useMemo, useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";

export type LightningRingProps = {
  bone: THREE.Bone;
  visible?: boolean;
  radius?: number;
  color?: THREE.ColorRepresentation;
};

export const LightningRing = ({
  bone,
  visible = true,
  radius = 0.15,
  color = "#ff5500",
}: LightningRingProps) => {
  const groupRef = useRef<THREE.Group>(null);

  // 생성한 glow sprite png
  const texture = useLoader(THREE.TextureLoader, "/assets/textures/glow.png");

  useEffect(() => {
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.colorSpace = THREE.SRGBColorSpace;
  }, [texture]);

  const material = useMemo(() => {
    return new THREE.SpriteMaterial({
      map: texture,
      color,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
  }, [texture, color]);

  useFrame(({ clock }) => {
    if (!visible || !groupRef.current) return;

    const t = clock.elapsedTime;

    bone.updateWorldMatrix(true, false);

    groupRef.current.position.setFromMatrixPosition(bone.matrixWorld);

    groupRef.current.rotation.x += 0.01;
    groupRef.current.rotation.y += 0.015;
    groupRef.current.rotation.z += 0.02;

    const s = 1 + Math.sin(t * 6) * 0.08;

    groupRef.current.scale.setScalar(s);
  });

  return (
    <group ref={groupRef} visible={visible}>
      {/* 메인 glow */}
      <sprite material={material} scale={[radius * 4, radius * 4, 1]} />

      {/* 바깥 glow */}
      <sprite material={material} scale={[radius * 6, radius * 6, 1]} />

      {/* 회전 링 */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius * 1.8, 0.01, 8, 32]} />

        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* 반대 회전 링 */}
      <mesh rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[radius * 2.3, 0.008, 8, 32]} />

        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.5}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
};
