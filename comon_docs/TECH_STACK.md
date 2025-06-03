# 技術スタック詳細

## フロントエンド技術

### Web アプリケーション

#### コアフレームワーク
```json
{
  "next": "^14.0.0",
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "typescript": "^5.3.0"
}
```

**Next.js 14 選定理由:**
- App Router による優れたパフォーマンス
- React Server Components でのサーバーサイドレンダリング
- 画像・フォント最適化の自動化
- Vercelとの完璧な統合

#### 状態管理
```typescript
// Zustand - シンプルで型安全な状態管理
import { create } from 'zustand';

interface VideoEditorStore {
  currentVideo: Video | null;
  isProcessing: boolean;
  setVideo: (video: Video) => void;
  startProcessing: () => void;
}

export const useVideoEditor = create<VideoEditorStore>((set) => ({
  currentVideo: null,
  isProcessing: false,
  setVideo: (video) => set({ currentVideo: video }),
  startProcessing: () => set({ isProcessing: true })
}));
```

#### スタイリング
```json
{
  "tailwindcss": "^3.4.0",
  "tailwind-merge": "^2.0.0",
  "clsx": "^2.0.0"
}
```

**Tailwind CSS 選定理由:**
- 高速な開発
- 一貫性のあるデザインシステム
- パージによる最小バンドルサイズ
- レスポンシブデザインの簡易実装

#### 動画処理
```json
{
  "@ffmpeg/ffmpeg": "^0.12.0",
  "@ffmpeg/core": "^0.12.0",
  "@ffmpeg/util": "^0.12.0"
}
```

**FFmpeg.wasm 実装例:**
```typescript
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/util';

export class VideoProcessor {
  private ffmpeg: FFmpeg;

  constructor() {
    this.ffmpeg = new FFmpeg();
  }

  async initialize() {
    await this.ffmpeg.load({
      coreURL: '/ffmpeg-core.js',
      wasmURL: '/ffmpeg-core.wasm'
    });
  }

  async processVideo(input: File): Promise<Blob> {
    // ファイルを書き込み
    await this.ffmpeg.writeFile('input.mp4', await fetchFile(input));
    
    // 処理実行
    await this.ffmpeg.exec([
      '-i', 'input.mp4',
      '-vf', 'scale=1080:1920',
      '-r', '30',
      'output.mp4'
    ]);
    
    // 結果を読み込み
    const data = await this.ffmpeg.readFile('output.mp4');
    return new Blob([data], { type: 'video/mp4' });
  }
}
```

#### Canvas操作
```json
{
  "konva": "^9.3.0",
  "react-konva": "^18.2.0"
}
```

**Konva.js 実装例:**
```typescript
import { Stage, Layer, Text, Image } from 'react-konva';

export const VideoCanvas: React.FC = () => {
  return (
    <Stage width={1080} height={1920}>
      <Layer>
        <Image image={videoFrame} />
        <Text
          text="Instagram風テキスト"
          fontSize={48}
          fontFamily="Arial"
          fill="white"
          draggable
        />
      </Layer>
    </Stage>
  );
};
```

### モバイルアプリケーション

#### コアフレームワーク
```json
{
  "react-native": "0.73.0",
  "expo": "~50.0.0",
  "@expo/vector-icons": "^14.0.0"
}
```

**React Native + Expo 選定理由:**
- Webとのコード共有最大化
- OTAアップデート
- 豊富なネイティブAPI
- 開発環境構築の簡易化

#### ナビゲーション
```json
{
  "@react-navigation/native": "^6.1.0",
  "@react-navigation/stack": "^6.3.0",
  "@react-navigation/bottom-tabs": "^6.5.0"
}
```

## バックエンド技術

### APIサーバー

#### フレームワーク
```json
{
  "next": "^14.0.0",  // API Routes使用
  "zod": "^3.22.0",   // バリデーション
  "jose": "^5.2.0"    // JWT処理
}
```

**API Routes 実装例:**
```typescript
// app/api/videos/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const VideoSchema = z.object({
  title: z.string().min(1).max(100),
  duration: z.number().positive(),
  sourceUrl: z.string().url().optional()
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = VideoSchema.parse(body);
    
    // 処理ロジック
    const video = await createVideo(validated);
    
    return NextResponse.json({
      success: true,
      data: video
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          details: error.errors
        }
      }, { status: 400 });
    }
    throw error;
  }
}
```

### 外部サービス統合

