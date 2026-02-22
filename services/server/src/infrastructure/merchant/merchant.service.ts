import { ConflictException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityRepository } from "@mikro-orm/postgresql";
import { FilterQuery, FindOneOptions, Loaded, QueryFlag } from "@mikro-orm/core";

import { IMerchantCreateDto, IMerchantUpdateDto, MerchantStatus, UserRole } from "@framework/types";
import { emptyStateString } from "../../utils/lexical";
import type { IPaginationDto } from "@framework/types";

import { WalletService } from "../../blockchain/wallet/wallet.service";
import { UserEntity } from "../user/user.entity";
import { MerchantEntity } from "./merchant.entity";
import type { IMerchantImportDto } from "./interfaces";

@Injectable()
export class MerchantService {
  constructor(
    @InjectRepository(MerchantEntity)
    private readonly merchantEntityRepository: EntityRepository<MerchantEntity>,
    private readonly walletService: WalletService,
  ) {}

  public search(dto: IPaginationDto): Promise<[Array<MerchantEntity>, number]> {
    const { skip, take } = dto;

    return this.merchantEntityRepository.findAndCount(
      {},
      {
        orderBy: {
          priority: "DESC",
        },
        offset: skip,
        limit: take,
        flags: [QueryFlag.PAGINATE],
      },
    );
  }

  public async findOneAndCheckExistence<Hint extends string = never>(
    where: FilterQuery<MerchantEntity>,
    options?: FindOneOptions<MerchantEntity, Hint>,
  ): Promise<Loaded<MerchantEntity, Hint>> {
    const merchantEntity = await this.findOne(where, options);

    if (!merchantEntity) {
      throw new NotFoundException("merchantNotFound");
    }

    return merchantEntity;
  }

  public async update(
    where: FilterQuery<MerchantEntity>,
    dto: Partial<IMerchantUpdateDto>,
    userEntity: UserEntity,
  ): Promise<MerchantEntity> {
    const merchantEntity = await this.findOneAndCheckExistence(where);

    const roles = [UserRole.ADMIN, UserRole.SUPER];

    if (merchantEntity.id !== userEntity.merchant?.id) {
      if (!userEntity.userRoles.some(role => roles.includes(role))) {
        throw new ForbiddenException("insufficientPermissions");
      }
    }

    Object.assign(userEntity.merchant, dto);
    await this.merchantEntityRepository.getEntityManager().persist(userEntity.merchant).flush();
    return userEntity.merchant;
  }

  public findOne<Hint extends string = never>(
    where: FilterQuery<MerchantEntity>,
    options?: FindOneOptions<MerchantEntity, Hint>,
  ): Promise<Loaded<MerchantEntity, Hint> | null> {
    return this.merchantEntityRepository.findOne(where, options);
  }

  public async create(dto: IMerchantCreateDto, userEntity: UserEntity): Promise<MerchantEntity> {
    const { email, ...rest } = dto;

    if (userEntity.merchant) {
      throw new ConflictException("merchantAlreadyExist");
    }

    const countByEmail = await this.count({
      email,
    });

    if (countByEmail) {
      throw new ConflictException("duplicateAccount");
    }

    const merchantEntity = this.merchantEntityRepository.create({
      merchantStatus: MerchantStatus.ACTIVE,
      email,
      ...rest,
      users: [userEntity],
      priority: 0,
    });

    await this.merchantEntityRepository.getEntityManager().persist(merchantEntity).flush();

    await this.walletService.create(merchantEntity);

    return merchantEntity;
  }

  public async import(dto: IMerchantImportDto): Promise<MerchantEntity> {
    const { email, title = "N/A", imageUrl, backgroundImageUrl } = dto;

    const count = await this.count({
      email,
    });

    if (count) {
      throw new ConflictException("duplicateAccount");
    }

    const merchantEntity = this.merchantEntityRepository.create({
      merchantStatus: MerchantStatus.ACTIVE,
      email,
      title,
      description: emptyStateString,
      subtitle: emptyStateString,
      imageUrl,
      backgroundImageUrl,
      priority: 0,
    });

    await this.merchantEntityRepository.getEntityManager().persist(merchantEntity).flush();

    return merchantEntity;
  }

  public count(where: FilterQuery<MerchantEntity>): Promise<number> {
    return this.merchantEntityRepository.count(where);
  }
}
