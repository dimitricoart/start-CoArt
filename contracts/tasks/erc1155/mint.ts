import { task } from "hardhat/config";

task("erc1155-mint", "Mints ERC1155 tokens")
  .addParam("contract", "The ERC1155 contract's address")
  .addParam("to", "The account's address")
  .addParam("id", "Token id")
  .addParam("amount", "Amount")
  .setAction(async (args, hre) => {
    const { contract, to, id, amount } = args;

    const contractInstance = await hre.ethers.getContractAt("ERC1155CoArt", contract);
    await contractInstance.mint(to, id, amount, "0x");

    console.info(`ERC1155 mint ${id} ${amount}`);
  });

// prod 0x263A37f478F81203239B24709dF9e8F2CC312144
// stag 0xb3B8ffAc899b912A44363260D424a4C6CA7B42A2

/*
hardhat erc1155-mint \
--contract 0x263A37f478F81203239B24709dF9e8F2CC312144 \
--to 0x505394cD080ea38250f6aF0fB8f519ce987FA0c5 \
--id 1 \
--amount 100000000 \
--network polygon
*/
