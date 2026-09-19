"use client";

import { useEffect, useMemo, useRef } from "react";
import {
  OrbitControls,
  OrthographicCamera,
  PerspectiveCamera,
} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

import {
  CAMERA,
  DEFAULT_ELEVATION,
  elevationToPolar,
  orbitPosition,
  perspectiveDistance,
} from "@/components/profile/constants/sceneConfig";
import { getSlideConfig } from "@/components/profile/constants/slideConfig";
import { usePlayerStore } from "@/components/profile/store/usePlayerStore";
import { useCurrentScene } from "@/components/profile/store/useSceneStore";

export type CameraMode = "orthographic" | "perspective";

type Props = {
  /**
   * 직교 카메라는 원근 왜곡이 없어서 3인칭 아이소메트릭처럼 보인다.
   * 크기를 정하는 건 거리가 아니라 zoom 이다.
   */
  mode?: CameraMode;
};

const CameraManager = ({ mode = "orthographic" }: Props) => {
  const controlsRef = useRef<OrbitControlsImpl>(null);

  // 직교 zoom 을 캔버스 높이에서 역산한다.
  // 고정값으로 두면 화면이 커질수록 담기는 월드 양이 늘어난다.
  // 담을 높이는 씬마다 다를 수 있다.
  const viewportHeight = useThree((state) => state.size.height);
  const scene = useCurrentScene();
  const viewHeight = scene.viewHeight ?? CAMERA.orthoViewHeight;

  // 투영 방식은 씬이 정한다. prop 은 남겨두되 씬 값이 우선이다.
  const isOrthographic = (scene.projection ?? mode) === "orthographic";
  const orthoZoom = viewportHeight / viewHeight;

  // 앙각도 씬마다 다를 수 있다. 높이면 더 위에서, 음수면 아래에서 올려다본다.
  const elevation = scene.elevation ?? DEFAULT_ELEVATION;
  const polar = elevationToPolar(elevation);

  // 원근에서는 거리가 곧 화각이라 담을 높이에서 역산한다.
  // 직교는 거리와 크기가 무관하므로 기본 거리를 그대로 쓴다.
  const perspectiveDist = perspectiveDistance(viewHeight, CAMERA.fov);
  const cameraPosition = useMemo(
    () =>
      orbitPosition(
        CAMERA.target,
        elevation,
        isOrthographic ? undefined : perspectiveDist
      ),
    [elevation, isOrthographic, perspectiveDist]
  );

  const [panMin, panMax, clamped] = useMemo(() => {
    const [tx, ty, tz] = CAMERA.target;
    return [
      new THREE.Vector3(
        tx - CAMERA.panRangeXZ,
        ty - CAMERA.panRangeDown,
        tz - CAMERA.panRangeXZ
      ),
      new THREE.Vector3(
        tx + CAMERA.panRangeXZ,
        ty + CAMERA.panRangeUp,
        tz + CAMERA.panRangeXZ
      ),
      new THREE.Vector3(),
    ];
  }, []);
  const currentPostId = usePlayerStore((s) => s.currentPostId);

  const currentPostIdRef = useRef(currentPostId);
  useEffect(() => {
    currentPostIdRef.current = currentPostId;
  }, [currentPostId]);

  useFrame(() => {
    const ctrl = controlsRef.current as any;
    if (!ctrl) return;
    if (typeof ctrl.getAzimuthalAngle !== "function") return;
    if (typeof ctrl.setAzimuthalAngle !== "function") return;

    const offset =
      getSlideConfig(currentPostIdRef.current)?.camera?.azimuthOffset ?? 0;
    const target = CAMERA.initialAzimuth + offset;

    const current = ctrl.getAzimuthalAngle();
    const diff = target - current;
    if (Math.abs(diff) >= 0.001) {
      ctrl.setAzimuthalAngle(current + diff * CAMERA.azimuthLerpFactor);
    }

    // 팬 경계. OrbitControls 에는 없는 기능이라 직접 target 을 가둔다.
    // 카메라도 같은 양만큼 옮겨야 보고 있는 각도가 유지된다.
    const t = ctrl.target as THREE.Vector3;
    clamped.set(
      THREE.MathUtils.clamp(t.x, panMin.x, panMax.x),
      THREE.MathUtils.clamp(t.y, panMin.y, panMax.y),
      THREE.MathUtils.clamp(t.z, panMin.z, panMax.z)
    );
    if (!clamped.equals(t)) {
      ctrl.object.position.add(clamped.clone().sub(t));
      t.copy(clamped);
    }
  });

  return (
    <>
      {isOrthographic ? (
        // left/right/top/bottom 은 drei 가 캔버스 크기에서 채운다.
        <OrthographicCamera
          makeDefault
          zoom={orthoZoom}
          position={cameraPosition}
          near={CAMERA.near}
          far={CAMERA.far}
        />
      ) : (
        <PerspectiveCamera
          makeDefault
          fov={CAMERA.fov}
          position={CAMERA.position}
          near={CAMERA.near}
          far={CAMERA.far}
        />
      )}
      <OrbitControls
        // 카메라를 바꾸면 컨트롤도 새 카메라에 다시 붙어야 한다.
        key={mode}
        ref={controlsRef}
        target={CAMERA.target}
        enableZoom
        // 아이소메트릭에서는 회전 대신 팬으로 돌아다닌다.
        // 좌드래그를 팬에 주지 않으면, 극각이 고정되고 방위각은 매 프레임
        // 되돌려지기 때문에 캔버스를 끌어도 아무 반응이 없다.
        enablePan
        // 화면이 아니라 바닥면을 따라 밀린다. 아이소메트릭에서 자연스럽다.
        screenSpacePanning={false}
        mouseButtons={{
          LEFT: THREE.MOUSE.PAN,
          MIDDLE: THREE.MOUSE.DOLLY,
          RIGHT: THREE.MOUSE.PAN,
        }}
        touches={{ ONE: THREE.TOUCH.PAN, TWO: THREE.TOUCH.DOLLY_PAN }}
        enableRotate={false}
        // 직교에서는 거리가 크기와 무관하므로 zoom 으로 제한한다.
        // 한계도 역산된 zoom 에 비례시켜야 화면 크기와 무관하게 같은 비율이 된다.
        {...(isOrthographic
          ? {
              minZoom: orthoZoom * CAMERA.zoomOutRatio,
              maxZoom: orthoZoom * CAMERA.zoomInRatio,
              // 극각을 정등각으로 고정한다. 기울일 수 있으면 아이소메트릭이 깨진다.
              // 방위각은 열어둬서 슬라이드별 azimuthOffset 회전은 계속 동작한다.
              minPolarAngle: polar,
              maxPolarAngle: polar,
            }
          : {
              // 확대 금지. 시작 거리보다 가까이 오지 못하게 막는다.
              minDistance: perspectiveDist,
              maxDistance: perspectiveDist * 1.8,
              // 직교와 마찬가지로 시점 각도를 잠근다.
              minPolarAngle: polar,
              maxPolarAngle: polar,
            })}
        makeDefault
      />
    </>
  );
};

export default CameraManager;
