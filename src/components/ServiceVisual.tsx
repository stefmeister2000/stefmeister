import { useLang } from '../i18n/LanguageContext'

import type { VisualService } from '../data/visualServices'

export default function ServiceVisual({ service }: { service: VisualService }) {
  const { lang } = useLang()
  const nl = lang === 'nl'
  return <div className={`service-visual visual-${service}`} aria-hidden="true">
    <span className="visual-caption">{nl ? 'Zo werkt het' : 'How it works'}</span>
    {service === 'google-ads' && <div className="search-concept">
      <div className="concept-search"><span>⌕</span><span>{nl ? 'De oplossing die ik zoek…' : 'The solution I need…'}</span></div>
      <div className="concept-search-result"><small>{nl ? 'Advertentie · Jouw bedrijf' : 'Ad · Your business'}</small><strong>{nl ? 'Gevonden op het juiste moment.' : 'Found at the right moment.'}</strong><div className="concept-lines"><i /><i /></div><span className="concept-pill">{nl ? 'Van zoekopdracht naar aanvraag' : 'From search to enquiry'} ↗</span></div>
    </div>}
    {service === 'meta-ads' && <div className="social-concept">
      <div className="concept-creative creative-back"><span>02 / TEST</span><div className="creative-orbit" /></div>
      <div className="concept-creative creative-front"><span>01 / CREATIVE</span><strong>{nl ? 'Een aanbod\ndat blijft hangen.' : 'An offer\nthey remember.'}</strong><span className="concept-pill">{nl ? 'Ontdek je merk' : 'Discover your brand'} ↗</span></div>
      <div className="concept-tag">{nl ? 'Testen → leren → verbeteren' : 'Test → learn → improve'}</div>
    </div>}
    {service === 'data-analytics' && <div className="analytics-concept">
      <div className="data-sources"><span>Ads</span><span>Website</span><span>CRM</span></div>
      <div className="data-connector">↓</div><div className="concept-dashboard"><strong>{nl ? 'Eén helder overzicht' : 'One clear overview'}</strong><div className="dashboard-metrics"><span>{nl ? 'Kosten' : 'Cost'}</span><span>{nl ? 'Aanvragen' : 'Enquiries'}</span><span>{nl ? 'Omzet' : 'Revenue'}</span></div><div className="data-decision">↗ {nl ? 'Van inzicht naar actie' : 'From insight to action'}</div></div>
    </div>}
    {service === 'email-marketing' && <div className="email-concept">
      <div className="email-event">✦ {nl ? 'Nieuwe inschrijving' : 'New subscriber'}</div><span className="flow-line" /><div className="concept-mail"><span className="mail-icon">✉</span><div><small>{nl ? 'WELKOMSTFLOW' : 'WELCOME FLOW'}</small><strong>{nl ? 'Fijn dat je er bent.' : 'Good to have you here.'}</strong></div><span>↗</span></div><span className="flow-line" /><div className="email-branches"><span>{nl ? 'Vertrouwen opbouwen' : 'Build trust'}</span><span>{nl ? 'Opnieuw kopen' : 'Buy again'}</span></div>
    </div>}
  </div>
}
