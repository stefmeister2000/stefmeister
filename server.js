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
  LEAD_TO = 'stefkeppens@gmail.com',
  // "From" address for the notification. Uses the verified stefmeister.com
  // domain so notifications deliver to any inbox (e.g. stefkeppens@gmail.com).
  LEAD_FROM = 'Stef Keppens website <noreply@stefmeister.com>',
  // Optional confirmation reply to the person who submitted the form.
  // Requires a VERIFIED domain, since it delivers to arbitrary addresses.
  LEAD_AUTOREPLY, // set to "true" to enable
  LEAD_REPLY_FROM, // e.g. "Stef Keppens <stef@stefkeppens.be>"
  // Segment that new contacts are added to. Requires a FULL-ACCESS api key
  // (send-only keys cannot write contacts). Defaults to the "Website leads"
  // segment created for this account.
  LEAD_SEGMENT_ID = 'd7334c7f-8e7c-4822-aa56-29d6c1a2c5d8',
  // HubSpot Private App token (Settings → Integrations → Private Apps).
  // Needs the crm.objects.contacts.write scope. Optional — leads still send
  // via Resend above if this isn't set.
  HUBSPOT_ACCESS_TOKEN,
} = process.env

const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null

// stefmeister.com is verified in Resend, so always send from it. This also
// overrides any stale LEAD_FROM (e.g. the onboarding test sender) that can't
// deliver to external inboxes like stefkeppens@gmail.com.
const VERIFIED_SENDER = 'Stef Keppens website <noreply@stefmeister.com>'
const SENDER = /onboarding@resend\.dev/i.test(LEAD_FROM) ? VERIFIED_SENDER : LEAD_FROM

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

// The qualification answers don't map to dedicated HubSpot properties on this
// portal, so they're combined into the standard "message" field (its own
// description: "for any message or comments a contact may want to leave on a
// form") rather than guessing at custom property names that may not exist.
function leadMessage(b) {
  const lines = [
    b.doel && `Belangrijkste doel: ${b.doel}`,
    b.uitdaging && `Grootste uitdaging: ${b.uitdaging}`,
    b.investering && `Maandelijkse investering: ${b.investering}`,
    b.kanalen && `Huidige kanalen: ${b.kanalen}`,
    b.timing && `Gewenste timing: ${b.timing}`,
    b.extra && `Extra informatie: ${b.extra}`,
  ].filter(Boolean)
  return lines.join('\n')
}

// Upsert the lead as a HubSpot contact by email. Best-effort: never blocks
// the form. Requires a Private App token with crm.objects.contacts.write.
async function saveHubspotContact(b) {
  const { firstName, lastName } = splitName(b.naam)
  const properties = {
    email: b.email,
    firstname: firstName,
    lastname: lastName,
    phone: b.telefoon,
    company: b.bedrijf,
    website: b.website,
    message: leadMessage(b),
  }

  const res = await fetch('https://api.hubapi.com/crm/v3/objects/contacts/batch/upsert', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${HUBSPOT_ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ inputs: [{ idProperty: 'email', id: b.email, properties }] }),
  })
  if (!res.ok) throw new Error(`HubSpot ${res.status}: ${await res.text()}`)
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

    // Every integration below is independent: a misconfigured "from" address
    // or an expired token in one of them shouldn't fail the whole submission
    // as long as the lead lands somewhere. Only report failure to the visitor
    // if literally none of them captured it.
    const attempts = []

    if (resend) {
      attempts.push({
        label: 'resend_email',
        run: resend.emails
          .send({
            from: SENDER,
            to: [LEAD_TO],
            replyTo: b.email,
            subject: `Nieuwe groeianalyse-aanvraag — ${String(b.bedrijf || b.naam).slice(0, 80)}`,
            html: leadHtml(b),
          })
          .then(({ error }) => {
            if (error) throw new Error(`${error.name}: ${error.message}`)
          }),
      })
      attempts.push({ label: 'resend_contact', run: saveContact(b) })
    }

    if (HUBSPOT_ACCESS_TOKEN) {
      attempts.push({ label: 'hubspot', run: saveHubspotContact(b) })
    }

    if (attempts.length === 0) {
      console.error('[lead] no integration configured (RESEND_API_KEY / HUBSPOT_ACCESS_TOKEN both unset)')
      return res.status(503).json({ error: 'not_configured' })
    }

    const results = await Promise.allSettled(attempts.map((a) => a.run))
    const captured = []
    results.forEach((r, i) => {
      if (r.status === 'fulfilled') captured.push(attempts[i].label)
      else console.error(`[lead] ${attempts[i].label} failed:`, r.reason.message)
    })
    if (captured.length === 0) {
      return res.status(502).json({ error: 'send_failed' })
    }

    if (resend && LEAD_AUTOREPLY === 'true' && LEAD_REPLY_FROM) {
      resend.emails
        .send({
          from: LEAD_REPLY_FROM,
          to: [b.email],
          subject: 'Bedankt voor je aanvraag — Stef Keppens',
          html: autoReplyHtml(b),
        })
        .catch((err) => console.error('[lead] auto-reply failed:', err.message))
    }

    return res.json({ ok: true, captured })
  } catch (err) {
    console.error('[lead] unexpected error:', err.message)
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
