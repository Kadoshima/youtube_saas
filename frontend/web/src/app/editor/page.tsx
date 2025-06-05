'use client';

import React, { useEffect } from 'react';
import VideoPlayer from '@/components/editor/VideoPlayer';
import Timeline from '@/components/editor/Timeline';
import ToolBar from '@/components/editor/ToolBar';
import { useSearchParams } from 'next/navigation';
import { useEditor } from '@/contexts/EditorContext';

export default function EditorPage() {
  const searchParams = useSearchParams();
  const videoPath = searchParams.get('video');
  const {
    currentTime,
    duration,
    isPlaying,
    setCurrentTime,
    setDuration,
    setIsPlaying,
    setVideoUrl,
  } = useEditor();

  useEffect(() => {
    if (videoPath === 'temp') {
      // localStorageから動画を取得
      const base64 = localStorage.getItem('tempVideo');
      if (base64) {
        setVideoUrl(base64);
        // 使用後は削除
        localStorage.removeItem('tempVideo');
      }
    } else if (videoPath) {
      setVideoUrl(videoPath);
    }
  }, [videoPath, setVideoUrl]);

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      <div className="flex-1 flex">
        <div className="flex-1 flex flex-col">
          <div className="flex-1 relative bg-black flex items-center justify-center">
            <VideoPlayer
              videoPath={videoPath}
              currentTime={currentTime}
              onTimeUpdate={setCurrentTime}
              onDurationChange={setDuration}
              isPlaying={isPlaying}
              onPlayPause={setIsPlaying}
            />
          </div>
          <div className="h-48 bg-gray-800 border-t border-gray-700">
            <Timeline
              duration={duration}
              currentTime={currentTime}
              onSeek={setCurrentTime}
            />
          </div>
        </div>
        <div className="w-80 bg-gray-800 border-l border-gray-700">
          <ToolBar />
        </div>
      </div>
    </div>
  );
}