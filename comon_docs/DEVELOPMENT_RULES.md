# 開発規約

## 基本理念

このプロジェクトでは、Claude Codeを中心とした効率的な開発を実現するため、以下の規約を定めます。

## コーディング規約

### TypeScript

1. **型定義の徹底**
   ```typescript
   // ❌ 悪い例
   const processVideo = (data: any) => { ... }
   
   // ✅ 良い例
   const processVideo = (data: VideoProcessingInput): VideoProcessingOutput => { ... }
   ```

2. **厳格な型チェック**
   ```json
   // tsconfig.json
   {
     "compilerOptions": {
       "strict": true,
       "noImplicitAny": true,
       "strictNullChecks": true
     }
   }
   ```

3. **命名規則**
   - 変数・関数: camelCase
   - 型・インターフェース: PascalCase
   - 定数: UPPER_SNAKE_CASE
   - ファイル名: kebab-case

### React/React Native

1. **コンポーネント構造**
   ```typescript
   // 関数コンポーネントを使用
   export const VideoEditor: React.FC<VideoEditorProps> = ({ videoUrl, onSave }) => {
     // hooks を最上部に
     const [isLoading, setIsLoading] = useState(false);
     const videoRef = useRef<HTMLVideoElement>(null);
     
     // イベントハンドラー
     const handleSave = useCallback(() => {
       // 処理
     }, [onSave]);
     
     // レンダリング
     return (
       <div className="video-editor">
         {/* JSX */}
       </div>
     );
   };
   ```

2. **状態管理**
   - ローカル状態: useState/useReducer
   - グローバル状態: Zustand
   - サーバー状態: TanStack Query (React Query)

3. **パフォーマンス最適化**
   - React.memo for 純粋なコンポーネント
   - useMemo/useCallback for 高価な計算
   - 動的インポートで遅延読み込み

### スタイリング

1. **Tailwind CSS優先**
   ```tsx
   // ✅ 推奨
   <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
   
   // ⚠️ 複雑なスタイルのみCSS Modules
   <div className={styles.complexAnimation}>
   ```

2. **レスポンシブデザイン**
   ```tsx
   <div className="w-full md:w-1/2 lg:w-1/3">
   ```

3. **ダークモード対応**
   ```tsx
   <div className="bg-white dark:bg-gray-900">
   ```

## ファイル構成規約

### コンポーネントファイル

```
components/
├── video-editor/
│   ├── index.ts              # エクスポート
│   ├── video-editor.tsx      # メインコンポーネント
│   ├── video-editor.types.ts # 型定義
│   ├── video-editor.test.tsx # テスト
│   └── video-editor.module.css # スタイル（必要な場合）
```

### フィーチャーベース構造

```
features/
├── video-editing/
│   ├── components/
│   ├── hooks/
│   ├── services/
│   ├── stores/
│   └── types/
```

## API設計規約

### RESTful API

1. **エンドポイント命名**
   ```
   GET    /api/videos          # 一覧取得
   GET    /api/videos/:id      # 個別取得
   POST   /api/videos          # 作成
   PUT    /api/videos/:id      # 更新
   DELETE /api/videos/:id      # 削除
   ```

2. **レスポンス形式**
   ```typescript
   // 成功時
   {
     "success": true,
     "data": { ... },
     "meta": { ... }
   }
   
   // エラー時
   {
     "success": false,
     "error": {
       "code": "VIDEO_NOT_FOUND",
       "message": "指定された動画が見つかりません"
     }
   }
   ```

### GraphQL（将来的な選択肢）

スキーマファーストアプローチで、型安全性を保証。

## エラーハンドリング

### フロントエンド

```typescript
// カスタムエラークラス
class VideoProcessingError extends Error {
  constructor(
    message: string,
    public code: string,
    public details?: unknown
  ) {
    super(message);
    this.name = 'VideoProcessingError';
  }
}

// エラーバウンダリー
<ErrorBoundary fallback={<ErrorFallback />}>
  <VideoEditor />
</ErrorBoundary>
```

### バックエンド

```typescript
// 統一エラーハンドラー
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(err);
  
  if (err instanceof ValidationError) {
    return res.status(400).json({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: err.message,
        details: err.details
      }
    });
  }
  
  // その他のエラー処理
});
```

## テスト規約

### 単体テスト

```typescript
describe('VideoProcessor', () => {
  it('should process video successfully', async () => {
    const input = createMockVideoInput();
    const result = await processVideo(input);
    
    expect(result.status).toBe('completed');
    expect(result.output).toBeDefined();
  });
});
```

### 統合テスト

E2Eテストで主要なユーザーフローをカバー。

## Git規約

### ブランチ戦略

```
main
├── develop
├── feature/video-editor
├── feature/youtube-integration
├── fix/memory-leak
└── hotfix/critical-bug
```

### コミットメッセージ

```
feat: 動画編集機能を追加
fix: メモリリークを修正
docs: READMEを更新
refactor: 動画処理ロジックを最適化
test: VideoEditorのテストを追加
chore: 依存関係を更新
```

## ドキュメント規約

1. **コード内ドキュメント**
   - 複雑なロジックには必ずコメント
   - JSDocで関数の説明
   - TODOコメントには担当者と期限

2. **README.md**
   - セットアップ手順
   - 環境変数の説明
   - よくあるトラブルシューティング

3. **API仕様書**
   - OpenAPI/Swagger形式
   - 使用例の提供

## セキュリティ規約

1. **認証・認可**
   - JWT for API認証
   - Role-based access control

2. **データ保護**
   - 環境変数で機密情報管理
   - HTTPSの強制
   - XSS/CSRF対策

3. **依存関係**
   - 定期的な脆弱性スキャン
   - npm auditの実行

## パフォーマンス規約

1. **バンドルサイズ**
   - 初期ロード < 200KB
   - 遅延読み込みの活用

2. **レンダリング**
   - 仮想スクロール for 長いリスト
   - 画像の遅延読み込み

3. **キャッシング**
   - 適切なHTTPキャッシュヘッダー
   - Service Workerの活用

## Claude Code向け最適化

1. **明確なコンテキスト**
   - 各ファイルの冒頭に目的を記載
   - 関数名は意図を明確に

2. **一貫性**
   - プロジェクト全体で同じパターンを使用
   - 命名規則の統一

3. **検索しやすさ**
   - 機能ごとにファイルを整理
   - 意味のあるファイル名