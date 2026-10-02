import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'
import { readFileSync, existsSync } from 'node:fs'
import { crmPayload, sendToCrm } from './server-crm.js'
import { Resend } from 'resend'
import { sendConfirmation } from './server-confirmation.js'
import { captureLead } from './server-lead.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DIST = path.join(__dirname, 'dist')
const envFile = path.join(__dirname, '.env')
if (existsSync(envFile)) process.loadEnvFile(envFile)

const {
  RESEND_API_KEY,
  CRM_INBOUND_URL,
  CRM_INBOUND_TOKEN,
  // Where lead notifications are delivered. Your Resend account email works with
  // any sending setup, including the onboarding test sender.
  LEAD_TO = 'stefkeppens@gmail.com',
  // "From" address for the notification. Uses the verified send.verkoop.studio
  // domain so notifications deliver to any inbox (e.g. stefkeppens@gmail.com).
  LEAD_FROM = 'Verkoop Studio <noreply@send.verkoop.studio>',
  // Optional override for the confirmation ("thank you") sender. Defaults to
  // the verified domain sender below.
  LEAD_REPLY_FROM, // e.g. "Stef Keppens <stef@stefkeppens.be>"
} = process.env

const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null

// send.verkoop.studio is verified in Resend, so always send from it. This also
// overrides any stale LEAD_FROM (e.g. the onboarding test sender) that can't
// deliver to external inboxes like stefkeppens@gmail.com.
const VERIFIED_SENDER = 'Verkoop Studio <noreply@send.verkoop.studio>'
const SENDER = /onboarding@resend\.dev/i.test(LEAD_FROM) ? VERIFIED_SENDER : LEAD_FROM

const app = express()
app.use(express.json({ limit: '32kb' }))
app.use(express.static(DIST, { redirect: false, index: false }))

const ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }
const esc = (s = '') => String(s).replace(/[&<>"']/g, (c) => ESC[c])
const isEmail = (s) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(s || ''))

function leadHtml(b) {
  const rows = [
    ['Naam', b.naam],
    ['Bedrijf', b.bedrijf],
    ['E-mail', b.email],
    ['Telefoon', b.telefoon],
    ['Website', b.website],
    ['Belangrijkste doel', b.doel],
    ['Grootste uitdaging', b.uitdaging],
    ['Maandelijkse investering', b.investering],
    ['Huidige kanalen', b.kanalen],
    ['Gewenste timing', b.timing],
    ['Extra informatie', b.extra],
  ].filter(([, v]) => v && String(v).trim())

  const attr = b.attribution && typeof b.attribution === 'object' ? b.attribution : {}
  const attrRows = Object.entries(attr).filter(([, v]) => v && String(v).trim())

  const rowsHtml = rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px;color:#8a8577;vertical-align:top;white-space:nowrap">${esc(
          k,
        )}</td><td style="padding:6px 12px;color:#1a1a1a">${esc(v).replace(/\n/g, '<br>')}</td></tr>`,
    )
    .join('')

  const attrHtml = attrRows.length
    ? `<p style="margin:20px 0 6px;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#8a8577">Attributie</p>
       <table style="border-collapse:collapse;font-size:13px">${attrRows
         .map(
           ([k, v]) =>
             `<tr><td style="padding:4px 12px;color:#8a8577;white-space:nowrap">${esc(
               k,
             )}</td><td style="padding:4px 12px;color:#1a1a1a">${esc(v)}</td></tr>`,
         )
         .join('')}</table>`
    : ''

  return `<div style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;max-width:560px;margin:0 auto">
    <h2 style="font-size:18px;color:#1a1a1a;margin:0 0 4px">Nieuwe groeianalyse-aanvraag</h2>
    <p style="margin:0 0 16px;color:#8a8577;font-size:13px">Formulier: ${esc(b.form_id || 'onbekend')}</p>
    <table style="border-collapse:collapse;font-size:14px;width:100%">${rowsHtml}</table>
    ${attrHtml}
  </div>`
}

app.post('/api/lead', async (req, res) => {
  try {
    const b = req.body || {}
    // Honeypot: real users never fill this hidden field.
    if (b.company_website) return res.json({ ok: true })

    const required = ['naam', 'email', 'telefoon', 'doel', 'uitdaging']
    for (const f of required) {
      if (!b[f] || !String(b[f]).trim()) return res.status(400).json({ error: 'missing_fields' })
    }
    if (!isEmail(b.email)) return res.status(400).json({ error: 'invalid_email' })

    b.email = String(b.email).trim().toLowerCase()
    let payload
    try { payload = crmPayload(b) }
    catch { return res.status(400).json({ error: 'invalid_fields' }) }
    const result = await captureLead({
      resend, body: b, from: SENDER, to: LEAD_TO, html: leadHtml(b),
      crm: CRM_INBOUND_URL || CRM_INBOUND_TOKEN
        ? () => sendToCrm(payload, { url: CRM_INBOUND_URL, token: CRM_INBOUND_TOKEN })
        : undefined,
    })
    if (!result.ok) {
      console.error('[lead] capture incomplete:', result.failed.join(', '))
      return res.status(result.status).json({ ok: false, error: 'capture_incomplete' })
    }
    const captured = result.captured

    // Send the submitter an instant confirmation ("thank you") email. Uses the
    // verified domain, so it delivers to any address. Best-effort.
    if (resend) {
      try {
        await sendConfirmation(resend, b, {from: LEAD_REPLY_FROM || SENDER, replyTo: LEAD_TO, idempotencyKey: `lead-confirmation/${result.key}`})
        captured.push('resend_confirmation')
      } catch (error) {
        console.error('[lead] confirmation email failed:', error.message)
      }
    }

    return res.json({ ok: true, captured })
  } catch (err) {
    console.error('[lead] unexpected error:', err.message)
    return res.status(502).json({ error: 'send_failed' })
  }
})

// Serve the same pre-rendered content to visitors and crawlers.
const pageRoutes = new Set(JSON.parse(readFileSync(path.join(DIST, 'routes.json'), 'utf8')))
app.use((req, res) => {
  if (!['GET', 'HEAD'].includes(req.method)) return res.status(404).json({ error: 'not_found' })
  const pathname = req.path
  if (pathname === '/over-stef' || pathname === '/over-stef/') return res.redirect(301, '/agency')
  if (pathname.length > 1 && pathname.endsWith('/') && pageRoutes.has(pathname.slice(0, -1))) {
    return res.redirect(301, pathname.slice(0, -1) + (req.url.includes('?') ? req.url.slice(req.url.indexOf('?')) : ''))
  }
  if (pageRoutes.has(pathname)) return res.sendFile(path.join(DIST, pathname, 'index.html'))
  res.status(404).sendFile(path.join(DIST, '404', 'index.html'))
})

const PORT = process.env.PORT || 8787
app.listen(PORT, () => console.log(`Server listening on ${PORT}`))
