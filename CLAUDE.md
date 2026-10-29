# NEFL frontend

Website for the North East Football League. Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS v4.

Scope is deliberately small: news, leagues, fixtures/results, clubs and an about page, plus management screens for those. There is no store, no statistics, and no player data anywhere. Clubs have details, leagues and a formation with positions only, and match pages show the score only. Don't reintroduce these without asking.

## Commands

- `npm run dev`: local dev server
- `npm run build`: static export to `out/`
- `npm run lint`: ESLint (unused vars are errors; prefix with `_` to ignore)
- `npx tsc --noEmit`: type-check

## How it's built and deployed

- **Static export** (`output: "export"` in `next.config.ts`), deployed to GitHub Pages by `.github/workflows/deploy-gh-pages.yml` on every push to `main`.
  - No API routes, server actions, middleware, `cookies()`/`headers()`, or anything that needs a server at request time.
  - Every dynamic route (`[slug]`) must export `generateStaticParams`.
  - `next/image` is unoptimized; remote images are only allowed from `i0.wp.com/nefl.ie/**`.
- **The site lives under a base path** on GitHub Pages. Wrap every public asset path in `assetUrl()` from `@/utils/assetUrl` (e.g. `assetUrl("/images/img4.webp")`), including CSS `url(...)` in inline styles. Bare `/images/...` paths work locally but break once deployed.
- **No backend yet.** All data is mock data in `src/data/`. Login is fake and stores the user in `localStorage` under `nefl_user`.
- `Procfile` (`npm start`) is legacy and doesn't work with static export.

## Code layout

- `src/app/<route>/page.tsx` stays thin and renders `src/components/<Feature>/index.tsx`.
- `src/components/ui/`: shared building blocks (`Button`, `IconToggle`). Check here before styling a control by hand.
- `src/utils/`: helpers (`assetUrl`, `getLeagueLogo`, `getClubLogo`, `getClubSlug`).
- `@/*` maps to `src/*`.

## Styling rules

- **Colours come from Material 3 tokens** defined in `src/styles/globals.css` (`--md-primary`, `--md-surface-container`, etc.). Use them as Tailwind arbitrary values: `bg-[var(--md-primary)]`.
  - Don't use stock Tailwind palettes (`blue-600`, `indigo-*`, `gray-*`) for UI chrome such as buttons, links, focus rings and tabs. Stock colours are fine for data meaning: stat categories, match events, charts and role badges.
  - Filled elements get **darker** on hover: `--md-primary-hover`, `--md-error-hover`. Don't use `--md-primary-fixed-dim` as a hover colour, because it washes out white text.
- `globals.css` is the only stylesheet imported globally. Feature CSS (e.g. `fixtures-matrix.css`) is imported by the component that uses it. Most other files in `src/styles/` are empty placeholders.
- **Buttons:** use `<Button>` or `buttonStyles()` from `@/components/ui/Button`. Never hand-roll button classes.
  - `buttonStyles()` works on `<Link>` too: `className={buttonStyles({ variant: "outline", size: "sm" })}`.
  - Variants: `primary` (main action), `tonal`, `outline` (filters, pagination, cancel), `ghost`, `danger` (destructive only), and `inverse`/`glass` on dark or photo backgrounds.
  - Sizes: `sm`, `md`, `lg`, `icon-sm`, `icon`. Shape is always a pill (`rounded-full`).
  - Pagination: current page is `primary`, the rest are `outline`, and set `aria-current="page"`.
- **Two-option switches** (men/women, table/fixtures, grid/list): use `IconToggle` with icons. It provides the tooltip and screen-reader label.
- **League pickers:** use `LeagueSelect` from `@/components/Leagues/LeagueSelect`. It shows sponsor logos and sizes itself to the longest name.
- **Admin pages** (`/management/*`) are wrapped by `AdminShell` (sidebar plus mobile tab bar) via `src/app/management/layout.tsx`.
  - Use `AdminPageHeader`, `AdminSection` and `StatCard` from `components/Management/AdminUI.tsx`.
  - Admin lists that need multi-select or bulk actions should use `components/Management/Selection.tsx`: `useSelection`, `SelectionBar`, `selectOnRowClick`, `ConfirmDialog` and `Notice`.
  - There are two roles: **admin** (everything) and **editor** (everything except users and deleting).
    - Gate user management with `canManageUsers`, deleting with `canDelete`, and hide admin-only areas with `canSeeSection` (all in `data/adminUsers.ts`). Mark admin-only areas with `adminOnly: true`.
    - Every delete must go through `ConfirmDialog` and use the red `danger` / `danger-ghost` button variants.
  - To add an admin area, add it to `components/Management/adminSections.ts`. It must stay a plain (non-`"use client"`) module, because server components read it too.

## Gotchas

- Tailwind v4 gives buttons the default arrow cursor. A base rule in `globals.css` restores the pointer for all clickable elements, so don't add `cursor-pointer` everywhere, and don't remove that rule.
- Files mostly use CRLF line endings. Keep the existing endings when editing with scripts.
