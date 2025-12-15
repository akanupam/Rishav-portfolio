'use client';

import { create } from 'zustand';

export interface Clip {
  id: string;
  title: string;
  duration: number;
  thumbnail: string;
  embedType: 'instagram' | 'drive';
  embedUrl: string;
  category: string[];
  description: string;
}

interface PortfolioStore {
  clips: Clip[];
  selectedClipId: string | null;
  isPlaying: boolean;
  selectClip: (id: string) => void;
  togglePlay: () => void;
  getSelectedClip: () => Clip | undefined;
}

export const usePortfolioStore = create<PortfolioStore>((set, get) => ({
  clips: [],
  selectedClipId: null,
  isPlaying: false,
  selectClip: (id: string) => set({ selectedClipId: id, isPlaying: true }),
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  getSelectedClip: () => {
    const { clips, selectedClipId } = get();
    return clips.find((c) => c.id === selectedClipId);
  },
}));

export const useInitializeClips = (clips: Clip[]) => {
  const store = usePortfolioStore();
  
  // Initialize clips and select first one
  if (store.clips.length === 0) {
    usePortfolioStore.setState({ 
      clips, 
      selectedClipId: clips[0]?.id || null 
    });
  }
};
