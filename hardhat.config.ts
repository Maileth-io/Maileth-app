import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-ethers";

const config: HardhatUserConfig = {
  solidity: "0.8.9",
  networks: {
    polygon: {
      url: "https://polygon-rpc.com",
      accounts: ["YOUR_PRIVATE_KEY"], // Replace with your wallet private key
    },
  },
};

export default config;
