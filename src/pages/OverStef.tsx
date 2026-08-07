import Seo from '../components/Seo'
import AboutStef from '../components/AboutStef'
import ProcessSection from '../components/ProcessSection'
import ClientWorkBar from '../components/ClientWorkBar'
import FinalCTA from '../components/FinalCTA'
import { useLang } from '../i18n/LanguageContext'

const COPY = {
  nl: {
    seoTitle: 'Over Stef',
    seoDescription:
      "Stef Keppens werkt rechtstreeks met bedrijven aan de volledige digitale klantreis: advertenties, landingspagina's, tracking, ecommerce en automatisering.",
  },
  en: {
    seoTitle: 'About Stef',
    seoDescription:
      "Stef Keppens works directly with companies on the full digital customer journey: ads, landing pages, tracking, ecommerce and automation.",
  },
}

export default function OverStef() {
  const { lang } = useLang()
  const t = COPY[lang]

  return (
    <div>
      <Seo title={t.seoTitle} description={t.seoDescription} path="/over-stef" />

      <AboutStef />
      <ClientWorkBar />
      <ProcessSection />
      <FinalCTA />
    </div>
  )
}
