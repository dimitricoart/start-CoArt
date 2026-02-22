import { Inject, Injectable } from "@nestjs/common";
import { Client } from "typesense";

import { schemas } from "./schemas";
import { TYPESENSE_PROVIDER } from "./typesence.provider";
import type { ITypesenseCollectionSchema } from "./schemas/typesense-collection-schema.interface";

@Injectable()
export class TypesenseService {
  constructor(
    @Inject(TYPESENSE_PROVIDER)
    private readonly typesenseClient: Client,
  ) {}

  async initializeCollections() {
    const existingCollections = await this.typesenseClient.collections().retrieve();

    const existingCollectionNames = existingCollections.map(collection => collection.name);

    for (const schema of schemas) {
      await this.initializeCollection(schema, existingCollectionNames);
    }
  }

  private async initializeCollection(schema: ITypesenseCollectionSchema, existingCollections: string[]): Promise<void> {
    const { name } = schema;

    if (existingCollections.includes(name)) {
      return;
    }

    await this.typesenseClient.collections().create(schema);
  }

  public async partialUpdateDocument(partialDocument: object, documentId: string, collectionName: string) {
    return this.typesenseClient.collections(collectionName).documents(documentId).update(partialDocument);
  }

  public async upsertDocument(document: object, collectionName: string) {
    await this.typesenseClient.collections(collectionName).documents().upsert(document);
  }

  public async deleteDocument(id: string, collectionName: string) {
    await this.typesenseClient.collections(collectionName).documents(id).delete();
  }

  public async deleteCollection(collectionName: string) {
    await this.typesenseClient.collections(collectionName).delete();
  }

  public async deleteDocumentsByFilter(filterBy: string, collectionName: string) {
    await this.typesenseClient.collections(collectionName).documents().delete({ filter_by: filterBy });
  }

  public async getDocument(id: string, collectionName: string) {
    return this.typesenseClient.collections(collectionName).documents(id).retrieve();
  }

  public async createCollection(schema: ITypesenseCollectionSchema) {
    return this.typesenseClient.collections().create(schema);
  }
}
