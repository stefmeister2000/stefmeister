import { useState } from 'react'
import { Link } from 'react-router-dom'
import { portfolioCategories, portfolioItems } from '../data/portfolio'
import type { PortfolioItem } from '../data/types'
import { trackEvent } from '../lib/analytics'
import { useInView } from '../lib/useInView'
import { useLang } from '../i18n/LanguageContext'
import Placeholder from './Placeholder'

const COPY = {
  nl: {
    title: 'Landing pages gebouwd rond één duidelijke actie',
    audience: 'Doelgroep',
    goal: 'Doel',
    conversion: 'Conversie',
    desktop: 'Desktop preview',
    mobile: 'Mobiel',
    view: 'Bekijk de case',
    disclaimer: 'Projecten en resultaten worden alleen getoond waar toestemming beschikbaar is.',
  },
  en: {
    title: 'Landing pages built around one clear action',
    audience: 'Audience',
    goal: 'Goal',
    conversion: 'Conversion',
    desktop: 'Desktop preview',
    mobile: 'Mobile',
    view: 'View the case',
    disclaimer: 'Projects and results are only shown where permission is available.',
  },
}

export default function LandingPagePortfolio() {
  const [filter, setFilter] = useState<PortfolioItem['category'] | 'alle'>('alle')
  const { ref } = useInView<HTMLDivElement>()
  const { lang } = useLang()
  const t = COPY[lang]

  const items = filter === 'alle' ? portfolioItems : portfolioItems.filter((item) => item.category === filter)

  return (
    <section id="landing-pages" className="border-b border-line bg-surface/30">
      <div ref={ref} className="reveal mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <h2 className="max-w-2xl font-display text-3xl text-paper text-balance sm:text-4xl">{t.title}</h2>

        <div className="no-scrollbar -mx-5 mt-8 flex flex-nowrap gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
          {portfolioCategories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setFilter(cat.value)}
              className={`shrink-0 rounded-full border px-4 py-2.5 text-sm transition ${
                filter === cat.value
                  ? 'border-accent bg-accent text-accent-ink'
                  : 'border-line text-bone hover:border-accent'
              }`}
            >
              {cat.label[lang]}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {items.map((item) => (
            <div key={item.id} className="rounded-2xl border border-line bg-ink p-5">
              <div className="grid grid-cols-3 gap-2">
                <Placeholder label={t.desktop} ratio="aspect-[4/3]" className="col-span-2" />
                <Placeholder label={t.mobile} ratio="aspect-[3/4]" />
              </div>

              <h3 className="mt-5 font-display text-lg text-paper">{item.project}</h3>
              <dl className="mt-3 space-y-1.5 text-sm">
                <div className="flex gap-2">
                  <dt className="w-24 shrink-0 text-mute">{t.audience}</dt>
                  <dd className="text-bone">{item.audience[lang]}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="w-24 shrink-0 text-mute">{t.goal}</dt>
                  <dd className="text-bone">{item.objective[lang]}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="w-24 shrink-0 text-mute">{t.conversion}</dt>
                  <dd className="text-bone">{item.conversion[lang]}</dd>
                </div>
              </dl>
              <p className="mt-3 text-sm leading-relaxed text-mute">{item.description[lang]}</p>

              <Link
                to={`/cases/${item.caseSlug}`}
                onClick={() => trackEvent('portfolio_item_viewed', { item: item.id })}
                className="mt-5 inline-block text-sm font-medium text-accent-2 underline decoration-transparent underline-offset-4 hover:decoration-accent-2"
              >
                {t.view}
              </Link>
            </div>
          ))}
        </div>

        <p className="mt-8 text-xs text-mute">{t.disclaimer}</p>
      </div>
    </section>
  )
}
