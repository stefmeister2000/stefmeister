import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import ServicePage from './pages/ServicePage'
import CasesIndex from './pages/CasesIndex'
import CaseStudyPage from './pages/CaseStudyPage'
import FunnelAudit from './pages/FunnelAudit'
import OverStef from './pages/OverStef'
import Contact from './pages/Contact'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />

          <Route path="landing-pages" element={<ServicePage slug="landing-pages" />} />
          <Route path="funnels" element={<ServicePage slug="funnels" />} />
          <Route path="meta-ads" element={<ServicePage slug="meta-ads" />} />
          <Route path="google-ads" element={<ServicePage slug="google-ads" />} />
          <Route path="ecommerce-conversie" element={<ServicePage slug="ecommerce-conversie" />} />
          <Route path="ai-automatiseringen" element={<ServicePage slug="ai-automatiseringen" />} />
          <Route path="distributie" element={<ServicePage slug="distributie" />} />

          <Route path="cases" element={<CasesIndex />} />
          <Route path="cases/olearys" element={<CaseStudyPage slug="olearys" />} />
          <Route path="cases/pinacello" element={<CaseStudyPage slug="pinacello" />} />
          <Route path="cases/healthfactor" element={<CaseStudyPage slug="healthfactor" />} />
          <Route path="cases/nooms" element={<CaseStudyPage slug="nooms" />} />
          <Route path="cases/xpert-funding" element={<CaseStudyPage slug="xpert-funding" />} />

          <Route path="funnel-audit" element={<FunnelAudit />} />
          <Route path="over-stef" element={<OverStef />} />
          <Route path="contact" element={<Contact />} />

          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
