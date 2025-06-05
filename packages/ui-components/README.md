# @youtube-saas/ui-components

Web版とモバイル版で共通利用できるUIコンポーネントライブラリ

## 概要

React/React Native両対応のコンポーネントを提供し、一貫性のあるUIを実現します。

## コンポーネント一覧

### ボタン
- `Button` - 汎用ボタン
- `IconButton` - アイコンボタン
- `FloatingActionButton` - FAB

### フォーム
- `Input` - テキスト入力
- `Select` - 選択ボックス
- `Switch` - トグルスイッチ

### フィードバック
- `Loading` - ローディングインジケーター
- `Progress` - プログレスバー
- `Toast` - トースト通知

### レイアウト
- `Container` - コンテナ
- `Card` - カード
- `Modal` - モーダル

## 使用方法

```tsx
import { Button, Loading } from '@youtube-saas/ui-components';

// Web
<Button variant="primary" onPress={handlePress}>
  動画を作成
</Button>

// Mobile（同じコードが動作）
<Button variant="primary" onPress={handlePress}>
  動画を作成
</Button>
```

## 開発方針

1. **プラットフォーム抽象化**: Web/Mobile の違いを吸収
2. **アクセシビリティ**: WCAG 2.1 AA準拠
3. **パフォーマンス**: 最小限の再レンダリング
4. **型安全**: 完全なTypeScript対応