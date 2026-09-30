import { Link } from 'react-router-dom'
import { lyteCases } from '../data/lyteCases'
import { useLang } from '../i18n/LanguageContext'
export default function LyteWork({ featured = false }: { featured?: boolean }) {
  const { lang } = useLang()
  const nl = lang === 'nl'
  return (
    <section id="lyte-projects" className="border-b border-line bg-surface/30">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="text-xs uppercase tracking-widest text-accent-2">
              Portfolio / LYTE Studios
            </p>
            <h2 className="mt-3 font-display text-3xl text-paper sm:text-4xl">
              {nl
                ? 'Digitale producten. In de praktijk.'
                : 'Digital products. Out in the world.'}
            </h2>
            <p className="mt-4 max-w-2xl text-sm text-bone">
              {nl
                ? 'Geselecteerd werk van LYTE Studios, onze partner voor design en development. Bekijk de originele cases voor hun aanpak en uitvoering.'
                : 'Selected work by LYTE Studios, our design and development partner. Explore the original cases for their approach and execution.'}
            </p>
          </div>
          {featured && (
            <Link to="/cases#lyte-projects" className="text-sm text-accent-2">
              {nl ? 'Alle projecten' : 'All projects'} ↗
            </Link>
          )}
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {(featured ? lyteCases.slice(0, 3) : lyteCases).map((c, i) => (
            <a
              key={c.url}
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group overflow-hidden rounded-2xl border border-line bg-ink transition hover:border-accent"
            >
              <div className={'lyte-project-art lyte-art-' + (i % 3)}>
                <span className="text-xs uppercase tracking-widest opacity-70">
                  {c.category}
                </span>
                <span className="font-display text-5xl">
                  {c.name}
                  <span className="text-accent-2">.</span>
                </span>
                <span className="text-xs tracking-widest opacity-70">
                  LYTE STUDIOS ↗
                </span>
              </div>
              <div className="p-6">
                <p className="text-sm leading-relaxed text-bone">
                  {c.description[lang]}
                </p>
                <p className="mt-5 text-xs text-accent-2">
                  {nl
                    ? 'Lees de case bij LYTE Studios'
                    : 'Read the case at LYTE Studios'}{' '}
                  ↗
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
