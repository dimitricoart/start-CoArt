import { expect } from "chai";
import { ethers } from "hardhat";

import { amount, tokenId } from "../constants";
import type { IERC1155Options } from "../defaultMint";
import { defaultMintBatchERC1155, defaultMintERC1155 } from "../defaultMint";

export function shouldTotalSupply(factory: () => Promise<any>, options: IERC1155Options = {}) {
  const { mint = defaultMintERC1155, mintBatch = defaultMintBatchERC1155 } = options;

  describe("totalSupply", function () {
    it("should get total supply (mint)", async function () {
      const [owner, receiver] = await ethers.getSigners();
      const contractInstance = await factory();

      await mint(contractInstance, owner, receiver, tokenId, amount, "0x");

      const totalSupply = await contractInstance["totalSupply(uint256)"](tokenId);
      expect(totalSupply).to.equal(amount);
    });

    it("should get total supply (mintBatch)", async function () {
      const [owner, receiver] = await ethers.getSigners();
      const contractInstance = await factory();

      await mintBatch(contractInstance, owner, receiver, [tokenId], [amount], "0x");

      const totalSupply = await contractInstance["totalSupply(uint256)"](tokenId);
      expect(totalSupply).to.equal(amount);
    });
  });
}
