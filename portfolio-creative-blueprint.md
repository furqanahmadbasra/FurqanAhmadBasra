# OPERATOR.SYS
### Creative & Technical Blueprint — Furqan Ahmad Basra's Portfolio
*A maximalist, kinetic, cyber-brutalist command-deck experience built for Next.js*

---

## 0. Vision Statement

This is not a "resume website." It is a **simulated operating system / command terminal** that the visitor "boots into" — a control room for an AI engineer who builds search engines, neural pipelines, compilers, and firewalls. Every section behaves like a module of a larger system: data streams, status readouts, neural visualizations, terminal logs, and glitchy CRT artifacts coexist with sharp, brutalist structure so the site never feels chaotic — it feels **engineered**.

The guiding rule: **dense but legible, loud but structured.** Every maximalist flourish (grain, glow, glitch, particles) sits inside a rigid brutalist grid with hard 1px borders, so the chaos always has a frame.

---

## 1. THEME & VIBE CONCEPT

### Theme Name: **"OPERATOR.SYS" — Neural Brutalist Command Deck**

**Core visual philosophy:** Imagine the love child of a 1980s mainframe terminal, a Blade Runner HUD, and a Swiss grid system that got hacked. The site presents itself as the visitor logging into Furqan's personal "operating system" — `FAB-OS v2.6`. Every page is a "window" or "module" in this OS: hero = `// boot.sys`, projects = `// processes.exe`, about = `// kernel.log`, contact = `// uplink.terminal`.

This theme is chosen deliberately because it is **literally what the resume is about**: neural networks (BiLSTM/RAG projects), search engines & indexing, compilers, firewalls/cybersecurity, IoT dashboards, and OS-level systems (ECC/memory scrubbing). The aesthetic isn't decoration — it's a direct visualization of the candidate's actual technical world.

**Visual pillars:**
- **Brutalist skeleton** — exposed 1px neon-bordered grid, sharp 0px-radius containers (occasional pill-shaped CTAs as contrast), visible structural labels (`[ 01 / SECTION ]`, `STATUS: ONLINE`, coordinates, timestamps)
- **Cyber-HUD overlays** — scanlines, chromatic aberration on hover, glitch-text headers, radar/targeting reticles as the cursor
- **Neural/organic counterpoint** — a living particle network and a rotating 3D "neural core" that breathes and reacts, softening the rigidity of the grid
- **Maximalist density** — layered marquee tickers, oversized kinetic type, decorative "fake" system data (CPU load, latency, uptime counters) that constantly animate in the background
- **Tactile texture** — film-grain/noise overlay across everything so the deep black never looks like flat digital void; it feels like a CRT monitor in a dim room

**Mood references (style, not literal copies):** terminal boot sequences, IDE dark themes (VS Code/Linear-style precision), retro arcade HUDs, cyberpunk signage, NASA mission-control dashboards, Swiss International grid typography — all pushed through a glitch filter.

---

## 2. EXPERIMENTAL COLOR PALETTE

Base is a near-black "void" — but the system is built around **four distinct glow accents**, each with a dedicated semantic role so the palette stays purposeful instead of "rainbow soup."

| Role | Color Name | Hex | Usage |
|---|---|---|---|
| **Background — Void** | Near-Black | `#07090D` | Page background, deepest layer |
| **Background — Raised Panel** | Graphite | `#12161D` | Cards, nav bar, terminal windows |
| **Background — Hover Surface** | Slate | `#1B212B` | Hover/active card states, modals |
| **Structural Borders (default)** | Ghost White Line | `rgba(255,255,255,0.07)` | All 1px brutalist borders/grid lines |
| **Active Border / Focus Ring** | Signal Cyan | `#00F5FF` | Active nav item, focused inputs, hover outlines |
| **Primary Accent Glow — "Signal"** | Electric Cyan | `#00F5FF` | Primary CTA, links, key headings, neural core glow |
| **Secondary Accent Glow — "Glitch"** | Acid Magenta | `#FF2E9A` | Glitch effects, secondary CTA, hover state on project cards |
| **Tertiary Accent Glow — "Neural"** | Ultraviolet | `#7B2FF7` | AI/ML project tags, particle network nodes |
| **Quaternary Accent — "Warning"** | Amber | `#FFB200` | Status badges, "in-progress" tags, skill-level bars |
| **System Green — "Online"** | Terminal Green | `#39FF14` | Availability indicator, success states, terminal cursor blink |
| **Text — Primary** | Off-White | `#EDEFF2` | Headings, body copy |
| **Text — Muted** | Cool Grey | `#7C8694` | Captions, labels, timestamps, metadata |
| **Error / Alert** | Hazard Red | `#FF3B3B` | Form errors, "404" / broken states (used sparingly) |

