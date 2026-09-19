/*
 * 원본: npx gltfjsx@6.5.3 seed.glb -t
 * 생성 코드에서 경로·타입·스케일 규약만 이 저장소에 맞게 손봤다.
 */
import React from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { GLTF } from "three-stdlib";

export const SEED_MODEL_PATH = "/assets/models/seed.glb";

/**
 * 모델의 반높이. bbox 는 1.134 × 1.901 × 0.959 이고 원점이 중심이다.
 * `radius` 를 이 값으로 나눠 스케일을 구하면, 중심을 y=radius 에 두었을 때
 * 바닥이 정확히 y=0 에 닿는다.
 */
export const SEED_MODEL_HALF_HEIGHT = 0.951;

type GLTFResult = GLTF & {
  nodes: {
    output_unwrapped: THREE.Mesh;
  };
  materials: {
    BakedMaterial: THREE.MeshStandardMaterial;
  };
};

export type SeedProps = React.JSX.IntrinsicElements["group"] & {
  /**
   * 바닥에서 중심까지의 높이. 즉 모델 높이의 절반.
   * `SeedPlanting` 이 착지 높이·흙 크기를 이 값에서 계산한다.
   */
  radius?: number;
};

/**
 * 씨앗.
 *
 * Blender 에서 구운 텍스처를 그대로 쓰므로 색을 덮어쓰지 않는다.
 * (`BakedMaterial` 에 틴트를 걸면 구워진 명암이 같이 죽는다.)
 */
export const Seed = ({ radius = 0.35, ...props }: SeedProps) => {
  const { nodes, materials } = useGLTF(
    SEED_MODEL_PATH
  ) as unknown as GLTFResult;

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.output_unwrapped.geometry}
        material={materials.BakedMaterial}
      />
    </group>
  );
};

useGLTF.preload(SEED_MODEL_PATH);

export default Seed;
