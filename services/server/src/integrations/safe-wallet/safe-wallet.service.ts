import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  LoggerService,
  NotFoundException,
  NotImplementedException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { encodeFunctionData, Hash, Chain } from "viem";
import { waitForTransactionReceipt } from "viem/actions";
import { privateKeyToAccount } from "viem/accounts";
import Safe from "@safe-global/protocol-kit";
import SafeApiKit from "@safe-global/api-kit";
import { MetaTransactionData, OperationType } from "@safe-global/types-kit";

import { MerchantEntity } from "../../infrastructure/merchant/merchant.entity";
import { OfferEntity } from "../../marketplace/offer/offer.entity";
import { CHAIN_PROVIDER } from "../../blockchain/signer/chain.provider";
import { PrivateKeyService } from "../../blockchain/private-key/private-key.service";

@Injectable()
export class SafeWalletService {
  constructor(
    @Inject(Logger)
    private readonly loggerService: LoggerService,
    @Inject(CHAIN_PROVIDER)
    private readonly chain: Chain,
    private readonly configService: ConfigService,
    private readonly privateKeyService: PrivateKeyService,
  ) {}

  public async deploy(address: string): Promise<string> {
    const adminPrivateKey = this.configService.get<Hash>("PRIVATE_KEY_1");
    const backupPrivateKey = this.configService.get<Hash>("PRIVATE_KEY_2");
    if (!adminPrivateKey || !backupPrivateKey) {
      throw new NotImplementedException("Safe wallet is disabled: PRIVATE_KEY_1/PRIVATE_KEY_2 not set");
    }
    const rpcUrl = this.configService.get<string>("RPC_URL", "http://localhost:8545/");

    const adminAccount = privateKeyToAccount(adminPrivateKey);
    const backupAccount = privateKeyToAccount(backupPrivateKey);

    const protocolKitAdmin = await Safe.init({
      provider: rpcUrl,
      signer: adminPrivateKey,
      predictedSafe: {
        safeAccountConfig: {
          owners: [adminAccount.address, backupAccount.address, address],
          threshold: 2,
        },
        safeDeploymentConfig: {
          saltNonce: Date.now().toString(), // ensures unique address
        },
      },
    });

    const predictedSafeAddress = await protocolKitAdmin.getAddress();

    const deploymentTransaction = await protocolKitAdmin.createSafeDeploymentTransaction();

    const client = await protocolKitAdmin.getSafeProvider().getExternalSigner();

    if (!client) {
      this.loggerService.log("Unable to get Signer", SafeWalletService.name);
      throw new InternalServerErrorException("internalServerError");
    }

    const transactionHash = await client.sendTransaction({
      to: deploymentTransaction.to as Hash,
      value: BigInt(deploymentTransaction.value),
      data: deploymentTransaction.data as Hash,
      chain: this.chain,
    });

    await waitForTransactionReceipt(client, { hash: transactionHash });

    const safe = await protocolKitAdmin.connect({
      safeAddress: predictedSafeAddress,
    });

    const isSafeDeployed = await safe.isSafeDeployed();

    if (!isSafeDeployed) {
      this.loggerService.log(`Safe was not deployed :(`, SafeWalletService.name);
      throw new InternalServerErrorException("internalServerError");
    }

    const actualSafeAddress = await safe.getAddress();

    if (predictedSafeAddress !== actualSafeAddress) {
      this.loggerService.log(
        `Safe predicted address ${predictedSafeAddress} is different from the actual address ${actualSafeAddress}`,
        SafeWalletService.name,
      );
      throw new InternalServerErrorException("internalServerError");
    }

    return actualSafeAddress;
  }

  private prepareTransactionData(
    senderEntity: MerchantEntity,
    recipientEntity: MerchantEntity,
    offerEntity: OfferEntity,
    amount: bigint,
  ): MetaTransactionData {
    return {
      to: offerEntity.asset!.token!.contract!.address as Hash,
      value: "0",
      data: encodeFunctionData({
        abi: [
          {
            name: "safeTransferFrom",
            type: "function",
            stateMutability: "nonpayable",
            inputs: [
              { name: "from", type: "address" },
              { name: "to", type: "address" },
              { name: "id", type: "uint256" },
              { name: "amount", type: "uint256" },
              { name: "data", type: "bytes" },
            ],
            outputs: [],
          },
        ],
        functionName: "safeTransferFrom",
        args: [
          senderEntity.wallet!.multisig as Hash,
          recipientEntity.wallet!.multisig as Hash,
          offerEntity.asset!.token!.tokenId,
          amount,
          "0x",
        ],
      }),
      operation: OperationType.Call,
    };
  }

  public async transfer(
    senderEntity: MerchantEntity,
    receiverEntity: MerchantEntity,
    offerEntity: OfferEntity,
    fractions: bigint,
  ) {
    const adminPrivateKey = this.configService.get<Hash>("PRIVATE_KEY_1");
    if (!adminPrivateKey) {
      throw new NotImplementedException("Safe wallet is disabled: PRIVATE_KEY_1 not set");
    }

    const rpcUrl = this.configService.get<string>("RPC_URL", "http://localhost:8545/");
    const safeApiKey = this.configService.get<string>("SAFE_API_KEY", "");

    if (!senderEntity.wallet || !receiverEntity.wallet) {
      throw new NotFoundException("walletNotFound");
    }

    const protocolKitAdmin = await Safe.init({
      provider: rpcUrl,
      signer: adminPrivateKey,
      safeAddress: senderEntity.wallet.multisig,
    });

    const safeTransactionData = this.prepareTransactionData(senderEntity, receiverEntity, offerEntity, fractions);

    const safeTransaction = await protocolKitAdmin.createTransaction({
      transactions: [safeTransactionData],
    });

    const safeTransactionHash = await protocolKitAdmin.getTransactionHash(safeTransaction);

    const adminSignature = await protocolKitAdmin.signHash(safeTransactionHash);

    const apiKit = new SafeApiKit({
      chainId: BigInt(this.chain.id),
      apiKey: safeApiKey,
    });

    const adminAccount = privateKeyToAccount(adminPrivateKey);

    await apiKit.proposeTransaction({
      safeAddress: senderEntity.wallet.multisig,
      safeTransactionData: safeTransaction.data,
      safeTxHash: safeTransactionHash,
      senderAddress: adminAccount.address,
      senderSignature: adminSignature.data,
    });

    const protocolKitSender = await Safe.init({
      provider: rpcUrl,
      signer: this.privateKeyService.decryptPrivateKey(senderEntity.wallet.privateKey),
      safeAddress: senderEntity.wallet.multisig,
    });

    const senderSignature = await protocolKitSender.signHash(safeTransactionHash);

    await apiKit.confirmTransaction(safeTransactionHash, senderSignature.data);

    const executableTransaction = await apiKit.getTransaction(safeTransactionHash);

    return protocolKitAdmin.executeTransaction(executableTransaction);
  }
}
