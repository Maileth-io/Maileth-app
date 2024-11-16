"use client";

import { useState } from "react";
import initWeb3Auth from "../utils/web3auth";
import { CHAIN_CONFIGS } from "../utils/chainConfigs";
import { swapTokens } from "../utils/swap";

export default function Home() {
  const [selectedChain, setSelectedChain] = useState<keyof typeof CHAIN_CONFIGS>("polygon");
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  // Token Swap State
  const [routerName, setRouterName] = useState<"uniswap" | "coswap">("uniswap");
  const [amountIn, setAmountIn] = useState<string>("");
  const [amountOutMin, setAmountOutMin] = useState<string>("");
  const [path, setPath] = useState<string[]>([]); // Array of token addresses
  const [recipient, setRecipient] = useState<string>("");
  const [deadline, setDeadline] = useState<number>(Math.floor(Date.now() / 1000) + 60 * 20); // 20 minutes from now
  const [swapMessage, setSwapMessage] = useState<string>("");

  // Login with Web3Auth
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

  // Perform Token Swap
  const swap = async () => {
    try {
      if (!window.ethereum) throw new Error("MetaMask not found");

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []); // Request wallet connection

      await swapTokens(provider, routerName, amountIn, amountOutMin, path, recipient, deadline);

      setSwapMessage(`Swap on ${routerName} successful!`);
    } catch (error) {
      setSwapMessage(`Swap error: ${(error as Error).message}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">Multi-Chain Wallet with Swap</h1>

      {/* Chain Selection */}
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

      {/* Login Button */}
      <button onClick={login} className="bg-blue-500 text-white px-6 py-2 rounded mb-4">
        Login with Web3Auth
      </button>

      {walletAddress && (
        <p className="text-lg mb-6">
          <strong>Wallet Address:</strong> {walletAddress}
        </p>
      )}

      {/* Swap Tokens */}
      <div className="w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Swap Tokens</h2>

        {/* Router Selection */}
        <label htmlFor="router-select" className="block text-lg mb-2">Select Router:</label>
        <select
          id="router-select"
          value={routerName}
          onChange={(e) => setRouterName(e.target.value as "uniswap" | "coswap")}
          className="p-2 border rounded mb-4 w-full"
        >
          <option value="uniswap">Uniswap</option>
          <option value="coswap">Coswap</option>
        </select>

        {/* Token Swap Inputs */}
        <input
          type="text"
          placeholder="Amount In"
          value={amountIn}
          onChange={(e) => setAmountIn(e.target.value)}
          className="p-2 border rounded mb-2 w-full"
        />
        <input
          type="text"
          placeholder="Minimum Amount Out"
          value={amountOutMin}
          onChange={(e) => setAmountOutMin(e.target.value)}
          className="p-2 border rounded mb-2 w-full"
        />
        <input
          type="text"
          placeholder="Token Path (comma separated)"
          value={path.join(",")}
          onChange={(e) => setPath(e.target.value.split(","))}
          className="p-2 border rounded mb-2 w-full"
        />
        <input
          type="text"
          placeholder="Recipient Address"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          className="p-2 border rounded mb-2 w-full"
        />
        <button onClick={swap} className="bg-green-500 text-white px-6 py-2 rounded mb-4 w-full">
          Swap
        </button>

        {/* Swap Message */}
        {swapMessage && <p className="text-center text-lg">{swapMessage}</p>}
      </div>
    </div>
  );
}
