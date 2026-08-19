# Ultra Sol!!!

GPT-5.6 Solの登場を、Ultra Soulとの言葉遊びで勝手に祝う非公式パロディLPです。

## Live

https://ultra-sol-lp.maigo999.workers.dev

## 概要

Vite + Vanilla TypeScript で構築した1枚もののランディングページ（LP）です。ページ本体は `src/page.ts` が `#app` へHTMLを描画し、`src/interactions.ts` がスクロール連動・ポインター演出・MAX/ULTRAモード切替などのインタラクションを担います。OGP画像やfaviconなどの静的アセットは SVG 原稿から `scripts/generate-assets.mjs`（Sharp）で生成し、成果物を Cloudflare Workers Static Assets で配信します。

## 主な機能

- 巨大タイポグラフィとCSSによる太陽フレア演出
- スクロール進捗バー・ヘッダーのスクロール状態・ポインター連動グロー
- MAX / ULTRA モードのトグル切替（`data-mode-toggle`）
- モバイル用の固定セクションナビゲーション
- `prefers-reduced-motion`・キーボード・ARIA を考慮したアクセシビリティ対応
- SVG原稿から生成するOGP・favicon・アプリアイコン（192/512含む）
- canonical / OGP / Twitter Card / JSON-LD / sitemap / robots / Web App Manifest 対応
- Cloudflare Workers Static Assets による配信

## 要件

- Node.js 20.19+ または 22.12+（Vite 8 の要件）
- npm

## インストール

```bash
npm install
```

## 使い方

```bash
npm run generate:assets   # SVGからOGP/faviconのPNGを生成
npm run dev               # Vite開発サーバーを起動
```

`build` の前には `prebuild` により `generate:assets` が自動実行されます。

## 開発コマンド

| コマンド | 説明 |
| --- | --- |
| `npm run dev` | Vite開発サーバーを起動 |
| `npm run build` | 本番ビルド（`prebuild` で `generate:assets` を自動実行） |
| `npm run preview` | ビルド成果物をローカルでプレビュー |
| `npm run generate:assets` | `scripts/generate-assets.mjs` でOGP/favicon PNGを生成 |
| `npm run test` | Vitest をウォッチモードで実行 |
| `npm run test:run` | Vitest を一度だけ実行 |
| `npm run typecheck` | `tsc --noEmit` で型チェック |
| `npm run deploy:dry` | ビルド後に `wrangler deploy --dry-run` |
| `npm run deploy` | ビルド後に Cloudflare Workers へデプロイ |

## 構成

```
.
├── index.html                 # エントリHTML（メタ情報・JSON-LD・#app）
├── src/
│   ├── main.ts                # #appへの描画とインタラクション初期化、HMR対応
│   ├── page.ts                # ページ全体のHTMLをrenderPageで描画
│   ├── interactions.ts        # モード切替・スクロール/ポインター演出
│   ├── style.css              # スタイル
│   ├── page.test.ts           # renderPageのテスト
│   ├── interactions.test.ts   # インタラクションのテスト
│   └── seo.test.ts            # SEOメタ・静的アセットのテスト
├── scripts/
│   └── generate-assets.mjs    # SVGからOGP/faviconのPNGを生成（Sharp）
├── public/                    # 静的配信ファイル（favicon/OGP/robots/sitemap/manifest等）
├── docs/superpowers/          # 企画・設計ドキュメント
├── tsconfig.json
├── wrangler.jsonc             # Cloudflare Workers Static Assets設定
└── package.json
```

## デプロイ

Cloudflare Workers Static Assets（`wrangler.jsonc` の `assets.directory` は `./dist`）へデプロイします。

```bash
npm run deploy
```

`wrangler` の認証が必要です。

## ライセンス

個人制作の非公式パロディ作品で、専用のライセンスファイルは含まれていません（`package.json` は `private`）。

## Disclaimer

個人制作の非公式パロディです。OpenAIおよびB’zとは関係ありません。

- [GPT-5.6 Sol公式発表](https://openai.com/ja-JP/index/previewing-gpt-5-6-sol/)
- [ultra soul - YouTube Music](https://music.youtube.com/watch?v=M08WyZ5b4BQ)
