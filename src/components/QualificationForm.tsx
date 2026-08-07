import { useEffect, useRef, useState, type FormEvent } from 'react'
import { captureAttribution, trackEvent } from '../lib/analytics'
import { useInView } from '../lib/useInView'
import { useLang } from '../i18n/LanguageContext'

const COPY = {
  nl: {
    goals: [
      'Meer B2B-leads',
      'Meer online boekingen',
      'Meer ecommerce-omzet',
      'Betere landingspagina’s',
      'Betere advertenties',
      'Betere tracking',
      'AI-automatiseringen',
      'Volledige funnel herwerken',
    ],
    labels: {
      naam: 'Naam',
      bedrijf: 'Bedrijf',
      email: 'Zakelijk e-mailadres',
      website: 'Website',
      doel: 'Belangrijkste doel',
      doelPlaceholder: 'Kies een doel',
      uitdaging: 'Grootste uitdaging',
      investering: 'Maandelijkse marketinginvestering',
      kanalen: 'Huidige kanalen',
      timing: 'Gewenste timing',
      extra: 'Extra informatie',
    },
    errors: {
      naam: 'Vul je naam in.',
      bedrijf: 'Vul je bedrijfsnaam in.',
      email: 'Vul een geldig zakelijk e-mailadres in.',
      website: 'Vul je website in.',
      doel: 'Kies je belangrijkste doel.',
      uitdaging: 'Beschrijf kort je grootste uitdaging.',
    },
    optioneel: 'Optioneel',
    addOptional: '+ Extra info toevoegen (optioneel)',
    submitting: 'Even geduld…',
    submit: 'Vraag mijn analyse aan',
    doneTitle: 'Bedankt.',
    doneBody:
      'Ik bekijk jullie website en commerciële klantreis persoonlijk en neem contact op met de beste volgende stap.',
  },
  en: {
    goals: [
      'More B2B leads',
      'More online bookings',
      'More ecommerce revenue',
      'Better landing pages',
      'Better ads',
      'Better tracking',
      'AI automations',
      'Rework the full funnel',
    ],
    labels: {
      naam: 'Name',
      bedrijf: 'Company',
      email: 'Business email',
      website: 'Website',
      doel: 'Main goal',
      doelPlaceholder: 'Choose a goal',
      uitdaging: 'Biggest challenge',
      investering: 'Monthly marketing budget',
      kanalen: 'Current channels',
      timing: 'Desired timing',
      extra: 'Additional information',
    },
    errors: {
      naam: 'Please enter your name.',
      bedrijf: 'Please enter your company name.',
      email: 'Please enter a valid business email address.',
      website: 'Please enter your website.',
      doel: 'Please choose your main goal.',
      uitdaging: 'Briefly describe your biggest challenge.',
    },
    optioneel: 'Optional',
    addOptional: '+ Add more info (optional)',
    submitting: 'One moment…',
    submit: 'Request my analysis',
    doneTitle: 'Thank you.',
    doneBody: 'I’ll personally review your website and commercial customer journey and reach out with the best next step.',
  },
}

interface FormState {
  naam: string
  bedrijf: string
  email: string
  website: string
  doel: string
  uitdaging: string
  investering: string
  kanalen: string
  timing: string
  extra: string
}

const initialState: FormState = {
  naam: '',
  bedrijf: '',
  email: '',
  website: '',
  doel: '',
  uitdaging: '',
  investering: '',
  kanalen: '',
  timing: '',
  extra: '',
}

interface QualificationFormProps {
  id?: string
  compact?: boolean
}

