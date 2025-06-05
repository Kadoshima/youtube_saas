# @youtube-saas/api

YouTubeショート動画作成アプリのAPIサーバー

## 概要

Next.js API Routes を使用した高性能なAPIサーバー。動画処理、YouTube統合、ストレージ管理などのバックエンド機能を提供します。

## 主要機能

- 🎬 YouTube動画メタデータ取得
- 📹 動画処理ジョブ管理
- ☁️ S3/R2ストレージ連携
- 🔐 JWT認証
- 📊 使用状況分析

## 技術スタック

- **Framework**: Next.js 14 (API Routes)
- **Language**: TypeScript
- **Validation**: Zod
- **Auth**: Jose (JWT)
- **Storage**: AWS S3 / Cloudflare R2
- **YouTube**: Google APIs

## API エンドポイント

### 動画関連
- `POST /api/videos/import` - YouTube動画インポート
- `POST /api/videos/process` - 動画処理開始
- `GET /api/videos/:id/status` - 処理状況確認
- `GET /api/videos/:id/download` - ダウンロードURL取得

### テンプレート
- `GET /api/templates` - テンプレート一覧
- `GET /api/templates/:id` - テンプレート詳細

### 認証
- `POST /api/auth/login` - ログイン
- `POST /api/auth/refresh` - トークンリフレッシュ
- `POST /api/auth/logout` - ログアウト

## 環境変数

```env
# API設定
PORT=3001
FRONTEND_URL=http://localhost:3000

# YouTube API
YOUTUBE_API_KEY=your-youtube-api-key

# ストレージ
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
S3_BUCKET=youtube-saas-videos

# 認証
JWT_SECRET=your-jwt-secret
JWT_EXPIRES_IN=7d

# データベース（Phase 2）
DATABASE_URL=postgresql://user:pass@localhost:5432/youtube_saas
```

## 開発コマンド

```bash
# 開発サーバー起動（ポート3001）
pnpm dev

# ビルド
pnpm build

# 型チェック
pnpm type-check

# テスト実行
pnpm test
```

## エラーレスポンス形式

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "エラーメッセージ",
    "details": {}
  }
}
```

## レート制限

- 認証なし: 10リクエスト/分
- 認証あり: 100リクエスト/分
- 動画処理: 10リクエスト/時間

## セキュリティ

- CORS設定済み
- Rate Limiting実装
- Input Validation (Zod)
- JWT認証