import { useEffect, useRef, useState } from "react";
import { Billboard } from "@react-three/drei";
import { type ThreeEvent, useFrame } from "@react-three/fiber";
import * as THREE from "three";

import {
  DAANGN_COLLIDERS,
  DAANGN_SPAWN,
  DAANGN_SPAWN_WORLD,
} from "@/components/profile/constants/daangnStage";
import { STICKMAN_SCALE } from "@/components/profile/constants/stickman";
import {
  GENAIMO_BAND,
  GENAIMO_WORLD_SCALE,
  smoothstep,
} from "@/components/profile/constants/zoomStages";
import { useMotionStore } from "@/components/profile/store/useMotionStore";
import { useSceneClearStore } from "@/components/profile/store/useSceneClearStore";
import { useCurrentProject } from "@/components/profile/store/useSceneStore";
import {
  MotionCharacter,
  type MotionName,
} from "@/components/profile/webgl/character/MotionCharacter";
import {
  drawLabel,
  type LabelTexture,
} from "@/components/profile/webgl/common/canvasText";
import ExportTrace from "@/components/profile/webgl/object/ExportTrace";
import FlightPath from "@/components/profile/webgl/object/FlightPath";
import { color } from "@/style/tokens.generated";
import { track } from "@/utils/analytics";

/**
 * 캐릭터가 딛는 자리. 당근이네에서 걸어 나오는 지점을 그대로 쓴다.
 * 연출이 이 자리에 포커스를 맞춘 채 끝나므로 씬의 중심도 여기다.
 */
const CHARACTER_POSITION: [number, number, number] = [...DAANGN_SPAWN_WORLD];

/**
 * 만든 모션이 흘러 나가는 곳. 월드 축이 화면에서 대각선으로 간다.
 *   -X 왼쪽 위 · -Z 오른쪽 위 · +Z 왼쪽 아래 · +X 오른쪽 아래
 *
 * 계단처럼 꺾어 올린다. 세로화면에서 화면 가로 반경이 10 남짓이라 옆으로는
 * 더 보낼 데가 없고, 세로는 18 이라 넉넉하다.
 *
 * 색이 둘인 이유는 클리어하면 배경이 하늘색으로 바뀌기 때문이다. 주황과
 * 빨강만 하늘색과 명도가 가까워(2.3:1, 2.8:1) 따로 내렸다.
 */
const PLATFORMS = [
  {
    id: "unity",
    label: "Unity",
    color: "#1F1F1F",
    clearedColor: "#1F1F1F",
    path: [
      [0, 0],
      [-4, 0],
      [-4, -6],
      [-11.5, -6],
    ],
    axes: { handed: "L", x: "+x", y: "+y", z: "-z" },
    delay: 0,
  },
  {
    id: "unreal",
    label: "Unreal",
    color: "#4A4A4A",
    clearedColor: "#4A4A4A",
    path: [
      [0, 0],
      [-4, 0],
      [-4, 0.5],
      [-8.7, 0.5],
    ],
    axes: { handed: "L", x: "-z", y: "+x", z: "+y" },
    delay: 0.5,
  },
  {
    id: "blender",
    label: "Blender",
    // 브랜드색 #E87D0D 는 밝은 배경에서 2.18:1 이라 묻힌다.
    color: "#C25F08",
    clearedColor: "#8F4104",
    path: [
      [0, 0],
      [0, -4],
      [2, -4],
      [2, -7],
      [-1, -7],
      [-1, -10.2],
    ],
    axes: { handed: "R", x: "+x", y: "-z", z: "+y" },
    delay: 1,
  },
  {
    id: "webgl",
    label: "WebGL",
    color: "#1D4ED8",
    clearedColor: "#12347A",
    path: [
      [0, 0],
      [0, -5],
      [-4, -5],
      [-4, -9],
      [-7, -9],
      [-7, -11.7],
    ],
    axes: { handed: "R", x: "+x", y: "+y", z: "+z" },
    delay: 1.5,
  },
  {
    id: "roblox",
    label: "Roblox",
    color: "#6B2FB5",
    clearedColor: "#4C1D95",
    path: [
      [0, 0],
      [0, 5],
      [-1, 5],
      [-1, 8.7],
    ],
    axes: { handed: "R", x: "+x", y: "+y", z: "+z" },
    delay: 2,
  },
] as const;

