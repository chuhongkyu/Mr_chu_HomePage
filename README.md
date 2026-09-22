# MR.CHU — Design Engineering System

> "I built my portfolio as a design engineering system."

프로젝트 나열형 포트폴리오에서 **"나는 이런 방식으로 디자인하고, 만들고, 시스템화한다"** 를 증명하는
포트폴리오로 전환합니다. 문서로 설명하는 게 아니라, **이 사이트 자체가 그 시스템의 결과물**입니다.

- 배포: https://mr-chu-home-page.vercel.app/
- 변경 이력(리팩토링 히스토리): [docs/HISTORY.md](./docs/HISTORY.md)

---

## 🔗 Pipeline

```
Figma
  ↓  Design Tokens (variables → SCSS/TS)
React Components
  ↓
Storybook
  ↓
3D Components (R3F / Three.js)
  ↓
Blender Scenes / Assets (.glb)
  ↓
Production Portfolio (Vercel)
```

한 줄 요약: **Figma에서 만든 디자인을 실제 코드 시스템으로 연결할 수 있다.**
Figma 전문 디자이너임을 증명하는 게 아니라, **연결하는 사람**임을 보여주는 것이 목표.

### 비중 (의도적으로 이렇게 배분)

| 영역               | 비중 |
| ------------------ | ---- |
| Code               | 40%  |
| 3D                 | 25%  |
| Storybook / System | 15%  |
| Figma              | 20%  |

---

## 🗺️ 최종 사이트 구조

```
MR.CHU — Design Engineer
Frontend × Design × 3D

01  Design System        Figma · Design Tokens · Components · Storybook   [ Figma ↔ Code ]
02  3D Component System  Three.js · R3F · drei                            [ Storybook ]
                         Carrot / Character / Plant / Scene / Animation
03  Blender              Models · Materials · Scenes · Animations          [ Blender → GLB → R3F ]
04  Shader Lab           GLSL · Noise · Distortion · Dissolve · Lighting
05  Interactive Projects 당근이네 · Genaimo · Unity · ...
06  About                Fine Art → Frontend → 3D → Design Engineering
```

---

## 📍 현재 상태

### 토큰 파이프라인 (Phase 1 완료)

```
tokens/*.json                 ← 단일 소스. DTCG 포맷이라 Figma Variables 와 1:1
   │  npm run tokens
   ├─ src/style/_tokens.generated.scss   $color-* / $space-* / $radius-*
   ├─ src/style/_theme.generated.scss    :root · [data-theme="dark"]
   └─ src/style/tokens.generated.ts      R3F · Storybook 에서 쓰는 TS 객체
```

- **DTCG(Design Tokens Community Group) 포맷**을 쓴다. Figma Variables 를 플러그인으로
  export 하면 나오는 그 포맷이라, 나중에 Figma 쪽을 붙일 때 변환 레이어가 필요 없다.
- 시맨틱 토큰의 `$extensions.mode.dark` 는 **Figma Variables 의 Mode** 에 대응한다.
- SCSS 변수 파일과 `:root` 규칙 파일을 분리한다. 전자는 `next.config` 의 `additionalData`
  로 모든 SCSS 에 주입되므로, 규칙이 섞여 있으면 CSS module 마다 `:root` 가 중복 출력된다.
- 하드코딩 색상 **80건을 전부 토큰으로 치환**했다. SCSS 에 남은 raw hex 는 0건.

### 이미 갖춰진 것

- Next.js 15 (App Router) · TypeScript · SCSS · Vercel
- R3F / drei / postprocessing 기반 3D 프로필 씬 (`src/components/profile/webgl/`)
- Draco 압축 `.glb` 에셋 11개 (`public/assets/models/`)
- 직접 작성한 GLSL 셰이더 (`src/shaders/` — background, outline, skinned outline)
- Typography 토큰 (`src/style/_typography.scss`)
- Notion 기반 프로젝트 콘텐츠, 합성 컴포넌트 패턴 모달

### 아직 없는 것

- Figma 파일 자체 (토큰 이름만 먼저 맞춰둔 상태)
- UI 컴포넌트 스토리 (Button / Input / Card / Modal)
- Shader Lab 페이지
- Blender → GLB 파이프라인 문서

---

## 🛠 명령어

| 명령                      | 설명                                                        |
| ------------------------- | ----------------------------------------------------------- |
| `npm run tokens`          | `tokens/*.json` → SCSS · TS 생성 (dev/build 앞에 자동 실행) |
| `npm run dev`             | Next 개발 서버                                              |
| `npm run storybook`       | Storybook (:6006)                                           |
| `npm run build-storybook` | Storybook 정적 빌드                                         |
| `npm run pr`              | PR 생성 (base 브랜치 선택)                                  |

