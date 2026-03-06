# voxit-scripts

[![Sync meeting notes](https://github.com/patcon/voxit-scripts/actions/workflows/sync-meeting-notes.yml/badge.svg)][sync-logs]

Helper scripts for Voxit organizing tasks. Scripts run automatically on a schedule via GitHub Actions, committing results back to this repo.

| Trigger | Description | Logs |
|---------|-------------|------|
| Weekly (Fri 10am ET) | Sync meeting notes from pads | [![Sync meeting notes][sync-badge]][sync-logs] |

   [sync-badge]: https://github.com/patcon/voxit-scripts/actions/workflows/sync-meeting-notes.yml/badge.svg
   [sync-logs]: https://github.com/patcon/voxit-scripts/actions/workflows/sync-meeting-notes.yml

## Scripts

### `sync-meeting-notes.js`

Fetches meeting notes from collaborative pads and commits them to `meeting-notes/` as Markdown files. Sources are configured in [`meeting-notes/sources.csv`](meeting-notes/sources.csv) — set `do_backup=x` to enable a pad, and set `keyword` to control the subdirectory and filename suffix.

Supports [HackMD](https://hackmd.io) and [Riseup Etherpad](https://pad.riseup.net) URLs. Text wrapped in `~~double tildes~~` in the pad is redacted to `█` blocks in the archive.

Runs automatically every Friday. Can also be [triggered manually][sync-logs] via the GitHub Actions UI.

## Local Development

Requires [Bun](https://bun.sh).

```sh
bun test                                   # run tests
bun run scripts/sync-meeting-notes.js      # run sync manually
```
