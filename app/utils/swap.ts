import { ethers } from "ethers";
import { ROUTER_CONFIGS } from "./routerConfigs";
import axios from "axios";

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
    if (routerName === "cowSwap") {
      // CoW Swap Logic
      const apiEndpoint = ROUTER_CONFIGS.cowSwap.apiEndpoint;

      // Fetch CoW Swap quote
      const quoteResponse = await axios.post(`${apiEndpoint}/quote`, {
        sellToken: path[0],
        buyToken: path[path.length - 1],
        sellAmount: ethers.utils.parseUnits(amountIn).toString(),
        receiver: recipient,
        validTo: Math.floor(Date.now() / 1000) + 60 * 20, // 20 minutes
        appData: "0x", // Replace with your app-specific data
      });

      const quote = quoteResponse.data;

      console.log("CoW Swap Quote:", quote);

      // Sign and submit the order
      const signer = provider.getSigner();
      const signature = await signer.signMessage(ethers.utils.arrayify(quote.signingScheme));
      const orderResponse = await axios.post(`${apiEndpoint}/order`, {
        ...quote,
        signature,
      });

      console.log("CoW Swap Order Response:", orderResponse.data);
      return;
    }

    // Uniswap Logic
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
