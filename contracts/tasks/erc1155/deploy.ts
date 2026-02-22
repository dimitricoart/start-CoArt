import { task } from "hardhat/config";

const baseTokenURI = "https://fcc.fractown.com/metadata";

task("erc1155-deploy", "Deploys ERC1155 contract").setAction(async (_, hre) => {
  const coinFactory = await hre.ethers.getContractFactory("ERC1155CoArt");
  const contractInstance = await coinFactory.deploy(baseTokenURI);

  console.info(`ERC1155 deployed to ${await contractInstance.getAddress()}`);
});

// hardhat erc1155-deploy --network polygon
