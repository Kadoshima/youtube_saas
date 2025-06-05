'use client';

import React, { useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';

interface VideoPlayerProps {
  videoPath: string | null;
  currentTime: number;
  onTimeUpdate: (time: number) => void;
  onDurationChange: (duration: number) => void;
  isPlaying: boolean;
  onPlayPause: (playing: boolean) => void;
}

export default function VideoPlayer({
  videoPath,
  currentTime,
  onTimeUpdate,
  onDurationChange,
  isPlaying,
  onPlayPause,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = currentTime;
    }
  }, [currentTime]);

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      onDurationChange(videoRef.current.duration);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      onTimeUpdate(videoRef.current.currentTime);
    }
  };

  const handlePlayPause = () => {
    onPlayPause(!isPlaying);
  };

  const handleSkip = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds;
    }
  };

  if (!videoPath) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        <p>動画を選択してください</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <video
        ref={videoRef}
        src={videoPath}
        className="max-w-full max-h-full"
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
      />
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-4 bg-black/50 rounded-lg p-3">
        <button
          onClick={() => handleSkip(-10)}
          className="text-white hover:text-gray-300 transition-colors"
        >
          <SkipBack size={24} />
        </button>
        <button
          onClick={handlePlayPause}
          className="text-white hover:text-gray-300 transition-colors"
        >
          {isPlaying ? <Pause size={28} /> : <Play size={28} />}
        </button>
        <button
          onClick={() => handleSkip(10)}
          className="text-white hover:text-gray-300 transition-colors"
        >
          <SkipForward size={24} />
        </button>
      </div>
    </div>
  );
}