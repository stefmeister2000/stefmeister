import type { CaseStudy } from './types'
import olearys from '../assets/cases/olearys.png'
import nooms from '../assets/cases/nooms.png'
import pinacello from '../assets/cases/pinacello.png'
import healthfactor from '../assets/cases/healthfactor.png'

export const cases: CaseStudy[] = [
  {
    slug: 'olearys',
    name: "O'Learys",
    sector: { nl: 'Hospitality en entertainment', en: 'Hospitality and entertainment' },
    status: 'ongoing',
    image: olearys,
    liveUrl: 'https://olearys.com/nl-be/',
    summary: {
      nl: 'Van één website voor iedereen naar aparte, duidelijke beslistrajecten voor B2C-bezoekers en B2B-organisatoren.',
      en: 'From one website for everyone to separate, clear decision paths for B2C visitors and B2B organisers.',
    },
    situation: {
      nl: 'O’Learys biedt een breed aanbod aan activiteiten, arrangementen en doelgroepen — van een avondje bowling met vrienden tot een volledig bedrijfsevent. Die breedte is een sterkte, maar maakt het ook lastig voor een bezoeker om snel de juiste keuze te maken.',
      en: 'O’Learys offers a wide range of activities, packages and audiences — from a night of bowling with friends to a full corporate event. That breadth is a strength, but it also makes it harder for a visitor to quickly find the right choice.',
    },
    challenge: {
      nl: 'De website bevat veel activiteiten, arrangementen en doelgroepen, maar B2C-bezoekers en zakelijke organisatoren hebben elk een ander beslistraject nodig.',
      en: 'The website contains many activities, packages and audiences, but B2C visitors and business organisers each need a different decision journey.',
    },
    role: {
      nl: 'Ik werk aan de online digitale kant van O’Learys: B2C- en B2B-landingspagina’s, funnels, campagnes, tracking en conversie.',
      en: 'I work on the digital side of O’Learys: B2C and B2B landing pages, funnels, campaigns, tracking and conversion.',
    },
    built: {
      nl: [
        'B2C landingpagina-structuur',
        'B2B-pagina voor bedrijfsevents',
        'Arrangement- en occasion-flows',
        'Booking- en offerte-CTA’s',
        'Vertrouwenselementen en sociale bewijskracht in de structuur',
        'Afstemming van Meta- en Google-campagnes op de juiste pagina',
        'Trackingstructuur',
        'Strategie voor e-mailflows',
      ],
      en: [
        'B2C landing-page structure',
        'B2B page for company events',
        'Package and occasion flows',
        'Booking and proposal CTAs',
        'Trust elements and social proof built into the structure',
        'Alignment of Meta and Google campaigns to the right page',
        'Tracking structure',
        'Email-flow strategy',
      ],
    },
    measurement: {
      nl: 'Meer voltooide boekingen, meer gekwalificeerde B2B-aanvragen en duidelijkere meting van campagne tot omzet.',
      en: 'More completed bookings, more qualified B2B enquiries, and clearer measurement from campaign to revenue.',
    },
    objective: {
      nl: 'Meer voltooide boekingen, meer gekwalificeerde B2B-aanvragen en duidelijkere meting van campagne tot omzet.',
      en: 'More completed bookings, more qualified B2B enquiries, and clearer measurement from campaign to revenue.',
    },
  },
  {
    slug: 'pinacello',
    name: 'Pinacello',
    sector: { nl: 'Consumer ecommerce', en: 'Consumer ecommerce' },
    status: 'ongoing',
    liveUrl: 'https://promo.pinacello.com/',
    image: pinacello,
    video: '/videos/pinacello.mp4',
    videoCaption: {
      nl: '20 verkopen uit één organische video — we focussen op zelfgemaakte producten.',
      en: '20 sales from one organic video — we focus on self-made products.',
    },
    summary: {
      nl: 'Aandacht voor het merk omzetten in een meetbare, doorlopende ecommerce-verkoopmotor.',
      en: 'Turning brand attention into a measurable, ongoing ecommerce sales engine.',
    },
    situation: {
      nl: 'Pinacello bouwt merkbekendheid op in een consumentenmarkt. De uitdaging is om die aandacht consequent te vertalen naar online verkoop, niet enkel naar bereik.',
      en: 'Pinacello is building brand awareness in a consumer market. The challenge is turning that attention consistently into online sales, not just reach.',
    },
    challenge: {
      nl: 'Bezoekers die via campagnes binnenkomen, hebben een directe, overtuigende route naar aankoop nodig — inclusief het juiste aanbod op het juiste moment.',
      en: 'Visitors arriving through campaigns need a direct, convincing route to purchase — including the right offer at the right moment.',
    },
    role: {
      nl: 'Ik werk aan de ecommerce en digitale groeikant van Pinacello, waaronder campagnes, landingspagina’s, conversie en online verkoop.',
      en: 'I work on the ecommerce and digital growth side of Pinacello, including campaigns, landing pages, conversion and online sales.',
    },
    built: {
      nl: [
        'Ecommerce-strategie',
        'Campagne-landingspagina’s',
        'Meta Ads',
        'Conversiegerichte content',
        'Aanbiedingen en bundels',
        'Retargeting',
        'Online verkoopflow',
      ],
      en: [
        'Ecommerce strategy',
        'Campaign landing pages',
        'Meta Ads',
        'Conversion-focused content',
        'Offers and bundles',
        'Retargeting',
        'Online sales flow',
      ],
    },
    measurement: {
      nl: 'Meer voltooide aankopen als resultaat van campagneverkeer, gemeten van eerste klik tot bestelling.',
      en: 'More completed purchases as a result of campaign traffic, measured from first click to order.',
    },
    objective: {
      nl: 'Aandacht voor het merk omzetten in meetbare ecommerce-omzet.',
      en: 'Turning brand attention into measurable ecommerce revenue.',
    },
  },
  {
    slug: 'healthfactor',
    name: 'HealthFactor',
    sector: { nl: 'Lokale gezondheid en fitness', en: 'Local health and fitness' },
    status: 'ongoing',
    liveUrl: 'https://promo.healthfactor.be/',
    image: healthfactor,
    video: '/videos/healthfactor.mp4',
    videoCaption: {
      nl: '2 klanten geboekt op de eerste dag — deze video werkt omdat ze persoonlijk aanvoelt.',
      en: '2 clients booked on the first day — this video works because it feels personal.',
    },
    summary: {
      nl: 'Lokale aandacht omzetten in bezoeken, leads en nieuwe klanten via gerichte landingspagina’s en campagnes.',
      en: 'Turning local attention into visits, leads and new customers through targeted landing pages and campaigns.',
    },
    situation: {
      nl: 'HealthFactor is een lokale sportschool die zich naast grote budgetketens zoals Basic-Fit wil onderscheiden.',
      en: 'HealthFactor is a local gym that wants to stand out alongside large budget chains like Basic-Fit.',
    },
    challenge: {
      nl: 'De uitdaging was om de sterkte van HealthFactor — een persoonlijkere aanpak en begeleiding — zichtbaar te maken in advertenties en landingspagina’s, zodat prospects daar met vertrouwen voor kiezen.',
      en: 'The challenge was to make HealthFactor’s real strength — a more personal approach and coaching — visible in ads and landing pages, so prospects choose it with confidence.',
    },
    role: {
      nl: 'Ik hielp HealthFactor met digitale promotie, landingspagina’s en lokale leadgeneratie.',
      en: 'I helped HealthFactor with digital promotion, landing pages and local lead generation.',
    },
    built: {
      nl: [
        'Landingspagina’s',
        'Lokale campagnes',
        'Ad-concepten rond de persoonlijke aanpak van HealthFactor',
        'Promotionele aanbiedingen',
        'Leadgeneratie',
        'Koppeling tussen social en betaalde campagnes',
        'Conversieoptimalisatie',
      ],
      en: [
        'Landing pages',
        'Local campaigns',
        'Ad concepts built around HealthFactor’s personal approach',
        'Promotional offers',
        'Lead generation',
        'Connection between social and paid campaigns',
        'Conversion optimisation',
      ],
    },
    measurement: {
      nl: 'Meer lokale aanmeldingen en leads als resultaat van de campagnes en landingspagina’s.',
      en: 'More local sign-ups and leads as a result of the campaigns and landing pages.',
    },
    objective: {
      nl: 'Lokale aandacht omzetten in bezoeken, leads en nieuwe klanten.',
      en: 'Turning local attention into visits, leads and new customers.',
    },
  },
  {
    slug: 'nooms',
    name: 'Nooms',
    sector: { nl: 'Supplementen en ecommerce', en: 'Supplements and ecommerce' },
    status: 'ongoing',
    liveUrl: 'https://noomsdaily.com/',
    image: nooms,
    summary: {
      nl: 'Pre-sale via influencer marketing volledig uitverkocht — op weg naar een schaalbare digitale route van productontdekking tot herhaalaankoop.',
      en: 'Pre-sale sold out completely via influencer marketing — building a scalable digital route from product discovery to repeat purchase.',
    },
    situation: {
      nl: 'Nooms is een opbouwend ecommerce-merk in de supplementenmarkt, met zowel directe verkoop als retail- en B2B-ambities.',
      en: 'Nooms is a growing ecommerce brand in the supplements market, with both direct sales and retail/B2B ambitions.',
    },
    challenge: {
      nl: 'De volledige route — van productontdekking via influencers en campagnes tot eerste aankoop, herhaalaankoop en zakelijke kanalen — moet als één geheel functioneren.',
      en: 'The full route — from product discovery through influencers and campaigns to first purchase, repeat purchase and business channels — needs to function as one whole.',
    },
    role: {
      nl: 'Nooms is mijn eigen bedrijf. Ik bouw het zelf op, met focus op ecommerce, funnels, branding, verkoop en digitale groei.',
      en: 'Nooms is my own company. I’m building it myself, focused on ecommerce, funnels, branding, sales and digital growth.',
    },
    built: {
      nl: [
        'Ecommerce-opzet',
        'Productpositionering',
        'Landingspagina’s',
        'Pre-sale flow',
        'Influencer-funnel',
        'Denkwerk rond abonnementen',
        'Retail- en B2B-strategie',
        'E-mail- en acquisitiestructuur',
      ],
      en: [
        'Ecommerce setup',
        'Product positioning',
        'Landing pages',
        'Pre-sale flow',
        'Influencer funnel',
        'Subscription strategy thinking',
        'Retail and B2B strategy',
        'Email and acquisition structure',
      ],
    },
    measurement: {
      nl: 'De pre-sale, aangedreven door influencer marketing, was volledig uitverkocht. Groei in eerste aankopen en herhaalaankopen wordt gemeten van productontdekking tot klant.',
      en: 'The pre-sale, driven by influencer marketing, sold out completely. Growth in first purchases and repeat purchases is measured from product discovery to customer.',
    },
    objective: {
      nl: 'Een schaalbare digitale route bouwen van productontdekking tot eerste aankoop en herhaalaankoop.',
      en: 'Building a scalable digital route from product discovery to first purchase and repeat purchase.',
    },
  },
  {
    slug: 'xpert-funding',
    name: 'Xpert Funding',
    sector: {
      nl: 'Internationaal B2C-fintech (proprietary trading)',
      en: 'International B2C fintech (proprietary trading)',
    },
    status: 'afgerond',
    unavailable: true,
    summary: {
      nl: 'Van nul opgebouwd tot internationaal B2C-fintechmerk voor retailtraders — tot €500.000 omzet, met een database van meer dan 60.000 leads en klanten.',
      en: 'Built from zero into an international B2C fintech brand for retail traders — up to €500,000 in revenue, with a database of more than 60,000 leads and customers.',
    },
    situation: {
      nl: 'Xpert Funding was een online proprietary trading firm die particuliere traders wereldwijd toegang gaf tot gesimuleerd handelskapitaal. Traders kochten online een challenge en moesten binnen vooraf vastgelegde risicoregels aantonen dat ze consistent en verantwoord konden handelen. Wie slaagde, kreeg toegang tot een funded account en een deel van de behaalde winsten.',
      en: 'Xpert Funding was an online proprietary trading firm that gave retail traders worldwide access to simulated trading capital. Traders bought a challenge online and had to prove, within preset risk rules, that they could trade consistently and responsibly. Those who passed got access to a funded account and a share of the profits earned.',
    },
    challenge: {
      nl: 'Het volledige B2C-model moest van nul worden opgebouwd en internationaal geschaald — merk, aanbod, website, klantenacquisitie, software-integraties, betalingsstromen — in een zeer competitieve markt, volledig digitaal.',
      en: 'The full B2C model had to be built from zero and scaled internationally — brand, offer, website, customer acquisition, software integrations, payment flows — in a highly competitive market, entirely digital.',
    },
    role: {
      nl: 'Ik stond aan de basis van de volledige digitale en commerciële uitbouw van Xpert Funding: van merk, website en aanbod tot klantenacquisitie, software-integraties, betalingsstromen en internationale schaalvergroting.',
      en: 'I was behind the full digital and commercial build-out of Xpert Funding: from brand, website and offer to customer acquisition, software integrations, payment flows and international scaling.',
    },
    built: {
      nl: [
        'Ontwikkeling van het volledige B2C-businessmodel',
        'Branding en marktpositionering',
        'Website en internationale verkoopfunnels',
        'Challenge- en accountstructuren',
        'Pricing, promoties en kortingsstrategieën',
        'Integratie van tradingplatformen en dashboards',
        'Betaalproviders en automatische accountlevering',
        'Meta-, Google- en socialmediacampagnes',
        'E-mailmarketing naar een database van 60.000+ contacten',
        'Affiliate- en influencerprogramma’s',
        'Partnerships met tradingcommunities',
        'Conversieoptimalisatie en retargeting',
        'Internationale klantenservice en communitymanagement',
        'Analyse van klantgedrag, acquisitiekosten en omzet',
      ],
      en: [
        'Development of the full B2C business model',
        'Branding and market positioning',
        'Website and international sales funnels',
        'Challenge and account structures',
        'Pricing, promotions and discount strategies',
        'Trading-platform and dashboard integrations',
        'Payment providers and automatic account delivery',
        'Meta, Google and social media campaigns',
        'Email marketing to a database of 60,000+ contacts',
        'Affiliate and influencer programmes',
        'Partnerships with trading communities',
        'Conversion optimisation and retargeting',
        'International customer service and community management',
        'Analysis of customer behaviour, acquisition cost and revenue',
      ],
    },
    measurement: {
      nl: 'Xpert Funding groeide uit tot een internationaal B2C-fintechmerk met klanten uit verschillende landen, een eigen online handelsomgeving en een database van meer dan 60.000 leads en klanten. De omzet liep op tot €500.000, met conversieratio’s tussen 20% en 30% bij bepaalde e-mailcampagnes.',
      en: 'Xpert Funding grew into an international B2C fintech brand with customers across multiple countries, its own online trading environment, and a database of more than 60,000 leads and customers. Revenue reached up to €500,000, with certain email campaigns achieving conversion rates between 20% and 30%.',
    },
    objective: {
      nl: 'Een digitaal consumentenmerk van nul opbouwen en internationaal schalen binnen een zeer competitieve markt.',
      en: 'Building a digital consumer brand from zero and scaling it internationally within a highly competitive market.',
    },
  },
]

export const getCase = (slug: string) =>
  cases.find((c) => c.slug === slug)
