import { Line } from "@react-three/drei";

import { INVENTORY_GRID } from "@/components/profile/object/InventoryGridEngine";

const { cols, rows, cellSize, originWorld } = INVENTORY_GRID;
const [ox, , oz] = originWorld;

const W = cols * cellSize;
const H = rows * cellSize;

const FLOOR_COLOR = "#111827";
const LINE_COLOR = "#fafafa";
const BORDER_COLOR = "#a7a7a7";

const InventoryGrid = () => {
  return (
    <group>
      {/* Floor plate */}
      <mesh position={[ox + W / 2, -0.06, oz + H / 2]} receiveShadow>
        <boxGeometry args={[W + 0.2, 0.1, H + 0.2]} />
        <meshBasicMaterial color={FLOOR_COLOR} transparent opacity={0.1} />
      </mesh>

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
