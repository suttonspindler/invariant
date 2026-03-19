# Invariant — Interactive Computer Science Education Platform

---

## Document Information

| Field | Value |
|-------|-------|
| **Author** | Founder (Solo Developer) |
| **Status** | Draft |
| **Timeline** | v1 target: 4-6 weeks from start |
| **Last Updated** | 2026-03-19 |

---

**Document Status:** Draft — Generated with AI assistance based on detailed founder requirements.
**Review Required:** Validate all requirements, technical decisions, and scope before implementation.

---

## Executive Summary

### Problem Statement

In 2026, AI code-generation tools (Copilot, Claude, Cursor) have eliminated the barrier to *writing* code. A developer can produce a working function in seconds. However, the barrier to *understanding* Computer Science — algorithmic thinking, complexity analysis, system design — is higher than ever. Universities and bootcamps have not adapted their curriculums to integrate AI or to shift emphasis from syntax to logic.

The result: a generation of developers who can prompt AI to write a for-loop but cannot reason about *why* merge sort is O(n log n), *when* dynamic programming applies, or *how* to architect a system that scales. The founder experienced this gap firsthand during university algorithms coursework, where the lack of interactive, visual examples made abstract concepts unnecessarily difficult to internalize.

No existing platform combines (1) interactive, scrubbable algorithm visualizations, (2) curated historical context on CS pioneers, and (3) opinionated blog content on what it means to be a developer in the AI era — in a single, cohesive, open resource.

### Goals and Objectives

- Provide an interactive visualization engine that lets users step through algorithm execution in real-time — not watch static GIFs — starting with Dynamic Programming as the proof of concept.
- Build a reusable visualization architecture that supports adding new algorithm categories (sorting, trees, graphs) without rewriting core engine logic.
- Curate a chronological "Hall of Fame" of CS pioneers, connecting historical contributions to live, interactive demonstrations of their principles.
- Publish blog content (The Ledger) exploring system design, Big O complexity, and the fundamental truths of computation that persist despite AI.
- Serve as the founder's personal learning platform first, with growing value for the self-taught developer community.

### Key Success Metrics

Since Invariant is a personal/educational project (not a commercial product), success metrics focus on functional completeness rather than business KPIs:

| Metric | Target | Verification |
|--------|--------|-------------|
| **Site is live and publicly accessible** | Deployed on Vercel, reachable via custom domain or Vercel URL | Load the URL in a browser |
| **Blog authoring workflow** | Founder can publish a new post by creating an MDX file and pushing to git | Create a test post, push, verify it appears |
| **Hall of Fame authoring workflow** | Founder can add a profile by adding a YAML/JSON entry (no code changes) | Add a test profile entry, verify it renders |
| **Visualization plugin interface** | Founder can add a new algorithm by implementing the engine's defined interface | Implement a second DP visualization using only the interface |
| **Interactive DP visualization** | At least 1 DP visualization supports: play, pause, step forward/back, scrub, and input changes | Manual testing of all controls |
| **Page load performance** | Lighthouse performance score > 90 on static pages | Run Lighthouse audit |

---

## Overview

Invariant is a statically-generated educational website built on three pillars:

1. **The Interactive Lab** — Browser-based algorithm visualizers with real-time playback controls.
2. **The Hall of Fame** — A chronological museum of CS pioneers with structured profile pages.
3. **The Ledger** — A blog on CS fundamentals, system design, and the developer experience in the AI era.

The name "Invariant" reflects the site's thesis: certain principles of Computer Science remain true regardless of how AI transforms the industry. The site targets the "Software Architect of the future" — someone who understands *why* systems work, not just *how* to prompt AI to write them.

### Background and Context

**Audience:** Self-taught developers, career changers, and job seekers — the same demographic served by The Odin Project. Users have basic programming familiarity but may not deeply understand Big O, algorithm design, or CS theory.

**Inspiration:** The Odin Project's community-driven, free, and accessible approach to education. The founder's personal frustration with non-interactive algorithm teaching during university coursework.

