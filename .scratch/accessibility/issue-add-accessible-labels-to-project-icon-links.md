# Title

Add accessible names to icon-only project links

## Context

- Problem: Icon-only links in project cards do not expose an accessible name, so screen reader users cannot identify link purpose.
- Why now: This is a high-severity accessibility issue affecting core portfolio navigation in the Projects section.
- Links: src/components/Projects.tsx

## Acceptance criteria

- [ ] Every icon-only anchor in project cards has a descriptive accessible name (for example via `aria-label` and optional visually hidden text).
- [ ] Accessible names include project context (for example project title + destination such as GitHub repository).
- [ ] Keyboard and screen-reader checks confirm links are announced meaningfully.
- [ ] No regressions in visual layout.

## Status

ready-for-agent

Allowed values:
- needs-triage
- needs-info
- ready-for-agent
- ready-for-human
- wontfix
- done

## Notes

- 2026-05-18: created from homepage accessibility audit as a high-severity follow-up.
