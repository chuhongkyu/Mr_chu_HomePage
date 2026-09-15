import { NotionAPI } from "notion-client";

/**
 * Vercel 런타임에서 Notion 호출이 왜 실패하는지 알아내기 위한 일회성 진단 엔드포인트.
 *
 * 로컬에서는 되는데 배포에서만 안 되는 상황이라, 둘의 차이를 실제 값으로 찍는다.
 * 원인을 확인한 뒤에는 이 파일을 지운다.
 *
 *   /api/debug/notion?id=<page-id>
 */
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const maxDuration = 30;

const NOTION_API = "https://app.notion.com/api/v3/loadPageChunk";

/** 에러 객체에서 건질 수 있는 건 다 건진다. ofetch 는 status/data 를 달아준다. */
function describe(error: unknown) {
  const e = error as {
    name?: string;
    message?: string;
    status?: number;
    statusCode?: number;
    statusText?: string;
    code?: string;
    cause?: unknown;
    data?: unknown;
    stack?: string;
  };
  return {
    name: e?.name,
    message: e?.message,
    status: e?.status ?? e?.statusCode,
    statusText: e?.statusText,
    code: e?.code,
    cause: e?.cause ? String(e.cause) : undefined,
    data: typeof e?.data === "string" ? e.data.slice(0, 500) : e?.data,
    stack: e?.stack?.split("\n").slice(0, 4).join("\n"),
  };
}

async function timed<T>(fn: () => Promise<T>) {
  const started = Date.now();
  try {
    return { ok: true as const, ms: Date.now() - started, value: await fn() };
  } catch (error) {
    return { ok: false as const, ms: Date.now() - started, error: describe(error) };
  }
}

export async function GET(request: Request) {
  const id =
    new URL(request.url).searchParams.get("id") ??
    "f3994247-d75c-4d7f-a978-01c5b537a80e";

  // 1. 이 함수가 어디서 어떤 IP 로 나가는가 — 로컬(가정용 IP)과 갈리는 지점.
  const egress = await timed(async () => {
    const res = await fetch("https://api.ipify.org?format=json", {
      cache: "no-store",
    });
    return (await res.json()) as { ip: string };
  });

  // 2. notion-client 를 거치지 않고 Notion 에 직접 POST. 상태 코드를 그대로 본다.
  const raw = await timed(async () => {
    const res = await fetch(NOTION_API, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        pageId: id,
        limit: 1,
        cursor: { stack: [] },
        chunkNumber: 0,
        verticalColumns: false,
      }),
      cache: "no-store",
    });
    const text = await res.text();
    return {
      status: res.status,
      statusText: res.statusText,
      contentType: res.headers.get("content-type"),
      cfRay: res.headers.get("cf-ray"),
      server: res.headers.get("server"),
      bodyPreview: text.slice(0, 400),
    };
  });

  // 3. 앱이 실제로 쓰는 경로.
  const viaClient = await timed(async () => {
    const recordMap = await new NotionAPI().getPage(id);
    return { blocks: Object.keys(recordMap.block ?? {}).length };
  });

  const report = {
    id,
    env: {
      region: process.env.VERCEL_REGION ?? "(로컬)",
      vercelEnv: process.env.VERCEL_ENV ?? "(로컬)",
      node: process.version,
      runtime: "nodejs",
    },
    egress,
    rawNotionPost: raw,
    viaNotionClient: viaClient,
  };

  // Vercel 함수 로그에도 남긴다.
  console.log("[debug/notion]", JSON.stringify(report));

  return Response.json(report, {
    status: viaClient.ok ? 200 : 500,
    headers: { "cache-control": "no-store" },
  });
}
