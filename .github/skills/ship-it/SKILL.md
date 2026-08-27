---
name: ship-it
description: "Deploy the Craig Pestell portfolio through the main branch. Use when: the user asks to ship, deploy, publish, release, or push the site to Vercel."
---

# Ship It

This portfolio deploys automatically through Vercel when commits are pushed to the `main` branch.

## Deployment Routine

1. Confirm the current branch is `main`.
2. Inspect `git status` and the diff. Include only changes intended for this release; never discard unrelated working-tree changes.
3. Run the most relevant available validation for the changes. For normal application changes, use `npm run lint`; use `npm run build` when a production build check is warranted.
4. Summarize the changes and validation result.
5. Treat an explicit request to ship, deploy, publish, release, or push as authorization to commit and push.
6. Commit the intended changes with a concise, imperative message.
7. Push the commit to `origin main`.
8. Report the commit hash and that Vercel will detect the push and begin deployment.

## Guards

- Do not deploy from any branch other than `main` without explicit user direction.
- Do not force-push, amend published commits, reset, or discard changes as part of this routine.
- A successful `git push` starts the Vercel deployment but does not prove it completed successfully. Report deployment completion only when it has been independently verified.
- Treat credentials, environment variables, and Vercel configuration as out of scope unless the user specifically asks to change them.

## Example Prompts

- "Ship the current portfolio changes."
- "Deploy this to Vercel."
- "Commit and push the latest changes."
