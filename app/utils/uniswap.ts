import { ethers } from "ethers";
import { UNISWAP_V2_ROUTER_ABI } from "./uniswapRouter";

export const UNISWAP_ROUTER_ADDRESS = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D"; // Uniswap V2 Router Address on Ethereum Mainnet

// Perform token swap on Uniswap
export const uniswapSwapTokens = async (
  provider: ethers.providers.Web3Provider,
  amountIn: string,
  amountOutMin: string,
  path: string[],
  recipient: string,
  deadline: number
) => {
  try {
    const signer = provider.getSigner();
    const routerContract = new ethers.Contract(UNISWAP_ROUTER_ADDRESS, UNISWAP_V2_ROUTER_ABI, signer);

    // Approve router to spend input tokens
    const tokenIn = new ethers.Contract(path[0], ["function approve(address spender, uint amount) public returns (bool)"], signer);
    const approvalTx = await tokenIn.approve(UNISWAP_ROUTER_ADDRESS, ethers.utils.parseUnits(amountIn));
    await approvalTx.wait();

    // Execute swap
    const swapTx = await routerContract.swapExactTokensForTokens(
      ethers.utils.parseUnits(amountIn), // Input amount
      ethers.utils.parseUnits(amountOutMin), // Minimum output amount
      path, // Token path (e.g., [DAI, WETH])
      recipient, // Recipient address
      deadline // Deadline for the transaction
    );

    console.log("Uniswap Swap Transaction Hash:", swapTx.hash);
    await swapTx.wait();
    console.log("Uniswap Swap Successful");
  } catch (error) {
    console.error("Uniswap Swap Error:", error);
    throw error;
  }
};

// Get output amount for a token swap
export const uniswapGetAmountsOut = async (
  provider: ethers.providers.JsonRpcProvider,
  amountIn: string,
  path: string[]
): Promise<string[]> => {
  try {
    const routerContract = new ethers.Contract(UNISWAP_ROUTER_ADDRESS, UNISWAP_V2_ROUTER_ABI, provider);

    const amountsOut = await routerContract.getAmountsOut(ethers.utils.parseUnits(amountIn), path);
    return amountsOut.map((amount: ethers.BigNumber) => ethers.utils.formatUnits(amount));
  } catch (error) {
    console.error("Uniswap GetAmountsOut Error:", error);
    throw error;
  }
};
