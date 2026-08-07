import type { Service } from './types'

export const services: Service[] = [
  {
    slug: 'landing-pages',
    number: '01',
    title: { nl: 'Landing pages', en: 'Landing pages' },
    summary: {
      nl: 'Gerichte pagina’s die aansluiten op één doelgroep, campagne en conversiedoel.',
      en: 'Focused pages built around one audience, one campaign and one conversion goal.',
    },
    includes: {
      nl: [
        'B2B lead-generation pages',
        'B2C booking pages',
        'ecommerce product pages',
        'campaign landing pages',
        'local landing pages',
        'event pages',
      ],
      en: [
        'B2B lead-generation pages',
        'B2C booking pages',
        'ecommerce product pages',
        'campaign landing pages',
        'local landing pages',
        'event pages',
      ],
    },
    problem: {
      nl: 'Advertenties sturen vaak naar een algemene website of homepage. De bezoeker moet zelf de vertaalslag maken tussen wat hij zag in de advertentie en wat hij op de pagina vindt. Dat kost conversie.',
      en: 'Ads often send people to a general website or homepage. The visitor has to bridge the gap between what they saw in the ad and what they find on the page themselves. That costs conversion.',
    },
    process: {
      nl: [
        'Ik bekijk de campagne, de doelgroep en het conversiedoel voor er één regel copy geschreven wordt.',
        'De pagina krijgt één boodschap en één actie — geen concurrerende keuzes.',
        'Structuur, copy en design worden afgestemd op hoe de bezoeker binnenkomt: via Meta, Google, e-mail of referral.',
        'Tracking wordt ingebouwd zodat gedrag op de pagina meetbaar is, niet enkel het bezoek.',
      ],
      en: [
        'I look at the campaign, the audience and the conversion goal before a single line of copy is written.',
        'The page gets one message and one action — no competing choices.',
        'Structure, copy and design are matched to how the visitor arrives: via Meta, Google, email or referral.',
        'Tracking is built in so behaviour on the page is measurable, not just the visit.',
      ],
    },
    deliverables: {
      nl: [
        'Pagina-structuur afgestemd op doelgroep en campagne',
        'Copy gericht op één conversiedoel',
        'Responsive design (desktop en mobiel)',
        'Ingebouwde tracking en conversiemeting',
      ],
      en: [
        'Page structure matched to audience and campaign',
        'Copy focused on one conversion goal',
        'Responsive design (desktop and mobile)',
        'Built-in tracking and conversion measurement',
      ],
    },
    relatedCase: 'olearys',
  },
  {
    slug: 'funnels',
    number: '02',
    title: { nl: 'Funnels', en: 'Funnels' },
    summary: {
      nl: 'De volledige klantreis van eerste contact tot lead, boeking of aankoop.',
      en: 'The full customer journey from first contact to lead, booking or purchase.',
    },
    includes: {
      nl: ['B2B lead funnels', 'B2C booking funnels', 'ecommerce funnels', 'retargeting flows', 'email funnels', 'post-purchase flows'],
      en: ['B2B lead funnels', 'B2C booking funnels', 'ecommerce funnels', 'retargeting flows', 'email funnels', 'post-purchase flows'],
    },
    problem: {
      nl: 'Een goede landingspagina is niet genoeg als wat erna komt niet klopt. Leads die niet snel worden opgevolgd, boekingen zonder bevestiging, of kopers die na aankoop niets meer horen — dat is omzet die op tafel blijft liggen.',
      en: 'A good landing page isn’t enough if what comes after it doesn’t work. Leads that aren’t followed up quickly, bookings without confirmation, buyers who hear nothing after purchase — that’s revenue left on the table.',
    },
    process: {
      nl: [
        'Ik breng de volledige klantreis in kaart: van eerste klik tot klant en herhaalaankoop.',
        'Elke stap krijgt een duidelijke commerciële functie — geen stap zonder doel.',
        'Opvolging via e-mail, CRM of AI-automatisering wordt gekoppeld aan de funnel.',
        'De funnel wordt gebouwd zodat elke stap meetbaar is.',
      ],
      en: [
        'I map out the full customer journey: from first click to customer and repeat purchase.',
        'Every step gets a clear commercial function — no step without a purpose.',
        'Follow-up via email, CRM or AI automation is connected to the funnel.',
        'The funnel is built so every step is measurable.',
      ],
    },
    deliverables: {
      nl: [
        'Volledig funnel-ontwerp van klik tot klant',
        'Gekoppelde opvolging (e-mail, CRM, retargeting)',
        'Duidelijke meetpunten per funnelstap',
        'Implementatie of begeleiding bij implementatie',
      ],
      en: [
        'Full funnel design from click to customer',
        'Connected follow-up (email, CRM, retargeting)',
        'Clear measurement points per funnel step',
        'Implementation, or guidance during implementation',
      ],
    },
    relatedCase: 'nooms',
  },
  {
    slug: 'meta-ads',
    number: '03',
    title: { nl: 'Meta Ads', en: 'Meta Ads' },
    summary: {
      nl: 'Campagnes die niet alleen bereik kopen, maar mensen naar de juiste commerciële route sturen.',
      en: 'Campaigns that don’t just buy reach, but send people down the right commercial route.',
    },
    includes: {
      nl: ['campaign strategy', 'creative concepts', 'audience structure', 'retargeting', 'conversion campaigns', 'performance analysis'],
      en: ['campaign strategy', 'creative concepts', 'audience structure', 'retargeting', 'conversion campaigns', 'performance analysis'],
    },
    problem: {
      nl: 'Meta Ads worden vaak gemeten op klikken en bereik, terwijl het doel leads, boekingen of omzet is. Zonder een heldere structuur tussen campagne, landingspagina en opvolging blijft het resultaat oppervlakkig.',
      en: 'Meta Ads are often measured on clicks and reach, while the actual goal is leads, bookings or revenue. Without a clear structure between campaign, landing page and follow-up, results stay superficial.',
    },
    process: {
      nl: [
        'Campagnestructuur en doelgroepen worden opgebouwd rond het commerciële doel, niet enkel bereik.',
        'Creatives worden afgestemd op de fase van de funnel: koud, warm of retargeting.',
        'Elke campagne verwijst naar een landingspagina die bij de boodschap past.',
        'Resultaten worden geanalyseerd op leads, boekingen of omzet — niet enkel op klikken.',
      ],
      en: [
        'Campaign structure and audiences are built around the commercial goal, not just reach.',
        'Creatives are matched to the funnel stage: cold, warm or retargeting.',
        'Every campaign points to a landing page that matches the message.',
        'Results are analysed on leads, bookings or revenue — not just clicks.',
      ],
    },
    deliverables: {
      nl: [
        'Campagne- en doelgroepstructuur',
        'Creative concepten per funnelfase',
        'Koppeling met bijhorende landingspagina’s',
        'Rapportage op commerciële resultaten',
      ],
      en: [
        'Campaign and audience structure',
        'Creative concepts per funnel stage',
        'Connection to matching landing pages',
        'Reporting on commercial results',
      ],
    },
    relatedCase: 'pinacello',
  },
  {
    slug: 'google-ads',
    number: '04',
    title: { nl: 'Google Ads', en: 'Google Ads' },
    summary: {
      nl: 'Zoekcampagnes die aansluiten op de intentie van de gebruiker.',
      en: 'Search campaigns that match the user’s intent.',
    },
    includes: {
      nl: ['search campaigns', 'local campaigns', 'brand and non-brand structure', 'conversion tracking', 'landing-page alignment', 'remarketing'],
      en: ['search campaigns', 'local campaigns', 'brand and non-brand structure', 'conversion tracking', 'landing-page alignment', 'remarketing'],
    },
    problem: {
      nl: 'Zoekverkeer heeft al een intentie. Wanneer de landingspagina die intentie niet direct beantwoordt, verliest de campagne rendement die er eigenlijk al lag.',
      en: 'Search traffic already carries intent. When the landing page doesn’t answer that intent directly, the campaign loses return that was already there for the taking.',
    },
    process: {
      nl: [
        'Campagnestructuur wordt opgebouwd rond zoekintentie: brand, non-brand en lokaal apart.',
        'Conversietracking wordt correct ingesteld zodat elke actie meetbaar is.',
        'Landingspagina’s worden afgestemd op de zoekterm en de intentie erachter.',
        'Remarketing haalt bezoekers terug die nog niet converteerden.',
      ],
      en: [
        'Campaign structure is built around search intent: brand, non-brand and local kept separate.',
        'Conversion tracking is set up correctly so every action is measurable.',
        'Landing pages are matched to the search term and the intent behind it.',
        'Remarketing brings back visitors who haven’t converted yet.',
      ],
    },
    deliverables: {
      nl: [
        'Campagnestructuur per intentie en doelgroep',
        'Conversietracking-opzet',
        'Afstemming tussen zoekterm en landingspagina',
        'Remarketing-opzet',
      ],
      en: [
        'Campaign structure per intent and audience',
        'Conversion tracking setup',
        'Alignment between search term and landing page',
        'Remarketing setup',
      ],
    },
    relatedCase: 'healthfactor',
  },
  {
    slug: 'ecommerce-conversie',
    number: '05',
    title: { nl: 'Ecommerce conversie', en: 'Ecommerce conversion' },
    summary: {
      nl: 'Verbeteringen die meer bezoekers richting productkeuze, checkout en herhaalaankoop sturen.',
      en: 'Improvements that push more visitors toward product choice, checkout and repeat purchase.',
    },
    includes: {
      nl: [
        'product-page optimisation',
        'offers and bundles',
        'checkout flow',
        'upsells',
        'email flows',
        'subscription strategy',
        'abandoned-cart flows',
      ],
      en: [
        'product-page optimisation',
        'offers and bundles',
        'checkout flow',
        'upsells',
        'email flows',
        'subscription strategy',
        'abandoned-cart flows',
      ],
    },
    problem: {
      nl: 'Veel ecommerce-websites verliezen bezoekers vóór checkout: onduidelijke productpagina’s, een omslachtig afrekenproces of geen opvolging bij een verlaten winkelmandje.',
      en: 'Many ecommerce sites lose visitors before checkout: unclear product pages, a clunky checkout process, or no follow-up on an abandoned cart.',
    },
    process: {
      nl: [
        'Ik analyseer de volledige aankoopreis: van productpagina tot bevestiging.',
        'Productpagina’s, aanbiedingen en bundels worden scherper afgestemd op de koopbeslissing.',
        'Checkout-flow en upsells worden herzien waar wrijving zit.',
        'E-mailflows vangen verlaten winkelmandjes op en stimuleren herhaalaankoop.',
      ],
      en: [
        'I analyse the full purchase journey: from product page to confirmation.',
        'Product pages, offers and bundles are sharpened around the buying decision.',
        'Checkout flow and upsells are reviewed wherever there’s friction.',
        'Email flows catch abandoned carts and encourage repeat purchase.',
      ],
    },
    deliverables: {
      nl: [
        'Analyse van de volledige aankoopreis',
        'Concrete aanbevelingen per stap (product, checkout, upsell)',
        'E-mailflows voor herstel en herhaalaankoop',
        'Aanbevelingen voor abonnements- of herhaalstrategie',
      ],
      en: [
        'Analysis of the full purchase journey',
        'Concrete recommendations per step (product, checkout, upsell)',
        'Email flows for recovery and repeat purchase',
        'Recommendations for a subscription or repeat-purchase strategy',
      ],
    },
    relatedCase: 'nooms',
  },
  {
    slug: 'ai-automatiseringen',
    number: '06',
    title: { nl: 'AI-automatiseringen', en: 'AI automations' },
    summary: {
      nl: 'Automatiseringen die repetitieve marketing- en salesprocessen sneller en slimmer maken.',
      en: 'Automations that make repetitive marketing and sales processes faster and smarter.',
    },
    includes: {
      nl: [
        'lead qualification',
        'automatic follow-up',
        'personalised email workflows',
        'reporting summaries',
        'internal content workflows',
        'proposal preparation',
        'CRM updates',
        'customer-support routing',
      ],
      en: [
        'lead qualification',
        'automatic follow-up',
        'personalised email workflows',
        'reporting summaries',
        'internal content workflows',
        'proposal preparation',
        'CRM updates',
        'customer-support routing',
      ],
    },
    problem: {
      nl: 'Veel bedrijven verliezen tijd aan repetitieve taken tussen marketing, sales en opvolging: leads handmatig beoordelen, data handmatig samenvatten, CRM handmatig bijwerken.',
      en: 'Many companies lose time on repetitive tasks between marketing, sales and follow-up: reviewing leads by hand, summarising data by hand, updating the CRM by hand.',
    },
    process: {
      nl: [
        'Ik breng in kaart welke terugkerende taken het meeste tijd kosten.',
        'Workflows worden ontworpen rond bestaande tools: CRM, e-mail, formulieren, agenda.',
        'AI wordt ingezet om te kwalificeren, samen te vatten en voor te bereiden — een mens blijft eindverantwoordelijk.',
        'De workflow wordt getest en verfijnd op basis van echte gevallen.',
      ],
      en: [
        'I map out which recurring tasks cost the most time.',
        'Workflows are designed around existing tools: CRM, email, forms, calendar.',
        'AI is used to qualify, summarise and prepare — a human stays in charge.',
        'The workflow is tested and refined on real cases.',
      ],
    },
    deliverables: {
      nl: [
        'Overzicht van automatiseringskansen',
        'Ontwerp van de workflow(s)',
        'Implementatie en koppeling met bestaande tools',
        'Testen en bijsturen na livegang',
      ],
      en: [
        'Overview of automation opportunities',
        'Workflow design',
        'Implementation and connection to existing tools',
        'Testing and refinement after go-live',
      ],
    },
    relatedCase: 'olearys',
  },
  {
    slug: 'distributie',
    number: '07',
    title: { nl: 'Offer & distributie', en: 'Offer & distribution' },
    summary: {
      nl: 'Een scherp aanbod en directe distributiekanalen, zodat verkeer zoveel mogelijk converteert in plaats van wegvloeit.',
      en: 'A sharp offer and direct distribution channels, so traffic converts instead of leaking away.',
    },
    includes: {
      nl: [
        'aanbod- en positioneringsstrategie',
        'e-mail outreach-campagnes',
        'B2B Sales Navigator-campagnes',
        'distributiekanalen opzetten',
        'trackbare campagnestructuur',
        'koppeling met landingspagina en funnel',
      ],
      en: [
        'offer and positioning strategy',
        'email outreach campaigns',
        'B2B Sales Navigator campaigns',
        'setting up distribution channels',
        'trackable campaign structure',
        'connection to landing page and funnel',
      ],
    },
    problem: {
      nl: 'Veel bedrijven zetten wel content of campagnes op, maar missen een scherp aanbod en een direct, trackbaar distributiekanaal. Zeker in B2B blijft outreach vaak een gok, zonder zicht op wat wel en niet werkt.',
      en: 'Many companies run content or campaigns, but lack a sharp offer and a direct, trackable distribution channel. In B2B especially, outreach often stays a guess, with no visibility into what actually works.',
    },
    process: {
      nl: [
        'Ik bekijk het huidige aanbod en waar het verkeer nu vandaan komt.',
        'Het aanbod wordt scherper gepositioneerd rond één duidelijke actie.',
        'Distributiekanalen — e-mail, LinkedIn Sales Navigator, betaald of organisch — worden opgezet als trackbare campagne.',
        'Resultaten per kanaal worden gemeten, zodat duidelijk wordt wat wél werkt.',
      ],
      en: [
        'I look at the current offer and where traffic is coming from today.',
        'The offer is positioned more sharply around one clear action.',
        'Distribution channels — email, LinkedIn Sales Navigator, paid or organic — are set up as a trackable campaign.',
        'Results per channel are measured, so it becomes clear what actually works.',
      ],
    },
    deliverables: {
      nl: [
        'Scherpere aanbod- en positioneringsstrategie',
        'Opgezette outreach- of distributiecampagne',
        'Trackbare koppeling met landingspagina en funnel',
        'Overzicht van wat per kanaal wel en niet werkt',
      ],
      en: [
        'A sharper offer and positioning strategy',
        'A live outreach or distribution campaign',
        'Trackable connection to landing page and funnel',
        'Overview of what does and doesn’t work per channel',
      ],
    },
    relatedCase: 'xpert-funding',
  },
]

export const getService = (slug: string) =>
  services.find((service) => service.slug === slug)
