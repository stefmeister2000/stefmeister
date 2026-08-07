import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import Placeholder from '../components/Placeholder'
import CaseVisual from '../components/CaseVisual'
import Breadcrumbs from '../components/Breadcrumbs'
import { getCase } from '../data/cases'
import { portfolioItems } from '../data/portfolio'
import type { CaseSlug } from '../data/types'
import { trackEvent } from '../lib/analytics'
import { useInView } from '../lib/useInView'
import { useLang } from '../i18n/LanguageContext'

const COPY = {
  nl: {
    casesCrumb: 'Cases',
    ongoing: 'Lopend project',
    caseLabel: 'Case',
    situation: 'Situatie',
    challenge: 'Commerciële uitdaging',
    role: 'Mijn rol',
    built: 'Wat er gebouwd werd',
    measurement: 'Hoe succes gemeten wordt',
    ongoingNote: 'Dit project loopt nog — cijfers volgen zodra beschikbaar.',
    landingPages: 'Landingspagina’s',
    closingTitle: 'Herkenbaar? Laten we jullie klantreis bekijken',
    cta: 'Vraag een funnel-audit aan',
  },
  en: {
    casesCrumb: 'Cases',
    ongoing: 'Ongoing project',
    caseLabel: 'Case',
    situation: 'Situation',
    challenge: 'Commercial challenge',
    role: 'My role',
    built: 'What was built',
    measurement: 'How success is measured',
    ongoingNote: 'This project is still ongoing — numbers will follow once available.',
    landingPages: 'Landing pages',
    closingTitle: 'Sound familiar? Let’s look at your customer journey',
    cta: 'Request a funnel audit',
  },
}

export default function CaseStudyPage({ slug }: { slug: CaseSlug }) {
  const c = getCase(slug)
  const { lang } = useLang()
  const t = COPY[lang]
  const { ref } = useInView<HTMLDivElement>(() => trackEvent('case_viewed', { case: slug, placement: 'page' }))

  if (!c) return null
  const relatedPortfolio = portfolioItems.filter((item) => item.caseSlug === slug)

  return (
    <div ref={ref}>
      <Seo title={`${t.caseLabel} — ${c.name}`} description={c.summary[lang]} path={`/cases/${c.slug}`} />

      <section className="border-b border-line">
        <div className="reveal mx-auto max-w-4xl px-5 py-16 sm:px-8 sm:py-24">
          <Breadcrumbs items={[{ label: t.casesCrumb, href: '/cases' }, { label: c.name }]} />

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <h1 className="font-display text-4xl text-paper text-balance sm:text-5xl">{c.name}</h1>
            {c.status === 'ongoing' && <span className="text-sm italic text-accent-2">{t.ongoing}</span>}
          </div>
          <p className="mt-2 text-sm uppercase tracking-widest text-mute">{c.sector[lang]}</p>
          <p className="mt-6 max-w-2xl text-lg text-bone">{c.summary[lang]}</p>

          <CaseVisual case={c} lang={lang} ratio="aspect-[16/9]" className="mt-10" />
        </div>
      </section>

      <section className="border-b border-line bg-surface/30">
        <div className="mx-auto grid max-w-4xl gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-accent-2">{t.situation}</p>
            <p className="mt-4 text-bone">{c.situation[lang]}</p>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-accent-2">{t.challenge}</p>
            <p className="mt-4 text-bone">{c.challenge[lang]}</p>
          </div>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8 sm:py-20">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent-2">{t.role}</p>
          <p className="mt-4 max-w-2xl text-bone">{c.role[lang]}</p>
        </div>
      </section>

      <section className="border-b border-line bg-surface/30">
        <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8 sm:py-20">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent-2">{t.built}</p>
          <p className="mt-4 text-bone">{c.built[lang].join(' · ')}</p>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8 sm:py-20">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent-2">{t.measurement}</p>
          <p className="mt-4 max-w-2xl font-display text-2xl text-paper text-balance">{c.measurement[lang]}</p>
          {c.status === 'ongoing' && <p className="mt-4 text-sm text-mute">{t.ongoingNote}</p>}
        </div>
      </section>

      {relatedPortfolio.length > 0 && (
        <section className="border-b border-line bg-surface/30">
          <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8 sm:py-20">
            <p className="text-sm font-semibold uppercase tracking-widest text-accent-2">{t.landingPages}</p>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {relatedPortfolio.map((item) => (
                <div key={item.id} className="rounded-2xl border border-line bg-ink p-5">
                  <Placeholder label={item.project} ratio="aspect-[4/3]" />
                  <h3 className="mt-4 font-display text-base text-paper">{item.project}</h3>
                  <p className="mt-2 text-sm text-mute">{item.description[lang]}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section>
        <div className="mx-auto max-w-4xl px-5 py-16 text-center sm:px-8 sm:py-24">
          <h2 className="font-display text-3xl text-paper text-balance sm:text-4xl">{t.closingTitle}</h2>
          <Link
            to="/funnel-audit"
            onClick={() => trackEvent('audit_cta_clicked', { placement: `case_${c.slug}` })}
            className="mt-8 inline-block rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-accent-ink transition hover:bg-accent-2"
          >
            {t.cta}
          </Link>
        </div>
      </section>
    </div>
  )
}
