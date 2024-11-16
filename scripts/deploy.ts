import { ethers } from "hardhat";
import { providers, Wallet } from "ethers";
import * as dotenv from "dotenv";
dotenv.config();

// Supported chains configuration
const CHAINS = [
  {
    name: "Polygon",
    rpcUrl: "https://polygon-rpc.com",
    chainId: 137,
  },
  {
    name: "Chiliz",
    rpcUrl: "https://rpc.chiliz.com",
    chainId: 77,
  },
  {
    name: "Arbitrum",
    rpcUrl: "https://arb1.arbitrum.io/rpc",
    chainId: 42161,
  },
  {
    name: "Zircuit",
    rpcUrl: "https://rpc.zircuit.com", // Replace with actual RPC URL
    chainId: 12345, // Replace with actual Chain ID
  },
  {
    name: "Base",
    rpcUrl: "https://mainnet.base.org",
    chainId: 8453,
  },
];


const TEST_NET_CHAINS = [
  {
    name: "Polygon Mumbai",
    rpcUrl: "https://rpc-mumbai.maticvigil.com", // Polygon Mumbai Testnet
    chainId: 80001,
  },
  {
    name: "Chiliz Testnet",
    rpcUrl: "https://rpc.testnet.chiliz.com", // Replace with actual Chiliz testnet RPC URL
    chainId: 1234, // Replace with actual Chiliz testnet Chain ID
  },
  {
    name: "Arbitrum Goerli",
    rpcUrl: "https://goerli-rollup.arbitrum.io/rpc", // Arbitrum Goerli Testnet
    chainId: 421613,
  },
  {
    name: "Zircuit Testnet",
    rpcUrl: "https://rpc.testnet.zircuit.com", // Replace with actual Zircuit testnet RPC URL
    chainId: 12345, // Replace with actual Zircuit testnet Chain ID
  },
  {
    name: "Base Goerli",
    rpcUrl: "https://goerli.base.org", // Base Goerli Testnet
    chainId: 84531,
  },
];


const PRIVATE_KEY = process.env.PRIVATE_KEY || "";


async function main() {
  // for (const chain of CHAINS) {
  for (const chain of TEST_NET_CHAINS) {
    try {
      console.log(`\nDeploying to ${chain.name} (${chain.chainId})...`);

      // Set up provider and wallet for the current chain
      const provider = new providers.JsonRpcProvider(chain.rpcUrl);
      const wallet = new Wallet(PRIVATE_KEY, provider);

      console.log("Deploying contracts with the account:", wallet.address);

      // Fetch balance to ensure the wallet has enough funds
      const balance = await wallet.getBalance();
      console.log(`Balance: ${ethers.utils.formatEther(balance)} ETH`);

      if (balance.isZero()) {
        console.error(`Insufficient balance for deployment on ${chain.name}`);
        continue;
      }

      // Deploy the contract
      const AbstractWallet = await ethers.getContractFactory("AbstractWallet", wallet);
      const contract = await AbstractWallet.deploy(wallet.address);

      console.log(`${chain.name}: AbstractWallet deployed to: ${contract.address}`);
    } catch (error) {
      console.error(`Error deploying to ${chain.name}:`, error);
    }
  }
}

main().catch((error) => {
  console.error("Deployment failed:", error);
  process.exitCode = 1;
});
