/*
 * Builds the site into dist/ as plain, fully rendered HTML.
 *
 * Every page is complete before any script runs, which is what search engines
 * index best: the words, headings, links and structured data are all in the
 * file Google downloads. The little JavaScript there is (the mobile menu and
 * the glass highlight) only adds polish.
 *
 * Pages come from content/: one per app in content/apps.mjs, plus the home
 * page, the apps index and the about page. The sitemap, robots.txt and web
 * manifest are written from the same list, so a new app is in all of them
 * the moment it is added.
 */
import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { SITE } from "../site.config.mjs";
import { APPS } from "../content/apps.mjs";
import { ABOUT, PROJECTS, SERVICES, SKILLS } from "../content/developer.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "dist");

const BASE = (
  SITE.url ||
  process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "") ||
  "http://localhost:4173"
).replace(/\/+$/, "");

const YEAR = new Date().getFullYear();
const TODAY = new Date().toISOString().slice(0, 10);
/** Busts the browser cache for the stylesheet and script on every deploy. */
const BUILD_ID = Date.now().toString(36);

/* ------------------------------------------------------------ helpers */

const esc = (s = "") =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const abs = (path) => (path.startsWith("http") ? path : `${BASE}${path === "/" ? "/" : path}`);
const json = (data) => JSON.stringify(data).replace(/</g, "\\u003c");

/** Lucide icon paths (MIT), drawn inline so no icon font or library loads. */
const ICONS = {
  check: '<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>',
  calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>',
  chart: '<path d="M3 3v18h18"/><path d="M18 17V9M13 17V5M8 17v-3"/>',
  book: '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
  folder: '<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>',
  wallet: '<path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4z"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/>',
  lock: '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  bell: '<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>',
  globe: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
  "wifi-off": '<path d="M1 1l22 22M16.72 11.06A10.94 10.94 0 0 1 19 12.55M5 12.55a10.94 10.94 0 0 1 5.17-2.39M10.71 5.05A16 16 0 0 1 22.58 9M1.42 9a15.91 15.91 0 0 1 4.7-2.88M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01"/>',
  arrow: '<path d="M7 17L17 7M7 7h10v10"/>',
  menu: '<path d="M3 12h18M3 6h18M3 18h18"/>',
  close: '<path d="M18 6L6 18M6 6l12 12"/>',
  sparkles: '<path d="M12 3l1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2z"/>',
  star: '<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/>',
};
const icon = (name, size = 20) =>
  `<svg class="ic" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] ?? ICONS.sparkles}</svg>`;

const STATUS_LABEL = { live: "Free on Google Play", soon: "Coming soon", development: "In development" };

/** The Google Play button, or an honest label when there is no listing yet. */
function storeButton(app, big = false) {
  if (app.status === "live" && app.playUrl) {
    return `<a class="btn btn-primary${big ? " btn-lg" : ""}" href="${esc(app.playUrl)}" rel="noopener" target="_blank">
      <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M3.6 1.8 13.8 12 3.6 22.2c-.4-.2-.6-.6-.6-1.1V2.9c0-.5.2-.9.6-1.1zm11.3 11.3 2.4 2.4-11 6.3 8.6-8.7zm3.6-3.6 2.9 1.7c.8.5.8 1.6 0 2.1l-2.9 1.7-2.6-2.6 2.6-2.9zM6.3 2.2l11 6.3-2.4 2.4-8.6-8.7z"/></svg>
      Get it on Google Play</a>`;
  }
  return `<span class="chip chip-mono">${esc(STATUS_LABEL[app.status] ?? "Coming soon")}</span>`;
}

/* ------------------------------------------------------------- layout */

