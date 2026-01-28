# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio/resume website built with Jekyll (static site generator) and TypeScript/React components bundled with Webpack. Deployed to GitHub Pages.

## Build Commands

```bash
# Development
npm run dev          # Start Jekyll with live reload (localhost:4000)
npm run dev:js       # Watch and rebuild TypeScript/React (run in parallel with dev)

# Production
npm run build        # Build Jekyll site
npm run prod:js      # Production Webpack build with minification

# Code formatting
npm run prettify     # Run Prettier
```

**Note:** Run both `npm run dev` and `npm run dev:js` simultaneously for full development workflow.

## Architecture

**Two Build Systems:**
- **Jekyll (Ruby)** - Static site generation, layouts, includes, markdown processing
- **Webpack (Node.js)** - TypeScript/React compilation to `assets/javascript/`

**Key Directories:**
- `_data/` - JSON/YAML data files (e.g., `cv.json` for CV content)
- `_includes/` - Reusable HTML partials
- `_layouts/` - Jekyll page templates
- `src/` - TypeScript/React source files
- `assets/javascript/` - Compiled JS output (do not edit directly)

**TypeScript Entry Points:**
- `main.ts` - Theme toggle (light/dark mode with localStorage persistence)
- `src/github-page-status.tsx` - React component for GitHub build status display

**Data-Driven Content:** CV and structured content is in `_data/cv.json` - update JSON to change content without touching templates.

## Configuration

- `webpack.config.js` - Webpack 5 config with React/TypeScript, outputs to `assets/javascript/`
- `tsconfig.json` - TypeScript strict mode, ES5 target, React JSX
- `_config.yml` - Jekyll config with minima theme and asset pipeline
- `.prettierrc` - 4-space tabs, double quotes, trailing commas

## CI/CD

GitHub Actions workflow (`.github/workflows/github-pages.yml`) automatically builds and deploys on push to `main`. Requires `GIT_TOKEN` secret.
