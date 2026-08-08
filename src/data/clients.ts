import type { Client } from './types'
import pinacello from '../assets/cases/pinacello.png'
import healthfactor from '../assets/cases/healthfactor.png'
import nooms from '../assets/cases/nooms.png'
import olearys from '../assets/cases/olearys.png'

export const clients: Client[] = [
  {
    name: 'Pinacello',
    image: pinacello,
    description: {
      nl: 'Ik werk aan de ecommerce en digitale groeikant van Pinacello, waaronder campagnes, landingspagina’s, conversie en online verkoop.',
      en: 'I work on the ecommerce and digital growth side of Pinacello, including campaigns, landing pages, conversion and online sales.',
    },
  },
  {
    name: 'HealthFactor',
    image: healthfactor,
    description: {
      nl: 'Ik hielp HealthFactor met digitale promotie, landingspagina’s en lokale leadgeneratie.',
      en: 'I helped HealthFactor with digital promotion, landing pages and local lead generation.',
    },
  },
  {
    name: 'Nooms',
    image: nooms,
    description: {
      nl: 'Nooms is mijn eigen bedrijf. Ik bouw het zelf op, met focus op ecommerce, funnels, branding, verkoop en digitale groei.',
      en: 'Nooms is my own company. I’m building it myself, focused on ecommerce, funnels, branding, sales and digital growth.',
    },
  },
  {
    name: "O'Learys",
    image: olearys,
    description: {
      nl: 'Ik werk aan de online digitale kant van O’Learys, waaronder B2C- en B2B-landingspagina’s, funnels, campagnes, tracking en conversie.',
      en: 'I work on the digital side of O’Learys, including B2C and B2B landing pages, funnels, campaigns, tracking and conversion.',
    },
  },
]
