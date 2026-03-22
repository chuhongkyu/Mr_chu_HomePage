# Profile – Inventory System

## 규칙
- 스타일: SCSS modules (`.module.scss`) 사용, styled-components 사용 금지
- import 경로: `@/components/...` 형식 사용

## 구조

```
profile/
├── Scene.tsx                   # Canvas + 카메라 토글 버튼 UI
├── Scene.module.scss           # Scene 스타일
├── common/
│   ├── CameraManager.tsx       # Perspective / Isometric 카메라 + OrbitControls
│   └── Lights.tsx              # ambient + directional + point light
├── inventory/
│   ├── InventoryGridEngine.ts  # 그리드 수치 계산 (pure functions)
│   ├── InventoryGrid.tsx       # 그리드 바닥 + 셀 라인 렌더링
│   └── InventoryItem.tsx       # 아이템 3D 박스 (label 포함)
└── store/
    └── useInventoryStore.ts    # zustand – items, cameraMode
```

## 그리드

- 기본 크기: `6 cols × 8 rows`, `cellSize = 1 unit`
- origin: `[0, 0, 0]`
- 아이템은 `gridX, gridY` + `w, h`(cell 단위)로 위치 표현
- `INVENTORY_GRID` 상수를 바꾸면 전체 그리드 크기가 변경됨

## 카메라

| 모드        | 카메라 타입        | 특징                            |
|-------------|--------------------|---------------------------------|
| Perspective | `PerspectiveCamera` fov=55 | 기본 모드, 회전 가능   |
| Isometric   | `OrthographicCamera` zoom=70 | 버튼 토글, 회전 비활성화 |

우측 상단 버튼으로 모드 전환.

## 아이템 추가

```ts
useInventoryStore.getState().addItem({
  id: 'unique-id',
  code: 'item-code',
  label: 'Item Name',
  color: '#hex',
  gridX: 0, gridY: 0,
  w: 1, h: 1,
})
```

## 기본 아이템 타입 (예정)
- 벤치: `w=1, h=2` (또는 모델 기준)
- 박스: `w=1, h=1`
