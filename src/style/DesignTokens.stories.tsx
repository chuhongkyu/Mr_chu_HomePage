import type { Meta, StoryObj } from "@storybook/nextjs";

import { color, radius, space } from "@/style/tokens.generated";

/**
 * 토큰 카탈로그.
 *
 * 값을 하드코딩하지 않고 `tokens.generated.ts` 를 순회해서 그린다.
 * 따라서 이 화면은 `tokens/*.json` 과 절대로 어긋날 수 없다.
 * — 바로 이 지점이 Figma Variables ↔ 코드의 접점이다.
 */
const meta = {
  title: "Design System/Tokens",
  parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const page: React.CSSProperties = {
  padding: 32,
  fontFamily: "var(--font-pretendard), sans-serif",
  color: "var(--color-font-base)",
  background: "var(--color-bg-base)",
  minHeight: "100vh",
};

const label: React.CSSProperties = {
  fontSize: 12,
  fontVariantNumeric: "tabular-nums",
  color: "var(--color-font-muted)",
};

function Section({
  title,
  hint,
  children,
}: {
  title: string;
  hint: string;
  children: React.ReactNode;
}) {
  return (
    <section style={{ marginBottom: 48 }}>
      <h2 style={{ fontSize: 16, margin: "0 0 4px" }}>{title}</h2>
      <p style={{ ...label, margin: "0 0 16px" }}>{hint}</p>
      {children}
    </section>
  );
}

function Ramp({ name, scale }: { name: string; scale: Record<string, string> }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ ...label, marginBottom: 6 }}>{name}</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {Object.entries(scale).map(([step, value]) => (
          <div key={step} style={{ width: 92 }}>
            <div
              style={{
                height: 56,
                borderRadius: radius.md,
                background: value,
                border: "1px solid var(--color-border)",
              }}
            />
            <div style={{ ...label, marginTop: 4 }}>{step}</div>
            <div style={{ ...label, fontSize: 10 }}>{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/** 원시 색상 팔레트 — Figma Variables 의 Primitive 컬렉션과 이름이 1:1로 대응한다. */
export const Colors: Story = {
  render: () => {
    const { semantic, alpha, ...primitives } = color;
    return (
      <div style={page}>
        <Section
          title="Color / Primitive"
          hint="tokens/color.json → $color-{group}-{step} (SCSS) · color.{group}[{step}] (TS)"
        >
          {Object.entries(primitives).map(([group, scale]) => (
            <Ramp key={group} name={group} scale={scale as Record<string, string>} />
          ))}
        </Section>

        <Section title="Color / Alpha" hint="그림자와 오버레이 전용 반투명 토큰">
          {Object.entries(alpha).map(([group, scale]) => (
            <Ramp key={group} name={`alpha.${group}`} scale={scale as Record<string, string>} />
          ))}
        </Section>
      </div>
    );
  },
};

/**
 * 역할 기반 토큰.
 * 툴바의 Theme 스위치를 돌리면 `[data-theme="dark"]` 가 적용되어 값이 바뀐다.
 * Figma Variables 의 Mode 와 같은 개념이다.
 */
export const Semantic: Story = {
  render: () => (
    <div style={page}>
      <Section
        title="Color / Semantic"
        hint="CSS custom property 로 출력된다 · 툴바의 Theme 으로 Light ↔ Dark 전환"
      >
        <div style={{ display: "grid", gap: 8, maxWidth: 560 }}>
          {Object.keys(flattenSemantic(color.semantic)).map((name) => (
            <div
              key={name}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: 12,
                borderRadius: radius.md,
                border: "1px solid var(--color-border)",
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: radius.sm,
                  background: `var(--color-${name})`,
                  border: "1px solid var(--color-border)",
                }}
              />
              <code style={{ fontSize: 13 }}>--color-{name}</code>
            </div>
          ))}
        </div>
      </Section>
    </div>
  ),
};

/** 간격과 반경 — 실제 사용 중인 값에서 역으로 뽑아낸 스케일. */
export const SpaceAndRadius: Story = {
  render: () => (
    <div style={page}>
      <Section title="Space" hint="4px 그리드 · $space-{step}">
        <div style={{ display: "grid", gap: 6 }}>
          {Object.entries(space).map(([step, value]) => (
            <div key={step} style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <code style={{ ...label, width: 96 }}>
                $space-{step} · {value}
              </code>
              <div style={{ width: value, height: 12, background: color.brand[500] }} />
            </div>
          ))}
        </div>
      </Section>

      <Section title="Radius" hint="20px(카드)와 pill 이 이 사이트의 지배적인 형태 언어다">
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          {Object.entries(radius).map(([step, value]) => (
            <div key={step} style={{ textAlign: "center" }}>
              <div
                style={{
                  width: 88,
                  height: 64,
                  borderRadius: value,
                  background: color.brand[500],
                }}
              />
              <div style={{ ...label, marginTop: 4 }}>
                {step} · {value}
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  ),
};

/** `{ font: { base } }` → `["font-base"]` 처럼 CSS 변수 이름 꼴로 평탄화한다. */
function flattenSemantic(node: object, trail: string[] = [], out: Record<string, true> = {}) {
  for (const [key, child] of Object.entries(node)) {
    if (typeof child === "string") out[[...trail, key].join("-")] = true;
    else flattenSemantic(child, [...trail, key], out);
  }
  return out;
}
