import type { Meta, StoryObj } from "@storybook/nextjs";

import { Seed } from "@/components/profile/webgl/object/Seed";
import { ModelStage } from "@/components/showcase/ModelStage";

/**
 * 씨앗. Blender 에서 구운 텍스처를 그대로 쓰는 `seed.glb`.
 *
 * `radius` 는 바닥에서 중심까지의 높이(= 모델 높이의 절반)를 뜻한다.
 * 모델 반높이(0.951)로 나눠 스케일을 만들기 때문에, 중심을 y=radius 에 두면
 * 바닥이 정확히 y=0 에 닿는다.
 */
const meta = {
  title: "3D/Objects/Seed",
  component: Seed,
  parameters: { layout: "fullscreen" },
  argTypes: {
    radius: { control: { type: "range", min: 0.1, max: 3, step: 0.05 } },
  },
  decorators: [
    (Story) => (
      <ModelStage>
        <Story />
      </ModelStage>
    ),
  ],
} satisfies Meta<typeof Seed>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { radius: 0.35 },
};
