import {
  Inject,
  Injectable,
  Logger,
  LoggerService,
  NotImplementedException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Chain, createWalletClient, encodeFunctionData, Hash, http, createPublicClient } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { waitForTransactionReceipt } from "viem/actions";

import { TokenEntity } from "../hierarchy/token/token.entity";
import { WalletEntity } from "../wallet/wallet.entity";
import { CHAIN_PROVIDER } from "./chain.provider";

const BOOST = 20; // %

@Injectable()
export class SignerService {
  constructor(
    @Inject(Logger)
    private readonly loggerService: LoggerService,
    @Inject(CHAIN_PROVIDER)
    private readonly chain: Chain,
    private readonly configService: ConfigService,
  ) {}

  public async mint(tokenEntity: TokenEntity, walletEntity: WalletEntity): Promise<string> {
    const adminPrivateKey = this.configService.get<Hash>("PRIVATE_KEY_1");
    if (!adminPrivateKey) {
      throw new NotImplementedException("Blockchain signer is disabled: PRIVATE_KEY_1 not set");
    }

    const account = privateKeyToAccount(adminPrivateKey);
    const client = createWalletClient({
      account,
      chain: this.chain,
      transport: http(),
    });

    const transactionHash = await client.sendTransaction({
      to: tokenEntity.contract!.address as Hash,
      data: encodeFunctionData({
        abi: [
          {
            inputs: [
              {
                internalType: "address",
                name: "to",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "id",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
              },
              {
                internalType: "bytes",
                name: "data",
                type: "bytes",
              },
            ],
            name: "mint",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
        ],
        functionName: "mint",
        args: [walletEntity.multisig as Hash, tokenEntity.tokenId, tokenEntity.amount, "0x"],
      }),
      maxPriorityFeePerGas: await this.getBoostedPriorityFee(BOOST),
    });

    this.loggerService.log(`Transaction hash: ${transactionHash}`, SignerService.name);

    await waitForTransactionReceipt(client, { hash: transactionHash });

    return transactionHash;
  }

  public async setTokenURI(tokenEntity: TokenEntity, arHash: string): Promise<string> {
    const adminPrivateKey = this.configService.get<Hash>("PRIVATE_KEY_1");
    if (!adminPrivateKey) {
      throw new NotImplementedException("Blockchain signer is disabled: PRIVATE_KEY_1 not set");
    }

    const account = privateKeyToAccount(adminPrivateKey);
    const client = createWalletClient({
      account,
      chain: this.chain,
      transport: http(),
    });

    const transactionHash = await client.sendTransaction({
      to: tokenEntity.contract!.address as Hash,
      data: encodeFunctionData({
        abi: [
          {
            inputs: [
              {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
              },
              {
                internalType: "string",
                name: "txId",
                type: "string",
              },
            ],
            name: "setTokenURI",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
        ],
        functionName: "setTokenURI",
        args: [tokenEntity.tokenId, arHash],
      }),
      maxPriorityFeePerGas: await this.getBoostedPriorityFee(BOOST),
    });

    this.loggerService.log(`Transaction hash: ${transactionHash}`, SignerService.name);

    await waitForTransactionReceipt(client, { hash: transactionHash });

    return transactionHash;
  }

  private async getBoostedPriorityFee(boostPercentage: number) {
    const publicClient = createPublicClient({
      chain: this.chain,
      transport: http(),
    });

    const maxPriorityFeePerGas = await publicClient.estimateMaxPriorityFeePerGas();
    return (maxPriorityFeePerGas * BigInt(100 + boostPercentage)) / 100n;
  }
}
