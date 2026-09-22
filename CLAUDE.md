# CLAUDE.md

1인 저장소다. 아래 규칙은 그 전제 위에서 정해졌다.

## Git 워크플로

**`dev` 가 작업 브랜치, `main` 이 배포 브랜치다.**

```
dev 에 직접 커밋  →  쌓이면  →  dev → main Release PR
```

1. **평소 작업은 `dev` 에서 직접 커밋한다.** 기능마다 `feat/*` 브랜치를 따지 않는다.
2. **`main` 은 `dev` 머지로만 변한다.** `main` 에 직접 커밋하지 않는다.
3. 한 덩어리가 끝나면 `npm run pr` 로 base 를 `main` 으로 골라 Release PR 을 만든다.
   `main..dev` 커밋 목록이 본문으로 자동으로 들어간다.

### 왜 feature 브랜치를 안 쓰나

브랜치의 값어치는 머지 전 검증인데 이 저장소엔 그게 없다. PR 에서 도는 CI 가
없고(`.github/workflows` 에는 월 1회 cron 인 `notion-sync.yml` 뿐이다),
`main` 브랜치 보호도 사실상 꺼져 있다. 혼자 쓰는 저장소라 리뷰 게이트도 없다.
단계만 하나 더 있고 얻는 게 없어서 걷어냈다.

### 그래도 브랜치를 따는 경우

되돌릴 가능성이 있는 큰 실험. `dev` 에서 따서 `dev` 로 머지한다.
`main` 을 base 로 삼지 않는다. 이번 규칙은 기본값을 바꾼 것이지 브랜치를
금지한 게 아니다.

### 봇 커밋

`notion-sync.yml` 은 `ref: dev` 로 체크아웃해서 `dev` 에 커밋한다.
`main` 이 `dev` 머지로만 변한다는 규칙에 예외를 두지 않기 위해서다.
워크플로를 고칠 때 이 `ref` 를 지우면 봇 커밋이 `main` 에 직접 얹힌다.

## 커밋

한 줄, 본문 없음. `type: 한국어 설명` 형식.

```
chore: SEO 최신화
feat: 경험 회고 추가
refactor: 씬 전체 변경
```

타입은 `script/create.mjs` 의 `CONFIG.tasks` 를 따른다 —
`feat` `fix` `style` `revert` `refactor` `chore` `docs` `prune` `perf` `test`.

## Node

`.nvmrc` 가 유일한 기준이다. CI(`node-version-file`)와
`script/with-node.sh` 가 둘 다 이 파일을 읽는다. 버전을 올릴 땐 여기만 고친다.

패키지 매니저는 **npm** 이다. `package.json` 의 `packageManager` 필드와
`package-lock.json` 이 맞물려 있으니 yarn·pnpm 으로 설치하지 않는다.

## 주석

`.claude/skills/code-comments` 를 따른다.
