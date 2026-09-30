import { Link } from 'react-router-dom'
import { useLang } from '../i18n/LanguageContext'

const goals = [
  { nl: ['Meer geschikte aanvragen', 'Je sales-team heeft gesprekken nodig met mensen die echt passen. We verbinden Google Ads, overtuigende pagina’s en opvolging.', 'Google Ads & leadgeneratie'], en: ['More qualified enquiries', 'Your sales team needs conversations with the right people. We connect Google Ads, persuasive pages and follow-up.', 'Google Ads & lead generation'], href: '/google-ads' },
  { nl: ['Meer verkoop uit je webshop', 'Maak van bezoekers klanten. We combineren Meta Ads, een sterk aanbod en een soepel aankoopproces.', 'Ecommerce & conversie'], en: ['More sales from your store', 'Turn visitors into customers. We combine Meta Ads, a strong offer and a smooth purchase journey.', 'Ecommerce & conversion'], href: '/ecommerce-conversie' },
  { nl: ['Weten wat je budget oplevert', 'Welke campagne brengt klanten? Waar haken bezoekers af? Met tracking en analyse zie je wat je moet verbeteren.', 'Data & analytics'], en: ['Know what your budget delivers', 'Which campaign brings customers? Where do visitors drop off? Tracking and analysis show what needs improving.', 'Data & analytics'], href: '/data-analytics' },
]
export default function GrowthGoals() {
  const { lang } = useLang()
  return (
    <section className="growth-goals" aria-labelledby="growth-goals-title">
      <p className="eyebrow">{lang === 'nl' ? 'Jouw bedrijf. Jouw volgende stap.' : 'Your business. Your next step.'}</p>
      <h2 id="growth-goals-title">{lang === 'nl' ? 'Wat wil jij zien groeien?' : 'What do you want to grow?'}</h2>
      <div className="growth-goals-grid">
        {goals.map((goal, i) => <Link to={goal.href} key={goal.href} className="growth-goal">
          <span className="goal-number">0{i + 1}</span>
          <h3>{goal[lang][0]}</h3><p>{goal[lang][1]}</p><span className="goal-link">{goal[lang][2]} ↗</span>
        </Link>)}
      </div>
    </section>
  )
}
