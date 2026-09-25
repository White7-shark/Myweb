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
public/
  privacy/
    index.html   — the Personify Life privacy policy (generated — see below)
vercel.json      — clean URLs, no trailing slash
```

## The privacy policy at /privacy

`public/privacy/index.html` is a plain static page. Vite copies `public/`
to the root of `dist/`, so it deploys to:

```
https://<your-project>.vercel.app/privacy
```

That is the URL to paste into the Google Play Console listing.

Three things about it are deliberate:

- **It is static, not a React route.** This site has no router, and a legal
  page that Google has to read while reviewing the app should not depend on
  a JavaScript bundle loading first. It renders with scripting off.
- **`vercel.json` sets `cleanUrls` and no trailing slash**, so `/privacy`
  serves the file directly. Do **not** add an SPA catch-all rewrite
  (`/(.*) → /index.html`) unless client-side routing is introduced later —
  it would swallow this page and serve the homepage instead. `vite preview`
  does exactly that locally, which is why `/privacy` looks wrong under
  `npm run preview` but is correct on Vercel and under any plain static
  server.
- **It is generated, not hand-written.** The source of truth is
  `src/constants/policyText.ts` in the Personify app repository, which is
  also what the app renders under Settings. Regenerate with:

  ```bash
  # from the Personify repo
  node scripts/build-policy-page.mjs --theme=site \
    --out=../myweb/public/privacy/index.html
  ```

  Editing the HTML by hand means the app and the website start disagreeing
  about what the app does, which is the one thing a privacy policy must not
  do.

## Editing content

All copy, skills, services, apps, and projects live as small arrays near
the top of `src/App.jsx` (`SKILL_GROUPS`, `SERVICES`, `APPS`, `PROJECTS`,
`PHILOSOPHY`, `BUSINESS_PILLARS`) — update those to change the content
without touching layout code.

`APPS` holds published products, as opposed to `PROJECTS`, which are builds
worth showing. When Personify Life goes live on Google Play, set `live: true`
on its entry: the "Coming soon" label becomes a real store button, pointing
at `PLAY_URL` just above.
