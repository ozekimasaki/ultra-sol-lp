# AGENTS.md

Ultra Sol!!! リポジトリで作業するコーディングエージェント向けのガイドです。

## プロジェクト概要

Vite + Vanilla TypeScript で構築した1枚もののランディングページ（LP）。ビルド成果物を Cloudflare Workers Static Assets で配信します。フレームワーク（React等）は使用していません。

## 構成とエントリポイント

- `index.html` — エントリHTML。メタ情報・OGP・JSON-LD を含み、`#app` を用意して `src/main.ts` を読み込む。JSはオフでも表示できるよう `<noscript>` フォールバックあり。
- `src/main.ts` — 起点。`#app` を取得して `renderPage` を呼び、`setupInteractions` を初期化。`import.meta.hot` でHMRのクリーンアップに対応。
- `src/page.ts` — `renderPage(root)` がページ全体のHTMLを文字列テンプレートで描画。外部リンク先URLは定数（`OPENAI_URL` / `MUSIC_URL`）で定義。
- `src/interactions.ts` — MAX/ULTRAモード切替（`applyMode` / `getNextMode`）、スクロール進捗（`getScrollProgress`）、ポインター連動、`IntersectionObserver` によるreveal演出。`prefers-reduced-motion` を尊重。
- `src/style.css` — 全スタイル。
- `scripts/generate-assets.mjs` — `public/` の SVG 原稿（`og-ultra-sol.svg` / `favicon.svg`）から Sharp でOGP/favicon の PNG を生成。
- `public/` — 静的配信ファイル（favicon各種・OGP・`robots.txt`・`sitemap.xml`・`manifest.webmanifest`）。
- `docs/superpowers/` — 企画・設計ドキュメント。
- `wrangler.jsonc` — Cloudflare Workers Static Assets 設定（`assets.directory` は `./dist`）。
- `tsconfig.json` — `strict`、`noUnusedLocals`、`noUnusedParameters`、`noFallthroughCasesInSwitch`、`verbatimModuleSyntax` などを有効化。型チェック対象は `src` のみ。

## セットアップ

要件: Node.js 20.19+ または 22.12+（Vite 8 の要件）、npm。

```bash
npm install
npm run generate:assets   # 初回や public のSVG更新時に必要
npm run dev
```

## ビルド / テスト / 型チェック

実在するコマンドのみ（`package.json` の `scripts` 参照）。lint 専用ツール（ESLint/Prettier）や独立した lint スクリプトは設定されていません。

- ビルド: `npm run build`（`prebuild` で `generate:assets` が自動実行される）
- プレビュー: `npm run preview`
- テスト（1回）: `npm run test:run`
- テスト（ウォッチ）: `npm run test`
- 型チェック: `npm run typecheck`（`tsc --noEmit`）
- デプロイ（dry-run）: `npm run deploy:dry`
- デプロイ: `npm run deploy`（`wrangler` 認証が必要）

変更後は最低限 `npm run typecheck` と `npm run test:run` を実行してください。

テストは Vitest + jsdom。`src/*.test.ts` に配置し、DOMを使うファイルは先頭に `// @vitest-environment jsdom` を付けます。`seo.test.ts` は `index.html` や `public/` のアセット・`wrangler.jsonc` の内容も検証するため、これらを変更した際は整合を保つこと。

## コーディング規約

- TypeScript（`strict`）。未使用の変数・引数はエラーになるため残さない。
- `verbatimModuleSyntax` 有効。型のみのインポートは `import type` を使う。
- インデントは2スペース、セミコロンなし、シングルクォート（既存コードに合わせる）。
- import は各ファイル冒頭に置く。
- 副作用のあるインポート（例: `import './style.css'`）を除き、モジュールは純粋な関数として書く（`interactions.ts` のように単体テストしやすい形を維持）。
- UIコピーやコメントは日本語主体。既存のトーンに合わせる。
- アクセシビリティを維持: ARIA属性・`aria-label`・`prefers-reduced-motion` への配慮を壊さない。

## 注意点

- `public/` の PNG はコミットされているが、SVG から生成される派生物。SVG原稿を変更したら `npm run generate:assets` で再生成する。
- サイトの正規URL（`https://ultra-sol-lp.maigo999.workers.dev/`）は `index.html`・`public/robots.txt`・`public/sitemap.xml`・`public/manifest.webmanifest` に散在し、`seo.test.ts` で一貫性が検証される。URLを変える場合はすべて揃える。
- pre-commit フック / husky・ESLint・Prettier の設定は存在しない。
- ローカルの `node_modules` は git 管理外（`dist/`・`.wrangler/`・`.env*` なども同様）。