/**
 * Genaimo / ailive.
 *
 * AI 로 만든 모션을 각 플랫폼으로 뽑아내던 도구라, 그 흐름을 바닥에 깐다.
 *
 * 동작은 버튼으로 고르지 않는다. 씬에 들어서면 한 번 생각하고, 바닥을
 * 누르면 그리로 달린다. 조작이 곧 연출이라 화면에 얹는 UI 가 없다.
 */
/** 동작에 따라 캐릭터 색이 바뀐다. 적지 않은 동작은 기본색. */
const MOTION_COLOR: Partial<Record<MotionName, string>> = {
  running: "#1F1F1F",
  angry: "#D92D20",
  brush: "#FFFFFF",
};

/** `scenes.ts` 의 id 와 같아야 한다. */
const SCENE_ID = "genaimo";

/**
 * 클릭을 받는 바닥. 보이지는 않는다.
 *
 * 한 변이 캐릭터 키(11.57)의 열 배쯤이라 담기는 화면을 넉넉히 덮는다.
 * `visible={false}` 로 끄면 레이캐스트에서도 빠지므로, 재질을 투명하게
 * 두고 깊이에도 쓰지 않는 쪽으로 감춘다.
 */
const GROUND_SIZE = 120;

/** 달리는 속도(로컬 단위/초). 캐릭터 키가 11.57 이니 초당 두 키 남짓이다. */
const RUN_SPEED = 25;

/** 이만큼 남으면 도착으로 친다. 0 으로 두면 목표 위에서 미세하게 떤다. */
const ARRIVE = 0.3;

/** 캐릭터가 차지하는 반경. 발끝이 벽에 박히지 않을 만큼만. */
const BODY_RADIUS = 2;

/** 몇 번째 누름마다 화를 낼지. 나머지는 점프한다. */
const ANGRY_EVERY = 5;

/**
 * 씬 이름표.
 *
 * 자리는 `rig` 안쪽 좌표다(캐릭터와 같은 단위). 크기만 월드 단위라 줌 배수를
 * 되돌린 group 에서 잰다 — 담는 세로가 13 이고 세로 800px 화면에서 1 월드
 * 유닛이 약 62px 이므로 0.68 이 42px 쯤이다. 화면이 커지면 글씨도 같이 커진다.
 */
const LABEL_SIZE = 0.68;
const LABEL_LOCAL: [number, number, number] = [25, 15, -20];

/**
 * 공중에 뜬 낱말 하나.
 *
 * 이 씬에서만 쓰므로 공통으로 빼지 않는다. 판도 테두리도 없이 글자만 있으면
 * 되는 자리라, 유리판을 쓰면 안 보이는 판과 그 뒤 깊이 싸움만 남는다.
 */
const SceneLabel = ({
  text,
  size,
  color: textColor,
}: {
  text: string;
  size: number;
  color: string;
}) => {
  const [label, setLabel] = useState<LabelTexture | null>(null);

  useEffect(() => {
    let alive = true;
    let current: LabelTexture | null = null;

    const paint = () => {
      if (!alive) return;
      const next = drawLabel({ text, color: textColor, size });
      if (!next) return;
      current?.texture.dispose();
      current = next;
      setLabel(next);
    };

    paint();
    // 웹폰트가 늦게 붙으면 첫 그림이 대체 폰트로 나간다.
    document.fonts?.ready.then(paint).catch(() => {});

    return () => {
      alive = false;
      current?.texture.dispose();
    };
  }, [text, textColor, size]);

  if (!label) return null;

  return (
    // 카메라가 기울어 있어서 그냥 세우면 글씨가 비스듬히 눕는다.
    <Billboard>
      <mesh>
        <planeGeometry args={[label.width, label.height]} />
        <meshBasicMaterial
          map={label.texture}
          transparent
          toneMapped={false}
          depthWrite={false}
        />
      </mesh>
    </Billboard>
  );
};

/**
 * 못 들어가는 구역을 `rig` 안쪽 좌표로 옮겨 둔 것. XZ 만 본다 — 바닥을
 * 걷는 캐릭터라 높이로 갈릴 일이 없다.
 *
 * 저장값과 등장 지점이 둘 다 카메라 타겟 기준이라 그 항이 지워지고,
 * 남는 건 등장 지점에서 본 거리다. 그걸 줌 배수로 나누면 로컬이 된다.
 */
