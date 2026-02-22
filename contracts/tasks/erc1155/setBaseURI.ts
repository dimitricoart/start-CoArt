import { task } from "hardhat/config";

task("erc1155-set-base-uri", "Mints ERC1155 tokens")
  .addParam("contract", "The ERC1155 contract's address")
  .addParam("uri", "URI")
  .setAction(async (args, hre) => {
    const { contract, uri } = args;

    const contractInstance = await hre.ethers.getContractAt("ERC1155CoArt", contract);
    await contractInstance.setBaseURI(uri);

    console.info(`ERC1155 setBaseUrl ${uri}`);
  });

// prod 0x263A37f478F81203239B24709dF9e8F2CC312144
// stag 0xb3B8ffAc899b912A44363260D424a4C6CA7B42A2

/*
hardhat erc1155-set-base-uri \
--contract 0xce93Ce72953C16f98fCf8C31Bb430783CAdd6082 \
--uri ar:// \
--network polygon
*/
