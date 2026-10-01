import test from 'node:test'
import assert from 'node:assert/strict'
import {confirmationEmail, sendConfirmation} from '../server-confirmation.js'
test('Dutch and English promises, plain text and safe applicant content', () => {
  for (const lang of ['nl','en']) {
    const email=confirmationEmail({lang,naam:'<script>alert(1)</script>',doel:'<img src=x>',uitdaging:'Line one\nLine two'})
    assert.match(email.html, /&lt;script&gt;/)
    assert.doesNotMatch(email.html, /<script>|<img src=x>/)
    assert.match(email.html, /Line one<br>Line two/)
    assert.match(email.subject, lang==='en' ? /within 24 hours/ : /binnen 24 uur/)
    assert.match(email.text, lang==='en' ? /within 24 hours/ : /binnen 24 uur/)
    assert.match(email.html, new RegExp(`lang="${lang}"`))
    assert.ok(Buffer.byteLength(email.html)<102400)
  }
})
test('confirmation waits for delivery API and surfaces returned API errors', async () => {
  let sent
  const mock={emails:{send:async payload=>{sent=payload;return {data:{id:'sent'}}}}}
  const result=await sendConfirmation(mock,{naam:'Alex',email:'alex@example.com'}, {from:'sender@example.com',replyTo:'owner@example.com'})
  assert.equal(result.id,'sent');assert.deepEqual(sent.to,['alex@example.com']);assert.equal(sent.replyTo,'owner@example.com');assert.ok(sent.text)
  await assert.rejects(sendConfirmation({emails:{send:async()=>({error:{name:'validation_error',message:'unverified'}})}},{email:'alex@example.com'},{from:'sender@example.com',replyTo:'owner@example.com'}),/unverified/)
})
