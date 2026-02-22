import { shouldBalanceOf } from "./balanceOf";
import { shouldBalanceOfBatch } from "./balanceOfBatch";
import { shouldMintBatch } from "./mintBatch";
import { shouldMint } from "./mint";
import { shouldSafeTransferFrom } from "./safeTransferFrom";
import { shouldSafeBatchTransferFrom } from "./safeBatchTransferFrom";
import { shouldSetApprovalForAll } from "./setApprovalForAll";

export function shouldBehaveLikeERC1155(factory: () => Promise<any>) {
  shouldMint(factory);
  shouldMintBatch(factory);
  shouldBalanceOf(factory);
  shouldBalanceOfBatch(factory);
  shouldSetApprovalForAll(factory);
  shouldSafeTransferFrom(factory);
  shouldSafeBatchTransferFrom(factory);
}
