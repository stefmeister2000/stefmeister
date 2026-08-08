import type { Bi } from './types'

export type TierKey = 'foundation' | 'partner' | 'department'

export interface PricingTier {
  key: TierKey
  name: Bi<string>
  price: Bi<string>
  audience: Bi<string>
  highlights: Bi<string[]>
}

export interface AddOn {
  key: string
  name: Bi<string>
  price?: Bi<string>
  description: Bi<string>
}

export const addOns: AddOn[] = [
  {
    key: 'strategic-consulting',
    name: { nl: 'Strategisch gesprek', en: 'Strategy session' },
    price: { nl: '€250 / uur', en: '€250 / hour' },
    description: {
      nl: 'Een gericht sparringgesprek over jullie groei — kom eerst leren, beslis daarna pas over samenwerking.',
      en: 'A focused sparring session about your growth — come to learn first, decide on working together later.',
    },
  },
  {
    key: 'learning-track',
    name: { nl: 'Leertraject', en: 'Learning track' },
    description: {
      nl: 'Een begeleidingstraject waarin je zelf leert hoe je jullie digitale groei aanpakt en uitvoert — opzet en invulling bespreken we samen.',
      en: 'A guided track where you learn to run and execute your own digital growth — scope and setup we discuss together.',
    },
  },
]

export const pricingTiers: PricingTier[] = [
  {
    key: 'foundation',
    name: { nl: 'Growth Foundation', en: 'Growth Foundation' },
    price: { nl: '€1.500 / maand', en: '€1,500 / month' },
    audience: {
      nl: 'Bedrijven die hun marketingbasis willen professionaliseren',
      en: 'Companies that want to professionalise their marketing foundation',
    },
    highlights: {
      nl: [
        'Strategie',
        'Meta- en Google Ads-beheer',
        'Tracking',
        'Maandelijkse rapportage',
        'CRO-advies',
        'Content- en ad-direction',
      ],
      en: [
        'Strategy',
        'Meta and Google Ads management',
        'Tracking',
        'Monthly reporting',
        'CRO advice',
        'Content and ad direction',
      ],
    },
  },
  {
    key: 'partner',
    name: { nl: 'Growth Partner', en: 'Growth Partner' },
    price: { nl: '€2.500 / maand', en: '€2,500 / month' },
    audience: {
      nl: 'Scale-ups die een externe growth-afdeling willen',
      en: 'Scale-ups that want an external growth department',
    },
    highlights: {
      nl: [
        'Alles uit Foundation',
        'Landingspagina’s',
        'E-mailflows',
        'Automatisering',
        'Retargeting',
        'Dashboards',
        'Creative testing',
        'SEO / lokale SEO',
        'Wekelijkse opvolging',
      ],
      en: [
        'Everything in Foundation',
        'Landing pages',
        'Email flows',
        'Automation',
        'Retargeting',
        'Dashboards',
        'Creative testing',
        'SEO / local SEO',
        'Weekly follow-up',
      ],
    },
  },
  {
    key: 'department',
    name: { nl: 'Growth Department', en: 'Growth Department' },
    price: { nl: 'Vanaf €4.000 / maand', en: 'From €4,000 / month' },
    audience: {
      nl: 'Bedrijven waar je quasi volledig growth-ownership neemt',
      en: 'Companies where you take on near-full growth ownership',
    },
    highlights: {
      nl: [
        'Alles uit Partner',
        'Meerdere campagnes en funnels',
        'Actieve CRO',
        'Strategische planning',
        'Sales-funnel optimalisatie',
        'CRM- en AI-automatisering',
        'Organische strategie',
        'Maandelijkse management-workshop',
        'Priority support',
      ],
      en: [
        'Everything in Partner',
        'Multiple campaigns and funnels',
        'Active CRO',
        'Strategic planning',
        'Sales-funnel optimisation',
        'CRM and AI automation',
        'Organic strategy',
        'Monthly management workshop',
        'Priority support',
      ],
    },
  },
]

