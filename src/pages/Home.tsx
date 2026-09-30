import Seo from '../components/Seo'
import PersonalHero from '../components/PersonalHero'
import RevenueGrowth from '../components/RevenueGrowth'
import PerformanceAds from '../components/PerformanceAds'
import { usePageMotion } from '../lib/usePageMotion'
import SelectedWork from '../components/SelectedWork'
import AgencyCapabilities from '../components/AgencyCapabilities'
import AboutStef from '../components/AboutStef'
import ProcessSection from '../components/ProcessSection'
import PricingSection from '../components/PricingSection'
import FAQ from '../components/FAQ'
import FinalCTA from '../components/FinalCTA'
import { useLang } from '../i18n/LanguageContext'
export default function Home() {
  const { lang } = useLang()
  const motionRef = usePageMotion()
  return (
    <div className="studio-home" ref={motionRef}>
      <Seo
        title={
          lang === 'nl'
            ? 'Meer online sales en omzet met Meta Ads, Google Ads en conversie'
            : 'More online sales and revenue with Meta Ads, Google Ads and conversion'
        }
        description={
          lang === 'nl'
            ? 'Meer klanten en online omzet met performance marketing, sterke websites en conversieoptimalisatie. Ontdek de Pinacello-case: +120% online omzet.'
            : 'Grow online sales and revenue through performance marketing, strong websites and conversion optimisation. Explore Pinacello: +120% online revenue.'
        }
        path="/"
      />
      <PersonalHero />
      <RevenueGrowth />
      <PerformanceAds />
      <SelectedWork />
      <AgencyCapabilities />
      <AboutStef />
      <div id="aanpak">
        <ProcessSection />
      </div>
      <PricingSection />
      <FAQ />
      <FinalCTA />
    </div>
  )
}
