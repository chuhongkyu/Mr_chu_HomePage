"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Canvas } from "@react-three/fiber";

import ArticleSheet from "@/components/profile/common/ArticleSheet";
import LinkedInPopup from "@/components/profile/common/LinkedInPopup";
import { PROJECTS } from "@/components/profile/constants/projects";
import SceneNav from "@/components/profile/layout/SceneNav";
import { useMotionStore } from "@/components/profile/store/useMotionStore";
import { useSceneClearStore } from "@/components/profile/store/useSceneClearStore";
import {
  useCurrentProject,
  useProjectUrlSync,
} from "@/components/profile/store/useSceneStore";
import Background from "@/components/profile/webgl/common/Background";
import CameraManager from "@/components/profile/webgl/common/CameraManager";
import Lights from "@/components/profile/webgl/common/Lights";
import { usePanelEditing } from "@/components/profile/webgl/debug/usePanelEditing";
import { track } from "@/utils/analytics";

import styles from "@/components/profile/Scene.module.scss";

/**
 * 판 배치 편집기의 조작판. 캔버스 밖에 떠야 해서 여기서 그린다.
 * 캔버스 안(`drei/Html`)에 두면 drei 가 wrapper 에 transform 을 걸고,
 * transform 이 containing block 을 만들어 `position: fixed` 를 가둔다.
 */
const PanelEditorDock = dynamic(
  () => import("@/components/profile/webgl/debug/PanelEditorDock"),
  { ssr: false }
);

/** 열린 글을 URL 에 남기는 쿼리 키. */
const STORY_PARAM = "story";

/**
 * 라우터를 거치지 않고 주소만 바꾼다.
 *
 * App Router 에는 shallow routing 이 없지만, 네이티브 History API 는 그대로
 * 쓸 수 있다. 같은 경로(`/`)의 쿼리만 바꾸는 것이라 라우트 전환이 일어나지
 * 않고, 따라서 씬도 다시 뜨지 않는다.
 */
const writeStoryParam = (id: string | null, mode: "push" | "replace") => {
  const url = new URL(window.location.href);
  if (id) url.searchParams.set(STORY_PARAM, id);
  else url.searchParams.delete(STORY_PARAM);
  window.history[mode === "push" ? "pushState" : "replaceState"](null, "", url);
};

/**
 * 씬 껍데기.
 *
 * 무엇을 그릴지는 전부 `constants/projects` 의 레지스트리가 정한다.
 * 여기서는 캔버스·카메라·조명 같은 공통분모와, 캔버스 밖 DOM(내비·시트)만 맡는다.
 */
const Scene = () => {
  useProjectUrlSync();

  const project = useCurrentProject();
  const [openPostId, setOpenPostId] = useState<string | null>(null);
  // R3F 에는 intrinsic <scene> 이 있어서 <project.Content /> 는 헷갈린다. 풀어서 쓴다.
  const { Content } = project;
  const [articleOpen, setArticleOpen] = useState(false);

  // 주소가 곧 상태다. 직접 들어와도, 뒤로가기를 눌러도 같은 경로로 처리된다.
  useEffect(() => {
    const sync = () => {
      const param = new URLSearchParams(window.location.search).get(
        STORY_PARAM
      );
      setArticleOpen(!!project.articleId && param === project.articleId);
    };

    sync();
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, [project.articleId, project.id]);

  const openArticle = useCallback(() => {
    if (!project.articleId) return;
    // 새 기록을 쌓아서 뒤로가기로 닫을 수 있게 한다.
    writeStoryParam(project.articleId, "push");
    setArticleOpen(true);
    track("article_opened", {
      article_id: project.articleId,
      project_id: project.id,
    });
  }, [project.articleId, project.id]);

  /**
   * 내비 카드를 눌렀을 때.
   *
   * 무엇을 열지는 `url` 유무가 정한다. 원문이 있으면 팝업으로 띄우고,
   * 없으면 노션 스냅샷을 시트로 연다(주소에 ?story= 가 남는다).
   */
  const play = useMotionStore((s) => s.play);

  const openLink = useCallback(() => {
    // 카드를 누르면 캐릭터가 먼저 반응한다. 이 동작이 씬을 클리어한다.
    if (project.linkMotion) play(project.linkMotion);

    if (project.url) {
      setOpenPostId(project.id);
      track("post_opened", { project_id: project.id, url: project.url });
      return;
    }
    openArticle();
  }, [project.url, project.id, project.linkMotion, play, openArticle]);

  const closeArticle = useCallback(() => {
    // 닫기는 기록을 늘리지 않는다.
    writeStoryParam(null, "replace");
    setArticleOpen(false);
  }, []);

  const editingPanels = usePanelEditing();

  // 클리어한 씬은 배경을 바꿔 연다. `Background` 가 색도 그라데이션도
  // 옮겨 가며 칠하므로, 값만 갈아 끼우면 전환이 저절로 이어진다.
  const cleared = useSceneClearStore((s) => s.cleared[project.id] ?? false);
  const showCleared = cleared && Boolean(project.clearedBackdrop);
  const backdrop = showCleared ? project.clearedBackdrop! : project.backdrop;
  const backdropGradient = showCleared || project.backdropGradient;

  const openPost = openPostId
    ? PROJECTS.find((item) => item.id === openPostId)
    : undefined;

  return (
    // 핫스팟 카드가 여기로 포털된다. body 로 내보내면 `.main`(z-index 2)
    // 바깥으로 나가서, 시트(11)가 `.main` 안에 갇힌 사이 카드만 위로 뚫고
    // 올라온다. 시트와 같은 쌓임 맥락에 있어야 층 토큰이 의도대로 먹는다.
    <div className={styles.container} data-scene-root>
      <Canvas shadows dpr={[1, 2]}>
        <Lights />

        {/* 첫 프레임과 셰이더가 붙기 전을 위한 클리어 컬러.
            평소에는 아래 `Background` 가 화면을 덮어 보이지 않는다. */}
        <color attach="background" args={[backdrop]} />

        {/* 단색 씬도 이걸 거친다. 색이 툭 바뀌지 않고 옮겨 가야 하기 때문이다.
            모양을 낼지 말지만 씬이 정한다. */}
        <Background color={backdrop} gradient={backdropGradient} />

        <Suspense fallback={null}>
          <CameraManager />
          {/* 씬이 바뀌면 이전 오브제는 통째로 언마운트된다.
              key 를 주지 않으면 같은 자리의 컴포넌트로 취급돼 상태가 샌다. */}
          <Content key={project.id} onOpenArticle={openArticle} />
        </Suspense>
      </Canvas>

      <SceneNav onOpenLink={openLink} />

      {editingPanels && <PanelEditorDock />}

      {project.articleId && (
        <ArticleSheet
          id={project.articleId}
          isOpen={articleOpen}
          onClose={closeArticle}
        />
      )}

      {openPost && (
        <LinkedInPopup
          post={openPost}
          onClose={() => setOpenPostId(null)}
        />
      )}
    </div>
  );
};

export default Scene;
