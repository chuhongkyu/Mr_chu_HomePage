import { Line } from "@react-three/drei";

import { INVENTORY_GRID } from "@/components/profile/object/InventoryGridEngine";

const { cols, rows, cellSize, originWorld } = INVENTORY_GRID;
const [ox, , oz] = originWorld;

const W = cols * cellSize;
const H = rows * cellSize;

const LINE_COLOR = "#fafafa";
const BORDER_COLOR = "#fafafa";

const InventoryGrid = () => {
  return (
    <group>
      {/* Vertical lines */}
      {Array.from({ length: cols + 1 }, (_, i) => (
        <Line
          key={`v-${i}`}
          points={[
            [ox + i * cellSize, 0, oz],
            [ox + i * cellSize, 0, oz + H],
          ]}
          color={i === 0 || i === cols ? BORDER_COLOR : LINE_COLOR}
          lineWidth={i === 0 || i === cols ? 2 : 1}
        />
      ))}

      {/* Horizontal lines */}
      {Array.from({ length: rows + 1 }, (_, i) => (
        <Line
          key={`h-${i}`}
          points={[
            [ox, 0, oz + i * cellSize],
            [ox + W, 0, oz + i * cellSize],
          ]}
          color={i === 0 || i === rows ? BORDER_COLOR : LINE_COLOR}
          lineWidth={i === 0 || i === rows ? 2 : 1}
        />
      ))}
    </group>
  );
};

export default InventoryGrid;
