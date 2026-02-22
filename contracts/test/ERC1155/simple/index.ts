import { shouldBehaveLikeERC1155 } from "./base";
import { shouldBehaveLikeERC1155Capped } from "./capped";
import { shouldBehaveLikeERC1155Burnable } from "./burnable";
import { shouldBehaveLikeERC1155BaseUrl } from "./baseUrl";
import { shouldBehaveLikeERC1155Supply } from "./supply";

export function shouldBehaveLikeERC1155Simple(factory: () => Promise<any>) {
  shouldBehaveLikeERC1155(factory);
  shouldBehaveLikeERC1155Burnable(factory);
  shouldBehaveLikeERC1155Supply(factory);
  shouldBehaveLikeERC1155BaseUrl(factory);
  shouldBehaveLikeERC1155Capped(factory);
}
