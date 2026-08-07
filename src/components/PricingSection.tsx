import { useState } from 'react'
import { Link } from 'react-router-dom'
import { pricingTiers, featureRows, addOns } from '../data/pricing'
import { persistentCta, persistentCtaHref } from '../data/nav'
import { useInView } from '../lib/useInView'
import { useLang } from '../i18n/LanguageContext'

const COPY = {
  nl: {
    title: 'Groeipakketten',
    body: 'Van marketingbasis tot quasi-volledige growth ownership. Kies het niveau van betrokkenheid dat bij jullie past.',
    toggleShow: 'Bekijk volledige vergelijking',
    toggleHide: 'Verberg volledige vergelijking',
    featureCol: 'Inbegrepen',
    addOnsLabel: 'Losse consulting',
    note: 'Prijzen zijn richtprijzen op maandbasis.',
  },
  en: {
    title: 'Growth packages',
    body: 'From marketing foundations to near-full growth ownership. Choose the level of involvement that fits.',
    toggleShow: 'See full comparison',
    toggleHide: 'Hide full comparison',
    featureCol: 'Included',
    addOnsLabel: 'Standalone consulting',
    note: 'Prices are indicative monthly rates.',
  },
}

export default function PricingSection() {
  const { ref } = useInView<HTMLDivElement>()
  const { lang } = useLang()
  const t = COPY[lang]
  const [showTable, setShowTable] = useState(false)

  return (
    <section id="groeipakketten" className="border-b border-line">
      <div ref={ref} className="reveal mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <h2 className="max-w-2xl font-display text-3xl text-paper text-balance sm:text-4xl">{t.title}</h2>
        <p className="mt-5 max-w-2xl text-bone">{t.body}</p>

        <div className="no-scrollbar -mx-5 mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-2 sm:mx-0 sm:px-0 sm:pb-0 lg:grid lg:grid-cols-3 lg:overflow-visible">
          {pricingTiers.map((tier) => (
            <div
              key={tier.key}
              className="flex w-[85%] shrink-0 snap-center flex-col rounded-2xl border border-line bg-surface p-6 sm:w-[60%] sm:p-8 lg:w-auto lg:shrink"
            >
              <h3 className="font-display text-xl text-paper">{tier.name[lang]}</h3>
              <p className="mt-2 font-display text-2xl text-paper">{tier.price[lang]}</p>
              <p className="mt-3 text-sm text-mute">{tier.audience[lang]}</p>
              <ul className="mt-6 flex-1 space-y-2 border-t border-line pt-6">
                {tier.highlights[lang].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-bone">
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                to={persistentCtaHref}
                className="mt-6 rounded-full border border-line px-5 py-3 text-center text-sm font-semibold text-paper transition hover:border-accent"
              >
                {persistentCta[lang]}
              </Link>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setShowTable((v) => !v)}
          className="mt-8 text-sm font-medium text-accent-2 hover:text-accent"
        >
          {showTable ? t.toggleHide : t.toggleShow}
        </button>

        {showTable && (
          <div className="no-scrollbar mt-6 overflow-x-auto rounded-2xl border border-line">
            <table className="w-full min-w-[720px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-line bg-surface/50 text-left">
                  <th className="px-4 py-3 font-medium text-mute">{t.featureCol}</th>
                  {pricingTiers.map((tier) => (
                    <th key={tier.key} className="px-4 py-3 font-medium text-paper">
                      {tier.name[lang]}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {featureRows.map((row) => (
                  <tr key={row.label[lang]} className="border-b border-line last:border-0">
                    <td className="px-4 py-3 text-bone">{row.label[lang]}</td>
                    {row.values.map((cell, i) => (
                      <td key={i} className="px-4 py-3">
                        {cell.type === 'check' && (
                          <span aria-hidden className="text-accent-2">
                            ✓
                          </span>
                        )}
                        {cell.type === 'dash' && (
                          <span aria-hidden className="text-line">
                            —
                          </span>
                        )}
                        {cell.type === 'text' && <span className="text-mute">{cell.label[lang]}</span>}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-10 border-t border-line pt-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent-2">{t.addOnsLabel}</p>
          <div className="mt-4 flex flex-wrap gap-3">
            {addOns.map((addOn) => (
              <div
                key={addOn.key}
                className="flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-sm"
              >
                <span className="text-paper">{addOn.name[lang]}</span>
                <span className="text-mute">·</span>
                <span className="text-bone">{addOn.price[lang]}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-6 text-xs text-mute">{t.note}</p>
      </div>
    </section>
  )
}
