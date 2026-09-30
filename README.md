# Freeflow Studio

Marketing agency website for Freeflow Studio, Lochristi. Canonical production origin: **https://stefmeister.com**.

## Development and deployment

Requires Node.js 20+.

```sh
npm ci
npm run dev
```

Production uses the Express server, including lead capture:

```sh
npm run build
npm run lint
npm run test:seo
npm start
```

The build creates client assets and pre-renders every public service, case and agency page as Dutch HTML. React hydrates these pages and restores a visitor's saved language after hydration. English remains a visitor language toggle, not a separate indexable URL set.

Configure the lead integration using `.env.example` and the deployment environment. Never commit credentials. SEO tests disable email credentials and do not submit leads. They start a temporary server on port 18791.

## Search and AI discovery

- `VITE_SITE_URL` is a build-time setting, defaulting to `https://stefmeister.com`. Rebuild if the official domain changes.
- Each page provides its content, title, description, canonical URL, social metadata and JSON-LD in the initial HTML.
- The build generates `/sitemap.xml` and `/robots.txt` from the same route list as the pre-rendered pages.
- Structured data describes the studio, website, services and breadcrumbs using visible, factual content. No fabricated ratings, addresses or performance claims are added for search.
- Unknown URLs return HTTP 404 with `noindex`. `/over-stef` permanently redirects to `/agency`; trailing slashes redirect to the canonical route.
- Deploy with `npm start`, not an unconditional SPA fallback, so route HTML and HTTP statuses are preserved.

After deployment, submit `https://stefmeister.com/sitemap.xml` in Google Search Console and Bing Webmaster Tools. Verify the deployed homepage, a service page and a case with URL Inspection. Ensure the domain/CDN allows search crawlers; repository robots rules cannot override a firewall or CDN challenge. Redirect alternate hostnames to the official origin in the hosting configuration.

These foundations support SEO and AI search discovery; indexing, rankings and AI citations are determined by the search platforms and are not guaranteed.
