import type { CaseStudy, Lang } from '../data/types'
import Placeholder from './Placeholder'

const COMING_SOON = { nl: 'Binnenkort beschikbaar', en: 'Coming soon' }

interface CaseVisualProps {
  case: CaseStudy
  lang: Lang
  ratio?: string
  className?: string
}

export default function CaseVisual({ case: c, lang, ratio = 'aspect-[16/10]', className = '' }: CaseVisualProps) {
  if (c.image) {
    return (
      <img
        src={c.image}
        alt={c.name}
        loading="lazy"
        className={`${ratio} w-full rounded-2xl border border-line object-cover object-top ${className}`}
      />
    )
  }

  if (c.comingSoon) {
    return <Placeholder label={`${c.name} — ${COMING_SOON[lang]}`} ratio={ratio} className={className} />
  }

  return <Placeholder label={c.name} ratio={ratio} className={className} />
}
