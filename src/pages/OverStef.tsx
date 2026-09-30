import Seo from '../components/Seo'
import AboutStef from '../components/AboutStef'
import ProcessSection from '../components/ProcessSection'
import FinalCTA from '../components/FinalCTA'
import { useLang } from '../i18n/LanguageContext'

const COPY = {
  nl: {
    seoTitle: 'De agency',
    seoDescription:
      "Stef Keppens en LYTE Studios werken samen met bedrijven aan de volledige digitale klantreis: advertenties, landingspagina's, tracking, ecommerce en automatisering.",
  },
  en: {
    seoTitle: 'The agency',
    seoDescription:
      "Stef Keppens and LYTE Studios work together with companies on the full digital customer journey: ads, landing pages, tracking, ecommerce and automation.",
  },
}

export default function OverStef() {
  const { lang } = useLang()
  const t = COPY[lang]

  return (
    <div>
      <Seo title={t.seoTitle} description={t.seoDescription} path="/agency" />

      <AboutStef />
      <ProcessSection />
      <FinalCTA />
    </div>
  )
}
