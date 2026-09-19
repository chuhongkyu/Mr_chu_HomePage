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

/**
 * 기즈모는 따로 떼어 실어 나른다. 정적으로 가져오면 개발용 코드가
 * 프로덕션 번들에 그대로 들어간다. 이러면 편집기를 켤 때만 받아 온다.
 */
const PanelGizmo = dynamic(
  () => import("@/components/profile/webgl/debug/PanelGizmo"),
  { ssr: false }
);

/**
 * 패스트캠퍼스 온라인 강의.
 *
 * 크림슨 배경에 강의 화면을 담은 유리판을 좌우로 세운다. 강의가 어떤
 * 모습이었는지를 스크린샷 자체가 말하게 두고, 글은 거들기만 한다.
 *
 * 배치는 `fastcampusPanels.ts` 에 있다. 개발 중에 `?panels=edit` 를 붙이면
 * 기즈모로 끌어 옮기고 그 결과를 코드로 복사할 수 있다. 조작판은 캔버스
 * 밖에 뜬다(`Scene.tsx`).
 *
 * 격자를 깔지 않는다. 다른 씬은 물건이 놓인 자리를 보여주려고 격자가
 * 필요했지만, 여기는 판이 공중에 뜬 구성이라 바닥이 있으면 오히려
 * 판들이 어디에 붙어 있는지 되묻게 된다.
 */
export const FastcampusScene = () => {
  const panels = usePanelEditorStore((s) => s.panels);
  const editing = usePanelEditing();

  const groups = useRef<(THREE.Group | null)[]>([]);
  const started = useRef(false);

  /**
   * 뒤에 있는 판부터 하나씩 튀어나온다.
   *
   * 앞에서부터 놓으면 큰 판이 먼저 화면을 채운 뒤 뒤에서 잔챙이가 끼어드는
   * 꼴이 된다. 뒤부터 놓으면 공간이 먼저 서고 내용이 나중에 도착한다.
   * gsap 은 넘긴 차례대로 어긋내므로, 깊이로 줄을 세워 건네면 된다.
   *
   * 효과 훅이 아니라 ref 콜백에서 부른다. 부모의 `useLayoutEffect` 안에서
   * 자식 ref 를 읽으면, 하나라도 아직 안 붙었을 때 대상이 비어 아무 일도
   * 일어나지 않는다. 마지막 판이 붙는 순간을 잡으면 그 가정이 필요 없다.
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

    // 아직 다 안 붙었다. 다음 판이 붙을 때 다시 온다.
    if (targets.length < all.length) return;

    started.current = true;

    const scales = targets
      .sort((a, b) => a.depth - b.depth)
      .map((entry) => entry.group.scale);

    // 그려지기 전에 0 으로 만든다. 첫 프레임에 제 크기로 번쩍이지 않는다.
    scales.forEach((scale) => scale.setScalar(0));
    gsap.to(scales, { x: 1, y: 1, z: 1, ...APPEAR });
  }, []);

  // 씬을 떠나면 다음에 들어올 때 다시 돈다.
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
            titleSize={panel.titleSize}
            bodySize={panel.bodySize}
            // 편집 중에는 띄우지 않는다. 판이 흔들리면 기즈모와 어긋난다.
            float={!editing}
          />
        );
      })}

      {/* 자체 `Suspense` 로 감싼다. 기즈모는 지연 로드라 처음 그릴 때
          멈추는데, 그대로 두면 바깥 `Suspense`(Scene.tsx)까지 올라가
          씬 전체가 버려졌다 다시 붙는다. 그 사이 판의 ref 가 떨어져
          등장 애니메이션이 통째로 날아간다. */}
      {editing && (
        <Suspense fallback={null}>
          <PanelGizmo />
        </Suspense>
      )}
    </>
  );
};

export default FastcampusScene;
