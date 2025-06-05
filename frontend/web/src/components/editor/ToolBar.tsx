'use client';

import React, { useState } from 'react';
import { Scissors, Type, Music, Palette, Layers, Download } from 'lucide-react';
import { useEditor } from '@/contexts/EditorContext';
import CutToolPanel from './tools/CutToolPanel';
import ExportModal from './ExportModal';

interface Tool {
  id: string;
  name: string;
  icon: React.ReactNode;
}

export default function ToolBar() {
  const { selectedTool, setSelectedTool } = useEditor();
  const [showExportModal, setShowExportModal] = useState(false);

  const tools: Tool[] = [
    { id: 'cut', name: 'カット', icon: <Scissors size={20} /> },
    { id: 'text', name: 'テキスト', icon: <Type size={20} /> },
    { id: 'audio', name: 'オーディオ', icon: <Music size={20} /> },
    { id: 'effects', name: 'エフェクト', icon: <Palette size={20} /> },
    { id: 'layers', name: 'レイヤー', icon: <Layers size={20} /> },
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-700">
        <h3 className="text-white font-semibold">編集ツール</h3>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <div className="grid grid-cols-2 gap-3">
            {tools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => setSelectedTool(tool.id)}
                className={`flex flex-col items-center justify-center p-4 rounded-lg transition-colors ${
                  selectedTool === tool.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {tool.icon}
                <span className="text-sm mt-2">{tool.name}</span>
              </button>
            ))}
          </div>

          <div className="mt-6">
            {selectedTool === 'cut' ? (
              <CutToolPanel />
            ) : (
              <div className="bg-gray-700 rounded-lg p-4">
                <h4 className="text-white text-sm font-medium mb-3">
                  {tools.find(t => t.id === selectedTool)?.name}の設定
                </h4>
                <p className="text-gray-400 text-sm">
                  詳細な設定オプションは今後実装予定です
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-gray-700">
        <button
          onClick={() => setShowExportModal(true)}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
        >
          <Download size={20} />
          エクスポート
        </button>
      </div>

      {showExportModal && (
        <ExportModal onClose={() => setShowExportModal(false)} />
      )}
    </div>
  );
}