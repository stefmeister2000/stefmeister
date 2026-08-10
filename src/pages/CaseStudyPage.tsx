import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import CaseVisual from '../components/CaseVisual'
import CheckList from '../components/CheckList'
import Breadcrumbs from '../components/Breadcrumbs'
import { getCase } from '../data/cases'
import type { CaseSlug } from '../data/types'
import { trackEvent } from '../lib/analytics'
import { useInView } from '../lib/useInView'
import { useLang } from '../i18n/LanguageContext'
import { persistentCta, persistentCtaHref } from '../data/nav'

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
    visitSite: 'Bezoek de website',
    closingTitle: 'Herkenbaar? Laten we jullie klantreis bekijken',
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
    visitSite: 'Visit the website',
    closingTitle: 'Sound familiar? Let’s look at your customer journey',
  },
}

export default function CaseStudyPage({ slug }: { slug: CaseSlug }) {
  const c = getCase(slug)
  const { lang } = useLang()
  const t = COPY[lang]
  const { ref } = useInView<HTMLDivElement>(() => trackEvent('case_viewed', { case: slug, placement: 'page' }))

  if (!c) return null

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

          {c.liveUrl && (
            <a
              href={c.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-sm font-medium text-accent-2 hover:text-accent"
            >
              {t.visitSite} ↗
            </a>
          )}

          {c.video ? (
            <figure className="mt-10">
              <CaseVisual case={c} lang={lang} video />
              {c.videoCaption && (
                <figcaption className="mt-4 max-w-2xl font-display text-lg text-paper text-balance">
                  {c.videoCaption[lang]}
                </figcaption>
              )}
            </figure>
          ) : (
            <CaseVisual case={c} lang={lang} ratio="aspect-[16/9]" className="mt-10" />
          )}
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
          <CheckList items={c.built[lang]} className="mt-5" />
        </div>
      </section>

      <section className="border-b border-line">
        <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8 sm:py-20">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent-2">{t.measurement}</p>
          <p className="mt-4 max-w-2xl font-display text-2xl text-paper text-balance">{c.measurement[lang]}</p>
          {c.status === 'ongoing' && <p className="mt-4 text-sm text-mute">{t.ongoingNote}</p>}
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-4xl px-5 py-16 text-center sm:px-8 sm:py-24">
          <h2 className="font-display text-3xl text-paper text-balance sm:text-4xl">{t.closingTitle}</h2>
          <Link
            to={persistentCtaHref}
            onClick={() => trackEvent('audit_cta_clicked', { placement: `case_${c.slug}` })}
            className="mt-8 inline-block rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-accent-ink transition hover:bg-accent-2"
          >
            {persistentCta[lang]}
          </Link>
        </div>
      </section>
    </div>
  )
}
