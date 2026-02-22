import { IAsset, TypesenseCollections } from "@framework/types";

import { typesenseClient } from "./typesenseClient";

export const fetchAllSearchResults = async (query: string): Promise<Array<IAsset>> => {
  try {
    const response = await typesenseClient
      .collections(TypesenseCollections.ASSETS)
      .documents()
      .search({
        q: query,
        query_by: ["title", "description"],
      });

    return response?.hits?.map((hit: any) => hit.document as IAsset) || [];
  } catch (error) {
    console.error(error);
    return [];
  }
};
