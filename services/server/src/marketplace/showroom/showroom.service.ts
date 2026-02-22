import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { EntityRepository } from "@mikro-orm/postgresql";
import { InjectRepository } from "@mikro-orm/nestjs";
import { FilterQuery, FindAllOptions, FindOneOptions, Loaded, QBFilterQuery, QueryFlag } from "@mikro-orm/core";

import {
  AssetStatus,
  IShowroomCreateDto,
  IShowroomUpdateDto,
  MerchantStatus,
  IShowroomSearchDto,
} from "@framework/types";

import { ShowroomEntity } from "./showroom.entity";
import { UserEntity } from "../../infrastructure/user/user.entity";

@Injectable()
export class ShowroomService {
  constructor(
    @InjectRepository(ShowroomEntity)
    private readonly showroomEntityRepository: EntityRepository<ShowroomEntity>,
  ) {}

  public search(dto: IShowroomSearchDto): Promise<[Array<ShowroomEntity>, number]> {
    const { displayEmpty = false, merchantId, skip, take } = dto;
    const queryBuilder = this.showroomEntityRepository.createQueryBuilder("showroom");

    if (!displayEmpty) {
      queryBuilder.innerJoin("showroom.ledgers", "ledgers", { fractions: { $gt: 0 } });
      queryBuilder.innerJoin("ledgers.asset", "asset", { assetStatus: AssetStatus.FINALIZED });
    }

    queryBuilder.andWhere({
      merchant: merchantId,
    });

    queryBuilder.offset(skip);
    queryBuilder.limit(take);
    queryBuilder.setFlag(QueryFlag.PAGINATE);

    return queryBuilder.getResultAndCount();
  }

  public async create(dto: IShowroomCreateDto, userEntity: UserEntity, isDefault: boolean): Promise<ShowroomEntity> {
    const { ...rest } = dto;

    const showroomEntity = this.showroomEntityRepository.create({
      ...rest,
      merchant: userEntity.merchant,
      isDefault,
    });

    await this.showroomEntityRepository.getEntityManager().persist(showroomEntity).flush();

    return showroomEntity;
  }

  public findOne<Hint extends string = never>(
    where: FilterQuery<ShowroomEntity>,
    options?: FindOneOptions<ShowroomEntity, Hint>,
  ): Promise<Loaded<ShowroomEntity, Hint> | null> {
    return this.showroomEntityRepository.findOne(where, options);
  }

  public findOneWithRelations(where: QBFilterQuery<ShowroomEntity>): Promise<ShowroomEntity | null> {
    const queryBuilder = this.showroomEntityRepository.createQueryBuilder("showroom");
    queryBuilder.select("*");
    queryBuilder.where(where);
    queryBuilder.leftJoinAndSelect("showroom.merchant", "merchant");

    // do not populate assets in this endpoint
    queryBuilder.leftJoinAndSelect("showroom.assets", "assets", {
      assetStatus: AssetStatus.FINALIZED,
    });
    queryBuilder.leftJoinAndSelect("assets.photos", "photos");

    return queryBuilder.getSingleResult();
  }

  public async findOneAndCheckExistence<Hint extends string = never>(
    where: FilterQuery<ShowroomEntity>,
    options?: FindOneOptions<ShowroomEntity, Hint>,
  ): Promise<Loaded<ShowroomEntity, Hint>> {
    const showroomEntity = await this.findOne(where, options);

    if (!showroomEntity) {
      throw new NotFoundException("showroomNotFound");
    }

    return showroomEntity;
  }

  public async findOneAndCheckOwner<Hint extends string = never>(
    where: FilterQuery<ShowroomEntity>,
    options: FindOneOptions<ShowroomEntity, Hint>,
    userEntity: UserEntity,
  ): Promise<Loaded<ShowroomEntity, Hint>> {
    const showroomEntity = await this.findOneAndCheckExistence(where, options);

    if (showroomEntity.merchant?.id !== userEntity.merchant?.id) {
      throw new ForbiddenException("insufficientPermissions");
    }

    return showroomEntity;
  }

  public async findOneAndCheckStatus(
    where: QBFilterQuery<ShowroomEntity>,
    userEntity: UserEntity,
  ): Promise<ShowroomEntity> {
    const showroomEntity = await this.findOneAndCheckExistence(where, { populate: ["merchant"] });

    if (showroomEntity.merchant?.merchantStatus !== MerchantStatus.ACTIVE) {
      if (showroomEntity.merchant?.id !== userEntity.merchant.id) {
        throw new NotFoundException("showroomNotFound");
      }
    }

    return showroomEntity;
  }

  public async update(
    where: FilterQuery<ShowroomEntity>,
    dto: IShowroomUpdateDto,
    userEntity: UserEntity,
  ): Promise<ShowroomEntity> {
    const showroomEntity = await this.findOneAndCheckOwner(where, { populate: ["merchant"] }, userEntity);

    Object.assign(showroomEntity, dto);
    await this.showroomEntityRepository.getEntityManager().persist(showroomEntity).flush();
    return showroomEntity;
  }

  public findAll<Hint extends string = never, Fields extends string = "*">(
    where: FilterQuery<ShowroomEntity>,
    options?: FindAllOptions<ShowroomEntity, Hint, Fields>,
  ): Promise<Array<Loaded<ShowroomEntity, Hint, Fields>>> {
    return this.showroomEntityRepository.findAll({ ...options, where });
  }

  public async autocomplete(userEntity: UserEntity): Promise<Array<ShowroomEntity>> {
    return this.findAll(
      {
        merchant: userEntity.merchant,
      },
      {
        fields: ["id", "title"],
      },
    ) as Promise<Array<ShowroomEntity>>; // omit Loaded wrapper
  }

  public async delete(showroomId: string, userEntity: UserEntity): Promise<void> {
    const showroomEntity = await this.findOneAndCheckOwner({ id: showroomId }, { populate: ["merchant"] }, userEntity);

    if (showroomEntity.isDefault) {
      throw new BadRequestException("showroomCantDelete");
    }

    // todo move all assets to default showroom

    await this.showroomEntityRepository.getEntityManager().remove(showroomEntity).flush();
  }
}
