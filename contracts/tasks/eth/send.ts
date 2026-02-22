import { task } from "hardhat/config";

task("send-eth", "Send ETH")
  .addParam("account", "Recipient address")
  .addParam("amount", "Amount in ETH")
  .setAction(async (args, hre) => {
    const [signer] = await hre.ethers.getSigners();
    const tx = await signer.sendTransaction({
      to: args.account,
      value: hre.ethers.parseEther(args.amount),
    });

    console.info("Sent ETH tx:", tx.hash);
  });

/*
hardhat send-eth \
--account 0xaf702c00d22c3c4cc253ead6eb28b918aaaaaaaa \
--amount 0.05 \
--network polygon
*/
