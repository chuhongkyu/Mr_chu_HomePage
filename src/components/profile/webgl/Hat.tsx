import * as THREE from "three";
import React from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Object_2: THREE.Mesh;
  };
  materials: {
    lambert2SG: THREE.MeshStandardMaterial;
  };
};

export function Hat(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/top_hat_draco.glb") as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.Object_2.geometry}
        material={materials.lambert2SG}
        rotation={[-Math.PI / 2, 0, 0]}
      />
    </group>
  );
}

useGLTF.preload("/top_hat_draco.glb");
