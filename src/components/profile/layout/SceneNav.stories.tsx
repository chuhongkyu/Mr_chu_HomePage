import type { Meta, StoryObj } from "@storybook/nextjs";

import SceneNav from "@/components/profile/layout/SceneNav";

import styles from "@/components/profile/layout/SceneNav.stories.module.scss";

/**
 * 씬 사이를 오가는 내비.
 *
 * 3D 위에 얹히므로 뒤가 비쳐야 한다. `backdrop-filter` 로 뒤를 흐리고
 * 채도를 올린 뒤, 위쪽 안쪽 하이라이트로 유리의 두께를 만든다.
 * 그래서 이 스토리는 배경에 무늬를 깔아 굴절이 보이게 했다.
 *
 * 목록 끝에서는 화살표가 꺼진다. 순환시키면 "지금 처음인지 끝인지"를
 * 알 수 없어진다. 지금은 씬이 하나뿐이라 양쪽 다 꺼져 있다.
 */
const meta = {
  title: "Daangn/SceneNav",
  component: SceneNav,
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <div className={styles.stage}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SceneNav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { onOpenLink: () => {} },
};
