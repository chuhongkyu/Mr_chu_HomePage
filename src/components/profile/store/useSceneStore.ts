import { useEffect, useRef } from "react";
import { create } from "zustand";

import { PROJECTS } from "@/components/profile/constants/projects";
import { stageFor } from "@/components/profile/constants/zoomStages";
import { useZoomStore } from "@/components/profile/store/useZoomStore";
import { track } from "@/utils/analytics";

type GoToOptions = {
  /**
   * 줌으로 이어 갈지. 내비에서 누른 경우만 true 다.
   * 주소 동기화(첫 진입·뒤로가기)로 옮길 때는 그냥 그 씬에 가 있어야 한다.
   */
  animate?: boolean;
};

type SceneStore = {
  index: number;
  /** 마지막 변경이 줌에서 왔는지. 주소를 쌓을지 말지가 갈린다. */
  fromZoom: boolean;
  goTo: (index: number, options?: GoToOptions) => void;
  /** 줌이 단계를 넘을 때 카메라 쪽에서 부른다. */
  syncTo: (id: string) => void;
  next: () => void;
  prev: () => void;
};

/**
 * 지금 보고 있는 씬.
 *
 * 헤더(이름)와 씬(배경·오브제)과 내비(화살표 활성화)가 이 하나를 본다.
 * 목록 끝에서는 더 가지 않는다. 순환시키면 "처음/끝" 감각이 사라진다.
 */
export const useSceneStore = create<SceneStore>((set, get) => ({
  index: 0,

  fromZoom: false,

  goTo: (index, { animate = true } = {}) => {
    const next = Math.min(Math.max(index, 0), PROJECTS.length - 1);
    const current = get().index;
    if (next === current) return;

    const to = stageFor(PROJECTS[next].id);
    const from = stageFor(PROJECTS[current].id);

    // 둘 다 줌축 위면 씬을 바꾸지 않는다. 줌만 옮기면 인덱스는 따라온다.
    if (animate && to && from) {
      useZoomStore.getState().goTo(to.viewHeight);
      return;
    }

    set({ index: next, fromZoom: false });
  },

  syncTo: (id) => {
    const next = PROJECTS.findIndex((project) => project.id === id);
    if (next < 0 || next === get().index) return;
    set({ index: next, fromZoom: true });
  },

  next: () => get().goTo(get().index + 1),
  prev: () => get().goTo(get().index - 1),
}));

/** 컴포넌트에서 매번 인덱스를 풀지 않도록. */
export const useCurrentProject = () => PROJECTS[useSceneStore((s) => s.index)];

/** 지금 보고 있는 프로젝트를 주소에 남기는 쿼리 키. */
const PROJECT_PARAM = "p";

/**
 * 주소와 현재 프로젝트를 잇는다.
 *
 * 인덱스가 아니라 id 를 쓴다. 목록 순서를 바꾸면 인덱스로 공유한 링크가
 * 엉뚱한 씬을 연다.
 *
 * 라우터를 거치지 않는다. App Router 에 shallow routing 이 없어서 `push` 를
 * 쓰면 라우트가 갈아엎히고 씬이 통째로 다시 뜬다.
 */
export const useProjectUrlSync = () => {
  const index = useSceneStore((s) => s.index);
  const goTo = useSceneStore((s) => s.goTo);
  const mounted = useRef(false);

  useEffect(() => {
    const sync = () => {
      const id = new URLSearchParams(window.location.search).get(PROJECT_PARAM);
      const next = PROJECTS.findIndex((project) => project.id === id);
      goTo(next < 0 ? 0 : next, { animate: false });
    };

    sync();
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, [goTo]);

  useEffect(() => {
    const project = PROJECTS[index];
    if (!project) return;

    track("scene_viewed", {
      project_id: project.id,
      label: project.label,
      index,
      // 주소에 이미 있던 값으로 들어왔는지, 내비로 옮겨왔는지.
      entry: mounted.current ? "nav" : "direct",
    });
  }, [index]);

  useEffect(() => {
    const id = PROJECTS[index]?.id;
    if (!id) return;

    const url = new URL(window.location.href);
    // 뒤로가기로 들어온 경우다. 다시 쓰면 무한히 오간다.
    if (url.searchParams.get(PROJECT_PARAM) === id) {
      mounted.current = true;
      return;
    }

    url.searchParams.set(PROJECT_PARAM, id);
    // 첫 진입에서 쌓으면 뒤로가기가 주소만 다른 같은 화면으로 간다.
    window.history[mounted.current ? "pushState" : "replaceState"](
      null,
      "",
      url
    );
    mounted.current = true;
  }, [index]);
};
