import React, { useEffect, useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { GLTF } from "three-stdlib";

export const AIRPLANE_MODEL_PATH = "/assets/models/paper_airplane.glb";

export type AirplaneGLTF = GLTF & {
  nodes: { Object_4: THREE.Mesh };
  materials: { "Scene_-_Root": THREE.MeshStandardMaterial };
};

export type PaperAirplaneProps = React.JSX.IntrinsicElements["group"] & {
  color?: string;
};

export function PaperAirplane({
  color = "#ffffff",
  ...props
}: PaperAirplaneProps) {
  const { nodes } = useGLTF(AIRPLANE_MODEL_PATH) as unknown as AirplaneGLTF;

  const mat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.8,
      }),
    [color]
  );

  useEffect(() => () => mat.dispose(), [mat]);

  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Object_4.geometry} material={mat} />
    </group>
  );
}

useGLTF.preload(AIRPLANE_MODEL_PATH);
