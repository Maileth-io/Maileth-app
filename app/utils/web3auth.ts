import { Web3Auth } from "@web3auth/modal";
import { CHAIN_CONFIGS } from "./chainConfigs"; // Import the chain configurations
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";

const initWeb3Auth = async (selectedChain: keyof typeof CHAIN_CONFIGS) => {
  const chainConfig = CHAIN_CONFIGS[selectedChain];
  const privateKeyProvider = new EthereumPrivateKeyProvider({
    config: {
      chainConfig: {
        chainNamespace: chainConfig.chainNamespace,
        chainId: chainConfig.chainId,
        rpcTarget: chainConfig.rpcTarget,
        displayName: chainConfig.displayName,
        blockExplorerUrl: chainConfig.blockExplorerUrl,
        ticker: chainConfig.ticker,
        tickerName: chainConfig.tickerName,
      },
    },
  });

  const web3auth = new Web3Auth({
    clientId: "BMFV9XGUBPPUkPJvKA_LScW5ZWeqqNiW1lAyZH4e8Yf4Jc0MEY3HfG6bFnSpDbW4zXAIncT0xTQbD9NAUxb6B3Y", // Replace with your Web3Auth client ID
    chainConfig: {
      chainNamespace: chainConfig.chainNamespace,
      chainId: chainConfig.chainId,
      rpcTarget: chainConfig.rpcTarget,
      displayName: chainConfig.displayName,
      blockExplorerUrl: chainConfig.blockExplorerUrl,
      ticker: chainConfig.ticker,
      tickerName: chainConfig.tickerName,
    },
    privateKeyProvider,
  });

  await web3auth.initModal();
  return web3auth;
};

export default initWeb3Auth;
