import { Link } from 'react-router-dom'
import { useLang } from '../i18n/LanguageContext'
export default function PersonalHero() {
  const { lang } = useLang()
  const nl = lang === 'nl'
  return (
    <section className="studio-hero">
      <div className="hero-copy">
        <p className="eyebrow">Sales & revenue growth</p>
        <h1>
          {nl ? 'Meer klanten.' : 'More customers.'}
          <br />
          {nl ? 'Meer online sales.' : 'More online sales.'}
          <br />
          <span>{nl ? 'Meer omzet.' : 'More revenue.'}</span>
        </h1>
        <p className="hero-description">
          {nl
            ? 'Meta Ads, Google Ads en websites die samenwerken aan één doel: meer omzet. We verbinden sterke creatives met conversie, tracking en slimme opvolging.'
            : 'Meta Ads, Google Ads and websites working towards one goal: more revenue. We connect compelling creatives with conversion, tracking and smart follow-up.'}
        </p>
        <div className="hero-actions">
          <Link className="button-dark" to="/contact">
            {nl ? 'Bespreek je groei' : 'Discuss your growth'} <span>↗</span>
          </Link>
          <Link className="button-light" to="/#resultaten">
            {nl ? 'Bekijk resultaten' : 'See results'}{' '}
            <span className="button-play">↗</span>
          </Link>
        </div>
        <div className="hero-disciplines">
          {['Meta Ads', 'Google Ads', 'Conversion', 'Revenue'].map(
            (item, i) => (
              <div key={item}>
                <span>0{i + 1}</span>
                <strong>{item}</strong>
              </div>
            ),
          )}
        </div>
      </div>
      <div className="hero-art">
        <img src="/agency-glass.png" alt="" fetchPriority="high" />
        <div className="glass-caption" aria-hidden="true">
          Better ads.
          <br />
          More sales.
          <br />
          Real growth.<span>↗</span>
        </div>
        <Link to="/cases/pinacello" className="floating-strategy">
          <div>
            <span>+120%</span>
            <span className="strategy-icon">✳</span>
          </div>
          <strong>Pinacello</strong>
          <p>
            {nl
              ? 'Groei in online omzet. Van aandacht naar aankoop.'
              : 'Growth in online revenue. From attention to purchase.'}
          </p>
          <span className="strategy-link">
            {nl ? 'Bekijk de case' : 'Explore the case'} ↗
          </span>
        </Link>
      </div>
    </section>
  )
}
