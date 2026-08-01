# Craig Pestell Portfolio

A portfolio platform that presents Craig Pestell's professional profile as a single-page experience, with data-driven content, user personalization, and experiment-aware hero behavior.

## Language

### Portfolio content

**Portfolio Dataset**:
The canonical structured content source for the site, including personal profile, skills, projects, experience, and education.
Avoid: CMS, content blob, static copy

**Personal Profile**:
Identity and contact-facing information shown across hero, contact, metadata, and structured data.
Avoid: bio object, profile card data

**Skills Catalog**:
A categorized list of skills with a proficiency level on a 1-10 scale.
Avoid: tags, keywords list

**Project Portfolio**:
The collection of project entries used in featured and non-featured project sections.
Avoid: case studies list, gallery

**Career Timeline**:
Ordered professional experience entries with achievements and technologies.
Avoid: work history blob

**Education Record**:
Formal education entries displayed in the experience/education section and resume output.
Avoid: schooling list

### Page composition

**Landing Composition**:
The top-level homepage assembly of major sections (Header, Hero, Skills, Projects, Experience, Contact, Footer controls).
Avoid: monolith page

**Section Component**:
A focused UI module rendering one domain slice from the Portfolio Dataset.
Avoid: widget, partial

**Structured Data Output**:
SEO-oriented schema output derived from the same domain content used in UI sections.
Avoid: SEO copy, metadata-only content

### Personalization and appearance

**Theme Profile**:
A named visual theme applied through CSS variables and data attributes.
Avoid: palette toggle, random skin

**Dark Mode Preference**:
A persistent user choice for dark or light rendering mode.
Avoid: theme (too broad)

**Typography Preferences**:
Persistent user choices for font family and letter spacing.
Avoid: style tweaks

**Personalization Controls**:
Footer/UI controls that update and persist visual preferences client-side.
Avoid: settings panel (generic)

### Resume and contact flows

**Resume Export**:
On-demand generation and download of a PDF resume, triggered by resume actions and loaded lazily to keep the main bundle lean.
Avoid: static resume file

**Contact Submission**:
A contact form submission flow that sends form content through EmailJS.
Avoid: lead pipeline, ticket submission

**Revealable Phone**:
A phone display pattern that starts obfuscated and can be intentionally revealed by the user.
Avoid: masked input

### Experiments and analytics

**Experiment Definition**:
A configured experiment with traffic allocation, status, and weighted variants.
Avoid: feature branch, release switch

**Variant Assignment**:
The selected variant for a user/session for a given experiment.
Avoid: random pick

**Exposure Event**:
A record that a user saw a specific experiment variant.
Avoid: impression (unless analytics provider requires it)

**Conversion Event**:
A tracked user action tied to experiment evaluation.
Avoid: click log (too narrow)

**Edge Assignment Flow**:
Middleware and edge-config-driven process that assigns variants and persists assignment context.
Avoid: frontend-only split testing

**Experiment Dashboard**:
A route and component set that surfaces experiment configuration and analytics state.
Avoid: admin panel (too broad)

## Relationships

- The Portfolio Dataset is the single source of truth for homepage content, structured data output, and resume export inputs.
- Landing Composition renders Section Components in a fixed narrative order for the portfolio journey.
- Skills Catalog, Project Portfolio, Career Timeline, and Education Record are independent slices within the same Portfolio Dataset.
- Theme Profile, Dark Mode Preference, and Typography Preferences together form the user personalization state.
- Personalization Controls write client-side preferences that Theme Provider reads and applies after hydration.
- Resume Export is an on-demand flow and should not bloat the initial page bundle.
- Contact Submission uses external EmailJS transport and reports success/error status back to the user.
- Experiment Definitions determine possible variants; Variant Assignment chooses one for a user under traffic constraints.
- Exposure and Conversion events are analytics artifacts used to evaluate experiment outcomes.
- Edge Assignment Flow can provide authoritative assignment behavior beyond client-only randomization.

## Operational rules and invariants

- Update Portfolio Dataset before changing equivalent hardcoded copy in section components.
- Experiment traffic and variant weights are represented as decimal fractions between 0 and 1, not percentages.
- Personalization preference keys are stable contract keys and should not be renamed casually.
- Browser-only behaviors (local storage, hydration-sensitive preference application, tracking side effects) must stay in client-safe flows.
- Resume Export remains lazy-loaded unless a deliberate architecture change is made.
- Missing domain docs in other locations should not block day-to-day feature work in this single-context repo.

## Example dialogue

> Dev: If we want to update the hero summary text, where should we edit first?
> Domain expert: Update the Personal Profile in the Portfolio Dataset first, then confirm Hero and Structured Data Output reflect it.

> Dev: Are theme and dark mode the same concept?
> Domain expert: No. Theme Profile is the design system palette/variables, while Dark Mode Preference is a light-vs-dark rendering mode.

> Dev: How should we describe CTA testing in this repo?
> Domain expert: As an Experiment Definition with weighted variants, Variant Assignment, Exposure Events, and Conversion Events.

> Dev: Why is resume generation lazy-loaded?
> Domain expert: Resume Export is on-demand. Keeping PDF tooling out of initial load preserves landing performance.

## Flagged ambiguities

- **Theme vs Dark Mode**: Frequently conflated. Theme Profile and Dark Mode Preference are separate dimensions.
- **Hero variant naming**: Hero and experiment-aware hero implementations can be mixed in conversation. Prefer Experiment-aware Hero when discussing variant behavior.
- **Portfolio content vs presentation copy**: Content changes should usually start in Portfolio Dataset, not in section markup.
- **Analytics storage mode**: Development may use local persistence while production can use external analytics; do not assume identical storage behavior across environments.
