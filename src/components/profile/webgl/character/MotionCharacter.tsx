import React, { Suspense, useEffect, useMemo, useRef } from "react";
import { useAnimations, useGLTF } from "@react-three/drei";
import { useGraph } from "@react-three/fiber";
import * as THREE from "three";
import { SkeletonUtils } from "three-stdlib";

import { MOTION_EFFECTS } from "@/components/profile/constants/motionEffects";
import { STICKMAN_MODEL_PATH } from "@/components/profile/constants/stickman";
import { JumpTrailEffect } from "@/components/profile/webgl/common/JumpTrailEffect";
import { LightningRing } from "@/components/profile/webgl/common/LightningRing";
import { BrushStick } from "@/components/profile/webgl/object/BrushStick";
import outlineFragmentShader from "@/shaders/outline.frag.glsl";
import outlineVertexShader from "@/shaders/outlineSkinned.vert.glsl";

/**
 * 버튼으로 재생할 클립. 순서가 곧 버튼 순서다.
 * GLB 에는 `t-pose` 도 있지만 리깅 기준 자세라 동작이 아니어서 뺐다.
 */
export const MOTIONS = [
  "idle",
  "running",
  "jump",
  "thinking",
  "angry",
  "brush",
  "brush01",
] as const;

export type MotionName = (typeof MOTIONS)[number];

/** 한 번만 재생하고 멈춘 뒤 idle 로 돌아오는 클립. */
const PLAY_ONCE: Partial<Record<MotionName, true>> = {
  jump: true,
  brush01: true,
};

const FADE = 0.3;

/** 클립 원본이 느린 것만 올린다. 적지 않으면 1배속. */
const CLIP_SPEED: Partial<Record<MotionName, number>> = {
  running: 2,
};

/**
 * 바닥 이펙트가 만들어질 때 기준으로 삼은 캐릭터 스케일.
 * `JumpTrailEffect` 의 원 반지름·스파크 길이가 이 크기의 캐릭터(키 약 3.9)에
 * 맞춰 월드 단위로 적혀 있다.
 */
const EFFECT_REFERENCE_SCALE = 0.02;

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

type StickmanNodes = {
  nodes: Record<string, THREE.SkinnedMesh & THREE.Bone>;
};

export type MotionCharacterProps = {
  /** 재생할 클립. */
  motion: MotionName;
  /** 한 번만 재생하는 클립이 끝났을 때. 보통 idle 로 되돌린다. */
  onMotionEnd?: () => void;
  color?: THREE.ColorRepresentation;
  position?: [number, number, number];
  scale?: number;
  /**
   * 외곽선 두께. 화면 세로 기준 NDC 값이라 모델 스케일과 무관하다.
   * 캐릭터가 화면에서 작아지면 상대적으로 두꺼워 보이므로 같이 줄인다.
   */
  outlineWidth?: number;
  /** 동작에 딸린 이펙트를 함께 그릴지. */
  effects?: boolean;
};

/**
 * 모션 쇼케이스용 캐릭터.
 *
 * 같은 모델을 쓰는 `character/Player` 는 슬라이드 스토어와 포스트 설정에
 * 묶여 있어서 밖에서 클립을 지정할 수 없다. 여기서는 `motion` prop 하나로만
 * 움직이도록 떼어냈다.
 *
 * 아웃라인은 back-face ShaderMaterial 이다. postprocessing 의 Outline 은
 * 스키닝된 메시에서 뼈 변형을 따라가지 못한다.
 */
