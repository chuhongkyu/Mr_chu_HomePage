import type { Meta, StoryObj } from "@storybook/nextjs";

import { Hat } from "@/components/profile/webgl/object/Hat";
import { ModelStage, ModelStageProps } from "@/components/showcase/ModelStage";

/**
 * Blender → GLB → R3F 로 넘어온 모델에 back-face ShaderMaterial 로 아웃라인을 입힌 컴포넌트.
 * postprocessing 의 Outline 대신 쉐이더를 쓰기 때문에 모델 단위로 켜고 끌 수 있고 비용이 싸다.
 *
 * 프로덕션에서 캐릭터가 쓰는 경로는 `Player` → `HatOnHead` → `Hats` 이고,
 * 거기에는 `scale.setScalar(10)` 이 붙어 있다. 그건 모자를 키우는 값이 아니라
 * 192 단위짜리 스틱맨 리그의 본 좌표계에 맞추는 보정값이다.
 * 캐릭터 밖에서는 의미가 없으므로 여기서는 쓰지 않는다 — 모델 자연 크기는 8.2 다.
 */
const meta = {
  title: "3D/Objects/Hat",
  component: ModelStage,
  parameters: { layout: "fullscreen" },
  argTypes: {
    margin: { control: { type: "range", min: 1, max: 4, step: 0.1 } },
    ambientIntensity: { control: { type: "range", min: 0, max: 3, step: 0.1 } },
    keyLightIntensity: {
      control: { type: "range", min: 0, max: 6, step: 0.1 },
    },
    fov: { control: { type: "range", min: 15, max: 90, step: 1 } },
    environment: {
      control: "select",
      options: ["city", "dawn", "forest", "studio", "sunset", "warehouse"],
    },
    children: { table: { disable: true } },
  },
} satisfies Meta<typeof ModelStage>;

export default meta;
type Story = StoryObj<ModelStageProps>;

export const Default: Story = {
  args: {
    children: <Hat />,
  },
};

/** 조명을 끄면 아웃라인 쉐이더만 남아 실루엣이 드러난다. */
export const OutlineOnly: Story = {
  args: {
    children: <Hat />,
    ambientIntensity: 0,
    keyLightIntensity: 0,
    environment: "studio",
    grid: false,
  },
};

/**
 * 같은 컴포넌트를 배치로 렌더링했을 때의 인스턴스 비용을 보기 위한 스토리.
 * 간격은 모델 자연 크기(최대변 8.2)를 기준으로 잡았다.
 */
export const Row: Story = {
  args: {
    children: (
      <>
        {Array.from({ length: 5 }, (_, i) => (
          <Hat key={i} position={[(i - 2) * 9, 0, 0]} />
        ))}
      </>
    ),
    autoRotate: false,
  },
};
