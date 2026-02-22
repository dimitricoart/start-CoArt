import { expect } from "chai";

import { baseTokenURI, tokenId } from "../constants";

export function shouldSetTokenURI(factory: () => Promise<any>) {
  describe("setTokenURI", function () {
    it("should get default token URI", async function () {
      const txId = "xn8kTtZl1a9pPHqUQxA21cGdArvA8L7eQ31b7P3pAeY";
      const contractInstance = await factory();

      const tx = await contractInstance.setTokenURI(tokenId, txId);
      await expect(tx).to.emit(contractInstance, "URI").withArgs(`${baseTokenURI}${txId}`, tokenId);

      const uri = await contractInstance.uri(tokenId);
      expect(uri).to.equal(`${baseTokenURI}${txId}`);
    });
  });
}
