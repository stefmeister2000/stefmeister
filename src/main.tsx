import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import './motion.css'
import './pricing.css'
import './pinacello.css'
import './mobile.css'
import App from './App.tsx'
import { LanguageProvider } from './i18n/LanguageContext.tsx'

const root = document.getElementById('root')!
const app = (
  <StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </StrictMode>
)

if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)
