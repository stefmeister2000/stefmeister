import Seo from '../components/Seo'
import GrowthGoals from '../components/GrowthGoals'
import PersonalHero from '../components/PersonalHero'
import RevenueGrowth from '../components/RevenueGrowth'
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
  return (
    <div className="studio-home">
      <Seo
        title={
          lang === 'nl'
            ? 'Marketingbureau in Lochristi | Google Ads & data'
            : 'Marketing agency in Lochristi | Google Ads & analytics'
        }
        description={
          lang === 'nl'
            ? 'Freeflow Studio in Lochristi helpt bedrijven groeien met Google Ads, Meta Ads, e-mailmarketing, data-analyse en websites die bezoekers omzetten in klanten.'
            : 'Freeflow Studio in Lochristi helps businesses grow with Google Ads, Meta Ads, email marketing, analytics and websites that turn visitors into customers.'
        }
        path="/"
      />
      <PersonalHero />
      <GrowthGoals />
      <SelectedWork />
      <RevenueGrowth />
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
