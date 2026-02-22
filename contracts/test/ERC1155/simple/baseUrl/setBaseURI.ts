import { expect } from "chai";
import { ethers } from "hardhat";

import { amount, baseTokenURI, DEFAULT_ADMIN_ROLE, tokenId } from "../constants";
import type { IERC1155Options } from "../defaultMint";
import { defaultMintERC1155 } from "../defaultMint";

export function shouldSetBaseURI(factory: () => Promise<any>, options: IERC1155Options = {}) {
  const { mint = defaultMintERC1155, adminRole = DEFAULT_ADMIN_ROLE } = options;

  describe("setBaseURI", function () {
    it("should set base token uri", async function () {
      const newBaseTokenURI = "ipfs://";
      const [owner] = await ethers.getSigners();
      const contractInstance = await factory();

      await mint(contractInstance, owner, owner, tokenId, amount, "0x");
      await contractInstance.setBaseURI(newBaseTokenURI);

      const uri = await contractInstance.uri(tokenId);
      expect(uri).to.equal(baseTokenURI);
    });

    it("should set base token uri and custom token URI", async function () {
      const newBaseTokenURI = "ipfs://";
      const txId = "xn8kTtZl1a9pPHqUQxA21cGdArvA8L7eQ31b7P3pAeY";

      const [owner] = await ethers.getSigners();
      const contractInstance = await factory();

      await mint(contractInstance, owner, owner, tokenId, amount, "0x");
      await contractInstance.setBaseURI(newBaseTokenURI);

      const tx = await contractInstance.setTokenURI(tokenId, txId);
      await expect(tx).to.emit(contractInstance, "URI").withArgs(`${newBaseTokenURI}${txId}`, tokenId);

      const uri = await contractInstance.uri(tokenId);
      expect(uri).to.equal(`${newBaseTokenURI}${txId}`);
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
