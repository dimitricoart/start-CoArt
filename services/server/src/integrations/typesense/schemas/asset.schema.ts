import { TypesenseCollections } from "@framework/types";

import { ITypesenseCollectionSchema } from "./typesense-collection-schema.interface";

export const assetSchema: ITypesenseCollectionSchema = {
  name: TypesenseCollections.ASSETS,
  enable_nested_fields: true,
  fields: [
    { name: "userId", type: "string", facet: false },
    { name: "title", type: "string", facet: false },
    { name: "description", type: "string", facet: false },
    { name: "assetStatus", type: "string", facet: true },
    { name: "imageUrl", type: "string", facet: true },
  ],
};
