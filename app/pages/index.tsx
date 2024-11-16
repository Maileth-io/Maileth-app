"use client";

import { useState } from "react";
import initWeb3Auth from "../utils/web3auth";
import { CHAIN_CONFIGS } from "../utils/chainConfigs";

export default function Home() {
  const [selectedChain, setSelectedChain] = useState<keyof typeof CHAIN_CONFIGS>("polygon");
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  const login = async () => {
    try {
      const web3auth = await initWeb3Auth(selectedChain);
      const provider = await web3auth.connect();
      const accounts = await provider.request({ method: "eth_accounts" });
      if (accounts.length === 0) {
        throw new Error("No accounts found");
      }
      setWalletAddress(accounts[0] as string);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">Multi-Chain Wallet</h1>

      <label htmlFor="chain-select" className="text-lg mb-2">Select Chain:</label>
      <select
        id="chain-select"
        value={selectedChain}
        onChange={(e) => setSelectedChain(e.target.value as keyof typeof CHAIN_CONFIGS)}
        className="p-2 border rounded mb-4"
      >
        {Object.entries(CHAIN_CONFIGS).map(([key, config]) => (
          <option key={key} value={key}>
            {config.displayName}
          </option>
        ))}
      </select>

      <button onClick={login} className="bg-blue-500 text-white px-6 py-2 rounded mb-4">
        Login with Web3Auth
      </button>

      {walletAddress && (
        <p className="text-lg">
          <strong>Wallet Address:</strong> {walletAddress}
        </p>
      )}
    </div>
  );
}
