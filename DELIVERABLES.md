# Stef Keppens — website: deliverables

React + TypeScript + Tailwind CSS v4 + React Router. Source of truth for copy is
`src/data/*.ts`; every page pulls from there so nothing is duplicated.

## 1. Homepage structure
`src/pages/Home.tsx` assembles all 14 sections in the specified order (Hero →
Credibility → Problem → Growth system → Services → Cases → Portfolio → AI →
Process → About → Audit offer → Form → FAQ → Final CTA).

## 2. Full Dutch copy
Lives in `src/data/` (services, cases, clients, portfolio, ai-flows, process,
faq) and directly in the section components for one-off copy (hero, problem
list, final CTA). All copy is either taken verbatim from the brief or written
in the same register — no invented results, no fabricated testimonials.

## 3 & 4. Desktop / mobile design
One responsive codebase, `lg` (1024px) breakpoint splits desktop nav from the
mobile menu + sticky bottom CTA. Dark charcoal base (`--color-ink` /
`--color-surface`), warm off-white text, single muted-gold accent
(`--color-accent`). Headline font Fraunces (serif, premium/editorial), body
Inter. No gradients beyond one soft radial glow in the hero/final CTA, no
decorative animation beyond a short fade-up on scroll-into-view.

## 5. Case-study template
`src/pages/CaseStudyPage.tsx`, fed by `src/data/cases.ts`. Fixed structure:
situation → commercial challenge → my role → what was built → how success is
measured, with an "ongoing project" badge where relevant. Used for all 4
cases (O'Learys, Pinacello, HealthFactor, Nooms) plus `CasesIndex.tsx` at
`/cases`.

## 6. Landing-page portfolio
`src/components/LandingPagePortfolio.tsx` — filterable by category (B2B, B2C,
ecommerce, lokaal, launch), desktop + mobile preview placeholders per item,
links through to the related case. Disclaimer included verbatim.

## 7. AI automation section
`src/components/AIAutomationFlows.tsx`, 4 example flows from
`src/data/ai-flows.ts` (website lead, campaign reporting, content workflow,
customer follow-up), plain-language framing, positioning line kept verbatim.

## 8. Funnel-audit form
`src/components/QualificationForm.tsx` — reusable, used on the homepage,
`/funnel-audit`, `/contact`, and (compact variant) on every service page.
Client-side validation on the 6 required fields, optional fields collapsible,
CTA reads "Vraag mijn analyse aan" (never "Verzenden").

## 9. Confirmation state
Same component swaps to the confirmation message in place ("Bedankt. Ik bekijk
jullie website...") — no separate route, since the form can appear on any
page. No response-time promise made, per brief.

## 10. SEO page recommendations
Implemented routes (`src/App.tsx`): `/`, `/landing-pages`, `/funnels`,
`/meta-ads`, `/google-ads`, `/ecommerce-conversie`, `/ai-automatiseringen`,
`/cases`, `/cases/olearys`, `/cases/pinacello`, `/cases/healthfactor`,
`/cases/nooms`, `/funnel-audit`, `/over-stef`, `/contact`. Every service page
carries problem / process / deliverables / example case / CTA so none of them
are thin duplicates of each other.

## 11. Tracking event map
`src/lib/analytics.ts` defines and fires (via `window.dataLayer.push`, ready
for GTM → GA4/Meta/LinkedIn fan-out):
`traffic_source_captured`, `referral_source_captured`,
`linkedin_campaign_captured` (all from UTM/`li_fat_id`/referrer on first
page load), `case_viewed`, `portfolio_item_viewed`, `service_viewed`,
`audit_cta_clicked`, `form_viewed`, `form_started`, `form_abandoned`,
`form_submitted`, `calendar_opened`. `meeting_booked`, `proposal_sent`,
`project_won`, `project_value` are declared in the same file's `TrackingEvent`
type but have no client-side trigger — those happen after a human step
(calendar tool, CRM), so they should be pushed server-side / from whichever
CRM or calendar tool gets connected.

## 12. Metadata
`src/components/Seo.tsx` sets `<title>`, meta description, canonical, and
OG/Twitter tags per page from each page's own copy — no boilerplate/duplicate
titles across routes. `index.html` carries the site-wide defaults and
commented-out GTM/Meta Pixel/LinkedIn Insight Tag snippets (placeholder IDs).

## 13. Still required — real assets
Nothing below was invented; everything is a labeled placeholder in the code:
- **Photos of Stef** (hero portrait + about-section portrait) — `Placeholder`
  components in `PersonalHero.tsx` and `AboutStef.tsx`.
- **Official logo files** for Pinacello, HealthFactor, Nooms, O'Learys —
  currently shown as plain wordmark text in `ClientWorkBar.tsx` with a visible
  note that real logos are pending.
- **Real project screenshots** (desktop + mobile) for every case and
  portfolio item — placeholders in `CaseStudyGrid`, `CaseStudyPage`,
  `LandingPagePortfolio`.
- **Live landing-page URLs** to link from the portfolio items (`liveUrl` field
  already exists on `PortfolioItem`, just unset).
- **Real tracking IDs**: GTM container, GA4 stream, Meta Pixel, LinkedIn
  Insight Tag — placeholders commented out in `index.html`.
- **Form backend**: the qualification form currently simulates submission
  client-side (see comment in `QualificationForm.tsx`) — needs a real
  endpoint (CRM / email automation / Zapier / n8n, whichever is chosen).
- **Calendar tool link** for "Plan een kennismaking" on `/contact` — currently
  a tracked button with no destination yet.
- **Business email** — used `hallo@stefkeppens.be` as a placeholder address;
  swap for the real one.
- Confirmation on whether the funnel-audit is free, and any real response-time
  commitment — both intentionally left unstated per the brief.

## 14. Placeholders
All implemented via one shared `src/components/Placeholder.tsx` — visibly a
placeholder (dashed border, subtle grid, label), never a fake screenshot or
fake dashboard.

## 15. Confirmation
No client results, percentages, revenue figures, testimonials, team size
claims, or years-of-experience numbers were invented anywhere in the copy or
data files. Where a number appears — the Xpert Funding case (60,000+ leads
and customers in the database, 20–30% conversion on certain email campaigns)
and the €1,500 fixed-rate "funnel-opstart" package on `/funnel-audit` — it
was supplied directly, not guessed. Where no number was given (audit
pricing, response time), the copy stays silent on it rather than guessing.

## 16. Added after initial build (client follow-up)
- New service `Offer & distributie` (`/distributie`, `src/data/services.ts`)
  covering offer strategy, e-mail outreach and B2B Sales Navigator campaigns.
- New case `Xpert Funding` (`/cases/xpert-funding`, `src/data/cases.ts`) —
  ended engagement, real numbers as noted above.
- Two problem-recognition bullets on untrackable distribution / blind B2B
  outreach (`ProblemSection.tsx`).
- Two FAQ entries: B2B outreach/Sales Navigator, and funnel-opstart pricing.
- `FunnelAuditOffer.tsx` now shows the €1,500 funnel-opstart package, with a
  note that pricing beyond it (e.g. organic video) is discussed case by case.
