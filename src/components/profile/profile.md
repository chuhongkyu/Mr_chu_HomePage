# Profile – Inventory System

## 규칙
- 스타일: SCSS modules (`.module.scss`) 사용, styled-components 사용 금지
- import 경로: `@/components/...` 형식 사용

## 구조

```
profile/
├── Scene.tsx                          # Canvas + InventoryLayer
├── Scene.module.scss
├── ItemModels.tsx                     # pendingObjects.map → InventoryItem (key=id)
├── ProfileContainer.tsx               # next/dynamic ssr:false
├── common/
│   ├── CameraManager.tsx              # Perspective / Isometric + OrbitControls + lerp
│   ├── Lights.tsx                     # ambient + directional (target [0,0,0])
│   └── FloatingButtons.tsx            # 카메라 토글 + 인벤토리 열기
├── object/                            # 데이터 / 그리드 엔진
│   ├── profileItems.ts                # 아이템 정의 (code, label, color, w, h, height)
│   └── InventoryGridEngine.ts         # 그리드 config + 좌표 변환 + 충돌 계산
├── inventory/
│   ├── InventoryGrid.tsx              # 그리드 바닥 + 셀 라인 렌더링
│   ├── InventoryItem.tsx              # 3D 박스 메쉬 + label + scene 드래그
│   ├── InventoryDragPreview.tsx       # 드래그 중 반투명 미리보기
│   ├── InventorySceneRaycaster.tsx    # useFrame 레이캐스트 → updateDrag
│   ├── InventoryBottomSheet.tsx       # 바텀시트 UI (아이템 목록 + undo/redo)
│   ├── ProfileDragDropManager.tsx     # HTML 드래그 컨텍스트 (인벤토리 → 씬)
│   └── dragScreenPosition.ts         # 모듈-level 공유 포인터 좌표
└── store/
    ├── useInventoryStore.ts           # cameraMode 토글
    └── useProfilePlacementStore.ts   # 배치 상태 + undo/redo + localStorage persist
```

## 그리드

| 속성 | 값 |
|------|----|
| cols × rows | 12 × 12 |
| cellSize | 4 world unit |
| 전체 크기 | 48 × 48 world unit |
| originWorld | `[-24, 0, -24]` |
| GRID_CENTER | `[0, 0, 0]` |

- 아이템 `w`, `h`는 그리드 셀 단위 (1 = 4 world unit)
- 메쉬 크기: `w * cellSize`, `h * cellSize`
- `INVENTORY_GRID` 상수 하나로 전체 그리드 제어

## 카메라

| 모드 | 타입 | 특징 |
|------|------|------|
| Perspective | `PerspectiveCamera` fov=30 | 기본, 회전 가능 |
| Isometric | `OrthographicCamera` zoom=70 | 버튼 토글, 회전 비활성화 |

- 인벤토리 열리면 카메라 자동 줌아웃 + 회전/줌 잠금
- 카메라 이동은 `useFrame` lerp 처리

## 배치 스토어 (useProfilePlacementStore)

- `pendingObjects`: 항상 배열 (렌더링 소스), `onRehydrateStorage`에서 초기화
- `placedObjects`: localStorage 저장용, `closeInventory(true)` 시에만 업데이트
- `cancelSnapshot`: 인벤토리 열 때 저장, 취소 시 복원
- undo/redo: 최대 20 스텝
- persist key: `profile-placement`

## 라이트

- `DirectionalLight` position `[20, 30, 20]` → target `[0, 0, 0]`
- shadow camera `±30` (48×48 그리드 커버)
- shadowMap `1024×1024`

## 아이템 추가

`src/components/profile/object/profileItems.ts`에 추가:

```ts
{ code: 'newitem', label: 'New Item', color: '#hex', w: 1, h: 1, height: 4.0 }
```

- `w`, `h`: 그리드 셀 단위
- `height`: world unit (cellSize 고려해서 설정)
