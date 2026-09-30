import QualificationForm from './QualificationForm'
import { useLang } from '../i18n/LanguageContext'

const COPY = {
  nl: {
    title: 'Vertel kort waar jullie vandaag staan',
    body: 'Zeven velden, twee minuten. Op basis daarvan bekijken we hoe we jullie het beste kunnen helpen.',
  },
  en: {
    title: 'Tell us briefly where you stand today',
    body: 'Seven fields, two minutes. Based on that We’ll see if and how we can best help.',
  },
}

export default function QualificationFormSection() {
  const { lang } = useLang()
  const t = COPY[lang]

  return (
    <section className="border-b border-line">
      <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
        <h2 className="font-display text-3xl text-paper text-balance sm:text-4xl">{t.title}</h2>
        <p className="mt-4 text-bone">{t.body}</p>

        <div className="mt-10">
          <QualificationForm />
        </div>
      </div>
    </section>
  )
}