> Storybook 10 은 Node 22.12+ 를 요구한다. `script/with-node.sh` 가
> `.nvmrc` 의 버전으로 알아서 전환하므로 `nvm use` 를 먼저 칠 필요는 없다.

---

## 🌿 Git 워크플로

`dev` 가 작업 브랜치, `main` 이 배포 브랜치다.

```
dev 에 직접 커밋  →  쌓이면  →  dev → main Release PR
```

기능마다 `feat/*` 를 따지 않는다. 혼자 쓰는 저장소고 PR 에서 도는 CI 가 없어서,
브랜치를 하나 더 거쳐도 얻는 게 없기 때문이다. `main` 은 `dev` 머지로만 변한다.

자세한 규칙과 커밋 컨벤션은 [CLAUDE.md](./CLAUDE.md) 에 있다.

---

## ✅ 작업 로드맵

한 번에 하나씩. 각 Phase는 독립적으로 배포 가능한 단위로 끊습니다.

### Phase 0 — 기반 정리 ✅

- [x] 이 README 작성, 기존 변경 이력은 `docs/HISTORY.md` 로 분리
- [x] styled-components 제거 — 실사용처는 죽은 컴포넌트 1개뿐이었다
      (`SearchKeyword.tsx`. `ThemeProvider` 가 없어 렌더되면 깨지는 상태였고,
      SCSS 로 다시 쓴 `KeywordBtn.tsx` 가 이미 존재했다)
- [x] `.nvmrc` 고정 (22.19.0)

### Phase 1 — Design Tokens ✅

- [x] 하드코딩 색상 전수 조사 → 고유값 40여 개 확인
- [x] `tokens/color.json` · `space.json` · `radius.json` 작성 (DTCG 포맷)
- [x] `script/build-tokens.mjs` — 별칭 해석 + 순환 참조 검출 + SCSS/TS 생성
- [x] `_variables.scss` 의 레거시 색상 변수를 토큰 별칭으로 전환
- [x] SCSS 전역의 raw hex / rgba 를 토큰으로 치환 (80건, 잔여 0건)
- [x] `tokens.generated.ts` — R3F 와 Storybook 이 같은 값을 쓴다
- [ ] Figma 무료 플랜에서 같은 이름의 Variables 생성 → 링크 확보

> 색상값이 바뀐 건 3개뿐이다. `#111111→#181818`, `#2f2f2f→#2c2c2c`, `#e4e4e4→#e8e8e8`.
> 모두 램프 정리를 위한 통합이고 육안으로 구분되지 않는 차이다. 나머지는 완전히 동일하다.

### Phase 2 — Storybook (UI)

- [x] Storybook 10 + `@storybook/nextjs` 셋업
- [x] `next.config` 의 SCSS 토큰 주입 · SVGR · GLSL raw-loader 를 Storybook 에도 연결
- [x] 툴바 Theme 스위처 — `[data-theme]` 를 토글해 토큰의 dark 모드를 확인
- [x] **Design System / Tokens** 스토리 — `tokens.generated.ts` 를 순회해 그리므로
      JSON 원본과 절대 어긋나지 않는다
- [ ] `Button` (primary / secondary / ghost / icon × size)
- [ ] `Input`, `Card`, `Modal`, `Toast`, `Tooltip`
- [ ] Storybook 정적 빌드 공개 배포

### Phase 3 — 3D Component System ⭐ 차별점

- [x] `ModelStage` — 조명·환경·카메라를 props 로 노출하는 R3F 스테이지
      (조명 기본값은 프로덕션 `Lights` 와 동일)
- [x] `Bounds` 자동 프레이밍 — 스토리마다 `scale` 을 손으로 맞추지 않는다.
      이 저장소의 GLB 자연 크기는 0.4(종이비행기) ~ 193(스틱맨) 으로 제각각이라
      고정 배율이 의미가 없다. `Center top` 이 모델 밑면을 y=0 에 앉히고,
      그리드·접지그림자 크기도 모델 폭에 비례시킨다
- [x] `Hat` 스토리 — Default / OutlineOnly / Row.
      back-face 쉐이더 아웃라인을 조명 0에서 확인할 수 있다
