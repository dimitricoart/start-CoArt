import { useState } from "react";

import { fetchAllSearchResults } from "./fetch";

export const useTypesense = () => {
  const [isLoading, setIsLoading] = useState(false);

  // const setSearchResults = useSearchStore(state => state.setSearchResults);

  const fetchSearchResults = async (query: string) => {
    setIsLoading(true);
    try {
      const searchResults = await fetchAllSearchResults(query);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      // setSearchResults(searchResults);
      return searchResults;
    } catch (err: any) {
      console.error("Typesense search error", err);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  return {
    fetchSearchResults,
    isLoading,
  };
};
