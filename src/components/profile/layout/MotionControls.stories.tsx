import type { Meta, StoryObj } from "@storybook/nextjs";

import MotionControls from "@/components/profile/layout/MotionControls";
import { color } from "@/style/tokens.generated";

/**
 * 캐릭터 밑에 가로로 눕는 모션 버튼들.
 *
 * 캐릭터는 캔버스 안, 버튼은 캔버스 밖이라 `useMotionStore` 로 잇는다.
 * 눌러보면 활성 버튼이 바뀐다 — 실제 씬에서는 그게 곧 재생 중인 클립이다.
 */
const meta = {
  title: "Daangn/MotionControls",
  component: MotionControls,
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <div
        style={{
          position: "relative",
          height: 260,
          background: color.slate[900],
        }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof MotionControls>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
