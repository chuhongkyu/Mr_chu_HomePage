import type { Meta, StoryObj } from "@storybook/nextjs";

import { GlassPanel } from "@/components/profile/webgl/common/GlassPanel";
import { ModelStage } from "@/components/showcase/ModelStage";

/** 패스트캠퍼스 씬의 크림슨. 유리 톤은 이 배경 위에서 맞춰 뒀다. */
const CRIMSON = "#AE0C36";

/**
 * 공중에 뜬 유리판.
 *
 * 투과 재질을 쓰지 않는다. `MeshTransmissionMaterial` 은 인스턴스마다 배경을
 * 다시 렌더하는데, 판을 열 몇 장 띄우는 구성이라 그 비용을 그대로 열 몇 배로
 * 문다. 대신 굴절을 포기하고 프레넬로 흉내 냈다.
 *
 * 보더는 따로 만든 링이 아니라 판을 깎아낸 베벨이다. 그 띠는 노멀이 판
 * 바깥을 향해 어느 각도에서도 시선과 거의 수직이라, 프레넬이 저절로 그
 * 부분만 밝힌다. `bevel` 을 키우면 보더가 두꺼워진다.
 */
const meta = {
  title: "3D/Common/GlassPanel",
  component: GlassPanel,
  parameters: { layout: "fullscreen" },
  argTypes: {
    width: { control: { type: "range", min: 1, max: 14, step: 0.2 } },
    height: { control: { type: "range", min: 1, max: 10, step: 0.2 } },
    thickness: { control: { type: "range", min: 0.02, max: 0.6, step: 0.01 } },
    radius: { control: { type: "range", min: 0, max: 1.5, step: 0.05 } },
    bevel: { control: { type: "range", min: 0.01, max: 0.3, step: 0.01 } },
    inset: { control: { type: "range", min: 0, max: 1.5, step: 0.02 } },
    opacity: { control: { type: "range", min: 0, max: 1, step: 0.01 } },
    rimPower: { control: { type: "range", min: 0.5, max: 8, step: 0.1 } },
    rimStrength: { control: { type: "range", min: 0, max: 2, step: 0.05 } },
    sheen: { control: { type: "range", min: 0, max: 1, step: 0.01 } },
    tint: { control: "color" },
    rimColor: { control: "color" },
    content: { control: false },
  },
  decorators: [
    (Story) => (
      <ModelStage background={CRIMSON} center={false} fit={false} grid={false} contactShadow={false} cameraPosition={[0, 0, 12]}>
        <Story />
      </ModelStage>
    ),
  ],
} satisfies Meta<typeof GlassPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

/** 빈 유리판. 재질만 보려고 내용물을 비웠다. */
export const Default: Story = {
  args: { width: 6, height: 4 },
};

/** 글을 담은 판. eyebrow → title → body 순으로 쌓인다. */
export const WithText: Story = {
  args: {
    width: 8,
    height: 5,
    content: {
      kind: "text",
      eyebrow: "Lecture",
      title: "인터랙티브 대규모 프로젝트 구축",
      body: "패스트캠퍼스 온라인 강의. 실무에서 쓰는 3D 웹 인터랙션을 처음부터 끝까지 만들어 본다.",
    },
  },
};

/** 이미지를 담은 판. 비율은 `object-fit: cover` 처럼 잘라서 맞춘다. */
export const WithImage: Story = {
  args: {
    // 원본이 1604x890 이라 판도 같은 1.8:1 로 맞췄다. 어긋난 만큼 잘려 나간다.
    width: 7.2,
    height: 4,
    content: { kind: "image", src: "/assets/img/fastcampus/01.png" },
  },
};

/** 보더를 두껍게. `bevel` 이 곧 보더 폭이다. */
export const ThickBorder: Story = {
  args: { width: 6, height: 4, thickness: 0.3, bevel: 0.18, radius: 0.5 },
};

/** 제자리에서 천천히 떠다닌다. 씬에 여러 장 띄울 때 쓴다. */
export const Floating: Story = {
  args: { width: 6, height: 4, float: true },
};