**Palette rules:**
- Cyan = *information & navigation*. Magenta = *interaction & disruption (hover/glitch)*. Violet = *AI/ML content*. Amber = *status/metrics*. Green = *life/availability*.
- Never use more than **two glow accents in the same viewport** at full saturation — the rest stay as the 7% white border or muted grey. This is what keeps "maximalist" from becoming "messy."
- Glows are achieved via `box-shadow`/`filter: drop-shadow()` blur, never solid color fills — large flat color blocks would break the void aesthetic.

---

## 3. TYPOGRAPHY SYSTEM

Three-font system, all self-hosted via `next/font/local` (no FOUT, no Google Fonts CDN dependency):

| Role | Font | Source | Notes |
|---|---|---|---|
| **Display / Kinetic Headlines** | **Clash Display** (Variable) | Fontshare (free) | Used at huge sizes (8–18vw) for hero name, section titles. Bold geometric grotesque with real character — avoids the "Inter look." |
| **UI Chrome / Labels / Terminal Text** | **JetBrains Mono** (Variable) | Fontshare / Google Fonts (free, OFL) | All labels, nav items, badges, code snippets, status readouts, coordinates, timestamps — reinforces the "OS" feeling. |
| **Body Copy / Long-form** | **General Sans** (Variable) | Fontshare (free) | Project descriptions, about paragraphs. Geometric but warmer than Inter, pairs cleanly with Clash Display. |
| **Optional Accent — Glitch/Retro headers** | **Departure Mono** | Fontshare (free) | Used ONLY for special glitch moments (404 page, boot sequence text, easter eggs) — pixelated retro-tech feel. |

**Typographic rules:**
- Headlines use **negative letter-spacing** (-2% to -4%) at huge scale, often overflowing the viewport edge intentionally (clipped text = brutalist signature).
- All UI metadata (`[ EST. 2023 ]`, `// 04 OF 12`, `LAT 31.41 / LON 73.08`) is set in JetBrains Mono, uppercase, with `letter-spacing: 0.15em` — this is what gives the "console readout" texture throughout the site.
- Body copy max-width capped at ~65ch even inside wide brutalist containers, for readability inside the chaos.

---

## 4. 3D, MOTION & INTERACTIVE ASSET LIBRARY

Each asset below includes **what it is, how it behaves, and the library used to build it** — written so an AI coding agent can implement it directly.

### 4.1 The Neural Core (Hero centerpiece)
- **What:** A 3D wireframe icosahedron/torus-knot hybrid made of glowing cyan nodes connected by violet edge-lines — a literal "neural network" object.
- **Behavior:** Slowly auto-rotates. On scroll, it deforms/morphs (vertex displacement) tied to scroll progress. On cursor proximity, nearby nodes brighten and pulse (raycasting). Color shifts from cyan → violet as user scrolls deeper into the AI/ML project section.
- **Built with:** React Three Fiber + `@react-three/drei` (`<Wireframe>`, `<Float>`, custom GLSL vertex shader for distortion).

### 4.2 Living Particle Network (ambient background)
- **What:** A field of small glowing dots across the void background, connected by thin lines when nodes are near each other — like a constellation/graph data structure.
- **Behavior:** Subtle drift (idle), parallax shift on mouse move (depth illusion), nodes gently repel from the cursor.
- **Built with:** `tsparticles` (with the `linksTriangles`/`connect` preset) or a lightweight custom canvas via `OGL` for max performance.

