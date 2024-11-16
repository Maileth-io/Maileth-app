import { Web3Auth } from "@web3auth/modal";
import { CHAIN_NAMESPACES } from "@web3auth/base";

const web3auth = new Web3Auth({
  clientId: "YOUR_WEB3AUTH_CLIENT_ID", // Replace with your Web3Auth client ID
  chainConfig: {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: "0x89", // Polygon Mainnet
    rpcTarget: "https://polygon-rpc.com", // Polygon RPC
  },
});

export default web3auth;
