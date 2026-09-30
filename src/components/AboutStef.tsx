import { useLang } from '../i18n/LanguageContext'
export default function AboutStef() {
  const { lang } = useLang()
  const nl = lang === 'nl'
  return (
    <section id="agency" className="border-b border-line bg-surface/40">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <p className="text-xs uppercase tracking-widest text-accent-2">
          Stef Keppens × LYTE Studios
        </p>
        <h2 className="mt-4 max-w-3xl font-display text-4xl text-paper sm:text-5xl">
          {nl
            ? 'Commercieel denken. Technisch bouwen. Samen vooruit.'
            : 'Commercial thinking. Technical craft. Moving forward together.'}
        </h2>
        <p className="mt-6 max-w-2xl text-lg text-bone">
          {nl
            ? 'We bundelen onze krachten om bedrijven breder te ondersteunen: van positionering en acquisitie tot de websites, producten en systemen erachter.'
            : 'We are joining forces to support businesses more broadly: from positioning and acquisition to the websites, products and systems behind them.'}
        </p>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-line p-8">
            <p className="text-xs uppercase tracking-widest text-mute">
              Growth & strategy
            </p>
            <h3 className="mt-3 font-display text-3xl text-paper">
              Stef Keppens
            </h3>
            <p className="mt-4 text-bone">
              {nl
                ? 'Marketingstrategie, funnels, ecommerce, campagnes en AI-automatisering. Met de volledige klantreis als vertrekpunt.'
                : 'Marketing strategy, funnels, ecommerce, campaigns and AI automation. Starting with the complete customer journey.'}
            </p>
          </div>
          <div className="rounded-2xl border border-line p-8">
            <p className="text-xs uppercase tracking-widest text-mute">
              Design & technology
            </p>
            <h3 className="mt-3 font-display text-3xl text-paper">
              LYTE Studios
            </h3>
            <p className="mt-4 text-bone">
              {nl
                ? 'Websites, software en mobiele apps. Productdesign en ontwikkeling vanuit de studio in Kortrijk.'
                : 'Websites, software and mobile apps. Product design and development from the studio in Kortrijk.'}
            </p>
            <a
              href="https://lytestudios.be/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-block text-sm text-accent-2"
            >
              {nl ? 'Ontdek LYTE Studios' : 'Discover LYTE Studios'} ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
