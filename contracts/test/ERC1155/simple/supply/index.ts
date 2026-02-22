import type { IERC1155Options } from "../defaultMint";
import { shouldTotalSupply } from "./totalSupply";

export function shouldBehaveLikeERC1155Supply(factory: () => Promise<any>, options?: IERC1155Options) {
  shouldTotalSupply(factory, options);
}
