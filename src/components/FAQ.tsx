import { useState } from 'react'
import { faqItems } from '../data/faq'
import { useInView } from '../lib/useInView'
import { useLang } from '../i18n/LanguageContext'

const COPY = {
  nl: { title: 'Veelgestelde vragen' },
  en: { title: 'Frequently asked questions' },
}

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0)
  const { ref } = useInView<HTMLDivElement>()
  const { lang } = useLang()
  const t = COPY[lang]

  return (
    <section className="border-b border-line bg-surface/30">
      <div ref={ref} className="reveal mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
        <h2 className="font-display text-3xl text-paper text-balance sm:text-4xl">{t.title}</h2>

        <div className="mt-10 divide-y divide-line border-y border-line">
          {faqItems.map((item, i) => {
            const isOpen = open === i
            return (
              <div key={item.question[lang]}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="font-medium text-paper">{item.question[lang]}</span>
                  <span
                    aria-hidden
                    className={`shrink-0 text-xl text-accent-2 transition-transform ${isOpen ? 'rotate-45' : ''}`}
                  >
                    +
                  </span>
                </button>
                {isOpen && <p className="pb-5 pr-8 text-sm leading-relaxed text-bone">{item.answer[lang]}</p>}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
