import { task } from "hardhat/config";

task("erc1155-set-token-uri", "Mints ERC1155 tokens")
  .addParam("contract", "The ERC1155 contract's address")
  .addParam("id", "Token id")
  .addParam("ar", "Arweave hash")
  .setAction(async (args, hre) => {
    const { contract, id, ar } = args;

    const contractInstance = await hre.ethers.getContractAt("ERC1155CoArt", contract);
    await contractInstance.setTokenURI(id, ar);

    console.info(`ERC1155 setTokenUrl ${id} ${ar}`);
  });

// prod 0x263A37f478F81203239B24709dF9e8F2CC312144
// stag 0xb3B8ffAc899b912A44363260D424a4C6CA7B42A2

/*
hardhat erc1155-set-token-uri \
--contract 0xb3B8ffAc899b912A44363260D424a4C6CA7B42A2 \
--id 1 \
--ar NuCAX1gNS9dxKXgCrWUGsNXs6eJ06N9geyaRvobGYFM \
--network polygon
*/
