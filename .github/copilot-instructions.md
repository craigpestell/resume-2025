# Copilot instructions

## Build, lint, and test commands

- Use Node.js 22.x (`package.json` engines).
- `npm run dev` starts the Next.js 15 app with Turbopack.
- `npm run build` creates the production build and also runs Next's lint/type validation during the build.
- `npm run lint` runs the repository's current lint command (`next lint`).
- `npm run storybook` starts Storybook with the stories in `src/stories/`.
- `npm run build-storybook` builds Storybook statically.
- There is currently **no** `npm test` script in `package.json`. Tests are configured through Vitest + Storybook in `vitest.config.ts`.
- Before browser tests, install Playwright browsers once with `npx playwright install`.
- Run the full Storybook/Vitest suite with `npx vitest --project storybook --run`.
- Run a single test file with `npx vitest --project storybook --run src/stories/Button.stories.ts`.

## High-level architecture

- This is a Next.js 15 App Router portfolio site. `src/app/page.tsx` assembles the landing page from section components (`Header`, `HeroWithTesting`, `Skills`, `Projects`, `Experience`, `Contact`) and feeds them from the shared `portfolioData` object.
- `src/data/portfolio.ts` is the canonical content and schema source for the site. Personal info, skills, projects, experience, and education are defined there and reused by the homepage, structured data, and resume generation.
- The app shell lives in `src/app/layout.tsx`. It sets SEO metadata, mounts Vercel Analytics/Speed Insights, wraps the app in `ThemeProvider`, and loads the default font plus the dynamic font loader.
- Theming is split between CSS variables and client-side persisted preferences. `src/app/globals.css` imports all theme CSS files from `src/app/themes/`, while `src/components/ThemeProvider.tsx` applies `data-theme`, dark mode, font, and letter-spacing choices from localStorage after hydration.
- Resume generation is intentionally on-demand. `src/app/page.tsx` lazy-loads `src/components/ResumeGenerator.tsx` so `@react-pdf/renderer` stays out of the main bundle until the user downloads the resume.
- The hero section is experiment-aware. `src/components/HeroWithTesting.tsx` uses `src/hooks/useEdgeExperiment.ts`, which reads experiment variants through `src/lib/edgeConfig.ts`.
- Experiment data flows through multiple layers: `src/middleware.ts` assigns users into Edge Config experiments and sets cookies, `src/app/api/experiments/route.ts` exposes live or fallback experiment definitions, and `src/app/dashboard/page.tsx` with `src/components/EdgeConfigDashboard.tsx` displays experiment status and analytics.
- Analytics for experiments are persisted locally in development through `src/app/api/analytics/track/route.ts` and `src/lib/analyticsStorage.ts`, which writes to `.analytics-data.json` at the repository root.

## Key conventions

- Prefer updating `src/data/portfolio.ts` before editing copy inside components. Most user-facing content is meant to flow from that central data file rather than being duplicated in section components.
- Use the `@/*` path alias from `tsconfig.json` for internal imports instead of long relative paths.
- Keep browser-only behavior inside client components and hydration-safe effects. Theme/font selection, localStorage access, and experiment tracking all assume client-side execution after hydration.
- Preserve the existing localStorage keys when working on personalization features: `selected-dark-mode`, `selected-theme`, `selected-font`, `selected-letter-spacing`, and the experiment-related keys in `src/lib/edgeConfig.ts`.
- Storybook stories in `src/stories/` are the current test surface. There are no conventional `*.test.ts(x)` files in the repo right now; Vitest is wired to Storybook stories via `@storybook/addon-vitest`.
- Experiment configuration uses decimal fractions, not percentages: both experiment `traffic` and variant `weight` are stored as `0-1` values.
- When adding heavyweight client dependencies, follow the existing pattern of lazy-loading them only when needed (`@react-pdf/renderer` for resume generation, `@emailjs/browser` on contact form submit, Google fonts in `DynamicFontLoader`).
- Theme styling relies on semantic CSS variables (`--background`, `--foreground`, `--primary`, etc.) exposed through Tailwind v4 in `src/app/globals.css`; theme work should usually be done in the theme CSS files, not by hardcoding colors in components.
