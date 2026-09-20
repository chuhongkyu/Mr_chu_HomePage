import { Suspense, useCallback, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import type * as THREE from "three";

import { usePanelEditorStore } from "@/components/profile/store/usePanelEditorStore";
import GlassPanel from "@/components/profile/webgl/common/GlassPanel";
import { usePanelEditing } from "@/components/profile/webgl/debug/usePanelEditing";
import {
  AXIS_ROTATION,
  axisFor,
  toWorld,
} from "@/components/profile/webgl/scenes/fastcampusPanels";

/**
 * 판이 튀어나오는 연출.
 *
 * gsap 이 여러 대상을 한 번에 받고 `stagger` 로 알아서 어긋내 준다.
 * 판마다 지연 시간을 따로 계산해 넘길 이유가 없다.
 *
 * `back.out` 은 제 크기를 넘겼다 돌아온다. 그 넘김이 판을 딱딱한 판이 아니라
 * 튕겨 나온 것처럼 보이게 한다. 괄호 안 숫자가 곧 넘김의 양이다.
 *   0 → 안 넘김   1.2 → +5%   1.70158(gsap 기본) → +10%   2.5 → +19%
 */
const APPEAR = {
  duration: 0.5,
  ease: "back.out(1.2)",
  delay: 0.25,
  stagger: 0.02,
} as const;

/** 정적으로 가져오면 개발용 코드가 프로덕션 번들에 들어간다. */
const PanelGizmo = dynamic(
  () => import("@/components/profile/webgl/debug/PanelGizmo"),
  { ssr: false }
);

/**
 * 패스트캠퍼스 온라인 강의. 크림슨 배경에 강의 화면을 담은 유리판.
 *
 * 배치는 `fastcampusPanels.ts`. `?panels=edit` 로 끌어 옮길 수 있다.
 * 격자는 깔지 마라 — 공중에 뜬 구성이라 바닥이 있으면 되레 어색해진다.
 */
export const FastcampusScene = () => {
  const panels = usePanelEditorStore((s) => s.panels);
  const editing = usePanelEditing();

  const groups = useRef<(THREE.Group | null)[]>([]);
  const started = useRef(false);

  /**
   * 깊이 순으로 건넨다. gsap 이 넘긴 차례대로 어긋내므로 뒤쪽 판이 먼저 선다.
   *
   * 효과 훅이 아니라 ref 콜백에서 불러야 한다. 부모의 `useLayoutEffect` 에서
   * 자식 ref 를 읽으면 하나라도 안 붙었을 때 대상이 비어 조용히 지나간다.
   */
  const start = useCallback(() => {
    if (started.current) return;

    const all = usePanelEditorStore.getState().panels;
    const targets = all
      .map((panel, index) => ({
        depth: panel.at[2],
        group: groups.current[index],
      }))
      .filter((entry): entry is { depth: number; group: THREE.Group } =>
        Boolean(entry.group)
      );

    // 다음 판이 붙을 때 다시 온다.
    if (targets.length < all.length) return;

    started.current = true;

    const scales = targets
      .sort((a, b) => a.depth - b.depth)
      .map((entry) => entry.group.scale);

    // JSX 의 scale prop 으로 박으면 안 된다. R3F 가 렌더마다 다시 먹인다.
    scales.forEach((scale) => scale.setScalar(0));
    gsap.to(scales, { x: 1, y: 1, z: 1, ...APPEAR });
  }, []);

  useEffect(
    () => () => {
      started.current = false;
      gsap.killTweensOf(groups.current.map((group) => group?.scale));
    },
    []
  );

  return (
    <>
      {panels.map((panel, index) => {
        const position = toWorld(...panel.at);

        return (
          <GlassPanel
            key={panel.id}
            ref={(group) => {
              groups.current[index] = group;
              if (group) start();
            }}
            position={position}
            // 축을 배치에 적어 두지 않았으면 자리에서 뽑는다. 판을 옮겨도
            // 안쪽을 보게 따라오려면 위치가 정해진 뒤에 계산해야 한다.
            rotation={AXIS_ROTATION[panel.axis ?? axisFor(position)]}
            width={panel.width}
            height={panel.height}
            content={panel.content}
            href={panel.href}
            titleSize={panel.titleSize}
            bodySize={panel.bodySize}
            // 편집 중에는 띄우지 않는다. 판이 흔들리면 기즈모와 어긋난다.
          />
        );
      })}

      {/* 자체 Suspense 가 필요하다. 지연 로드가 바깥 Suspense(Scene.tsx)까지
          올라가면 씬이 통째로 버려졌다 다시 붙어 등장 연출이 날아간다. */}
      {editing && (
        <Suspense fallback={null}>
          <PanelGizmo />
        </Suspense>
      )}
    </>
  );
};

export default FastcampusScene;
