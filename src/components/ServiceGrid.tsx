import { Link } from 'react-router-dom'
import { services } from '../data/services'
import { trackEvent } from '../lib/analytics'
import { useInView } from '../lib/useInView'
import { useLang } from '../i18n/LanguageContext'

const COPY = {
  nl: { title: 'Wat ik concreet bouw', link: 'Bekijk dienst' },
  en: { title: 'What I concretely build', link: 'View service' },
}

export default function ServiceGrid() {
  const { ref } = useInView<HTMLDivElement>()
  const { lang } = useLang()
  const t = COPY[lang]

  return (
    <section id="diensten" className="border-b border-line bg-surface/30">
      <div ref={ref} className="reveal mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <h2 className="max-w-2xl font-display text-3xl text-paper text-balance sm:text-4xl">{t.title}</h2>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Link
              key={service.slug}
              to={`/${service.slug}`}
              onClick={() => trackEvent('service_viewed', { service: service.slug, placement: 'grid' })}
              className="group flex flex-col rounded-2xl border border-line bg-ink p-6 transition hover:border-accent"
            >
              <span className="font-display text-sm text-mute">{service.number}</span>
              <h3 className="mt-3 font-display text-xl text-paper">{service.title[lang]}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-bone">{service.summary[lang]}</p>
              <ul className="mt-5 space-y-1.5 border-t border-line pt-4">
                {service.includes[lang].slice(0, 4).map((item) => (
                  <li key={item} className="text-xs text-mute">
                    {item}
                  </li>
                ))}
              </ul>
              <span className="mt-5 text-sm font-medium text-accent-2 underline decoration-transparent underline-offset-4 transition group-hover:decoration-accent-2">
                {t.link}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
