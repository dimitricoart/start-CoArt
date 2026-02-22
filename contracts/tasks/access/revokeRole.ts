import { task } from "hardhat/config";

task("access-revoke-role", "Grants address a role to contract")
  .addParam("contract", "Contract address")
  .addParam("role", "Role")
  .addParam("account", "Contract address")
  .setAction(async (args, hre) => {
    const { contract, role, account } = args;
    const contractInstance = await hre.ethers.getContractAt("AccessControl", contract);
    const tx = await contractInstance.revokeRole(role, account);
    console.info("Role revoked, tx:", tx.hash);
  });

// MINTER_ROLE 0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6
// DEFAULT_ADMIN_ROLE 0x0000000000000000000000000000000000000000000000000000000000000000

// prod 0x263A37f478F81203239B24709dF9e8F2CC312144
// stag 0xb3B8ffAc899b912A44363260D424a4C6CA7B42A2

/*
hardhat access-revoke-role \
--contract 0x263A37f478F81203239B24709dF9e8F2CC312144 \
--account 0x0000000087D560a6B257eB4A11B6392022967C06 \
--role 0x0000000000000000000000000000000000000000000000000000000000000000 \
--network polygon
 */