type Cell = { type: 'check' } | { type: 'dash' } | { type: 'text'; label: Bi<string> }

export interface FeatureRow {
  label: Bi<string>
  values: [Cell, Cell, Cell]
}

const check: Cell = { type: 'check' }
const dash: Cell = { type: 'dash' }
const text = (nl: string, en: string): Cell => ({ type: 'text', label: { nl, en } })

export const featureRows: FeatureRow[] = [
  { label: { nl: 'Growth-strategie', en: 'Growth strategy' }, values: [check, check, check] },
  { label: { nl: 'Meta Ads-beheer', en: 'Meta Ads management' }, values: [check, check, check] },
  { label: { nl: 'Google Ads-beheer', en: 'Google Ads management' }, values: [check, check, check] },
  { label: { nl: 'Tracking & analytics', en: 'Tracking & analytics' }, values: [check, check, check] },
  { label: { nl: 'Maandelijkse rapportage', en: 'Monthly reporting' }, values: [check, check, check] },
  { label: { nl: 'Creative / ad direction', en: 'Creative / ad direction' }, values: [check, check, check] },
  {
    label: { nl: 'Landingspagina- en CRO-advies', en: 'Landing page & CRO advice' },
    values: [check, check, check],
  },
  {
    label: { nl: 'Landingspagina-implementatie', en: 'Landing page implementation' },
    values: [dash, check, check],
  },
  { label: { nl: 'E-mailmarketingstrategie', en: 'Email marketing strategy' }, values: [dash, check, check] },
  { label: { nl: 'E-mailflows & automatisering', en: 'Email flows & automation' }, values: [dash, check, check] },
  {
    label: { nl: 'Retargeting-funnels', en: 'Retargeting funnels' },
    values: [text('Basis', 'Basic'), check, check],
  },
  {
    label: { nl: 'Website-optimalisatie', en: 'Website optimisation' },
    values: [
      text('Advies', 'Advice'),
      text('Regelmatige optimalisatie', 'Regular optimisation'),
      text('Continue optimalisatie', 'Continuous optimisation'),
    ],
  },
  {
    label: { nl: 'Organische socialstrategie', en: 'Organic social strategy' },
    values: [dash, text('Basis', 'Basic'), check],
  },
  {
    label: { nl: 'Contentplanning', en: 'Content planning' },
    values: [dash, text('Richting', 'Direction'), text('Actieve planning', 'Active planning')],
  },
  {
    label: { nl: 'CRM-optimalisatie', en: 'CRM optimisation' },
    values: [dash, text('Basis', 'Basic'), text('Geavanceerd', 'Advanced')],
  },
  {
    label: { nl: 'Sales-funnel optimalisatie', en: 'Sales funnel optimisation' },
    values: [text('Advies', 'Advice'), check, check],
  },
  {
    label: { nl: 'Nieuwe campagnes & aanbiedingen', en: 'New campaigns & offers' },
    values: [text('Beperkt', 'Limited'), check, text('Continu', 'Continuous')],
  },
  { label: { nl: 'Wekelijks growth-overleg', en: 'Weekly growth meeting' }, values: [dash, check, check] },
  {
    label: { nl: 'Management- en strategisch advies', en: 'Management / strategic consulting' },
    values: [dash, text('Beperkt', 'Limited'), check],
  },
  { label: { nl: 'Priority support', en: 'Priority support' }, values: [dash, dash, check] },
  {
    label: { nl: 'Meerdere funnels / campagnes', en: 'Multiple funnels / campaigns' },
    values: [text('Beperkt', 'Limited'), text('Gemiddeld', 'Moderate'), text('Hoge capaciteit', 'High capacity')],
  },
  {
    label: { nl: 'Extern advies buiten scope', en: 'External consulting outside scope' },
    values: [text('€250/uur', '€250/hour'), text('€250/uur', '€250/hour'), text('€250/uur', '€250/hour')],
  },
]
