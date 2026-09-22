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
import {
  AXIS_ZOOM_SPEED,
  BASE_VIEW_HEIGHT,
  MAX_VIEW_HEIGHT,
  MIN_VIEW_HEIGHT,
  nearestStage,
  projectAt,
  SNAP_DELAY,
  stageFor,
  targetFor,
} from "@/components/profile/constants/zoomStages";
import { usePlayerStore } from "@/components/profile/store/usePlayerStore";
import {
  useCurrentProject,
  useSceneStore,
} from "@/components/profile/store/useSceneStore";
import { useZoomStore } from "@/components/profile/store/useZoomStore";

export type CameraMode = "orthographic" | "perspective";

type Props = {
  /**
   * 직교 카메라는 원근 왜곡이 없어서 3인칭 아이소메트릭처럼 보인다.
   * 크기를 정하는 건 거리가 아니라 zoom 이다.
   */
  mode?: CameraMode;
};

/**
 * 단계로 옮겨 가는 중인 줌.
 *
 * gsap 으로 하면 gsap 의 rAF 와 R3F 의 rAF 가 따로 돌아 프레임이 어긋난다.
 * 화면을 그리는 루프 안에서 직접 당겨야 매끄럽다.
 */
const ease = { to: null as number | null, zoom: 0 };

/** 클수록 빨리 붙는다. 9 면 0.5 초에 99% 간다. */
const EASE_LAMBDA = 9;

/** 줌에 따라 옮겨 가는 카메라 지점. 매 프레임 쓰므로 한 번만 만든다. */
const axisTarget: [number, number, number] = [0, 0, 0];

/**
 * 사용자가 팬으로 옮긴 양. 줌이 정하는 지점에 이걸 얹는다.
 *
 * 줌축에서는 보는 지점을 줌이 정하는데, 그렇다고 팬을 막으면 그림의 좌우와
 * 위아래를 볼 수 없다. 그래서 줌이 정한 자리를 원점으로 두고, 사용자가 민
 * 차이만 따로 들고 간다. 둘이 서로 덮어쓰지 않는다.
 */
const panOffset = new THREE.Vector3();
const applied = new THREE.Vector3();
const lastApplied = new THREE.Vector3();
const delta = new THREE.Vector3();
let primed = false;

export const resetAxisPan = () => {
  panOffset.set(0, 0, 0);
  primed = false;
};

/**
 * 줌축에 얹힌 씬에서 카메라를 몬다.
 *
 * 담는 세로가 상태이므로 카메라 zoom 은 손대지 않는다. 사용자가 굴리든
 * 내비가 트윈하든, 그 결과를 읽어 보는 지점만 따라 옮긴다.
 */
const driveAxis = (
  ctrl: { object: THREE.Camera; target: THREE.Vector3; update: () => void },
  viewportHeight: number,
  elevation: number,
  deltaSeconds: number
) => {
  const camera = ctrl.object as THREE.OrthographicCamera;
  if (!camera.isOrthographicCamera || camera.zoom <= 0) return;

  const { jump, request, take, takeJump, publish } = useZoomStore.getState();

  // 지난 프레임에 우리가 놓은 값과 다르면 사용자가 직접 굴린 것이다.
  // 가던 길을 버려야 손과 서로 밀어내지 않는다.
  if (ease.to != null && Math.abs(camera.zoom - ease.zoom) > 1e-4) {
    ease.to = null;
  }

  // 슬라이더를 끄는 중이면 그 값이 먼저다. 이동보다 즉각적이어야 한다.
  if (jump != null) {
    camera.zoom = viewportHeight / jump;
    camera.updateProjectionMatrix();
    takeJump();
    ease.to = null;
  }
  if (request != null) {
    ease.to = request;
    take();
  }

  if (ease.to != null) {
    const from = viewportHeight / camera.zoom;
    // 배수로 움직이는 값이라 로그에서 당긴다. 선형으로 당기면 확대 쪽이 느리다.
    const k = 1 - Math.exp(-EASE_LAMBDA * deltaSeconds);
    const next = Math.exp(
      Math.log(from) + (Math.log(ease.to) - Math.log(from)) * k
    );
    const done = Math.abs(next - ease.to) < ease.to * 0.002;

    camera.zoom = viewportHeight / (done ? ease.to : next);
    camera.updateProjectionMatrix();
    if (done) ease.to = null;
  }
  ease.zoom = camera.zoom;

  const viewHeight = viewportHeight / camera.zoom;
  publish(viewHeight);
  targetFor(viewHeight, axisTarget);

  // 지난 프레임에 우리가 놓은 자리에서 얼마나 밀렸는지가 곧 사용자의 팬이다.
  if (primed) {
    panOffset.add(delta.copy(ctrl.target).sub(lastApplied));
    panOffset.x = THREE.MathUtils.clamp(
      panOffset.x,
      -CAMERA.panRangeXZ,
      CAMERA.panRangeXZ
    );
    panOffset.y = THREE.MathUtils.clamp(
      panOffset.y,
      -CAMERA.panRangeDown,
      CAMERA.panRangeUp
    );
    panOffset.z = THREE.MathUtils.clamp(
      panOffset.z,
      -CAMERA.panRangeXZ,
      CAMERA.panRangeXZ
    );
  }

  applied.set(
    axisTarget[0] + panOffset.x,
    axisTarget[1] + panOffset.y,
    axisTarget[2] + panOffset.z
  );

  ctrl.target.copy(applied);
  camera.position.fromArray(
    orbitPosition([applied.x, applied.y, applied.z], elevation)
  );
  ctrl.update();

  lastApplied.copy(applied);
  primed = true;

  const id = projectAt(viewHeight);
  if (id) useSceneStore.getState().syncTo(id);
};

