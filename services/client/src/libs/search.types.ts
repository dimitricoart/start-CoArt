import { IAsset } from "@framework/types";

export interface ISearchStore {
  searchResults: Array<IAsset>;
  hoveredKey: string | null;
}

export interface ISearchStoreStateActions {
  setSearchResults: (searchResults: Array<IAsset>) => void;
  resetSearch: () => void;
  setHoveredKey: (key: string | null) => void;
}

export type TSearchStoreState = ISearchStore & ISearchStoreStateActions;
