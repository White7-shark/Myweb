// Serves dist/ the way Vercel does (clean URLs), for checking locally.
import { createServer } from "node:http";
import { existsSync, readFileSync, statSync } from "node:fs";
import { extname, join, normalize } from "node:path";

const ROOT = join(process.cwd(), "dist");
const TYPES = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".webp": "image/webp", ".xml": "application/xml", ".txt": "text/plain", ".webmanifest": "application/manifest+json" };
const port = Number(process.env.PORT) || 4173;

createServer((req, res) => {
  const path = normalize(decodeURIComponent(new URL(req.url, "http://x").pathname)).replace(/^(\.\.[/\\])+/, "");
  const candidates = [join(ROOT, path), join(ROOT, path, "index.html"), join(ROOT, `${path}.html`)];
  const file = candidates.find((f) => existsSync(f) && statSync(f).isFile());
  if (!file) {
    res.writeHead(404, { "content-type": TYPES[".html"] });
    return res.end(readFileSync(join(ROOT, "404.html")));
  }
  res.writeHead(200, { "content-type": TYPES[extname(file)] ?? "application/octet-stream" });
  res.end(readFileSync(file));
}).listen(port, () => console.log(`http://localhost:${port}`));
