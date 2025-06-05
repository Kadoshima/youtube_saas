'use client';

import React, { useState } from 'react';
import { X, Download, Loader2 } from 'lucide-react';
import { useEditor } from '@/contexts/EditorContext';
import { useFFmpeg } from '@/hooks/useFFmpeg';

interface ExportModalProps {
  onClose: () => void;
}

export default function ExportModal({ onClose }: ExportModalProps) {
  const { videoUrl, cutPoints } = useEditor();
  const { processVideo, isLoading, progress, error } = useFFmpeg();
  const [resolution, setResolution] = useState<'720p' | '1080p'>('1080p');
  const [fps, setFps] = useState<30 | 60>(30);
  const [exportedUrl, setExportedUrl] = useState<string | null>(null);

  const handleExport = async () => {
    if (!videoUrl) return;

    try {
      const response = await fetch(videoUrl);
      const blob = await response.blob();
      const file = new File([blob], 'video.mp4', { type: 'video/mp4' });

      if (cutPoints.length === 0) {
        const result = await processVideo(file, { resolution, fps });
        if (result) {
          const url = URL.createObjectURL(result);
          setExportedUrl(url);
        }
      } else {
        const cutPoint = cutPoints[0];
        const result = await processVideo(file, {
          startTime: cutPoint.startTime,
          endTime: cutPoint.endTime,
          resolution,
          fps,
        });
        if (result) {
          const url = URL.createObjectURL(result);
          setExportedUrl(url);
        }
      }
    } catch (err) {
      console.error('Export failed:', err);
    }
  };

  const handleDownload = () => {
    if (exportedUrl) {
      const a = document.createElement('a');
      a.href = exportedUrl;
      a.download = `edited_video_${Date.now()}.mp4`;
      a.click();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h3 className="text-xl font-semibold text-white">動画をエクスポート</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {!exportedUrl ? (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  解像度
                </label>
                <select
                  value={resolution}
                  onChange={(e) => setResolution(e.target.value as '720p' | '1080p')}
                  className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="720p">720p (HD)</option>
                  <option value="1080p">1080p (Full HD)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  フレームレート
                </label>
                <select
                  value={fps}
                  onChange={(e) => setFps(Number(e.target.value) as 30 | 60)}
                  className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="30">30 FPS</option>
                  <option value="60">60 FPS</option>
                </select>
              </div>

              {cutPoints.length > 0 && (
                <div className="bg-gray-700 rounded-lg p-3">
                  <p className="text-sm text-gray-300">
                    カット: {cutPoints.length}個の編集が適用されます
                  </p>
                </div>
              )}

              {error && (
                <div className="bg-red-500/20 border border-red-500 rounded-lg p-3">
                  <p className="text-sm text-red-400">{error}</p>
                </div>
              )}
            </>
          ) : (
            <div className="text-center space-y-4">
              <div className="text-green-500">
                <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-white">エクスポートが完了しました！</p>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-gray-700">
          {!exportedUrl ? (
            <button
              onClick={handleExport}
              disabled={isLoading || !videoUrl}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:opacity-50 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              {isLoading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  処理中... {progress}%
                </>
              ) : (
                <>
                  <Download size={20} />
                  エクスポート開始
                </>
              )}
            </button>
          ) : (
            <button
              onClick={handleDownload}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <Download size={20} />
              ダウンロード
            </button>
          )}
        </div>
      </div>
    </div>
  );
}