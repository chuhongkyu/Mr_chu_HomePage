import type { Meta, StoryObj } from "@storybook/nextjs";

import { PaperAirplane } from "@/components/profile/webgl/object/PaperAirplane";
import { ModelStage, ModelStageProps } from "@/components/showcase/ModelStage";

const meta = {
  title: "3D/Objects/PaperAirplane",
  component: ModelStage,
  parameters: { layout: "fullscreen" },
  argTypes: { children: { table: { disable: true } } },
} satisfies Meta<typeof ModelStage>;

export default meta;
type Story = StoryObj<ModelStageProps>;

/** 자연 크기가 0.4 로 아주 작은 모델. `Bounds` 가 알아서 채워준다. */
export const Default: Story = {
  args: {
    children: <PaperAirplane />,
  },
};
