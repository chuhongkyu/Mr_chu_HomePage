/*
 * 원본: npx gltfjsx@6.5.3 apart_draco.glb -t
 * 생성 코드에서 경로·타입·스케일 규약만 이 저장소에 맞게 손봤다.
 */
import React from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { GLTF } from "three-stdlib";

export const APARTMENT_MODEL_PATH = "/assets/models/apart_draco.glb";

/** 모델 자연 높이. bbox 는 1.738 × 1.903 × 1.203 이고 원점이 중심이다. */
export const APARTMENT_MODEL_HEIGHT = 1.903;

/**
 * 머티리얼에 이름이 없어서 gltfjsx 의 `materials` 는 빈 객체다.
 * 메시에 붙어 있는 걸 그대로 쓴다.
 */
type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.Mesh;
  };
};

export type ApartmentProps = React.JSX.IntrinsicElements["group"] & {
  /** 월드 기준 건물 높이. 바닥이 y=0 에 오도록 알아서 띄운다. */
  height?: number;
};

/**
 * 당근 경험 씬의 아파트.
 *
 * 2.1MB 짜리라 첫 로딩에서 체감된다. Scene 의 Suspense 안에서 쓴다.
 */
export const Apartment = ({ height = 10, ...props }: ApartmentProps) => {
  const { nodes } = useGLTF(APARTMENT_MODEL_PATH) as unknown as GLTFResult;
  const scale = height / APARTMENT_MODEL_HEIGHT;

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.mesh_0.geometry}
        material={nodes.mesh_0.material}
        scale={scale}
        position={[0, height / 2, 0]}
      />
    </group>
  );
};

useGLTF.preload(APARTMENT_MODEL_PATH);

export default Apartment;