export const MotionCharacter = ({
  motion,
  onMotionEnd,
  color = "#f5f0eb",
  position = [0, 0, 0],
  scale = 0.02,
  outlineWidth = 0.005,
  effects = true,
}: MotionCharacterProps) => {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF(STICKMAN_MODEL_PATH);

  // 같은 GLB 를 여러 곳에서 쓸 수 있으므로 스켈레톤째 복제한다.
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes } = useGraph(clone) as unknown as StickmanNodes;
  const { actions, mixer } = useAnimations(animations, group);

  const toonMaterial = useMemo(
    () => new THREE.MeshToonMaterial({ color: new THREE.Color(color) }),
    [color]
  );

  const outlineMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: outlineVertexShader,
        fragmentShader: outlineFragmentShader,
        uniforms: { outlineWidth: { value: outlineWidth } },
        side: THREE.BackSide,
      }),
    [outlineWidth]
  );

  useEffect(() => {
    const action = actions[motion];
    if (!action) return;

    if (PLAY_ONCE[motion]) {
      action.setLoop(THREE.LoopOnce, 1);
      action.clampWhenFinished = true;
    } else {
      action.setLoop(THREE.LoopRepeat, Infinity);
      action.clampWhenFinished = false;
    }

    action.reset().fadeIn(FADE).play();
    return () => {
      action.fadeOut(FADE);
    };
  }, [actions, motion]);

  // 위 효과 뒤에 걸어야 한다. `reset()` 이 배속을 1 로 되돌리기 때문이다.
  useEffect(() => {
    const action = actions[motion];
    if (action) action.timeScale = CLIP_SPEED[motion] ?? 1;
  }, [actions, motion]);

  // 현재 클립을 ref 로 들고 있는다. fadeOut 중에 다른 클립으로 바뀌었으면
  // 끝난 클립의 콜백이 새 상태를 덮어쓰면 안 된다.
  const motionRef = useRef(motion);
  useEffect(() => {
    motionRef.current = motion;
  }, [motion]);

  useEffect(() => {
    if (!onMotionEnd) return;

    const onFinished = (event: THREE.Event) => {
      const action = (event as THREE.Event & { action: THREE.AnimationAction })
        .action;
      const clip = action.getClip().name as MotionName;
      if (PLAY_ONCE[clip] && motionRef.current === clip) onMotionEnd();
    };

    mixer.addEventListener("finished", onFinished);
    return () => mixer.removeEventListener("finished", onFinished);
  }, [mixer, onMotionEnd]);

  useEffect(() => {
    return () => {
      toonMaterial.dispose();
      outlineMaterial.dispose();
    };
  }, [toonMaterial, outlineMaterial]);

  // 이펙트는 뼈에 붙거나 바닥에 떨어진다. 어떤 동작에 무엇이 붙는지는
  // constants/motionEffects 한 곳에만 적혀 있다.
  const motionEffects = effects ? (MOTION_EFFECTS[motion] ?? []) : [];

  // 뼈에 붙는 이펙트(번개·붓)는 뼈의 월드 스케일을 타고 알아서 커진다.
  // 바닥 이펙트만 월드 단위로 짜여 있어서 캐릭터 크기에 맞춰 줘야 한다.
  const effectScale = scale / EFFECT_REFERENCE_SCALE;

  return (
    <group position={position} dispose={null}>
      {/* 이펙트만의 경계. 안에서 무언가 로딩을 시작해도 바깥 씬은 그대로 있는다.
          경계가 없으면 씬 전체가 fallback 으로 바뀌었다 돌아오며 깜빡인다. */}
      <Suspense fallback={null}>
        {motionEffects.map((effect, index) => {
          if (effect.type === "lightning") {
            const bone = nodes[effect.bone];
            if (!bone) return null;
            return (
              <LightningRing
                key={`lightning-${effect.bone}-${index}`}
                bone={bone}
                radius={effect.radius}
                color={effect.color}
              />
            );
          }

          if (effect.type === "jumpTrail") {
            return (
              // 이 그룹 자체가 이미 `position` 만큼 옮겨져 있다.
              // 여기에 playerPosition 까지 주면 두 번 이동해 엉뚱한 데서 터진다.
              // 로컬 원점(= 캐릭터 발밑)이 곧 착지 지점이다.
              <group key={`jumpTrail-${index}`} scale={effectScale}>
                <JumpTrailEffect color={effect.color} active />
              </group>
            );
          }

          // 붓은 오른손 뼈에 들린다. 리그에 따라 이름이 다를 수 있어 둘 다 본다.
          const handBone = nodes.forearmR004 ?? nodes.forearmR001;
          if (!handBone) return null;
          return <BrushStick key={`brush-${index}`} handBone={handBone} />;
        })}
      </Suspense>

      <group ref={group}>
        <group scale={scale}>
          <group>
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
                renderOrder={0}
                geometry={nodes[name].geometry}
                material={outlineMaterial}
                skeleton={nodes[name].skeleton}
              />
              <skinnedMesh
                renderOrder={1}
                receiveShadow
                geometry={nodes[name].geometry}
                material={toonMaterial}
                skeleton={nodes[name].skeleton}
              />
            </React.Fragment>
          ))}
        </group>
      </group>
    </group>
  );
};

useGLTF.preload(STICKMAN_MODEL_PATH);

export default MotionCharacter;
