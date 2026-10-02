import test from 'node:test'
import assert from 'node:assert/strict'
import {sendConfirmation} from '../server-confirmation.js'
import {confirmationTemplate} from '../server-templates.js'
test('template variables escape applicant content in both languages', () => {
  for (const lang of ['nl','en']) {
    const template=confirmationTemplate({lang,naam:'<script>alert(1)</script>',doel:'<img src=x>'})
    assert.match(template.variables.CONTACT_NAME, /&lt;script&gt;/)
    assert.doesNotMatch(template.variables.GOAL, /<img/)
    assert.ok(template.id.endsWith(lang))
  }
})
test('confirmation waits for delivery API and surfaces returned API errors', async () => {
  let sent
  const mock={emails:{send:async payload=>{sent=payload;return {data:{id:'sent'}}}}}
  const result=await sendConfirmation(mock,{naam:'Alex',email:'alex@example.com'}, {from:'sender@example.com',replyTo:'owner@example.com'})
  assert.equal(result.id,'sent');assert.deepEqual(sent.to,['alex@example.com']);assert.equal(sent.replyTo,'owner@example.com');assert.ok(sent.template)
  await assert.rejects(sendConfirmation({emails:{send:async()=>({error:{name:'validation_error',message:'unverified'}})}},{email:'alex@example.com'},{from:'sender@example.com',replyTo:'owner@example.com'}),/unverified/)
})
