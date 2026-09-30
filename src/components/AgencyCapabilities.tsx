import { Link } from 'react-router-dom'
import { useLang } from '../i18n/LanguageContext'
const items = [
  {
    n: '01',
    title: ['Strategie & merk', 'Strategy & brand'],
    text: [
      'Een helder aanbod, een herkenbaar verhaal en een plan dat vertrekt vanuit je bedrijfsdoelen.',
      'A clear offer, a distinct story and a plan grounded in your business goals.',
    ],
    tags: 'Positioning · Brand direction · Roadmap',
    href: '/distributie',
  },
  {
    n: '02',
    title: ['Websites & ecommerce', 'Websites & ecommerce'],
    text: [
      'Van een eerste indruk tot een aankoop: digitale ervaringen waarin design en conversie samenwerken.',
      'From first impression to purchase: digital experiences that bring design and conversion together.',
    ],
    tags: 'Web design · Development · Ecommerce',
    href: '/websites',
  },
  {
    n: '03',
    title: ['Software & apps', 'Software & apps'],
    text: [
      'Webplatformen, mobiele apps en integraties die je product en dagelijkse werking ondersteunen.',
      'Web platforms, mobile apps and integrations that support your product and daily operations.',
    ],
    tags: 'Platforms · iOS & Android · Integrations',
    href: '/software',
  },
  {
    n: '04',
    title: ['Marketing & automatisering', 'Marketing & automation'],
    text: [
      'Bereik de juiste mensen. Zet aandacht om in klanten. Verbind campagnes, data en slimme opvolging.',
      'Reach the right people. Turn attention into customers. Connect campaigns, data and smart follow-up.',
    ],
    tags: 'Meta & Google Ads · CRO · AI workflows',
    href: '/ai-automatiseringen',
  },
]
export default function AgencyCapabilities() {
  const { lang } = useLang()
  const i = lang === 'nl' ? 0 : 1
  return (
    <section id="expertise" className="border-b border-line">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <p className="text-xs uppercase tracking-widest text-accent-2">
          {i === 0 ? 'Onze expertise' : 'Our expertise'}
        </p>
        <h2 className="mt-4 max-w-2xl font-display text-4xl text-paper sm:text-5xl">
          {i === 0
            ? 'Van eerste idee tot volgende groeifase.'
            : 'From first idea to the next stage of growth.'}
        </h2>
        <div className="mt-12 grid gap-x-10 sm:grid-cols-2">
          {items.map((item) => (
            <Link
              key={item.n}
              to={item.href}
              className="group border-t border-line py-8"
            >
              <div className="flex justify-between text-xs text-mute">
                <span>{item.n}</span>
                <span className="text-accent-2">↗</span>
              </div>
              <h3 className="mt-4 font-display text-2xl text-paper group-hover:text-accent-2">
                {item.title[i]}
              </h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-bone">
                {item.text[i]}
              </p>
              <p className="mt-5 text-xs text-mute">{item.tags}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
