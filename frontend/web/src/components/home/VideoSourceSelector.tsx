'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';

interface VideoSourceSelectorProps {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export default function VideoSourceSelector({ isLoading, setIsLoading }: VideoSourceSelectorProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsLoading(true);
      
      // ファイルを一時的に保存
      const formData = new FormData();
      formData.append('video', file);
      
      // Blob URLを作成
      const videoUrl = URL.createObjectURL(file);
      
      // Base64エンコード
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        localStorage.setItem('tempVideo', base64);
        router.push(`/editor?video=temp`);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleYouTubeClick = () => {
    setIsLoading(true);
    router.push('/youtube-import');
  };

  const cardVariants = {
    hover: {
      scale: 1.02,
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.98
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
      <input
        ref={fileInputRef}
        type="file"
        accept="video/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* 自分の動画から作成 */}
      <motion.button
        variants={cardVariants}
        whileHover="hover"
        whileTap="tap"
        onClick={handleFileSelect}
        disabled={isLoading}
        className="relative group overflow-hidden rounded-3xl bg-gradient-to-br from-surface to-surface/50 p-8 text-left border border-white/10 disabled:opacity-50"
      >
        <div className="relative z-10">
          <div className="mb-6">
            <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center">
              <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-2">自分の動画から作成</h3>
          <p className="text-white/60">
            スマートフォンやPCに保存されている動画を使って、ショート動画を作成します
          </p>
        </div>
        
        {/* ホバーエフェクト */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </motion.button>

      {/* YouTube動画から作成 */}
      <motion.button
        variants={cardVariants}
        whileHover="hover"
        whileTap="tap"
        onClick={handleYouTubeClick}
        disabled={isLoading}
        className="relative group overflow-hidden rounded-3xl bg-gradient-to-br from-surface to-surface/50 p-8 text-left border border-white/10 disabled:opacity-50"
      >
        <div className="relative z-10">
          <div className="mb-6">
            <div className="w-16 h-16 rounded-2xl bg-secondary/20 flex items-center justify-center">
              <svg className="w-8 h-8 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-2">YouTube動画から作成</h3>
          <p className="text-white/60">
            YouTubeのURLを入力して、動画の一部を切り抜いてショート動画を作成します
          </p>
        </div>
        
        {/* ホバーエフェクト */}
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </motion.button>

      {/* ローディングオーバーレイ */}
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center"
        >
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-white/80">準備中...</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}