# Claude Code 最適化ガイドライン

## 概要

このドキュメントは、Claude Codeが最高のパフォーマンスを発揮できるよう設計されたガイドラインです。プロジェクト構造、命名規則、ドキュメント配置など、AIアシスタントが効率的に作業できる環境を整備します。

## 1. プロジェクト構造の最適化

### 1.1 ディレクトリ命名

```
✅ 推奨される命名
- components/video-editor/     # 機能が明確
- services/youtube-api/        # 役割が明確
- utils/video-processing/      # 用途が明確

❌ 避けるべき命名
- components/ve/              # 略語は理解しづらい
- services/handler/           # 汎用的すぎる
- utils/misc/                 # 不明確
```

### 1.2 ファイル配置の一貫性

各機能は以下の構造で統一:
```
feature-name/
├── index.ts                  # Public exports
├── feature-name.tsx          # Main implementation
├── feature-name.types.ts     # Type definitions
├── feature-name.hooks.ts     # Custom hooks
├── feature-name.utils.ts     # Utility functions
└── README.md                 # Feature documentation
```

## 2. コンテキスト情報の提供

### 2.1 ファイルヘッダーコメント

各ファイルの冒頭に目的と依存関係を記載:

```typescript
/**
 * VideoEditor Component
 * 
 * 目的: 動画の編集機能を提供するメインコンポーネント
 * 依存: FFmpeg.wasm, Konva.js
 * 状態管理: Zustand (useVideoEditorStore)
 * 
 * 主要機能:
 * - テキストオーバーレイ
 * - 画像追加
 * - 動画トリミング
 */
```

### 2.2 関数・コンポーネントの説明

```typescript
/**
 * 動画を指定された解像度に変換する
 * @param input - 入力動画ファイル
 * @param resolution - 出力解像度 (e.g., '1080x1920')
 * @returns 処理済み動画のBlob
 * @throws VideoProcessingError - 処理に失敗した場合
 */
export async function convertVideoResolution(
  input: File,
  resolution: string
): Promise<Blob> {
  // 実装
}
```

## 3. 型定義の充実

### 3.1 共有型定義の配置

```typescript
// shared/types/video.ts
export interface VideoMetadata {
  id: string;
  title: string;
  duration: number; // 秒単位
  resolution: {
    width: number;
    height: number;
  };
  format: 'mp4' | 'webm' | 'mov';
  size: number; // バイト単位
}

// 使用例を含める
export const videoMetadataExample: VideoMetadata = {
  id: 'video-123',
  title: 'サンプル動画',
  duration: 60,
  resolution: { width: 1920, height: 1080 },
  format: 'mp4',
  size: 10485760 // 10MB
};
```

### 3.2 エラー型の定義

```typescript
// shared/types/errors.ts
export class VideoProcessingError extends Error {
  constructor(
    message: string,
    public code: VideoErrorCode,
    public details?: unknown
  ) {
    super(message);
    this.name = 'VideoProcessingError';
  }
}

export enum VideoErrorCode {
  INVALID_FORMAT = 'INVALID_FORMAT',
  PROCESSING_FAILED = 'PROCESSING_FAILED',
  MEMORY_EXCEEDED = 'MEMORY_EXCEEDED',
  NETWORK_ERROR = 'NETWORK_ERROR'
}
```

## 4. ドキュメントの整備

### 4.1 README.md テンプレート

各ディレクトリに以下の形式でREADMEを配置:

```markdown
# [機能名]

## 概要
この機能の目的と役割を1-2文で説明。

## 主要コンポーネント
- `ComponentA`: 説明
- `ComponentB`: 説明

## 使用方法
\`\`\`typescript
import { VideoEditor } from './video-editor';

<VideoEditor
  videoUrl="https://example.com/video.mp4"
  onSave={(output) => console.log(output)}
/>
\`\`\`

## 依存関係
- FFmpeg.wasm: 動画処理
- Konva.js: Canvas操作

## 注意事項
- メモリ使用量が大きいため、大きな動画には注意
- WebAssemblyのサポートが必要
```

### 4.2 API仕様書

```typescript
// docs/api/videos.md
# Videos API

## POST /api/videos/process

動画を処理してショート動画形式に変換します。

### リクエスト
\`\`\`json
{
  "videoUrl": "string",
  "options": {
    "startTime": 0,
    "endTime": 60,
    "resolution": "1080x1920",
    "overlays": [
      {
        "type": "text",
        "content": "Hello World",
        "position": { "x": 100, "y": 100 }
      }
    ]
  }
}
\`\`\`

### レスポンス
\`\`\`json
{
  "success": true,
  "data": {
    "processedVideoUrl": "https://cdn.example.com/processed/video-123.mp4",
    "metadata": {
      "duration": 60,
      "size": 10485760
    }
  }
}
\`\`\`
```

