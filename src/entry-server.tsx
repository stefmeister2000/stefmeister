/* eslint-disable react/only-export-components -- Build-only entry; never used by Fast Refresh. */
import { renderToString } from 'react-dom/server'
import App from './App'
import { LanguageProvider } from './i18n/LanguageContext'
import { services } from './data/services'
import { cases } from './data/cases'
export { SITE_URL } from './lib/site'
export const routes = ['/', '/cases', '/agency', '/contact', '/funnel-audit', ...services.map(s => `/${s.slug}`), ...cases.map(c => `/cases/${c.slug}`)]
export function render(location: string) {
  return renderToString(<LanguageProvider><App location={location} /></LanguageProvider>)
}
