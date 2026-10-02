import { faqItems } from '../data/faq'
import { useInView } from '../lib/useInView'
import { useLang } from '../i18n/LanguageContext'

export default function FAQ() {
  const { ref } = useInView<HTMLDivElement>()
  const { lang } = useLang()
  return (
    <section className="border-b border-line bg-surface/30" aria-labelledby="faq-title">
      <div ref={ref} className="reveal mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
        <h2 id="faq-title" className="font-display text-3xl text-paper text-balance sm:text-4xl">{lang === 'nl' ? 'Veelgestelde vragen' : 'Frequently asked questions'}</h2>
        <div className="mt-10 divide-y divide-line border-y border-line">
          {faqItems.map((item, i) => (
            <details key={item.question[lang]} name="studio-faq" open={i === 0} className="group">
              <summary className="flex w-full cursor-pointer list-none items-center justify-between gap-4 py-5 text-left [&::-webkit-details-marker]:hidden">
                <span className="font-medium text-paper">{item.question[lang]}</span>
                <span aria-hidden="true" className="shrink-0 text-xl text-accent-2 transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="pb-5 pr-8 text-sm leading-relaxed text-bone">{item.answer[lang]}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
