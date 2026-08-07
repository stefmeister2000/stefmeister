import { Link } from 'react-router-dom'
import { navItems } from '../data/nav'
import { services } from '../data/services'
import { useLang } from '../i18n/LanguageContext'

const COPY = {
  nl: {
    tagline: 'Ik bouw de complete digitale route van eerste klik tot conversie.',
    nav: 'Navigatie',
    services: 'Diensten',
    contact: 'Contact',
    cta: 'Vraag een funnel-audit aan',
    disclaimer: 'Projecten en resultaten worden alleen getoond waar toestemming beschikbaar is.',
  },
  en: {
    tagline: 'I build the complete digital route from first click to conversion.',
    nav: 'Navigation',
    services: 'Services',
    contact: 'Contact',
    cta: 'Request a funnel audit',
    disclaimer: 'Projects and results are only shown where permission is available.',
  },
}

export default function Footer() {
  const { lang } = useLang()
  const t = COPY[lang]

  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-display text-lg text-paper">Stef Keppens</p>
            <p className="mt-3 max-w-xs text-sm text-mute">{t.tagline}</p>
          </div>

          <div>
            <p className="text-sm font-semibold text-paper">{t.nav}</p>
            <ul className="mt-3 space-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link to={item.href} className="text-sm text-mute transition hover:text-paper">
                    {item.label[lang]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-paper">{t.services}</p>
            <ul className="mt-3 space-y-2">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link to={`/${service.slug}`} className="text-sm text-mute transition hover:text-paper">
                    {service.title[lang]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-paper">{t.contact}</p>
            <ul className="mt-3 space-y-2 text-sm text-mute">
              <li>
                <a href="mailto:hallo@stefkeppens.be" className="transition hover:text-paper">
                  hallo@stefkeppens.be
                </a>
              </li>
              <li>
                <Link to="/funnel-audit" className="transition hover:text-paper">
                  {t.cta}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-line pt-6 text-xs text-mute sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Stef Keppens</p>
          <p>{t.disclaimer}</p>
        </div>
      </div>
    </footer>
  )
}