**Founder's role:** Solo developer, sole content author, primary user for v1. The platform grows as the founder learns — blog posts and visualizations are byproducts of the founder's own study.

---

## Target Users and Use Cases

### Target Users

| Persona | Description | Needs |
|---------|-------------|-------|
| **Self-taught Developer** | Learning CS fundamentals outside formal education. Knows how to code but lacks theoretical grounding. | Interactive explanations of algorithms, complexity analysis, and design patterns. Content that bridges "I can write code" to "I understand computation." |
| **Job Seeker** | Preparing for technical interviews or trying to understand how AI has changed what employers expect. | Practical understanding of algorithms, Big O, and system design. Context on the 2026 job market. |
| **CS Student** | Enrolled in a university program but finding lectures/textbooks insufficient for building intuition. | Visual, interactive supplements to dry academic material. Ability to replay algorithm execution at their own pace. |
| **The Founder** | Building the platform as a learning exercise. Needs the authoring experience to be frictionless. | Fast content creation workflow (MDX, YAML). Easy deployment. Minimal operational overhead. |

### Use Cases

- **UC-1:** User navigates to the Interactive Lab, selects a DP problem (e.g., Fibonacci with memoization), adjusts the input value, and scrubs through each step of the algorithm to see how the memoization table fills.
- **UC-2:** User browses the Hall of Fame chronologically, reads Ada Lovelace's profile, and (in a future version) clicks through to an interactive demonstration of the concept she pioneered.
- **UC-3:** User reads a blog post on "Big O in a World of Infinite Code" that contains an embedded interactive visualization comparing O(n) vs O(n^2) growth.
- **UC-4:** Founder writes a new blog post in MDX, embeds a `<Visualizer>` component inline, pushes to git, and sees it live on the site within minutes.
- **UC-5:** Founder adds a new CS pioneer to the Hall of Fame by creating a YAML entry with name, dates, contribution, and image path — no React/code changes needed.

---

## Requirements

### Functional Requirements

#### The Interactive Lab — Visualization Engine

> **Architecture Note:** The visualization engine is the most architecturally significant component. It MUST be designed as a reusable framework from the start. The goal is that adding a new algorithm requires implementing a well-defined interface — not modifying engine internals.

**REQ-1** (P0): The visualization engine MUST define a plugin interface that each algorithm implements. At minimum, the interface MUST require:
  - `getInitialState(input)` — returns the starting state for given input
  - `getSteps(input)` — returns an ordered array of discrete execution steps
  - `renderState(state, step)` — returns the visual representation of the current state

**REQ-2** (P0): The engine MUST provide playback controls: play, pause, step forward, step backward, and a scrub slider (timeline) that allows jumping to any step.

**REQ-3** (P0): The engine MUST allow users to change input values and see the visualization restart with the new input.

**REQ-4** (P0): Each step MUST display the current algorithm state (e.g., which cells of a DP table are filled, which value is being computed, what the current recursion path is).

**REQ-5** (P1): The engine SHOULD support adjustable playback speed.

**REQ-6** (P1): The engine SHOULD support at least two visualization layout types:
  - **Grid/Table-based** — for array and matrix visualizations (DP, sorting)
  - **Node/Edge-based** — for tree and graph visualizations (future phases)

**REQ-7** (P2): The engine MAY support highlighting or annotations (e.g., "this cell was just updated", "comparing these two elements").

**REQ-8** (P0): For v1, the engine MUST include 1-2 complete Dynamic Programming visualizations as proof of concept. Suggested candidates:
  - Fibonacci with memoization (table-filling visualization)
  - 0/1 Knapsack or Longest Common Subsequence (2D table visualization)

#### The Hall of Fame

**REQ-9** (P0): Hall of Fame profiles MUST be stored as structured data (YAML or JSON files), not hardcoded in React components. Adding a new profile MUST NOT require modifying any `.tsx`/`.jsx` files.

