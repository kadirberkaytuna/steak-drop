# Steak Drop 🥩

**Steak Drop** is an MVP web frontend for a Berlin-based B2C Halal meat delivery service. The project was built as part of a Product Management continuing education (Weiterbildung) final project, with the goal of turning a product concept into a working, testable prototype.

## Product Idea

Ordering fresh, certified Halal meat online in Berlin is still an underserved niche. Steak Drop addresses this with a simple, trust-focused ordering experience: transparent sourcing, clear certification, and fast local delivery.

The design deliberately prioritizes **trust signals** (certification, origin, quality) over aggressive discount-driven UI patterns common in food delivery apps.

## Tech Stack

- **HTML + Tailwind CSS (via CDN)** — single-file frontend, mobile-first responsive
- **Node.js** — local development tooling
- **Puppeteer** — automated screenshot-based visual QA

## AI-Assisted Design Workflow

This project uses a structured design workflow with Claude Code:

- `CLAUDE.md` — a rule file that Claude Code reads automatically each session. It enforces design quality rules (custom brand palette, layered shadows, typography pairing, interactive states) and a screenshot-based self-review loop.
- `serve.mjs` — minimal static file server, serves the project at `http://localhost:3000`
- `screenshot.mjs` — takes Puppeteer screenshots of a given URL and saves them to `temporary screenshots/` with auto-incremented filenames

The loop: generate design → serve locally → screenshot → compare against reference/brand assets → fix mismatches → repeat (minimum 2 rounds).

Brand assets (logo, color palette) live in `brand_assets/` and are used as the single source of truth for the visual identity.

## Getting Started

**Prerequisites:** Node.js 18+

```bash
# Install dependencies
npm install

# Start the local server
node serve.mjs
# → open http://localhost:3000

# Take a screenshot (in a second terminal)
node screenshot.mjs http://localhost:3000
```

## Project Structure

```
steak-drop/
├── index.html              # The MVP frontend (all styles inline)
├── CLAUDE.md               # Design rules for Claude Code
├── serve.mjs               # Local static server (port 3000)
├── screenshot.mjs          # Puppeteer screenshot tool
├── brand_assets/           # Logo and color palette
└── temporary screenshots/  # Visual QA output (git-ignored)
```

## Status

🚧 MVP / prototype — frontend only, no backend or payment integration yet.

Planned next steps: product catalog with real data, cart logic, order flow (email/WhatsApp based for the MVP), deployment.
