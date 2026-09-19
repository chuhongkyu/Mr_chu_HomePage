import { CAMERA } from "@/components/profile/constants/sceneConfig";
import { GridFloor } from "@/components/profile/webgl/common/GridFloor";
import { PlaceholderBox } from "@/components/profile/webgl/common/PlaceholderBox";

const BOX_SIZE: [number, number, number] = [6, 6, 6];

/** 상자 밑면이 바닥에 닿도록 절반만큼 올린다. */
const GROUND_Y = CAMERA.target[1] - BOX_SIZE[1] / 2 - 2;
const BOX_POSITION: [number, number, number] = [
  CAMERA.target[0],
  GROUND_Y + BOX_SIZE[1] / 2,
  CAMERA.target[2],
];

/**
 * 현대미술.
 *
 * 아직 무엇을 세울지 정하지 않아 임시 상자만 둔다.
 * 작업물을 어떻게 세울지 미정.
 */
export const ArtScene = () => {
  return (
    <>
      <GridFloor position={[BOX_POSITION[0], GROUND_Y, BOX_POSITION[2]]} />
      <PlaceholderBox position={BOX_POSITION} size={BOX_SIZE} />
    </>
  );
};

export default ArtScene;
