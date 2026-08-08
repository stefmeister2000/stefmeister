import { useInView } from '../lib/useInView'
import { useLang } from '../i18n/LanguageContext'

const COPY = {
  nl: {
    title: 'Veel bedrijven hebben marketing, maar geen werkend systeem',
    problems: [
      'Advertenties sturen bezoekers naar algemene websites',
      'Landingspagina’s zijn niet afgestemd op de campagne',
      'Bezoekers krijgen te veel keuzes',
      'Ecommerce-websites verliezen klanten vóór checkout',
      'Leads worden niet snel of relevant opgevolgd',
      'Marketing wordt gemeten op klikken in plaats van omzet',
      'Verschillende tools en kanalen werken los van elkaar',
      'Repetitieve processen worden nog handmatig uitgevoerd',
      'Distributie loopt niet via een trackbare campagne, maar ad hoc',
      'B2B-outreach gebeurt zonder zicht op wat wel en niet werkt',
    ],
    quote: 'Het probleem is vaak niet te weinig verkeer. Het probleem is wat er na de klik gebeurt.',
  },
  en: {
    title: 'Many companies have marketing, but no working system',
    problems: [
      'Ads send visitors to general websites',
      'Landing pages aren’t matched to the campaign',
      'Visitors are given too many choices',
      'Ecommerce websites lose customers before checkout',
      'Leads aren’t followed up quickly or relevantly',
      'Marketing is measured on clicks instead of revenue',
      'Different tools and channels operate in isolation',
      'Repetitive processes are still done manually',
      'Distribution doesn’t run through a trackable campaign, just ad hoc',
      'B2B outreach happens blind, with no visibility into what works',
    ],
    quote: 'The problem is often not too little traffic. The problem is what happens after the click.',
  },
}

export default function ProblemSection() {
  const { ref } = useInView<HTMLDivElement>()
  const { lang } = useLang()
  const t = COPY[lang]

  return (
    <section className="border-b border-line bg-surface/30">
      <div ref={ref} className="reveal mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <h2 className="max-w-2xl font-display text-3xl text-paper text-balance sm:text-4xl">{t.title}</h2>

        <ul className="mt-8 grid gap-x-12 sm:mt-10 sm:grid-cols-2">
          {t.problems.map((problem) => (
            <li
              key={problem}
              className="flex items-start gap-2.5 border-t border-line py-2.5 text-sm leading-snug text-bone sm:gap-3 sm:py-3.5 sm:text-base sm:leading-normal"
            >
              <span aria-hidden className="mt-0.5 shrink-0 text-accent">✕</span>
              <span>{problem}</span>
            </li>
          ))}
        </ul>

        <p className="mt-10 border-l-2 border-accent pl-6 font-display text-xl text-paper text-balance sm:text-2xl">
          {t.quote}
        </p>
      </div>
    </section>
  )
}