**REQ-10** (P0): Each profile MUST include: `name`, `birthYear`, `deathYear` (nullable for living), `era` (descriptive label), `portraitImage` (file path or URL), `contribution` (1-2 sentence summary), `fullBio` (multi-paragraph), and `quote` (optional).

**REQ-11** (P0): Profiles MUST be displayed in chronological order (oldest birth year first).

**REQ-12** (P1): Each profile page SHOULD include a placeholder/link field for a future interactive example of the pioneer's principle (e.g., Dijkstra's profile links to a shortest-path visualization).

**REQ-13** (P0): The Hall of Fame index page MUST display profiles as a chronological timeline or list with name, era, portrait thumbnail, and one-line contribution.

**REQ-14** (P0): Each profile MUST include exactly 1 portrait image per person.

#### The Ledger (Blog)

**REQ-15** (P0): Blog posts MUST be authored as MDX files stored in the repository (e.g., `content/posts/`). No external CMS for v1.

**REQ-16** (P0): MDX posts MUST support embedding React components inline — specifically, the visualization engine's components, so that interactive examples can live inside blog posts.

**REQ-17** (P0): Each post MUST support frontmatter metadata: `title`, `date`, `description`, `tags`, and `slug`.

**REQ-18** (P0): The blog index page MUST display posts in reverse chronological order (newest first) with title, date, description, and tags.

**REQ-19** (P1): The blog SHOULD support tag-based filtering or a tag index page.

#### Site-Wide

**REQ-20** (P0): The site MUST have a landing/home page that introduces the three pillars and provides navigation to each.

**REQ-21** (P0): The site MUST have a consistent navigation header with links to: Home, Lab, Hall of Fame, and Blog.

**REQ-22** (P0): The site MUST be statically generated (SSG) via Next.js for all content pages. Interactive visualizations render client-side.

### Non-Functional Requirements

**REQ-23** (P0): The site MUST load and be usable on modern browsers (Chrome, Firefox, Safari, Edge — latest 2 major versions).

**REQ-24** (P1): The site SHOULD be functional on mobile viewports (responsive layout). Mobile is not the primary target but pages MUST NOT be broken or unreadable on phones.

**REQ-25** (P1): Static pages (blog posts, Hall of Fame profiles) SHOULD achieve a Lighthouse performance score above 90.

**REQ-26** (P1): The visualization engine SHOULD maintain 60fps animation during playback on mid-range hardware.

**REQ-27** (P0): The site MUST use semantic HTML for accessibility and SEO (proper heading hierarchy, alt text on images, ARIA labels on interactive controls).

### Technical Considerations

#### Technology Stack

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| **Framework** | Next.js 16 (App Router) | SSG support, file-based routing, MDX integration, Vercel-native deployment |
| **Styling** | Tailwind CSS 4 | Utility-first, fast iteration, dark mode support built-in |
| **Content (Blog)** | MDX | Markdown with embedded React components — industry standard for developer blogs |
| **Content (Hall of Fame)** | YAML or JSON files | Structured, version-controlled, no code changes to add profiles |
| **Visualization** | React + Canvas or SVG (see Open Questions) | Browser-native, no heavy dependencies |
| **Deployment** | Vercel (free tier) | Zero-config Next.js deployment, automatic previews on push |
| **Version Control** | Git (GitHub) | Standard, integrates with Vercel for auto-deploy |

#### Visualization Engine Architecture

The engine follows a **separation of concerns** between the algorithm logic and the rendering/playback system:

