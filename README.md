# Evans Opoku — Portfolio

A React + Tailwind portfolio site with a liquid-glass / neumorphic UI.

## Run it locally

```bash
npm install
npm run dev
```

Then open the local URL shown in your terminal (usually `http://localhost:5173`).

## Build for production

```bash
npm run build
```

The production files land in `dist/`. Deploy that folder to any static
host — Vercel, Netlify, GitHub Pages, Cloudflare Pages, etc.

## Project structure

```
src/
  App.jsx        — the entire site (sections, data, styles)
  main.jsx       — React entry point
  index.css      — Tailwind entry point
  assets/
    profile.jpg  — profile photo used in the About section
```

## Editing content

All copy, skills, services, and projects live as small arrays near the
top of `src/App.jsx` (`SKILL_GROUPS`, `SERVICES`, `PROJECTS`,
`PHILOSOPHY`, `BUSINESS_PILLARS`) — update those to change the content
without touching layout code.
