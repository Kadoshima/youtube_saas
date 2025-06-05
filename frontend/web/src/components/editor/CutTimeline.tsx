'use client';

import React from 'react';
import { useEditor } from '@/contexts/EditorContext';
import { Scissors, X } from 'lucide-react';

export default function CutTimeline() {
  const { duration, cutPoints, removeCutPoint, currentTime } = useEditor();

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getPositionPercentage = (time: number) => {
    return duration > 0 ? (time / duration) * 100 : 0;
  };

  return (
    <div className="relative h-24 bg-gray-800 rounded-lg p-4">
      <div className="relative h-full">
        {/* タイムラインバー */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-600 transform -translate-y-1/2" />
        
        {/* カットポイント */}
        {cutPoints.map((cutPoint) => (
          <div
            key={cutPoint.id}
            className="absolute top-0 h-full"
            style={{
              left: `${getPositionPercentage(cutPoint.startTime)}%`,
              width: `${getPositionPercentage(cutPoint.endTime - cutPoint.startTime)}%`,
            }}
          >
            <div className="h-full bg-red-500/30 border-2 border-red-500 rounded relative group">
              <div className="absolute -top-6 left-0 text-xs text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity">
                {formatTime(cutPoint.startTime)}
              </div>
              <div className="absolute -bottom-6 right-0 text-xs text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity">
                {formatTime(cutPoint.endTime)}
              </div>
              <button
                onClick={() => removeCutPoint(cutPoint.id)}
                className="absolute top-1 right-1 p-1 bg-red-600 rounded opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X size={12} />
              </button>
            </div>
          </div>
        ))}

        {/* 現在の再生位置 */}
        <div
          className="absolute top-0 w-0.5 h-full bg-white"
          style={{ left: `${getPositionPercentage(currentTime)}%` }}
        />
      </div>

      {/* カット情報 */}
      {cutPoints.length > 0 && (
        <div className="absolute -bottom-8 left-0 text-xs text-gray-400">
          <Scissors size={12} className="inline mr-1" />
          {cutPoints.length}個のカット
        </div>
      )}
    </div>
  );
}