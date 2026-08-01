# Title

Audit homepage accessibility hotspots and log fixes

## Context

- Problem: Core homepage sections may contain accessibility issues (contrast, heading structure, keyboard navigation, focus visibility, and semantics).
- Why now: Catch and prioritize high-impact a11y issues early before additional UI changes.
- Links: src/app/page.tsx, src/components/Header.tsx, src/components/HeroWithTesting.tsx, src/components/Skills.tsx, src/components/Projects.tsx, src/components/Contact.tsx

## Acceptance criteria

- [x] Run an accessibility pass on key homepage sections (Header, Hero, Skills, Projects, Contact).
- [x] Document findings with severity (`high`, `medium`, `low`) in this issue's Notes section.
- [x] Create follow-up local issues for any `high` severity findings.
- [x] Mark this issue `done` once findings are documented and follow-ups are created.

## Status

done

Allowed values:
- needs-triage
- needs-info
- ready-for-agent
- ready-for-human
- wontfix
- done

## Notes

- 2026-05-18: created issue for first structured homepage accessibility audit.
- 2026-05-18: completed first-pass code audit across Header, HeroWithTesting, Skills, Projects, and Contact.
- 2026-05-18: finding (high) - icon-only project links lack accessible names in `src/components/Projects.tsx`; created follow-up `.scratch/accessibility/issue-add-accessible-labels-to-project-icon-links.md`.
- 2026-05-18: finding (medium) - mobile menu toggle in `src/components/Header.tsx` uses `aria-label` but does not expose expanded/collapsed state (`aria-expanded`) or a menu relationship (`aria-controls`).
- 2026-05-18: finding (medium) - phone reveal interaction in `src/components/Contact.tsx` uses an anchor with `href="#"` as a reveal control before number is shown; this should be a button for clearer semantics.
- 2026-05-18: finding (low) - section wrappers in `src/app/page.tsx` do not provide explicit accessible names; adding `aria-labelledby` to tie headings to regions would improve landmark navigation.
