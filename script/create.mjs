#!/usr/bin/env node

import chalk from 'chalk'
import { execSync } from 'child_process'
import inquirer from 'inquirer'

/* ======================================================
 * 1. Core Abstractions
 * ====================================================== */

const Effect = {
  of: (x) => () => Promise.resolve(x),

  fail: (e) => () => Promise.reject(e),

  chain: (f) => (effect) => async () => {
    const value = await effect()
    return f(value)()
  },

  map: (f) => (effect) => async () => {
    const value = await effect()
    return f(value)
  },

  catch: (f) => (effect) => async () => {
    try {
      return await effect()
    } catch (error) {
      return f(error)()
    }
  },

  run: async (effect) => await effect(),
}

const Either = {
  of: (x) => ({ type: 'right', value: x }),

  fromPredicate: (x, pred, onFail) =>
    pred(x)
      ? Either.of(x)
      : { type: 'left', value: onFail(x) },
}

const pipe =
  (...fns) =>
  (x) =>
    fns.reduce((y, f) => f(y), x)

/* ======================================================
 * 2. Configuration
 * ====================================================== */

const CONFIG = {
  tasks: [
    { value: 'feat', label: 'feat 새로운 기능' },
    { value: 'fix', label: 'fix 버그 수정' },
    { value: 'style', label: 'style UI/UX 수정' },
    { value: 'revert', label: 'revert 코드 되돌리기' },
    { value: 'refactor', label: 'refactor 코드 리팩토링' },
    { value: 'chore', label: 'chore 기타 작업' },
    { value: 'docs', label: 'docs 문서 관련' },
    { value: 'prune', label: 'prune 코드 제거' },
    { value: 'perf', label: 'perf 성능 개선' },
    { value: 'test', label: 'test 테스트 코드' },
  ],

  branches: {
    main: 'main',
    develop: 'dev',
  },

  pr: {
    titles: {
      release: 'Release',
    },

    templates: {
      feature: () =>
        [
          '## PR 목적',
          '<!-- 지라 이슈 혹은 작업 내용을 요약하여 적어주세요 -->',
          '',
          '## 작업 내용',
          '<!-- 작업한 내용에 대한 설명을 적어주세요 -->',
          '',
        ].join('\n'),

      release: (commits) =>
        commits
          .map((commit) => `- ${commit}`)
          .join('\n'),
    },
  },
}

/* ======================================================
 * 3. Infrastructure
 * ====================================================== */

const createGitClient = () => {
  const execGit = (cmd) =>
    execSync(cmd).toString().trim()

  const execGitSilent = (cmd) => {
    execSync(cmd, { stdio: 'ignore' })
  }

  return {
    getCurrentBranch: () =>
      execGit('git rev-parse --abbrev-ref HEAD'),

    getRepoInfo: () => {
      const remoteUrl = execGit(
        'git config --get remote.origin.url'
      )

      const [, owner, repo] =
        remoteUrl.match(
          /github\.com[:/]([^/]+)\/([^/.]+)(?:\.git)?$/i
        )

      return { owner, repo }
    },

    getLastCommitMessage: () => {
      const message = execGit(
        'git log -1 --pretty=%B'
      ).split('\n')[0]

      return message.replace(
        /^(feat|fix|style|revert|refactor|chore|prune|docs|perf|test):\s*/,
        ''
      )
    },

    getLocalCommitHash: () =>
      execGit('git rev-parse HEAD'),

    getRemoteCommitHash: (branch) => {
      try {
        return execGit(`git rev-parse origin/${branch}`)
      } catch {
        return null
      }
    },

    checkRemoteBranchExists: (branch) => {
      try {
        execGit(`git ls-remote --heads origin ${branch}`)
        return true
      } catch {
        return false
      }
    },

    getCommitsBetween: (base, head) => {
      try {
        const logs = execGit(
          `git log ${base}..${head} --oneline --no-decorate`
        )
        return logs
          .split('\n')
          .filter(Boolean)
          .map((line) => line.replace(/^[0-9a-f]+\\s+/, ''))
      } catch {
        return []
      }
    },

    pushWithProgress: async (branch, isUpdate) => {
      const message = isUpdate
        ? 'remote에 최신 커밋 push하는 중'
        : 'remote로 push하는 중'

      for (let i = 0; i <= 100; i += 10) {
        process.stdout.write(`\r${message}(${i}%)`)
        if (i < 100) {
          await new Promise((r) => setTimeout(r, 100))
        }
      }

      process.stdout.write('\n')

      execGitSilent(`git push -u origin ${branch}`)
    },
  }
}

/* ======================================================
 * 4. Main Logic
 * ====================================================== */

const formatCommitMessage = (message) => {
  return message.replace(
    /^(feat|fix|style|revert|refactor|chore|prune|docs|perf|test):\s*/,
    ''
  )
}

