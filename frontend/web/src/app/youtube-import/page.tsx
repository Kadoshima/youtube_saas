'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { parseYouTubeUrl } from '@youtube-saas/utils';

export default function YouTubeImportPage() {
  const router = useRouter();
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const videoId = parseYouTubeUrl(url);
    if (!videoId) {
      setError('有効なYouTube URLを入力してください');
      return;
    }

    setIsLoading(true);
    // TODO: YouTube APIでビデオ情報を取得
    setTimeout(() => {
      router.push(`/editor?source=youtube&videoId=${videoId}`);
    }, 1000);
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
      setError('');
    } catch (err) {
      console.error('Failed to read clipboard:', err);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* ヘッダー */}
      <header className="p-6 border-b border-white/10">
        <div className="max-w-4xl mx-auto flex items-center">
          <button
            onClick={() => router.back()}
            className="mr-4 p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-xl font-bold">YouTube動画から作成</h1>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-center mb-8">
            <div className="w-20 h-20 rounded-3xl bg-secondary/20 flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold mb-4">YouTubeのURLを入力</h2>
            <p className="text-white/60">
              切り抜きたいYouTube動画のURLを入力してください
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                type="url"
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                  setError('');
                }}
                placeholder="https://youtube.com/watch?v=..."
                className="w-full px-6 py-4 bg-surface rounded-2xl border border-white/10 focus:border-secondary/50 focus:outline-none focus:ring-2 focus:ring-secondary/20 transition-all"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={handlePaste}
                className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 text-sm bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                disabled={isLoading}
              >
                ペースト
              </button>
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-error text-sm"
              >
                {error}
              </motion.p>
            )}

            <button
              type="submit"
              disabled={!url || isLoading}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  読み込み中...
                </span>
              ) : (
                '次へ進む'
              )}
            </button>
          </form>

          <div className="mt-8 p-6 bg-surface/50 rounded-2xl">
            <h3 className="font-semibold mb-3">対応している動画</h3>
            <ul className="space-y-2 text-sm text-white/60">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-success mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                通常のYouTube動画
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-success mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                YouTube Shorts
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-error mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                非公開・限定公開の動画は利用できません
              </li>
            </ul>
          </div>
        </motion.div>
      </main>
    </div>
  );
}