import { Link } from 'react-router-dom'
import { trackEvent } from '../lib/analytics'
import { useLang } from '../i18n/LanguageContext'
import stefPhoto from '../assets/stef.jpg'

const COPY = {
  nl: {
    eyebrow: 'Digital growth & conversion specialist',
    headline: 'Ik bouw het volledige digitale groeisysteem achter ambitieuze bedrijven.',
    body: 'Van advertenties en landing pages tot tracking, automatisatie en conversie.',
    ctaPrimary: 'Vraag een groeianalyse aan',
    ctaSecondary: 'Bekijk mijn werk',
    photo: 'Foto — Stef Keppens',
    flow: ['Ads', 'Landingspagina', 'Lead of boeking', 'Opvolging', 'Klant', 'Omzet'],
  },
  en: {
    eyebrow: 'Digital growth & conversion specialist',
    headline: 'I build the full digital growth system behind ambitious companies.',
    body: 'From ads and landing pages to tracking, automation and conversion.',
    ctaPrimary: 'Request a growth analysis',
    ctaSecondary: 'See my work',
    photo: 'Photo — Stef Keppens',
    flow: ['Ads', 'Landing page', 'Lead or booking', 'Follow-up', 'Customer', 'Revenue'],
  },
}

export default function PersonalHero() {
  const { lang } = useLang()
  const t = COPY[lang]

  return (
    <section className="relative overflow-hidden">
      <div className="relative mx-auto grid max-w-6xl gap-8 px-5 pb-16 pt-10 sm:px-8 sm:pt-20 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10 lg:pb-20 lg:pt-24">
        <div className="reveal">
          <p className="text-sm font-medium uppercase tracking-widest text-accent-2">{t.eyebrow}</p>

          <h1 className="mt-4 font-display text-3xl leading-[1.1] text-paper text-balance sm:mt-5 sm:text-5xl sm:leading-[1.08] lg:text-6xl">
            {t.headline}
          </h1>

          <p className="mt-4 max-w-xl text-lg text-bone sm:mt-6">{t.body}</p>

          <div className="mt-6 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:items-center">
            <Link
              to="/funnel-audit"
              onClick={() => trackEvent('audit_cta_clicked', { placement: 'hero_primary' })}
              className="rounded-full bg-accent px-7 py-3.5 text-center text-sm font-semibold text-accent-ink transition hover:bg-accent-2"
            >
              {t.ctaPrimary}
            </Link>
            <Link
              to="/cases"
              className="rounded-full border border-line px-7 py-3.5 text-center text-sm font-semibold text-paper transition hover:border-accent"
            >
              {t.ctaSecondary}
            </Link>
          </div>
        </div>

        <div className="reveal">
          <img
            src={stefPhoto}
            alt={t.photo}
            className="aspect-[3/4] w-full rounded-2xl border border-line object-cover object-top"
          />
        </div>
      </div>

      <div className="relative border-y border-line bg-surface/50">
        <div className="mx-auto max-w-6xl overflow-x-auto px-5 py-6 sm:px-8">
          <div className="flex min-w-max items-center gap-3 text-sm lg:min-w-0 lg:justify-center">
            {t.flow.map((step, i) => (
              <div key={step} className="flex items-center gap-3">
                <span className="rounded-full border border-line bg-ink px-4 py-2 text-bone">{step}</span>
                {i < t.flow.length - 1 && (
                  <span aria-hidden className="text-mute">
                    →
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
