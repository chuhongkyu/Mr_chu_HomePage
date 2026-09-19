import type { ComponentType } from "react";

import type { MotionName } from "@/components/profile/webgl/character/MotionCharacter";
import ArtScene from "@/components/profile/webgl/scenes/ArtScene";
import DaangnScene from "@/components/profile/webgl/scenes/DaangnScene";
import FastcampusScene from "@/components/profile/webgl/scenes/FastcampusScene";
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
  /** 내비에 라벨과 함께 뜨는 시기. */
  year: string;
  /** 헤더에 뜨는 한 줄. 그 씬에서 하려는 이야기를 적는다. */
  title: string;
  /** 3D 배경색. 캔버스 클리어 컬러라 톤매핑을 타지 않는다. */
  backdrop: string;
  /**
   * 배경을 `backdrop` 단색 대신 그라데이션으로 칠한다.
   *
   * 기본은 끔. 화면을 채우는 그림을 쓰는 씬에서는 켜면 안 된다. 그림의
   * 평평한 바탕과 그라데이션이 어긋나서 그림 가장자리가 사각형으로
   * 드러난다. 당근이네가 그런 경우다.
   *
   * 물건이 공중에 떠 있는 씬에서만 쓸모가 있다. 단색으로 두면 물건이
   * 색종이에 붙은 것처럼 납작해 보이기 때문이다.
   */
  backdropGradient?: boolean;
  /**
   * 클리어하면 배경이 이 색으로 바뀐다. 그라데이션도 같이 켜진다.
   *
   * `Background` 가 색과 그라데이션을 둘 다 옮겨 가며 칠하므로, 값만 바꿔
   * 주면 전환이 저절로 이어진다.
   */
  clearedBackdrop?: string;
  /**
   * 내비 카드를 누를 때 같이 재생할 캐릭터 동작.
   * 씬을 클리어하는 연출의 방아쇠다. 캐릭터가 있는 씬에만 쓸모가 있다.
   */
  linkMotion?: MotionName;
  /**
   * 화면에 담을 월드 세로 높이. 크면 멀리서 보는 셈이 된다.
   * 직교 카메라라 거리는 크기와 무관하고 이 값이 배율을 정한다.
   * 없으면 `CAMERA.orthoViewHeight` 를 쓴다.
   */
  viewHeight?: number;
  /**
   * 지평선 위 시점 각도(도). 키우면 더 위에서 내려다본다.
   * 음수면 아래에서 올려다본다.
   * 없으면 정등각(35.2644°)을 쓴다.
   */
  elevation?: number;
  /**
   * 투영 방식.
   *   orthographic — 원근 왜곡이 없다. 아이소메트릭 씬의 기본값.
   *   perspective  — 가까운 것이 커 보인다. 올려다보는 구도에 쓴다.
   */
  projection?: "orthographic" | "perspective";
  /**
   * 씬 본체. Canvas 안에서 렌더된다.
   * 씬마다 오브제 구성이 달라서 데이터가 아니라 컴포넌트로 둔다.
   */
  Content: ComponentType<SceneContentProps>;
  /** 노션 스냅샷 ID. 있으면 "자세히 보기"가 시트를 연다. */
  articleId?: string;
  /** 내비 아래에 끼는 카드. 씬마다 다른 곳으로 데려간다. */
  link?: SceneLink;
};

export type SceneLink = {
  /**
   * 카드에 띄울 제목·설명·썸네일을 가져올 `POSTS` 항목.
   * 같은 정보를 두 군데에 적지 않으려고 id 로만 가리킨다.
   */
  postId: string;
  /**
   * 누르면 열리는 것.
   *   article — 씬의 `articleId` 스냅샷을 시트로
   *   post    — 그 포스트를 팝업으로. LinkedIn·Notion 임베드를 모두 처리한다.
   */
  open: "article" | "post";
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
    year: "2025~",
    title: "세계관을 구성 해야한다",
    backdrop: DEFAULT_BACKDROP,
    Content: DaangnScene,
    articleId: "3dfc588d-b9e9-807e-b97c-fa8174f39e28",
    link: { postId: "karrot", open: "article" },
  },
  {
    id: "genaimo",
    label: "Genaimo",
    year: "2024~2025",
    title: "3D플랫폼과 모션",
    backdrop: DEFAULT_BACKDROP,
    Content: GenaimoScene,
    // Genaimo 를 만들며 쓴 글. GDC 에 들고 나갔던 기록이다.
    link: { postId: "7310031891129143297", open: "post" },
    // 카드를 누르면 캐릭터가 뛴다. 그 점프가 씬을 클리어한다.
    // 칩에서 직접 Jump 를 눌러도 같은 연출이 돈다.
    linkMotion: "jump",
    // 하늘색. 밝은 회색에서 여기로 넘어가며 씬이 끝났음을 알린다.
    // 슬라이드 테마(`slideConfig`)에 쓰던 색과 같다.
    clearedBackdrop: "#33CCF2",
    // 캐릭터 하나뿐이라 당근이네(22)보다 넉넉하게 잡아 여백을 둔다.
    viewHeight: 36,
  },
  {
    id: "fastcampus",
    label: "온라인 강의",
    year: "2023~2026",
    title: "지식을 공유하다",
    // 크림슨. 다른 씬의 무채색 배경과 끊어서 강한 인상을 준다.
    backdrop: "#AE0C36",
    Content: FastcampusScene,
    link: { postId: "7122521989285625856", open: "post" },
    // 이 씬만 원근으로 본다. 판이 공중에 뜬 구성이라, 평행 투영으로는
    // 앞뒤로 흩어 놓아도 다 같은 평면에 붙은 것처럼 납작하게 읽힌다.
    // 앙각·담는 높이는 다른 씬과 같은 기본값을 쓴다(42° / 22).
    projection: "perspective",
    // 판이 공중에 떠 있는 씬이라 배경에 깊이가 있어야 한다.
    // 화면을 채우는 그림이 없어서 가장자리가 드러날 일도 없다.
    backdropGradient: true,
  },
  {
    id: "art",
    label: "현대미술",
    year: "2012-2018",
    // TODO: 임시. 씬 내용이 정해지면 같이 정한다.
    title: "제목 미정",
    backdrop: DEFAULT_BACKDROP,
    Content: ArtScene,
    link: { postId: "artme_brush", open: "post" },
    viewHeight: 28,
  },
];
