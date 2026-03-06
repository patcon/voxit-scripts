# voxit-scripts

[![Sync meeting notes](https://github.com/patcon/voxit-scripts/actions/workflows/sync-meeting-notes.yml/badge.svg)][sync-logs] [![Deploy site](https://github.com/patcon/voxit-scripts/actions/workflows/deploy-site.yml/badge.svg)][deploy-logs]

Helper scripts for Voxit organizing tasks. Scripts run automatically on a schedule via GitHub Actions, committing results back to this repo. Meeting notes are published to a [public website][site].

   [site]: https://patcon.github.io/voxit-scripts/

| Trigger | Description | Logs |
|---------|-------------|------|
| Weekly (Fri 10am ET) | Sync meeting notes from pads | [![Sync meeting notes][sync-badge]][sync-logs] |
| Push to `main` | Build and deploy meeting notes site | [![Deploy site][deploy-badge]][deploy-logs] |

   [sync-badge]: https://github.com/patcon/voxit-scripts/actions/workflows/sync-meeting-notes.yml/badge.svg
   [sync-logs]: https://github.com/patcon/voxit-scripts/actions/workflows/sync-meeting-notes.yml
   [deploy-badge]: https://github.com/patcon/voxit-scripts/actions/workflows/deploy-site.yml/badge.svg
   [deploy-logs]: https://github.com/patcon/voxit-scripts/actions/workflows/deploy-site.yml

## Scripts

### `sync-meeting-notes.js`

Fetches meeting notes from collaborative pads and commits them to `meeting-notes/` as Markdown files. Sources are configured in [`meeting-notes/sources.csv`](meeting-notes/sources.csv) — set `do_backup=x` to enable a pad, and set `keyword` to control the subdirectory and filename suffix.

Supports [HackMD](https://hackmd.io) and [Riseup Etherpad](https://pad.riseup.net) URLs. Text wrapped in `~~double tildes~~` in the pad is redacted to `█` blocks in the archive. Pad title must include a date in `YYYY/MM/DD` or `YYYY-MM-DD` format anywhere in the first heading.

Runs automatically every Friday. Can also be [triggered manually][sync-logs] via the GitHub Actions UI.

### `site/`

Static [Astro](https://astro.build) site that renders the archived meeting notes. Deployed automatically to [GitHub Pages][site] on every push that changes `meeting-notes/` or `site/`. Uses Tailwind CSS and shows redaction banners with links to the private repo for notes containing `█` blocks.

## Local Development

Requires [Bun](https://bun.sh).

```sh
bun test                                   # run tests
bun run scripts/sync-meeting-notes.js      # run sync manually (no commit)

cd site && bun install                     # install site dependencies (first time)
cd site && bun run dev                     # preview at localhost:4321/voxit-scripts
cd site && bun run build                   # build static site to site/dist/
```