const NAV = [
  { href: "/apps", label: "Apps" },
  { href: "/#why", label: "Why these apps" },
  { href: "/about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

function layout({ path, title, description, image = `/apps/${APPS[0].slug}/og.jpg`, type = "website", schema = [], body, appId }) {
  const url = abs(path);
  const navLinks = NAV.map((n) => `<a href="${n.href}"${path === n.href ? ' aria-current="page"' : ""}>${esc(n.label)}</a>`).join("");
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${esc(url)}">
<meta name="robots" content="index, follow, max-image-preview:large">
<meta name="author" content="${esc(SITE.developer)}">
<meta name="theme-color" content="#0a0d13">
${SITE.googleSiteVerification ? `<meta name="google-site-verification" content="${esc(SITE.googleSiteVerification)}">` : ""}
${appId ? `<meta name="google-play-app" content="app-id=${esc(appId)}">` : ""}
<meta property="og:type" content="${type}">
<meta property="og:site_name" content="${esc(SITE.name)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${esc(url)}">
<meta property="og:image" content="${esc(abs(image))}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${esc(abs(image))}">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="sitemap" type="application/xml" href="/sitemap.xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Manrope:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap">
<link rel="stylesheet" href="/assets/site.css?v=${BUILD_ID}">
${schema.map((s) => `<script type="application/ld+json">${json(s)}</script>`).join("\n")}
</head>
<body>
<div class="bg" aria-hidden="true"><div class="blob blob-teal"></div><div class="blob blob-violet"></div></div>
<a class="skip" href="#main">Skip to content</a>
<header class="nav-wrap">
  <nav class="nav glass" aria-label="Main">
    <a class="brand" href="/"><span class="brand-mark">EO</span><span>${esc(SITE.name)}</span></a>
    <div class="nav-links" id="nav-links">${navLinks}</div>
    <button class="nav-toggle" type="button" aria-controls="nav-links" aria-expanded="false" aria-label="Menu">${icon("menu")}${icon("close")}</button>
  </nav>
</header>
<main id="main">
${body}
</main>
<footer class="footer">
  <div class="wrap footer-grid">
    <div>
      <a class="brand" href="/"><span class="brand-mark">EO</span><span>${esc(SITE.name)}</span></a>
      <p class="muted small">${esc(SITE.tagline)}. Made in ${esc(SITE.location)}.</p>
    </div>
    <div>
      <p class="footer-title">Apps</p>
      ${APPS.map((a) => `<a href="/apps/${a.slug}">${esc(a.name)}</a>`).join("")}
      <a href="/apps">All apps</a>
    </div>
    <div>
      <p class="footer-title">More</p>
      <a href="/about">About the developer</a>
      ${APPS.filter((a) => a.privacyUrl).map((a) => `<a href="${esc(a.privacyUrl)}">${esc(a.shortName)} privacy policy</a>`).join("")}
      ${SITE.socials.map((s) => `<a href="${esc(s.url)}" rel="noopener me" target="_blank">${esc(s.label)}</a>`).join("")}
    </div>
  </div>
  <p class="wrap muted small copyright">© ${YEAR} ${esc(SITE.developer)}. Google Play and the Google Play logo are trademarks of Google LLC.</p>
</footer>
<script src="/assets/site.js?v=${BUILD_ID}" defer></script>
</body>
</html>
`;
}

/* ------------------------------------------------------- page pieces */

function appCard(app) {
  return `<article class="glass card app-card">
  <a class="app-card-link" href="/apps/${app.slug}" aria-label="${esc(app.name)}"></a>
  <div class="app-head">
    <img class="app-icon" src="/apps/${app.slug}/icon-256.webp" width="72" height="72" alt="${esc(app.name)} icon" loading="lazy">
    <div>
      <h3>${esc(app.name)}</h3>
      <p class="muted small">${esc(app.platform)} · ${esc(app.price)} · ${esc(STATUS_LABEL[app.status] ?? "")}</p>
    </div>
  </div>
  <p>${esc(app.tagline)}</p>
  <div class="chips">${app.tags.slice(0, 6).map((t) => `<span class="chip">${esc(t)}</span>`).join("")}</div>
  <div class="row">${storeButton(app)}<a class="btn btn-ghost" href="/apps/${app.slug}">Learn more ${icon("arrow", 16)}</a></div>
</article>`;
}

const sectionLabel = (text) => `<p class="label">/ ${esc(text)}</p>`;

function contactBlock() {
  return `<section class="wrap section" id="contact">
  <div class="glass card center">
    ${sectionLabel("Get in touch")}
    <h2>Questions, ideas or a project?</h2>
    <p class="muted narrow">Feedback on the apps, a feature you would like, or software you want built — reach out.</p>
    <div class="row center-row">
      <a class="btn btn-primary" href="tel:${esc(SITE.phone)}">${icon("phone", 16)} ${esc(SITE.phoneLabel)}</a>
      ${SITE.socials.map((s) => `<a class="btn btn-ghost" href="${esc(s.url)}" rel="noopener" target="_blank">${esc(s.label)}</a>`).join("")}
    </div>
  </div>
</section>`;
}

const personSchema = {
  "@type": "Person",
  "@id": `${BASE}/#developer`,
  name: SITE.developer,
  url: `${BASE}/about`,
  jobTitle: "Software Developer",
  address: { "@type": "PostalAddress", addressLocality: "Kumasi", addressCountry: "GH" },
  sameAs: SITE.socials.map((s) => s.url),
};

function breadcrumbs(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: abs(it.path) })),
  };
}

