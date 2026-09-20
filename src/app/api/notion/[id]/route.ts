import { getProjectDetail } from "@/utils/api";

type Params = { params: Promise<{ id: string }> };

/**
 * 씬 위 시트가 글을 받아가는 곳.
 *
 * 예전에는 `public/notion/<id>.json` 을 그대로 받아갔다. 그러면 글을 고쳐도
 * 다시 구워 커밋하기 전에는 반영되지 않고, 이미지의 서명 URL(몇 시간짜리)이
 * 함께 굳어 시간이 지나면 419 로 깨진다.
 *
 * CDN 에 60 초만 세워 둔다. 그 뒤 첫 요청이 새로 받아오는 동안에는 남은
 * 것을 먼저 내준다(`stale-while-revalidate`).
 */
export async function GET(_request: Request, { params }: Params) {
  const { id } = await params;

  try {
    const recordMap = await getProjectDetail({ id });

    return Response.json(recordMap, {
      headers: {
        "cache-control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    });
  } catch {
    return Response.json({ error: "not found" }, { status: 404 });
  }
}
