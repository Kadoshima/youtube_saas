'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import VideoSourceSelector from '@/components/home/VideoSourceSelector';
import RecentVideos from '@/components/home/RecentVideos';

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* ヘッダー */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 border-b border-white/10"
      >
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            YouTube Shorts Creator
          </h1>
          <p className="text-sm text-white/60 mt-1">5分で作れるプロ品質のショート動画</p>
        </div>
      </motion.header>

      {/* メインコンテンツ */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-3xl font-bold text-center mb-12">
            どちらから動画を作成しますか？
          </h2>

          <VideoSourceSelector isLoading={isLoading} setIsLoading={setIsLoading} />

          <RecentVideos />
        </motion.div>
      </main>

      {/* フッター */}
      <footer className="mt-auto p-6 text-center text-white/40 text-sm">
        <p>© 2024 YouTube Shorts Creator. All rights reserved.</p>
      </footer>
    </div>
  );
}