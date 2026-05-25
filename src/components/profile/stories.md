# Profile – Story System

## 개념

방문자가 내 이야기를 읽으면 코인을 보상으로 받고, 그 코인으로 3D 세계에 오브젝트를 배치해 공간을 채워가는 시스템.

```
이야기 읽기 → 코인 획득 → 인벤토리에서 아이템 구매 → 3D 공간 배치
```

---

## 이야기 채널 구조

### 상단 NavBar (회사 / 커리어 이야기)

- 기존 4개 아이콘 (Home / About / Game / Resume) + **회사 스토리 아이콘** 추가 예정
- Swiper FreeMode — 아이템이 늘어날수록 왼쪽으로 스와이프해서 탐색
- 각 스토리 아이콘 → 상세 스토리 페이지(`/story/[id]`) 또는 외부 링크로 이동
- **코인 발급**: 상세 페이지 체류 시간 기반 (현재 5초 카운트다운)

```
NavBar 예시 아이콘
────────────────────────────────────────────── →
[Home] [About] [Game] [Resume] [GDC] [3D Web] …
```

### 하단 배너 (개인 / 게임 이야기)

- `ProfileContents` 영역 — Swiper 카드 형식
- 직접 만든 게임, 개인 프로젝트, 사이드 스토리
- 내부 페이지(`/game`, `/project/[id]`) 또는 외부 링크로 연결
- **코인 발급**: 동일 5초 카운트다운 방식 적용 예정

---

## 데이터 구조

### Story 타입 (확장 예정)

```ts
// constants/stories.ts (현재 linkedinPosts.ts)
export type StorySource = 'linkedin' | 'internal';

export type Story = {
  id: string;
  title: string;
  description: string;
  image: string;
  source: StorySource;
  linkedinPostId?: string; // LinkedIn embed용 activity ID
  href?: string;           // 내부 라우트
  externalUrl?: string;    // 외부 링크
  coinReward: number;      // 보상 코인 수
};
```

### 이야기 추가 방법

**NavBar 회사 스토리 추가 (`ProfileHeader.tsx`)**

```tsx
const NAV_ITEMS = [
  { href: "/", icon: Home, label: "Home" },
  ...
  // 회사 스토리 아이콘 추가
  { href: "/story/gdc", icon: Globe, label: "GDC" },
];
```

**하단 배너 스토리 추가 (`constants/stories.ts`)**

```ts
{
  id: 'my-game',
  title: '게임 만든 이야기',
  description: '직접 Unity로 만든 게임과 그 과정',
  image: '/assets/og/game.jpg',
  source: 'internal',
  href: '/game',
  coinReward: 1,
}
```

---

## 코인 보상 흐름

```
PostCard 클릭
  → LinkedInPopup 오픈
    → 5초 카운트다운 (체류 확인)
      → useCoinStore.earn(coinReward) 호출
        → CoinRewardModal 표시
          → usePostViewStore.markViewed(id) → 재방문 시 카운트다운 스킵
```

- `useCoinStore`: 코인 총량 관리 (Zustand, localStorage 미영속)
- `usePostViewStore`: 읽은 이야기 ID 기록
- 이미 읽은 이야기 재방문 시 코인 미지급, `✓ 읽음` 배지 표시

---

## 스토리 상세 페이지 (예정)

```
/story/[id]
  ├── page.tsx        — 스토리 본문 (마크다운 or Notion 연동)
  └── layout.tsx      — 뒤로가기 + 코인 카운트다운 포함
```

- 현재는 LinkedIn iframe 팝업 방식
- 향후 내부 페이지 방식으로 마이그레이션 예정

---

## 현재 이야기 목록

| id | 제목 | 채널 | 타입 |
|----|------|------|------|
| 7122521989285625856 | 3D 인터랙티브 웹 개발 | 하단 배너 | LinkedIn |
| 7310031891129143297 | GDC 참가 경험 | 하단 배너 | LinkedIn |
| (예정) | 게임 개발 이야기 | 하단 배너 | Internal |
