import posthog from "posthog-js";

/**
 * 남기는 기록.
 *
 * 이름을 한곳에 모아 둔다. 부르는 자리에서 문자열을 바로 적으면 오타 하나가
 * 조용히 새 이벤트를 만들고, 대시보드에서야 비로소 드러난다.
 *
 * `_shown` 은 눌렀다가 아니라 실제로 보였다는 뜻이다. 글은 받아오다 실패할
 * 수 있어서 둘을 나눠야 "열었는데 못 봤다" 를 셀 수 있다.
 */
export type AnalyticsEvent =
  /** 씬을 봤다. 주소로 바로 들어온 경우도 포함. */
  | "scene_viewed"
  /** 당근이네 구역 카드를 열었다. */
  | "hotspot_opened"
  /** 노션 글 시트를 열었다(누른 시점). */
  | "article_opened"
  /** 노션 글이 실제로 그려졌다. */
  | "article_shown"
  | "article_failed"
  /** 링크드인·노션 원문 팝업을 열었다. */
  | "post_opened"
  /** 바깥으로 나갔다. 유리 패널·헤더 링크. */
  | "outbound_clicked"
  /** 헤더 메뉴에서 프로젝트·이력서로 갔다. */
  | "menu_navigated"
  | "motion_played"
  /** 씬을 클리어했거나 되돌렸다. */
  | "scene_cleared";

type Props = Record<string, string | number | boolean | undefined>;

export const track = (event: AnalyticsEvent, props?: Props) => {
  posthog.capture(event, props);
};
