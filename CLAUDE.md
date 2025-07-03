# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Forza GT is a SvelteKit-based web application for calculating optimal gear ratios in Forza racing games. The project uses modern tooling including Svelte 5 with runes syntax, TypeScript, and Tailwind CSS v4.

## Development Commands

```bash
npm run dev      # Start development server (http://localhost:5173)
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
- **Styling**: Tailwind CSS v4 with Forms and Typography plugins
- **UI Components**: shadcn-svelte (headless component library with Tailwind CSS styling)
- **Internationalization**: Paraglide.js (supports en, ko)

### Project Structure

- `.inlang/messages/`: I18n message files for each locale
- `src/routes/`: SvelteKit pages and layouts
- `src/lib/`: Shared utilities and core logic
    - `gearing/`: Gear calculation algorithms
    - `paraglide/`: Generated i18n files (auto-generated, do not edit)
    - `ui/`: UI components directory (for reusable components)
    - `math.ts`: Mathematical utilities (lerp, expLerp, approximately)
    - `utils.ts`: General utilities (cn for class merging, range generator)

### Development Guidelines

- Do NOT run `npm run dev` when working on code - the user will run the dev server themselves
- Use Svelte 5 runes syntax (`$props()`, `$state()`, etc.) - NEVER use Svelte 4 syntax
- Prefer `type` over `interface` for TypeScript type definitions (except for class implementations)
- When you need UI components, check if shadcn-svelte has them first and use `npm run shadcn` to add them
- Use Tailwind CSS classes for styling with `cn()` utility for conditional classes
- Maintain i18n support for all user-facing text using Paraglide
