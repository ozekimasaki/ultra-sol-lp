// @vitest-environment jsdom

import { access, readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

import sharp from 'sharp'
import { beforeAll, describe, expect, it } from 'vitest'

const SITE_URL = 'https://ultra-sol-lp.maigo999.workers.dev/'
const projectFile = (path: string): string => resolve(process.cwd(), path)

describe('SEO metadata', () => {
  let document: Document

  beforeAll(async () => {
    const html = await readFile(projectFile('index.html'), 'utf8')
    document = new DOMParser().parseFromString(html, 'text/html')
  })

  it('検索エンジン向けの正規URLとクロール指示を提供する', () => {
    const description = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]',
    )
    const robots = document.querySelector<HTMLMetaElement>(
      'meta[name="robots"]',
    )
    const canonical = document.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    )

    expect(document.documentElement.lang).toBe('ja')
    expect(document.title).toContain('Ultra Sol!!!')
    expect(description?.content).toContain('GPT-5.6 Sol')
    const robotTokens =
      robots?.content.split(',').map((token) => token.trim()) ?? []

    expect(robotTokens).toContain('index')
    expect(robotTokens).not.toContain('noindex')
    expect(robotTokens).toContain('max-image-preview:large')
    expect(canonical?.href).toBe(SITE_URL)
  })

  it('OGPとTwitterカードへ絶対URLのPNG画像を指定する', () => {
    const meta = (selector: string): string | undefined =>
      document.querySelector<HTMLMetaElement>(selector)?.content

    expect(meta('meta[property="og:url"]')).toBe(SITE_URL)
    expect(meta('meta[property="og:site_name"]')).toBe('Ultra Sol!!!')
    expect(meta('meta[property="og:image"]')).toBe(
      `${SITE_URL}og-ultra-sol.png`,
    )
    expect(meta('meta[property="og:image:type"]')).toBe('image/png')
    expect(meta('meta[property="og:image:width"]')).toBe('1200')
    expect(meta('meta[property="og:image:height"]')).toBe('630')
    expect(meta('meta[property="og:image:alt"]')).toContain('Ultra Sol')
    expect(meta('meta[name="twitter:card"]')).toBe('summary_large_image')
    expect(meta('meta[name="twitter:image"]')).toBe(
      `${SITE_URL}og-ultra-sol.png`,
    )
    expect(meta('meta[name="twitter:image:alt"]')).toContain('Ultra Sol')
  })

  it('favicon・Appleアイコン・Web App Manifestを関連付ける', () => {
    expect(
      document.querySelector<HTMLLinkElement>(
        'link[rel="icon"][type="image/svg+xml"]',
      )?.href,
    ).toContain('/favicon.svg')
    expect(
      document.querySelector<HTMLLinkElement>(
        'link[rel="apple-touch-icon"]',
      )?.getAttribute('sizes'),
    ).toBe('180x180')
    expect(
      document.querySelector<HTMLLinkElement>('link[rel="manifest"]')?.href,
    ).toContain('/manifest.webmanifest')
  })

  it('ページ内容と一致するJSON-LDを提供する', () => {
    const scripts = [
      ...document.querySelectorAll<HTMLScriptElement>(
        'script[type="application/ld+json"]',
      ),
    ]

    expect(scripts).toHaveLength(1)

    const data = JSON.parse(scripts[0]!.textContent ?? '{}') as {
      '@graph'?: Array<Record<string, unknown>>
    }
    const graph = data['@graph'] ?? []
    const website = graph.find((item) => item['@type'] === 'WebSite')
    const webPage = graph.find((item) => item['@type'] === 'WebPage')

    expect(website?.url).toBe(SITE_URL)
    expect(website?.name).toBe('Ultra Sol!!!')
    expect(webPage?.url).toBe(SITE_URL)
    expect(webPage?.image).toBe(`${SITE_URL}og-ultra-sol.png`)
    expect(webPage?.inLanguage).toBe('ja-JP')
  })
})

describe('SEO static assets', () => {
  it('OGPとfaviconのSVG原稿およびPNG派生画像を生成する', async () => {
    const expectedFiles = [
      'public/og-ultra-sol.svg',
      'public/og-ultra-sol.png',
      'public/favicon.svg',
      'public/favicon-16x16.png',
      'public/favicon-32x32.png',
      'public/apple-touch-icon.png',
      'public/icon-192.png',
      'public/icon-512.png',
    ]

    await Promise.all(
      expectedFiles.map((path) => expect(access(projectFile(path))).resolves.toBeUndefined()),
    )

    const ogSvg = await readFile(projectFile('public/og-ultra-sol.svg'), 'utf8')
    const faviconSvg = await readFile(projectFile('public/favicon.svg'), 'utf8')
    const ogMetadata = await sharp(
      projectFile('public/og-ultra-sol.png'),
    ).metadata()
    const faviconMetadata = await sharp(
      projectFile('public/icon-512.png'),
    ).metadata()

    expect(ogSvg).toContain('viewBox="0 0 1200 630"')
    expect(faviconSvg).toContain('viewBox="0 0 512 512"')
    expect(ogSvg).not.toMatch(/<text\b/)
    expect(faviconSvg).not.toMatch(/<text\b/)
    expect(ogMetadata).toMatchObject({
      format: 'png',
      width: 1200,
      height: 630,
    })
    expect(faviconMetadata).toMatchObject({
      format: 'png',
      width: 512,
      height: 512,
    })
  })

  it('全favicon派生画像を指定寸法で生成する', async () => {
    const targets = [
      { path: 'public/favicon-16x16.png', size: 16 },
      { path: 'public/favicon-32x32.png', size: 32 },
      { path: 'public/apple-touch-icon.png', size: 180 },
      { path: 'public/icon-192.png', size: 192 },
      { path: 'public/icon-512.png', size: 512 },
    ]

    await Promise.all(
      targets.map(async ({ path, size }) => {
        const metadata = await sharp(projectFile(path)).metadata()

        expect(metadata).toMatchObject({
          format: 'png',
          width: size,
          height: size,
        })
      }),
    )
  })

  it('robots・sitemap・manifestで正規URLを一貫させる', async () => {
    const [robots, sitemap, manifestSource] = await Promise.all([
      readFile(projectFile('public/robots.txt'), 'utf8'),
      readFile(projectFile('public/sitemap.xml'), 'utf8'),
      readFile(projectFile('public/manifest.webmanifest'), 'utf8'),
    ])
    const manifest = JSON.parse(manifestSource) as {
      id?: string
      start_url?: string
      icons?: Array<{ src: string; sizes: string }>
    }

    expect(robots).toContain('User-agent: *')
    expect(robots).toContain('Allow: /')
    expect(robots).toContain(`${SITE_URL}sitemap.xml`)
    expect(sitemap).toContain(`<loc>${SITE_URL}</loc>`)
    expect(manifest.id).toBe('/')
    expect(manifest.start_url).toBe('/')
    expect(manifest.icons).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ src: '/icon-192.png', sizes: '192x192' }),
        expect.objectContaining({ src: '/icon-512.png', sizes: '512x512' }),
      ]),
    )
  })

  it('存在しないURLをsoft 404としてindex.htmlへ転送しない', async () => {
    const configSource = await readFile(projectFile('wrangler.jsonc'), 'utf8')
    const config = JSON.parse(configSource) as {
      assets?: { not_found_handling?: string }
    }

    expect(config.assets?.not_found_handling).toBeUndefined()
  })
})
