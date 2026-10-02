import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { faqItems } from '../data/faq'
import { useLang } from '../i18n/LanguageContext'
import './FaqChat.css'

const topics = [
  ['studio', 'lochristi', 'wie', 'who', 'location', 'locatie'],
  ['website', 'webshop', 'app', 'software'],
  ['bedrijven', 'sector', 'companies', 'startups'],
  ['funnel', 'funnels', 'landing', 'landingspagina', 'klantreis'],
  ['ads', 'google', 'meta', 'facebook', 'advertenties'],
  ['email', 'mail', 'outreach', 'b2b', 'nieuwsbrief'],
  ['optimaliseren', 'optimalisatie', 'checkout', 'conversie', 'optimise', 'conversion'],
  ['intern', 'interne', 'teams', 'internal'],
  ['ai', 'automatisering', 'automatiseringen', 'automation', 'crm'],
  ['strategie', 'uitvoering', 'strategy', 'execution'],
  ['projectmatig', 'maandbasis', 'monthly', 'project'],
  ['starten', 'beginnen', 'start', 'contact', 'kennismaking'],
  ['meten', 'resultaat', 'tracking', 'analytics', 'results', 'measure'],
  ['consulting', 'consultancy', 'advies', 'leertraject', 'uur', 'hour'],
  ['kost', 'kosten', 'prijs', 'prijzen', 'budget', 'tarieven', 'cost', 'price', 'pricing'],
]
const words = (s: string): string[] => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/e-mail/g, 'email').match(/[a-z0-9]+/g) ?? []
function findAnswers(query: string, lang: 'nl' | 'en') {
  const tokens = words(query)
  return faqItems.map((item, index) => ({ index, score: topics[index].filter(word => tokens.includes(word)).length * 3 + words(item.question[lang]).filter(word => word.length > 4 && tokens.includes(word)).length }))
    .filter(item => item.score >= 3).sort((a, b) => b.score - a.score).slice(0, 3)
}
type Message = { question: string; answer?: number; choices?: number[] }
export default function FaqChat() {
  const { lang } = useLang()
  const nl = lang === 'nl'
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const launcher = useRef<HTMLButtonElement>(null)
  const input = useRef<HTMLInputElement>(null)
  const log = useRef<HTMLDivElement>(null)
  const close = () => { setOpen(false); launcher.current?.focus() }
  useEffect(() => { if (open) input.current?.focus() }, [open])
  useEffect(() => { if (log.current) log.current.scrollTop = log.current.scrollHeight }, [messages, open])
  function choose(index: number) {
    setMessages(previous => [...previous, { question: faqItems[index].question[lang], answer: index }])
  }
  function send() {
    const question = query.trim()
    if (!question) return
    const matches = findAnswers(question, lang)
    setMessages(previous => [...previous, { question, ...(matches.length === 1 || (matches[0]?.score ?? 0) > (matches[1]?.score ?? 0) ? { answer: matches[0]?.index } : { choices: matches.map(m => m.index) }) }])
    setQuery('')
  }
  return <div className="faq-chat" data-clarity-mask="true">
    {open && <section className="faq-chat-panel" role="dialog" aria-modal="false" aria-labelledby="faq-chat-title" onKeyDown={event => { if (event.key === 'Escape') { event.stopPropagation(); close() } }}>
      <header><div><h2 id="faq-chat-title">{nl ? 'Een vraag? Stel ze hier.' : 'Have a question?'}</h2><p>{nl ? 'FAQ-assistent · verkoop.studio' : 'FAQ assistant · verkoop.studio'}</p></div><button type="button" onClick={close} aria-label={nl ? 'Chat sluiten' : 'Close chat'}>×</button></header>
      <div className="faq-chat-log" ref={log} role="log" aria-live="polite" aria-relevant="additions">
        <p className="faq-chat-answer">{nl ? 'Ik help je zoeken in onze veelgestelde vragen. Kies een onderwerp of typ je vraag.' : 'I help you find answers in our FAQs. Choose a topic or type your question.'}</p>
        <div className="faq-chat-topics">{[14, 1, 3, 11].map(index => <button type="button" key={index} onClick={() => choose(index)}>{faqItems[index].question[lang]}</button>)}</div>
        {messages.map((message, index) => <div key={index} className="faq-chat-exchange"><p className="faq-chat-question">{message.question}</p>{message.answer !== undefined ? <p className="faq-chat-answer">{faqItems[message.answer].answer[lang]}</p> : message.choices?.length ? <div className="faq-chat-answer"><p>{nl ? 'Welke van deze vragen bedoel je?' : 'Which of these questions did you mean?'}</p><div className="faq-chat-topics">{message.choices.map(choice => <button key={choice} type="button" onClick={() => choose(choice)}>{faqItems[choice].question[lang]}</button>)}</div></div> : <div className="faq-chat-answer"><p>{nl ? 'Daar vind ik geen passend FAQ-antwoord op. Stel je vraag gerust aan ons team.' : 'I couldn’t find a matching FAQ answer. Please ask our team.'}</p><Link to="/contact" onClick={close}>{nl ? 'Neem contact op' : 'Contact us'} ↗</Link></div>}</div>)}
      </div>
      <form onSubmit={event => { event.preventDefault(); send() }}><label className="sr-only" htmlFor="faq-chat-query">{nl ? 'Je vraag' : 'Your question'}</label><input id="faq-chat-query" ref={input} value={query} onChange={event => setQuery(event.target.value)} placeholder={nl ? 'Typ je vraag…' : 'Type your question…'} maxLength={400} autoComplete="off" data-clarity-mask="true" /><button type="submit" disabled={!query.trim()} aria-label={nl ? 'Vraag versturen' : 'Send question'}>↑</button></form>
      <footer><Link to="/contact" onClick={close}>{nl ? 'Liever persoonlijk contact?' : 'Prefer to speak to us?'}</Link></footer>
    </section>}
    <button type="button" className="faq-chat-launcher" ref={launcher} onClick={() => open ? close() : setOpen(true)} aria-expanded={open} aria-label={nl ? (open ? 'FAQ-chat sluiten' : 'FAQ-chat openen') : (open ? 'Close FAQ chat' : 'Open FAQ chat')}><span aria-hidden="true">{open ? '×' : '?'}</span>{nl ? 'Stel een vraag' : 'Ask a question'}</button>
  </div>
}
