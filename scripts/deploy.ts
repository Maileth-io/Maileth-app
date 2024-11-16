import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const AbstractWallet = await ethers.getContractFactory("AbstractWallet");
  const wallet = await AbstractWallet.deploy(deployer.address);

  console.log("AbstractWallet deployed to:", wallet.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
