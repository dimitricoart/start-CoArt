import { EntityRepository } from "@mikro-orm/postgresql";
import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@mikro-orm/nestjs";
import { FilterQuery, FindOneOptions, Loaded } from "@mikro-orm/core";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";

import { MerchantEntity } from "../../infrastructure/merchant/merchant.entity";
import { SafeWalletService } from "../../integrations/safe-wallet/safe-wallet.service";
import { PrivateKeyService } from "../private-key/private-key.service";
import { WalletEntity } from "./wallet.entity";

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(WalletEntity)
    private readonly walletEntityRepository: EntityRepository<WalletEntity>,
    private readonly safeWalletService: SafeWalletService,
    private readonly privateKeyService: PrivateKeyService,
  ) {}

  public async create(merchantEntity: MerchantEntity): Promise<WalletEntity> {
    const existingWalletEntity = await this.findOne({ merchant: merchantEntity });
    if (existingWalletEntity) {
      throw new ConflictException("onlyOneWalletAllowed");
    }

    const privateKey = generatePrivateKey();
    const { address } = privateKeyToAccount(privateKey);

    const walletEntity = this.walletEntityRepository.create({
      address,
      privateKey: this.privateKeyService.encryptPrivateKey(privateKey),
      multisig: await this.safeWalletService.deploy(address),
      merchant: merchantEntity,
    });

    await this.walletEntityRepository.getEntityManager().persist(walletEntity).flush();

    return walletEntity;
  }

  public findOne<Hint extends string = never>(
    where: FilterQuery<WalletEntity>,
    options?: FindOneOptions<WalletEntity, Hint>,
  ): Promise<Loaded<WalletEntity, Hint> | null> {
    return this.walletEntityRepository.findOne(where, options);
  }

  public async findOneAndCheckExistence<Hint extends string = never>(
    where: FilterQuery<WalletEntity>,
    options?: FindOneOptions<WalletEntity, Hint>,
  ): Promise<Loaded<WalletEntity, Hint>> {
    const walletEntity = await this.findOne(where, options);

    if (!walletEntity) {
      throw new NotFoundException("walletNotFound");
    }

    return walletEntity;
  }
}
