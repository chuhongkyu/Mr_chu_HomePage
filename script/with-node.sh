#!/usr/bin/env bash
#
# .nvmrc 에 적힌 Node 로 전환한 뒤 인자로 받은 명령을 실행한다.
#
# Storybook 10 은 Node 22.12+ 를 요구하는데 이 머신의 기본 Node 는 더 낮을 수
# 있다. 매번 `nvm use` 를 먼저 치는 걸 잊게 되므로 스크립트가 알아서 맞춘다.
# nvm 이 없으면 현재 Node 로 그냥 실행하고, 버전이 모자라면 이유를 알려준다.
set -euo pipefail

root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
want="$(tr -d '[:space:]' <"$root/.nvmrc" 2>/dev/null || true)"

if [ -n "$want" ] && [ -s "${NVM_DIR:-$HOME/.nvm}/nvm.sh" ]; then
  # nvm 은 셸 함수라 source 해야 쓸 수 있다. nvm.sh 안의 미정의 변수 참조 때문에
  # -u 를 잠시 끈다.
  set +u
  # shellcheck disable=SC1091
  . "${NVM_DIR:-$HOME/.nvm}/nvm.sh"
  nvm use "$want" >/dev/null 2>&1 || nvm install "$want" >/dev/null
  set -u
fi

current="$(node -p 'process.versions.node')"
major="${current%%.*}"
rest="${current#*.}"
minor="${rest%%.*}"

if [ "$major" -lt 22 ] || { [ "$major" -eq 22 ] && [ "$minor" -lt 12 ]; }; then
  echo "✗ Node $current 로는 Storybook 을 띄울 수 없습니다 (22.12+ 필요)." >&2
  echo "  .nvmrc 는 ${want:-미설정} 을 가리킵니다. nvm 이 없다면 직접 올려주세요." >&2
  exit 1
fi

exec "$@"
