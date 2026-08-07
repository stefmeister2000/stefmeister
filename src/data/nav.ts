import type { Bi } from './types'

export interface NavItem {
  label: Bi<string>
  href: string
}

export const navItems: NavItem[] = [
  { label: { nl: 'Aanpak', en: 'Approach' }, href: '/#aanpak' },
  { label: { nl: 'Diensten', en: 'Services' }, href: '/#diensten' },
  { label: { nl: 'Cases', en: 'Cases' }, href: '/cases' },
  { label: { nl: 'Landing pages', en: 'Landing pages' }, href: '/#landing-pages' },
  { label: { nl: 'Over mij', en: 'About me' }, href: '/over-stef' },
  { label: { nl: 'Contact', en: 'Contact' }, href: '/contact' },
]

export const persistentCta: Bi<string> = { nl: 'Funnel-audit', en: 'Funnel audit' }
export const persistentCtaHref = '/funnel-audit'