export default function QualificationForm({ id = 'audit-formulier', compact = false }: QualificationFormProps) {
  const { lang } = useLang()
  const t = COPY[lang]
  const [values, setValues] = useState<FormState>(initialState)
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})
  const [status, setStatus] = useState<'idle' | 'submitting' | 'done'>('idle')
  const [showOptional, setShowOptional] = useState(false)
  const startedRef = useRef(false)
  const abandonedRef = useRef(false)

  const { ref } = useInView<HTMLDivElement>(() => trackEvent('form_viewed', { form_id: id }))

  useEffect(() => {
    const handleLeave = () => {
      if (startedRef.current && status !== 'done' && !abandonedRef.current) {
        abandonedRef.current = true
        trackEvent('form_abandoned', { form_id: id })
      }
    }
    window.addEventListener('beforeunload', handleLeave)
    return () => window.removeEventListener('beforeunload', handleLeave)
  }, [id, status])

  function update<K extends keyof FormState>(key: K, value: string) {
    if (!startedRef.current) {
      startedRef.current = true
      trackEvent('form_started', { form_id: id })
    }
    setValues((prev) => ({ ...prev, [key]: value }))
  }

  function validate(): boolean {
    const next: Partial<Record<keyof FormState, string>> = {}
    if (!values.naam.trim()) next.naam = t.errors.naam
    if (!values.bedrijf.trim()) next.bedrijf = t.errors.bedrijf
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = t.errors.email
    if (!values.website.trim()) next.website = t.errors.website
    if (!values.doel) next.doel = t.errors.doel
    if (!values.uitdaging.trim()) next.uitdaging = t.errors.uitdaging
    setErrors(next)
    return Object.keys(next).length === 0
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (!validate()) return

    setStatus('submitting')
    const attribution = captureAttribution()

    // No CRM/backend endpoint is confirmed yet — this simulates submission
    // so the flow is demonstrable. Wire this to the real intake endpoint
    // (CRM / email automation) before launch.
    window.setTimeout(() => {
      trackEvent('form_submitted', { form_id: id, doel: values.doel, ...attribution })
      setStatus('done')
    }, 600)
  }

  if (status === 'done') {
    return (
      <div ref={ref} className="rounded-2xl border border-line bg-surface p-8 text-center reveal sm:p-12">
        <p className="font-display text-2xl text-paper text-balance">{t.doneTitle}</p>
        <p className="mx-auto mt-3 max-w-md text-bone">{t.doneBody}</p>
      </div>
    )
  }

  return (
    <div ref={ref} id={id} className="rounded-2xl border border-line bg-surface p-6 reveal sm:p-10">
      <form onSubmit={handleSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
        <Field label={t.labels.naam} error={errors.naam} htmlFor="naam">
          <input
            id="naam"
            autoComplete="name"
            className="input"
            value={values.naam}
            onChange={(e) => update('naam', e.target.value)}
          />
        </Field>
        <Field label={t.labels.bedrijf} error={errors.bedrijf} htmlFor="bedrijf">
          <input
            id="bedrijf"
            autoComplete="organization"
            className="input"
            value={values.bedrijf}
            onChange={(e) => update('bedrijf', e.target.value)}
          />
        </Field>
        <Field label={t.labels.email} error={errors.email} htmlFor="email">
          <input
            id="email"
            type="email"
            autoComplete="email"
            className="input"
            value={values.email}
            onChange={(e) => update('email', e.target.value)}
          />
        </Field>
        <Field label={t.labels.website} error={errors.website} htmlFor="website">
          <input
            id="website"
            placeholder="https://"
            className="input"
            value={values.website}
            onChange={(e) => update('website', e.target.value)}
          />
        </Field>
        <Field label={t.labels.doel} error={errors.doel} htmlFor="doel" full>
          <select id="doel" className="input" value={values.doel} onChange={(e) => update('doel', e.target.value)}>
            <option value="">{t.labels.doelPlaceholder}</option>
            {t.goals.map((goal) => (
              <option key={goal} value={goal}>
                {goal}
              </option>
            ))}
          </select>
        </Field>
        <Field label={t.labels.uitdaging} error={errors.uitdaging} htmlFor="uitdaging" full>
          <textarea
            id="uitdaging"
            rows={3}
            className="input resize-none"
            value={values.uitdaging}
            onChange={(e) => update('uitdaging', e.target.value)}
          />
        </Field>

        {!compact && !showOptional && (
          <div className="sm:col-span-2">
            <button
              type="button"
              onClick={() => setShowOptional(true)}
              className="text-sm font-medium text-accent-2 hover:text-accent"
            >
              {t.addOptional}
            </button>
          </div>
        )}

        {!compact && showOptional && (
          <>
            <div className="sm:col-span-2 pt-2 text-xs uppercase tracking-widest text-mute">{t.optioneel}</div>
            <Field label={t.labels.investering} htmlFor="investering">
              <input
                id="investering"
                className="input"
                value={values.investering}
                onChange={(e) => update('investering', e.target.value)}
              />
            </Field>
            <Field label={t.labels.kanalen} htmlFor="kanalen">
              <input
                id="kanalen"
                className="input"
                value={values.kanalen}
                onChange={(e) => update('kanalen', e.target.value)}
              />
            </Field>
            <Field label={t.labels.timing} htmlFor="timing">
              <input
                id="timing"
                className="input"
                value={values.timing}
                onChange={(e) => update('timing', e.target.value)}
              />
            </Field>
            <Field label={t.labels.extra} htmlFor="extra">
              <input
                id="extra"
                className="input"
                value={values.extra}
                onChange={(e) => update('extra', e.target.value)}
              />
            </Field>
          </>
        )}

        <div className="sm:col-span-2 pt-2">
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full rounded-full bg-accent px-8 py-4 text-center font-semibold text-accent-ink transition hover:bg-accent-2 disabled:opacity-60 sm:w-auto"
          >
            {status === 'submitting' ? t.submitting : t.submit}
          </button>
        </div>
      </form>
    </div>
  )
}

function Field({
  label,
  htmlFor,
  error,
  full,
  children,
}: {
  label: string
  htmlFor: string
  error?: string
  full?: boolean
  children: React.ReactNode
}) {
  return (
    <div className={full ? 'sm:col-span-2' : undefined}>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm text-bone">
        {label}
      </label>
      {children}
      {error && <p className="mt-1 text-sm text-accent-2">{error}</p>}
    </div>
  )
}
