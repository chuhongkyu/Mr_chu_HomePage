import type { Meta, StoryObj } from "@storybook/nextjs";

import { Apartment } from "@/components/profile/webgl/object/Apartment";
import { ModelStage } from "@/components/showcase/ModelStage";

/**
 * 당근 경험 씬의 아파트.
 *
 * `height` 는 월드 기준 건물 높이다. 모델 자연 높이(1.903)로 나눠 스케일을
 * 만들고, 중심이 원점이라 절반만큼 올려서 바닥을 y=0 에 맞춘다.
 *
 * 실제 씬은 직교 카메라가 세로 22 유닛을 담으므로, `height: 10` 이면
 * 화면 세로의 약 66% 를 차지한다.
 */
const meta = {
  title: "3D/Objects/Apartment",
  component: Apartment,
  parameters: { layout: "fullscreen" },
  argTypes: {
    height: { control: { type: "range", min: 2, max: 20, step: 0.5 } },
  },
  decorators: [
    (Story) => (
      <ModelStage>
        <Story />
      </ModelStage>
    ),
  ],
} satisfies Meta<typeof Apartment>;

export default meta;
type Story = StoryObj<typeof meta>;

/** 실제 씬에 세운 크기. */
export const Default: Story = {
  args: { height: 10 },
};
