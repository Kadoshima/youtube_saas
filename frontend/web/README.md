# @youtube-saas/web

Web版のYouTubeショート動画作成アプリケーション

## 概要

Next.js 14 (App Router) を使用した高性能なWeb動画編集アプリケーション。Instagram世代向けの直感的なUIで、5分以内にプロ品質のショート動画を作成できます。

## 主要機能

- 🎬 YouTube動画の切り抜き
- 📱 自分の動画からショート作成
- ✨ ワンタップ編集（3つのプリセット）
- 🎨 テキスト・ステッカー追加
- ⚡ WebAssemblyによる高速処理

## 技術スタック

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State**: Zustand
- **Animation**: Framer Motion
- **Video**: FFmpeg.wasm
- **Canvas**: Konva.js

## ディレクトリ構造

```
src/
├── app/              # Next.js App Router
├── components/       # 共通UIコンポーネント
├── features/         # 機能別モジュール
│   ├── video-editor/
│   ├── youtube-import/
│   └── export/
├── hooks/           # カスタムReactフック
├── lib/             # ユーティリティ関数
└── styles/          # グローバルスタイル
```

## 開発コマンド

```bash
# 開発サーバー起動
pnpm dev

# ビルド
pnpm build

# 型チェック
pnpm type-check

# テスト実行
pnpm test
```

## 環境変数

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_YOUTUBE_API_KEY=your-api-key
```

## パフォーマンス目標

- 初期ロード: < 3秒
- 動画処理: リアルタイムの2倍速
- メモリ使用: < 2GB

## 注意事項

- ダークモード専用（ライトモードなし）
- 縦画面専用（横画面非対応）
- Chrome/Edge推奨（WebAssembly必須）