```
┌─────────────────────────────────────────────────┐
│                   Visualizer                     │
│  ┌─────────────┐  ┌──────────┐  ┌────────────┐  │
│  │  Playback   │  │  State   │  │   Input    │  │
│  │  Controls   │  │  Display │  │   Panel    │  │
│  │ (play/pause │  │ (renders │  │ (user      │  │
│  │  step/scrub)│  │  current │  │  changes   │  │
│  │             │  │  state)  │  │  inputs)   │  │
│  └──────┬──────┘  └────┬─────┘  └─────┬──────┘  │
│         │              │              │          │
│         └──────────┬───┘──────────────┘          │
│                    │                             │
│         ┌──────────▼──────────┐                  │
│         │   Engine Core       │                  │
│         │  - step index       │                  │
│         │  - playback state   │                  │
│         │  - timer/animation  │                  │
│         └──────────┬──────────┘                  │
│                    │                             │
│         ┌──────────▼──────────┐                  │
│         │  Algorithm Plugin   │  ◄── Implements  │
│         │  (e.g., FibonacciDP)│      the plugin  │
│         │  - getInitialState()│      interface   │
│         │  - getSteps()       │                  │
│         │  - renderState()    │                  │
│         └─────────────────────┘                  │
└─────────────────────────────────────────────────┘
```

**To add a new algorithm**, a developer:
1. Creates a new file implementing the plugin interface (e.g., `algorithms/knapsack.ts`)
2. Registers it in an algorithm registry (e.g., an index file or config)
3. The engine handles all playback, controls, and rendering orchestration

**The engine core provides:**
- `useVisualizerEngine(plugin, initialInput)` — a React hook managing step index, playback state, and timer
- `<PlaybackControls>` — play/pause/step/scrub UI component
- `<InputPanel>` — renders input fields based on plugin-defined schema
- `<StateRenderer>` — delegates to the plugin's `renderState()` for the current step

**Each algorithm plugin provides:**
- Input schema definition (what inputs the user can change, with types and constraints)
- Step generation logic (the core algorithm, producing an array of state snapshots)
- State rendering logic (how to visually represent each state — a grid, a tree, etc.)

#### Content Architecture

```
content/
├── posts/                    # Blog (The Ledger)
│   ├── my-first-post.mdx
│   └── big-o-in-2026.mdx
├── pioneers/                 # Hall of Fame
│   ├── ada-lovelace.yaml
│   ├── alan-turing.yaml
│   └── edsger-dijkstra.yaml
└── algorithms/               # Algorithm plugin metadata (optional)
    ├── fibonacci-dp.ts
    └── knapsack.ts
```

**Blog post frontmatter example:**
```yaml
---
title: "Big O in a World of Infinite Code"
date: "2026-04-01"
description: "Why complexity analysis matters more, not less, when AI writes your code."
tags: ["big-o", "complexity", "ai"]
slug: "big-o-in-2026"
---
```

**Hall of Fame profile example:**
```yaml
name: "Ada Lovelace"
birthYear: 1815
deathYear: 1852
era: "The Dawn of Computing"
portraitImage: "/images/pioneers/ada-lovelace.jpg"
contribution: "Wrote the first algorithm intended for machine execution, recognizing that computers could go beyond pure calculation."
fullBio: |
  Augusta Ada King, Countess of Lovelace, was an English mathematician
  and writer. She is chiefly known for her work on Charles Babbage's
  proposed mechanical general-purpose computer, the Analytical Engine.
  Her notes on the engine include what is recognized as the first
  algorithm intended to be carried out by a machine.
quote: "The Analytical Engine weaves algebraic patterns, just as the Jacquard loom weaves flowers and leaves."
linkedVisualization: null  # Future: link to an interactive example
```

---

## Assumptions and Constraints

### Assumptions

- **A-1:** Users have modern browsers with JavaScript enabled (Chrome, Firefox, Safari, Edge — latest 2 major versions).
- **A-2:** The founder is the sole content author and developer for the foreseeable future. No multi-author workflow, editorial pipeline, or CMS is needed for v1.
- **A-3:** All content (blog posts, Hall of Fame profiles, algorithm plugins) is version-controlled in the git repository and deployed via push-to-deploy on Vercel.
- **A-4:** Users have sufficient screen real estate to interact with visualizations. Desktop is the primary viewport; mobile is a secondary, "works but not optimized" target.
- **A-5:** The visualization engine does not need to handle arbitrarily large inputs. Reasonable constraints (e.g., Fibonacci up to n=30, arrays up to 20 elements) are acceptable for v1.
- **A-6:** No server-side computation is needed. All algorithm execution and visualization happens client-side in the browser.

