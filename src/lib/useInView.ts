import { useEffect, useRef, useState } from 'react'

/** Fires `onView` once, the first time the element enters the viewport. Used for reveal animations and view-tracking events. */
export function useInView<T extends HTMLElement>(onView?: () => void, threshold = 0.35) {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    let fired = false
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !fired) {
          fired = true
          setInView(true)
          onView?.()
          observer.disconnect()
        }
      },
      { threshold },
    )

    observer.observe(node)
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { ref, inView }
}
