// アプリケーション設定
export const APP_CONFIG = {
  name: 'YouTube Shorts Creator',
  version: '1.0.0',
  description: '5分で作れるプロ品質のショート動画',
} as const;

// 動画制約
export const VIDEO_CONSTRAINTS = {
  MAX_DURATION_SECONDS: 60,
  MIN_DURATION_SECONDS: 5,
  MAX_FILE_SIZE_MB: 500,
  MAX_FILE_SIZE_BYTES: 500 * 1024 * 1024,
  SUPPORTED_FORMATS: ['mp4', 'mov', 'webm', 'avi', 'mkv'] as const,
  OUTPUT_FORMATS: ['mp4', 'webm'] as const,
} as const;

// 解像度設定
export const RESOLUTIONS = {
  '720p': {
    width: 720,
    height: 1280,
    label: 'HD (720p)',
  },
  '1080p': {
    width: 1080,
    height: 1920,
    label: 'Full HD (1080p)',
  },
} as const;

// エディター設定
export const EDITOR_CONFIG = {
  CANVAS_WIDTH: 1080,
  CANVAS_HEIGHT: 1920,
  DEFAULT_FPS: 30,
  PREVIEW_FPS: 30,
  AUTO_SAVE_INTERVAL: 5000, // 5秒
  MAX_TEXT_OVERLAYS: 10,
  MAX_IMAGE_OVERLAYS: 10,
  MIN_FONT_SIZE: 12,
  MAX_FONT_SIZE: 200,
} as const;

// プリセット設定
export const PRESET_CONFIGS = {
  trendy: {
    name: 'トレンド',
    description: 'TikTok/Reels風のエフェクト',
    icon: '🔥',
    textStyle: {
      fontSize: 48,
      fontFamily: 'Arial Black',
      color: '#FFFFFF',
      strokeColor: '#000000',
      strokeWidth: 2,
    },
  },
  stylish: {
    name: 'スタイリッシュ',
    description: 'ミニマルで洗練された演出',
    icon: '💫',
    textStyle: {
      fontSize: 36,
      fontFamily: 'Helvetica',
      color: '#FFFFFF',
      strokeColor: 'transparent',
      strokeWidth: 0,
    },
  },
  cute: {
    name: 'キュート',
    description: 'ポップで楽しい装飾',
    icon: '✨',
    textStyle: {
      fontSize: 42,
      fontFamily: 'Comic Sans MS',
      color: '#FF69B4',
      strokeColor: '#FFFFFF',
      strokeWidth: 3,
    },
  },
} as const;

// API設定
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  TIMEOUT: 30000, // 30秒
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1秒
} as const;

// エラーコード
export const ERROR_CODES = {
  // 汎用エラー
  UNKNOWN_ERROR: 'UNKNOWN_ERROR',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  NETWORK_ERROR: 'NETWORK_ERROR',
  
  // 動画関連
  VIDEO_NOT_FOUND: 'VIDEO_NOT_FOUND',
  VIDEO_PROCESSING_FAILED: 'VIDEO_PROCESSING_FAILED',
  VIDEO_FORMAT_NOT_SUPPORTED: 'VIDEO_FORMAT_NOT_SUPPORTED',
  VIDEO_TOO_LARGE: 'VIDEO_TOO_LARGE',
  VIDEO_TOO_LONG: 'VIDEO_TOO_LONG',
  
  // YouTube関連
  YOUTUBE_URL_INVALID: 'YOUTUBE_URL_INVALID',
  YOUTUBE_VIDEO_NOT_FOUND: 'YOUTUBE_VIDEO_NOT_FOUND',
  YOUTUBE_VIDEO_PRIVATE: 'YOUTUBE_VIDEO_PRIVATE',
  YOUTUBE_API_ERROR: 'YOUTUBE_API_ERROR',
  
  // 認証関連
  AUTH_REQUIRED: 'AUTH_REQUIRED',
  AUTH_INVALID_TOKEN: 'AUTH_INVALID_TOKEN',
  AUTH_TOKEN_EXPIRED: 'AUTH_TOKEN_EXPIRED',
  
  // ストレージ関連
  STORAGE_UPLOAD_FAILED: 'STORAGE_UPLOAD_FAILED',
  STORAGE_DOWNLOAD_FAILED: 'STORAGE_DOWNLOAD_FAILED',
} as const;

// ローカルストレージキー
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_PREFERENCES: 'user_preferences',
  RECENT_VIDEOS: 'recent_videos',
  DRAFT_PROJECT: 'draft_project',
  SELECTED_PRESET: 'selected_preset',
} as const;

// アニメーション設定
export const ANIMATION_DURATIONS = {
  INSTANT: 0,
  FAST: 100,
  NORMAL: 200,
  SLOW: 300,
  VERY_SLOW: 500,
} as const;

// メモリ制限
export const MEMORY_LIMITS = {
  VIDEO_BUFFER: 500 * 1024 * 1024, // 500MB
  THUMBNAIL_CACHE: 100 * 1024 * 1024, // 100MB
  EFFECTS_CACHE: 200 * 1024 * 1024, // 200MB
  TOTAL_LIMIT: 2 * 1024 * 1024 * 1024, // 2GB
} as const;

// レート制限
export const RATE_LIMITS = {
  API_REQUESTS_PER_MINUTE: 60,
  VIDEO_EXPORTS_PER_HOUR: 10,
  YOUTUBE_IMPORTS_PER_DAY: 50,
} as const;