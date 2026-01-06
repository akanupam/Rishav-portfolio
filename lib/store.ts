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
  selectedClipId: string | null;
  selectClip: (id: string) => void;
}

export const usePortfolioStore = create<PortfolioStore>((set) => ({
  selectedClipId: null,
  selectClip: (id: string) => set({ selectedClipId: id }),
}));
