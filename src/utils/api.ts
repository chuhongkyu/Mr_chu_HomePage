import type { QueryFunctionContext } from "@tanstack/react-query";
import type { ExtendedRecordMap } from "notion-types";

import {
  IList,
  ProjectListResponse,
} from "@/components/common/window/searchFrom/SearchType";

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
const getProjectDetail = async ({ id }: IDetail): Promise<ExtendedRecordMap> => {
  if (!id) throw new Error("프로젝트 ID가 없습니다.");

  try {
    // 정적 import 로 두면 15개가 전부 번들에 들어간다. 필요한 것만 읽는다.
    const snapshot = await import(`../../public/notion/${id}.json`);
    return (snapshot.default ?? snapshot) as ExtendedRecordMap;
  } catch {
    throw new Error(
      `Notion 스냅샷이 없습니다 (id=${id}). ` +
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
