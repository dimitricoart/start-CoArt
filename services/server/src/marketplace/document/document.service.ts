import { EntityRepository } from "@mikro-orm/postgresql";
import { Inject, Injectable, InternalServerErrorException, Logger, LoggerService } from "@nestjs/common";
import { InjectRepository } from "@mikro-orm/nestjs";
import { FilterQuery } from "@mikro-orm/core";

import { IDocumentCreateDto } from "@framework/types";

import { DocumentEntity } from "./document.entity";
import { AssetEntity } from "../asset/asset.entity";

@Injectable()
export class DocumentService {
  constructor(
    @InjectRepository(DocumentEntity)
    private readonly documentEntityRepository: EntityRepository<DocumentEntity>,
    @Inject(Logger)
    private readonly loggerService: LoggerService,
  ) {}

  public findOne(where: FilterQuery<DocumentEntity>): Promise<DocumentEntity | null> {
    return this.documentEntityRepository.findOne(where);
  }

  public findAndCount(where: FilterQuery<DocumentEntity>): Promise<[Array<DocumentEntity>, number]> {
    return this.documentEntityRepository.findAndCount(where);
  }

  // ASSET COMPONENTS
  public async update(assetEntity: AssetEntity, dto: IDocumentCreateDto[]): Promise<void> {
    const em = this.documentEntityRepository.getEntityManager();

    try {
      await em.transactional(async em => {
        const asset = await em.findOneOrFail(AssetEntity, assetEntity.id, {
          populate: ["documents"],
        });

        if (dto.length) {
          const toRemove = asset.documents.filter(oldItem => !dto.find(newItem => newItem.id === oldItem.id));

          for (const oldItem of toRemove) {
            em.remove(oldItem);
          }

          const changedDocuments = asset.documents
            .filter(oldItem => dto.some(newItem => newItem.id === oldItem.id))
            .map(oldItem => {
              const dtoItem = dto.find(newItem => newItem.id === oldItem.id)!;
              Object.assign(oldItem, dtoItem, {
                priority: dto.findIndex(i => i.id === oldItem.id),
              });
              return oldItem;
            });

          const newDocuments = dto
            .filter(newItem => !newItem.id)
            .map((newItem, i) =>
              em.create(DocumentEntity, {
                ...newItem,
                asset,
                priority: i,
              }),
            );

          asset.documents.set([...changedDocuments, ...newDocuments]);
        } else {
          for (const oldItem of asset.documents) {
            em.remove(oldItem);
          }
          asset.documents.removeAll();
        }

        await em.persist(asset).flush();
      });
    } catch (e) {
      this.loggerService.error(e, DocumentService.name);

      // since we have errors lets rollback the changes we made
      await em.rollback();

      throw new InternalServerErrorException("internalServerError");
    }
  }
}
