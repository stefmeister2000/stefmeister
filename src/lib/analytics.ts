/**
 * Thin tracking layer. Pushes every event to window.dataLayer (GTM), which
 * fans out to GA4, Meta Pixel and LinkedIn Insight Tag once those tags are
 * installed with real IDs (see index.html). Nothing here calls a vendor SDK
 * directly, so the site works before any tracking IDs are confirmed.
 *
 * Full event map: see /docs or the "Tracking event map" deliverable.
 */

export type TrackingEvent =
  | 'traffic_source_captured'
  | 'referral_source_captured'
  | 'linkedin_campaign_captured'
  | 'case_viewed'
  | 'portfolio_item_viewed'
  | 'service_viewed'
  | 'audit_cta_clicked'
  | 'form_viewed'
  | 'form_started'
  | 'form_abandoned'
  | 'form_submitted'
  | 'calendar_opened'
  | 'meeting_booked'
  | 'proposal_sent'
  | 'project_won'
  | 'project_value'

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[]
  }
}

export function trackEvent(event: TrackingEvent, payload: Record<string, unknown> = {}) {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event, ...payload })
  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.debug('[track]', event, payload)
  }
}

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const
const STORAGE_KEY = 'sk_attribution'

export interface Attribution {
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_term?: string
  utm_content?: string
  referrer?: string
  li_fat_id?: string
  landing_path?: string
  captured_at?: string
  [key: string]: unknown
}

/** Captures UTM params, referrer and the LinkedIn click id on first visit and persists them for the session. */
export function captureAttribution(): Attribution {
  if (typeof window === 'undefined') return {}

  const existing = readAttribution()
  if (existing) return existing

  const params = new URLSearchParams(window.location.search)
  const attribution: Attribution = {
    referrer: document.referrer || undefined,
    landing_path: window.location.pathname,
    captured_at: new Date().toISOString(),
  }

  for (const key of UTM_KEYS) {
    const value = params.get(key)
    if (value) attribution[key] = value
  }

  const liFatId = params.get('li_fat_id')
  if (liFatId) attribution.li_fat_id = liFatId

  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(attribution))
  } catch {
    // storage unavailable — attribution still returned for this page view
  }

  if (attribution.utm_source) trackEvent('traffic_source_captured', attribution)
  if (attribution.referrer && !attribution.utm_source) trackEvent('referral_source_captured', attribution)
  if (attribution.li_fat_id) trackEvent('linkedin_campaign_captured', attribution)

  return attribution
}

export function readAttribution(): Attribution | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Attribution) : null
  } catch {
    return null
  }
}
