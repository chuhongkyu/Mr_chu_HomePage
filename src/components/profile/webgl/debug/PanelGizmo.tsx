import { useEffect, useRef, useState } from "react";
import { TransformControls } from "@react-three/drei";
import * as THREE from "three";

import { usePanelEditorStore } from "@/components/profile/store/usePanelEditorStore";
import { toScreen, toWorld } from "@/components/profile/webgl/scenes/fastcampusPanels";

/**
 * 선택한 판을 끌어 옮기는 기즈모. 캔버스 안에 산다.
 *
 * 기즈모는 월드 좌표로 움직이는데 배치는 화면 좌표로 적혀 있다. `toScreen`
 * 이 되돌려서, 끌어 놓은 결과가 그대로 코드에 붙는 숫자가 된다.
 *
 * drei 의 TransformControls 는 `makeDefault` 로 등록된 OrbitControls 를
 * 드래그 동안 알아서 꺼 준다. 따로 막지 않아도 된다.
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
    // 선택이 바뀔 때만 기즈모를 옮긴다. panels 를 의존성에 넣으면 드래그
    // 도중 매 프레임 제자리로 되돌려서 손과 싸운다.
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
      {/* `ready` 를 한 번 거친 뒤에야 proxy 가 채워진다. 첫 렌더에 붙이면
          기즈모가 빈 참조를 잡는다. */}
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
