# 🛠️ Utilitorium

> A decoupled, high-utility developer workbench housing single-purpose automation scripts, parsers, and custom web utilities.

[![Built with Astro](https://img.shields.io/badge/Built%20with-Astro%20v4-FF5D01?style=flat&logo=astro&logoColor=white)](https://astro.build)
[![Tailwind CSS](https://img.shields.io/badge/Styled%20with-Tailwind%20CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-amber.svg)](LICENSE)

---

## 📌 Overview

**Utilitorium** is an open-source catalog and runtime workbench built to consolidate practical developer tools that are often scattered across random gist files, shell scripts, or one-off snippets.

Each utility in Utilitorium is strictly **autonomous and decoupled**:
- **Browser-Native Tools:** Built directly as interactive, responsive single-page web applications (e.g., client-side KaTeX/GFM note renderers, schema converters, and format parsers).
- **CLI & Automation Scripts:** Self-contained shell or Python routines served alongside interactive documentation manuals (detailing prerequisites, dependencies, flags, and usage) with direct download and terminal execution endpoints.

---

## 🏗️ Architecture

Utilitorium enforces a modular structure where each tool is decoupled into dedicated pages, metadata manifests, and optional static script assets:

```text
Utilitorium/
├── public/
│   ├── icons/                  # Category & tool icon assets
│   └── scripts/                # Static raw downloadable & terminal-runnable scripts
│       └── <category>/         # e.g., <tool-script>.sh, <tool-script>.py
├── src/
│   ├── components/             # Reusable shell UI (Navbar, Hero, ToolCard, Footer, ThemeToggle)
│   ├── data/
│   │   ├── categories.json     # Master category registry
│   │   ├── home.json           # Landing portal metadata
│   │   └── tools/              # Category tool summaries (feeds the portal grid)
│   ├── layouts/
│   │   └── Layout.astro        # Master HTML shell with theme variables
│   ├── pages/
│   │   ├── index.astro         # Portal landing view
│   │   └── tools/              # Autonomous tool workspaces
│   │       └── <category>/
│   │           ├── <tool>.astro  # Tool UI / Interactive workspace / Script manual
│   │           └── <tool>.json   # Tool configuration & metadata manifest
│   ├── styles/
│   │   └── global.css          # CSS theme tokens & fonts (Rajdhani + JetBrains Mono)
│   └── utils/
│       └── visitTracker.ts     # Client visit metrics
└── package.json

```

---

## 🚀 Quickstart

### Prerequisites

* Node.js (`v18.17.0+` or `v20+`)
* [pnpm](https://pnpm.io/) (recommended package manager)

```bash
# Clone the repository
git clone [https://github.com/sriramxdev/Utilitorium.git](https://github.com/sriramxdev/Utilitorium.git)
cd Utilitorium

# Install dependencies
pnpm install

# Start local development server
pnpm dev

```

Visit `http://localhost:4321` in your browser.

---

## 💻 Running CLI Scripts Directly via Terminal

For utilities implemented as standalone shell or automation scripts, the raw executable files are stored under `public/scripts/<category>/`. Because Astro serves static assets from `public/` directly at the root, users can inspect, fetch, or execute scripts straight from their shell:

```bash
# 1. Inspect script source safely before running
curl -fsSL [https://raw.githubusercontent.com/sriramxdev/Utilitorium/main/public/scripts/](https://raw.githubusercontent.com/sriramxdev/Utilitorium/main/public/scripts/)<category>/<script-name>.sh | less

# 2. Download script locally
curl -fsSL -O [https://raw.githubusercontent.com/sriramxdev/Utilitorium/main/public/scripts/](https://raw.githubusercontent.com/sriramxdev/Utilitorium/main/public/scripts/)<category>/<script-name>.sh
chmod +x <script-name>.sh
./<script-name>.sh

# 3. Direct execution (piped)
bash <(curl -fsSL [https://raw.githubusercontent.com/sriramxdev/Utilitorium/main/public/scripts/](https://raw.githubusercontent.com/sriramxdev/Utilitorium/main/public/scripts/)<category>/<script-name>.sh)

```

---

## 🤝 Contribution Guide

We welcome contributions of useful utilities, automation scripts, and developer tools. To keep the project maintainable, all additions must follow the decoupled architecture described below.

### Adding a New Utility

#### Option A: In-Browser Web Tool (Interactive Client App)

1. **Create the Decoupled Tool Pair:**
Add your UI page and its companion JSON metadata file under `src/pages/tools/<category>/`:
* `src/pages/tools/<category>/<tool-name>.astro`
* `src/pages/tools/<category>/<tool-name>.json`


2. **Design Guidelines:**
* Keep tool-specific logic, libraries, and state local to that tool page.
* Use global CSS tokens (`var(--brand-amber)`, `var(--bg-panel)`, `var(--text-primary)`) for proper light/dark mode support.
* Use `Rajdhani` for tool titles/headings, `JetBrains Mono` for code/stats, and clean sans-serif for reading copy.


3. **Register the Tool Card:**
Add the tool entry to `src/data/tools/<category>.json` with `"url": "/tools/<category>/<tool-name>"`.

---

#### Option B: Standalone Automation / CLI Script (`.sh`, `.py`)

Because CLI scripts cannot execute in the browser DOM, they follow the **Raw Script + Web Manual** pattern:

1. **Add Raw Script to `public/`:**
Place the executable file in `public/scripts/<category>/<script-name>.sh`.
* Include a proper shebang (e.g., `#!/usr/bin/env bash` or `#!/usr/bin/env python3`).
* Implement dependency verification at the beginning of the script so it fails gracefully if required tools are missing.


2. **Define Prerequisites in the Companion JSON:**
In `src/pages/tools/<category>/<script-name>.json`, specify the exact environment requirements for the tool:
* System packages (e.g., package manager install commands for Debian/Ubuntu, Fedora, macOS).
* Minimum language runtimes or kernel modules.
* Environment variables or configuration flags.


3. **Create the Web Documentation Page:**
In `src/pages/tools/<category>/<script-name>.astro`, render:
* **Prerequisites Card:** Clear checklist of dependencies with copyable installation commands.
* **One-Click Download Button:** Linking directly to `/scripts/<category>/<script-name>.sh` with the HTML `download` attribute.
* **Terminal Snippets:** Copyable `curl -fsSL ... | bash` command blocks.
* **Source Code Viewer:** Embedded preview of the script logic for security inspection.


4. **Register the Tool Card:**
Add the tool's card information to `src/data/tools/<category>.json`.

---

## 🧪 Development Conventions

* **Theme Compliance:** Avoid hardcoded hex colors. Always reference CSS custom properties (`var(--bg-canvas)`, `var(--bg-panel)`, `var(--border-subtle)`, `var(--brand-amber)`).
* **Navigation:** Portal tool cards must open their dedicated workspace pages in a new tab (`target="_blank" rel="noopener noreferrer"`).
* **Isolated State:** Changes inside one tool workspace should never leak into or break another tool.

---

## 📜 License & Attribution

This project is licensed under the [MIT License](https://www.google.com/search?q=LICENSE).

### Attribution & Usage Terms:

* **Free Use:** You are free to use, clone, study, and adapt this repository or its tools.
* **Mandatory Attribution:** Any fork, clone, redistribution, or hosted instance of Utilitorium (or derived tools) **must retain the original copyright notice** and explicitly quote / attribute back, (linking back to [https://github.com/sriramxdev/Utilitorium](https://github.com/sriramxdev/Utilitorium).
* **Disclaimer of Liability:** The software is provided "as is", without warranty of any kind, express or implied. In no event shall the author be held liable for any claim, damages, or consequences resulting from the execution or deployment of this software.