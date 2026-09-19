import type { Meta, StoryObj } from "@storybook/nextjs";

import SceneBadge from "@/components/profile/layout/SceneBadge";
import { color } from "@/style/tokens.generated";

/**
 * 헤더에서 현재 씬을 알려주는 표식.
 *
 * 헤더의 다른 요소(네비 버튼·코인)는 전부 둥근 알약 꼴이라,
 * 여기만 각진 사각형으로 둬서 조작 버튼이 아니라 상태 표시라는 걸
 * 형태로 구분되게 했다.
 */
const meta = {
  title: "Daangn/SceneBadge",
  component: SceneBadge,
  parameters: { layout: "centered" },
  argTypes: { accent: { control: "color" } },
} satisfies Meta<typeof SceneBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

/** 실제 헤더에 쓰는 형태. */
export const Default: Story = {
  args: { label: "당근이네" },
};

/** 씬 색을 주면 라벨 앞에 작은 사각 표식이 붙는다. */
export const WithAccent: Story = {
  args: { label: "당근이네", accent: color.daangn.garden },
};
