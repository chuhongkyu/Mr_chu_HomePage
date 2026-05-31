import React, { Suspense, useEffect, useMemo, useRef } from "react";
import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame, useGraph } from "@react-three/fiber";
import * as THREE from "three";
import { SkeletonUtils } from "three-stdlib";

import {
  getSlideConfig,
  PlayerAnimation,
} from "@/components/profile/constants/slideConfig";
import { usePlayerStore } from "@/components/profile/store/usePlayerStore";
import { usePostViewStore } from "@/components/profile/store/usePostViewStore";
import { JumpTrailEffect } from "@/components/profile/webgl/common/JumpTrailEffect";
import { LightningRing } from "@/components/profile/webgl/common/LightningRing";
import { BrushStick } from "@/components/profile/webgl/object/BrushStick";
import { HatOnHead } from "@/components/profile/webgl/object/HatOnHead";

export type ActionName = PlayerAnimation;

const LOOP_ONCE: Partial<Record<ActionName, true>> = {
  jump: true,
  brush01: true,
};
const LOOP_ONCE_RETURN: Partial<Record<ActionName, ActionName>> = {
  jump: "idle",
  brush01: "brush",
};

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
    forearmR004?: THREE.Bone;
    spine001: THREE.Bone;
    calfR001: THREE.Bone;
    calfL001: THREE.Bone;
    head: THREE.Bone;
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

import outlineFragmentShader from "@/shaders/outline.frag.glsl";
import outlineVertexShader from "@/shaders/outlineSkinned.vert.glsl";

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
  const currentPostId = usePlayerStore((s) => s.currentPostId);
  const animation = usePlayerStore((s) => s.animation);
  const setAnimation = usePlayerStore((s) => s.setAnimation);
  const viewed = usePostViewStore((s) => s.viewed);
  const currentSlide = getSlideConfig(currentPostId);
  const showHat =
    currentSlide?.reward === "hat" &&
    !!currentSlide.postId &&
    (viewed[currentSlide.postId] ?? false);

  const DEFAULT_CHAR_COLOR = "#f5f0eb";
  const DEFAULT_EMISSIVE = "#000000";

  const toonMaterial = useMemo(() => {
    const config = getSlideConfig(usePlayerStore.getState().currentPostId);
    const initialColor = config?.characterColor ?? DEFAULT_CHAR_COLOR;
    const initialEmissive = config?.characterEmissive ?? DEFAULT_EMISSIVE;
    return new THREE.MeshToonMaterial({
      color: new THREE.Color(initialColor),
      emissive: new THREE.Color(initialEmissive),
    });
  }, []);

  const targetCharColor = useRef(
    new THREE.Color(
      getSlideConfig(usePlayerStore.getState().currentPostId)?.characterColor ??
        DEFAULT_CHAR_COLOR
    )
  );
  const targetEmissive = useRef(
    new THREE.Color(
      getSlideConfig(usePlayerStore.getState().currentPostId)?.characterEmissive ??
        DEFAULT_EMISSIVE
    )
  );

  useEffect(() => {
    const config = getSlideConfig(currentPostId);
    targetCharColor.current.set(config?.characterColor ?? DEFAULT_CHAR_COLOR);
    targetEmissive.current.set(config?.characterEmissive ?? DEFAULT_EMISSIVE);
  }, [currentPostId]);

  useFrame((_, delta) => {
    toonMaterial.color.lerp(targetCharColor.current, 0.06);
    toonMaterial.emissive.lerp(targetEmissive.current, 0.06);
  });

  const outlineMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: outlineVertexShader,
        fragmentShader: outlineFragmentShader,
        uniforms: {
          outlineWidth: { value: 0.007 },
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
    if (animation !== "brush") return;
    const id = setTimeout(() => setAnimation("brush01"), 5000);
    return () => clearTimeout(id);
  }, [animation, setAnimation]);

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
        setAnimation(LOOP_ONCE_RETURN[clipName] ?? "idle");
      }
    };
    mixer.addEventListener("finished", onFinished);
    return () => mixer.removeEventListener("finished", onFinished);
  }, [mixer, setAnimation]);

  const slideEffects = getSlideConfig(currentPostId)?.effects ?? [];
  const isAngry = animation === "angry";
  const isBrush = animation === "brush" || animation === "brush01";
  const handBoneR = nodes.forearmR004;

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
              {showHat && nodes.head && (
                <HatOnHead headBone={nodes.head} hatName="tophat" />
              )}
              {isBrush && handBoneR && <BrushStick handBone={handBoneR} />}
            </group>
            {MESH_NAMES.map((name) => (
              <React.Fragment key={name}>
                <skinnedMesh
                  renderOrder={0}
                  name={`${name}_outline`}
                  geometry={nodes[name].geometry}
                  material={outlineMaterial}
                  skeleton={nodes[name].skeleton}
                />
                <skinnedMesh
                  renderOrder={1}
                  receiveShadow
                  name={name}
                  geometry={nodes[name].geometry}
                  material={toonMaterial}
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
