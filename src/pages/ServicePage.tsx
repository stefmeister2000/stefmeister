import { Link } from 'react-router-dom'
import ServiceVisual from '../components/ServiceVisual'
import { hasServiceVisual } from '../data/visualServices'
import Seo from '../components/Seo'
import CaseVisual from '../components/CaseVisual'
import QualificationForm from '../components/QualificationForm'
import Breadcrumbs from '../components/Breadcrumbs'
import { getService } from '../data/services'
import { getCase } from '../data/cases'
import type { ServiceSlug } from '../data/types'
import { trackEvent } from '../lib/analytics'
import { useInView } from '../lib/useInView'
import { useLang } from '../i18n/LanguageContext'

const COPY = {
  nl: {
    servicesCrumb: 'Diensten',
    problemLabel: 'Het probleem',
    approachLabel: 'Aanpak',
    deliverablesLabel: 'Opleverpunten',
    exampleLabel: 'Voorbeeld',
    view: 'Bekijk de case',
    formTitle: 'Vertel ons over je project',
    formBody:
      'Geen algemene template. We bekijken jullie huidige situatie en proces.',
  },
  en: {
    servicesCrumb: 'Services',
    problemLabel: 'The problem',
    approachLabel: 'Approach',
    deliverablesLabel: 'Deliverables',
    exampleLabel: 'Example',
    view: 'View the case',
    formTitle: 'Tell us about your project',
    formBody:
      'No generic template. We look at your current situation and process.',
  },
}

export default function ServicePage({ slug }: { slug: ServiceSlug }) {
  const service = getService(slug)
  const { lang } = useLang()
  const t = COPY[lang]
  const { ref } = useInView<HTMLDivElement>(() =>
    trackEvent('service_viewed', { service: slug, placement: 'page' }),
  )

  if (!service) return null
  const relatedCase = service.relatedCase
    ? getCase(service.relatedCase)
    : undefined

  return (
    <div ref={ref}>
      <Seo
        title={service.title[lang]}
        description={service.summary[lang]}
        path={`/${service.slug}`}
      />

      <section className="border-b border-line">
        <div className="reveal mx-auto max-w-4xl px-5 py-16 sm:px-8 sm:py-24">
          <Breadcrumbs
            items={[
              { label: t.servicesCrumb, href: '/#expertise' },
              { label: service.title[lang] },
            ]}
          />

          <span className="mt-6 block font-display text-sm text-mute">
            {service.number}
          </span>
          <h1 className="mt-1 font-display text-4xl text-paper text-balance sm:text-5xl">
            {service.title[lang]}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-bone">
            {service.summary[lang]}
          </p>

          <Link to="/contact" className="button-dark service-page-cta" onClick={() => trackEvent('audit_cta_clicked', { placement: 'service_hero', service: slug })}>{lang === 'nl' ? 'Bespreek jouw aanpak' : 'Discuss your approach'} ↗</Link>
          {hasServiceVisual(slug) && <div className="service-page-visual"><ServiceVisual service={slug} /></div>}
          <p className="mt-6 max-w-2xl border-t border-line pt-5 text-sm text-mute">
            {service.includes[lang].join(' · ')}
          </p>
        </div>
      </section>

      <section className="border-b border-line bg-surface/30">
        <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8 sm:py-20">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent-2">
            {t.problemLabel}
          </p>
          <p className="mt-4 max-w-2xl font-display text-2xl text-paper text-balance">
            {service.problem[lang]}
          </p>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8 sm:py-20">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent-2">
            {t.approachLabel}
          </p>
          <div className="mt-6 space-y-5">
            {service.process[lang].map((step, i) => (
              <div key={step} className="flex gap-5">
                <span className="font-display text-xl text-mute">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="text-bone">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-surface/30">
        <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8 sm:py-20">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent-2">
            {t.deliverablesLabel}
          </p>
          <p className="mt-4 max-w-2xl text-bone">
            {service.deliverables[lang].join(' · ')}
          </p>
        </div>
      </section>

      {service.partnerCase && (
        <section className="border-b border-line">
          <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8">
            <p className="text-xs uppercase tracking-widest text-accent-2">
              LYTE Studios · {t.exampleLabel}
            </p>
            <a
              href={service.partnerCase.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 block rounded-2xl border border-line bg-surface p-8 hover:border-accent"
            >
              <h2 className="font-display text-3xl text-paper">
                {service.partnerCase.name} ↗
              </h2>
              <p className="mt-4 text-bone">
                {service.partnerCase.description[lang]}
              </p>
            </a>
          </div>
        </section>
      )}
      {relatedCase && (
        <section className="border-b border-line">
          <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8 sm:py-20">
            <p className="text-sm font-semibold uppercase tracking-widest text-accent-2">
              {t.exampleLabel}
            </p>
            <Link
              to={`/cases/${relatedCase.slug}`}
              onClick={() =>
                trackEvent('case_viewed', {
                  case: relatedCase.slug,
                  placement: 'service_page',
                })
              }
              className="group mt-6 grid gap-6 rounded-2xl border border-line bg-surface p-6 transition hover:border-accent sm:grid-cols-[1fr_1.3fr] sm:items-center"
            >
              <CaseVisual
                case={relatedCase}
                lang={lang}
                ratio="aspect-[16/10]"
              />
              <div>
                <h3 className="font-display text-xl text-paper">
                  {relatedCase.name}
                </h3>
                <p className="mt-1 text-xs uppercase tracking-widest text-mute">
                  {relatedCase.sector[lang]}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-bone">
                  {relatedCase.summary[lang]}
                </p>
                <span className="mt-4 inline-block text-sm font-medium text-accent-2 underline decoration-transparent underline-offset-4 transition group-hover:decoration-accent-2">
                  {t.view}
                </span>
              </div>
            </Link>
          </div>
        </section>
      )}

      <section id="audit-formulier-section">
        <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
          <h2 className="font-display text-3xl text-paper text-balance sm:text-4xl">
            {t.formTitle}
          </h2>
          <p className="mt-4 text-bone">{t.formBody}</p>
          <div className="mt-10">
            <QualificationForm id={`audit-formulier-${service.slug}`} compact />
          </div>
        </div>
      </section>
    </div>
  )
}
