import { task } from "hardhat/config";

task("erc1155-safe-transfer-from", "transfer an ERC1155 tokens")
  .addParam("contract", "The ERC1155 contract's address")
  .addParam("account", "The sender's address")
  .addParam("recipient", "The recipient's address")
  .addParam("id", "Token id")
  .addParam("amount", "Amount")
  .setAction(async (args, hre) => {
    const { contract, account, recipient, id, amount } = args;

    const contractInstance = await hre.ethers.getContractAt("ERC1155CoArt", contract);
    await contractInstance.safeTransferFrom(account, recipient, id, amount, "0x");

    console.info("ERC1155 safeTransferFrom");
  });

// prod 0x263A37f478F81203239B24709dF9e8F2CC312144
// stag 0xb3B8ffAc899b912A44363260D424a4C6CA7B42A2

/*
hardhat erc1155-balance-of \
--contract 0xe9D0708A1342D72f7d53025F1c7CDa2174d11272 \
--account 0x0000000087D560a6B257eB4A11B6392022967C06 \
--recipient 0xb06dA4249005C0d5E055DE00A131a560Fd1F9c7e \
--id 2 \
--amount 100 \
--network polygon \
*/