const BLOCKERS = DAANGN_COLLIDERS.map(({ position, size }) => ({
  x: (position[0] - DAANGN_SPAWN.position[0]) / GENAIMO_WORLD_SCALE,
  z: (position[2] - DAANGN_SPAWN.position[2]) / GENAIMO_WORLD_SCALE,
  hx: size[0] / 2 / GENAIMO_WORLD_SCALE + BODY_RADIUS,
  hz: size[2] / 2 / GENAIMO_WORLD_SCALE + BODY_RADIUS,
}));

const blocked = (x: number, z: number) =>
  BLOCKERS.some((b) => Math.abs(x - b.x) < b.hx && Math.abs(z - b.z) < b.hz);

/**
 * 종이비행기가 도는 길. 캐릭터 발밑이 원점.
 *
 * 반지름 18 이 상한이다. 기울어진 카메라라 원이 커지면 화면 세로로도 번지는데,
 * 담기는 세로가 36 으로 고정(화면비와 무관)이라 그 이상은 고리 위가 잘린다.
 * 더 키우려면 비행 높이를 낮춰라. 높이 1 당 세로 0.74 가 는다.
 */
const FLIGHT_POINTS = [
  [18, 7, 0],
  [9, 8.5, -15.6],
  [-9, 7.5, -15.6],
  [-18, 9, 0],
  [-9, 8, 15.6],
  [9, 7, 15.6],
] as const;

const TRACE_DELAY = 0.5;
const TRACE_STAGGER = 0.12;

