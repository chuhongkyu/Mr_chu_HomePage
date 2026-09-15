import type { Meta, StoryObj } from "@storybook/nextjs";

import { Cluster } from "@/components/profile/webgl/object/Cluster";
import { ModelStage } from "@/components/showcase/ModelStage";
import { color } from "@/style/tokens.generated";

/**
 * emissive 색상과 세기를 props 로 받는 3D 컴포넌트.
 * UI 컴포넌트의 `variant` 와 같은 역할을 3D 에서 하는 예시다.
 */
const meta = {
  title: "3D/Objects/Cluster",
  component: Cluster,
  parameters: { layout: "fullscreen" },
  argTypes: {
    emissiveColor: { control: "color" },
    emissiveIntensity: {
      control: { type: "range", min: 0, max: 5, step: 0.1 },
    },
  },
  decorators: [
    (Story) => (
      <ModelStage background={color.slate[900]} grid={false}>
        <Story />
      </ModelStage>
    ),
  ],
} satisfies Meta<typeof Cluster>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { emissiveColor: "#00aaff", emissiveIntensity: 0.8 },
};

/** 디자인 토큰의 브랜드 컬러를 그대로 3D 재질에 넘긴 경우. */
export const BrandTinted: Story = {
  args: { emissiveColor: color.brand[500], emissiveIntensity: 2.4 },
};

export const Unlit: Story = {
  args: { emissiveIntensity: 0 },
};
