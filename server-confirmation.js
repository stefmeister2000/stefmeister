const escape = (value = '') => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char])

export function confirmationEmail(form) {
  const en = form.lang === 'en'
  const name = String(form.naam || '').trim().split(/\s+/)[0] || (en ? 'there' : 'daar')
  const c = en ? {
    subject: 'We received your request — we’ll contact you within 24 hours',
    preview: 'Your next step towards growth. A personal response from verkoop.studio within 24 hours.',
    tag: 'REQUEST RECEIVED', title: 'Your next chapter<br>starts here.',
    greeting: `Hi ${name},`, intro: 'Thanks for reaching out to verkoop.studio. Your request has arrived safely, and we’re looking forward to learning more about your plans.',
    promise: 'We’ll contact you within 24 hours.', promiseNote: 'Personally, by email or phone, to discuss your request and the next step.',
    next: 'What happens next', steps: [['We read your story', 'We review your goals, challenges and the information you shared.'], ['We get in touch', 'Within 24 hours, we’ll reach out to understand what matters most to your business.'], ['We find the right next step', 'Together, we’ll explore the approach that fits your goals. No pressure to choose a package now.']],
    summary: 'Your request, at a glance', goal: 'Your goal', company: 'Company', challenge: 'Your challenge',
    extra: 'Something to add?', reply: 'Simply reply to this email with a link, question or extra context. Your reply goes straight to Stef.',
    cta: 'Explore our work', signoff: 'Speak soon,', role: 'Growth & strategy · verkoop.studio', footer: 'You received this email because you submitted a request at verkoop.studio.'
  } : {
    subject: 'Je aanvraag is ontvangen — we contacteren je binnen 24 uur',
    preview: 'Jouw volgende stap naar groei. Binnen 24 uur een persoonlijke reactie van verkoop.studio.',
    tag: 'AANVRAAG ONTVANGEN', title: 'Jouw volgende stap<br>begint hier.',
    greeting: `Hoi ${name},`, intro: 'Bedankt voor je interesse in verkoop.studio. Je aanvraag is goed aangekomen. We kijken ernaar uit om meer te horen over jouw plannen.',
    promise: 'We contacteren je binnen 24 uur.', promiseNote: 'Persoonlijk, via e-mail of telefoon, om je aanvraag en de volgende stap te bespreken.',
    next: 'Dit mag je verwachten', steps: [['We lezen jouw verhaal', 'We bekijken je doelen, uitdagingen en de informatie die je hebt gedeeld.'], ['We nemen contact op', 'Binnen 24 uur hoor je van ons. We luisteren naar wat voor jouw bedrijf het verschil kan maken.'], ['We bepalen de volgende stap', 'Samen bekijken we welke aanpak bij je doelen past. Je hoeft nu nog geen pakket te kiezen.']],
    summary: 'Jouw aanvraag in het kort', goal: 'Jouw doel', company: 'Bedrijf', challenge: 'Jouw uitdaging',
    extra: 'Nog iets toevoegen?', reply: 'Beantwoord deze e-mail gerust met een link, vraag of extra uitleg. Je antwoord komt rechtstreeks bij Stef terecht.',
    cta: 'Ontdek ons werk', signoff: 'Tot snel,', role: 'Growth & strategy · verkoop.studio', footer: 'Je ontvangt deze e-mail omdat je een aanvraag hebt ingediend via verkoop.studio.'
  }
  const details = [[c.company, form.bedrijf], [c.goal, form.doel], [c.challenge, form.uitdaging]].filter(([, value]) => value && String(value).trim())
  const paragraphs = details.map(([label, value]) => `<p style="margin:0 0 16px;font-size:14px;line-height:22px;overflow-wrap:anywhere"><strong style="color:#56617b">${label}</strong><br>${escape(value).replace(/\n/g, '<br>')}</p>`).join('')
  const steps = c.steps.map(([title, body], i) => `<tr><td width="42" valign="top" style="padding:0 0 22px;color:#3155ef;font-weight:bold;font-size:15px">0${i + 1}</td><td style="padding:0 0 22px"><h3 style="font-size:16px;margin:0 0 5px;color:#202c46">${title}</h3><p style="font-size:14px;line-height:23px;margin:0;color:#56617b">${body}</p></td></tr>`).join('')
  const html = `<!doctype html><html lang="${en ? 'en' : 'nl'}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escape(c.subject)}</title></head>
<body style="margin:0;padding:0;background:#f3f4fa;color:#202c46;font-family:Arial,Helvetica,sans-serif">
<div style="display:none;max-height:0;overflow:hidden;mso-hide:all">${c.preview}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:24px 12px">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:#ffffff;border:1px solid #e1e5f0;border-radius:20px;overflow:hidden">
<tr><td style="padding:28px 28px 24px"><a href="https://verkoop.studio/" style="font-size:23px;font-weight:bold;color:#202c46;text-decoration:none">verkoop<span style="font-weight:normal">.studio</span><span style="color:#3155ef"> ↗</span></a></td></tr>
<tr><td bgcolor="#e9eaff" style="padding:34px 28px;background:#e9eaff"><p style="font-size:11px;font-weight:bold;letter-spacing:2px;color:#3155ef;margin:0 0 18px">${c.tag}</p><h1 style="font-size:38px;line-height:43px;letter-spacing:-1px;margin:0 0 24px;color:#202c46">${c.title}</h1><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td bgcolor="#ffffff" style="padding:20px;border-radius:12px"><p style="font-size:18px;line-height:26px;font-weight:bold;margin:0 0 6px;color:#2443c4">${c.promise}</p><p style="font-size:14px;line-height:22px;margin:0;color:#56617b">${c.promiseNote}</p></td></tr></table></td></tr>
<tr><td style="padding:30px 28px"><p style="font-size:16px;line-height:26px;margin:0 0 12px">${escape(c.greeting)}</p><p style="font-size:16px;line-height:26px;margin:0 0 28px;color:#56617b">${c.intro}</p><h2 style="font-size:21px;margin:0 0 24px">${c.next}</h2><table role="presentation" width="100%" cellpadding="0" cellspacing="0">${steps}</table>
${details.length ? `<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td bgcolor="#f5f6fb" style="padding:22px;border-radius:12px"><h2 style="font-size:17px;margin:0 0 18px">${c.summary}</h2>${paragraphs}</td></tr></table>` : ''}
<h2 style="font-size:18px;margin:28px 0 10px">${c.extra}</h2><p style="font-size:14px;line-height:24px;color:#56617b;margin:0 0 24px">${c.reply}</p><p style="font-size:15px;line-height:25px;margin:0 0 28px">${c.signoff}<br><strong>Stef Keppens</strong><br><span style="font-size:13px;color:#56617b">${c.role}</span></p>
<table role="presentation" cellpadding="0" cellspacing="0"><tr><td bgcolor="#3155ef" style="border-radius:8px"><a href="https://verkoop.studio/cases" style="display:inline-block;box-sizing:border-box;padding:15px 24px;font-size:14px;font-weight:bold;color:#ffffff;text-decoration:none">${c.cta} ↗</a></td></tr></table></td></tr>
<tr><td style="padding:22px 28px;border-top:1px solid #e1e5f0;color:#56617b;font-size:12px;line-height:20px">verkoop.studio · Lochristi, ${en ? 'Belgium' : 'België'}<br>${c.footer}</td></tr></table></td></tr></table></body></html>`
  const text = [c.greeting, c.intro, c.promise, c.promiseNote, c.next, ...c.steps.map(([title, body], i) => `${i + 1}. ${title}\n${body}`), ...(details.length ? [c.summary, ...details.map(([label, value]) => `${label}: ${value}`)] : []), c.extra, c.reply, `${c.signoff}\nStef Keppens\n${c.role}`, `${c.cta}: https://verkoop.studio/cases`, c.footer].join('\n\n')
  return {subject:c.subject, html, text}
}

// Resend returns API errors as values, not only rejected promises.
export async function sendConfirmation(resend, form, {from, replyTo}) {
  const result = await resend.emails.send({from, to:[form.email], replyTo, ...confirmationEmail(form)})
  if (result.error) throw new Error(`${result.error.name}: ${result.error.message}`)
  return result.data
}
