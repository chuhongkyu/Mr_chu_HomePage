import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs";

import HotspotMarker, {
  type HotspotMarkerProps,
} from "@/components/profile/common/HotspotMarker";
import { color } from "@/style/tokens.generated";

/**
 * 당근 경험 씬의 구역 핫스팟.
 *
 *   ● ──────▶ Garden        누르면 그 자리에서 카드가 열린다
 *
 * 라인은 점선이 라벨 쪽으로 계속 흘러가고(0.55s), 그 위로 밝은 덩어리가
 * 주기적으로 훑고 지나간다(1.8s). 앵커 점의 파문도 같은 1.8s 주기다.
 *
 * 3D 와 무관한 순수 DOM 이라 Canvas 없이 렌더된다.
 * 3D 좌표에 붙이는 건 `webgl/common/SceneHotspot` 이 맡는다.
 */
const meta = {
  title: "Daangn/HotspotMarker",
  component: HotspotMarker,
  parameters: { layout: "fullscreen" },
  argTypes: {
    accent: { control: "color" },
    description: { control: "text" },
    onMore: { table: { disable: true } },
    lineLength: { control: { type: "range", min: 16, max: 240, step: 4 } },
    direction: { control: "inline-radio", options: ["right", "left"] },
    placement: { control: "inline-radio", options: ["down", "up"] },
    open: { control: "boolean" },
    onToggle: { table: { disable: true } },
  },
} satisfies Meta<typeof HotspotMarker>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 실제로 눌러서 여닫아 본다.
 *
 * 마커는 앵커 점이 원점인 0×0 박스라 스스로 자리를 차지하지 않는다.
 * 카드가 펴질 쪽에 여백을 줘서 스토리 프레임에 잘리지 않게 한다.
 */
const Interactive = (args: HotspotMarkerProps) => {
  const [open, setOpen] = useState(args.open);
  const up = args.placement === "up";
  const left = args.direction === "left";

  return (
    <div
      style={{
        display: "flex",
        alignItems: up ? "flex-end" : "flex-start",
        justifyContent: left ? "flex-end" : "flex-start",
        minHeight: 460,
        padding: 60,
        background: color.daangn.backdrop,
      }}
    >
      <HotspotMarker
        {...args}
        open={open}
        onToggle={() => setOpen((prev) => !prev)}
      />
    </div>
  );
};

export const Garden: Story = {
  args: {
    label: "Garden",
    index: "01",
    accent: color.daangn.garden,
    media: "/assets/img/daangn/garden.gif",
    mediaAlt: "옥상 텃밭",
    description: "작물에 물을 주려면 당근의 다른 서비스를 다녀와야 해요. 접속해 있지 않아도 시간이 지나면 자랍니다.",
    onMore: () => {},
    lineLength: 64,
    open: false,
    // 실제 토글은 Interactive 가 들고 있다. 타입을 채우기 위한 자리.
    onToggle: () => {},
  },
  render: (args) => <Interactive {...args} />,
};

/** 열린 상태로 시작. 카드 레이아웃만 볼 때. */
export const GardenOpen: Story = {
  args: { ...Garden.args, open: true },
  render: (args) => <Interactive {...args} />,
};

/** 왼쪽으로 뻗는 배치. 흰 빛도 라벨 쪽(왼쪽)으로 흐른다. */
export const Room: Story = {
  args: {
    ...Garden.args,
    label: "Room",
    index: "02",
    accent: color.daangn.room,
    media: "/assets/img/daangn/room.gif",
    mediaAlt: "당근이네 방",
    direction: "left",
  },
  render: (args) => <Interactive {...args} />,
};

/**
 * 그림 속 나눔장터는 파스텔 노랑(#faed7d)이라 흰 글씨가 안 읽힌다.
 * garden 뱃지와 같은 대비(3.6:1)가 되도록 짙게 내린 색을 쓴다.
 */
export const Fleamarket: Story = {
  args: {
    ...Garden.args,
    label: "Fleamarket",
    index: "03",
    accent: color.daangn.fleamarket,
    media: "/assets/img/daangn/fleamarket.gif",
    mediaAlt: "나눔장터",
    // 그림 맨 아래라 실제 씬에서도 위로 펴진다.
    placement: "up",
  },
  render: (args) => <Interactive {...args} />,
};
