// @vitest-environment jsdom

import { beforeEach, describe, expect, it } from 'vitest'

import { renderPage } from './page'

describe('renderPage', () => {
  let root: HTMLElement

  beforeEach(() => {
    document.body.innerHTML = '<div id="app"></div>'
    root = document.querySelector<HTMLElement>('#app')!
    renderPage(root)
  })

  it('ヒーローでUltra Solのメッセージを伝える', () => {
    const heading = root.querySelector('h1')

    expect(heading?.textContent).toContain('ULTRA')
    expect(heading?.textContent).toContain('SOL')
    expect(root.textContent).toContain('止まるな。')
    expect(root.textContent).toContain('考えろ。')
    expect(root.textContent).toContain('進め！')
  })

  it('公式情報に基づく3つの能力を表示する', () => {
    const cards = root.querySelectorAll('[data-feature-card]')

    expect(cards).toHaveLength(3)
    expect(cards[0]?.textContent).toContain('MAX')
    expect(cards[1]?.textContent).toContain('ULTRA')
    expect(cards[2]?.textContent).toContain('750')
  })

  it('OpenAIとYouTube Musicへ安全に外部遷移できる', () => {
    const openAiLink = root.querySelector<HTMLAnchorElement>('[data-openai-link]')
    const musicLink = root.querySelector<HTMLAnchorElement>('[data-music-link]')
    const externalLinks = [
      ...root.querySelectorAll<HTMLAnchorElement>('a[target="_blank"]'),
    ]

    expect(openAiLink?.href).toBe(
      'https://openai.com/ja-JP/index/previewing-gpt-5-6-sol/',
    )
    expect(musicLink?.href).toContain(
      'music.youtube.com/watch?v=M08WyZ5b4BQ',
    )

    for (const link of [openAiLink, musicLink]) {
      expect(link?.target).toBe('_blank')
      expect(link?.rel).toContain('noopener')
      expect(link?.rel).toContain('noreferrer')
    }

    expect(externalLinks).toHaveLength(6)
    externalLinks.forEach((link) => {
      expect(link.getAttribute('aria-label')).toContain('新しいタブで開く')
      expect(link.rel).toContain('noopener')
      expect(link.rel).toContain('noreferrer')
    })
  })

  it('操作可能なモード切替とライブ領域を用意する', () => {
    const toggle = root.querySelector<HTMLButtonElement>('[data-mode-toggle]')
    const liveRegion = root.querySelector('[data-mode-live]')

    expect(toggle?.type).toBe('button')
    expect(toggle?.getAttribute('aria-pressed')).toBe('false')
    expect(toggle?.getAttribute('aria-controls')).toBe('mode-copy')
    expect(toggle?.getAttribute('aria-label')).toBe('ULTRAモードを切り替える')
    expect(liveRegion?.getAttribute('aria-live')).toBe('polite')
  })

  it('狭い画面でも主要セクションへ移動できる', () => {
    const mobileNav = root.querySelector('[data-mobile-nav]')
    const links = [
      ...mobileNav!.querySelectorAll<HTMLAnchorElement>('a'),
    ].map((link) => link.getAttribute('href'))

    expect(mobileNav?.getAttribute('aria-label')).toBe(
      'モバイル用セクションナビゲーション',
    )
    expect(links).toEqual(['#power', '#mode', '#lineup'])
  })

  it('装飾用ティッカーを支援技術から隠す', () => {
    expect(root.querySelector('.ticker')?.getAttribute('aria-hidden')).toBe(
      'true',
    )
  })

  it('非公式パロディであることを明記する', () => {
    const footer = root.querySelector('footer')

    expect(footer?.textContent).toContain('非公式パロディ')
    expect(footer?.textContent).toContain('OpenAIおよびB’zとは関係ありません')
  })
})
