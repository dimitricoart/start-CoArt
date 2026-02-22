import { ethers } from "hardhat";

export async function deployContract(name: string): Promise<any> {
  const factory = await ethers.getContractFactory(name);
  return factory.deploy();
}

export async function deployHolder(name = "AllTypesHolderMock") {
  return deployContract(name);
}

export async function deployRejector(name = "NativeRejectorMock") {
  return deployContract(name);
}
