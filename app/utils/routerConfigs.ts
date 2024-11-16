export const ROUTER_CONFIGS = {
  uniswap: {
    name: "Uniswap",
    routerAddress: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D", // Uniswap V2 Router
    abi: [
      "function swapExactTokensForTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)",
      "function getAmountsOut(uint amountIn, address[] memory path) public view returns (uint[] memory amounts)",
    ],
  },
  cowSwap: {
    name: "CoW Swap",
    apiEndpoint: "https://api.cow.fi/mainnet/api/v1", // Replace with the testnet endpoint if needed
  },
};
