import type { ComponentType } from "react";
import {
  IconMicrophoneLine,
  IconPaletteLine,
} from "@karrotmarket/react-monochrome-icon";

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
 * 내비의 아이콘. 문자열이면 이미지 경로다.
 *
 * 넷 중 셋은 선 아이콘이고 Genaimo 만 로고를 쓴다. 대체할 픽토그램이 없다.
 */
export type ProjectIcon = ComponentType<{ size?: number }> | string;

export type ProjectLink = {
  label: string;
  /** `/project/<노션 id>` 는 시트로 열린다. */
  href: string;
  /** 없으면 문서 아이콘. */
  icon?: string;
};

/** 한 시기를 이루는 것 전부. 씬과 카드를 따로 두지 않는다. */
export type Project = {
  id: string;
  /** 하단 내비. */
  label: string;
  icon: ProjectIcon;
  year: string;
  /** 상단 헤더. */
  headline: string;

  // ── 내비 아래 카드 ──────────────────────────────────────
  title: string;
  description: string;
  image: string;
  /** 로고처럼 여백이 곧 형태인 그림은 `contain`. 자르면 알아볼 수 없다. */
  imageFit?: "cover" | "contain";
  /** 레거시 슬라이드(`PostCard`)만 쓴다. */
  subImage?: string;
  /** 있으면 카드가 팝업으로, 없으면 `articleId` 스냅샷을 시트로 연다. */
  url?: string;

  // ── 씬 ──────────────────────────────────────────────────
  /** 캔버스 클리어 컬러라 톤매핑을 타지 않는다. */
  backdrop: string;
  /** 구성이 제각각이라 데이터가 아니라 컴포넌트로 둔다. */
  Content: ComponentType<ProjectContentProps>;
  /** `public/notion/<id>.json` 에 스냅샷이 있어야 한다. */
  articleId?: string;
  /** 직교라 거리는 크기와 무관하고 이 값이 배율을 정한다. */
  viewHeight?: number;
  elevation?: number;
  projection?: "orthographic" | "perspective";
  /**
   * 화면을 채우는 그림을 쓰는 씬은 켜면 안 된다. 그림의 평평한 바탕과
   * 어긋나 그림 가장자리가 사각형으로 드러난다.
   */
  backdropGradient?: boolean;
  clearedBackdrop?: string;
  /** 카드를 누를 때 같이 재생할 동작. 클리어 연출의 방아쇠다. */
  linkMotion?: MotionName;
  /** 헤더 문구 아래에 세로로 쌓이는 바로가기. */
  links?: ProjectLink[];
};

const DEFAULT_BACKDROP = color.daangn.backdrop;

/** 순서가 곧 좌우 탐색 순서다. */
export const PROJECTS: Project[] = [
  {
    id: "daangn",
    label: "당근이네",
    icon: "/assets/img/daangn/logo.png",
    year: "2025~",
    headline: "개발보다 세계관이 더 중요했다",

    title: "당근마켓, 당근이네,",
    description:
      "당근마켓, Software Engineer 포지션으로 근무.\n 기획부터 개발까지",
    image: "/assets/img/daangn/logo.png",
    imageFit: "contain",

    backdrop: DEFAULT_BACKDROP,
    Content: DaangnScene,
    articleId: "3dfc588d-b9e9-807e-b97c-fa8174f39e28",
  },
  {
    id: "genaimo",
    label: "Genaimo",
    icon: "/assets/img/genaimo/logo.webp",
    year: "2024~2025",
    headline: "만들고, 들고 나가서, 팔았다",
    title: "직접 만든 AI 서비스로 GDC 세계 무대에 서다",
    description: "센프란시스코 GDC참가 경험과 현장의 인사이트",
    image: "/assets/og/post2.jpg",
    url: "https://www.linkedin.com/posts/hong-kyu-chu-a38b9a249_gdc-activity-7310031891129143297-gZ7g",
    backdrop: DEFAULT_BACKDROP,
    Content: GenaimoScene,
    viewHeight: 36,
    linkMotion: "jump",
    links: [
      {
        label: "기술 정리",
        href: "/project/204c588d-b9e9-80b3-b0cf-d19e755bce9b",
        icon: "/assets/img/notion.png",
      },
    ],
    clearedBackdrop: "#33CCF2",
  },
  {
    id: "fastcampus",
    label: "온라인 강의",
    icon: IconMicrophoneLine,
    year: "2023~2026",
    headline: "설명할 수 없으면 아는 게 아니었다",

    title: "더 쉽고 편하게 만드는 3D 인터랙티브 웹 개발",
    description: "구현부터 최적화까지",
    image: "/assets/og/post1.jpg",
    url: "https://www.linkedin.com/posts/hong-kyu-chu-a38b9a249_%EB%8D%94-%EC%89%BD%EA%B3%A0-%ED%8E%B8%ED%95%98%EA%B2%8C-%EB%A7%8C%EB%93%9C%EB%8A%94-3d-%EC%9D%B8%ED%84%B0%EB%9E%99%ED%8B%B0%EB%B8%8C-%EC%9B%B9-%EA%B0%9C%EB%B0%9C-%EA%B5%AC%ED%98%84%EB%B6%80%ED%84%B0-%EC%B5%9C%EC%A0%81%ED%99%94%EA%B9%8C%EC%A7%80-activity-7122521989285625856-Sp1a",

    backdrop: "#AE0C36",
    Content: FastcampusScene,
    projection: "perspective",
    backdropGradient: true,
  },
  {
    id: "art",
    label: "현대미술",
    icon: IconPaletteLine,
    year: "2012-2018",
    headline: "붓을 놓고 코드를 잡기까지",

    title: "현대 미술",
    description: "샤갈,#KEAs2021 #KEAs2021선정작가",
    image: "/assets/og/post00.png",
    url: "https://sprout-decision-ec5.notion.site/36fc588db9e980b5b3a7fd407fc3984c?pvs=73",

    backdrop: DEFAULT_BACKDROP,
    Content: ArtScene,
    viewHeight: 28,
  },
];
