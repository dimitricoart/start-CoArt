import type { IERC1155Options } from "../defaultMint";
import { shouldMint } from "./mint";
import { shouldMintBatch } from "./mintBatch";

export function shouldBehaveLikeERC1155Capped(factory: () => Promise<any>, options?: IERC1155Options) {
  shouldMint(factory, options);
  shouldMintBatch(factory, options);
}
