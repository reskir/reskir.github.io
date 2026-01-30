# reskir.github.io

Personal portfolio and resume website built with Jekyll and TypeScript/React. This project serves as a digital CV and showcase of work, deployed to GitHub Pages.

[Live Site](https://reskir.github.io)

## Tech Stack

*   **Static Site Generator**: [Jekyll](https://jekyllrb.com/) (Ruby)
*   **Frontend Logic**: [React](https://reactjs.org/) & [TypeScript](https://www.typescriptlang.org/)
*   **Bundler**: [Webpack](https://webpack.js.org/)
*   **Styling**: SCSS (Minima theme)
*   **Deployment**: GitHub Pages via GitHub Actions

## Getting Started

### Prerequisites

*   **Node.js**: For Webpack and JavaScript dependencies.
*   **Ruby**: version 2.7.8. For Jekyll and Bundler.

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/reskir/reskir.github.io.git
    cd reskir.github.io
    ```

2.  Install JavaScript dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```

3.  Install Ruby dependencies:
    ```bash
    bundle install
    ```

## Development Workflow

This project uses two build systems running in parallel: Jekyll for the HTML/CSS generation and Webpack for TypeScript/React compilation.

1.  **Start the Jekyll development server**:
    ```bash
    npm run dev
    ```
    This serves the site at `http://localhost:4000` with live reload.

2.  **Start the Webpack watcher** (in a separate terminal):
    ```bash
    npm run dev:js
    ```
    This watches for changes in `src/` and `main.ts` and recompiles them to `assets/javascript/`.

**Note**: You need to run both commands to have a fully functional development environment where both content and script changes are reflected.

## Building for Production

To build the project for deployment:

1.  **Build JavaScript bundles** (minified):
    ```bash
    npm run prod:js
    ```

2.  **Build Static Site**:
    ```bash
    npm run build
    ```

## Project Architecture

*   **`_data/`**: Contains structured data like `cv.json`. Updating this file updates the CV content on the site without needing to modify HTML templates.
*   **`_includes/` & `_layouts/`**: Jekyll templates and partials.
*   **`src/`**: Source code for React components and TypeScript logic.
*   **`assets/javascript/`**: The output directory for compiled JavaScript. **Do not edit files here directly.**
*   **`main.ts`**: Entry point for general site logic (e.g., theme toggling).

## Deployment

The site is automatically built and deployed to GitHub Pages via GitHub Actions whenever changes are pushed to the `main` branch. See `.github/workflows/github-pages.yml` for details.
