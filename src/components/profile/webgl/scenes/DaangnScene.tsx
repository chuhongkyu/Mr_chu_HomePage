import { Suspense, useState } from "react";
import dynamic from "next/dynamic";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import type { ProjectContentProps } from "@/components/profile/constants/projects";
import { CAMERA } from "@/components/profile/constants/sceneConfig";
import {
  GENAIMO_BAND,
  IMAGE_SWAP_BAND,
} from "@/components/profile/constants/zoomStages";
import { SceneHotspot } from "@/components/profile/webgl/common/SceneHotspot";
import { useStageEditing } from "@/components/profile/webgl/debug/useStageEditing";
import {
  APPEAR_SECONDS,
  CLOSE_ZONE_UV,
  closeImagePoint,
  DaangnApart,
} from "@/components/profile/webgl/object/DaangnApart";
import { color } from "@/style/tokens.generated";

/**
 * 당근이네. 아이소메트릭으로 그려진 PNG 두 장(근경·도시 전경)과
 * 구역 핫스팟 셋으로 이뤄진다.
 *
 * 핫스팟 좌표는 그림 위 UV 라 이미지가 바뀌면 `CLOSE_ZONE_UV` 만 다시 재면 된다.
 */
/** 구역과 구역 사이 간격(초). */
const ZONE_STAGGER = 0.12;

const StageGizmo = dynamic(
  () => import("@/components/profile/webgl/debug/StageGizmo"),
  { ssr: false }
);

export const DaangnScene = ({ onOpenArticle }: ProjectContentProps) => {
  const editingStage = useStageEditing();

  const [zonesShown, setZonesShown] = useState(true);
  useFrame(({ camera, size }) => {
    const ortho = camera as THREE.OrthographicCamera;
    if (!ortho.isOrthographicCamera) return;

    // 점은 근경 그림 위에 찍혀 있다. 그림이 있는 동안만 뜬다.
    const viewHeight = size.height / ortho.zoom;
    const show =
      viewHeight > GENAIMO_BAND[0] && viewHeight < IMAGE_SWAP_BAND[0];
    setZonesShown((prev) => (prev === show ? prev : show));
  });

  return (
    <>
      {/* 화면 가운데에 오도록 카메라 target 에 맞춘다. */}
      <DaangnApart position={[...CAMERA.target]}>
        <SceneHotspot
          position={closeImagePoint(...CLOSE_ZONE_UV.garden)}
          appearDelay={APPEAR_SECONDS}
          label="Garden"
          index="01"
          accent={color.daangn.garden}
          media="/assets/img/daangn/garden.gif"
          mediaAlt="옥상 텃밭"
          description="작물에 물을 주려면 당근의 다른 서비스를 다녀와야 해요. 접속해 있지 않아도 시간이 지나면 자랍니다."
          onMore={onOpenArticle}
          hidden={!zonesShown}
        />
        <SceneHotspot
          position={closeImagePoint(...CLOSE_ZONE_UV.room)}
          appearDelay={APPEAR_SECONDS + ZONE_STAGGER}
          label="Room"
          index="02"
          accent={color.daangn.room}
          media="/assets/img/daangn/room.gif"
          mediaAlt="당근이네 방"
          description="당근이가 자고, 먹고, 돌아다니는 공간. 사용자가 조종하지 않는 살아있는 친구처럼 행동해요."
          onMore={onOpenArticle}
          hidden={!zonesShown}
          direction="left"
        />
        <SceneHotspot
          // 잰 중심보다 조금 위. 노랑 마당이 아래로 넓어서 중심이 처진다.
          position={closeImagePoint(...CLOSE_ZONE_UV.fleamarket, {
            offsetY: 1,
          })}
          appearDelay={APPEAR_SECONDS + ZONE_STAGGER * 2}
          label="Fleamarket"
          index="03"
          accent={color.daangn.fleamarket}
          media="/assets/img/daangn/fleamarket.gif"
          mediaAlt="나눔장터"
          description="혼자 탐험하는 걸 넘어, 사용자끼리 편지를 주고받으며 상호작용하는 공간이에요."
          onMore={onOpenArticle}
          hidden={!zonesShown}
          // 그림 맨 아래라 아래로 펴면 반드시 잘린다.
          placement="up"
        />
      </DaangnApart>

      {editingStage && (
        <group position={[...CAMERA.target]}>
          <Suspense fallback={null}>
            <StageGizmo />
          </Suspense>
        </group>
      )}
    </>
  );
};

export default DaangnScene;
