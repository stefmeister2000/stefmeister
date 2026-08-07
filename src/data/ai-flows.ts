import type { AIFlow } from './types'

export const aiFlows: AIFlow[] = [
  {
    title: { nl: 'Website lead', en: 'Website lead' },
    steps: {
      nl: [
        'Formulier ingevuld',
        'AI vat bedrijf en aanvraag samen',
        'Lead wordt gescoord',
        'CRM wordt bijgewerkt',
        'Persoonlijke opvolging wordt voorbereid',
        'Verantwoordelijke wordt verwittigd',
      ],
      en: [
        'Form submitted',
        'AI summarises company and request',
        'Lead is scored',
        'CRM is updated',
        'Personalised follow-up is prepared',
        'Responsible person is notified',
      ],
    },
  },
  {
    title: { nl: 'Campagne-rapportage', en: 'Campaign reporting' },
    steps: {
      nl: ['Advertentie- en websitedata', 'Automatische samenvatting', 'Belangrijkste knelpunten gedetecteerd', 'Vervolgacties voorbereid'],
      en: ['Advertising and website data', 'Automatic summary', 'Key problems detected', 'Next actions prepared'],
    },
  },
  {
    title: { nl: 'Contentworkflow', en: 'Content workflow' },
    steps: {
      nl: ['Campagne-idee', 'Gestructureerde brief', 'Copy-varianten', 'Goedkeuring', 'Publicatie voorbereid'],
      en: ['Campaign idea', 'Structured brief', 'Copy variations', 'Approval', 'Publication prepared'],
    },
  },
  {
    title: { nl: 'Klantopvolging', en: 'Customer follow-up' },
    steps: {
      nl: ['Boeking of aankoop', 'Persoonlijke e-mail', 'Herinnering', 'Upsell- of herhaalbezoek-bericht'],
      en: ['Booking or purchase', 'Personalised email', 'Reminder', 'Upsell or repeat-visit message'],
    },
  },
]
