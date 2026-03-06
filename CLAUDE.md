# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```sh
bun test                          # run all tests
bun test --test-name-pattern foo  # run a single test by name
bun run scripts/sync-meeting-notes.js  # run sync manually (reads meeting-notes/sources.csv)

cd site && bun install            # install site dependencies
cd site && bun run dev            # preview site at localhost:4321/voxit-scripts
cd site && bun run build          # build static site to site/dist/
```

## Architecture

All automation logic lives in `scripts/` as plain ES modules (Node-compatible, run with Bun). The GitHub Actions workflows in `.github/workflows/` are thin wrappers around scripts or build steps.

### Meeting notes sync

`scripts/sync-meeting-notes.js` drives the full sync:

1. Reads `meeting-notes/sources.csv` — rows with `do_backup=x` are processed; the `keyword` column determines the output subdir (`meeting-notes/<keyword>/`) and filename suffix (`<iso-date>-<keyword>.md`).
2. Converts each `resource_url` to a raw content URL via `toFetchUrl()` (supports HackMD and Riseup Etherpad).
3. Parses the ISO date from the first `#` heading line of the fetched content (skips YAML frontmatter if present). Accepts both `YYYY/MM/DD` and `YYYY-MM-DD` formats, anywhere in the title.
4. Applies `normalizeIndents()` (tab → 2-space, needed for Etherpad exports) and `redactStrikethrough()` (`~~text~~` → `█` blocks, 1 block per 5 chars) before writing.

All helper functions are named exports for unit testing. The main block runs only when the script is executed directly (`import.meta.main`).

### Astro site

`site/` is a static Astro site deployed to GitHub Pages at `https://patcon.github.io/voxit-scripts/`. It reads files directly from `meeting-notes/` at build time (via Node.js `fs`) — no content collections or symlinks needed.

- `site/src/lib/meetingNotes.js` — reads and parses all meeting note files
- `site/src/pages/index.astro` — home: group cards + recent meetings
- `site/src/pages/[group]/index.astro` — per-group listing
- `site/src/pages/[group]/[slug].astro` — individual meeting, with redaction banner if content has `█` blocks

### Workflow behaviour

- **sync-meeting-notes**: Runs weekly Friday 15:00 UTC and on `workflow_dispatch`. Commits changes to `meeting-notes/` back to `main` as `github-actions[bot]`.
- **deploy-site**: Triggers on pushes to `main` that touch `meeting-notes/**` or `site/**`. Builds the Astro site and deploys to GitHub Pages.

## Conventions

- Work directly on `main` — no PRs needed for this repo.
- Always `git pull --rebase` before pushing. The workflow autocommits to `main` on its schedule, so the remote will frequently be ahead.
- Pad title must include a date in `YYYY/MM/DD` or `YYYY-MM-DD` format (anywhere in the first `#` heading) for the filename to be generated correctly.
- To redact sensitive text in a pad, wrap it with `~~double tildes~~` (native Markdown strikethrough). The sync script replaces it with `█` blocks.
- Update `CHANGELOG.md` for significant changes (new features, fixes, notable behaviour changes). Merge small related changes into a single entry rather than listing every commit.
