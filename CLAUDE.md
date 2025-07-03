# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Forza GT is a SvelteKit-based web application for calculating optimal gear ratios in Forza racing games. The project uses modern tooling including Svelte 5 with runes syntax, TypeScript, and Tailwind CSS v4.

## Development Commands

```bash
# Start development server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type check and lint
npm run check

# Format code
npm run format
```

## Architecture

### Tech Stack

- **Framework**: SvelteKit 2.16.0 with Svelte 5
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4 with Forms and Typography plugins
- **I18n**: Paraglide.js (supports en, ko)
- **UI Components**: bits-ui (headless component library)
- **Deployment**: Vercel adapter

### Core Logic

The main functionality resides in `src/lib/gearing/` which contains gear ratio calculation algorithms:

- **Arithmetic tuning**: Linear interpolation between launch and final gear ratios
- **Geometric tuning**: Exponential interpolation with customizable factor

### Project Structure

- `src/routes/`: SvelteKit pages and layouts
- `src/lib/`: Shared utilities and core logic
    - `gearing/`: Gear calculation algorithms
    - `paraglide/`: Internationalization setup
    - `math.ts`: Mathematical utilities (lerp, approximately)
    - `utils.ts`: General utilities
- `static/`: Static assets

### Key Conventions

- Use Svelte 5 runes syntax (`$props()`, `$state()`, etc.) - NEVER use Svelte 4 syntax
- Follow existing TypeScript strict mode conventions
- Prefer `type` over `interface` for TypeScript type definitions
- Use Tailwind CSS classes for styling
- Maintain i18n support for all user-facing text
