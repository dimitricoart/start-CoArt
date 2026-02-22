import { create } from "zustand";

import { ISearchStore, TSearchStoreState } from "./search.types";

const defaultSearchState = {
  searchResults: [],
  hoveredKey: null,
} as ISearchStore;

export const useSearchStore = create<TSearchStoreState>(set => ({
  ...defaultSearchState,
  setSearchResults: searchResults => {
    set(() => {
      return {
        searchResults,
      };
    });
  },
  resetSearch: () => {
    set({ ...defaultSearchState });
  },
  setHoveredKey: key => set({ hoveredKey: key }),
}));
