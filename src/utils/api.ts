import type { QueryFunctionContext } from "@tanstack/react-query";
import { NotionAPI } from "notion-client";

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

const NOTION_RETRIES = 3;

/** ofetch 는 에러에 status/data 를 달아준다. 원인 판별에 필요하니 다 꺼낸다. */
const describeFetchError = (error: unknown) => {
  const e = error as {
    name?: string;
    message?: string;
    status?: number;
    statusCode?: number;
    code?: string;
    cause?: unknown;
    data?: unknown;
  };
  const status = e?.status ?? e?.statusCode;
  return {
    name: e?.name,
    message: e?.message,
    status,
    code: e?.code,
    cause: e?.cause ? String(e.cause) : undefined,
    data: typeof e?.data === "string" ? e.data.slice(0, 300) : e?.data,
    // 401/403/429 면 Notion 쪽 차단, ECONNRESET/ETIMEDOUT 이면 네트워크 문제다.
    summary: status ? `HTTP ${status}` : (e?.code ?? e?.name ?? "unknown"),
  };
};

/**
 * notion-client 는 app.notion.com/api/v3 를 긁는 비공식 API 라 간헐적으로 실패한다.
 *
 * 절대 null 을 돌려주지 않는다. 호출부가 null 을 `<Loading />` 으로 렌더하면
 * 실패가 무한 로딩으로 위장되고, 그 화면이 200 OK 로 나간다. 실제로 그렇게
 * 프로덕션의 프로젝트 페이지 14개가 전부 스피너만 돌고 있었다.
 * 실패는 던져서 빌드 로그·함수 로그·에러 바운더리에 드러나게 한다.
 */
const getProjectDetail = async ({ id }: IDetail) => {
  if (!id) throw new Error("프로젝트 ID가 없습니다.");

  const attempts: ReturnType<typeof describeFetchError>[] = [];

  for (let attempt = 1; attempt <= NOTION_RETRIES; attempt++) {
    try {
      return await new NotionAPI().getPage(id);
    } catch (error) {
      attempts.push(describeFetchError(error));
      if (attempt < NOTION_RETRIES) {
        await new Promise((resolve) => setTimeout(resolve, attempt * 500));
      }
    }
  }

  console.error(
    "[getProjectDetail] Notion 호출 실패",
    JSON.stringify({ id, region: process.env.VERCEL_REGION, attempts })
  );

  throw new Error(
    `Notion 페이지를 불러오지 못했습니다 (id=${id}, ${NOTION_RETRIES}회 시도) — ` +
      attempts.map((a, i) => `${i + 1}차: ${a.summary}`).join(", ")
  );
};

//ssg 때문에 25.05.30 전체 ID LIST 함수 추가함.
const getAllProjectList = async () => {
  const url = "https://developed-heath-mr-chu.koyeb.app/api/notion/pageIds";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("프로젝트 리스트 정보를 불러오는 데 실패했습니다.");
    }
    const data = await response.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.error("에러:", error);
    return null;
  }
};

export { getAllProjectList, getProjectDetail, getProjectList };
