import * as THREE from "three";
import React, { useMemo } from "react";
import { useGLTF } from "@react-three/drei";

type GLTFResult = {
  nodes: { Object_2: THREE.Mesh };
  materials: { ["Material.001"]: THREE.MeshStandardMaterial };
};

type ClusterProps = React.JSX.IntrinsicElements["group"] & {
  emissiveColor?: string;
  emissiveIntensity?: number;
};

export function Cluster({
  emissiveColor = "#00aaff",
  emissiveIntensity = 0.8,
  ...props
}: ClusterProps) {
  const { nodes, materials } = useGLTF(
    "/assets/models/cluster_draco.glb"
  ) as unknown as GLTFResult;

  const material = useMemo(() => {
    const mat = materials["Material.001"].clone();
    mat.emissive = new THREE.Color(emissiveColor);
    mat.emissiveIntensity = emissiveIntensity;
    return mat;
  }, [materials, emissiveColor, emissiveIntensity]);

  return (
    <group {...props} dispose={null}>
      <pointLight intensity={1} />
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh
          receiveShadow
          castShadow
          scale={[3, 3, 4]}
          geometry={nodes.Object_2.geometry}
          material={material}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/assets/models/cluster_draco.glb");
