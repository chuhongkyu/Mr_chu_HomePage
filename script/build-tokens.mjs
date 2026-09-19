/**
 * Design Token 빌드
 *
 *   tokens/*.json  (DTCG 포맷 — Figma Variables 와 1:1)
 *        ↓
 *   src/style/_tokens.generated.scss   SCSS 변수 — next.config 의 additionalData 로 전역 주입
 *   src/style/_theme.generated.scss    :root / [data-theme] 규칙 — style.scss 에서 단 한 번만 @use
 *   src/style/tokens.generated.ts      R3F / TS 소비용
 *
 * 변수와 규칙을 나누는 이유: additionalData 는 모든 .scss 에 주입되므로
 * 규칙이 섞여 있으면 CSS module 마다 :root 블록이 중복 출력된다.
 *
 * 생성물은 커밋한다. 수정은 반드시 tokens/*.json 에서.
 *
 * `--watch` 를 주면 tokens/ 를 지켜보다 바뀔 때마다 다시 생성한다.
 * dev 서버와 같이 돌리면 토큰을 고쳐도 서버를 재시작할 필요가 없다.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const TOKENS_DIR = path.join(ROOT, "tokens");
const STYLE_DIR = path.join(ROOT, "src", "style");

const BANNER = `// 이 파일은 \`npm run tokens\` 로 생성됩니다. 직접 수정하지 마세요.\n// 원본: tokens/*.json\n`;

/** DTCG 트리를 { "gray.700": { value, type, dark } } 형태로 평탄화한다. */
function flatten(node, trail = [], out = {}) {
  for (const [key, child] of Object.entries(node)) {
    if (key.startsWith("$")) continue;
    if (child && typeof child === "object" && "$value" in child) {
      out[[...trail, key].join(".")] = {
        value: child.$value,
        type: child.$type,
        dark: child.$extensions?.mode?.dark,
      };
    } else if (child && typeof child === "object") {
      flatten(child, [...trail, key], out);
    }
  }
  return out;
}

/** `{gray.700}` 별칭을 실제 값으로 치환한다. 순환 참조는 에러. */
function resolve(ref, flat, seen = new Set()) {
  if (typeof ref !== "string" || !ref.startsWith("{")) return ref;
  const key = ref.slice(1, -1);
  if (seen.has(key))
    throw new Error(`토큰 순환 참조: ${[...seen, key].join(" → ")}`);
  const target = flat[key];
  if (!target) throw new Error(`알 수 없는 토큰 참조: ${ref}`);
  return resolve(target.value, flat, new Set([...seen, key]));
}

const build = () => {
  const files = fs
  .readdirSync(TOKENS_DIR)
  .filter((f) => f.endsWith(".json"))
  .sort();

  const scssLines = [BANNER];
  const tsGroups = [];
  let cssVars = [];
  let cssVarsDark = [];

  for (const file of files) {
  const ns = path.basename(file, ".json"); // color | space | radius
  const tree = JSON.parse(fs.readFileSync(path.join(TOKENS_DIR, file), "utf8"));
  const flat = flatten(tree);

  scssLines.push(`\n// ── ${ns} ${"─".repeat(Math.max(0, 56 - ns.length))}\n`);

  const tsEntries = [];
  for (const [key, token] of Object.entries(flat)) {
    const value = resolve(token.value, flat);
    const slug = key.replace(/\./g, "-");
    scssLines.push(`$${ns}-${slug}: ${value};\n`);
    tsEntries.push([key, value]);

    // semantic 그룹만 CSS custom property 로 내보낸다.
    if (key.startsWith("semantic.")) {
      const cssName = `--${ns}-${key.slice("semantic.".length).replace(/\./g, "-")}`;
      cssVars.push(`  ${cssName}: ${value};\n`);
      if (token.dark)
        cssVarsDark.push(`  ${cssName}: ${resolve(token.dark, flat)};\n`);
    }
  }
  tsGroups.push([ns, tsEntries]);
  }

  fs.writeFileSync(
  path.join(STYLE_DIR, "_tokens.generated.scss"),
  scssLines.join("")
  );

  const theme =
  BANNER +
  `\n:root {\n${cssVars.join("")}}\n\n[data-theme="dark"] {\n${cssVarsDark.join("")}}\n`;

  fs.writeFileSync(path.join(STYLE_DIR, "_theme.generated.scss"), theme);

  /** 평탄한 "a.b.c" 키 목록을 중첩 객체 리터럴로 되돌린다. */
  function nest(entries) {
  const root = {};
  for (const [key, value] of entries) {
    const parts = key.split(".");
    let cursor = root;
    for (const part of parts.slice(0, -1)) cursor = cursor[part] ??= {};
    cursor[parts.at(-1)] = value;
  }
  return root;
  }

  const ts =
  BANNER +
  tsGroups
    .map(
      ([ns, entries]) =>
        `export const ${ns} = ${JSON.stringify(nest(entries), null, 2)} as const;\n`
    )
    .join("\n") +
  `\nexport type ColorToken = typeof color;\n`;

  fs.writeFileSync(path.join(STYLE_DIR, "tokens.generated.ts"), ts);

  const total = tsGroups.reduce((sum, [, entries]) => sum + entries.length, 0);
  console.log(`✓ ${total}개 토큰 생성 (${files.join(", ")})`);
};

build();

if (process.argv.includes("--watch")) {
  // 저장 한 번에 이벤트가 여러 번 온다. 살짝 모아서 한 번만 다시 만든다.
  let timer;
  fs.watch(TOKENS_DIR, (_event, filename) => {
    if (!filename?.endsWith(".json")) return;
    clearTimeout(timer);
    timer = setTimeout(() => {
      try {
        build();
      } catch (error) {
        // 편집 중간 상태라 JSON 이 깨져 있을 수 있다. 죽지 않고 다음 저장을 기다린다.
        console.error(`✗ ${error.message}`);
      }
    }, 80);
  });
  console.log("… tokens/ 감시 중");
}
