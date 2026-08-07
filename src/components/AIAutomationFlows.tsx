import { Link } from 'react-router-dom'
import { aiFlows } from '../data/ai-flows'
import { useInView } from '../lib/useInView'
import { useLang } from '../i18n/LanguageContext'

const COPY = {
  nl: {
    title: 'Van handmatig werk naar slimme workflows',
    body: 'Veel bedrijven verliezen tijd aan repetitieve taken tussen marketing, sales en opvolging. Ik ontwerp AI-gestuurde workflows die informatie verwerken, leads kwalificeren en teams sneller laten handelen.',
    positioning: 'AI vervangt geen strategie. Het maakt een goed proces sneller, consistenter en beter meetbaar.',
    cta: 'Bespreek een automatisering',
  },
  en: {
    title: 'From manual work to smart workflows',
    body: 'Many companies lose time on repetitive tasks between marketing, sales and follow-up. I design AI-driven workflows that process information, qualify leads and let teams act faster.',
    positioning: 'AI doesn’t replace strategy. It makes a good process faster, more consistent and more measurable.',
    cta: 'Discuss an automation',
  },
}

export default function AIAutomationFlows() {
  const { ref } = useInView<HTMLDivElement>()
  const { lang } = useLang()
  const t = COPY[lang]

  return (
    <section className="border-b border-line">
      <div ref={ref} className="reveal mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <h2 className="max-w-2xl font-display text-3xl text-paper text-balance sm:text-4xl">{t.title}</h2>
        <p className="mt-5 max-w-2xl text-bone">{t.body}</p>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {aiFlows.map((flow) => (
            <div key={flow.title[lang]} className="rounded-2xl border border-line bg-surface p-6">
              <h3 className="font-display text-lg text-paper">{flow.title[lang]}</h3>
              <p className="mt-3 text-sm leading-relaxed text-mute">{flow.steps[lang].join(' → ')}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-start gap-6 rounded-2xl border border-line bg-surface/50 p-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl font-display text-lg text-paper text-balance">{t.positioning}</p>
          <Link
            to="/ai-automatiseringen"
            className="shrink-0 rounded-full border border-line px-6 py-3 text-sm font-semibold text-paper transition hover:border-accent"
          >
            {t.cta}
          </Link>
        </div>
      </div>
    </section>
  )
}
