import { CAMERA } from "@/components/profile/constants/sceneConfig";
import { useMotionStore } from "@/components/profile/store/useMotionStore";
import {
  MotionCharacter,
  STICKMAN_MODEL_HEIGHT,
} from "@/components/profile/webgl/character/MotionCharacter";
import { GridFloor } from "@/components/profile/webgl/common/GridFloor";

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
 * Genaimo / ailive.
 *
 * 캐릭터 하나와 모션 버튼이 전부다. 카메라는 당근이네와 같은 설정을 쓴다.
 * 버튼은 캔버스 밖 DOM 이라 `layout/MotionControls` 가 그린다.
 */
export const GenaimoScene = () => {
  const motion = useMotionStore((s) => s.motion);
  const rest = useMotionStore((s) => s.rest);

  return (
    <>
      {/* 캐릭터 발밑에 깔린다. 모델 원점이 발밑이라 y 를 그대로 쓴다. */}
      <GridFloor y={CHARACTER_POSITION[1]} />
      <MotionCharacter
        motion={motion}
        onMotionEnd={rest}
        scale={SCALE}
        position={CHARACTER_POSITION}
      />
    </>
  );
};

export default GenaimoScene;
