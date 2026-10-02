import test from 'node:test'
import assert from 'node:assert/strict'
import { captureLead, resendRequest, leadKey } from '../server-lead.js'
const ok = {data:{id:'receipt'},error:null}
const failure = {data:null,error:{name:'validation_error',statusCode:422}}
const body = {naam:'Test Aanvraag',email:'test@example.com',submission_id:'test-1'}
function fixture() {
  const sent = [], created = []
  const resend = {
    contacts:{get:async()=>({error:{statusCode:404}}),create:async p=>{created.push(p);return ok}},
    emails:{send:async(p,o)=>{sent.push({p,o});return ok}},
  }
  return {resend,sent,created}
}
const run = (f, more={})=>captureLead({resend:f.resend,body,from:'test@example.com',html:'Test',...more})
test('requires contact storage and notification to requested inbox',async()=>{
 const f=fixture(), result=await run(f)
 assert.equal(result.ok,true); assert.equal(f.created[0].email,body.email)
 assert.deepEqual(f.sent[0].p.to,['stefkeppens@gmail.com'])
 assert.equal(f.sent[0].p.replyTo,body.email)
})
test('contact failure still attempts notification but never reports success',async()=>{
 const f=fixture(); f.resend.contacts.create=async()=>failure
 assert.equal((await run(f)).ok,false);assert.equal(f.sent.length,1)
})
test('email failure never reports success even when CRM and contact succeed',async()=>{
 const f=fixture();f.resend.emails.send=async()=>failure
 const r=await run(f,{crm:async()=>{}});assert.equal(r.ok,false);assert.deepEqual(r.captured,['resend_contact','crm'])
})
test('CRM failure does not prevent either Resend operation',async()=>{
 const f=fixture();const r=await run(f,{crm:async()=>{throw Error('down')}})
 assert.equal(r.ok,false);assert.deepEqual(r.captured,['resend_contact','resend_email'])
})
test('existing contact retains subscription state without a create or update',async()=>{
 const f=fixture();f.resend.contacts.get=async()=>({data:{id:'existing',unsubscribed:true}})
 assert.equal((await run(f)).ok,true);assert.equal(f.created.length,0)
})
test('retries transient failures and reuses notification key across submissions',async()=>{
 let count=0;await resendRequest(async()=>++count<3?{error:{statusCode:429}}:ok,async()=>{})
 assert.equal(count,3)
 const f=fixture();await run(f);await run(f)
 assert.equal(f.sent[0].o.idempotencyKey,f.sent[1].o.idempotencyKey)
 assert.notEqual(leadKey(body),leadKey({...body,submission_id:'next'}))
})
test('permanent errors are not retried and missing receipts fail',async()=>{
 let count=0;await assert.rejects(resendRequest(async()=>{count++;return failure},async()=>{}));assert.equal(count,1)
 await assert.rejects(resendRequest(async()=>({data:{}}),async()=>{}))
})
test('no key cannot report success through CRM alone',async()=>{
 const r=await captureLead({resend:null,body,crm:async()=>{}});assert.equal(r.status,503)
})
