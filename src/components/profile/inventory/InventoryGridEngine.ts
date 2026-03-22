// ─── Grid Config ────────────────────────────────────────────────────

export type GridConfig = {
  cols: number;
  rows: number;
  cellSize: number;
  originWorld: [number, number, number];
};

export const INVENTORY_GRID: GridConfig = {
  cols: 8,
  rows: 8,
  cellSize: 1,
  originWorld: [0, 0, 0],
};

// ─── Utils ──────────────────────────────────────────────────────────

/** Cell top-left corner → world XZ center of that cell */
export const gridToWorld = (
  gridX: number,
  gridY: number,
  config: GridConfig = INVENTORY_GRID
): [number, number, number] => {
  const { originWorld, cellSize } = config;
  return [
    originWorld[0] + (gridX + 0.5) * cellSize,
    originWorld[1],
    originWorld[2] + (gridY + 0.5) * cellSize,
  ];
};

/** Center of a multi-cell item */
export const gridItemCenter = (
  gridX: number,
  gridY: number,
  w: number,
  h: number,
  config: GridConfig = INVENTORY_GRID
): [number, number, number] => {
  const { originWorld, cellSize } = config;
  return [
    originWorld[0] + (gridX + w / 2) * cellSize,
    originWorld[1],
    originWorld[2] + (gridY + h / 2) * cellSize,
  ];
};

export const isWithinBounds = (
  gridX: number,
  gridY: number,
  w: number,
  h: number,
  config: GridConfig = INVENTORY_GRID
): boolean =>
  gridX >= 0 &&
  gridY >= 0 &&
  gridX + w <= config.cols &&
  gridY + h <= config.rows;

type PlacedItem = {
  id: string;
  gridX: number;
  gridY: number;
  w: number;
  h: number;
};

export const canPlace = (
  existing: PlacedItem[],
  candidate: PlacedItem,
  config: GridConfig = INVENTORY_GRID
): boolean => {
  if (
    !isWithinBounds(
      candidate.gridX,
      candidate.gridY,
      candidate.w,
      candidate.h,
      config
    )
  ) {
    return false;
  }
  for (const item of existing) {
    if (item.id === candidate.id) continue;
    const overlapX =
      candidate.gridX < item.gridX + item.w &&
      candidate.gridX + candidate.w > item.gridX;
    const overlapY =
      candidate.gridY < item.gridY + item.h &&
      candidate.gridY + candidate.h > item.gridY;
    if (overlapX && overlapY) return false;
  }
  return true;
};

/** Scan row-first for the first grid position that fits w×h */
export const findFirstAvailablePosition = (
  existing: PlacedItem[],
  w: number,
  h: number,
  config: GridConfig = INVENTORY_GRID
): { gridX: number; gridY: number } | null => {
  for (let gridY = 0; gridY + h <= config.rows; gridY++) {
    for (let gridX = 0; gridX + w <= config.cols; gridX++) {
      const candidate: PlacedItem = { id: '__temp__', gridX, gridY, w, h }
      if (canPlace(existing, candidate, config)) return { gridX, gridY }
    }
  }
  return null
}

// ─── Camera Targets ─────────────────────────────────────────────────

const { cols, rows, cellSize, originWorld } = INVENTORY_GRID;

export const GRID_CENTER: [number, number, number] = [
  originWorld[0] + (cols * cellSize) / 2,
  originWorld[1],
  originWorld[2] + (rows * cellSize) / 2,
];
