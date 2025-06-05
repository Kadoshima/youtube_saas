import { useState, useEffect, useCallback } from 'react';
import ffmpegService from '@/lib/ffmpeg';

interface UseFFmpegReturn {
  isLoading: boolean;
  progress: number;
  error: string | null;
  processVideo: (
    file: File,
    options?: {
      startTime?: number;
      endTime?: number;
      resolution?: '720p' | '1080p';
      fps?: 30 | 60;
    }
  ) => Promise<Blob | null>;
  extractThumbnail: (file: File, time?: number) => Promise<Blob | null>;
}

export function useFFmpeg(): UseFFmpegReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // FFmpegの事前ロード
    ffmpegService.load().catch(console.error);

    // プログレスコールバックの設定
    ffmpegService.setProgress(setProgress);

    return () => {
      // クリーンアップ
      ffmpegService.terminate();
    };
  }, []);

  const processVideo = useCallback(async (
    file: File,
    options?: {
      startTime?: number;
      endTime?: number;
      resolution?: '720p' | '1080p';
      fps?: 30 | 60;
    }
  ): Promise<Blob | null> => {
    setIsLoading(true);
    setError(null);
    setProgress(0);

    try {
      const result = await ffmpegService.processVideo(file, options);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '動画の処理に失敗しました';
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
      setProgress(0);
    }
  }, []);

  const extractThumbnail = useCallback(async (
    file: File,
    time?: number
  ): Promise<Blob | null> => {
    try {
      const result = await ffmpegService.extractThumbnail(file, time);
      return result;
    } catch (err) {
      console.error('Thumbnail extraction error:', err);
      return null;
    }
  }, []);

  return {
    isLoading,
    progress,
    error,
    processVideo,
    extractThumbnail,
  };
}