export const ROUTER_CONFIGS = {
  uniswap: {
    name: "Uniswap",
    routerAddress: "0x7a250d5630b4cf539739df2c5dacf10c3a2cf25b", // Uniswap V2 Router
    abi: [
      "function swapExactTokensForTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)",
      "function getAmountsOut(uint amountIn, address[] memory path) public view returns (uint[] memory amounts)",
    ],
  },
  coswap: {
    name: "Coswap",
    routerAddress: "0xXXXX...XXXX", // Replace with Coswap Router Address
    abi: [
      // Add Coswap Router ABI here
    ],
  },
};
