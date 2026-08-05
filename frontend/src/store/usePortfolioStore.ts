import { create } from 'zustand';

interface PortfolioState {
  selectedCategory: string;
  selectedTag: string | null;
  searchQuery: string;

  setSelectedCategory: (category: string) => void;
  setSelectedTag: (tag: string | null) => void;
  setSearchQuery: (query: string) => void;
  resetFilters: () => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  selectedCategory: 'All',
  selectedTag: null,
  searchQuery: '',

  setSelectedCategory: (selectedCategory) => set({ selectedCategory }),
  setSelectedTag: (selectedTag) => set({ selectedTag }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  resetFilters: () => set({ selectedCategory: 'All', selectedTag: null, searchQuery: '' }),
}));