function appSchema(app) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${abs(`/apps/${app.slug}`)}#app`,
    name: app.name,
    alternateName: app.shortName,
    description: app.metaDescription,
    url: abs(`/apps/${app.slug}`),
    image: abs(`/apps/${app.slug}/icon-512.png`),
    applicationCategory: app.category,
    operatingSystem: app.platform === "Android" ? "ANDROID" : app.platform,
    softwareVersion: app.version,
    dateModified: app.updated,
    inLanguage: app.languageCodes,
    author: { "@id": `${BASE}/#developer` },
    publisher: { "@id": `${BASE}/#developer` },
    ...(app.playUrl && app.status === "live" ? { installUrl: app.playUrl, downloadUrl: app.playUrl } : {}),
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD", availability: app.status === "live" ? "https://schema.org/InStock" : "https://schema.org/PreOrder" },
    featureList: app.features.map((f) => f.title),
    ...(app.screenshots.length ? { screenshot: app.screenshots.map((s) => abs(s.src)) } : {}),
  };
}

/* -------------------------------------------------------------- pages */

function homePage() {
  const featured = APPS[0];
  const body = `
<section class="wrap hero">
  <div>
    <p class="label">${esc(SITE.location)} · Apps by ${esc(SITE.developer)}</p>
    <h1>Apps that keep your life <span class="grad">organised and private.</span></h1>
    <p class="lead">Offline-first Android apps with no account, no ads and no server. What you put in them stays on your phone.</p>
    <div class="row">
      <a class="btn btn-primary btn-lg" href="/apps/${featured.slug}">Discover ${esc(featured.name)} ${icon("arrow", 16)}</a>
      <a class="btn btn-ghost btn-lg" href="/apps">All apps</a>
    </div>
  </div>
  <a class="glass card hero-app" href="/apps/${featured.slug}">
    <img src="/apps/${featured.slug}/icon-512.webp" width="140" height="140" alt="${esc(featured.name)} app icon" fetchpriority="high">
    <p class="hero-app-name">${esc(featured.name)}</p>
    <p class="muted small">${esc(featured.highlights.map((h) => h.title).slice(0, 3).join(" · "))}</p>
    <span class="chip chip-mono">${esc(STATUS_LABEL[featured.status])}</span>
  </a>
</section>

<section class="wrap section" id="apps">
  ${sectionLabel("Apps")}
  <h2>Software anyone can install</h2>
  <div class="grid grid-2">${APPS.map(appCard).join("")}</div>
</section>

<section class="wrap section" id="why">
  ${sectionLabel("Why these apps")}
  <h2>Built on three promises</h2>
  <div class="grid grid-3">
    <div class="glass card"><span class="ic-badge">${icon("wifi-off")}</span><h3>Offline first</h3><p class="muted">Everything works without a connection. The internet is used only when you ask for something that needs it.</p></div>
    <div class="glass card"><span class="ic-badge">${icon("lock")}</span><h3>Private by design</h3><p class="muted">No account, no tracking, no server. Sensitive things can be encrypted with a password only you know.</p></div>
    <div class="glass card"><span class="ic-badge">${icon("globe")}</span><h3>For everyone</h3><p class="muted">Free to use, made to work on any Android phone, and translated into nine languages.</p></div>
  </div>
</section>

<section class="wrap section">
  <div class="glass card about-strip">
    <img src="/assets/profile.jpg" width="120" height="120" alt="${esc(SITE.developer)}" loading="lazy">
    <div>
      ${sectionLabel("The developer")}
      <h2>Made by ${esc(SITE.developer)}</h2>
      <p class="muted">${esc(ABOUT[0])}</p>
      <a class="btn btn-ghost" href="/about">More about me ${icon("arrow", 16)}</a>
    </div>
  </div>
</section>
${contactBlock()}`;
  return layout({
    path: "/",
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    image: `/apps/${featured.slug}/og.jpg`,
    body,
    schema: [
      {
        "@context": "https://schema.org",
        "@graph": [
          { "@type": "WebSite", "@id": `${BASE}/#website`, name: SITE.name, url: `${BASE}/`, description: SITE.description, publisher: { "@id": `${BASE}/#developer` } },
          personSchema,
          { "@type": "ItemList", name: "Apps", itemListElement: APPS.map((a, i) => ({ "@type": "ListItem", position: i + 1, url: abs(`/apps/${a.slug}`), name: a.name })) },
        ],
      },
    ],
  });
}

