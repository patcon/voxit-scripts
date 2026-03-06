# Changelog

## [Unreleased][]

## [0.2.0][] (2026-03-06)

### Added
- Static Astro site at `site/` deployed to GitHub Pages via `deploy-site.yml`; group/meeting listing pages, redaction banners linking to private repo
- `general-wg` pad added to `sources.csv`

### Fixed
- Date parsing now accepts `YYYY-MM-DD` (dashes) in addition to `YYYY/MM/DD`, and searches the first `#` heading rather than line 0 (supports pads with YAML frontmatter)

## [0.1.0][] (2026-03-06)

### Added
- Weekly sync of meeting notes from HackMD and Riseup Etherpad pads via GitHub Actions (Fridays 10am ET)
- `sources.csv` configures which pads to archive (keyword, URL, `do_backup` flag)
- Tab indents normalized to 2-space; strikethrough (`~~text~~`) redacted to `█` blocks
- Job summary in sync workflow showing which files were created or updated
- README and CLAUDE.md

<!-- Links -->
[Unreleased]: https://github.com/patcon/voxit-scripts/compare/v0.2.0...main
[0.2.0]: https://github.com/patcon/voxit-scripts/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/patcon/voxit-scripts/releases/tag/v0.1.0
