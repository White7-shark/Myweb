# Evans Opoku Apps

The website that advertises my apps. It's hosted on Vercel's free plan, and
every push to `main` goes live on its own.

It's a **static site with no framework**. A small Node script turns the
content files into finished HTML pages, so search engines can read every
word, heading and link straight away. Nothing has to load first.

## Add or update an app

1. Add (or edit) an object in `content/apps.mjs`. Each field is explained
   at the top of that file.
2. Put its images in `public/apps/<slug>/`:
   - `icon-512.png`, `icon-512.webp`, `icon-256.webp` and `icon-192.png`
   - `og.jpg` at 1200×630, the picture shown when the link is shared
   - screenshots, if you have them
3. Commit and push.

The build then creates or updates:

- the app's page at `/apps/<slug>`
- its card on the home page and on `/apps`
- its entries in `sitemap.xml`
- its Google structured data: app, FAQ and breadcrumbs

Developer details (name, phone, social links) are in `site.config.mjs`. The
About page text, services and projects are in `content/developer.mjs`.

## Run it locally

```bash
npm run dev      # builds, then serves http://localhost:4173
```

No `npm install` is needed: the site has no dependencies.

## Getting found on Google

The build already handles these on every page:

- a unique title and description
- a canonical URL
- Open Graph and Twitter share cards
- `SoftwareApplication`, `FAQPage`, `BreadcrumbList` and `Person`
  structured data
- `sitemap.xml` and `robots.txt`

You need to do these once:

1. Open [Google Search Console](https://search.google.com/search-console)
   and add the site. Choose the "URL prefix" property with the exact Vercel
   address.
2. Verify that you own it. With the "HTML tag" method, paste only the
   `content` value into `googleSiteVerification` in `site.config.mjs`, then
   push.
3. Under Sitemaps, submit `sitemap.xml`.
4. Under URL inspection, request indexing for `/` and `/apps/personify`.
5. In Play Console, put the site's address in the store listing's
   **Website** field. Link to the site from your TikTok and Instagram bios
   too. Links from other places are what move a new site up the results.

Searching the app's exact name usually brings the site up within days of
indexing. Ranking for general phrases ("diary app with password") takes
longer, and gets better as more pages link to the site.

If you add a custom domain later, set `url` in `site.config.mjs`. Until
then, the build uses Vercel's production domain automatically.

## The privacy policy at /privacy

`public/privacy/index.html` is generated from the Personify repository and
copied into the site unchanged. Don't edit it by hand. Regenerate it from
the Personify repo instead:

```bash
node scripts/build-policy-page.mjs --theme=site --out=../myweb/public/privacy/index.html
```

`/privacy` is the address Google Play has on file for the app, so keep it.
