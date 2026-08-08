import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Nav from './Nav'
import Footer from './Footer'
import StickyMobileCTA from './StickyMobileCTA'
import BackToTop from './BackToTop'
import { captureAttribution } from '../lib/analytics'

export default function Layout() {
  const location = useLocation()

  useEffect(() => {
    captureAttribution()
  }, [])

  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1))
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
    }
    window.scrollTo({ top: 0 })
  }, [location.pathname, location.hash])

  return (
    <div className="min-h-screen bg-ink pb-28 lg:pb-0">
      <Nav />
      <main>
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
      <StickyMobileCTA />
    </div>
  )
}
