import type { Meta, StoryObj } from "@storybook/nextjs";

import { RainbowEnergyParticles } from "@/components/profile/webgl/common/RainbowEnergyParticles";
import { ModelStage } from "@/components/showcase/ModelStage";
import { color } from "@/style/tokens.generated";

/**
 * 원형 스프라이트가 무지개색으로 솟아오르며 사라지는 에너지 파티클.
 *
 * 애니메이션은 gsap 타임라인이 아니라 `useFrame` 으로 돌린다. 이 저장소의
 * 다른 이펙트(`JumpTrailEffect`, `LightningRing`)와 같은 방식이고,
 * 파티클마다 타임라인 인스턴스를 만들지 않아도 된다.
 *
 * 스테이지의 자동 프레이밍(`fit`)과 정렬(`center`)은 꺼둔다.
 * 파티클이 매 프레임 움직여서 바운딩 박스가 계속 바뀌기 때문이다.
 */
const meta = {
  title: "3D/Effects/RainbowEnergyParticles",
  component: RainbowEnergyParticles,
  parameters: { layout: "fullscreen" },
  argTypes: {
    count: { control: { type: "range", min: 1, max: 120, step: 1 } },
    radius: { control: { type: "range", min: 0.1, max: 6, step: 0.1 } },
    columnHeight: { control: { type: "range", min: 0, max: 30, step: 0.5 } },
    duration: { control: { type: "range", min: 0.2, max: 6, step: 0.1 } },
    initialScale: { control: { type: "range", min: 0.1, max: 5, step: 0.1 } },
    finalScale: { control: { type: "range", min: 0.1, max: 10, step: 0.1 } },
    maxOpacity: { control: { type: "range", min: 0, max: 1, step: 0.05 } },
    colors: { control: "object" },
    position: { table: { disable: true } },
  },
  decorators: [
    (Story) => (
      <ModelStage
        background={color.gray[1000]}
        cameraPosition={[0, 7, 18]}
        fit={false}
        center={false}
        grid={false}
        contactShadow={false}
        autoRotate={false}
        ambientIntensity={0}
        keyLightIntensity={0}
      >
        <Story />
      </ModelStage>
    ),
  ],
} satisfies Meta<typeof RainbowEnergyParticles>;

export default meta;
type Story = StoryObj<typeof meta>;

/** 참고 구현(당근이네 수확 이펙트)과 같은 값. */
export const Default: Story = {
  args: {
    count: 20,
    radius: 1,
    columnHeight: 10,
    duration: 1.5,
    initialScale: 1,
    finalScale: 2,
    maxOpacity: 0.5,
    loop: true,
  },
};

/** `loop` 를 끄면 한 번만 솟아오르고 끝난다. 원본과 같은 일회성 버스트. */
export const SingleBurst: Story = {
  args: {
    ...Default.args,
    loop: false,
  },
};

/** 낮고 촘촘하게 — 바닥에서 피어오르는 오오라에 가깝다. */
export const GroundAura: Story = {
  args: {
    ...Default.args,
    count: 80,
    radius: 3,
    columnHeight: 1,
    duration: 2.4,
    initialScale: 0.6,
    finalScale: 3,
    maxOpacity: 0.35,
  },
};

/** 디자인 토큰의 브랜드 컬러 한 가지로만 — 무지개를 빼면 어떤 인상인지. */
export const BrandOnly: Story = {
  args: {
    ...Default.args,
    colors: [color.brand[500]],
    count: 40,
    maxOpacity: 0.6,
  },
};
