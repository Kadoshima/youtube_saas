# プロジェクト構造

## 概要

このプロジェクトは、フロントエンドとバックエンドを単一リポジトリで管理するモノレポ構造を採用しています。これにより、コードの共有、一貫性の維持、開発効率の向上を実現します。

## ディレクトリ構造

```
youtube_saas/
├── comon_docs/           # 共通ドキュメント
│   ├── PROJECT_STRUCTURE.md
│   ├── DEVELOPMENT_RULES.md
│   ├── TECH_STACK.md
│   └── CLAUDE_CODE_GUIDE.md
│
├── frontend/             # フロントエンドアプリケーション
│   ├── web/             # Next.js Webアプリケーション
│   │   ├── src/
│   │   ├── public/
│   │   ├── package.json
│   │   └── README.md
│   │
│   └── mobile/          # React Native モバイルアプリケーション
│       ├── src/
│       ├── android/
│       ├── ios/
│       ├── package.json
│       └── README.md
│
├── backend/             # バックエンドアプリケーション
│   ├── api/            # APIサーバー
│   │   ├── src/
│   │   ├── package.json
│   │   └── README.md
│   │
│   └── services/       # マイクロサービス
│       ├── video-processing/
│       ├── youtube-integration/
│       └── storage/
│
├── shared/              # 共有コード
│   ├── types/          # TypeScript型定義
│   ├── utils/          # 共通ユーティリティ
│   └── constants/      # 共通定数
│
├── packages/            # 内部パッケージ
│   ├── ui-components/  # 共有UIコンポーネント
│   ├── video-engine/   # 動画処理エンジン
│   └── api-client/     # APIクライアント
│
├── scripts/            # ビルド・デプロイスクリプト
├── docs/              # プロジェクトドキュメント
└── package.json       # ルートpackage.json（workspaces設定）
```

## 各ディレクトリの役割

### comon_docs/
プロジェクト全体の設計方針、開発ルール、技術仕様を集約。Claude Codeが効率的に開発できるよう、必要な情報を一元管理。

### frontend/
- **web/**: Next.js 14+ App Routerを使用したWebアプリケーション
- **mobile/**: React Native + Expoを使用したiOS/Androidアプリケーション

### backend/
- **api/**: Next.js API RoutesまたはスタンドアロンのNode.jsサーバー
- **services/**: 特定機能に特化したマイクロサービス群

### shared/
フロントエンドとバックエンドで共有される型定義、ユーティリティ、定数を管理。

### packages/
内部npm パッケージとして管理される再利用可能なコード。
- **ui-components/**: React/React Native共通コンポーネント
- **video-engine/**: FFmpeg.wasmを使用した動画処理ロジック
- **api-client/**: 型安全なAPIクライアント

## モノレポ管理

### パッケージマネージャー
- **pnpm**: 高速で効率的な依存関係管理
- **workspaces**: パッケージ間の依存関係を自動解決

### ビルドツール
- **Turbo**: 並列ビルドとキャッシングによる高速化
- **tsup**: TypeScriptパッケージの高速ビルド

## 開発フロー

1. **機能開発時の流れ**
   ```bash
   # ルートディレクトリから
   pnpm install
   pnpm dev  # すべてのアプリケーションを起動
   ```

2. **個別アプリケーションの起動**
   ```bash
   pnpm --filter @youtube-saas/web dev
   pnpm --filter @youtube-saas/mobile dev
   pnpm --filter @youtube-saas/api dev
   ```

3. **共通コンポーネント開発**
   ```bash
   # packages/ui-components/で開発
   pnpm --filter @youtube-saas/ui-components dev
   ```

## Claude Code最適化ポイント

1. **明確なディレクトリ構造**: 各機能の配置場所が一目瞭然
2. **詳細なREADME**: 各ディレクトリにコンテキスト情報を配置
3. **型定義の一元管理**: shared/types/で型の不整合を防止
4. **自動化スクリプト**: よく使うコマンドをscripts/に集約

## ベストプラクティス

1. **新機能追加時**
   - 適切なディレクトリに配置
   - 関連ドキュメントの更新
   - 型定義の追加（必要に応じて）

2. **コード共有**
   - UI: packages/ui-components/
   - ロジック: shared/utils/
   - 型: shared/types/

3. **ドキュメント更新**
   - 実装と同時にREADMEを更新
   - API変更時は仕様書も更新