### 4.3 Custom Reticle Cursor
- **What:** Replaces the default cursor with a small crosshair/reticle + live `X: 0421 / Y: 0192` coordinate readout in JetBrains Mono.
- **Behavior:**
  - Default → thin crosshair
  - Hovering a link → reticle expands into a ring, label appears (`[ VIEW ]`, `[ OPEN ]`)
  - Hovering project card → reticle becomes a "scan" animation (rotating brackets)
  - Click/drag → reticle contracts ("aperture close")
- **Built with:** `Motion` (Framer Motion) for spring-based cursor following + React state for mode switching. Disabled entirely on touch devices.

### 4.4 Floating Terminal Windows
- **What:** Glassmorphic, brutalist-bordered "windows" (like `~/projects/clutch-ai.log`) that float with subtle parallax in the hero and about sections, displaying auto-typing fake logs (`> indexing 50,000 documents...`, `> RAG pipeline: ONLINE`).
- **Behavior:** Typewriter text loop, subtle idle float (translateY sine wave), slight tilt toward cursor (max 6°).
- **Built with:** `Motion` for tilt/float + a simple custom typewriter hook.

### 4.5 Glitch-Text Headlines
- **What:** Section titles that, on scroll-into-view or hover, briefly split into RGB-offset glitch layers before settling.
- **Behavior:** Triggered once on scroll-enter (not looping — avoids fatigue), and again on hover for interactive elements.
- **Built with:** CSS `clip-path` + `text-shadow` RGB split animation, triggered via GSAP `ScrollTrigger`.

### 4.6 3D Tilt Project Cards
- **What:** Each project card is a "monitor" — on hover it tilts toward the cursor (3D perspective), the cover image gets a CRT scanline + chromatic aberration overlay, and a magenta glow border activates.
- **Behavior:** `rotateX`/`rotateY` based on mouse position within card bounds, spring-damped return on mouse-leave.
- **Built with:** `Motion`'s `useMotionValue` + `useTransform` (no R3F needed — pure CSS 3D transforms for performance).

### 4.7 Marquee Ticker Strips
- **What:** Horizontal infinite-scroll bands of text — tech stack names, project category tags, status messages (`SYSTEM NOMINAL // BUILDING WITH NEXT.JS // RAG PIPELINES ONLINE //`) — placed between major sections as visual "seams."
- **Behavior:** Continuous scroll (CSS keyframe `translateX`), pauses on hover, direction alternates per row.
- **Built with:** Pure CSS animation + `React.cloneElement` duplication for seamless loop.

### 4.8 Live "System Stats" Widgets (decorative HUD)
- **What:** Small animated readouts scattered in corners — fake CPU/GPU load bars, a "latency" sparkline, an "uptime" counter since page load, a live local clock (Pakistan time).
- **Behavior:** Continuously animate with randomized-but-smooth values; the clock is real.
- **Built with:** `recharts` (Sparkline/AreaChart, minimal axes) + `setInterval`-driven state.

### 4.9 Boot Sequence Loader
- **What:** First-visit-only full-screen loader that types out a fake boot log (`INITIALIZING FAB-OS v2.6... LOADING NEURAL CORE... MOUNTING /projects... ACCESS GRANTED`) with a progress bar, then wipes away with a glitch transition.
- **Built with:** `GSAP` timeline + typewriter hook; stored in `sessionStorage` so it only plays once per session.

### 4.10 Scanline & Grain Overlay
- **What:** A fixed, full-viewport `<div>` with an animated CRT scanline gradient + SVG noise texture at ~4% opacity, sitting above all content (`pointer-events: none`).
- **Built with:** CSS `repeating-linear-gradient` for scanlines + an inline SVG `feTurbulence` filter for grain (no image asset needed — generated at runtime, zero load cost).

### 4.11 "Stealth Mode" Toggle (signature easter egg)
- A nod to the *Clutch.ai* project's stealth-mode overlay: a nav toggle that switches the whole site into a minimal monochrome/low-glow "stealth" theme (reduced motion, grayscale accents) — a clever, personal, on-brand interaction that doubles as a built-in `prefers-reduced-motion`-style accessibility mode.

---

## 5. COMPLETE ARCHITECTURE & STORYTELLING FLOW

### Page Map (6 routes total — "complete" without being bloated)

