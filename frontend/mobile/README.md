# @youtube-saas/mobile

iOS/Android版のYouTubeショート動画作成アプリケーション

## 概要

React Native + Expo を使用したモバイル動画編集アプリケーション。Web版と同じ直感的なUIを、ネイティブアプリとして提供します。

## 主要機能

- 📱 カメラロールからの動画選択
- 🎬 YouTube動画の切り抜き（URLコピー対応）
- ✨ ワンタップ編集（3つのプリセット）
- 🎨 テキスト・ステッカー追加
- 💾 カメラロールへの保存

## 技術スタック

- **Framework**: React Native + Expo
- **Language**: TypeScript
- **Navigation**: React Navigation
- **State**: Zustand
- **Video**: expo-av
- **Camera**: expo-camera

## ディレクトリ構造

```
src/
├── components/      # 共通UIコンポーネント
├── features/        # 機能別モジュール
│   ├── video-editor/
│   ├── youtube-import/
│   └── export/
├── hooks/          # カスタムReactフック
├── navigation/     # ナビゲーション設定
├── screens/        # 画面コンポーネント
├── services/       # APIクライアント等
├── styles/         # スタイル定義
└── utils/          # ユーティリティ関数
```

## 開発コマンド

```bash
# 開発サーバー起動
pnpm start

# iOS シミュレーター
pnpm ios

# Android エミュレーター
pnpm android

# 型チェック
pnpm type-check

# テスト実行
pnpm test
```

## 環境設定

1. Expo CLIのインストール
```bash
npm install -g expo-cli
```

2. iOS開発（Mac必須）
- Xcode インストール
- iOS Simulator 設定

3. Android開発
- Android Studio インストール
- エミュレーター設定

## デバイス権限

- カメラアクセス
- フォトライブラリ読み取り/書き込み
- ハプティックフィードバック

## パフォーマンス目標

- 起動時間: < 2秒
- 画面遷移: < 200ms
- メモリ使用: < 800MB

## 注意事項

- 縦画面専用（横画面ロック）
- ダークモード専用
- タブレット非対応（スマートフォン最適化）