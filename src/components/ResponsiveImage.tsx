import type { ImgHTMLAttributes } from 'react'
import { optimizedImages } from '../lib/optimizedImages'

export default function ResponsiveImage({ src, sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 70vw, 960px', ...props }: ImgHTMLAttributes<HTMLImageElement>) {
  const image = src ? optimizedImages[src] : undefined
  return <img decoding="async" {...image} {...props} src={src} sizes={image?.srcSet ? sizes : undefined} />
}
