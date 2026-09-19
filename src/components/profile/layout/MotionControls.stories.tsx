import type { Meta, StoryObj } from "@storybook/nextjs";

import MotionControls from "@/components/profile/layout/MotionControls";

import styles from "@/components/profile/layout/MotionControls.stories.module.scss";

/**
 * 캐릭터 발밑에 놓이는 모션 칩.
 *
 * 실제 씬에서는 `Html` 로 캐릭터 좌표에 붙어서 팬·줌을 같이 따라간다.
 * 화면 고정 오버레이로 두면 캐릭터를 옮겼을 때 따로 놀아서
 * 어느 캐릭터의 조작인지 흐려진다.
 *
 * 칩 자체는 순수 DOM 이라 Canvas 없이 렌더된다. 눌러보면 활성 칩이 바뀐다.
 */
const meta = {
  title: "Daangn/MotionControls",
  component: MotionControls,
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <div className={styles.stage}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof MotionControls>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