## 5. エラーハンドリングパターン

### 5.1 一貫したエラー処理

```typescript
// utils/error-handler.ts
export function handleVideoError(error: unknown): VideoError {
  if (error instanceof VideoProcessingError) {
    return error;
  }
  
  if (error instanceof Error) {
    return new VideoProcessingError(
      error.message,
      VideoErrorCode.PROCESSING_FAILED,
      error
    );
  }
  
  return new VideoProcessingError(
    '不明なエラーが発生しました',
    VideoErrorCode.PROCESSING_FAILED,
    error
  );
}

// 使用例
try {
  const result = await processVideo(input);
} catch (error) {
  const videoError = handleVideoError(error);
  logger.error('Video processing failed', videoError);
  showErrorToast(videoError.message);
}
```

## 6. 検索可能な命名規則

### 6.1 機能ベースの命名

```typescript
// ✅ 良い例: 機能が明確
useVideoEditor()
VideoEditorCanvas
processVideoForShorts()
YouTubeVideoImporter

// ❌ 悪い例: 汎用的すぎる
useEditor()
Canvas
process()
Importer
```

### 6.2 定数の命名

```typescript
// constants/video.ts
export const VIDEO_CONSTRAINTS = {
  MAX_DURATION_SECONDS: 60,
  MAX_FILE_SIZE_MB: 500,
  SUPPORTED_FORMATS: ['mp4', 'mov', 'webm'] as const,
  OUTPUT_RESOLUTION: {
    WIDTH: 1080,
    HEIGHT: 1920
  }
} as const;
```

## 7. テスト可能な設計

### 7.1 依存性注入

```typescript
// services/video-processor.ts
export class VideoProcessor {
  constructor(
    private ffmpeg: FFmpeg,
    private storage: StorageService,
    private logger: Logger
  ) {}
  
  async process(input: File): Promise<ProcessedVideo> {
    this.logger.info('Processing video', { fileName: input.name });
    // 実装
  }
}

// テストでのモック
const mockFFmpeg = createMockFFmpeg();
const mockStorage = createMockStorage();
const mockLogger = createMockLogger();

const processor = new VideoProcessor(mockFFmpeg, mockStorage, mockLogger);
```

## 8. パフォーマンス最適化の明示

### 8.1 重い処理の明示

```typescript
/**
 * 動画をエンコードする（重い処理）
 * 
 * パフォーマンス注意:
 * - 100MBの動画で約30秒かかる
 * - メモリを最大2GB使用する可能性あり
 * - Web Workerでの実行を推奨
 */
export async function encodeVideo(input: VideoData): Promise<EncodedVideo> {
  // 実装
}
```

## 9. デバッグ情報の提供

### 9.1 ログ出力の統一

```typescript
// utils/logger.ts
export const logger = {
  info: (message: string, meta?: Record<string, unknown>) => {
    console.log(`[INFO] ${message}`, meta);
  },
  error: (message: string, error?: unknown) => {
    console.error(`[ERROR] ${message}`, error);
  },
  debug: (message: string, data?: unknown) => {
    if (process.env.NODE_ENV === 'development') {
      console.debug(`[DEBUG] ${message}`, data);
    }
  }
};
```

## 10. 開発ワークフローの最適化

### 10.1 よく使うコマンドのドキュメント化

```bash
# package.json scripts
{
  "scripts": {
    "dev": "turbo dev",
    "dev:web": "pnpm --filter @youtube-saas/web dev",
    "dev:mobile": "pnpm --filter @youtube-saas/mobile dev",
    "test:video": "vitest run src/**/*.video.test.ts",
    "analyze": "ANALYZE=true next build"
  }
}
```

### 10.2 環境構築の簡易化

```bash
# scripts/setup.sh
#!/bin/bash

echo "🚀 YouTube SaaS セットアップを開始します"

# 依存関係のインストール
pnpm install

# 環境変数のコピー
cp .env.example .env.local

# FFmpeg.wasmのダウンロード
pnpm run download:ffmpeg

# 型生成
pnpm run generate:types

echo "✅ セットアップが完了しました"
```

## まとめ

このガイドラインに従うことで:

1. **高速な開発**: Claude Codeが必要な情報に素早くアクセス
2. **一貫性**: プロジェクト全体で統一されたパターン
3. **保守性**: 将来の変更が容易
4. **品質**: エラーが少なく、デバッグが簡単

これらの規則は、Claude Codeとの協働を最大限に活かすために設計されています。