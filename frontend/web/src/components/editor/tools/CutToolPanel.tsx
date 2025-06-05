'use client';

import React, { useState } from 'react';
import { useEditor } from '@/contexts/EditorContext';
import { Plus, Scissors } from 'lucide-react';

export default function CutToolPanel() {
  const { currentTime, duration, addCutPoint } = useEditor();
  const [startTime, setStartTime] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(0);
  const [isSettingRange, setIsSettingRange] = useState(false);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const ms = Math.floor((seconds % 1) * 100);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
  };

  const handleSetStart = () => {
    setStartTime(currentTime);
    if (!isSettingRange) {
      setIsSettingRange(true);
    }
  };

  const handleSetEnd = () => {
    if (currentTime > startTime) {
      setEndTime(currentTime);
    }
  };

  const handleAddCut = () => {
    if (startTime < endTime && endTime <= duration) {
      addCutPoint(startTime, endTime);
      setStartTime(0);
      setEndTime(0);
      setIsSettingRange(false);
    }
  };

  const handleQuickCut = (seconds: number) => {
    const start = Math.max(0, currentTime - seconds / 2);
    const end = Math.min(duration, currentTime + seconds / 2);
    if (start < end) {
      addCutPoint(start, end);
    }
  };

  return (
    <div className="bg-gray-700 rounded-lg p-4">
      <h4 className="text-white text-sm font-medium mb-4 flex items-center gap-2">
        <Scissors size={16} />
        カット編集
      </h4>

      <div className="space-y-4">
        {/* クイックカット */}
        <div>
          <p className="text-xs text-gray-400 mb-2">クイックカット</p>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => handleQuickCut(1)}
              className="bg-gray-600 hover:bg-gray-500 text-white text-xs py-2 px-3 rounded transition-colors"
            >
              1秒
            </button>
            <button
              onClick={() => handleQuickCut(3)}
              className="bg-gray-600 hover:bg-gray-500 text-white text-xs py-2 px-3 rounded transition-colors"
            >
              3秒
            </button>
            <button
              onClick={() => handleQuickCut(5)}
              className="bg-gray-600 hover:bg-gray-500 text-white text-xs py-2 px-3 rounded transition-colors"
            >
              5秒
            </button>
          </div>
        </div>

        {/* 範囲指定カット */}
        <div>
          <p className="text-xs text-gray-400 mb-2">範囲指定</p>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-300">開始: {formatTime(startTime)}</span>
              <button
                onClick={handleSetStart}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs py-1 px-3 rounded transition-colors"
              >
                現在位置
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-300">終了: {formatTime(endTime)}</span>
              <button
                onClick={handleSetEnd}
                disabled={!isSettingRange}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:opacity-50 text-white text-xs py-1 px-3 rounded transition-colors"
              >
                現在位置
              </button>
            </div>
          </div>
        </div>

        {/* カット追加ボタン */}
        <button
          onClick={handleAddCut}
          disabled={!(startTime < endTime)}
          className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:opacity-50 text-white text-sm py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
        >
          <Plus size={16} />
          カットを追加
        </button>
      </div>
    </div>
  );
}