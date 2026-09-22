export const STICKMAN_MODEL_PATH = "/assets/models/stickman-draco.glb";

/**
 * 모델 자연 키. bbox 는 169.3 × 192.9 × 42.7 이고 원점이 발밑이다.
 * 그래서 position 의 y 가 곧 발이 닿는 높이다.
 */
export const STICKMAN_MODEL_HEIGHT = 192.9;

/** 모델 단위가 커서 그대로 두면 화면을 넘긴다. */
export const STICKMAN_SCALE = 0.06;

/** 배율까지 먹인 월드 키. 다른 씬에서 크기를 견줄 때 기준이 된다. */
export const STICKMAN_HEIGHT = STICKMAN_MODEL_HEIGHT * STICKMAN_SCALE;
