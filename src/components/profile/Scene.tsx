"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";

import ArticleSheet from "@/components/profile/common/ArticleSheet";
import SceneNav from "@/components/profile/layout/SceneNav";
import { useCurrentScene } from "@/components/profile/store/useSceneStore";
import CameraManager from "@/components/profile/webgl/common/CameraManager";
import Lights from "@/components/profile/webgl/common/Lights";

import styles from "@/components/profile/Scene.module.scss";

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
 * 무엇을 그릴지는 전부 `constants/scenes` 의 레지스트리가 정한다.
 * 여기서는 캔버스·카메라·조명 같은 공통분모와, 캔버스 밖 DOM(내비·시트)만 맡는다.
 */
const Scene = () => {
  const scene = useCurrentScene();
  // R3F 에는 intrinsic <scene> 이 있어서 <scene.Content /> 는 헷갈린다. 풀어서 쓴다.
  const { Content, Overlay } = scene;
  const [articleOpen, setArticleOpen] = useState(false);

  // 주소가 곧 상태다. 직접 들어와도, 뒤로가기를 눌러도 같은 경로로 처리된다.
  useEffect(() => {
    const sync = () => {
      const param = new URLSearchParams(window.location.search).get(
        STORY_PARAM
      );
      setArticleOpen(!!scene.articleId && param === scene.articleId);
    };

    sync();
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, [scene.articleId]);

  const openArticle = useCallback(() => {
    if (!scene.articleId) return;
    // 새 기록을 쌓아서 뒤로가기로 닫을 수 있게 한다.
    writeStoryParam(scene.articleId, "push");
    setArticleOpen(true);
  }, [scene.articleId]);

  const closeArticle = useCallback(() => {
    // 닫기는 기록을 늘리지 않는다.
    writeStoryParam(null, "replace");
    setArticleOpen(false);
  }, []);

  return (
    <div className={styles.container}>
      <Canvas shadows dpr={[1, 2]}>
        <Lights />

        {/* 2D UI 와 같은 단색. three 의 클리어 컬러라 톤매핑을 타지 않는다. */}
        <color attach="background" args={[scene.backdrop]} />

        <Suspense fallback={null}>
          <CameraManager />
          {/* 씬이 바뀌면 이전 오브제는 통째로 언마운트된다.
              key 를 주지 않으면 같은 자리의 컴포넌트로 취급돼 상태가 샌다. */}
          <Content key={scene.id} onOpenArticle={openArticle} />
        </Suspense>
      </Canvas>

      {Overlay && <Overlay />}
      <SceneNav />

      {scene.articleId && (
        <ArticleSheet
          id={scene.articleId}
          isOpen={articleOpen}
          onClose={closeArticle}
        />
      )}
    </div>
  );
};

export default Scene;