const main = async () => {
  try {
    const git = createGitClient()
    const currentBranch = git.getCurrentBranch()
    const { owner, repo } = git.getRepoInfo()

    console.log(chalk.blue(`\n현재 브랜치: ${currentBranch}\n`))

    // 1. Base 브랜치 선택 (dev -> main release 지원)
    const { targetBase } = await inquirer.prompt({
      type: 'select',
      name: 'targetBase',
      message: 'PR 대상(base) 브랜치를 선택하세요:',
      choices: [
        { name: `dev (${CONFIG.branches.develop})`, value: CONFIG.branches.develop },
        { name: `main (${CONFIG.branches.main})`, value: CONFIG.branches.main },
      ],
      default: CONFIG.branches.develop,
    })

    const isReleaseToMain = targetBase === CONFIG.branches.main

    // 2. Prefix 선택
    const { task } = await inquirer.prompt({
      type: 'select',
      name: 'task',
      message: 'PR prefix를 선택하세요:',
      choices: CONFIG.tasks.map((t) => ({
        name: t.label,
        value: t.value,
      })),
      default: CONFIG.tasks[0].value,
    })

    // 4. 커밋명 입력 (마지막 커밋 메시지에서 prefix 제거한 것을 기본값으로)
    const lastCommitMessage = git.getLastCommitMessage()
    const { commitMessage } = await inquirer.prompt({
      type: 'input',
      name: 'commitMessage',
      message: '커밋명을 입력하세요:',
      default: lastCommitMessage || '',
      validate: (input) => {
        if (!input.trim()) {
          return '커밋명을 입력해주세요.'
        }
        return true
      },
    })

    // PR 제목/본문 생성
    const prTitle = isReleaseToMain
      ? `${CONFIG.pr.titles.release}: ${commitMessage.trim()}`
      : `${task}: ${commitMessage.trim()}`

    const commitsForRelease = isReleaseToMain
      ? git.getCommitsBetween(CONFIG.branches.main, currentBranch)
      : []

    const prBody = isReleaseToMain
      ? CONFIG.pr.templates.release(commitsForRelease)
      : CONFIG.pr.templates.feature()

    console.log(chalk.green(`\nPR 제목: ${prTitle}`))
    console.log(
      chalk.green(`브랜치: ${currentBranch} -> ${targetBase}\n`)
    )

    // 5. 확인
    const { confirm } = await inquirer.prompt({
      type: 'confirm',
      name: 'confirm',
      message: '이 정보로 PR을 생성하시겠습니까?',
      default: true,
    })

    if (!confirm) {
      console.log(chalk.yellow('PR 생성이 취소되었습니다.'))
      process.exit(0)
    }

    // 6. 브랜치가 remote에 없으면 push
    const remoteBranchExists = git.checkRemoteBranchExists(currentBranch)
    if (!remoteBranchExists) {
      console.log(chalk.yellow(`\n브랜치 ${currentBranch}를 remote에 push합니다...\n`))
      await git.pushWithProgress(currentBranch, false)
    }

    // 7. GitHub CLI로 PR 생성 (토큰 불필요)
    console.log(chalk.blue('\nPR을 생성하는 중...\n'))

    try {
      // PR 본문을 임시 파일에 저장
      const fs = await import('fs')
      const path = await import('path')
      const os = await import('os')
      
      const tempFile = path.join(os.tmpdir(), `pr-body-${Date.now()}.txt`)
      fs.writeFileSync(tempFile, prBody)

      // GitHub CLI로 PR 생성
      const prCommand = `gh pr create --title "${prTitle}" --body-file "${tempFile}" --base ${targetBase} --head ${currentBranch}`

      
      const prUrl = execSync(prCommand, { encoding: 'utf-8' }).trim()

      // 임시 파일 삭제
      fs.unlinkSync(tempFile)

      console.log(chalk.green(`\n✅ PR이 성공적으로 생성되었습니다!\n`))
      console.log(chalk.cyan(`PR URL: ${prUrl}\n`))
    } catch (error) {
      // GitHub CLI가 없거나 로그인 안 된 경우
      if (error.message.includes('gh: command not found')) {
        console.error(chalk.red('\n❌ GitHub CLI가 설치되지 않았습니다.\n'))
        console.log(chalk.yellow('설치 방법:\n'))
        console.log(chalk.cyan('  macOS: brew install gh\n'))
        console.log(chalk.cyan('  그 외: https://cli.github.com/\n'))
      } else if (error.message.includes('authentication')) {
        console.error(chalk.red('\n❌ GitHub CLI에 로그인되지 않았습니다.\n'))
        console.log(chalk.yellow('로그인 방법:\n'))
        console.log(chalk.cyan('  gh auth login\n'))
      } else {
        console.error(chalk.red('\n❌ PR 생성 중 오류가 발생했습니다:\n'))
        console.error(error.message)
      }
      process.exit(1)
    }
  } catch (error) {
    console.error(chalk.red('\n오류가 발생했습니다:\n'))
    console.error(error.message)
    process.exit(1)
  }
}

// 실행
main()
