import { config } from "dotenv";
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-contract-sizer";

import "./tasks";

config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
});

export default {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      allowUnlimitedContractSize: true,
      blockGasLimit: 40966424, // default: 3e7
      gas: "auto",
    },
    besu: {
      url: process.env.JSON_RPC_ADDR_BESU,
      timeout: 142000,
      accounts: [
        "0x8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63", // 0xfe3b557e8fb62b89f4916b721be55ceb828dbd73
        "0xc87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3", // 0x627306090abab3a6e1400e9345bc60c78a8bef57
        "0xae6ae8e5ccbfb04590405997ee2d52d2b330726137b875053c36d94e974d162f", // 0xf17f52151EbEF6C7334FAD080c5704D77216b732
      ],
    },
    polygon: {
      url: process.env.JSON_RPC_ADDR_POLYGON,
      accounts: [process.env.PRIVATE_KEY_1, process.env.PRIVATE_KEY_2, process.env.PRIVATE_KEY_3],
      timeout: 142000,
      gasPrice: "auto",
      gasMultiplier: 1.2, // multiply estimated gas by 1.2
    },
    polygon_amoy: {
      url: process.env.JSON_RPC_ADDR_POLYGON_AMOY,
      accounts: [process.env.PRIVATE_KEY_1, process.env.PRIVATE_KEY_2, process.env.PRIVATE_KEY_3],
      timeout: 142000,
    },
  },
  solidity: {
    compilers: [
      {
        version: "0.8.24",
        settings: {
          evmVersion: "cancun",
          optimizer: {
            enabled: true,
            runs: 1000, // DO NOT CHANGE
          },
        },
      },
    ],
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS === "true",
  },
  etherscan: {
    apiKey: {
      polygon: process.env.ETHERSCAN_API_KEY,
    },
  },
} as HardhatUserConfig;
