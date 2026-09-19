/**
 * Notion 콘텐츠 스냅샷.
 *
 *   koyeb pageIds → notion-client → src/generated/notion/<id>.json
 *
 * 결과물은 커밋한다. 그래야 빌드도 런타임도 Notion 에 의존하지 않는다.
 *
 * notion-client 는 app.notion.com 을 긁는 비공식 API 다. 이걸 요청 시점에
 * 호출하면 배포 환경에서 막혔을 때 페이지가 통째로 죽는다. 실제로 그렇게
 * 프로젝트 상세 14개가 전부 스피너만 돌고 있었다.
 *
 * 글을 고쳤으면 `npm run notion:sync` 를 돌리고 결과를 커밋한다.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { NotionAPI } from "notion-client";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
// public 에 두면 서버(빌드 시 import)와 클라이언트(fetch) 가 같은 파일을 본다.
// 씬에서 글을 열 때는 라우트를 바꾸지 않고 이 JSON 만 받아온다.
const OUT_DIR = path.join(ROOT, "public", "notion");
const PAGE_IDS_URL =
  "https://developed-heath-mr-chu.koyeb.app/api/notion/pageIds";
const RETRIES = 3;

const withRetry = async (label, fn) => {
  let lastError;
  for (let attempt = 1; attempt <= RETRIES; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (attempt < RETRIES) {
        await new Promise((resolve) => setTimeout(resolve, attempt * 800));
      }
    }
  }
  throw new Error(`${label} 실패 (${RETRIES}회 시도): ${lastError?.message}`);
};

const response = await withRetry("pageIds 조회", async () => {
  const res = await fetch(PAGE_IDS_URL);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
});

const ids = response.pageIds;
if (!Array.isArray(ids) || ids.length === 0) {
  throw new Error("pageIds 가 비어 있다. 백엔드를 확인할 것.");
}

// 씬이 직접 여는 글은 백엔드 목록과 무관하게 반드시 있어야 한다. 목록에서
// 빠지면 이 디렉터리를 비울 때 같이 사라지고, 씬에서 "자세히 보기" 를 눌러야
// 비로소 404 로 드러난다.
const projects = fs.readFileSync(
  path.join(ROOT, "src/components/profile/constants/projects.ts"),
  "utf8"
);
const required = [...projects.matchAll(/articleId: "([^"]+)"/g)].map((m) => m[1]);
const missing = required.filter((id) => !ids.includes(id));
if (missing.length > 0) {
  throw new Error(
    `PROJECTS 의 articleId 가 pageIds 에 없다: ${missing.join(", ")}`
  );
}

fs.rmSync(OUT_DIR, { recursive: true, force: true });
fs.mkdirSync(OUT_DIR, { recursive: true });

const notion = new NotionAPI();
let bytes = 0;

for (const id of ids) {
  const recordMap = await withRetry(`페이지 ${id}`, () => notion.getPage(id));
  const json = JSON.stringify(recordMap);
  fs.writeFileSync(path.join(OUT_DIR, `${id}.json`), json);
  bytes += json.length;
  process.stdout.write(`  ${id}  ${(json.length / 1024).toFixed(0)} KB\n`);
}

// 라우트가 이 목록으로 정적 경로를 만든다. 빌드에 네트워크가 필요 없어진다.
fs.writeFileSync(
  path.join(OUT_DIR, "index.json"),
  JSON.stringify({ ids, syncedAt: new Date().toISOString() }, null, 2)
);

console.log(`✓ ${ids.length}개 페이지, ${(bytes / 1024 / 1024).toFixed(1)} MB`);
