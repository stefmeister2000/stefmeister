import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'
import { Resend } from 'resend'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DIST = path.join(__dirname, 'dist')

const {
  RESEND_API_KEY,
  // Where lead notifications are delivered. Your Resend account email works with
  // any sending setup, including the onboarding test sender.
  LEAD_TO = 'stefkeppensyt@gmail.com',
  // "From" address for the notification. Until a domain is verified in Resend,
  // use the onboarding sender (it only delivers to your own account email).
  LEAD_FROM = 'Stef Keppens website <onboarding@resend.dev>',
  // Optional confirmation reply to the person who submitted the form.
  // Requires a VERIFIED domain, since it delivers to arbitrary addresses.
  LEAD_AUTOREPLY, // set to "true" to enable
  LEAD_REPLY_FROM, // e.g. "Stef Keppens <stef@stefkeppens.be>"
  // Segment that new contacts are added to. Requires a FULL-ACCESS api key
  // (send-only keys cannot write contacts). Defaults to the "Website leads"
  // segment created for this account.
  LEAD_SEGMENT_ID = 'd7334c7f-8e7c-4822-aa56-29d6c1a2c5d8',
} = process.env

const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null

const app = express()
app.use(express.json({ limit: '32kb' }))
app.use(express.static(DIST))

const ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }
const esc = (s = '') => String(s).replace(/[&<>"']/g, (c) => ESC[c])
const isEmail = (s) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(s || ''))

function splitName(full = '') {
  const parts = String(full).trim().split(/\s+/)
  return { firstName: parts.shift() || '', lastName: parts.join(' ') }
}

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

function autoReplyHtml(b) {
  return `<div style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;max-width:560px;margin:0 auto;color:#1a1a1a">
    <p>Hoi ${esc(b.naam)},</p>
    <p>Bedankt voor je aanvraag. Ik bekijk jullie website en commerciële klantreis persoonlijk en neem
    binnenkort contact op met de beste volgende stap.</p>
    <p>Groet,<br>Stef Keppens</p>
  </div>`
}

// Save the lead as a Resend contact (incl. phone). Best-effort: never blocks the
// form. Requires a full-access api key — send-only keys return 401 here.
async function saveContact(b) {
  const { firstName, lastName } = splitName(b.naam)
  const properties = {}
  if (b.telefoon) properties.phone = String(b.telefoon)
  if (b.bedrijf) properties.company = String(b.bedrijf)

  const payload = { email: b.email, firstName, lastName, properties }
  if (LEAD_SEGMENT_ID) payload.segments = [{ id: LEAD_SEGMENT_ID }]

  const { error } = await resend.contacts.create(payload)
  if (error) throw new Error(`${error.name}: ${error.message}`)
}

app.post('/api/lead', async (req, res) => {
  try {
    if (!resend) return res.status(503).json({ error: 'email_not_configured' })

    const b = req.body || {}
    // Honeypot: real users never fill this hidden field.
    if (b.company_website) return res.json({ ok: true })

    const required = ['naam', 'bedrijf', 'email', 'telefoon', 'website', 'doel', 'uitdaging']
    for (const f of required) {
      if (!b[f] || !String(b[f]).trim()) return res.status(400).json({ error: 'missing_fields' })
    }
    if (!isEmail(b.email)) return res.status(400).json({ error: 'invalid_email' })

    const { error: sendError } = await resend.emails.send({
      from: LEAD_FROM,
      to: [LEAD_TO],
      replyTo: b.email,
      subject: `Nieuwe groeianalyse-aanvraag — ${String(b.bedrijf).slice(0, 80)}`,
      html: leadHtml(b),
    })
    if (sendError) throw new Error(`${sendError.name}: ${sendError.message}`)

    // Save contact (with phone) — best-effort, doesn't affect the response.
    saveContact(b).catch((err) => console.error('[lead] contact save failed:', err.message))

    if (LEAD_AUTOREPLY === 'true' && LEAD_REPLY_FROM) {
      resend.emails
        .send({
          from: LEAD_REPLY_FROM,
          to: [b.email],
          subject: 'Bedankt voor je aanvraag — Stef Keppens',
          html: autoReplyHtml(b),
        })
        .catch((err) => console.error('[lead] auto-reply failed:', err.message))
    }

    return res.json({ ok: true })
  } catch (err) {
    console.error('[lead] send failed:', err.message)
    return res.status(502).json({ error: 'send_failed' })
  }
})

// SPA fallback — must come after the API routes.
app.use((req, res) => {
  if (req.method !== 'GET') return res.status(404).json({ error: 'not_found' })
  res.sendFile(path.join(DIST, 'index.html'))
})

const PORT = process.env.PORT || 8787
app.listen(PORT, () => console.log(`Server listening on ${PORT}`))
