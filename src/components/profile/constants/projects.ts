import type { ComponentType } from "react";

import type { MotionName } from "@/components/profile/webgl/character/MotionCharacter";
import ArtScene from "@/components/profile/webgl/scenes/ArtScene";
import DaangnScene from "@/components/profile/webgl/scenes/DaangnScene";
import FastcampusScene from "@/components/profile/webgl/scenes/FastcampusScene";
import GenaimoScene from "@/components/profile/webgl/scenes/GenaimoScene";
import { color } from "@/style/tokens.generated";

export type ProjectContentProps = {
  onOpenArticle: () => void;
};

/**
 * 한 시기를 이루는 것 전부. 씬과 카드를 따로 두지 않는다.
 *
 * 전에는 `SCENES` 와 `POSTS` 로 갈라 두고 `postId` 로 이었는데, 둘이 1:1 인데도
 * 한 항목을 고치려면 두 파일을 오가야 했고 키가 `7310031891129143297` 같은
 * 불투명한 문자열이었다.
 */
export type Project = {
  /** URL 쿼리·상태 키·클리어 표시에 쓰인다. */
  id: string;
  /** 하단 내비에 뜨는 짧은 이름. */
  label: string;
  year: string;
  /** 상단 헤더 한 줄. */
  headline: string;

  // ── 내비 아래 카드 ──────────────────────────────────────
  title: string;
  description: string;
  image: string;
  /** 로고처럼 여백이 곧 형태인 그림은 `contain`. 자르면 알아볼 수 없다. */
  imageFit?: "cover" | "contain";
  /** 레거시 슬라이드(`PostCard`)의 겹쳐 놓는 두 번째 그림. */
  subImage?: string;
  /**
   * 링크드인·노션 원문. 있으면 카드가 팝업으로 열고, 없으면 `articleId` 의
   * 노션 스냅샷을 시트로 연다.
   */
  url?: string;

  // ── 씬 ──────────────────────────────────────────────────
  /** 3D 배경색. 캔버스 클리어 컬러라 톤매핑을 타지 않는다. */
  backdrop: string;
  /** 씬 본체. 구성이 제각각이라 데이터가 아니라 컴포넌트로 둔다. */
  Content: ComponentType<ProjectContentProps>;
  /** 노션 스냅샷 ID. */
  articleId?: string;
  /**
   * 화면에 담을 월드 세로 높이. 없으면 `CAMERA.orthoViewHeight`.
   * 직교라 거리는 크기와 무관하고 이 값이 배율을 정한다.
   */
  viewHeight?: number;
  /** 지평선 위 시점 각도(도). 없으면 `DEFAULT_ELEVATION`. */
  elevation?: number;
  projection?: "orthographic" | "perspective";
  /**
   * 배경을 단색 대신 그라데이션으로.
   *
   * 화면을 채우는 그림을 쓰는 씬은 켜면 안 된다. 그림의 평평한 바탕과
   * 어긋나 그림 가장자리가 사각형으로 드러난다.
   */
  backdropGradient?: boolean;
  /** 클리어하면 배경이 이 색으로 바뀌고 그라데이션도 같이 켜진다. */
  clearedBackdrop?: string;
  /** 카드를 누를 때 같이 재생할 동작. 클리어 연출의 방아쇠다. */
  linkMotion?: MotionName;
};

const DEFAULT_BACKDROP = color.daangn.backdrop;

/** 순서가 곧 좌우 탐색 순서다. */
export const PROJECTS: Project[] = [
  {
    id: "daangn",
    label: "당근이네",
    year: "2025~",
    headline: "개발보다 세계관이 더 중요했다",

    title: "당근마켓, 당근이네,",
    description:
      "당근마켓, Software Engineer 포지션으로 근무.\n 기획부터 개발까지",
    image: "/assets/img/daangn/logo.png",
    // 525×900 세로로 긴 로고.
    imageFit: "contain",

    backdrop: DEFAULT_BACKDROP,
    Content: DaangnScene,
    articleId: "3dfc588d-b9e9-807e-b97c-fa8174f39e28",
  },
  {
    id: "genaimo",
    label: "Genaimo",
    year: "2024~2025",
    headline: "만든 사람이 파는 게 제일 빨랐다",

    title: "직접 만든 AI 서비스로 GDC 세계 무대에 서다",
    description:
      "센프란시스코 GDC참가 경험과 현장의 인사이트, 그리고 직접 만든 서비스를 고객들에게 소개하고 영업한 기록",
    image: "/assets/og/post2.jpg",
    url: "https://www.linkedin.com/posts/hong-kyu-chu-a38b9a249_gdc-activity-7310031891129143297-gZ7g",

    backdrop: DEFAULT_BACKDROP,
    Content: GenaimoScene,
    viewHeight: 36,
    linkMotion: "jump",
    // 슬라이드 테마에 쓰던 하늘색.
    clearedBackdrop: "#33CCF2",
  },
  {
    id: "fastcampus",
    label: "온라인 강의",
    year: "2023~2026",
    headline: "설명할 수 없으면 아는 게 아니었다",

    title: "더 쉽고 편하게 만드는 3D 인터랙티브 웹 개발",
    description: "구현부터 최적화까지",
    image: "/assets/og/post1.jpg",
    url: "https://www.linkedin.com/posts/hong-kyu-chu-a38b9a249_%EB%8D%94-%EC%89%BD%EA%B3%A0-%ED%8E%B8%ED%95%98%EA%B2%8C-%EB%A7%8C%EB%93%9C%EB%8A%94-3d-%EC%9D%B8%ED%84%B0%EB%9E%99%ED%8B%B0%EB%B8%8C-%EC%9B%B9-%EA%B0%9C%EB%B0%9C-%EA%B5%AC%ED%98%84%EB%B6%80%ED%84%B0-%EC%B5%9C%EC%A0%81%ED%99%94%EA%B9%8C%EC%A7%80-activity-7122521989285625856-Sp1a",

    // 크림슨. 다른 씬의 무채색과 끊어서 강한 인상을 준다.
    backdrop: "#AE0C36",
    Content: FastcampusScene,
    // 판이 공중에 뜬 구성이라 평행 투영으로는 앞뒤로 흩어도 납작하게 읽힌다.
    projection: "perspective",
    backdropGradient: true,
  },
  {
    id: "art",
    label: "현대미술",
    year: "2012-2018",
    headline: "붓을 놓고 코드를 잡기까지",

    title: "현대 미술",
    description:
      "추홍규 @chu_hong_kyu, <샤갈>, 2020, 장지에 수비안료, 85x125cm #KEAs2021 #KEAs2021선정작가",
    image: "/assets/og/post00.png",
    url: "https://sprout-decision-ec5.notion.site/36fc588db9e980b5b3a7fd407fc3984c?pvs=73",

    backdrop: DEFAULT_BACKDROP,
    Content: ArtScene,
    viewHeight: 28,
  },
];
