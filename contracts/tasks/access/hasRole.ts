import { task } from "hardhat/config";

task("access-has-role", "Returns `true` if `account` has been granted `role`")
  .addParam("contract", "Contract address")
  .addParam("role", "Role")
  .addParam("account", "The users address")
  .setAction(async (args, hre) => {
    const { contract, role, account } = args;
    const contractInstance = await hre.ethers.getContractAt("AccessControl", contract);
    const hasRole = await contractInstance.hasRole(role, account);
    console.info("Has role:", hasRole);
  });

// MINTER_ROLE 0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6
// DEFAULT_ADMIN_ROLE 0x0000000000000000000000000000000000000000000000000000000000000000

// prod 0x263A37f478F81203239B24709dF9e8F2CC312144
// stag 0xb3B8ffAc899b912A44363260D424a4C6CA7B42A2

/*
hardhat access-has-role \
--contract 0x263A37f478F81203239B24709dF9e8F2CC312144 \
--account 0xaf702c00d22c3c4cc253ead6eb28b918aaaaaaaa \
--role 0x0000000000000000000000000000000000000000000000000000000000000000 \
--network polygon
 */
