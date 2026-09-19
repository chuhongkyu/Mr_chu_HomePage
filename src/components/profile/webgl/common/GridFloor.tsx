import { Grid } from "@react-three/drei";

import { color } from "@/style/tokens.generated";

export type GridFloorProps = {
  /** 바닥 높이. 캐릭터 발이 닿는 y 에 맞춘다. */
  y?: number;
  /** 모눈 한 칸. */
  cellSize?: number;
  /** 굵은 선 간격. 몇 칸마다 한 번 진하게 긋는지. */
  sectionSize?: number;
  /**
   * 원점에서 이만큼 멀어지면 사라진다.
   * 직교 카메라라 `fadeFrom` 을 0(격자 원점)으로 둔다. 기본값(카메라 기준)은
   * 카메라가 항상 60 만큼 떨어져 있어서 전부 지워져 버린다.
   */
  fadeDistance?: number;
  fadeStrength?: number;
};

/**
 * 모눈종이 바닥.
 *
 * 끝이 잘려 보이지 않도록 가장자리로 갈수록 흐려진다.
 * 무한 격자라 팬으로 이동해도 경계가 드러나지 않는다.
 */
export const GridFloor = ({
  y = 0,
  cellSize = 1,
  sectionSize = 5,
  fadeDistance = 26,
  fadeStrength = 1.5,
}: GridFloorProps) => {
  return (
    <Grid
      position={[0, y, 0]}
      infiniteGrid
      cellSize={cellSize}
      cellThickness={0.6}
      cellColor={color.gray[400]}
      sectionSize={sectionSize}
      sectionThickness={1.1}
      sectionColor={color.gray[500]}
      fadeDistance={fadeDistance}
      fadeStrength={fadeStrength}
      fadeFrom={0}
    />
  );
};

export default GridFloor;
