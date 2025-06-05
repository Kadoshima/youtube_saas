'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { storage } from '@youtube-saas/utils';
import type { Video } from '@youtube-saas/types';

export default function RecentVideos() {
  const [recentVideos, setRecentVideos] = useState<Video[]>([]);

  useEffect(() => {
    // ローカルストレージから最近の動画を取得
    const videos = storage.get<Video[]>('recent_videos', []);
    setRecentVideos(videos.slice(0, 3)); // 最新3件のみ表示
  }, []);

  if (recentVideos.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="mt-12"
    >
      <h3 className="text-xl font-semibold mb-6 text-white/80">最近の作品</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {recentVideos.map((video, index) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group cursor-pointer"
          >
            <div className="relative aspect-[9/16] rounded-2xl overflow-hidden bg-surface">
              {/* サムネイル */}
              <img
                src={video.thumbnailUrl}
                alt={video.title}
                className="w-full h-full object-cover"
              />
              
              {/* オーバーレイ */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-sm font-medium truncate">{video.title}</p>
                  <p className="text-xs text-white/60 mt-1">
                    {formatDuration(video.duration)}
                  </p>
                </div>
              </div>

              {/* 再生アイコン */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                </div>
              </div>
            </div>
            
            <p className="mt-2 text-sm text-white/60 truncate">{video.title}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}