function appsIndexPage() {
  const body = `
<section class="wrap section page-head">
  ${sectionLabel("Apps")}
  <h1>All apps by ${esc(SITE.developer)}</h1>
  <p class="lead">Private, offline-first apps — free on Google Play.</p>
</section>
<section class="wrap section"><div class="grid grid-2">${APPS.map(appCard).join("")}</div></section>
${contactBlock()}`;
  return layout({
    path: "/apps",
    title: `Apps by ${SITE.developer} — private, offline Android apps`,
    description: `Every app by ${SITE.developer}: ${APPS.map((a) => a.name).join(", ")}. Free, offline-first and private.`,
    body,
    schema: [breadcrumbs([{ name: "Home", path: "/" }, { name: "Apps", path: "/apps" }])],
  });
}

function appPage(app) {
  const path = `/apps/${app.slug}`;
  const body = `
<nav class="wrap crumbs" aria-label="Breadcrumb"><a href="/">Home</a> / <a href="/apps">Apps</a> / <span>${esc(app.name)}</span></nav>
<section class="wrap app-hero">
  <img class="app-hero-icon" src="/apps/${app.slug}/icon-512.webp" width="160" height="160" alt="${esc(app.name)} app icon" fetchpriority="high">
  <div>
    <h1>${esc(app.name)}</h1>
    <p class="lead">${esc(app.tagline)}</p>
    <div class="row">${storeButton(app, true)}${app.privacyUrl ? `<a class="btn btn-ghost btn-lg" href="${esc(app.privacyUrl)}">${icon("lock", 16)} Privacy policy</a>` : ""}</div>
    <p class="muted small">${esc(app.platform)} · ${esc(app.price)} · No ads · No account · Version ${esc(app.version)}</p>
  </div>
</section>

<section class="wrap section">
  <div class="grid grid-4">
    ${app.highlights.map((h) => `<div class="glass card tight"><span class="ic-badge">${icon(h.icon)}</span><h3>${esc(h.title)}</h3><p class="muted small">${esc(h.desc)}</p></div>`).join("")}
  </div>
</section>

<section class="wrap section prose">
  ${sectionLabel("What it is")}
  <h2>What is ${esc(app.name)}?</h2>
  ${app.intro.map((p) => `<p>${esc(p)}</p>`).join("")}
</section>

${app.screenshots.length ? `<section class="wrap section">${sectionLabel("Screenshots")}<div class="shots">${app.screenshots.map((s) => `<img src="${esc(s.src)}" alt="${esc(s.alt)}" width="270" height="585" loading="lazy">`).join("")}</div></section>` : ""}

<section class="wrap section" id="features">
  ${sectionLabel("Features")}
  <h2>Everything ${esc(app.shortName)} does</h2>
  <div class="grid grid-2">
    ${app.features.map((f) => `<article class="glass card">
      <span class="ic-badge">${icon(f.icon)}</span>
      <h3>${esc(f.title)}</h3>
      <p class="muted">${esc(f.desc)}</p>
      <ul class="ticks">${f.points.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>
    </article>`).join("")}
  </div>
</section>

<section class="wrap section">
  ${sectionLabel("Use it as")}
  <h2>One app, many jobs</h2>
  <div class="grid grid-3">
    ${app.uses.map((u) => `<div class="glass card tight"><h3>${esc(u.title)}</h3><p class="muted small">${esc(u.desc)}</p></div>`).join("")}
  </div>
</section>

<section class="wrap section">
  <div class="glass card center">
    ${sectionLabel("Languages")}
    <h2>Speaks your language</h2>
    <div class="chips center-row">${app.languages.map((l) => `<span class="chip">${esc(l)}</span>`).join("")}</div>
  </div>
</section>

<section class="wrap section prose" id="faq">
  ${sectionLabel("FAQ")}
  <h2>${esc(app.name)} questions</h2>
  <div class="faq">
    ${app.faq.map((f) => `<details class="glass"><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join("")}
  </div>
</section>

<section class="wrap section">
  <div class="glass card center">
    <img src="/apps/${app.slug}/icon-256.webp" width="88" height="88" alt="" class="app-icon" loading="lazy">
    <h2>Get ${esc(app.name)}</h2>
    <p class="muted narrow">${esc(app.price)} on ${esc(app.platform)}. No account, no ads — just install and start.</p>
    <div class="row center-row">${storeButton(app, true)}</div>
  </div>
</section>`;
  return layout({
    path,
    title: `${app.name} — ${app.metaTitle ?? "offline planner, diary, money tracker & phone app for Android"}`,
    description: app.metaDescription,
    image: `/apps/${app.slug}/og.jpg`,
    appId: app.packageId,
    body,
    schema: [
      appSchema(app),
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: app.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      },
      breadcrumbs([{ name: "Home", path: "/" }, { name: "Apps", path: "/apps" }, { name: app.name, path }]),
      { "@context": "https://schema.org", ...personSchema },
    ],
  });
}

function aboutPage() {
  const body = `
<section class="wrap section page-head about-head">
  <img src="/assets/profile.jpg" width="160" height="160" alt="Portrait of ${esc(SITE.developer)}">
  <div>
    ${sectionLabel("About")}
    <h1>${esc(SITE.developer)}</h1>
    <p class="lead">Software developer · ${esc(SITE.location)}</p>
  </div>
</section>
<section class="wrap section prose">${ABOUT.map((p) => `<p>${esc(p)}</p>`).join("")}
  <div class="chips">${SKILLS.map((s) => `<span class="chip">${esc(s)}</span>`).join("")}</div>
</section>
<section class="wrap section">
  ${sectionLabel("Work with me")}
  <h2>Services</h2>
  <div class="grid grid-4">${SERVICES.map((s) => `<div class="glass card tight"><h3>${esc(s.title)}</h3><p class="muted small">${esc(s.desc)}</p></div>`).join("")}</div>
</section>
<section class="wrap section">
  ${sectionLabel("Projects")}
  <h2>Other builds</h2>
  <div class="grid grid-2">${PROJECTS.map((p) => `<div class="glass card"><h3>${esc(p.title)}</h3><p class="muted">${esc(p.desc)}</p><div class="chips">${p.tags.map((t) => `<span class="chip chip-mono">${esc(t)}</span>`).join("")}</div></div>`).join("")}</div>
</section>
${contactBlock()}`;
  return layout({
    path: "/about",
    title: `About ${SITE.developer} — software developer, ${SITE.location}`,
    description: `${SITE.developer} is a software developer in ${SITE.location} building private, offline-first apps, web systems and secure business software.`,
    type: "profile",
    body,
    schema: [{ "@context": "https://schema.org", "@type": "ProfilePage", mainEntity: personSchema }, breadcrumbs([{ name: "Home", path: "/" }, { name: "About", path: "/about" }])],
  });
}

function notFoundPage() {
  return layout({
    path: "/404",
    title: `Page not found — ${SITE.name}`,
    description: "This page does not exist.",
    body: `<section class="wrap section page-head center"><h1>Page not found</h1><p class="lead">That page does not exist — maybe one of these?</p><div class="row center-row"><a class="btn btn-primary" href="/">Home</a><a class="btn btn-ghost" href="/apps">All apps</a></div></section>`,
  }).replace('<meta name="robots" content="index, follow, max-image-preview:large">', '<meta name="robots" content="noindex">');
}

/* -------------------------------------------------------------- write */

function write(rel, content) {
  const file = join(OUT, rel);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, content);
}

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });
if (existsSync(join(ROOT, "public"))) cpSync(join(ROOT, "public"), OUT, { recursive: true });
cpSync(join(ROOT, "src"), join(OUT, "assets"), { recursive: true });

write("index.html", homePage());
write("apps/index.html", appsIndexPage());
write("about/index.html", aboutPage());
write("404.html", notFoundPage());
for (const app of APPS) write(`apps/${app.slug}/index.html`, appPage(app));

const urls = [
  { path: "/", priority: "1.0", lastmod: TODAY },
  { path: "/apps", priority: "0.9", lastmod: TODAY },
  ...APPS.map((a) => ({ path: `/apps/${a.slug}`, priority: "0.9", lastmod: a.updated })),
  { path: "/about", priority: "0.6", lastmod: TODAY },
  ...APPS.filter((a) => a.privacyUrl?.startsWith("/")).map((a) => ({ path: a.privacyUrl, priority: "0.4", lastmod: a.updated })),
];
const unique = [...new Map(urls.map((u) => [u.path, u])).values()];
write(
  "sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${unique.map((u) => `  <url><loc>${esc(abs(u.path))}</loc><lastmod>${u.lastmod}</lastmod><priority>${u.priority}</priority></url>`).join("\n")}
</urlset>
`,
);
write("robots.txt", `User-agent: *\nAllow: /\n\nSitemap: ${BASE}/sitemap.xml\n`);
write(
  "site.webmanifest",
  JSON.stringify(
    {
      name: SITE.name,
      short_name: "EO Apps",
      start_url: "/",
      display: "standalone",
      background_color: "#0a0d13",
      theme_color: "#0a0d13",
      icons: [{ src: "/favicon.svg", sizes: "any", type: "image/svg+xml" }],
    },
    null,
    2,
  ),
);

// The privacy page is generated by the Personify repo; make sure it shipped.
if (!existsSync(join(OUT, "privacy", "index.html"))) {
  console.warn("warning: public/privacy/index.html is missing — /privacy will 404");
}
console.log(`Built ${4 + APPS.length} pages for ${BASE} into dist/`);
