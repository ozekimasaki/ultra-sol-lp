# Ultra Sol!!! LP Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** GPT-5.6 Solを祝う、高速でアクセシブルな非公式パロディLPを完成させる。

**Architecture:** Vite 8のVanilla TypeScript構成で、静的マークアップ生成と状態を持つインタラクションを分離する。見た目はCSSだけで構築し、外部画像・音源・アニメーションライブラリには依存しない。

**Tech Stack:** Vite 8.x、TypeScript、CSS、Vitest、jsdom

---

## ファイル構成

- `index.html`: SEOメタデータ、アプリのマウント先
- `src/main.ts`: ページ起動と各モジュールの接続
- `src/page.ts`: セマンティックなLPマークアップと静的コンテンツ
- `src/interactions.ts`: モード切替、スクロール進捗、ポインター、表示演出
- `src/style.css`: デザイントークン、レイアウト、アニメーション、レスポンシブ、低減モーション
- `src/page.test.ts`: コンテンツとリンクのDOMテスト
- `src/interactions.test.ts`: 状態ロジックとDOM更新のテスト

### Task 1: Vite 8基盤

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `index.html`

- [ ] **Step 1:** 最新のVite 8.x、TypeScript、Vitest、jsdomを開発依存に定義する
- [ ] **Step 2:** `dev`、`build`、`preview`、`test`、`typecheck`スクリプトを定義する
- [ ] **Step 3:** `npm install`を実行してロックファイルを生成する
- [ ] **Step 4:** `npm run typecheck`が設定ファイルだけで成功することを確認する

### Task 2: ページ構造

**Files:**
- Test: `src/page.test.ts`
- Create: `src/page.ts`

- [ ] **Step 1:** 次の振る舞いを先にテストする

```ts
expect(root.querySelector('h1')?.textContent).toContain('ULTRA SOL')
expect(root.querySelectorAll('[data-feature-card]')).toHaveLength(3)
expect(root.querySelector<HTMLAnchorElement>('[data-music-link]')?.href)
  .toContain('music.youtube.com/watch?v=M08WyZ5b4BQ')
```

- [ ] **Step 2:** テストを実行し、`page.ts`が存在しないため失敗することを確認する
- [ ] **Step 3:** `renderPage(root)`を実装し、ナビゲーション、ヒーロー、能力、モード、ファミリー、CTA、免責を描画する
- [ ] **Step 4:** ページ構造テストが成功することを確認する

### Task 3: インタラクション

**Files:**
- Test: `src/interactions.test.ts`
- Create: `src/interactions.ts`

- [ ] **Step 1:** 進捗値のクランプとMAX / ULTRA切替を先にテストする

```ts
expect(getScrollProgress(50, 100)).toBe(0.5)
expect(getScrollProgress(-10, 100)).toBe(0)
expect(getScrollProgress(150, 100)).toBe(1)
expect(getNextMode('max')).toBe('ultra')
expect(getNextMode('ultra')).toBe('max')
```

- [ ] **Step 2:** テストを実行し、関数が未実装のため失敗することを確認する
- [ ] **Step 3:** 純粋関数と`setupInteractions(document)`を実装する
- [ ] **Step 4:** ボタン操作で`aria-pressed`、コピー、`data-mode`が同期するDOMテストを追加し、失敗を確認する
- [ ] **Step 5:** DOM更新を実装し、全テストが成功することを確認する

### Task 4: ビジュアルと起動

**Files:**
- Create: `src/style.css`
- Create: `src/main.ts`

- [ ] **Step 1:** 色、余白、書体、角丸、罫線のデザイントークンを定義する
- [ ] **Step 2:** ヒーローの太陽、粒子、グリッド、能力カード、モードパネル、CTAを実装する
- [ ] **Step 3:** 768pxと480pxを基準にレスポンシブ調整を行う
- [ ] **Step 4:** `prefers-reduced-motion`、可視フォーカス、スキップリンクを実装する
- [ ] **Step 5:** `main.ts`から描画とインタラクションを起動する

### Task 5: 完了検証

**Files:**
- Verify: all project files

- [ ] **Step 1:** `npm test -- --run`で全テストを実行する
- [ ] **Step 2:** `npm run typecheck`で型エラーがないことを確認する
- [ ] **Step 3:** `npm run build`で本番ビルドを生成する
- [ ] **Step 4:** ローカルサーバーを実ブラウザで開き、デスクトップとモバイルを確認する
- [ ] **Step 5:** コンソールエラー、横スクロール、切れたリンク、操作不能なUIがないことを確認する
