'use client';

import React, { useRef, useState, useEffect } from 'react';
import CutTimeline from './CutTimeline';
import { useEditor } from '@/contexts/EditorContext';

interface TimelineProps {
  duration: number;
  currentTime: number;
  onSeek: (time: number) => void;
}

export default function Timeline({ duration, currentTime, onSeek }: TimelineProps) {
  const { selectedTool } = useEditor();
  const timelineRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e: React.MouseEvent | MouseEvent) => {
    if (!timelineRef.current || duration === 0) return;
    
    const rect = timelineRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, x / rect.width));
    const newTime = percentage * duration;
    onSeek(newTime);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    handleSeek(e);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      handleSeek(e);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging]);

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="h-full flex flex-col p-4">
      <div className="flex justify-between items-center mb-4 text-sm text-gray-300">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
      
      <div className="flex-1 flex flex-col justify-center">
        <div 
          ref={timelineRef}
          className="relative h-2 bg-gray-700 rounded-full cursor-pointer"
          onMouseDown={handleMouseDown}
        >
          <div 
            className="absolute h-full bg-blue-500 rounded-full"
            style={{ width: `${progress}%` }}
          />
          <div 
            className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg"
            style={{ left: `${progress}%`, marginLeft: '-8px' }}
          />
        </div>
      </div>

      <div className="mt-4">
        {selectedTool === 'cut' ? (
          <CutTimeline />
        ) : (
          <div className="h-16 bg-gray-700 rounded flex items-center px-2">
            <div className="text-xs text-gray-400">タイムライン（今後実装予定）</div>
          </div>
        )}
      </div>
    </div>
  );
}