import { DEFAULT_ADMIN_ROLE, InterfaceId, MINTER_ROLE } from "./simple/constants";
import { deployERC1155 } from "./simple/fixtures";
import { shouldBehaveLikeERC1155Simple } from "./simple";
import { shouldSupportsInterface } from "./simple/supportInterface";
import { shouldBehaveLikeAccessControl } from "./simple/access-control";

describe("ERC1155CoArt", function () {
  const factory = () => deployERC1155(this.title);

  shouldBehaveLikeAccessControl(factory)(DEFAULT_ADMIN_ROLE, MINTER_ROLE);
  shouldBehaveLikeERC1155Simple(factory);

  shouldSupportsInterface(factory)([
    InterfaceId.IERC165,
    InterfaceId.IAccessControl,
    InterfaceId.IERC1155,
    InterfaceId.IERC1155Metadata,
  ]);
});
