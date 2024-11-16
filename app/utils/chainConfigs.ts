import { CHAIN_NAMESPACES } from "@web3auth/base";

export const CHAIN_CONFIGS = {
  chiliz: {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: "0x4d", // Chiliz Chain ID (77 in hexadecimal)
    rpcTarget: "https://rpc.chiliz.com", // Chiliz RPC
    displayName: "Chiliz Chain",
    blockExplorerUrl: "https://explorer.chiliz.com",
    ticker: "CHZ",
    tickerName: "Chiliz Token",
  },
  polygon: {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: "0x89", // Polygon Chain ID (137 in hexadecimal)
    rpcTarget: "https://polygon-rpc.com", // Polygon RPC
    displayName: "Polygon Mainnet",
    blockExplorerUrl: "https://polygonscan.com",
    ticker: "MATIC",
    tickerName: "Polygon",
  },
  arbitrum: {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: "0xa4b1", // Arbitrum Chain ID (42161 in hexadecimal)
    rpcTarget: "https://arb1.arbitrum.io/rpc", // Arbitrum RPC
    displayName: "Arbitrum One",
    blockExplorerUrl: "https://arbiscan.io",
    ticker: "ETH",
    tickerName: "Ethereum",
  },
  zircuit: {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: "0xXXXX", // Replace with Zircuit Chain ID in hexadecimal
    rpcTarget: "https://rpc.zircuit.com", // Replace with Zircuit RPC URL
    displayName: "Zircuit",
    blockExplorerUrl: "https://explorer.zircuit.com",
    ticker: "ZRC",
    tickerName: "Zircuit Token",
  },
  base: {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: "0x2105", // Base Chain ID (8453 in hexadecimal)
    rpcTarget: "https://mainnet.base.org", // Base RPC
    displayName: "Base Mainnet",
    blockExplorerUrl: "https://basescan.org",
    ticker: "ETH",
    tickerName: "Ethereum",
  },
};
