import { Link } from 'react-router-dom'
import { useLang } from '../i18n/LanguageContext'
import pinacello from '../assets/cases/pinacello.png'

export default function RevenueGrowth() {
  const { lang } = useLang()
  const nl = lang === 'nl'
  return (
    <section className="revenue-case" id="resultaten">
      <div className="revenue-copy">
        <p className="eyebrow">
          {nl ? 'Resultaat in de praktijk' : 'Results in practice'}
        </p>
        <h2>
          {nl ? 'Mooi is het begin.' : 'Great design is the start.'}
          <br />
          <span>{nl ? 'Groei is het doel.' : 'Growth is the goal.'}</span>
        </h2>
        <p>
          {nl
            ? 'We verbinden je aanbod, advertenties en webshop. Zodat aandacht een duidelijke route krijgt naar een aankoop — en we kunnen verbeteren op wat er echt verkoopt.'
            : 'We connect your offer, ads and online store. So attention has a clear path to purchase — and we can optimise for what actually sells.'}
        </p>
        <Link to="/cases/pinacello" className="button-dark">
          {nl ? 'Bekijk Pinacello' : 'Explore Pinacello'} ↗
        </Link>
      </div>
      <Link to="/cases/pinacello" className="revenue-proof">
        <img src={pinacello} alt="Pinacello webshop" loading="lazy" />
        <div className="revenue-stat">
          <span className="proof-label">PINACELLO / ECOMMERCE</span>
          <strong>
            +120<span>%</span>
          </strong>
          <p>
            {nl ? 'online omzetgroei' : 'online revenue growth'}{' '}
            <span aria-hidden="true">↗</span>
          </p>
        </div>
      </Link>
      <div className="revenue-principles">
        {(nl
          ? [
              [
                '01',
                'Meer relevante kopers',
                'Een scherp aanbod voor de juiste doelgroep.',
              ],
              [
                '02',
                'Meer conversie',
                'Ads en landingspagina’s die elkaar versterken.',
              ],
              [
                '03',
                'Zicht op rendement',
                'Sturen op omzet, acquisitiekosten en marge.',
              ],
            ]
          : [
              [
                '01',
                'More relevant buyers',
                'A clear offer for the right audience.',
              ],
              [
                '02',
                'More conversions',
                'Ads and landing pages that work together.',
              ],
              [
                '03',
                'A view of profitability',
                'Revenue, acquisition cost and margin guide decisions.',
              ],
            ]
        ).map(([n, title, body]) => (
          <div key={n}>
            <span>{n}</span>
            <h3>{title}</h3>
            <p>{body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