#### YouTube API
```typescript
// services/youtube.ts
import { google } from 'googleapis';

export class YouTubeService {
  private youtube;

  constructor() {
    this.youtube = google.youtube({
      version: 'v3',
      auth: process.env.YOUTUBE_API_KEY
    });
  }

  async getVideoInfo(videoId: string) {
    const response = await this.youtube.videos.list({
      part: ['snippet', 'contentDetails'],
      id: [videoId]
    });
    
    return response.data.items?.[0];
  }

  async downloadVideo(videoId: string): Promise<Buffer> {
    // ytdl-core または youtube-dl-exec を使用
    // 著作権とAPIポリシーに注意
  }
}
```

#### ストレージ
```json
{
  "@aws-sdk/client-s3": "^3.400.0",
  "@aws-sdk/s3-request-presigner": "^3.400.0"
}
```

**S3実装例:**
```typescript
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export class StorageService {
  private s3: S3Client;

  constructor() {
    this.s3 = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
      }
    });
  }

  async uploadVideo(key: string, body: Buffer) {
    await this.s3.send(new PutObjectCommand({
      Bucket: process.env.S3_BUCKET!,
      Key: key,
      Body: body,
      ContentType: 'video/mp4'
    }));
  }

  async getPresignedUrl(key: string) {
    const command = new GetObjectCommand({
      Bucket: process.env.S3_BUCKET!,
      Key: key
    });
    
    return getSignedUrl(this.s3, command, { expiresIn: 3600 });
  }
}
```

## 開発ツール

### ビルドツール
```json
{
  "turbo": "^1.11.0",
  "tsup": "^8.0.0",
  "esbuild": "^0.19.0"
}
```

**Turbo設定例:**
```json
// turbo.json
{
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "test": {
      "dependsOn": ["build"],
      "outputs": []
    }
  }
}
```

### テスティング
```json
{
  "vitest": "^1.1.0",
  "@testing-library/react": "^14.1.0",
  "@playwright/test": "^1.40.0"
}
```

**Vitest設定:**
```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './test/setup.ts'
  }
});
```

### 品質管理
```json
{
  "eslint": "^8.55.0",
  "prettier": "^3.1.0",
  "husky": "^8.0.0",
  "lint-staged": "^15.2.0"
}
```

## インフラストラクチャ

### ホスティング
- **フロントエンド**: Vercel (Next.js最適化)
- **API**: Vercel Functions / AWS Lambda
- **静的アセット**: Cloudflare R2

### CDN
```typescript
// next.config.js
module.exports = {
  images: {
    loader: 'cloudflare',
    domains: ['cdn.youtube-saas.com']
  },
  assetPrefix: process.env.CDN_URL
};
```

### モニタリング
```json
{
  "@sentry/nextjs": "^7.90.0",
  "@vercel/analytics": "^1.1.0"
}
```

## パフォーマンス最適化

### コード分割
```typescript
// 動的インポート
const VideoEditor = dynamic(() => import('@/components/video-editor'), {
  loading: () => <VideoEditorSkeleton />,
  ssr: false
});
```

### 画像最適化
```typescript
import Image from 'next/image';

<Image
  src="/thumbnail.jpg"
  alt="Video thumbnail"
  width={1920}
  height={1080}
  placeholder="blur"
  priority={false}
/>
```

### WebAssembly最適化
```typescript
// Worker内でFFmpegを実行
const worker = new Worker('/ffmpeg.worker.js');
worker.postMessage({ cmd: 'process', file: videoFile });
```

## セキュリティ

### 認証
```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import { verifyJWT } from '@/lib/auth';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token');
  
  if (!token || !await verifyJWT(token.value)) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: ['/api/videos/:path*', '/dashboard/:path*']
};
```

### 環境変数
```env
# .env.local
NEXT_PUBLIC_API_URL=https://api.youtube-saas.com
YOUTUBE_API_KEY=your-api-key
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
JWT_SECRET=your-jwt-secret
```

## 型定義共有

```typescript
// packages/types/video.ts
export interface Video {
  id: string;
  title: string;
  duration: number;
  thumbnailUrl: string;
  sourceType: 'upload' | 'youtube';
  createdAt: Date;
  updatedAt: Date;
}

export interface VideoProcessingOptions {
  resolution: '720p' | '1080p';
  fps: 30 | 60;
  format: 'mp4' | 'webm';
  audio: boolean;
}
```