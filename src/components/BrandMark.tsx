import { useId } from 'react'

/** Draw the mark directly at the screen's resolution, including on Retina displays. */
export default function BrandMark() {
  const id = useId()
  return (
    <svg
      className="verkoop-brand-icon"
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      viewBox="0 0 64 64"
      aria-hidden="true"
      focusable="false"
      shapeRendering="geometricPrecision"
    >
      <defs>
        <linearGradient id={`${id}-tile`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#4265ff" />
          <stop offset="1" stopColor="#173be0" />
        </linearGradient>
        <linearGradient id={`${id}-fold`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#dbe5ff" />
          <stop offset="1" stopColor="#859dff" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="16" fill={`url(#${id}-tile)`} />
      <path d="M12 18h12l14 33H26Z" fill={`url(#${id}-fold)`} />
      <path d="M42 13h12L38 51H26Z" fill="#fff" />
    </svg>
  )
}
