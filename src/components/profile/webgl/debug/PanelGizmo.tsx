import { useEffect, useRef, useState } from "react";
import { TransformControls } from "@react-three/drei";
import * as THREE from "three";

import { usePanelEditorStore } from "@/components/profile/store/usePanelEditorStore";
import { toScreen, toWorld } from "@/components/profile/webgl/scenes/fastcampusPanels";

/**
 * 선택한 판을 끌어 옮기는 기즈모.
 *
 * 기즈모는 월드 좌표, 배치는 화면 좌표라 `toScreen` 이 되돌린다.
 */
export const PanelGizmo = () => {
  const panels = usePanelEditorStore((s) => s.panels);
  const selectedId = usePanelEditorStore((s) => s.selectedId);
  const patch = usePanelEditorStore((s) => s.patch);

  const proxy = useRef<THREE.Object3D>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => setReady(true), []);

  useEffect(() => {
    const target = panels.find((p) => p.id === selectedId);
    if (!proxy.current || !target) return;
    proxy.current.position.set(...toWorld(...target.at));
    // panels 를 의존성에 넣으면 드래그 도중 제자리로 되돌려 손과 싸운다.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId]);

  const handleDrag = () => {
    if (!proxy.current) return;
    const { x, y, z } = proxy.current.position;
    const [right, up, depth] = toScreen([x, y, z]);
    const round = (v: number) => Number(v.toFixed(2));
    patch({ at: [round(right), round(up), round(depth)] });
  };

  return (
    <>
      <object3D ref={proxy} />
      {/* 첫 렌더에 붙이면 기즈모가 빈 참조를 잡는다. */}
      {ready && proxy.current && (
        <TransformControls
          object={proxy.current}
          mode="translate"
          onObjectChange={handleDrag}
        />
      )}
    </>
  );
};

export default PanelGizmo;
