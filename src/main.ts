import './style.css'

import { setupInteractions } from './interactions'
import { renderPage } from './page'

const root = document.querySelector<HTMLElement>('#app')

if (!root) {
  throw new Error('Ultra Solの描画先 #app が見つかりません。')
}

renderPage(root)

const cleanupInteractions = setupInteractions(document, window)

if (import.meta.hot) {
  import.meta.hot.dispose(cleanupInteractions)
}
