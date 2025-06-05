// Video関連の型定義
export interface Video {
  id: string;
  title: string;
  duration: number; // 秒単位
  thumbnailUrl: string;
  sourceType: 'upload' | 'youtube';
  sourceUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface VideoMetadata {
  resolution: {
    width: number;
    height: number;
  };
  format: 'mp4' | 'webm' | 'mov';
  size: number; // バイト単位
  fps: number;
  bitrate: number;
}

// 動画処理関連
export interface VideoProcessingOptions {
  startTime?: number;
  endTime?: number;
  resolution: '720p' | '1080p';
  fps: 30 | 60;
  format: 'mp4' | 'webm';
  audio: boolean;
  preset: VideoPreset;
}

export type VideoPreset = 'trendy' | 'stylish' | 'cute';

export interface VideoProcessingJob {
  id: string;
  videoId: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number; // 0-100
  options: VideoProcessingOptions;
  resultUrl?: string;
  error?: string;
  createdAt: Date;
  updatedAt: Date;
}

// エディター関連
export interface TextOverlay {
  id: string;
  text: string;
  position: { x: number; y: number };
  fontSize: number;
  fontFamily: string;
  color: string;
  animation?: TextAnimation;
}

export interface TextAnimation {
  type: 'fade-in' | 'slide-up' | 'bounce';
  duration: number;
  delay: number;
}

export interface ImageOverlay {
  id: string;
  url: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  opacity: number;
  rotation: number;
}

export interface EditorState {
  video: Video | null;
  textOverlays: TextOverlay[];
  imageOverlays: ImageOverlay[];
  selectedPreset: VideoPreset;
  isProcessing: boolean;
}

// YouTube関連
export interface YouTubeVideoInfo {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  duration: number;
  channelTitle: string;
  publishedAt: Date;
}

// API関連
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
  };
}

export interface ApiError {
  code: string;
  message: string;
  details?: unknown;
}

// ユーザー関連（Phase 2）
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  plan: 'free' | 'pro';
  createdAt: Date;
}

// テンプレート関連
export interface VideoTemplate {
  id: string;
  name: string;
  description: string;
  thumbnailUrl: string;
  preset: VideoPreset;
  textStyles: Partial<TextOverlay>[];
  category: 'trending' | 'minimal' | 'fun' | 'business';
  isPremium: boolean;
}