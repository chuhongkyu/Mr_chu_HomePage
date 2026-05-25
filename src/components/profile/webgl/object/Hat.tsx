import React, { useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { GLTF } from "three-stdlib";

import outlineFrag from "@/shaders/outline.frag.glsl";
import outlineVert from "@/shaders/outline.vert.glsl";

export const HAT_MODEL_PATH = "/assets/models/top_hat_draco.glb";

export type GLTFResult = GLTF & {
  nodes: {
    Object_2: THREE.Mesh;
  };
  materials: {
    lambert2SG: THREE.MeshStandardMaterial;
  };
};

export function Hat(props: React.JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF(HAT_MODEL_PATH) as unknown as GLTFResult;

  const outlineMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: outlineVert,
        fragmentShader: outlineFrag,
        uniforms: { outlineWidth: { value: 0.05 } },
        side: THREE.BackSide,
      }),
    []
  );

  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.Object_2.geometry}
        material={materials.lambert2SG}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      <mesh
        geometry={nodes.Object_2.geometry}
        material={outlineMat}
        rotation={[-Math.PI / 2, 0, 0]}
      />
    </group>
  );
}

useGLTF.preload(HAT_MODEL_PATH);
