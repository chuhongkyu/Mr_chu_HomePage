import type { Meta, StoryObj } from "@storybook/nextjs";

import { SeedParticles } from "@/components/profile/webgl/common/SeedParticles";
import { ModelStage } from "@/components/showcase/ModelStage";
import { color } from "@/style/tokens.generated";

/**
 * 원둘레에 고르게 선 스프라이트가 시간차를 두고 이동하며 사라지는 파티클.
 *
 * 참고한 원본(당근이네 씨앗 이펙트)은 `y` 를 0 → +10 으로 **올린다**.
 * 크게 시작해서 작아지기 때문에(scale 4 → 0.2) 멀어지는 것처럼 보인다.
 * 실제로 떨어지는 모션은 `travelHeight` 를 음수로 준 `Falling` 스토리를 볼 것.
 */
const meta = {
  title: "3D/Effects/SeedParticles",
  component: SeedParticles,
  parameters: { layout: "fullscreen" },
  argTypes: {
    count: { control: { type: "range", min: 1, max: 80, step: 1 } },
    travelHeight: { control: { type: "range", min: -20, max: 20, step: 0.5 } },
    radius: { control: { type: "range", min: 0, max: 6, step: 0.1 } },
    duration: { control: { type: "range", min: 0.2, max: 6, step: 0.1 } },
    stagger: { control: { type: "range", min: 0, max: 0.5, step: 0.01 } },
    initialScale: { control: { type: "range", min: 0.1, max: 10, step: 0.1 } },
    finalScale: { control: { type: "range", min: 0.1, max: 10, step: 0.1 } },
    maxOpacity: { control: { type: "range", min: 0, max: 1, step: 0.05 } },
    color: { control: "color" },
    swirl: { control: "boolean" },
    position: { table: { disable: true } },
  },
  decorators: [
    (Story) => (
      <ModelStage
        background={color.gray[1000]}
        cameraPosition={[0, 0, 26]}
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
} satisfies Meta<typeof SeedParticles>;

export default meta;
type Story = StoryObj<typeof meta>;

/** 참고 구현과 같은 값. 크게 시작해 작아지며 위로 올라간다. */
export const Default: Story = {
  args: {
    count: 15,
    color: "#ffe082",
    travelHeight: 10,
    radius: 0.5,
    duration: 2,
    stagger: 0.08,
    initialScale: 4,
    finalScale: 0.2,
    maxOpacity: 1,
    loop: true,
  },
};

/**
 * 실제로 떨어지는 모션.
 * `travelHeight` 만 음수로 뒤집으면 되고, 커지면서 떨어지게 스케일도 바꿨다.
 */
export const Falling: Story = {
  args: {
    ...Default.args,
    travelHeight: -10,
    initialScale: 0.2,
    finalScale: 4,
  },
};

/**
 * `swirl` 을 끄면 등장 순서를 섞어 나선이 생기지 않는다.
 * 원둘레 순서대로 등장하는 원본 동작(`swirl: true`)은 도는 것처럼 보인다.
 */
export const NoSwirl: Story = {
  args: { ...Default.args, swirl: false },
};

/** `stagger` 를 0 으로 두면 시간차 없이 한꺼번에 터진다. */
export const NoStagger: Story = {
  args: {
    ...Default.args,
    stagger: 0,
  },
};

/** `loop` 를 끄면 한 바퀴만 돌고 끝난다. 원본과 같은 일회성 재생. */
export const SingleBurst: Story = {
  args: {
    ...Default.args,
    loop: false,
  },
};

/** 브랜드 컬러로, 더 촘촘하고 넓게. */
export const BrandRing: Story = {
  args: {
    ...Default.args,
    color: color.brand[500],
    count: 40,
    radius: 3,
    stagger: 0.04,
  },
};