export const GenaimoScene = () => {
  const motion = useMotionStore((s) => s.motion);
  const rest = useMotionStore((s) => s.rest);
  const play = useMotionStore((s) => s.play);

  /**
   * 이 씬에 들어서면 한 번 생각한다.
   *
   * 씬은 줌축에 얹혀 있는 동안 계속 마운트돼 있어서 마운트 훅으로는 진입을
   * 잡을 수 없다. 지금 짚고 있는 프로젝트가 바뀌는 순간이 곧 진입이다.
   * `thinking` 은 한 번만 재생되는 클립이라 끝나면 `onMotionEnd` 가 idle 로
   * 되돌린다.
   */
  const currentId = useCurrentProject().id;
  useEffect(() => {
    if (currentId !== SCENE_ID) return;
    play("thinking");
  }, [currentId, play]);

  /**
   * 씬 전체를 감싼 group. 줌이 이것의 크기를 정한다. scale 을 prop 으로
   * 주면 R3F 가 리렌더마다 되돌려 놓으므로 직접 만진다.
   */
  const rig = useRef<THREE.Group>(null);
  /** 캐릭터만 따로 옮긴다. `rig` 안쪽이라 줌 배수를 타지 않는다. */
  const body = useRef<THREE.Group>(null);
  /** 달려갈 곳. 없으면 서 있다. */
  const destination = useRef<THREE.Vector3 | null>(null);

  useFrame((_, deltaSeconds) => {
    const target = destination.current;
    if (!target || !body.current) return;

    const dx = target.x - body.current.position.x;
    const dz = target.z - body.current.position.z;
    const left = Math.hypot(dx, dz);

    if (left <= ARRIVE) {
      destination.current = null;
      rest();
      return;
    }

    const step = Math.min(RUN_SPEED * deltaSeconds, left);
    const here = body.current.position;
    const nextX = here.x + (dx / left) * step;
    const nextZ = here.z + (dz / left) * step;

    // 막히면 한 축씩 따로 밀어 본다. 벽에 비스듬히 닿았을 때 멈춰 서지
    // 않고 벽을 타고 미끄러진다.
    if (!blocked(nextX, nextZ)) {
      here.x = nextX;
      here.z = nextZ;
    } else if (!blocked(nextX, here.z)) {
      here.x = nextX;
    } else if (!blocked(here.x, nextZ)) {
      here.z = nextZ;
    } else {
      // 어느 쪽으로도 못 간다. 목표가 구역 안이면 영영 도착하지 못하므로
      // 여기서 접는다.
      destination.current = null;
      rest();
      return;
    }

    // 모델이 +Z 를 보고 서 있다. atan2(x, z) 라야 그 축이 기준이 된다.
    body.current.rotation.y = Math.atan2(dx, dz);
  });

  const runTo = (event: ThreeEvent<MouseEvent>) => {
    if (!rig.current) return;
    // 교차점은 월드 좌표다. 캐릭터가 사는 `rig` 안쪽 좌표로 내려야
    // 줌 배수가 섞이지 않는다.
    const local = rig.current.worldToLocal(event.point.clone());
    destination.current = new THREE.Vector3(local.x, 0, local.z);
    play("running");
  };

  /** 자기 자신을 누른 횟수. 화낼 차례인지만 세면 되므로 ref 로 둔다. */
  const taps = useRef(0);

  const poke = (event: ThreeEvent<MouseEvent>) => {
    // 캐릭터 뒤에 바닥이 깔려 있다. 막지 않으면 같은 클릭이 바닥까지
    // 내려가 제자리로 달려가라는 명령이 된다.
    event.stopPropagation();

    // 달리던 중이면 멈춘다. 뛰면서 점프하면 어느 쪽 반응인지 읽히지 않는다.
    destination.current = null;

    taps.current += 1;
    play(taps.current % ANGRY_EVERY === 0 ? "angry" : "jump");
  };

  useFrame(({ camera, size }) => {
    if (!rig.current) return;

    const ortho = camera as THREE.OrthographicCamera;
    const viewHeight = ortho.isOrthographicCamera
      ? size.height / ortho.zoom
      : GENAIMO_BAND[0];

    const grown = 1 - smoothstep(GENAIMO_BAND[0], GENAIMO_BAND[1], viewHeight);
    rig.current.scale.setScalar(GENAIMO_WORLD_SCALE * grown);
    rig.current.visible = grown > 0.001;
  });

  const cleared = useSceneClearStore((s) => s.cleared[SCENE_ID] ?? false);
  const toggle = useSceneClearStore((s) => s.toggle);

  /**
   * 점프가 이 씬을 켜고 끈다. 링크드인 카드도 Jump 칩도 결국 같은 동작을
   * 재생하므로 방아쇠를 두 군데 달지 않고 동작 하나만 지켜본다.
   */
  useEffect(() => {
    if (motion !== "jump") return;
    toggle(SCENE_ID);
    track("scene_cleared", {
      project_id: SCENE_ID,
      // 토글이라 끄는 경우도 있다.
      cleared: !useSceneClearStore.getState().cleared[SCENE_ID],
    });
  }, [motion, toggle]);

  return (
    // 월드 전체가 캐릭터 발밑을 원점으로 한 덩어리다.
    // 줌이 이 group 의 크기를 정하므로 안쪽 좌표는 손대지 않는다.
    <group ref={rig} position={CHARACTER_POSITION}>
      {/* 클릭만 받는 바닥. 캐릭터 발밑 높이에 눕혀 둔다. */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} onClick={runTo}>
        <planeGeometry args={[GROUND_SIZE, GROUND_SIZE]} />
        <meshBasicMaterial
          transparent
          opacity={0}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>

      <group ref={body} onClick={poke}>
        <MotionCharacter
          motion={motion}
          color={MOTION_COLOR[motion]}
          onMotionEnd={rest}
          scale={STICKMAN_SCALE}
        />
      </group>

      {/* 선은 캐릭터 발밑에서 출발한다. */}
      {/* {PLATFORMS.map(
        ({ id, label, color, clearedColor, path, axes, delay }, index) => (
          <ExportTrace
            key={id}
            label={label}
            color={cleared ? clearedColor : color}
            path={path}
            axes={axes}
            delay={delay}
            fadeDelay={TRACE_DELAY + index * TRACE_STAGGER}
          />
        )
      )} */}

      {/* 안쪽 값은 월드 단위로 적는다. 바깥 rig 가 줌 배수로 줄여 놓으므로
          역수를 한 번 곱해 되돌린다. 안 되돌리면 글씨만 1/7 로 나온다. */}
      <group scale={1 / GENAIMO_WORLD_SCALE} position={LABEL_LOCAL}>
        <SceneLabel text="Genaimo" size={LABEL_SIZE} color={color.gray[900]} />
      </group>

      <FlightPath points={FLIGHT_POINTS} active={cleared} />
    </group>
  );
};

export default GenaimoScene;
