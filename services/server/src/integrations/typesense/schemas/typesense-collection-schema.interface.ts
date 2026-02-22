import { FieldType } from "typesense/lib/Typesense/Collection";
import { CollectionCreateSchema } from "typesense/lib/Typesense/Collections";

export interface ITypesenseCollectionSchema extends CollectionCreateSchema {
  name: string;
  enable_nested_fields?: boolean;
  fields: {
    name: string;
    type: FieldType;
    facet?: boolean;
    optional?: boolean;
    [key: string]: any;
  }[];
  [key: string]: any;
}
