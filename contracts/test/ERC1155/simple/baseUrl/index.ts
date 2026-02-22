import type { IERC1155Options } from "../defaultMint";
import { shouldSetURI } from "./setURI";
import { shouldSetTokenURI } from "./setTokenURI";
import { shouldSetBaseURI } from "./setBaseURI";
import { shouldGetURI } from "./uri";

export function shouldBehaveLikeERC1155BaseUrl(factory: () => Promise<any>, _options?: IERC1155Options) {
  shouldGetURI(factory);
  shouldSetURI(factory);
  shouldSetTokenURI(factory);
  shouldSetBaseURI(factory);
}

export { shouldSetURI, shouldSetBaseURI, shouldGetURI };
