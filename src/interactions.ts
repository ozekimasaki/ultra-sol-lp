export type SolMode = 'max' | 'ultra'

type ModeContent = {
  label: string
  heading: string
  description: string
  temperature: string
}

type BrowserWindow = Window & {
  IntersectionObserver?: typeof IntersectionObserver
}

const MODE_CONTENT: Record<SolMode, ModeContent> = {
  max: {
    label: 'MAX REASONING',
    heading: '深さに、上限をつくらない。',
    description:
      '難しい問いほど、急がない。計画し、試し、見直し、答えの芯まで潜っていく。',
    temperature: '5,600 K',
  },
  ultra: {
    label: 'ULTRA ORCHESTRATION',
    heading: 'ひとりで進むな。束になれ。',
    description:
      '複雑な仕事をサブエージェントへ。並列に走り、知見を束ね、ひとつの答えへ突き抜ける。',
    temperature: '9,999 K',
  },
}

export function getScrollProgress(
  scrollPosition: number,
  maxScrollable: number,
): number {
  if (maxScrollable <= 0) {
    return 0
  }

  return Math.min(Math.max(scrollPosition / maxScrollable, 0), 1)
}

export function getNextMode(mode: SolMode): SolMode {
  switch (mode) {
    case 'max':
      return 'ultra'
    case 'ultra':
      return 'max'
    default: {
      const exhaustiveCheck: never = mode
      return exhaustiveCheck
    }
  }
}

export function applyMode(document: Document, mode: SolMode): void {
  const content = MODE_CONTENT[mode]
  const panel = document.querySelector<HTMLElement>('[data-mode-panel]')
  const toggle = document.querySelector<HTMLButtonElement>('[data-mode-toggle]')
  const label = document.querySelector<HTMLElement>('[data-mode-label]')
  const heading = document.querySelector<HTMLElement>('[data-mode-heading]')
  const description = document.querySelector<HTMLElement>(
    '[data-mode-description]',
  )
  const temperature = document.querySelector<HTMLElement>(
    '[data-mode-temperature]',
  )
  const buttonLabel = document.querySelector<HTMLElement>(
    '[data-mode-button-label]',
  )

  document.documentElement.dataset.mode = mode

  if (panel) {
    panel.dataset.mode = mode
  }

  if (toggle) {
    toggle.setAttribute('aria-pressed', String(mode === 'ultra'))
  }

  if (label) {
    label.textContent = content.label
  }

  if (heading) {
    heading.textContent = content.heading
  }

  if (description) {
    description.textContent = content.description
  }

  if (temperature) {
    temperature.textContent = content.temperature
  }

  if (buttonLabel) {
    buttonLabel.textContent = getNextMode(mode).toUpperCase()
  }
}

export function setupInteractions(
  document: Document,
  window: Window,
): () => void {
  const modeToggle =
    document.querySelector<HTMLButtonElement>('[data-mode-toggle]')
  const modePanel =
    document.querySelector<HTMLElement>('[data-mode-panel]')
  const progress =
    document.querySelector<HTMLElement>('[data-scroll-progress]')
  const header = document.querySelector<HTMLElement>('[data-header]')
  const revealItems = [
    ...document.querySelectorAll<HTMLElement>('.reveal-item'),
  ]
  const reducedMotion =
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const Observer = (window as BrowserWindow).IntersectionObserver

  applyMode(document, 'max')

  const handleModeToggle = (): void => {
    const currentMode: SolMode =
      modePanel?.dataset.mode === 'ultra' ? 'ultra' : 'max'
    applyMode(document, getNextMode(currentMode))
  }

  const handleScroll = (): void => {
    const maxScrollable =
      document.documentElement.scrollHeight - window.innerHeight
    const value = getScrollProgress(window.scrollY, maxScrollable)

    if (progress) {
      progress.style.transform = `scaleX(${value})`
    }

    header?.classList.toggle('is-scrolled', window.scrollY > 40)
  }

  const handlePointerMove = (event: Event): void => {
    if (!(event instanceof MouseEvent)) {
      return
    }

    document.documentElement.style.setProperty(
      '--pointer-x',
      `${event.clientX}px`,
    )
    document.documentElement.style.setProperty(
      '--pointer-y',
      `${event.clientY}px`,
    )
  }

  modeToggle?.addEventListener('click', handleModeToggle)
  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('resize', handleScroll, { passive: true })

  if (!reducedMotion) {
    window.addEventListener('pointermove', handlePointerMove, { passive: true })
  }

  let observer: IntersectionObserver | undefined

  if (reducedMotion || typeof Observer !== 'function') {
    revealItems.forEach((item) => item.classList.add('is-visible'))
  } else {
    observer = new Observer(
      (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return
          }

          entry.target.classList.add('is-visible')
          observer?.unobserve(entry.target)
        })
      },
      {
        rootMargin: '0px 0px -10%',
        threshold: 0.12,
      },
    )

    revealItems.forEach((item, index) => {
      item.style.setProperty('--reveal-delay', `${(index % 3) * 80}ms`)
      observer?.observe(item)
    })
  }

  handleScroll()

  return () => {
    modeToggle?.removeEventListener('click', handleModeToggle)
    window.removeEventListener('scroll', handleScroll)
    window.removeEventListener('resize', handleScroll)
    window.removeEventListener('pointermove', handlePointerMove)
    observer?.disconnect()
  }
}
