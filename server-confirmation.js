import { confirmationTemplate } from './server-templates.js'
import { resendRequest } from './server-lead.js'

export async function sendConfirmation(resend, form, {from, replyTo, idempotencyKey}) {
  return resendRequest(() => resend.emails.send({
    from, to:[form.email], replyTo, template:confirmationTemplate(form),
  }, {idempotencyKey}))
}
