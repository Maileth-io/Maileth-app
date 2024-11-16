import { ethers } from "ethers";
import { ROUTER_CONFIGS } from "./routerConfigs";

export const swapTokens = async (
  provider: ethers.providers.Web3Provider,
  routerName: keyof typeof ROUTER_CONFIGS,
  amountIn: string,
  amountOutMin: string,
  path: string[],
  recipient: string,
  deadline: number
) => {
  try {
    const signer = provider.getSigner();
    const routerConfig = ROUTER_CONFIGS[routerName];

    const routerContract = new ethers.Contract(routerConfig.routerAddress, routerConfig.abi, signer);

    // Approve the router to spend the input token
    const tokenIn = new ethers.Contract(path[0], ["function approve(address spender, uint amount) public returns (bool)"], signer);
    const approvalTx = await tokenIn.approve(routerConfig.routerAddress, ethers.utils.parseUnits(amountIn));
    await approvalTx.wait();

    // Perform the token swap
    const tx = await routerContract.swapExactTokensForTokens(
      ethers.utils.parseUnits(amountIn), // Input amount
      ethers.utils.parseUnits(amountOutMin), // Minimum output amount
      path, // Token path
      recipient, // Recipient address
      deadline // Deadline
    );

    console.log(`${routerConfig.name} Swap Transaction Hash:`, tx.hash);
    await tx.wait();

    console.log(`${routerConfig.name} Swap Successful`);
  } catch (error) {
    console.error(`${routerName} Swap Error:`, error);
  }
};
