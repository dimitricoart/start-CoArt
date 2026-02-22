import { task } from "hardhat/config";

task("erc1155-balance-of", "Prints an ERC1155 balance")
  .addParam("contract", "The ERC1155 contract's address")
  .addParam("account", "The account's address")
  .addParam("id", "Token id")
  .setAction(async (args, hre) => {
    const { contract, account, id } = args;

    const contractInstance = await hre.ethers.getContractAt("ERC1155CoArt", contract);
    const accBalance = await contractInstance.balanceOf(account, id);

    console.info("ERC1155 Balance:", accBalance);
  });

// prod 0x263A37f478F81203239B24709dF9e8F2CC312144
// stag 0xb3B8ffAc899b912A44363260D424a4C6CA7B42A2

/*
hardhat erc1155-balance-of \
--contract 0xe9d0708a1342d72f7d53025f1c7cda2174d11272 \
--account 0xb06dA4249005C0d5E055DE00A131a560Fd1F9c7e \
--id 4 \
--network polygon
*/
