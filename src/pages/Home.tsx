import Seo from '../components/Seo'
import PersonalHero from '../components/PersonalHero'
import ClientWorkBar from '../components/ClientWorkBar'
import ProblemSection from '../components/ProblemSection'
import GrowthSystemVisual from '../components/GrowthSystemVisual'
import ServiceGrid from '../components/ServiceGrid'
import PricingSection from '../components/PricingSection'
import CaseStudyGrid from '../components/CaseStudyGrid'
import AIAutomationFlows from '../components/AIAutomationFlows'
import ProcessSection from '../components/ProcessSection'
import AboutStef from '../components/AboutStef'
import VideoShowcase from '../components/VideoShowcase'
import FunnelAuditOffer from '../components/FunnelAuditOffer'
import QualificationFormSection from '../components/QualificationFormSection'
import FAQ from '../components/FAQ'
import FinalCTA from '../components/FinalCTA'
import { useLang } from '../i18n/LanguageContext'

const COPY = {
  nl: {
    title: 'Het volledige digitale groeisysteem achter ambitieuze bedrijven',
    description:
      "Ik help bedrijven met landingspagina's, funnels, Meta Ads, Google Ads, ecommerce-optimalisatie en AI-automatiseringen — één meetbaar groeisysteem van eerste klik tot omzet.",
  },
  en: {
    title: 'The full digital growth system behind ambitious companies',
    description:
      'I help companies with landing pages, funnels, Meta Ads, Google Ads, ecommerce conversion and AI automations — one measurable growth system from first click to revenue.',
  },
}

export default function Home() {
  const { lang } = useLang()
  const t = COPY[lang]

  return (
    <>
      <Seo title={t.title} description={t.description} path="/" />
      <PersonalHero />
      <ClientWorkBar />
      <ProblemSection />
      <GrowthSystemVisual />
      <ServiceGrid />
      <PricingSection />
      <CaseStudyGrid />
      <AIAutomationFlows />
      <ProcessSection />
      <AboutStef />
      <VideoShowcase />
      <FunnelAuditOffer />
      <QualificationFormSection />
      <FAQ />
      <FinalCTA />
    </>
  )
}