| Route | Purpose |
|---|---|
| `/` | Immersive landing + condensed narrative of everything |
| `/work` | Full project archive — filterable grid by category |
| `/work/[slug]` | Individual project case-study page |
| `/about` | Deep narrative: story, education, full skill system, experience timeline |
| `/lab` | Smaller experiments, certifications, "now" page, fun extras |
| `/contact` | Terminal-styled contact form + social "command list" |

### Homepage (`/`) Scroll Narrative — section by section

**[ BOOT ]** — On first load only: full-screen boot sequence (see 4.9). Skippable via "press any key."

**[ 01 // HERO — `boot.sys` ]**
First thing seen: massive kinetic name "FURQAN AHMAD BASRA" in Clash Display, overflowing the viewport edges, with the **Neural Core (4.1)** rotating behind/through the letters. Below: role tagline in JetBrains Mono (`AI/ML ENGINEER // FULL-STACK DEVELOPER // SYSTEMS BUILDER`). Top-right corner: live system stats (4.8) — local time, "STATUS: AVAILABLE FOR WORK" with green pulse dot. Bottom edge: marquee ticker (4.7) of tech stack scrolling continuously. Particle network (4.2) fills the void behind everything.

**[ 02 // MANIFESTO — `kernel.log` ]**
Broken-grid layout: a large pull-quote-style intro paragraph (2-3 sentences about who he is and what he builds) set in oversized type, intersected by a floating terminal window (4.4) showing a fake log of his actual stack scrolling by. Glitch-text trigger (4.5) on the section heading as it scrolls into view.

**[ 03 // SYSTEM ARCHITECTURE — `skills.map` ]**
Skills presented not as a boring list but as a **"system architecture diagram"**: categories (Frontend, Backend, AI/ML, Databases, Cloud/DevOps, Systems/Algorithms) rendered as connected nodes/modules (could literally be an SVG diagram or styled grid cards with connecting lines). Hovering a module highlights related projects with a subtle glow-link — foreshadowing the projects section. Skill proficiency shown as amber progress bars styled like hardware load meters.

**[ 04 // FEATURED PROCESSES — `projects.exe` ]**
A horizontally-scrollable (or large vertically-stacked) set of **5 featured project "monitors"** using the 3D Tilt Cards (4.6):
1. **Clutch.ai** — Real-time interview co-pilot (RAG + ASR)
2. **Flowra** — Agentic agile orchestration platform
3. **Search Engine** — Custom C++ search engine from scratch
4. **Document Intelligence System** — RAG-based Q&A over documents
5. **DreamHome** — Real-time collaborative design platform (CRDT)

Each card shows: project name, 2-line description, tech badges (color-coded by category per palette), and a `[ VIEW PROCESS → ]` link to `/work/[slug]`. A `[ VIEW ALL PROCESSES → /work ]` CTA closes the section.

**[ 05 // EXECUTION LOG — `experience.timeline` ]**
Vertical terminal-log-styled timeline:
- `2025.06 – 2025.08 :: AI/ML Intern @ Agritech Cybersecurity Zone (NSTP)`
- `Client Work :: Front-End Development`
- `2023 – Present :: BS Computer Science @ NUST`

Each entry expands on click/hover to show detail, styled like expanding a log line in a terminal (`▸` becomes `▾`).

**[ 06 // CERTIFICATIONS — `credentials.list` ]**
A compact marquee/badge row: Web Development Bootcamp (Angela Yu), Advanced Python (Cisco), Machine Learning (Andrew Ng/Coursera) — shown as "verified module" badges with the green "online" indicator.

**[ 07 // UPLINK — `contact.terminal` ]**
Full-bleed dark section. Giant CTA in Clash Display: `ESTABLISH_CONNECTION_` with blinking terminal cursor. Below it, the contact form is styled as a literal terminal prompt sequence (`> enter your name:`, `> enter your email:`, `> message:`). Social links (GitHub, LinkedIn, Email) presented as a `$ ls ./socials` command list. Footer: copyright + "Built with Next.js, React Three Fiber, GSAP — view source" link.

### Transitions Between Sections
- Each major section is separated by either a **marquee ticker band** (visual "seam," see 4.7) or a **scanline sweep transition** (a horizontal glow bar sweeps down the viewport, GSAP-triggered on scroll).
- Route changes (e.g., `/` → `/work/[slug]`) use a **full-screen glitch wipe** (~400ms): the outgoing page glitches/RGB-splits and dissolves into noise, the new page resolves out of static — reinforcing the "switching processes" OS metaphor.

---

## 6. ADVANCED UI/UX & COMPLEX DESIGN SYSTEMS

These are the layers that make the site feel **dense, engineered, and professional** rather than just "a bunch of effects":

- **Glassmorphic Floating Nav** — Top bar with `backdrop-blur` + 1px cyan border, brutalist sharp corners (not pills), containing: logo/initials as a "module ID" (`F.A.B/01`), nav links as `[ WORK ]` `[ ABOUT ]` `[ LAB ]` `[ CONTACT ]`, active section indicator as a glowing underline that slides between items, and the Stealth Mode toggle (4.11).
- **Persistent Corner HUD** — Fixed coordinates/metadata in page corners (top-left: page index `// 01 OF 06`, bottom-left: scroll progress as a vertical line filling with cyan, bottom-right: live clock). These persist across all pages, reinforcing the "OS shell" feel.
- **Custom Grid Overlay (dev-mode toggle)** — A hidden `[ G ]` keyboard shortcut or footer toggle reveals the underlying 12-column grid as faint cyan lines over the whole site — a playful "show my work" touch that doubles as a portfolio flex for a CS audience.
- **Micro-interactions:**
  - Buttons: magnetic pull toward cursor within a radius (GSAP) + glitch-flicker on click
  - Links: underline "draws on" left-to-right on hover, retracts right-to-left on exit
  - Form inputs: terminal-style focus state — border becomes solid cyan, blinking `_` cursor appears at input end
  - Tags/badges: subtle scale + glow pulse on hover
- **Section Entrance Choreography** — Every section's children animate in with a staggered "system initializing" pattern (clip-path reveals, slight Y-translate, opacity), orchestrated via GSAP `ScrollTrigger` timelines — never simple fade-ins.
- **Sound Design (optional, OFF by default)** — Subtle UI blips on hover/click (tiny `.mp3`/`.ogg`, <10kb each) toggleable from the nav; respects user choice via localStorage-equivalent state.
- **Accessibility & Reduced Motion** — `prefers-reduced-motion` (and the manual Stealth Mode toggle) disables: particle field, cursor reticle, glitch animations, marquee auto-scroll, and 3D tilt — replacing the Neural Core with a static glowing SVG illustration. Color contrast on all text meets WCAG AA against the void background (verified: cyan/magenta/violet on `#07090D` all pass for large text; body text stays off-white). Full keyboard navigation with visible focus rings (cyan, matching the "active border" role).
- **404 / Easter Egg Page** — Styled as a `SEGFAULT` / kernel panic screen with the Departure Mono font and a heavy glitch effect — on-brand humor for a systems-minded audience.

---

## 7. TECH STACK — NEXT.JS IMPLEMENTATION

Based on current (2026) best practices for performant, animation-heavy Next.js sites:

| Layer | Tool | Why |
|---|---|---|
| **Framework** | Next.js (App Router) + React 19 + TypeScript | Server Components for fast project case-study pages, `next/image` for optimized visuals, `next/font/local` for self-hosted variable fonts |
| **Styling** | Tailwind CSS v4 + CSS custom properties for design tokens | Tokens (colors, spacing, fonts from sections 2 & 3) defined once as CSS variables, consumed by Tailwind config — enables the Stealth Mode theme swap via a single class toggle |
| **Component-level animation** | **Motion** (the evolved Framer Motion) | Declarative gestures, hover/drag, layout animations, cursor-follow springs, card tilts — RSC-friendly |
| **Scroll choreography** | **GSAP + ScrollTrigger** | Complex pinned sections, staggered reveals, glitch-text triggers, scanline sweep transitions — now fully free for commercial use |
| **Smooth scroll** | **Lenis** | Buttery momentum scroll that plays nicely with `position: sticky` (used carefully — test pinned sections) |
| **3D** | **React Three Fiber** + `@react-three/drei` + Three.js | Neural Core, any additional 3D props; loaded via dynamic import with `ssr: false` |
| **Particles** | **tsParticles** (react wrapper) or custom `OGL` shader | Ambient particle network background |
| **Charts/sparklines** | **recharts** | Decorative live system-stat widgets |
| **Icons** | **Lucide React** | Clean line icons for UI chrome (nav, socials, status) |
| **State management** | **Zustand** | Global UI state: cursor mode, Stealth Mode, sound toggle, boot-sequence-seen flag |
| **Forms** | **React Hook Form + Zod** | Contact form validation |
| **Email delivery** | **Resend** (via a Next.js Route Handler) | Sends contact form submissions |
| **Content for case studies** | **MDX** (via `next-mdx-remote` or `@next/mdx`) | Each project case study as an `.mdx` file — easy for an AI agent to generate one file per project from the resume |
| **Deployment** | **Vercel** | Native Next.js support, edge functions for the contact form |

---

## 8. ASSET PIPELINE & FOLDER STRUCTURE

Recommended project structure (AI-agent-friendly — predictable paths):

```
/public
  /fonts/                 → self-hosted Clash Display, JetBrains Mono, General Sans, Departure Mono (woff2)
  /models/
    neural-core.glb       → compressed via gltf-transform + Draco
  /textures/
    grain.svg             → generated noise (or inline SVG, no file needed)
  /images/
    /projects/
      clutch-ai/cover.jpg, gallery-1.jpg, gallery-2.jpg...
      flowra/cover.jpg ...
      search-engine/cover.jpg ...
      (one folder per project slug, matching /work/[slug])
  /audio/                 → ui-click.mp3, ui-hover.mp3 (optional, <10kb each)
  /og/                    → Open Graph images per page

/src
  /app
    /page.tsx             → homepage
    /work/page.tsx        → project archive
    /work/[slug]/page.tsx → project case study (reads from /content/projects)
    /about/page.tsx
    /lab/page.tsx
    /contact/page.tsx
    /api/contact/route.ts → Resend email handler
  /components
    /three/NeuralCore.tsx
    /ui/CustomCursor.tsx, FloatingNav.tsx, Marquee.tsx, TerminalWindow.tsx, ProjectCard.tsx, BootSequence.tsx, ScanlineOverlay.tsx
  /content
    /projects/*.mdx       → one file per project, generated from resume data
  /data
    skills.ts, experience.ts, certifications.ts
  /lib
    /hooks (useTypewriter, useCursorMode, useMagneticHover)
    /store (zustand stores)
  /styles
    globals.css           → design tokens as CSS variables (Section 2 & 3)
```

**Where to source assets:**
- **3D models / HDRIs (if any environment lighting needed):** [Poly Haven](https://polyhaven.com) — 100% free, CC0, no attribution required, web-optimized glTF.
- **Quick 3D scenes without heavy R3F code (alternative/prototyping):** [Spline](https://spline.design) — import glTF, add interactivity visually, export as a React component.
- **Fonts:** [Fontshare](https://fontshare.com) (Clash Display, General Sans, JetBrains Mono, Departure Mono — all free, OFL-style license).
- **Icons:** [Lucide](https://lucide.dev).
- **UI sound effects (optional):** small CC0 click/blip sounds from freesound.org, kept under 10kb.

---

## 9. CONTENT MAP — RESUME → SECTIONS

| Resume Section | Maps To |
|---|---|
| Header (name, contact, LinkedIn, GitHub) | Hero (4.8 corner HUD) + Contact page social list |
| Education (NUST, BS CS, 2023–Present) | Execution Log timeline (`/`, section 05) + `/about` full detail |
| Technical Skills (9 categories) | System Architecture diagram (`/`, section 03) + expanded module view on `/about` |
| Experience — Agritech Cybersecurity internship | Execution Log timeline entry + featured "AI-Powered Firewall Research" project |
| Experience — Client front-end work | Execution Log timeline entry + "Client Website Development" project |
| **Featured Projects (5, for homepage):** Clutch.ai, Flowra, Search Engine, Document Intelligence System, DreamHome | `/`, section 04 — chosen for visual/technical diversity (AI, agentic systems, systems programming, RAG, real-time collaboration) |
| **All other projects** (Tic-Tac-Toe, Laptop Store, Disease Prediction, IoT Device Management, Eventify, Mobile Cover Store, FIFA Analytics, ECC Simulator, Compiler, AI Email Reply, Crop Yield, Info-Security Risk Assessment, AI Firewall Research, Gmail Chat App) | `/work` archive grid, filterable by category tags: `AI/ML`, `Full-Stack`, `Systems`, `Security`, `Mobile` |
| Certifications (Angela Yu, Cisco, Andrew Ng) | Section 06 (Credentials marquee) + `/lab` |

**Suggested `/work` category tags (color-coded per palette):**
- `AI/ML & RAG` → Violet (`#7B2FF7`)
- `Full-Stack` → Cyan (`#00F5FF`)
- `Systems & Low-Level` → Amber (`#FFB200`)
- `Security` → Hazard Red (`#FF3B3B`)
- `Mobile` → Magenta (`#FF2E9A`)

---

## 10. AI BUILD BRIEF (condensed spec — paste this to a coding agent)

> **Project:** "OPERATOR.SYS" portfolio for Furqan Ahmad Basra (AI/ML + Full-Stack Engineer).
> **Stack:** Next.js (App Router) + TypeScript + Tailwind CSS v4, Motion, GSAP + ScrollTrigger, Lenis, React Three Fiber + drei, tsParticles, Zustand, React Hook Form + Zod, Resend, Lucide React, recharts.
> **Aesthetic:** Neural Brutalist Command Deck — near-black void (`#07090D`), 1px borders (`rgba(255,255,255,0.07)`), accent glows: cyan `#00F5FF` (signal/primary), magenta `#FF2E9A` (glitch/secondary), violet `#7B2FF7` (AI/neural), amber `#FFB200` (warning/status), green `#39FF14` (online). Fonts: Clash Display (display), JetBrains Mono (UI/labels), General Sans (body).
> **Pages:** `/` (immersive landing, 7 sections per Section 5), `/work` (filterable archive), `/work/[slug]` (MDX case studies), `/about`, `/lab`, `/contact`.
> **Core components to build first (in order):** 1) design tokens in `globals.css`, 2) `FloatingNav` + `ScanlineOverlay` + corner HUD, 3) `CustomCursor`, 4) `Hero` with kinetic type + `NeuralCore` (R3F), 5) `Marquee`, 6) `ProjectCard` (3D tilt), 7) `TerminalWindow` + typewriter hook, 8) `BootSequence`, 9) remaining sections + `/work`, `/about`, `/lab`, `/contact`, 10) glitch route transitions.
> **Critical constraint:** every animation-heavy feature must have a `prefers-reduced-motion` / Stealth Mode fallback (static, no particles/3D/glitch).

---

## 11. PERFORMANCE, ACCESSIBILITY & FALLBACKS

- **3D loading:** Dynamically import the R3F canvas with `ssr: false` and wrap in `<Suspense>`; show a static glowing SVG placeholder until hydrated.
- **Model compression:** Run any `.glb` through `gltf-transform` with Draco/Meshopt compression; keep under ~2MB.
- **Fonts:** Self-host via `next/font/local` to avoid layout shift and external requests.
- **Particle field:** Cap particle count responsively (fewer on mobile); pause animation when tab is inactive (`document.visibilitychange`).
- **Reduced motion path:** Detect `prefers-reduced-motion: reduce` AND the manual Stealth Mode toggle → disable particles, cursor reticle, glitch text, marquee auto-scroll, 3D tilt, and Lenis smooth scroll; everything still functions with native scroll and simple fades.
- **Contrast:** All accent colors on `#07090D` background pass WCAG AA for large text (18px+); body text stays in off-white (`#EDEFF2`) at AAA contrast.
- **Lighthouse target:** Performance ≥ 85 by deferring all heavy visuals until after LCP (hero text renders first, Neural Core hydrates after).

---

*End of blueprint. Ready to hand to an AI coding agent (e.g., Claude Code) section-by-section, starting with Section 10's build order.*
