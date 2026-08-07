import { processSteps, workModes } from '../data/process'
import { useInView } from '../lib/useInView'
import { useLang } from '../i18n/LanguageContext'

const COPY = {
  nl: { title: 'Van probleem naar werkend systeem', iWork: 'Ik werk: ' },
  en: { title: 'From problem to working system', iWork: 'I work: ' },
}

export default function ProcessSection() {
  const { ref } = useInView<HTMLDivElement>()
  const { lang } = useLang()
  const t = COPY[lang]

  return (
    <section className="border-b border-line bg-surface/30">
      <div ref={ref} className="reveal mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <h2 className="max-w-2xl font-display text-3xl text-paper text-balance sm:text-4xl">{t.title}</h2>

        <div className="mt-12 grid gap-6 sm:grid-cols-5">
          {processSteps.map((step) => (
            <div key={step.number} className="sm:col-span-1">
              <span className="font-display text-3xl text-accent-2">{step.number}</span>
              <h3 className="mt-3 font-display text-lg text-paper">{step.title[lang]}</h3>
              <p className="mt-2 text-sm leading-relaxed text-mute">{step.description[lang]}</p>
            </div>
          ))}
        </div>

        <p className="mt-12 border-t border-line pt-5 text-sm text-mute">
          <span className="text-paper">{t.iWork}</span>
          {workModes[lang].join(' · ')}
        </p>
      </div>
    </section>
  )
}
