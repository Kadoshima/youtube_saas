# YouTube ショート動画作成アプリ

5分で作れるプロ品質のショート動画作成アプリケーション

## 🎯 特徴

- **極限のシンプルさ**: 3ステップで動画完成
- **YouTube特化**: URLから直接切り抜き作成
- **マルチプラットフォーム**: Web/iOS/Android対応
- **高速処理**: WebAssemblyによるクライアントサイド処理

## 🚀 クイックスタート

### 前提条件

- Node.js 20.0.0以上
- pnpm 8.0.0以上

### セットアップ

```bash
# 依存関係のインストール
pnpm install

# 環境変数の設定
cp .env.example .env.local
# .env.localを編集して必要な値を設定

# 開発サーバーの起動
pnpm dev
```

### 個別起動

```bash
# Webアプリのみ
pnpm --filter @youtube-saas/web dev

# モバイルアプリのみ
pnpm --filter @youtube-saas/mobile start

# APIサーバーのみ
pnpm --filter @youtube-saas/api dev
```

## 📁 プロジェクト構造

```
youtube_saas/
├── comon_docs/          # プロジェクト共通ドキュメント
├── frontend/
│   ├── web/            # Next.js Webアプリ
│   └── mobile/         # React Native モバイルアプリ
├── backend/
│   ├── api/           # APIサーバー
│   └── services/      # マイクロサービス
├── shared/            # 共有コード
│   ├── types/         # TypeScript型定義
│   ├── utils/         # ユーティリティ関数
│   └── constants/     # 定数
└── packages/          # 内部パッケージ
    ├── ui-components/ # 共有UIコンポーネント
    ├── video-engine/  # 動画処理エンジン
    └── api-client/    # APIクライアント
```

## 🛠 技術スタック

### フロントエンド
- **Web**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Mobile**: React Native, Expo
- **State**: Zustand
- **Video**: FFmpeg.wasm, Konva.js

### バックエンド
- **API**: Next.js API Routes
- **Auth**: JWT (Jose)
- **Storage**: AWS S3 / Cloudflare R2
- **YouTube**: Google APIs

### 開発ツール
- **Monorepo**: pnpm workspaces
- **Build**: Turbo
- **Test**: Vitest, Jest
- **Lint**: ESLint, Prettier

## 📝 開発ガイド

### コミット規約

```
feat: 新機能追加
fix: バグ修正
docs: ドキュメント更新
style: コードスタイル変更
refactor: リファクタリング
test: テスト追加・修正
chore: ビルド・補助ツール変更
```

### ブランチ戦略

- `main`: プロダクション環境
- `develop`: 開発環境
- `feature/*`: 機能開発
- `fix/*`: バグ修正

## 🧪 テスト

```bash
# 全テスト実行
pnpm test

# 特定パッケージのテスト
pnpm --filter @youtube-saas/web test

# テストカバレッジ
pnpm test:coverage
```

## 🚢 デプロイ

### Web (Vercel)

```bash
# プレビューデプロイ
vercel

# プロダクションデプロイ
vercel --prod
```

### Mobile

```bash
# iOS
pnpm --filter @youtube-saas/mobile ios

# Android
pnpm --filter @youtube-saas/mobile android
```

## 📄 ライセンス

このプロジェクトは非公開です。

## 🤝 貢献

内部開発者向けガイドラインは `comon_docs/DEVELOPMENT_RULES.md` を参照してください。

## 📞 サポート

- 技術的な質問: `comon_docs/` 内のドキュメントを確認
- バグ報告: GitHubのIssueを作成

---

Built with ❤️ by YouTube SaaS Team