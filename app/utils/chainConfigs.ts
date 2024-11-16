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
  ethereum: {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: "0x1", // Ethereum Mainnet Chain ID (1 in hexadecimal)
    rpcTarget: "https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID", // Replace with your Infura Project RPC
    displayName: "Ethereum Mainnet",
    blockExplorerUrl: "https://etherscan.io",
    ticker: "ETH",
    tickerName: "Ethereum",
  },
  optimism: {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: "0xa", // Optimism Chain ID (10 in hexadecimal)
    rpcTarget: "https://mainnet.optimism.io", // Optimism RPC
    displayName: "Optimism",
    blockExplorerUrl: "https://optimistic.etherscan.io",
    ticker: "ETH",
    tickerName: "Ethereum",
  },
  polygonZkEVM: {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: "0x144", // Polygon zkEVM Chain ID (324 in hexadecimal)
    rpcTarget: "https://zkevm-rpc.com", // Polygon zkEVM RPC
    displayName: "Polygon zkEVM",
    blockExplorerUrl: "https://zkevm.polygonscan.com",
    ticker: "ETH",
    tickerName: "Ethereum",
  },
  xdai: {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: "0x64", // xDai Chain ID (100 in hexadecimal)
    rpcTarget: "https://rpc.gnosischain.com", // xDai RPC
    displayName: "xDai",
    blockExplorerUrl: "https://blockscout.com/xdai/mainnet",
    ticker: "xDai",
    tickerName: "xDai",
  },
  mina: {
    chainNamespace: CHAIN_NAMESPACES.OTHER, // Mina is not EVM-based
    chainId: "1", // Mina's mainnet chain ID
    rpcTarget: "https://proxy.mainnet.minaexplorer.com/rpc", // Mina RPC endpoint
    displayName: "Mina Protocol",
    blockExplorerUrl: "https://minaexplorer.com",
    ticker: "MINA",
    tickerName: "Mina",
  },
  mantle: {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: "0x1389", // Mantle Chain ID (5000 in hexadecimal)
    rpcTarget: "https://rpc.mantle.xyz", // Mantle RPC
    displayName: "Mantle",
    blockExplorerUrl: "https://explorer.mantle.xyz",
    ticker: "MNT",
    tickerName: "Mantle",
  },
  bsc: {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: "0x38", // Binance Smart Chain Mainnet ID (56 in hexadecimal)
    rpcTarget: "https://bsc-dataseed.binance.org", // BSC RPC
    displayName: "Binance Smart Chain",
    blockExplorerUrl: "https://bscscan.com",
    ticker: "BNB",
    tickerName: "Binance Coin",
  },
  scroll: {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: "0x2710", // Scroll Alpha Testnet Chain ID (10000 in hexadecimal)
    rpcTarget: "https://scroll.io/rpc", // Scroll RPC
    displayName: "Scroll Alpha",
    blockExplorerUrl: "https://scroll.io/explorer",
    ticker: "ETH",
    tickerName: "Ethereum",
  },
};
