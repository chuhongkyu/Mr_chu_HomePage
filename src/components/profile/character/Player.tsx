import * as THREE from "three";
import React, { Suspense, useEffect, useMemo, useRef } from "react";
import { useGraph } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import { SkeletonUtils } from "three-stdlib";
import { usePlayerStore } from "@/components/profile/store/usePlayerStore";
import { SLIDE_CONFIGS } from "@/components/profile/constants/slideConfig";
import { LightningRing } from "@/components/profile/common/LightningRing";
import { JumpTrailEffect } from "@/components/profile/common/JumpTrailEffect";

type ActionName = "angry" | "idle" | "jump" | "t-pose";

const LOOP_ONCE: Partial<Record<ActionName, true>> = { jump: true };

interface GLTFAction extends THREE.AnimationClip {
  name: ActionName;
}

type StickmanNodes = {
  nodes: {
    mesh_head: THREE.SkinnedMesh;
    mesh_spine: THREE.SkinnedMesh;
    mesh_calfL: THREE.SkinnedMesh;
    mesh_calfR: THREE.SkinnedMesh;
    mesh_forearmL: THREE.SkinnedMesh;
    mesh_forearmR: THREE.SkinnedMesh;
    mesh_thighL: THREE.SkinnedMesh;
    mesh_thighR: THREE.SkinnedMesh;
    mesh_upperarmL: THREE.SkinnedMesh;
    mesh_upperarmR: THREE.SkinnedMesh;
    thighR001: THREE.Bone;
    thighL001: THREE.Bone;
    forearmL001: THREE.Bone;
    forearmR001?: THREE.Bone;
    spine001: THREE.Bone;
    calfR001: THREE.Bone;
    calfL001: THREE.Bone;
  };
  materials: Record<string, THREE.Material>;
};

const MODEL_PATH = "/assets/models/stickman-draco.glb";

const MESH_NAMES = [
  "mesh_head",
  "mesh_spine",
  "mesh_calfL",
  "mesh_calfR",
  "mesh_forearmL",
  "mesh_forearmR",
  "mesh_thighL",
  "mesh_thighR",
  "mesh_upperarmL",
  "mesh_upperarmR",
] as const;

const outlineVertexShader = /* glsl */ `
  #include <common>
  #include <skinning_pars_vertex>
  uniform float outlineWidth;

  void main() {
    vec3 objectNormal = normal;
    vec3 transformed = position;

    #include <skinbase_vertex>
    #include <skinnormal_vertex>
    #include <skinning_vertex>

    vec4 worldPos = modelMatrix * vec4(transformed, 1.0);
    vec3 worldNormal = normalize(mat3(modelMatrix) * objectNormal);
    worldPos.xyz += worldNormal * outlineWidth;

    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`;

const outlineFragmentShader = /* glsl */ `
  void main() {
    gl_FragColor = vec4(0.08, 0.08, 0.08, 1.0);
  }
`;

type Props = {
  position?: [number, number, number];
};

export const Player = ({ position }: Props) => {
  const group = React.useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF(MODEL_PATH);
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes } = useGraph(clone) as unknown as StickmanNodes;
  const { actions, mixer } = useAnimations(animations, group);
  const slideIndex = usePlayerStore((s) => s.slideIndex);
  const animation = usePlayerStore((s) => s.animation);
  const setAnimation = usePlayerStore((s) => s.setAnimation);

  const toonMaterial = useMemo(
    () => new THREE.MeshToonMaterial({ color: new THREE.Color("#f5f0eb") }),
    []
  );

  const outlineMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: outlineVertexShader,
        fragmentShader: outlineFragmentShader,
        uniforms: {
          outlineWidth: { value: 0.05 },
        },
        side: THREE.BackSide,
      }),
    []
  );

  const animationRef = useRef(animation);
  useEffect(() => {
    animationRef.current = animation;
  }, [animation]);

  useEffect(() => {
    if (!actions[animation]) return;
    const current = actions[animation]!;

    if (LOOP_ONCE[animation]) {
      current.setLoop(THREE.LoopOnce, 1);
      current.clampWhenFinished = true;
    } else {
      current.setLoop(THREE.LoopRepeat, Infinity);
      current.clampWhenFinished = false;
    }

    current.reset().fadeIn(0.3).play();
    return () => {
      current.fadeOut(0.3);
    };
  }, [actions, animation]);

  useEffect(() => {
    const onFinished = (e: THREE.Event) => {
      const finished = (e as THREE.Event & { action: THREE.AnimationAction })
        .action;
      const clipName = finished.getClip().name as ActionName;
      // animationRef로 현재 state 확인 - jump fadeOut 중 "angry"로 이미 전환됐으면 idle로 덮어쓰지 않음
      if (LOOP_ONCE[clipName] && animationRef.current === clipName) {
        setAnimation("idle");
      }
    };
    mixer.addEventListener("finished", onFinished);
    return () => mixer.removeEventListener("finished", onFinished);
  }, [mixer, setAnimation]);

  const slideEffects = SLIDE_CONFIGS[slideIndex]?.effects ?? [];
  const isAngry = animation === "angry";

  return (
    <>
      <Suspense fallback={null}>
        {slideEffects.map((effect) => {
          if (effect.type === "lightning") {
            const bone = nodes[effect.boneKey] as THREE.Bone | undefined;
            if (!bone) return null;
            return (
              <LightningRing
                key={`lightning-${effect.boneKey}`}
                bone={bone}
                radius={effect.radius}
                color={effect.color}
                visible={isAngry}
              />
            );
          }

          if (effect.type === "jumpTrail") {
            return (
              <JumpTrailEffect
                key={`jumpTrail-${effect.boneKey}`}
                playerPosition={position}
                color={effect.color}
              />
            );
          }

          return null;
        })}
      </Suspense>
      <group position={position} dispose={null}>
        <group ref={group}>
          <group scale={0.02} rotation={[0, Math.PI / 2, 0]} name="Scene">
            <group name="Stickman_CTRL">
              <primitive object={nodes.thighR001} />
              <primitive object={nodes.thighL001} />
              <primitive object={nodes.forearmL001} />
              <primitive object={nodes.spine001} />
              <primitive object={nodes.calfR001} />
              <primitive object={nodes.calfL001} />
            </group>
            {MESH_NAMES.map((name) => (
              <React.Fragment key={name}>
                <skinnedMesh
                  receiveShadow
                  name={name}
                  geometry={nodes[name].geometry}
                  material={toonMaterial}
                  skeleton={nodes[name].skeleton}
                />
                <skinnedMesh
                  name={`${name}_outline`}
                  geometry={nodes[name].geometry}
                  material={outlineMaterial}
                  skeleton={nodes[name].skeleton}
                />
              </React.Fragment>
            ))}
          </group>
        </group>
      </group>
    </>
  );
};

useGLTF.preload(MODEL_PATH);
