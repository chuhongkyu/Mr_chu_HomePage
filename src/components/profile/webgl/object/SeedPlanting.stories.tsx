import { useEffect, useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs";

import {
  SeedPlanting,
  SeedPlantingProps,
} from "@/components/profile/webgl/object/SeedPlanting";
import { ModelStage } from "@/components/showcase/ModelStage";
import { color } from "@/style/tokens.generated";

/**
 * 첫 장면의 진입 연출.
 *
 *   낙하(파티클 동반) → 착지 스쿼시 → 흙에 박힘 → `onPlanted`
 *
 * 타이밍은 gsap 타임라인이 잡는다. `fallEase` 로 내려오는 느낌을 바꿀 수 있다.
 * 한 번 재생하고 끝나는 연출이라, 반복해서 보려면 `Replaying` 스토리를 쓴다.
 * 스테이지의 자동 프레이밍은 껐다. 씨앗이 매 프레임 움직이기 때문이다.
 */
const meta = {
  title: "3D/Sequences/SeedPlanting",
  component: SeedPlanting,
  parameters: { layout: "fullscreen" },
  argTypes: {
    startHeight: { control: { type: "range", min: 1, max: 15, step: 0.5 } },
    fallDuration: { control: { type: "range", min: 0.2, max: 5, step: 0.1 } },
    fallEase: {
      control: "select",
      options: [
        "none",
        "sine.inOut",
        "power1.inOut",
        "power2.inOut",
        "power1.in",
        "power2.in",
        "power2.out",
        "back.out(1.4)",
        "bounce.out",
      ],
      description:
        "gsap 이징. in 계열은 중력처럼, inOut 계열은 부드럽게 내려온다.",
    },
    plantDuration: { control: { type: "range", min: 0.1, max: 3, step: 0.1 } },
    seedRadius: { control: { type: "range", min: 0.1, max: 1.5, step: 0.05 } },
    particleCount: { control: { type: "range", min: 0, max: 60, step: 1 } },
    particleTravelHeight: {
      control: { type: "range", min: 0, max: 12, step: 0.5 },
    },
    particleDuration: {
      control: { type: "range", min: 0.2, max: 6, step: 0.1 },
    },
    particleInitialScale: {
      control: { type: "range", min: 0.1, max: 10, step: 0.1 },
    },
    particleFinalScale: {
      control: { type: "range", min: 0.05, max: 5, step: 0.05 },
    },
    particleSwirl: { control: "boolean" },
    particleColor: { control: "color" },
    soilColor: { control: "color" },
    position: { table: { disable: true } },
    onPlanted: { table: { disable: true } },
  },
  decorators: [
    (Story) => (
      <ModelStage
        background={color.gray[800]}
        cameraPosition={[8, 3, 18]}
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
} satisfies Meta<typeof SeedPlanting>;

export default meta;
type Story = StoryObj<typeof meta>;

// 스테이지의 OrbitControls 는 원점을 바라본다. 연출이 y 0~5 에서 일어나므로
// 통째로 내려서 화면 가운데에 오게 한다.
const STAGE_OFFSET: [number, number, number] = [0, -2, 0];

export const Default: Story = {
  args: {
    position: STAGE_OFFSET,
    startHeight: 3.5,
    fallDuration: 1.6,
    fallEase: "power1.inOut",
    plantDuration: 0.7,
    seedRadius: 0.35,
    // 아래 파티클 값은 원본 SeedParticle 그대로다.
    particleCount: 15,
    particleTravelHeight: 10,
    particleDuration: 2,
    particleInitialScale: 4,
    particleFinalScale: 0.2,
    particleSwirl: false,
  },
};

/** 원본처럼 원둘레 순서대로 등장시킨 경우. 나선처럼 도는 게 보인다. */
export const Swirling: Story = {
  args: { ...Default.args, particleSwirl: true },
};

/** 중력처럼 가속해서 떨어진다. `fallEase` 만 바꾼 것. */
export const GravityFall: Story = {
  args: { ...Default.args, fallEase: "power2.in" },
};

/** 흙을 끄면 씨앗과 파티클의 움직임만 남는다. */
export const WithoutSoil: Story = {
  args: { ...Default.args, showSoil: false },
};

/** 더 높은 데서 천천히 — 파티클 꼬리가 길게 늘어진다. */
export const SlowFall: Story = {
  args: {
    ...Default.args,
    startHeight: 8,
    fallDuration: 3.2,
    position: [0, -4, 0],
  },
};

/** 파티클 없이 — 씨앗의 착지 스쿼시만 확인할 때. */
export const NoParticles: Story = {
  args: { ...Default.args, particleCount: 0 },
};

const Replayer = (props: SeedPlantingProps) => {
  const [run, setRun] = useState(0);
  const cycle =
    (props.fallDuration ?? 1.6) + (props.plantDuration ?? 0.7) + 2.2;

  useEffect(() => {
    const id = setInterval(() => setRun((n) => n + 1), cycle * 1000);
    return () => clearInterval(id);
  }, [cycle]);

  return <SeedPlanting key={run} {...props} />;
};

/** 연출이 끝나면 잠시 뒤 처음부터 다시 재생한다. 타이밍 조율용. */
export const Replaying: Story = {
  args: Default.args,
  render: (args) => <Replayer {...args} />,
};
