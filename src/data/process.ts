import type { Bi, ProcessStep } from './types'

export const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: { nl: 'Analyse', en: 'Analysis' },
    description: {
      nl: 'Ik bekijk de website, campagnes, data en huidige klantreis.',
      en: 'I look at the website, campaigns, data and current customer journey.',
    },
  },
  {
    number: '02',
    title: { nl: 'Prioriteiten', en: 'Priorities' },
    description: {
      nl: 'We bepalen waar de grootste commerciële lekken zitten.',
      en: 'We determine where the biggest commercial leaks are.',
    },
  },
  {
    number: '03',
    title: { nl: 'Funnel design', en: 'Funnel design' },
    description: {
      nl: 'Ik ontwerp de pagina’s, campagnes, tracking en opvolging als één geheel.',
      en: 'I design the pages, campaigns, tracking and follow-up as one system.',
    },
  },
  {
    number: '04',
    title: { nl: 'Implementatie', en: 'Implementation' },
    description: {
      nl: 'De landingspagina’s, advertenties en automatiseringen worden gebouwd en gekoppeld.',
      en: 'The landing pages, ads and automations are built and connected.',
    },
  },
  {
    number: '05',
    title: { nl: 'Optimalisatie', en: 'Optimisation' },
    description: {
      nl: 'We meten gedrag, leads, boekingen, verkopen en omzet en verbeteren op basis van data.',
      en: 'We measure behaviour, leads, bookings, sales and revenue, and improve based on data.',
    },
  },
]

export const workModes: Bi<string[]> = {
  nl: [
    'Projectmatig',
    'Als doorlopende groeipartner',
    'Samen met interne teams',
    'Samen met externe developers, designers en specialisten',
  ],
  en: [
    'Project-based',
    'As an ongoing growth partner',
    'Together with internal teams',
    'Together with external developers, designers and specialists',
  ],
}
