import type { CaseStudy, Lang } from '../data/types'
import Placeholder from './Placeholder'

const COMING_SOON = { nl: 'Binnenkort beschikbaar', en: 'Coming soon' }
const UNAVAILABLE = {
  nl: 'Geen beeldmateriaal beschikbaar voor dit afgeronde project.',
  en: 'No visual material available for this completed project.',
}

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

  if (c.unavailable) {
    return <p className={`text-sm text-mute ${className}`}>{UNAVAILABLE[lang]}</p>
  }

  return <Placeholder label={c.name} ratio={ratio} className={className} />
}
