import { Injectable, NotFoundException } from "@nestjs/common";
import { EntityRepository } from "@mikro-orm/postgresql";
import { InjectRepository } from "@mikro-orm/nestjs";
import { QueryFlag, FilterQuery } from "@mikro-orm/core";

import { IPaginationDto } from "@framework/types";

import { UserEntity } from "../../infrastructure/user/user.entity";
import { AssetService } from "../asset/asset.service";
import { FavoriteEntity } from "./favorite.entity";

@Injectable()
export class FavoriteService {
  constructor(
    @InjectRepository(FavoriteEntity)
    private readonly favoriteEntityRepository: EntityRepository<FavoriteEntity>,
    private readonly assetService: AssetService,
  ) {}

  public search(dto: IPaginationDto, userEntity: UserEntity): Promise<[Array<FavoriteEntity>, number]> {
    const { skip, take } = dto;

    return this.favoriteEntityRepository.findAndCount(
      {
        user: userEntity,
      },
      {
        populate: ["asset", "asset.photos"],
        offset: skip,
        limit: take,
        flags: [QueryFlag.PAGINATE],
      },
    );
  }

  public findOne(where: FilterQuery<FavoriteEntity>): Promise<FavoriteEntity | null> {
    return this.favoriteEntityRepository.findOne(where);
  }

  public async create(assetId: string, userEntity: UserEntity): Promise<FavoriteEntity> {
    const assetEntity = await this.assetService.findOne({ id: assetId });

    if (!assetEntity) {
      throw new NotFoundException("assetNotFound");
    }

    const favoriteEntity = this.favoriteEntityRepository.create({
      asset: assetEntity,
      user: userEntity,
    });

    await this.favoriteEntityRepository.getEntityManager().persist(favoriteEntity).flush();

    return favoriteEntity;
  }

  public async delete(assetId: string, userEntity: UserEntity): Promise<void> {
    const favoriteEntity = await this.findOne({ asset: assetId, user: userEntity });

    if (!favoriteEntity) {
      // throw new NotFoundException("favoriteNotFound");
      return;
    }

    await this.favoriteEntityRepository.getEntityManager().remove(favoriteEntity).flush();
  }
}
