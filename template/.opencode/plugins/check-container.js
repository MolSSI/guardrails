// Riprap-managed required-location adapter. Do not edit; use copier update.

import { existsSync } from 'node:fs'
import { join } from 'node:path'

const message =
  'Riprap: OpenCode must run inside the project development container. ' +
  'Launch it with "bash rr.sh" (or "rr.bat" on Windows).'

const CHECK_SCRIPT = '.riprap/managed/hooks/check-container.sh'

// OpenCode derives `worktree` from git, so it is empty whenever git cannot
// resolve one: a checkout that was never `git init`-ed, a bare repository, or a
// bind-mounted repository whose ownership git refuses as "dubious". None of
// those say anything about whether we are containerized, yet keying the
// guardrail on `worktree` alone refuses every prompt in them even inside the
// container. Locate the managed check from whichever project root OpenCode does
// provide, falling back to the working directory, so the boundary tracks the
// real container check rather than git state.
function locateCheck(roots) {
  for (const root of roots) {
    if (!root) continue
    const script = join(root, CHECK_SCRIPT)
    if (existsSync(script)) return script
  }
  return undefined
}

function rejectOutsideContainer({ directory, worktree }) {
  if (process.platform === 'win32') throw new Error(message)

  // Fail closed: with no managed check to consult, refuse rather than assume a
  // container. On a host the check is found and reports failure, so the refusal
  // is the same either way.
  const script = locateCheck([directory, worktree, process.cwd()])
  if (!script) throw new Error(message)

  const result = Bun.spawnSync(['bash', script])
  if (result.exitCode !== 0) throw new Error(message)
}

export const RiprapContainerCheck = async ({ directory, worktree }) => ({
  'chat.message': async () => rejectOutsideContainer({ directory, worktree }),
})
