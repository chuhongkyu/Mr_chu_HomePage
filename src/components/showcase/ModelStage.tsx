"use client";

import { ReactNode, Suspense, useState } from "react";
import {
  Bounds,
  Center,
  ContactShadows,
  Environment,
  Grid,
  OrbitControls,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import { color } from "@/style/tokens.generated";

export interface ModelStageProps {
  children: ReactNode;
  /** 씬의 기본 밝기. 프로덕션 Scene 과 같은 0.4 가 기본값. */
  ambientIntensity?: number;
  /** 그림자를 만드는 주광. 프로덕션과 같은 2 가 기본값. */
  keyLightIntensity?: number;
  /** drei 의 HDRI 프리셋. 금속/거친 재질의 반사를 확인할 때 바꾼다. */
  environment?: "city" | "dawn" | "forest" | "studio" | "sunset" | "warehouse";
  background?: string;
  /** 모델을 원점에 맞추고 바닥(y=0) 위에 앉힌다. */
  center?: boolean;
  /** 모델 바운딩 박스에 카메라를 자동으로 맞춘다. 끄면 `cameraPosition` 을 그대로 쓴다. */
  fit?: boolean;
  /** 자동 프레이밍 여백. 1 이면 화면에 꽉 찬다. */
  margin?: number;
  /** `fit` 이 꺼져 있을 때의 카메라 위치. 켜져 있으면 바라보는 방향만 결정한다. */
  cameraPosition?: [number, number, number];
  fov?: number;
  autoRotate?: boolean;
  grid?: boolean;
  contactShadow?: boolean;
}

/**
 * 3D 컴포넌트를 프로덕션 씬에서 떼어내 단독으로 렌더링하는 스테이지.
 *
 * 조명·환경·카메라를 props 로 노출해서, UI 컴포넌트의 variant 를 바꾸듯
 * 3D 컴포넌트의 렌더링 조건을 바꿔볼 수 있게 한다.
 * 조명 기본값은 `profile/webgl/common/Lights` 의 프로덕션 설정과 일치시켰다.
 *
 * 스토리마다 `scale` 을 손으로 맞추지 않는다. 이 저장소의 GLB 는 자연 크기가
 * 0.4(종이비행기)부터 193(스틱맨)까지 제각각이라 고정 배율은 의미가 없다.
 * 대신 `Bounds` 가 모델 바운딩 박스에 카메라를 맞추고, `Center top` 이
 * 모델 밑면을 바닥(y=0)에 앉힌다. 바닥 장식도 모델 크기를 따라간다.
 */
export function ModelStage({
  children,
  ambientIntensity = 0.4,
  keyLightIntensity = 2,
  environment = "city",
  background = color.sand[100],
  center = true,
  fit = true,
  margin = 1.4,
  cameraPosition = [3, 2, 4],
  fov = 45,
  autoRotate = true,
  grid = true,
  contactShadow = true,
}: ModelStageProps) {
  // 모델의 가로/세로 폭. 그리드와 그림자 크기를 여기에 비례시킨다.
  const [span, setSpan] = useState(1);

  const model = (
    <Center
      top
      disable={!center}
      onCentered={({ width, depth }) => setSpan(Math.max(width, depth, 0.001))}
    >
      {children}
    </Center>
  );

  return (
    <div style={{ width: "100%", height: "100vh", background }}>
      <Canvas shadows dpr={[1, 2]} camera={{ position: cameraPosition, fov }}>
        <ambientLight intensity={ambientIntensity} />
        <directionalLight
          position={[15, 15, 0]}
          intensity={keyLightIntensity}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-bias={-0.001}
        />

        {/* Suspense 를 Bounds 바깥에 둔다. 안쪽에 있으면 GLTF 가 도착하기 전
            빈 그룹에 카메라를 맞춰버린다. */}
        <Suspense fallback={null}>
          {fit ? (
            <Bounds fit clip observe margin={margin}>
              {model}
            </Bounds>
          ) : (
            model
          )}
          <Environment preset={environment} />
        </Suspense>

        {contactShadow && (
          <ContactShadows
            position={[0, 0.001, 0]}
            opacity={0.35}
            scale={span * 4}
            blur={2}
            far={span * 2}
          />
        )}
        {grid && (
          <Grid
            args={[span * 10, span * 10]}
            cellSize={span / 2}
            cellColor={color.gray[300]}
            sectionSize={span * 2}
            sectionColor={color.brand[500]}
            fadeDistance={span * 20}
            infiniteGrid
          />
        )}

        <OrbitControls
          autoRotate={autoRotate}
          autoRotateSpeed={1.2}
          makeDefault
        />
      </Canvas>
    </div>
  );
}

export default ModelStage;
