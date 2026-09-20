import { useEffect } from "react";
import { Html } from "@react-three/drei";

import { CAMERA } from "@/components/profile/constants/sceneConfig";
import MotionControls from "@/components/profile/layout/MotionControls";
import { useMotionStore } from "@/components/profile/store/useMotionStore";
import { useSceneClearStore } from "@/components/profile/store/useSceneClearStore";
import {
  MotionCharacter,
  type MotionName,
  STICKMAN_MODEL_HEIGHT,
} from "@/components/profile/webgl/character/MotionCharacter";
import { GridFloor } from "@/components/profile/webgl/common/GridFloor";
import ExportTrace from "@/components/profile/webgl/object/ExportTrace";
import FlightPath from "@/components/profile/webgl/object/FlightPath";
import { layer } from "@/style/tokens.generated";
import { track } from "@/utils/analytics";

const SCALE = 0.06;

/**
 * 모델 원점이 발밑이라, 그대로 두면 캐릭터가 카메라 타겟보다 통째로 위에 선다.
 * 키의 절반만큼 내려서 몸 중앙이 화면 가운데에 오게 한다.
 * x/z 는 카메라가 보는 지점에 맞춘다. 원점(0,0,0)은 타겟에서 한참 비켜나 있다.
 */
const CHARACTER_POSITION: [number, number, number] = [
  CAMERA.target[0],
  CAMERA.target[1] - (STICKMAN_MODEL_HEIGHT * SCALE) / 2,
  CAMERA.target[2],
];

/**
 * 칩 줄을 캐릭터 앞쪽(카메라 쪽) 바닥으로 조금 당긴다.
 * 방위각 45° 카메라에서 "앞"은 +x +z 방향이다.
 */
const CHIPS_FORWARD = 2;
const CHIPS_POSITION: [number, number, number] = [
  CHARACTER_POSITION[0] + CHIPS_FORWARD + 3,
  CHARACTER_POSITION[1],
  CHARACTER_POSITION[2] + CHIPS_FORWARD,
];

/**
 * 만든 모션이 흘러 나가는 곳. 월드 축이 화면에서 대각선으로 간다.
 *   -X 왼쪽 위 · -Z 오른쪽 위 · +Z 왼쪽 아래 · +X 오른쪽 아래(모션 칩 자리)
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
 * 칩은 `Html transform` 으로 바닥 평면에 눕힌다. 화면 고정 오버레이로 두면
 * 캐릭터를 팬으로 옮겼을 때 따로 놀아서, 어느 캐릭터의 조작인지 흐려진다.
 *
 * 크기는 scale 로 만지지 않는다. transform 모드는 DOM 을 항상 1/40 로 줄여
 * 그리므로 월드 크기 = DOM 폭 ÷ 40 이다. scale 로 키우면 border 1px 과
 * padding·radius 까지 같이 늘어나 디자인이 흐트러진다.
 * 그래서 SCSS 에서 실제 크기(520px = 월드 13 유닛)로 그린다.
 */
/**
 * 동작에 따라 캐릭터 색이 바뀐다. 적지 않은 동작은 기본색.
 * 클리어해서 배경이 하늘색이 되면 그 기본색이 흰색으로 바뀐다.
 */
const MOTION_COLOR: Partial<Record<MotionName, string>> = {
  running: "#1F1F1F",
  angry: "#D92D20",
  jump: "#FFFFFF",
  brush: "#FFFFFF",
};

const CLEARED_COLOR = "#FFFFFF";

/** `scenes.ts` 의 id 와 같아야 한다. */
const SCENE_ID = "genaimo";

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
    <>
      {/* 캐릭터가 선 자리에 그대로 깔린다.
          모델 원점이 발밑이라 같은 좌표를 쓰면 발이 격자에 닿는다.
          페이드도 격자 원점 기준이라 x/z 를 안 맞추면 한쪽으로 치우쳐 사라진다. */}
      <GridFloor position={CHARACTER_POSITION} />
      <MotionCharacter
        motion={motion}
        color={MOTION_COLOR[motion] ?? (cleared ? CLEARED_COLOR : undefined)}
        onMotionEnd={rest}
        scale={SCALE}
        position={CHARACTER_POSITION}
      />

      {/* 선은 캐릭터 발밑에서 출발한다. 격자와 같은 원점을 쓴다. */}
      <group position={CHARACTER_POSITION}>
        {PLATFORMS.map(
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
        )}
      </group>

      {/* 바닥에 눕힌 칩.
          바깥 group 이 카메라 방위각(45°)에 맞춰 돌리고, 안쪽 Html 이
          평면을 바닥으로 눕힌다. 둘로 나누면 Euler 순서를 따질 일이 없다. */}
      <group position={CHIPS_POSITION} rotation={[0, Math.PI / 2, 0]}>
        <Html
          transform
          rotation={[-Math.PI / 2, 0, 0]}
          center
          zIndexRange={[layer["scene-html"], 0]}
          pointerEvents="none"
        >
          <MotionControls />
        </Html>
      </group>

      <group position={CHARACTER_POSITION}>
        <FlightPath points={FLIGHT_POINTS} active={cleared} />
      </group>
    </>
  );
};

export default GenaimoScene;
