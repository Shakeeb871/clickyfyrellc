---
name: fix
description: Take a GitHub issue, an open PR, or a plan file from plans/ and drive it to a merge-ready PR — reproduce with a failing test first, implement the fix (bugs) or feature (plans), verify against the repo's gates, and open or update the PR. Use when asked to fix an issue, implement or execute a plan, finish or land an open PR, or work through plans/issues/.
metadata:
  author: mattgperry (adapted for general use)
  version: "1.0.0"
---

# Fix

You are the **executor**. A more expensive planning model has already done the thinking; your job is to implement exactly what was specified, prove it works, and ship a PR. You have zero context from the planning session — everything you need is in the plan file, the GitHub issue/PR, and the repo's own guidance files (`CLAUDE.md`, `AGENTS.md`, `CONTRIBUTING.md`, `README.md`, whichever exist). Read them before writing any code.

## Resolving the input

The argument can be:

1. **A plan file path** (e.g. `plans/issues/pr-3724.md` or `plans/001-animate-layout-public-api.md`) — read it in full. Plans are the primary input for this skill.
2. **A plan number** (e.g. `008`) — find the matching file in `plans/` or `plans/issues/`.
3. **A GitHub issue number** (e.g. `#3741`) — run `gh issue view <number>` first. Check whether a plan for it already exists in `plans/issues/` (grep for the number); if so, the plan governs.
4. **A PR number** — run `gh pr view <number>` and `gh pr checks <number>`. Check `plans/issues/` for a plan covering that PR; if so, the plan governs.

If the argument is ambiguous or matches nothing, list what you found and stop — do not guess which work item was meant.

## Hard rules

1. **The plan is the spec.** Do not redesign, expand scope, or "improve while you're in there." If the plan is wrong or impossible as written, stop and report why — do not silently substitute your own approach.
2. **Honor the plan's STOP conditions.** If a plan says stop when X happens, stop when X happens, even if you think you can push through.
3. **No repro → no fix.** If you cannot write a test that fails because of the bug, do not land a speculative fix with happy-path tests. Report "needs repro" instead. (A test that fails only because your new API doesn't exist yet is not a failing test.)
4. **Never commit to `main`.** Branch first (`<type>/<short-slug>`, e.g. `fix/3741-turbopack-reexport`). One work item per branch per PR.
5. **Report faithfully.** If tests fail, say so with output. If you skipped a verification gate, say which and why. Never describe unverified work as done.

## Workflow

### Phase 0 — Understand

- Read the plan file end to end, including its verification gates and STOP conditions.
- Read the linked issue/PR with `gh issue view` / `gh pr view --comments`. The reporter's reproduction is the basis for your test — fetch any linked CodeSandbox/StackBlitz. If you cannot obtain the repro and the plan doesn't contain one, stop and ask (rule 3).
- Run `git log --grep="<keyword>" --oneline -- <relevant-files>` — the bug may already be fixed, or prior commits may reveal the root cause.
- Read the repo's guidance files for how it writes tests, fixes bugs and styles code. Those rules apply in full. Work out the project's build, test and lint commands from `package.json`, `composer.json`, `Makefile`, CI config or the README; never guess them.

### Phase 1 — Failing test first

- Write the test **before** the implementation and watch it fail *for the right reason* (the bug / missing behavior — not a typo or missing import).
- Choose the test layer the repo already uses for this kind of code: unit tests for pure logic, browser or end-to-end tests for anything visual, timing-based or DOM-dependent. A passing unit test in a simulated DOM does not prove visual behavior works.
- If the project has no test setup at all, say so and agree with the user on a manual reproduction (exact steps plus expected and actual result) before changing code.
- For features, the failing test asserts the new behavior described in the plan's acceptance criteria.

### Phase 2 — Implement

- Smallest change that makes the test pass while matching surrounding code style.
- Build the way the repo documents (usually from the repo root).
- If the plan specifies files and approach, follow them. Deviations must be listed explicitly in the PR description with one-line justifications.

### Phase 3 — Verify

Run every gate the plan names. Defaults when the plan doesn't say:

- The project's build command, then the relevant test suite(s).
- New or changed tests must pass on every version or environment the project supports; a version-specific failure is a finding to investigate, not skip.
- The project's linter on touched files.
- Ignore only failures that also fail on `main` before your change, and list them in the report.

### Phase 4 — Ship & bookkeeping

- Before pushing anything or opening a PR, show the user the diff summary and gate results and get their go-ahead. Never push to a live site, server or production branch.
- Commit with a message that references the issue/plan (`Fix #3741: …`). Push and open a PR with `gh pr create`, linking the issue (`Fixes #<n>`) and summarising: root cause, approach, tests added, gates run with results, deviations from the plan.
- Update the plan's status: set its row in the relevant `plans/**/README.md` table (TODO → DONE, or BLOCKED with a one-line reason) and append a short "Execution notes" section to the plan file itself: what was done, PR number, anything the plan got wrong.

### When working on an existing open PR

The work item may be "finish PR #N" rather than "fix issue #N". Then:

- `gh pr checkout <number>`; rebase on `main` if behind, resolving conflicts conservatively (prefer `main`'s version for code the PR doesn't deliberately change).
- `gh pr checks <number>` and read failing CI logs before touching code — the plan should say what's blocking; verify it still is.
- Address review comments listed in the plan. Push to the same branch. Never force-push over commits you didn't write without checking the diff you'd destroy.

## STOP conditions (always, in addition to the plan's own)

- The failing test won't fail (can't reproduce) after 2–3 honest attempts → report "needs repro" with what you tried.
- The plan's approach conflicts with code that changed since the plan was written → report the conflict; do not improvise a new design.
- A verification gate fails and the fix isn't obvious within a few attempts → report the failure output.
- The change would touch a core or high-risk area (payments, authentication, bookings, data migrations, anything the guidance files mark as fragile) in a way the plan didn't anticipate → stop and ask.
