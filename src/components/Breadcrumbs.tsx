import { Link } from 'react-router-dom'
import { useLang } from '../i18n/LanguageContext'

interface Crumb {
  label: string
  href?: string
}

const HOME = { nl: 'Home', en: 'Home' }

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const { lang } = useLang()
  const all: Crumb[] = [{ label: HOME[lang], href: '/' }, ...items]

  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-sm text-mute">
      {all.map((crumb, i) => {
        const isLast = i === all.length - 1
        return (
          <span key={`${crumb.label}-${i}`} className="flex items-center gap-1.5">
            {i > 0 && (
              <span aria-hidden className="text-line">
                /
              </span>
            )}
            {crumb.href && !isLast ? (
              <Link to={crumb.href} className="transition hover:text-paper">
                {crumb.label}
              </Link>
            ) : (
              <span className={isLast ? 'text-paper' : undefined}>{crumb.label}</span>
            )}
          </span>
        )
      })}
    </nav>
  )
}
