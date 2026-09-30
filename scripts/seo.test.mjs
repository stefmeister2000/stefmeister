import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFile, access } from 'node:fs/promises'
import { spawn } from 'node:child_process'
import { once } from 'node:events'

const routes = JSON.parse(await readFile('dist/routes.json', 'utf8'))
const sitemap = await readFile('dist/sitemap.xml', 'utf8')
const origin = new URL(sitemap.match(/<loc>(.*?)<\/loc>/)[1]).origin
const titles = new Set()

test('every indexable route has crawlable content, unique metadata and valid structured data', async () => {
  for (const route of routes) {
    const html = await readFile(`dist${route === '/' ? '' : route}/index.html`, 'utf8')
    const head = html.split('</head>')[0]
    assert.equal((head.match(/<title>/g) || []).length, 1, route)
    const title = head.match(/<title>(.*?)<\/title>/)[1]
    assert(!titles.has(title), `duplicate title: ${route}`)
    titles.add(title)
    assert(head.includes(`rel="canonical" href="${origin}${route}"`), route)
    assert.match(head, /name="description" content="[^"]{30,}"/)
    assert.match(head, /name="robots" content="index, follow/)
    assert.match(head, /property="og:image"/)
    assert.equal((html.match(/<h1[\s>]/g) || []).length, 1, route)
    assert.match(html, /<html lang="nl"/)
    const graph = JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1])['@graph']
    assert(graph.some(item => item['@type'] === 'ProfessionalService' && item.address.addressLocality === 'Lochristi'), route)
    assert(graph.some(item => item['@type'] === 'WebPage' && item.url === origin + route), route)
    assert(sitemap.includes(`<loc>${origin}${route}</loc>`), route)
    for (const [, asset] of html.matchAll(/(?:src|href)="(\/(?:assets|partners)\/[^"?#]+)[^"]*"/g)) {
      await access(`dist${asset}`)
    }
    for (const [, href] of html.matchAll(/href="(\/[^"]*)"/g)) {
      const target = href.split(/[?#]/)[0] || '/'
      if (!target.includes('.')) assert(routes.includes(target) || target === '/over-stef', `broken internal link ${href} on ${route}`)
    }
  }
  assert(!sitemap.includes('xpert-funding'))
  assert(!sitemap.includes('/404'))
  const robots = await readFile('dist/robots.txt', 'utf8')
  assert(robots.includes(`Sitemap: ${origin}/sitemap.xml`))
  await access('dist/social-cover.png')
})

test('production server returns route HTML, permanent redirects and real 404s', async () => {
  const server = spawn(process.execPath, ['server.js'], {
    env: { ...process.env, PORT: '18791', RESEND_API_KEY: '' },
    stdio: ['ignore', 'pipe', 'pipe'],
  })
  try {
    await Promise.race([
      once(server.stdout, 'data'),
      once(server, 'exit').then(([code]) => { throw new Error(`Server exited: ${code}`) }),
      new Promise((_, reject) => { const timeout = setTimeout(() => reject(new Error('Server startup timeout')), 10000); timeout.unref() }),
    ])
    const get = path => fetch(`http://127.0.0.1:18791${path}`, { redirect: 'manual' })
    for (const route of routes) {
      const response = await get(route)
      assert.equal(response.status, 200, route)
      const html = await response.text()
      assert(html.includes(`rel="canonical" href="${origin}${route}"`), route)
    }
    for (const path of ['/404', '/nonexistent-page', '/cases/xpert-funding']) {
      const response = await get(path)
      assert.equal(response.status, 404, path)
      assert((await response.text()).includes('noindex, follow'))
    }
    const alias = await get('/over-stef')
    assert.equal(alias.status, 301)
    assert.equal(alias.headers.get('location'), '/agency')
    const slash = await get('/google-ads/?utm_source=test')
    assert.equal(slash.status, 301)
    assert.equal(slash.headers.get('location'), '/google-ads?utm_source=test')
    for (const path of ['/robots.txt', '/sitemap.xml', '/favicon.svg', '/social-cover.png']) assert.equal((await get(path)).status, 200, path)
  } finally {
    server.kill('SIGTERM')
    await once(server, 'exit')
  }
})
