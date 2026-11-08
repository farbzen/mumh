# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.2] - 2026-11-09

### Fixed

- Root element clips overflow again, as it did before 1.0.1.
- Footer takes up less vertical space on small screens.

## [1.0.1] - 2026-11-09

### Added

- Link to the author's GitHub profile in the top left corner.

### Changed

- Privacy policy mentions the GitHub link under external links.

### Fixed

- Footer text and Ko-fi icon are sized for mobile; the Ko-fi label is only shown
  on large screens.

## [1.0.0] - 2026-11-08

### Added

- Static site generator in Rust with Askama templates, building the site into
  `dist/`.
- Random monster roll with temper level (normal, tempered, arch-tempered) and
  capture/kill objective.
- Random weapon roll for one to four hunters with editable names.
- Staggered card animations with a roll lock until all cards have settled.
- English and German translations with a language switcher.
- Persistence of language, player count, names, weapons and the last monster in
  `localStorage`.
- Legal notice and privacy policy modal.
- GitHub Pages deployment via GitHub Actions.
