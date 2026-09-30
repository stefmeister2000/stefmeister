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


## Website enquiries → Sales CRM

The Express `/api/lead` handler forwards validated enquiries to the CRM before sending existing email notifications. Configure these **server-only** variables in `.env` locally or Railway Variables in production:

- `CRM_INBOUND_URL`: full CRM endpoint URL ending in `/api/public/inbound-lead`. Local development uses `http://127.0.0.1:5174/api/public/inbound-lead`; production requires a publicly reachable HTTPS CRM deployment.
- `CRM_INBOUND_TOKEN`: the CRM website-intake token. Never prefix this with `VITE_` or commit its value.

Start the CRM, run `npm run dev:server`, then run `npm run dev` for the website. The website dev server proxies `/api` to port 8787. `.env` loads automatically in the Express server; existing process environment variables take precedence.

New contacts enter the CRM as Website / New, with qualification answers in notes. An existing email is matched by the CRM endpoint. A stated monthly budget is not used as an estimated deal value. If a configured CRM is unavailable, the form reports failure instead of claiming the lead was saved. Existing email notifications and confirmations run after successful CRM capture.

Run `npm run test:crm` for mapping, authentication, oversized-input and failure-response checks. Never use real visitor addresses for automated delivery tests.
