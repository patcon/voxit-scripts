# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```sh
bun test                          # run all tests
bun test --test-name-pattern foo  # run a single test by name
bun run scripts/sync-meeting-notes.js  # run sync manually (reads meeting-notes/sources.csv)
```

## Architecture

All automation logic lives in `scripts/` as plain ES modules (Node-compatible, run with Bun). The GitHub Actions workflow in `.github/workflows/` is a thin wrapper: checkout → setup-bun → run script → commit & push.

### Meeting notes sync

`scripts/sync-meeting-notes.js` drives the full sync:

1. Reads `meeting-notes/sources.csv` — rows with `do_backup=x` are processed; the `keyword` column determines the output subdir (`meeting-notes/<keyword>/`) and filename suffix (`<iso-date>-<keyword>.md`).
2. Converts each `resource_url` to a raw content URL via `toFetchUrl()` (supports HackMD and Riseup Etherpad).
3. Parses the ISO date from the first line of the fetched content (expects `# Title - YYYY/MM/DD`).
4. Applies `normalizeIndents()` (tab → 2-space, needed for Etherpad exports) and `redactStrikethrough()` (`~~text~~` → `█` blocks, 1 block per 5 chars) before writing.

All helper functions are named exports for unit testing. The main block runs only when the script is executed directly (`import.meta.main`).

### Workflow behaviour

- Runs weekly Friday 15:00 UTC (10am EST / 11am EDT) and on `workflow_dispatch`.
- Commits changes to `meeting-notes/` back to `main` as `github-actions[bot]`.

## Conventions

- Work directly on `main` — no PRs needed for this repo.
- Pad title must include a date in `YYYY/MM/DD` format for the filename to be generated correctly.
- To redact sensitive text in a pad, wrap it with `~~double tildes~~` (native Markdown strikethrough). The sync script replaces it with `█` blocks.