### Constraints

- **C-1: Zero operational cost.** The site MUST run on Vercel's free tier with no paid services, databases, or backend servers.
- **C-2: No external runtime dependencies for content.** Blog content and Hall of Fame data MUST NOT depend on external APIs or CMS services at runtime. All content is baked into the static build.
- **C-3: Solo developer capacity.** Architecture decisions MUST favor simplicity and maintainability over scalability or feature richness. Premature abstraction is a bigger risk than under-engineering.
- **C-4: Open source / free tooling only.** All dependencies MUST be freely available. No paid libraries, fonts, or assets (with the exception of potential future custom domain costs).

---

## Risks and Mitigation

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| **Visualization engine over-engineering** — Building too abstract a framework before having enough concrete examples to know what abstractions are needed | High | High | Start with 1 concrete DP visualization, extract the engine interface after it works. Build the second visualization using the extracted interface to validate it. |
| **Canvas vs SVG wrong choice** — Choosing a rendering approach that limits future visualization types | Medium | Medium | Research tradeoffs before implementation (see Open Questions). Start with the simpler option (likely SVG for v1) and plan migration path if needed. |
| **Content creation bottleneck** — Founder's learning pace limits content output, site feels empty | Medium | High | Launch with 1-2 DP visualizations, 5-10 Hall of Fame profiles, and 1-2 blog posts. Quality over quantity. A lean site with excellent interactive content is better than a full site with static content. |
| **Scope creep** — Adding features (auth, comments, light mode, sorting visualizations) before v1 is solid | Medium | Medium | The PRD defines explicit v1 scope. Features not listed are out of scope. Revisit after v1 ships. |
| **Next.js 16 / Tailwind 4 breaking changes** — Using latest versions that may have sparse community resources | Low | Medium | Pin dependency versions. Rely on official documentation. Fall back to Next.js 15 / Tailwind 3 if blockers arise. |
| **MDX + interactive components complexity** — Embedding React components in MDX can introduce subtle build/rendering issues | Medium | Medium | Test the MDX + embedded component workflow early (first sprint). If problematic, blog posts can link to standalone visualization pages instead of embedding inline. |

---

## Timeline and Milestones

> Note: The founder is a solo developer building this as a learning project. Timelines are estimates, not commitments.

| Phase | Duration | Deliverables |
|-------|----------|-------------|
| **Phase 1: Foundation** | Week 1-2 | Next.js 16 project scaffolded with Tailwind 4. Dark mode theme established. Landing page with navigation. Deployed to Vercel. Basic page structure for all three pillars (even if content is placeholder). |
| **Phase 2: Visualization Engine** | Week 2-4 | Engine core built (playback hook, controls component, state renderer). First DP visualization complete (e.g., Fibonacci memoization). Plugin interface defined and documented. Second DP visualization built using the interface to validate reusability. |
| **Phase 3: Content System** | Week 3-4 | MDX blog pipeline working (frontmatter parsing, syntax highlighting, component embedding). Hall of Fame data pipeline working (YAML parsing, profile template, chronological index). 5-10 pioneer profiles populated. 1-2 blog posts written. |
| **Phase 4: Polish & Launch** | Week 5-6 | SEO setup (OG tags, sitemap, RSS). Responsive layout pass. Lighthouse audit and performance fixes. Final review and v1 launch. |

**Post-v1 (ongoing):**
- Add sorting algorithm visualizations (bubble sort, merge sort, quicksort)
- Add tree/graph visualizations (requires node/edge renderer — REQ-6)
- Link Hall of Fame profiles to live interactive examples (REQ-12)
- Expand blog content based on founder's learning
- Consider community features (comments, submissions) if audience grows

---

## References

