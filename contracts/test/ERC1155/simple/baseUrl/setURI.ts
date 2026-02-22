import { expect } from "chai";
import { ethers } from "hardhat";

import { amount, DEFAULT_ADMIN_ROLE, tokenId } from "../constants";
import type { IERC1155Options } from "../defaultMint";
import { defaultMintERC1155 } from "../defaultMint";

export function shouldSetURI(factory: () => Promise<any>, options: IERC1155Options = {}) {
  const { mint = defaultMintERC1155, adminRole = DEFAULT_ADMIN_ROLE } = options;

  describe("setURI", function () {
    it("should set uri", async function () {
      const newBaseTokenURI = "ipfs://";
      const [owner] = await ethers.getSigners();
      const contractInstance = await factory();

      await mint(contractInstance, owner, owner, tokenId, amount, "0x");
      await contractInstance.setURI(newBaseTokenURI);

      const uri = await contractInstance.uri(tokenId);
      expect(uri).to.equal(newBaseTokenURI);
    });

    it("should fail: AccessControlUnauthorizedAccount", async function () {
      const newBaseTokenURI = "ipfs://";
      const [owner, receiver] = await ethers.getSigners();
      const contractInstance = await factory();

      await mint(contractInstance, owner, owner, tokenId, amount, "0x");
      const tx = contractInstance.connect(receiver).setBaseURI(newBaseTokenURI);

      await expect(tx)
        .to.be.revertedWithCustomError(contractInstance, "AccessControlUnauthorizedAccount")
        .withArgs(receiver, adminRole);
    });
  });
}
