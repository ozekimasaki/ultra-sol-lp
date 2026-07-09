// @vitest-environment jsdom

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import {
  applyMode,
  getNextMode,
  getScrollProgress,
  setupInteractions,
} from './interactions'
import { renderPage } from './page'

describe('getScrollProgress', () => {
  it('現在位置を0から1の範囲へ変換する', () => {
    expect(getScrollProgress(50, 100)).toBe(0.5)
    expect(getScrollProgress(-10, 100)).toBe(0)
    expect(getScrollProgress(150, 100)).toBe(1)
  })

  it('スクロール余地がない場合は0を返す', () => {
    expect(getScrollProgress(10, 0)).toBe(0)
    expect(getScrollProgress(10, -1)).toBe(0)
  })
})

describe('getNextMode', () => {
  it('maxとultraを交互に返す', () => {
    expect(getNextMode('max')).toBe('ultra')
    expect(getNextMode('ultra')).toBe('max')
  })
})

describe('mode interactions', () => {
  let root: HTMLElement
  let activeCleanup: (() => void) | undefined
  const originalProperties = [
    {
      target: window,
      key: 'IntersectionObserver',
      descriptor: Object.getOwnPropertyDescriptor(window, 'IntersectionObserver'),
    },
    {
      target: window,
      key: 'matchMedia',
      descriptor: Object.getOwnPropertyDescriptor(window, 'matchMedia'),
    },
    {
      target: window,
      key: 'innerHeight',
      descriptor: Object.getOwnPropertyDescriptor(window, 'innerHeight'),
    },
    {
      target: window,
      key: 'scrollY',
      descriptor: Object.getOwnPropertyDescriptor(window, 'scrollY'),
    },
    {
      target: document.documentElement,
      key: 'scrollHeight',
      descriptor: Object.getOwnPropertyDescriptor(
        document.documentElement,
        'scrollHeight',
      ),
    },
  ]

  beforeEach(() => {
    activeCleanup = undefined
    document.documentElement.removeAttribute('data-mode')
    document.body.innerHTML = '<div id="app"></div>'
    root = document.querySelector<HTMLElement>('#app')!
    renderPage(root)
  })

  afterEach(() => {
    activeCleanup?.()
    originalProperties.forEach(({ target, key, descriptor }) => {
      if (descriptor) {
        Object.defineProperty(target, key, descriptor)
      } else {
        Reflect.deleteProperty(target, key)
      }
    })
    document.documentElement.style.removeProperty('--pointer-x')
    document.documentElement.style.removeProperty('--pointer-y')
    vi.restoreAllMocks()
  })

  const setup = (): (() => void) => {
    activeCleanup = setupInteractions(document, window)
    return activeCleanup
  }

  it('ULTRAモードの表示と支援技術向け状態を同期する', () => {
    applyMode(document, 'ultra')

    const panel = document.querySelector<HTMLElement>('[data-mode-panel]')
    const toggle = document.querySelector<HTMLButtonElement>('[data-mode-toggle]')

    expect(document.documentElement.dataset.mode).toBe('ultra')
    expect(panel?.dataset.mode).toBe('ultra')
    expect(toggle?.getAttribute('aria-pressed')).toBe('true')
    expect(document.querySelector('[data-mode-label]')?.textContent).toBe(
      'ULTRA ORCHESTRATION',
    )
    expect(document.querySelector('[data-mode-heading]')?.textContent).toContain(
      '束になれ',
    )
    expect(document.querySelector('[data-mode-button-label]')?.textContent).toBe(
      'MAX',
    )
  })

  it('クリックするたびにモードを切り替える', () => {
    const cleanup = setup()
    const toggle = document.querySelector<HTMLButtonElement>('[data-mode-toggle]')!

    toggle.click()
    expect(document.documentElement.dataset.mode).toBe('ultra')

    toggle.click()
    expect(document.documentElement.dataset.mode).toBe('max')

    cleanup()
  })

  it('スクロール進捗とヘッダー状態を更新する', () => {
    Object.defineProperty(document.documentElement, 'scrollHeight', {
      configurable: true,
      value: 1500,
    })
    Object.defineProperty(window, 'innerHeight', {
      configurable: true,
      value: 500,
    })
    Object.defineProperty(window, 'scrollY', {
      configurable: true,
      value: 500,
    })

    const cleanup = setup()
    window.dispatchEvent(new Event('scroll'))

    const progress = document.querySelector<HTMLElement>('[data-scroll-progress]')
    const header = document.querySelector<HTMLElement>('[data-header]')

    expect(progress?.style.transform).toBe('scaleX(0.5)')
    expect(header?.classList.contains('is-scrolled')).toBe(true)

    cleanup()
  })

  it('画面サイズ変更時にスクロール進捗を再計算する', () => {
    Object.defineProperty(document.documentElement, 'scrollHeight', {
      configurable: true,
      value: 1500,
    })
    Object.defineProperty(window, 'innerHeight', {
      configurable: true,
      value: 500,
    })
    Object.defineProperty(window, 'scrollY', {
      configurable: true,
      value: 500,
    })
    const cleanup = setup()
    const progress = document.querySelector<HTMLElement>('[data-scroll-progress]')

    expect(progress?.style.transform).toBe('scaleX(0.5)')

    Object.defineProperty(window, 'innerHeight', {
      configurable: true,
      value: 1000,
    })
    window.dispatchEvent(new Event('resize'))

    expect(progress?.style.transform).toBe('scaleX(1)')

    cleanup()
  })

  it('IntersectionObserver非対応でもコンテンツを表示する', () => {
    Object.defineProperty(window, 'IntersectionObserver', {
      configurable: true,
      value: undefined,
    })

    const cleanup = setup()

    expect(
      [...document.querySelectorAll('.reveal-item')].every((element) =>
        element.classList.contains('is-visible'),
      ),
    ).toBe(true)

    cleanup()
  })

  it('表示領域へ入った要素だけを表示して監視を解除する', () => {
    let observerCallback: IntersectionObserverCallback | undefined
    const observe = vi.fn()
    const unobserve = vi.fn()
    const disconnect = vi.fn()

    class FakeIntersectionObserver {
      constructor(callback: IntersectionObserverCallback) {
        observerCallback = callback
      }

      observe = observe
      unobserve = unobserve
      disconnect = disconnect
    }

    Object.defineProperty(window, 'IntersectionObserver', {
      configurable: true,
      value: FakeIntersectionObserver,
    })
    const cleanup = setup()
    const firstItem = document.querySelector<HTMLElement>('.reveal-item')!

    expect(observe).toHaveBeenCalledTimes(
      document.querySelectorAll('.reveal-item').length,
    )

    observerCallback?.(
      [
        {
          isIntersecting: true,
          target: firstItem,
        } as unknown as IntersectionObserverEntry,
      ],
      {} as IntersectionObserver,
    )

    expect(firstItem.classList.contains('is-visible')).toBe(true)
    expect(unobserve).toHaveBeenCalledWith(firstItem)

    cleanup()
    expect(disconnect).toHaveBeenCalledOnce()
  })

  it('低減モーション設定では追従と監視を行わず即時表示する', () => {
    const observer = vi.fn()
    Object.defineProperty(window, 'matchMedia', {
      configurable: true,
      value: vi.fn().mockReturnValue({ matches: true }),
    })
    Object.defineProperty(window, 'IntersectionObserver', {
      configurable: true,
      value: observer,
    })
    const cleanup = setup()

    window.dispatchEvent(
      new MouseEvent('pointermove', { clientX: 120, clientY: 240 }),
    )

    expect(observer).not.toHaveBeenCalled()
    expect(
      [...document.querySelectorAll('.reveal-item')].every((element) =>
        element.classList.contains('is-visible'),
      ),
    ).toBe(true)
    expect(
      document.documentElement.style.getPropertyValue('--pointer-x'),
    ).toBe('')

    cleanup()
  })

  it('cleanup後はモードを変更しない', () => {
    const cleanup = setup()
    const toggle = document.querySelector<HTMLButtonElement>('[data-mode-toggle]')!

    cleanup()
    toggle.click()

    expect(document.documentElement.dataset.mode).toBe('max')
  })

  it('ポインター位置をCSS変数へ反映する', () => {
    Object.defineProperty(window, 'matchMedia', {
      configurable: true,
      value: vi.fn().mockReturnValue({ matches: false }),
    })
    const cleanup = setup()
    const event = new MouseEvent('pointermove', {
      clientX: 120,
      clientY: 240,
    })

    window.dispatchEvent(event)

    expect(document.documentElement.style.getPropertyValue('--pointer-x')).toBe(
      '120px',
    )
    expect(document.documentElement.style.getPropertyValue('--pointer-y')).toBe(
      '240px',
    )

    cleanup()
  })
})
