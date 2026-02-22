import { ethers } from "hardhat";

import { baseTokenURI } from "./constants";

export async function deployERC1155(name: string): Promise<any> {
  const factory = await ethers.getContractFactory(name);
  return factory.deploy(baseTokenURI);
}
