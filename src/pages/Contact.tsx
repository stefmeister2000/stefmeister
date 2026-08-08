import Seo from '../components/Seo'
import QualificationForm from '../components/QualificationForm'
import { trackEvent } from '../lib/analytics'
import { useLang } from '../i18n/LanguageContext'

const COPY = {
  nl: {
    seoTitle: 'Contact',
    seoDescription: 'Vraag een persoonlijke groeianalyse aan of plan een groeigesprek met Stef Keppens.',
    title: 'Vertel kort waar jullie vandaag staan',
    body: 'Zeven velden, twee minuten. Op basis daarvan bekijk ik of en hoe ik het beste kan helpen.',
    meeting: 'Plan een groeigesprek',
    meetingTooltip: 'Agenda-koppeling volgt — vul ondertussen het formulier in.',
  },
  en: {
    seoTitle: 'Contact',
    seoDescription: 'Request a personal growth analysis or schedule a growth call with Stef Keppens.',
    title: 'Tell me briefly where you stand today',
    body: 'Seven fields, two minutes. Based on that I’ll see if and how I can best help.',
    meeting: 'Schedule a growth call',
    meetingTooltip: 'Calendar link coming soon — fill in the form below in the meantime.',
  },
}

export default function Contact() {
  const { lang } = useLang()
  const t = COPY[lang]

  return (
    <div>
      <Seo title={t.seoTitle} description={t.seoDescription} path="/contact" />

      <section className="border-b border-line">
        <div className="reveal mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
          <h1 className="font-display text-4xl text-paper text-balance sm:text-5xl">{t.title}</h1>
          <p className="mt-5 text-lg text-bone">{t.body}</p>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <a href="mailto:stefkeppens@gmail.com" className="text-sm text-accent-2 hover:text-accent">
              stefkeppens@gmail.com
            </a>
            <span className="text-line">·</span>
            <button
              type="button"
              onClick={() => trackEvent('calendar_opened', { placement: 'contact_page' })}
              className="rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-paper transition hover:border-accent"
              title={t.meetingTooltip}
            >
              {t.meeting}
            </button>
          </div>

          <div className="mt-10">
            <QualificationForm id="audit-formulier-contact" />
          </div>
        </div>
      </section>
    </div>
  )
}