- [x] `Cluster` 스토리 — `emissiveColor` 를 디자인 토큰에서 직접 주입
- [x] `PaperAirplane` 스토리
- [x] `RainbowEnergyParticles` — 무지개색 스프라이트가 솟아오르는 에너지 파티클
- [x] `SeedParticles` — 원둘레에 선 스프라이트가 시간차를 두고 이동하는 파티클.
      `travelHeight` 를 음수로 주면 떨어진다
- [x] `particles.ts` — 두 이펙트가 공유하는 이징·페이드 곡선·머티리얼 팩토리.
      참고한 원본(당근이네)은 파티클마다 gsap 타임라인을 만들지만, 이 저장소는
      gsap 을 의존성에 두지 않으므로 `useFrame` 에서 이징을 직접 계산한다
      (`JumpTrailEffect` · `LightningRing` 과 같은 방식)
- [x] `Seed` — Blender 에서 구운 `seed.glb` (Draco + WebP). gltfjsx 출력을
      경로·타입·스케일 규약만 손봐서 썼다. `radius` 는 모델 반높이(0.951) 기준이라
      중심을 y=radius 에 두면 바닥이 y=0 에 닿는다
- [x] `SeedPlanting` — 첫 장면 진입 연출.
      씨앗이 파티클 꼬리를 달고 내려와 착지 스쿼시를 거쳐 흙에 박힌다.
      시퀀스 타이밍은 gsap 타임라인이 잡고(`fallEase` 로 낙하 느낌 조절),
      파티클 자체의 반복은 계속 `useFrame` 이 돌린다.
      `onPlanted` 콜백이 미션 클리어 시 꽃 피우기 연출을 붙일 자리다
- [ ] 미션 클리어 → 씨앗이 꽃으로 자라는 연출
- [ ] `Player` (SkinnedMesh + 애니메이션) 스토리 — `animation` prop 표준화 필요.
      캐릭터는 ailive 케이스 전용이라 첫 장면(`Scene.tsx`)에서는 빠져 있다
- [ ] `Islands`, `InkStrokes`, `FlightPath` 승격
- [ ] `scale` / `rotation` / `animation` props 네이밍 통일

```tsx
<ModelStage ambientIntensity={0} keyLightIntensity={0}>
  <Hat />
</ModelStage>
```

> ⚠️ `HatOnHead` 의 `scale.setScalar(10)` 을 스테이지로 가져오면 안 된다.
> 그건 모자를 키우는 값이 아니라 192 단위짜리 스틱맨 리그의 본 좌표계에
> 맞추는 보정값이라, 캐릭터 밖에서는 의미가 없다.

### Phase 4 — Blender Asset Pipeline

목표: "Blender 할 줄 알아요" 페이지 ❌ → **파이프라인을 실제로 보여주기** ⭕

```
Blender (Scene / Model / Material / Animation)
  ↓  export
.glb
  ↓  Draco / gltf-transform
Optimization
  ↓
Three.js / R3F
  ↓
React Component  →  Storybook  →  Portfolio
```

- [ ] 캐릭터 하나를 골라 전체 단계를 문서화 (before/after 폴리곤·용량 수치 포함)
- [ ] 최적화 스크립트를 `script/` 에 커밋 (재현 가능하게)
- [ ] 각 단계 스크린샷 + 최종 인터랙티브 결과를 한 페이지에 배치

### Phase 5 — Shader Lab

목표: 거대한 그래픽스 ❌ → 작고 명확한 셰이더 카탈로그 ⭕

- [ ] `Gradient`, `Noise`, `Dissolve`, `Distortion`, `Glow`, `Water`
- [ ] 각각 `GLSL → Three.js → React Component` 로 래핑
- [ ] uniform 을 Storybook controls 로 노출
- [ ] 기존 `src/shaders/` 의 outline 셰이더도 카탈로그에 편입

### Phase 6 — 사이트 재구성

- [ ] 01~06 섹션 구조로 네비게이션 재편
- [ ] 각 섹션에서 Figma / Storybook / GitHub 로 연결되는 링크 배치
- [ ] About: Fine Art → Frontend → 3D → Design Engineering 서사 정리
- [ ] Vercel 배포 및 OG 이미지 갱신

---

## 📐 원칙

1. **문서가 아니라 동작하는 결과물로 증명한다.** 스크린샷보다 조작 가능한 스토리.
2. **없는 경험을 억지로 채우지 않는다.** 이미 가진 R3F·GLSL·실서비스 경험을 시스템화한다.
3. **Figma를 크게 잡지 않는다.** 연결 고리 역할이면 충분하다.
4. **한 프로젝트 안에서 증명한다.** Three.js, Blender, GLSL 을 별개 데모로 흩뿌리지 않는다.
