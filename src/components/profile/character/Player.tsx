import * as THREE from "three";
import { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import type { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    char1: THREE.SkinnedMesh;
    Hips: THREE.Bone;
  };
  materials: {
    Material_1: THREE.MeshStandardMaterial;
  };
};

const SCALE = 0.024;

type Props = {
  position?: [number, number, number];
};

export const Player = ({ position }: Props) => {
  const group = useRef<THREE.Group>(null);
  const { nodes, materials, animations } = useGLTF(
    "/assets/models/dino_draco.glb"
  ) as unknown as GLTFResult;
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    actions.idle?.play();
  }, [actions]);

  return (
    <group position={position} dispose={null}>
      <group ref={group}>
        <group name="Armature" scale={SCALE}>
          <primitive object={nodes.Hips} />
          <skinnedMesh
            receiveShadow
            castShadow
            geometry={nodes.char1.geometry}
            material={materials.Material_1}
            skeleton={nodes.char1.skeleton}
          />
        </group>
      </group>
    </group>
  );
};

useGLTF.preload("/assets/models/dino_draco.glb");
