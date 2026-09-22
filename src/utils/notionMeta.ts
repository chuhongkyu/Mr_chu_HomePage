import type { ExtendedRecordMap } from "notion-types";

/**
 * 스냅샷에서 제목과 설명을 뽑는다.
 *
 * 노션 글이 곧 페이지의 내용이므로 메타데이터도 거기서 나와야 한다. 따로
 * 적어 두면 글을 고칠 때마다 두 곳을 맞춰야 하고, 반드시 어긋난다.
 */

/** 글이 들어 있는 블록. 나머지(이미지·구분선 등)는 설명에 쓸 말이 없다. */
const TEXTY = new Set([
  "text",
  "header",
  "sub_header",
  "sub_sub_header",
  "quote",
  "bulleted_list",
  "numbered_list",
  "callout",
  "toggle",
]);

/** 검색 결과에서 잘리지 않는 길이. */
const DESCRIPTION_LIMIT = 160;

/**
 * 노션의 rich text 는 `[["문장", [서식…]], …]` 꼴이다.
 * 서식은 버리고 글자만 잇는다.
 */
const plainText = (value: unknown): string =>
  Array.isArray(value)
    ? value
        .map((run) => (Array.isArray(run) ? String(run[0] ?? "") : ""))
        .join("")
    : "";

/**
 * 스냅샷의 블록은 `{ value: { value: … } }` 로 한 겹 더 싸여 있다.
 * notion-client 버전에 따라 한 겹일 때도 있어 둘 다 받는다.
 */
const blockValue = (entry: unknown) => {
  const outer = (entry as { value?: unknown })?.value;
  return ((outer as { value?: unknown })?.value ?? outer) as
    { type?: string; properties?: { title?: unknown } } | undefined;
};

export const getNotionTitle = (recordMap: ExtendedRecordMap) => {
  const first = Object.keys(recordMap.block)[0];
  const title = plainText(
    blockValue(recordMap.block[first])?.properties?.title
  );
  return title.trim();
};

export const getNotionDescription = (recordMap: ExtendedRecordMap) => {
  const parts: string[] = [];

  for (const key of Object.keys(recordMap.block)) {
    const block = blockValue(recordMap.block[key]);
    if (!block?.type || !TEXTY.has(block.type)) continue;

    const text = plainText(block.properties?.title).trim();
    if (text) parts.push(text);
    // 자르고 나서도 문장이 남을 만큼만 모으고 그만둔다.
    if (parts.join(" ").length > DESCRIPTION_LIMIT + 60) break;
  }

  return parts
    .join(" ")
    .replace(/\s+/g, " ")
    .slice(0, DESCRIPTION_LIMIT)
    .trim();
};
