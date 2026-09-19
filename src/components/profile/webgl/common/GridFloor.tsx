import { Grid } from "@react-three/drei";

import { color } from "@/style/tokens.generated";

export type GridFloorProps = {
  /**
   * 격자 원점. 페이드도 여기서부터 계산되므로, 주인공이 서는 자리에 맞춰야
   * 한쪽으로 치우쳐 사라지지 않는다.
   */
  position?: [number, number, number];
  /** 모눈 한 칸. */
  cellSize?: number;
  /** 선 굵기. */
  cellThickness?: number;
  /**
   * 몇 칸마다 굵은 선을 그을지.
   * `sectionThickness` 가 0 이면 그리지 않는다.
   */
  sectionSize?: number;
  /**
   * 굵은 선 굵기. 0 이면 완전히 사라진다.
   * 셰이더가 `sectionThickness * g2` 로 색을 섞고 알파에 `g2` 를 더하는 구조라,
   * 0 을 주면 색도 굵기도 기여하지 않고 균일한 모눈만 남는다.
   */
  sectionThickness?: number;
  /**
   * 격자 원점에서 이만큼 멀어지면 사라진다.
   * 직교 카메라라 `fadeFrom` 을 0(격자 원점)으로 둔다. 기본값(카메라 기준)은
   * 카메라가 항상 60 만큼 떨어져 있어서 전부 지워져 버린다.
   */
  fadeDistance?: number;
  /** 사라지는 곡선. 높을수록 가장자리가 급하게 끊긴다. */
  fadeStrength?: number;
};

/**
 * 모눈종이 바닥.
 *
 * 끝이 잘려 보이지 않도록 가장자리로 갈수록 흐려진다.
 * 무한 격자라 팬으로 이동해도 경계가 드러나지 않는다.
 *
 * 기본은 굵은 구역선 없이 균일한 칸만 그린다.
 */
export const GridFloor = ({
  position = [0, 0, 0],
  cellSize = 1,
  sectionSize = 5,
  fadeDistance = 42,
  fadeStrength = 1,
}: GridFloorProps) => {
  return (
    <Grid
      position={position}
      infiniteGrid
      cellSize={cellSize}
      cellThickness={0.6}
      cellColor={color.gray[400]}
      sectionSize={sectionSize}
      sectionColor={color.gray[500]}
      fadeDistance={fadeDistance}
      fadeStrength={fadeStrength}
      fadeFrom={0}
    />
  );
};

export default GridFloor;