- [List of Pioneers in Computer Science (Wikipedia)](https://en.wikipedia.org/wiki/List_of_pioneers_in_computer_science) — Source for Hall of Fame profiles
- [The Odin Project](https://www.theodinproject.com/) — Primary inspiration for audience, tone, and accessibility philosophy
- [Next.js Documentation](https://nextjs.org/docs) — Framework reference
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) — Styling reference
- [MDX Documentation](https://mdxjs.com/) — Content authoring reference

---

## Open Questions

> These are unresolved decisions that the implementing session MUST research and decide on before or during implementation.

| # | Question | Context | Recommendation |
|---|----------|---------|----------------|
| **OQ-1** | **Canvas or SVG for the visualization engine?** | SVG is DOM-based (easier to style, animate with CSS, inspect, and make accessible). Canvas is pixel-based (better raw performance for complex/large visualizations). For v1's scope (small DP tables, < 100 elements), SVG is likely sufficient. Canvas becomes relevant for large graph visualizations in future phases. | **Start with SVG for v1.** Easier to develop, style with Tailwind, and debug. Revisit Canvas when adding large graph/tree visualizations. |
| **OQ-2** | **Which 2 DP problems for v1?** | Fibonacci with memoization is the canonical DP intro (1D table). A 2D problem (Knapsack, LCS, Edit Distance) demonstrates the engine handles matrix visualizations. | **Fibonacci + one 2D problem (Knapsack or LCS).** |
| **OQ-3** | **How many Hall of Fame profiles for v1?** | Enough to make the page feel real, not so many that content quality suffers. | **8-12 profiles** spanning the full chronological range (Lovelace through modern figures like Berners-Lee). |
| **OQ-4** | **What blog topics for launch?** | Posts should demonstrate the site's thesis and showcase embedded visualizations. | Start with: (1) "Why Invariant Exists" (manifesto/intro), (2) a DP explainer with embedded visualization. |
| **OQ-5** | **State management for the visualization engine?** | The engine needs to track: current step index, playback state (playing/paused), speed, and the computed steps array. Options: React `useState`/`useReducer` (simplest), Zustand (lightweight store), or a custom hook. | **Custom React hook (`useVisualizer`)** — keeps it self-contained, no extra dependency. Zustand only if state complexity grows beyond what a hook handles cleanly. |
| **OQ-6** | **Image sourcing for Hall of Fame portraits?** | Need 1 portrait image per pioneer. Must be legally usable (public domain, Creative Commons, or fair use). Wikipedia Commons is a reliable source for historical figures. | Use **Wikimedia Commons** images. Document license per image. Store locally in `public/images/pioneers/`. |
| **OQ-7** | **Animation library for visualizations?** | Options: CSS transitions/animations (simplest), Framer Motion (React-native, declarative), GSAP (powerful but heavy), or raw `requestAnimationFrame`. | **Framer Motion or CSS transitions for v1.** Framer Motion integrates well with React and SVG. Evaluate complexity before adding the dependency — CSS may suffice for grid-based DP visualizations. |

---

## Appendix: Design Direction

> This section captures the founder's aesthetic vision for implementation reference.

**Theme:** "Digital Laboratory" / "Modern Scientific Journal"

**Color Philosophy:** High-contrast dark mode as the sole theme for v1. The dark background focuses attention on the algorithm visualizations, which are the hero content. Light mode is explicitly out of scope.

**Typography:** Clean, precise, authoritative. Monospace accents for code and technical content. A sans-serif primary font (e.g., Inter, Geist) for body text.

**UI Principles:**
- **No fluff.** The name "Invariant" implies a source of truth. Every UI element earns its place.
- **Animations are purposeful.** The visualization engine is where motion belongs. Decorative animations elsewhere are forbidden.
- **Content density over whitespace.** This is a technical resource, not a marketing page. Respect the user's time and screen real estate.
- **Academic tone.** The site should feel like a well-designed research paper or technical journal — not a startup landing page.
