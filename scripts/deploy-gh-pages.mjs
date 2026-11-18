import { execFileSync, spawnSync } from 'node:child_process'
import { cpSync, existsSync, mkdtempSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { tmpdir } from 'node:os'

/**
 * Manual GitHub Pages release (without GitHub Actions).
 * Rebuild from audited source, then fast-forward the existing gh-pages branch.
 * Never force-push or modify the source/main branch.
 */
const root = resolve(import.meta.dirname, '..')
const dist = join(root, 'dist')
const expectedRepo = 'genai-passport-prep'
const base = '/genai-passport-prep/'

function run(command, args, options = {}) {
  const res = spawnSync(command, args, { cwd: root, env: process.env, stdio: 'inherit', ...options })
  if (res.error) throw res.error
  if (res.status !== 0) throw new Error(`Failed: ${command} ${args.join(' ')} (exit ${res.status})`)
}

function git(args, cwd = root) {
  return execFileSync('git', args, { cwd, encoding: 'utf8' }).trim()
}

if (!existsSync(join(root, 'package-lock.json'))) throw new Error('package-lock.json is required')
const currentBranch = git(['branch', '--show-current'])
if (currentBranch !== 'main') throw new Error(`Expected main branch, found: ${currentBranch}`)
if (git(['status', '--porcelain'])) throw new Error('Working tree is not clean. Commit changes first.')
const remoteUrl = git(['remote', 'get-url', 'origin'])
if (!remoteUrl.includes(expectedRepo)) throw new Error('Unexpected origin remote: ' + remoteUrl)

const sourceSha = git(['rev-parse', 'HEAD'])
console.log('Source:', sourceSha)

run('npm', ['ci'])
run('npm', ['run', 'audit:questions'])
run('npm', ['run', 'build'], { env: { ...process.env, VITE_BASE: base } })

if (!existsSync(join(dist, 'index.html'))) throw new Error('Built index.html not found')
const requiredAssets = ['backgrounds', 'apple-touch-icon-v2.png', 'icon-512-v2.png']
for (const asset of requiredAssets) {
  if (!existsSync(join(dist, asset))) {
    throw new Error(`Refusing to publish: missing protected asset in dist/${asset}`)
  }
}
const temp = mkdtempSync(join(tmpdir(), 'genai-passport-pages-'))
const site = join(temp, 'site')
let worktreeAdded = false
try {
  run('git', ['fetch', 'origin', 'gh-pages'])
  run('git', ['worktree', 'add', '--detach', site, 'origin/gh-pages'])
  worktreeAdded = true
  for (const filename of readdirSync(site)) {
    if (filename !== '.git') rmSync(join(site, filename), { recursive: true, force: true })
  }
  for (const filename of readdirSync(dist)) {
    cpSync(join(dist, filename), join(site, filename), { recursive: true, force: true })
  }
  writeFileSync(join(site, '.nojekyll'), '')
  run('git', ['add', '-A'], { cwd: site })
  const diff = spawnSync('git', ['diff', '--cached', '--quiet'], { cwd: site })
  if (diff.error) throw diff.error
  if (diff.status === 0) {
    console.log('No changes to publish.')
  } else if (diff.status === 1) {
    run('git', ['commit', '-m', `deploy: audited 2027 passport ${sourceSha.slice(0, 12)}`], { cwd: site })
    // Plain push is intentionally non-forced: concurrent publication must fail safely.
    run('git', ['push', 'origin', 'HEAD:refs/heads/gh-pages'], { cwd: site })
    console.log('Published GitHub Pages assets from source commit', sourceSha)
  } else {
    throw new Error('git diff failed: exit ' + diff.status)
  }
} finally {
  if (worktreeAdded) run('git', ['worktree', 'remove', '--force', site])
  rmSync(temp, { recursive: true, force: true })
}
