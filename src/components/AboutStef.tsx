import { useInView } from '../lib/useInView'
import { useLang } from '../i18n/LanguageContext'
import CheckList from './CheckList'
import stefPhoto from '../assets/stef.jpg'

const COPY = {
  nl: {
    title: 'Strategie en uitvoering rechtstreeks bij dezelfde persoon',
    paragraphs: [
      'Ik ben Stef Keppens. Mijn werk ligt op het snijpunt van marketing, ecommerce, technologie en commerciële groei.',
      'Ik werk rechtstreeks met bedrijven aan de volledige digitale klantreis: van advertenties en landingspagina’s tot tracking, ecommerce en automatisering.',
      'Omdat ik zowel strategisch als uitvoerend betrokken ben, blijven ideeën niet in een presentatie staan. Ze worden vertaald naar pagina’s, campagnes en systemen die daadwerkelijk gebruikt en gemeten kunnen worden.',
    ],
    highlights: [
      'Directe communicatie',
      'Hands-on uitvoering',
      'Commercieel denken',
      'Ervaring in verschillende businessmodellen',
      'Geen onnodige account-managementlagen',
    ],
    photo: 'Foto — Stef Keppens',
  },
  en: {
    title: 'Strategy and execution with the same person',
    paragraphs: [
      'I’m Stef Keppens. My work sits at the intersection of marketing, ecommerce, technology and commercial growth.',
      'I work directly with companies on the full digital customer journey: from ads and landing pages to tracking, ecommerce and automation.',
      'Because I’m involved both strategically and hands-on, ideas don’t stay stuck in a presentation. They get translated into pages, campaigns and systems that actually get used and measured.',
    ],
    highlights: [
      'Direct communication',
      'Hands-on execution',
      'Commercial thinking',
      'Experience across different business models',
      'No unnecessary account-management layers',
    ],
    photo: 'Photo — Stef Keppens',
  },
}

export default function AboutStef() {
  const { ref } = useInView<HTMLDivElement>()
  const { lang } = useLang()
  const t = COPY[lang]

  return (
    <section id="over-mij" className="border-b border-line">
      <div ref={ref} className="reveal mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <img
          src={stefPhoto}
          alt={t.photo}
          className="aspect-[3/4] w-full rounded-2xl border border-line object-cover object-top"
        />

        <div>
          <h2 className="font-display text-3xl text-paper text-balance sm:text-4xl">{t.title}</h2>

          <div className="mt-6 space-y-4 text-bone">
            {t.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          <CheckList items={t.highlights} className="mt-8 border-t border-line pt-6" />
        </div>
      </div>
    </section>
  )
}
