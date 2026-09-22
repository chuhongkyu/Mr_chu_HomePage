import type { QueryFunctionContext } from "@tanstack/react-query";
import { NotionAPI } from "notion-client";
import type { ExtendedRecordMap } from "notion-types";

import { ProjectListResponse } from "@/components/common/window/searchFrom/SearchType";

export interface IDetail {
  id?: string;
}

// React Query가 queryFn을 실행하면서 context를 넘깁니다.
// context.queryKey에는 [string, string?] 형태로 쿼리 키가 들어옵니다.
const getProjectList = async (
  context: QueryFunctionContext<readonly unknown[]>
): Promise<ProjectListResponse | null> => {
  const [_key, debouncedValue] = context.queryKey as [string, string?];

  let url = "https://developed-heath-mr-chu.koyeb.app/api/notion/projectList";
  if (debouncedValue) {
    url += `?keyword=${debouncedValue}`;
  }

  const response = await fetch(url);
  if (!response.ok) throw new Error("프로젝트 리스트를 가져오지 못했습니다.");
  return response.json();
};

/**
 * 프로젝트 상세(Notion recordMap).
 *
 * 요청 시점에 Notion 을 호출하지 않는다. `npm run notion:sync` 로 받아둔
 * 스냅샷(`public/notion/<id>.json`)을 읽는다.
 *
 * notion-client 는 app.notion.com 을 긁는 비공식 API 라, 요청마다 호출하면
 * 배포 환경에서 막혔을 때 페이지가 통째로 죽는다. 실제로 그렇게 프로젝트
 * 상세 14개가 전부 스피너만 돌고 있었다. 이제 빌드도 런타임도 Notion 에
 * 의존하지 않는다.
 */
const NOTION_RETRIES = 2;

/**
 * 노션에서 직접 받는다. 다 실패하면 null.
 *
 * `notion-client` 는 app.notion.com 을 긁는 비공식 API 라 배포 환경에서
 * 막힐 수 있다. 그 경우를 부르는 쪽이 폴백으로 처리한다.
 */
const fetchFromNotion = async (
  id: string
): Promise<ExtendedRecordMap | null> => {
  for (let attempt = 1; attempt <= NOTION_RETRIES; attempt++) {
    try {
      return await new NotionAPI().getPage(id);
    } catch (error) {
      if (attempt === NOTION_RETRIES) {
        console.error("[getProjectDetail] Notion 호출 실패", { id, error });
      } else {
        await new Promise((resolve) => setTimeout(resolve, attempt * 400));
      }
    }
  }
  return null;
};

/**
 * 노션 본문.
 *
 * 노션을 먼저 부른다. 스냅샷을 주 경로로 두면 글을 고쳐도 반영되지 않고,
 * 이미지의 서명 URL(몇 시간짜리)까지 같이 굳어 시간이 지나면 419 로 깨진다.
 *
 * 노션이 막혔을 때만 커밋된 스냅샷으로 떨어진다. 페이지가 통째로 죽는 대신
 * 조금 오래된 글이라도 보여 준다.
 */
const getProjectDetail = async ({ id }: IDetail): Promise<ExtendedRecordMap> => {
  if (!id) throw new Error("프로젝트 ID가 없습니다.");

  const live = await fetchFromNotion(id);
  if (live) return live;

  try {
    const snapshot = await import(`../../public/notion/${id}.json`);
    return (snapshot.default ?? snapshot) as ExtendedRecordMap;
  } catch {
    throw new Error(
      `Notion 페이지를 불러오지 못했고 스냅샷도 없습니다 (id=${id}). ` +
        "새로 추가한 글이면 `npm run notion:sync` 를 돌리고 커밋할 것."
    );
  }
};

/**
 * SSG 대상 ID 목록.
 *
 * 스냅샷과 같은 목록을 써야 한다. 백엔드에서 매번 받아오면 스냅샷에 없는
 * ID 가 정적 경로로 잡혀 빌드가 깨진다.
 */
const getAllProjectList = async (): Promise<{ pageIds: string[] }> => {
  const index = await import("../../public/notion/index.json");
  return { pageIds: (index.default ?? index).ids };
};

export { getAllProjectList, getProjectDetail, getProjectList };
