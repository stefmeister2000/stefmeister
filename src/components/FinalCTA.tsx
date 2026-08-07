import { Link } from 'react-router-dom'
import { trackEvent } from '../lib/analytics'
import { useInView } from '../lib/useInView'
import { useLang } from '../i18n/LanguageContext'

const COPY = {
  nl: {
    title: 'Bouw een digitale route die niet alleen verkeer krijgt, maar converteert',
    body: 'Ontdek waar jullie advertenties, website, ecommerce of opvolging vandaag omzet verliezen.',
    ctaPrimary: 'Vraag een funnel-audit aan',
    ctaSecondary: 'Bekijk mijn werk',
  },
  en: {
    title: 'Build a digital route that doesn’t just get traffic, but converts it',
    body: 'Find out where your ads, website, ecommerce or follow-up are losing revenue today.',
    ctaPrimary: 'Request a funnel audit',
    ctaSecondary: 'See my work',
  },
}

export default function FinalCTA() {
  const { ref } = useInView<HTMLDivElement>()
  const { lang } = useLang()
  const t = COPY[lang]

  return (
    <section ref={ref} className="reveal border-t border-line">
      <div className="mx-auto max-w-3xl px-5 py-20 text-center sm:px-8 sm:py-28">
        <h2 className="font-display text-3xl text-paper text-balance sm:text-5xl">{t.title}</h2>
        <p className="mx-auto mt-5 max-w-xl text-bone">{t.body}</p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to="/funnel-audit"
            onClick={() => trackEvent('audit_cta_clicked', { placement: 'final_cta' })}
            className="rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-accent-ink transition hover:bg-accent-2"
          >
            {t.ctaPrimary}
          </Link>
          <Link
            to="/cases"
            className="rounded-full border border-line px-7 py-3.5 text-sm font-semibold text-paper transition hover:border-accent"
          >
            {t.ctaSecondary}
          </Link>
        </div>
      </div>
    </section>
  )
}
