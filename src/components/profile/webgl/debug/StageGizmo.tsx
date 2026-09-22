import { useEffect, useRef, useState } from "react";
import { TransformControls } from "@react-three/drei";
import { createPortal, useThree } from "@react-three/fiber";
import * as THREE from "three";

import {
  type StageTarget,
  useStageEditorStore,
} from "@/components/profile/store/useStageEditorStore";
import BuildingVolume from "@/components/profile/webgl/object/BuildingVolume";
import SpawnMarker from "@/components/profile/webgl/object/SpawnMarker";

const round = (value: number) => Number(value.toFixed(2));

/**
 * 고른 대상을 끌어 옮기는 손잡이.
 *
 * 보이는 오브제 대신 빈 object3D 를 잡는다. 오브제를 직접 잡으면 드래그가
 * 만든 값을 다음 렌더가 store 값으로 되돌려 서로 밀어낸다.
 *
 * drei 의 TransformControls 는 `makeDefault` 로 등록된 OrbitControls 를
 * 드래그 동안 알아서 꺼 준다.
 */
const Handle = ({ target }: { target: StageTarget }) => {
  const patchBox = useStageEditorStore((s) => s.patchBox);
  const patchSpawn = useStageEditorStore((s) => s.patchSpawn);

  const scene = useThree((state) => state.scene);
  const proxy = useRef<THREE.Object3D>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => setReady(true), []);

  useEffect(() => {
    const object = proxy.current;
    if (!object) return;

    const { box, spawn } = useStageEditorStore.getState();
    if (target === "building") {
      object.position.set(...box.position);
      return;
    }
    object.position.set(...spawn.position);
    // 자리 잡을 때만 맞춘다. 드래그 도중 되돌아가면 안 된다.
  }, [ready, target]);

  const handleChange = () => {
    const object = proxy.current;
    if (!object) return;

    const position: [number, number, number] = [
      round(object.position.x),
      round(object.position.y),
      round(object.position.z),
    ];

    if (target === "building") {
      patchBox({ position });
      return;
    }
    patchSpawn({ position });
  };

  return (
    <>
      <object3D ref={proxy} />

      {/* 손잡이는 씬 루트에 단다. three 가 대상의 월드 좌표를 손잡이의 로컬
          좌표에 넣기 때문에, 옮겨 둔 그룹 안에 두면 그룹 이동이 한 번 더
          먹어서 기즈모만 카메라 타겟만큼 밀린다. */}
      {ready &&
        proxy.current &&
        createPortal(
          <TransformControls
            object={proxy.current}
            mode="translate"
            onObjectChange={handleChange}
          />,
          scene
        )}
    </>
  );
};

export const StageGizmo = () => {
  const target = useStageEditorStore((s) => s.target);

  return (
    <>
      <BuildingVolume />
      <SpawnMarker />
      {/* 대상이 바뀌면 손잡이를 새로 달아 그 자리로 옮긴다. */}
      <Handle key={target} target={target} />
    </>
  );
};

export default StageGizmo;
