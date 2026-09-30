export type VisualService = 'google-ads' | 'meta-ads' | 'data-analytics' | 'email-marketing'
export function hasServiceVisual(slug: string): slug is VisualService {
  return ['google-ads', 'meta-ads', 'data-analytics', 'email-marketing'].includes(slug)
}