/**
 * 휠이 멎으면 가까운 단계로 붙인다.
 *
 * 단계 사이에 어중간하게 걸쳐 서면 어느 씬도 아닌 화면이 된다. 트윈 중이거나
 * 이미 단계에 서 있으면 아무것도 하지 않는다.
 */
const snapToStage = (
  settle: { height: number; idle: number },
  ctrl: { object: THREE.Camera },
  viewportHeight: number,
  deltaSeconds: number
) => {
  const camera = ctrl.object as THREE.OrthographicCamera;
  if (!camera.isOrthographicCamera || camera.zoom <= 0) return;

  const viewHeight = viewportHeight / camera.zoom;

  // 아직 굴리는 중이다.
  if (Math.abs(viewHeight - settle.height) > 0.01) {
    settle.height = viewHeight;
    settle.idle = 0;
    return;
  }
  // 이미 단계로 가고 있다.
  if (ease.to != null) return;

  settle.idle += deltaSeconds;
  if (settle.idle < SNAP_DELAY) return;

  const stage = nearestStage(viewHeight);
  // 이미 도착했다. 다시 부르면 트윈이 끊임없이 다시 선다.
  if (Math.abs(stage.viewHeight - viewHeight) < 0.05) return;

  settle.idle = 0;
  useZoomStore.getState().goTo(stage.viewHeight);
};

const CameraManager = ({ mode = "orthographic" }: Props) => {
  const controlsRef = useRef<OrbitControlsImpl>(null);

  // 직교 zoom 을 캔버스 높이에서 역산한다.
  // 고정값으로 두면 화면이 커질수록 담기는 월드 양이 늘어난다.
  // 담을 높이는 씬마다 다를 수 있다.
  const viewportHeight = useThree((state) => state.size.height);
  const scene = useCurrentProject();
  const viewHeight = scene.viewHeight ?? CAMERA.orthoViewHeight;
  // 보는 지점도 씬이 정할 수 있다. Genaimo 는 캐릭터가 선 자리를 본다.
  const target = scene.target ?? CAMERA.target;

  /**
   * 줌축에 얹힌 씬인지. 얹혀 있으면 담는 세로 하나가 상태를 정하고,
   * 카메라가 보는 지점도 줌을 따라 옮겨 간다.
   */
  const onAxis = Boolean(stageFor(scene.id));

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
        target,
        elevation,
        isOrthographic ? undefined : perspectiveDist
      ),
    [target, elevation, isOrthographic, perspectiveDist]
  );

  const [panMin, panMax, clamped] = useMemo(() => {
    const [tx, ty, tz] = target;
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
  }, [target]);
  const currentPostId = usePlayerStore((s) => s.currentPostId);

  const currentPostIdRef = useRef(currentPostId);
  useEffect(() => {
    currentPostIdRef.current = currentPostId;
  }, [currentPostId]);

  // 축을 벗어났다 돌아오면 팬을 처음부터 다시 잡는다.
  useEffect(() => {
    if (!onAxis) resetAxisPan();
  }, [onAxis]);

  /** 휠이 멎었는지 재는 자리. */
  const settle = useRef({ height: 0, idle: 0 });

  useFrame((_, deltaSeconds) => {
    const ctrl = controlsRef.current as any;
    if (!ctrl) return;

    if (onAxis) {
      driveAxis(ctrl, viewportHeight, elevation, deltaSeconds);
      snapToStage(settle.current, ctrl, viewportHeight, deltaSeconds);
      return;
    }

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
          // 줌축 위에서는 값이 바뀌지 않는 prop 을 준다. 씬마다 다른 값을
          // 주면 줌이 단계를 넘길 때 리렌더가 돌아 트윈 중인 zoom 을
          // 되돌려 버린다. R3F 는 바뀐 prop 만 다시 적용한다.
          zoom={onAxis ? viewportHeight / BASE_VIEW_HEIGHT : orthoZoom}
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
        target={target}
        enableZoom
        zoomSpeed={onAxis ? AXIS_ZOOM_SPEED : 1}
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
              // 줌축에 얹힌 씬은 단계 전체를 오갈 수 있어야 한다.
              minZoom: onAxis
                ? viewportHeight / MAX_VIEW_HEIGHT
                : orthoZoom * CAMERA.zoomOutRatio,
              maxZoom: onAxis
                ? viewportHeight / MIN_VIEW_HEIGHT
                : orthoZoom * CAMERA.zoomInRatio,
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
