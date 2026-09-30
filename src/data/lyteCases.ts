import type { Bi } from './types'
export interface LyteCase {
  name: string
  category: string
  url: string
  description: Bi<string>
}
export const lyteCases: LyteCase[] = [
  {
    name: 'Jobr',
    category: 'Mobile app',
    url: 'https://lytestudios.be/projects/jobr/',
    description: {
      nl: 'Een mobiele app die kandidaten en werkgevers verbindt via matching, sollicitaties en chat.',
      en: 'A mobile app connecting candidates and employers through matching, applications and chat.',
    },
  },
  {
    name: 'WERKR',
    category: 'Software platform',
    url: 'https://lytestudios.be/projects/werkr/',
    description: {
      nl: 'Software voor de planning en uitvoering van opdrachten door flexibele medewerkers.',
      en: 'Software for scheduling and delivering assignments with a flexible workforce.',
    },
  },
  {
    name: 'Tinrate',
    category: 'Incubator',
    url: 'https://lytestudios.be/projects/tinrate/',
    description: {
      nl: 'Een platform om betaalde gesprekken met experts te boeken, mee uitgebouwd door LYTE.',
      en: 'A platform for booking paid expert conversations, co-developed by LYTE.',
    },
  },
  {
    name: 'EONLOG',
    category: 'Website',
    url: 'https://lytestudios.be/projects/eonlog-website/',
    description: {
      nl: 'Een website die de investeringsaanpak van een family office uitlegt.',
      en: 'A website explaining the investment approach of a family office.',
    },
  },
  {
    name: 'Tinrate',
    category: 'Website',
    url: 'https://lytestudios.be/projects/tinrate-website/',
    description: {
      nl: 'De website die bezoekers helpt experts te ontdekken en een gesprek te boeken.',
      en: 'A website helping visitors discover experts and book a conversation.',
    },
  },
  {
    name: 'Jobr',
    category: 'Website',
    url: 'https://lytestudios.be/projects/jobr-website/',
    description: {
      nl: 'Een marketingwebsite gericht op app-downloads en nieuwe werkgevers.',
      en: 'A marketing website focused on app downloads and employer sign-ups.',
    },
  },
  {
    name: 'Fixie',
    category: 'Mobile app',
    url: 'https://lytestudios.be/projects/fixie/',
    description: {
      nl: 'De eigen app van LYTE voor persoonlijke doelen en voortgang.',
      en: 'LYTE’s own app for personal goals and progress.',
    },
  },
  {
    name: 'Fixie',
    category: 'Website',
    url: 'https://lytestudios.be/projects/fixie-website/',
    description: {
      nl: 'Een compacte website die de app introduceert en naar downloads leidt.',
      en: 'A compact website introducing the app and driving downloads.',
    },
  },
]
