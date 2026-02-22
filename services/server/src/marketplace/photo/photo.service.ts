import { EntityRepository } from "@mikro-orm/postgresql";
import { Inject, Injectable, InternalServerErrorException, Logger, LoggerService } from "@nestjs/common";
import { InjectRepository } from "@mikro-orm/nestjs";
import { FilterQuery } from "@mikro-orm/core";

import { IPhotoCreateDto } from "@framework/types";

import { PhotoEntity } from "./photo.entity";
import { AssetEntity } from "../asset/asset.entity";

@Injectable()
export class PhotoService {
  constructor(
    @InjectRepository(PhotoEntity)
    private readonly photoEntityRepository: EntityRepository<PhotoEntity>,
    @Inject(Logger)
    private readonly loggerService: LoggerService,
  ) {}

  public findOne(where: FilterQuery<PhotoEntity>): Promise<PhotoEntity | null> {
    return this.photoEntityRepository.findOne(where);
  }

  public findAndCount(where: FilterQuery<PhotoEntity>): Promise<[Array<PhotoEntity>, number]> {
    return this.photoEntityRepository.findAndCount(where);
  }

  // ASSET COMPONENTS
  public async update(assetEntity: AssetEntity, dto: IPhotoCreateDto[]): Promise<void> {
    const em = this.photoEntityRepository.getEntityManager();

    try {
      await em.transactional(async em => {
        const asset = await em.findOneOrFail(AssetEntity, assetEntity.id, {
          populate: ["photos"],
        });

        if (dto.length) {
          const toRemove = asset.photos.filter(oldItem => !dto.find(newItem => newItem.id === oldItem.id));

          for (const oldItem of toRemove) {
            em.remove(oldItem);
          }

          const changedPhotos = asset.photos
            .filter(oldItem => dto.some(newItem => newItem.id === oldItem.id))
            .map(oldItem => {
              const dtoItem = dto.find(newItem => newItem.id === oldItem.id)!;
              Object.assign(oldItem, dtoItem, {
                priority: dto.findIndex(i => i.id === oldItem.id),
              });
              return oldItem;
            });

          const newPhotos = dto
            .filter(newItem => !newItem.id)
            .map((newItem, i) =>
              em.create(PhotoEntity, {
                ...newItem,
                asset,
                priority: i,
              }),
            );

          asset.photos.set([...changedPhotos, ...newPhotos]);
        } else {
          for (const oldItem of asset.photos) {
            em.remove(oldItem);
          }
          asset.photos.removeAll();
        }

        await em.persist(asset).flush();
      });
    } catch (e) {
      this.loggerService.error(e, PhotoService.name);

      // since we have errors lets rollback the changes we made
      await em.rollback();

      throw new InternalServerErrorException("internalServerError");
    }
  }
}
