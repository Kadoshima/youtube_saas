'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CutPoint {
  id: string;
  startTime: number;
  endTime: number;
}

interface EditorState {
  videoFile: File | null;
  videoUrl: string | null;
  duration: number;
  currentTime: number;
  isPlaying: boolean;
  cutPoints: CutPoint[];
  selectedTool: string;
}

interface EditorContextType extends EditorState {
  setVideoFile: (file: File | null) => void;
  setVideoUrl: (url: string | null) => void;
  setDuration: (duration: number) => void;
  setCurrentTime: (time: number) => void;
  setIsPlaying: (playing: boolean) => void;
  addCutPoint: (startTime: number, endTime: number) => void;
  removeCutPoint: (id: string) => void;
  updateCutPoint: (id: string, startTime: number, endTime: number) => void;
  setSelectedTool: (tool: string) => void;
}

const EditorContext = createContext<EditorContextType | undefined>(undefined);

export function EditorProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<EditorState>({
    videoFile: null,
    videoUrl: null,
    duration: 0,
    currentTime: 0,
    isPlaying: false,
    cutPoints: [],
    selectedTool: 'cut',
  });

  const setVideoFile = (file: File | null) => {
    setState(prev => ({ ...prev, videoFile: file }));
  };

  const setVideoUrl = (url: string | null) => {
    setState(prev => ({ ...prev, videoUrl: url }));
  };

  const setDuration = (duration: number) => {
    setState(prev => ({ ...prev, duration }));
  };

  const setCurrentTime = (time: number) => {
    setState(prev => ({ ...prev, currentTime: time }));
  };

  const setIsPlaying = (playing: boolean) => {
    setState(prev => ({ ...prev, isPlaying: playing }));
  };

  const addCutPoint = (startTime: number, endTime: number) => {
    const newCutPoint: CutPoint = {
      id: Date.now().toString(),
      startTime,
      endTime,
    };
    setState(prev => ({ 
      ...prev, 
      cutPoints: [...prev.cutPoints, newCutPoint].sort((a, b) => a.startTime - b.startTime)
    }));
  };

  const removeCutPoint = (id: string) => {
    setState(prev => ({
      ...prev,
      cutPoints: prev.cutPoints.filter(cp => cp.id !== id)
    }));
  };

  const updateCutPoint = (id: string, startTime: number, endTime: number) => {
    setState(prev => ({
      ...prev,
      cutPoints: prev.cutPoints
        .map(cp => cp.id === id ? { ...cp, startTime, endTime } : cp)
        .sort((a, b) => a.startTime - b.startTime)
    }));
  };

  const setSelectedTool = (tool: string) => {
    setState(prev => ({ ...prev, selectedTool: tool }));
  };

  const value: EditorContextType = {
    ...state,
    setVideoFile,
    setVideoUrl,
    setDuration,
    setCurrentTime,
    setIsPlaying,
    addCutPoint,
    removeCutPoint,
    updateCutPoint,
    setSelectedTool,
  };

  return (
    <EditorContext.Provider value={value}>
      {children}
    </EditorContext.Provider>
  );
}

export function useEditor() {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error('useEditor must be used within EditorProvider');
  }
  return context;
}