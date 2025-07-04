# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Forza GT is a SvelteKit-based web application for calculating optimal gear ratios in Forza racing games. The project uses modern tooling including Svelte 5 with runes syntax, TypeScript, and Tailwind CSS v4.

## Development Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run check    # Type check and lint
npm run format   # Format code
npm run shadcn   # Add shadcn-svelte components
```

## Architecture

### Tech Stack

- **Framework**: SvelteKit 2.16.0 with Svelte 5
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn-svelte
- **Internationalization**: Paraglide.js (supports en, ko)

### Project Structure

- `.inlang/messages/`: I18n message files for each locale
- `src/lib/`: Shared utilities and core logic
    - `gearing/`: Gear calculation algorithms
    - `paraglide/`: Generated i18n files (auto-generated, do not edit)
    - `ui/`: UI components directory (for reusable components)
    - `math.ts`: Mathematical utilities (lerp, expLerp, approximately)
    - `utils.ts`: General utilities (cn for class merging, range generator)
- `src/routes/`: SvelteKit pages and layouts

### Development Guidelines

- After completing tasks, run `npm run check` - Do NOT run `npm run dev`
- Prefer `type` over `interface` for type definitions (except for class implementations)
- For UI components, check shadcn-svelte first and use `npm run shadcn` to add them
- Use Tailwind CSS classes for styling with `cn()` utility for conditional classes
- Maintain i18n support for all user-facing text using Paraglide

### Svelte 5 Guidelines

- Do NOT use `let` declarations - use `$state()` runes
- Do NOT use `$:` statements - use `$derived()` and `$effect()` runes
- Do NOT use `export let`, `$$props`, and `$$restProps` - use `$props()` runes
- Do NOT use `on:` and `createEventDispatcher()` - event handlers are just like any other prop
- Do NOT use `<slot>`, `let:`, and `$$slots` - use `{#snippet ...}` and `{@render ...}`
- Do NOT use stores - use `$state()`, `$derived()`, and `$effect()` runes
