# 🃏 Yu-Gi-Oh! Forbidden Memories - Deck Builder

<img width="1500" height="841" alt="image" src="https://github.com/user-attachments/assets/58dcc7bb-03cf-49dc-ace5-eb2d3d98b187" />

A modern, high-performance web utility built to assemble and validate strategy decks for the classic 1999 PlayStation 1 game *Yu-Gi-Oh! Forbidden Memories*. This project enforces the game's original deck-building constraints while providing a responsive, retro-inspired dark interface.

## 🚀 Key Features

- **Full 722 Card Catalog:** Access to every single card from the original game with accurate ATK/DEF stats, types, guardian stars, passwords, and Star Chip costs.
- **Strict Retro Validation:** Real-time enforcement of the game's internal rules:
  - Exact or maximum deck capacity of **40 cards**.
  - Maximum limit of **3 copies** per card ID.
- **Advanced Data Adapter:** Translates raw, legacy emulator-based data formats into typed, modern TypeScript interfaces on the fly.
- **Immersive Retro UX:** Styled with custom validation modems, active color-coded card types, and pixel-inspired level star badges mimicking the classic CRT TV aura.

---

## 🛠️ Tech Stack & Architecture

- **Framework:** [Next.js (App Router)](https://nextjs.org) — Utilizing static optimizations and future-proof Serverless routing architectures.
- **Language:** [TypeScript](https://typescriptlang.org) — Strict structural typing ensuring data predictability.
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com) — Leveraging the latest pure-CSS configuration engine for blazing-fast rendering performance.
- **State Management:** Isolated React Custom Hooks (`useDeck`) separating business rules from presentation layers.

---

## 🤖 AI-Driven Development Workflow

This codebase represents a cutting-edge **Human-AI Collaboration** model. Instead of relying on traditional coding workflows, this application was architected, written, and optimized through synchronous pairing between the developer and **Gemini**.

### How We Built This Together:
1. **Domain-Driven Design:** Mapped the specific domain of a 1999 PS1 retro game to a robust TypeScript contractual boundary.
2. **The Adapter Pattern:** Implemented a data adaptation layer to ingest numerical game-engine variables and transform them into semantic UI primitives.
3. **Componentization First:** Segmented atomic blocks (`CardTile`, `DeckRow`) feeding into container-driven layers (`CardGrid`, `DeckPanel`) to maximize tree-shaking and component reuse.

---

## 📊 Data & Credits Attribution

The complete card catalog data driving this application was sourced from the open-source efforts of the community. Special thanks to:

- **[@Solumin](https://github.com):** For extracting, maintaining, and curating the official 722 cards database in [YGO-FM-FusionCalc](https://github.com/YGO-FM-FusionCalc/blob/master/data/Cards.json). 

---

## 💻 Getting Started & Installation

Follow these quick commands to install dependencies and spin up the project in your local development environment:

### Prerequisites
Make sure you have **Node.js** (v18.x or higher recommended) and **npm** installed on your machine.

### 1. Clone the repository
```bash
git clone https://github.com
cd ygo-fm-deckbuilder
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
npm run dev
```

Once started, open [http://localhost:3000](http://localhost:3000) in your browser to see the live application.

### 4. Build for production
To test static optimization outputs and compile production-ready chunks:
```bash
npm run build
npm run start
```
