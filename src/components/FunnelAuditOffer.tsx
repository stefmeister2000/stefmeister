import { useInView } from '../lib/useInView'
import { trackEvent } from '../lib/analytics'
import { useLang } from '../i18n/LanguageContext'

const COPY = {
  nl: {
    title: 'Waar verliest jullie huidige digitale klantreis conversie?',
    body: 'Geen algemene template. Ik bekijk jullie huidige situatie, doelgroep en commerciële proces.',
    scopeLabel: 'De audit bekijkt',
    scope: [
      'Website structuur',
      'Campagne-landingspagina’s',
      'Meta Ads',
      'Google Ads',
      'Ecommerce-klantreis',
      'Checkout-flow',
      'Leadflow',
      'Boekingsflow',
      'E-mailopvolging',
      'Tracking',
      'Kansen voor AI-automatisering',
    ],
    deliverablesLabel: 'Mogelijke opleverpunten',
    deliverables: [
      'Belangrijkste conversieproblemen',
      'Screenshots en observaties',
      'Geprioriteerde aanbevelingen',
      'Voorgestelde nieuwe funnel',
      'Voorgestelde landingspagina’s',
      'Trackinghiaten',
      'Automatiseringskansen',
      'Aanbevolen vervolgstappen',
    ],
    pricingLabel: 'Funnel-opstart',
    price: '€1.500',
    priceNote: '— vast tarief',
    pricingBody: 'Analyse van je huidige marketing, USP’s en positionering, een landingspagina, e-mailflows en de opzet van Meta Ads.',
    pricingAfter: 'Daarna is de prijs bespreekbaar — bijvoorbeeld om organische video’s of extra kanalen toe te voegen.',
    cta: 'Vraag een persoonlijke funnel-audit aan',
  },
  en: {
    title: 'Where is your current digital customer journey losing conversion?',
    body: 'No generic template. I look at your current situation, audience and commercial process.',
    scopeLabel: 'The audit reviews',
    scope: [
      'Website structure',
      'Campaign landing pages',
      'Meta Ads',
      'Google Ads',
      'Ecommerce journey',
      'Checkout flow',
      'Lead flow',
      'Booking flow',
      'Email follow-up',
      'Tracking',
      'Opportunities for AI automation',
    ],
    deliverablesLabel: 'Possible deliverables',
    deliverables: [
      'Key conversion problems',
      'Screenshots and observations',
      'Prioritised recommendations',
      'Proposed new funnel',
      'Suggested landing pages',
      'Tracking gaps',
      'Automation opportunities',
      'Recommended next steps',
    ],
    pricingLabel: 'Funnel setup',
    price: '€1,500',
    priceNote: '— fixed rate',
    pricingBody: 'Analysis of your current marketing, USPs and positioning, one landing page, email flows and setting up Meta Ads.',
    pricingAfter: 'After that, pricing is discussed case by case — for example to add organic video or extra channels.',
    cta: 'Request a personal funnel audit',
  },
}

export default function FunnelAuditOffer() {
  const { ref } = useInView<HTMLDivElement>()
  const { lang } = useLang()
  const t = COPY[lang]

  return (
    <section id="funnel-audit-offer" className="border-b border-line bg-surface/30">
      <div ref={ref} className="reveal mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <h2 className="max-w-2xl font-display text-3xl text-paper text-balance sm:text-4xl">{t.title}</h2>
        <p className="mt-5 max-w-2xl text-bone">{t.body}</p>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-accent-2">{t.scopeLabel}</p>
            <p className="mt-3 text-sm leading-relaxed text-bone">{t.scope.join(' · ')}</p>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-accent-2">{t.deliverablesLabel}</p>
            <p className="mt-3 text-sm leading-relaxed text-bone">{t.deliverables.join(' · ')}</p>
          </div>
        </div>

        <div className="mt-12 rounded-2xl border border-accent/30 bg-ink p-6 sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between sm:gap-10">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-accent-2">{t.pricingLabel}</p>
              <p className="mt-2 font-display text-2xl text-paper">
                {t.price} <span className="font-sans text-base text-mute">{t.priceNote}</span>
              </p>
              <p className="mt-3 max-w-md text-sm text-bone">{t.pricingBody}</p>
            </div>
            <p className="max-w-xs text-sm text-mute sm:text-right">{t.pricingAfter}</p>
          </div>
        </div>

        <div className="mt-8">
          <a
            href="#audit-formulier"
            onClick={() => trackEvent('audit_cta_clicked', { placement: 'audit_offer' })}
            className="inline-block rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-accent-ink transition hover:bg-accent-2"
          >
            {t.cta}
          </a>
        </div>
      </div>
    </section>
  )
}
