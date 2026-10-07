# MONO Brand Guidelines

## 1. Brand Philosophy

**MONO** represents a systems‑first engineering mindset.

Core ideas behind the brand:

-   Precision
-   Simplicity
-   Control
-   Systems thinking
-   Infrastructure reliability

MONO should feel like:

> The quiet architecture behind complex systems.

Not flashy. Not startup hype.\
**Minimal, calm, engineered.**

------------------------------------------------------------------------

# 2. Logo System

The logo is generated from type, not hand-drawn. `tools/brand/` holds the scripts that
rebuild every asset exactly; see `tools/brand/README.md` for the commands.

## Wordmark

    MONO

MONO set in **Red Hat Display Bold** at -2% tracking, converted to outlines
(`images/logo-wordmark.svg`). Red Hat Display is SIL OFL licensed, so it is free to
use in a commercial logo, and the outlined file has no font dependency.

Use it wherever a word fits: desktop site header, email signature, slides, share cards.

## Symbol ("Assembly")

The same face's **M**, cut into three vertical slices and reassembled slightly out of
true (kerf 3, offsets -3.0 / +3.5 / -1.5 on a 60-unit box), in `images/logo-symbol.svg`.
The cuts are deliberately large: half those values reads as a rendering glitch.

Use it in square or tight frames: favicon, app icon, avatars, mobile header.

## Never a lockup

Wordmark and symbol are **alternates, not components**. The symbol is the wordmark
compressed to its first letter, so placing both together says the M twice.

Both files use `fill="currentColor"`: the page sets the colour, and dark mode needs no
`invert()` filter.

------------------------------------------------------------------------

# 3. Logo Spacing Rules

-   Clear space: one cap height on every side.
-   Minimum size: wordmark 11px cap height (about 78px wide), symbol 16px.

Do not crowd the logo with UI elements.

------------------------------------------------------------------------

# 4. Color System

MONO should primarily exist in **monochrome**.

## Primary Colors

Black\
`#000000`

White\
`#FFFFFF`

## Secondary Colors

Graphite\
`#1E1E1E`

Slate Gray\
`#6B7280`

Light Gray\
`#E5E7EB`

## Accent Color (Optional)

Electric Blue\
`#3B82F6`

Use sparingly for:

-   links
-   highlights
-   active UI states

------------------------------------------------------------------------

# 5. Typography

## Brand typeface

**Red Hat Display** (Bold for the wordmark and share-card headlines, Medium for
secondary lines), with **Red Hat Text** for small text on generated assets such as
share cards. All are SIL OFL licensed.

## Website

The site itself uses **Google Sans** for headings and UI and **Inter** for body text,
loaded from Google Fonts. Google Sans is not licensable for a logo, which is why the
logo is Red Hat Display rather than the site face.

------------------------------------------------------------------------

# 6. Icon Style

Icons used within MONO products should follow:

-   2px stroke
-   geometric shapes
-   minimal curves
-   consistent spacing

Examples of icon themes:

-   device
-   firmware
-   grid
-   test run
-   analytics

Think **engineering diagram aesthetic**.

------------------------------------------------------------------------

# 7. Product Naming System

MONO products should follow the structure:

    Mono + Functional Concept

Examples:

-   MonoAxis
-   MonoGrid
-   MonoLab
-   MonoTrace
-   MonoControl

This creates a **consistent ecosystem**.

------------------------------------------------------------------------

# 8. Product Brand Architecture

Example structure:

    MONO
    │
    ├─ MonoAxis
    │  QA infrastructure for device ecosystems
    │
    ├─ MonoGrid
    │  Device analytics and telemetry
    │
    ├─ MonoLab
    │  Experimental tools

All products inherit the **same symbol system**.

------------------------------------------------------------------------

# 9. UI Design Principles

MONO products should follow:

## Minimal surfaces

Prefer:

-   white or dark surfaces
-   subtle borders
-   restrained colors

Avoid:

-   gradients
-   excessive color
-   heavy shadows

## Layout philosophy

Interface should feel like **control panels**.

Think:

-   device dashboards
-   structured data tables
-   engineering tooling

------------------------------------------------------------------------

# 10. Tone of Voice

Communication style should be:

-   direct
-   technical
-   calm
-   precise

Avoid:

-   marketing fluff
-   buzzwords
-   hype language

Example tone:

Bad:

> Revolutionary testing platform disrupting device QA.

Good:

> Quality infrastructure for connected device teams.

------------------------------------------------------------------------

# 11. GitHub Presence

Recommended structure:

    monoaxis
    monolab
    mono-brand

Example GitHub bio:

> Building systems for connected devices\
> Creator of MonoAxis

------------------------------------------------------------------------

# 12. Favicon

Use the **Assembly symbol** only, never the wordmark. `tools/brand/make-icons.py`
rasterises it into the full set: `favicon.svg`, `favicon.ico`, 16 to 96px PNGs,
`apple-touch-icon.png` and the Android icons.

Render dark ink (`#111114`) on white, or the inverse.

When icons change, bump the `?v=` query on every favicon link so browsers re-fetch them.

------------------------------------------------------------------------

# 13. Brand Assets

Assets live in this repo, not a separate `mono-brand` repo:

    images/logo-wordmark.svg
    images/logo-symbol.svg
    images/favicon.svg (+ ico / png set)
    images/og/*.jpg         1200x630 share cards
    tools/brand/            generators + usage README

Treat branding like **infrastructure**: change the generator and rebuild, never edit
an exported file by hand.

------------------------------------------------------------------------

# 14. Brand Vision

Long term, MONO should feel like:

> A systems studio building infrastructure for connected devices.

Minimal. Technical. Serious.
