import type { Meta, StoryObj } from "@storybook/nextjs";

import { DaangnApart } from "@/components/profile/webgl/object/DaangnApart";
import { ModelStage } from "@/components/showcase/ModelStage";
import { color } from "@/style/tokens.generated";

/**
 * 당근이네 아파트. 3D 모델이 아니라 아이소메트릭으로 그려진 PNG 두 장이다.
 *
 * 실제 씬에서는 카메라 zoom 에 따라 근경 ↔ 도시 전경이 섞인다.
 * 여기 스테이지는 직교 카메라가 아니라 원근이라 항상 근경만 보인다.
 * 크로스페이드는 실제 사이트에서 휠을 굴려 확인할 것.
 *
 * 두 이미지의 건물 중심은 픽셀에서 직접 재서 맞췄다.
 * 건물 안쪽만 채색돼 있고 나머지는 회색조라 채도로 분리된다.
 *   근경   건물이 이미지 높이의 82.3%, 중심 0.5035
 *   전경   건물이 이미지 높이의 26.1%, 중심 0.4837
 */
const meta = {
  title: "3D/Objects/DaangnApart",
  component: DaangnApart,
  parameters: { layout: "fullscreen" },
  argTypes: {
    closeHeight: { control: { type: "range", min: 4, max: 40, step: 0.5 } },
    wideHeight: { control: { type: "range", min: 4, max: 90, step: 1 } },
    position: { table: { disable: true } },
  },
  decorators: [
    (Story) => (
      <ModelStage
        background={color.daangn.backdrop}
        cameraPosition={[14, 10, 26]}
        fit={false}
        center={false}
        grid={false}
        contactShadow={false}
        autoRotate={false}
      >
        <Story />
      </ModelStage>
    ),
  ],
} satisfies Meta<typeof DaangnApart>;

export default meta;
type Story = StoryObj<typeof meta>;

/** 실제 씬 기본값. */
export const Default: Story = {
  args: { closeHeight: 22, wideHeight: 52, position: [0, 0, 0] },
};
