import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-deploy";
import "@nomicfoundation/hardhat-verify";
import dotenv from "dotenv";

dotenv.config();

const { ARBISCAN_APY_KEY, ARBITRUM_SEPOLIA_RPC_URL, WALLET_PRIVATE_KEY } = process.env;

if (!ARBISCAN_APY_KEY || !ARBITRUM_SEPOLIA_RPC_URL || !WALLET_PRIVATE_KEY) {
  throw new Error(
    "Please set ARBISCAN_APY_KEY, ARBITRUM_SEPOLIA_RPC_URL, WALLET_PRIVATE_KEY in .env file"
  );
}

const ACCOUNTS: string[] = [WALLET_PRIVATE_KEY];

const SOLC_SETTINGS = {
  optimizer: {
    enabled: true,
    runs: 200,
  },
};

const defaultNetwork: string = "hardhat";

const config: HardhatUserConfig = {
  defaultNetwork: defaultNetwork,
  networks: {
    hardhat: {
      chainId: 1337,
    },
    localhost: {
      chainId: 1337,
      url: "http://127.0.0.1:8545/",
    },
    arbitrumSepolia: {
      accounts: ACCOUNTS,
      chainId: 421614,
      url: ARBITRUM_SEPOLIA_RPC_URL,
    },
  },
  etherscan: {
    apiKey: ARBISCAN_APY_KEY,
  },
  solidity: {
    compilers: [
      {
        version: "0.8.24",
        settings: SOLC_SETTINGS,
      },
      {
        version: "0.8.23",
        settings: SOLC_SETTINGS,
      },
      {
        version: "0.8.22",
        settings: SOLC_SETTINGS,
      },
    ],
  },
};

export default config;
