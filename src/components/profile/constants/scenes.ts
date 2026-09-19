import type { ComponentType } from "react";

import MotionControls from "@/components/profile/layout/MotionControls";
import DaangnScene from "@/components/profile/webgl/scenes/DaangnScene";
import GenaimoScene from "@/components/profile/webgl/scenes/GenaimoScene";
import { color } from "@/style/tokens.generated";

export type SceneContentProps = {
  /** 이 씬의 글 시트를 연다. 씬에 `articleId` 가 있을 때만 의미가 있다. */
  onOpenArticle: () => void;
};

export type SceneDefinition = {
  /** URL 쿼리와 상태 키로 쓰인다. */
  id: string;
  /** 내비에 뜨는 짧은 이름. 씬을 가리키는 고유명이다. */
  label: string;
  /** 헤더에 뜨는 한 줄. 그 씬에서 하려는 이야기를 적는다. */
  title: string;
  /** 3D 배경색. 캔버스 클리어 컬러라 톤매핑을 타지 않는다. */
  backdrop: string;
  /**
   * 화면에 담을 월드 세로 높이. 크면 멀리서 보는 셈이 된다.
   * 직교 카메라라 거리는 크기와 무관하고 이 값이 배율을 정한다.
   * 없으면 `CAMERA.orthoViewHeight` 를 쓴다.
   */
  viewHeight?: number;
  /**
   * 지평선 위 시점 각도(도). 키우면 더 위에서 내려다본다.
   * 없으면 정등각(35.2644°)을 쓴다.
   */
  elevation?: number;
  /**
   * 씬 본체. Canvas 안에서 렌더된다.
   * 씬마다 오브제 구성이 달라서 데이터가 아니라 컴포넌트로 둔다.
   */
  Content: ComponentType<SceneContentProps>;
  /**
   * 캔버스 밖에 함께 뜨는 DOM. 씬 전용 조작 UI 자리다.
   * 3D 안에서는 버튼을 못 그리므로 씬마다 여기에 붙인다.
   */
  Overlay?: ComponentType;
  /** 노션 스냅샷 ID. 있으면 "자세히 보기"가 시트를 연다. */
  articleId?: string;
};

/**
 * 씬 목록. 순서가 곧 좌우 탐색 순서다.
 *
 * 새 씬을 추가하려면 여기에 한 항목을 넣고 `Content` 컴포넌트를 만들면 된다.
 * 배경색·이름·글은 데이터로 바뀌고, 오브제 구성만 컴포넌트가 책임진다.
 */
/** 씬 공통 배경. 지금은 두 씬이 같은 색을 쓴다. */
const DEFAULT_BACKDROP = color.daangn.backdrop;

export const SCENES: SceneDefinition[] = [
  {
    id: "daangn",
    label: "당근이네",
    title: "세계관을 구성 해야한다",
    backdrop: DEFAULT_BACKDROP,
    Content: DaangnScene,
    articleId: "3dfc588d-b9e9-807e-b97c-fa8174f39e28",
  },
  {
    id: "genaimo",
    label: "Genaimo",
    title: "3D플랫폼과 모션",
    backdrop: DEFAULT_BACKDROP,
    Content: GenaimoScene,
    Overlay: MotionControls,
    // 캐릭터 하나뿐이라 당근이네(22)보다 넉넉하게 잡아 여백을 둔다.
    viewHeight: 36,
    // 정등각(35.3°)보다 위에서 내려다본다.
    elevation: 42,
  },
];
