import { useEffect } from "react";
import { Html } from "@react-three/drei";

import { CAMERA } from "@/components/profile/constants/sceneConfig";
import MotionControls from "@/components/profile/layout/MotionControls";
import { useMotionStore } from "@/components/profile/store/useMotionStore";
import { useSceneClearStore } from "@/components/profile/store/useSceneClearStore";
import {
  MotionCharacter,
  STICKMAN_MODEL_HEIGHT,
} from "@/components/profile/webgl/character/MotionCharacter";
import { GridFloor } from "@/components/profile/webgl/common/GridFloor";
import ExportTrace from "@/components/profile/webgl/object/ExportTrace";
import FlightPath from "@/components/profile/webgl/object/FlightPath";
import { layer } from "@/style/tokens.generated";

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
 * 만든 모션이 흘러 나가는 곳.
 *
 * 카메라 방위각이 45° 로 고정이라 월드 축이 화면에서 대각선으로 간다.
 *   -X 왼쪽 위 · -Z 오른쪽 위 · +Z 왼쪽 아래 · +X 오른쪽 아래
 *
 * 오른쪽 아래는 비워 뒀다. 모션 칩이 그 자리에 눕는다.
 *
 * 곧게 뻗지 않고 계단처럼 꺾어 올린다. 화면 가로는 세로화면에서 반경이
 * 10 남짓이라 옆으로는 더 보낼 데가 없는데, 세로는 18 이라 넉넉하다.
 * -X 와 -Z 를 번갈아 밟으면 화면에서는 거의 똑바로 위로 올라간다.
 *
 * 색이 둘인 이유는 배경이 바뀌기 때문이다. `color` 는 밝은 회색 위에서,
 * `clearedColor` 는 클리어 뒤 하늘색 위에서 읽히는 값이다.
 *
 * 하늘색도 밝은 쪽이라 대부분은 그대로 쓴다. 주황과 빨강만 하늘색과
 * 명도가 가까워(2.3:1, 2.8:1) 더 내렸다.
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
    // 줄마다 신호 출발을 어긋낸다. 한꺼번에 움직이면 기계처럼 보인다.
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
    delay: 0.5,
  },
  {
    id: "blender",
    label: "Blender",
    // 블렌더 주황. 브랜드색(#E87D0D)은 밝은 배경에서 대비가 2.18:1 밖에
    // 안 나와 글씨가 묻힌다. 색조는 두고 어둡게 내려 3.25:1 을 맞췄다.
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
    delay: 1,
  },
  {
    id: "webgl",
    label: "WebGL",
    color: "#9B1C1C",
    clearedColor: "#9B1C1C",
    path: [
      [0, 0],
      [0, -5],
      [-4, -5],
      [-4, -9],
      [-7, -9],
      [-7, -11.7],
    ],
    delay: 1.5,
  },
  {
    id: "roblox",
    label: "Roblox",
    color: "#C1261C",
    clearedColor: "#A81F16",
    path: [
      [0, 0],
      [0, 5],
      [-1, 5],
      [-1, 8.7],
    ],
    delay: 2,
  },
] as const;

/**
 * Genaimo / ailive.
 *
 * 캐릭터가 가운데 서고, 발밑에서 선이 네 방향으로 뻗어 플랫폼 이름에 닿는다.
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
/** `scenes.ts` 의 id 와 같아야 한다. 클리어 표시를 이 키로 남긴다. */
const SCENE_ID = "genaimo";

/**
 * 종이비행기가 도는 길. 캐릭터 발밑을 원점으로 한 월드 좌표다.
 *
 * 머리 위를 크게 한 바퀴 돈다. 높낮이를 조금씩 달리해 평평한 고리로
 * 보이지 않게 했다.
 *
 * 반지름 18 이 상한이다. 가로는 얼마든 키울 수 있지만, 기울어진 카메라에서는
 * 원이 커질수록 화면 세로로도 같이 번진다. 담기는 세로는 `viewHeight` 36 으로
 * 고정(화면비와 무관)이라 반경 18 을 넘으면 고리 위쪽이 잘린다.
 * 더 키우려면 비행 높이를 낮춰야 한다. 높이 1 을 내릴 때마다 세로 0.74 가 는다.
 *
 * 가로는 세로화면에서 잘리지만 그건 감수한다.
 */
const FLIGHT_POINTS = [
  [18, 7, 0],
  [9, 8.5, -15.6],
  [-9, 7.5, -15.6],
  [-18, 9, 0],
  [-9, 8, 15.6],
  [9, 7, 15.6],
] as const;

/** 씬에 들어오고 선이 나오기까지 기다리는 시간(초). */
const TRACE_DELAY = 0.5;

/** 줄과 줄 사이의 간격(초). */
const TRACE_STAGGER = 0.12;

export const GenaimoScene = () => {
  const motion = useMotionStore((s) => s.motion);
  const rest = useMotionStore((s) => s.rest);

  const cleared = useSceneClearStore((s) => s.cleared[SCENE_ID] ?? false);
  const toggle = useSceneClearStore((s) => s.toggle);

  /**
   * 점프가 이 씬을 켜고 끈다.
   *
   * 내비의 링크드인 카드도, 발밑의 Jump 칩도 결국 같은 동작을 재생한다.
   * 그래서 방아쇠를 두 군데 달지 않고 동작 하나만 지켜본다.
   *
   * 한 번 넘으면 끝이 아니라 토글이다. 다시 뛰면 배경도 비행기도 되돌아간다.
   */
  useEffect(() => {
    if (motion === "jump") toggle(SCENE_ID);
  }, [motion, toggle]);

  return (
    <>
      {/* 캐릭터가 선 자리에 그대로 깔린다.
          모델 원점이 발밑이라 같은 좌표를 쓰면 발이 격자에 닿는다.
          페이드도 격자 원점 기준이라 x/z 를 안 맞추면 한쪽으로 치우쳐 사라진다. */}
      <GridFloor position={CHARACTER_POSITION} />
      <MotionCharacter
        motion={motion}
        onMotionEnd={rest}
        scale={SCALE}
        position={CHARACTER_POSITION}
      />

      {/* 선은 캐릭터 발밑에서 출발한다. 격자와 같은 원점을 쓴다. */}
      <group position={CHARACTER_POSITION}>
        {PLATFORMS.map(({ id, label, color, clearedColor, path, delay }, index) => (
          <ExportTrace
            key={id}
            label={label}
            color={cleared ? clearedColor : color}
            path={path}
            delay={delay}
            fadeDelay={TRACE_DELAY + index * TRACE_STAGGER}
          />
        ))}
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

      {/* 클리어하면 머리 위로 종이비행기가 돈다. 흰 점선이 자취로 남는다. */}
      <group position={CHARACTER_POSITION}>
        <FlightPath points={FLIGHT_POINTS} active={cleared} />
      </group>
    </>
  );
};

export default GenaimoScene;
