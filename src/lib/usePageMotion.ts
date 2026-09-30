import { useEffect, useRef } from 'react'

/** Entry motion never hides content and follows the operating system preference. */
export function usePageMotion() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const root = ref.current
    if (!root) return
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const animations = new Set<Animation>()
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          observer.unobserve(entry.target)
          if (preference.matches) return
          const animation = entry.target.animate(
            [
              { opacity: 0, transform: 'translateY(26px)' },
              { opacity: 1, transform: 'translateY(0)' },
            ],
            { duration: 650, easing: 'cubic-bezier(.16,1,.3,1)' },
          )
          animations.add(animation)
          animation.onfinish = () => animations.delete(animation)
        })
      },
      { threshold: 0.08 },
    )
    root
      .querySelectorAll(
        '.performance-heading, .channel-selector, .channel-stage, .revenue-copy, .revenue-principles > div, .project-tile, #expertise .group',
      )
      .forEach((el) => observer.observe(el))
    const stop = () => {
      if (preference.matches) animations.forEach((a) => a.cancel())
    }
    preference.addEventListener('change', stop)
    return () => {
      observer.disconnect()
      animations.forEach((a) => a.cancel())
      preference.removeEventListener('change', stop)
    }
  }, [])
  return ref
}
