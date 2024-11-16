"use client";

import { useState, useEffect } from "react";
import web3auth from "./utils/web3auth";
import { ethers } from "ethers";
import { getTransactionDetails, TransactionDetails } from "./utils/blockscout";
import { IDKitWidget } from '@worldcoin/idkit';

const CONTRACT_ADDRESS = "YOUR_DEPLOYED_CONTRACT_ADDRESS";
const ABI = [
  "function transfer(address payable _to, uint256 _amount) external",
  "function owner() public view returns (address)",
];

const WorldIDVerification = () => {
  const handleSuccess = (result) => {
    // Handle successful verification here
    console.log('Verification successful:', result);
  };

  return (
      <div>
        <h1>Welcome to My App</h1>
        <IDKitWidget
            action={process.env.NEXT_PUBLIC_WLD_ACTION_NAME}
            app_id={process.env.NEXT_PUBLIC_WLD_APP_ID}
            onSuccess={handleSuccess}
        >
          {({ open }) => (
              <button onClick={open}>
                Verify with World ID
              </button>
          )}
        </IDKitWidget>
      </div>
  );
};

export default function Home() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [txHash, setTxHash] = useState<string>("");
  const [transaction, setTransaction] = useState<TransactionDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [recipient, setRecipient] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  // Initialize Web3Auth
  useEffect(() => {
    const initWeb3Auth = async () => {
      try {
        await web3auth("chiliz");
        setIsLoading(false);
      } catch (error) {
        console.error("Web3Auth initialization error:", error);
      }
    };

    initWeb3Auth();
  }, []);

  // Login with Web3Auth
  const login = async () => {
    try {
      const provider = await web3auth("chiliz");
      const ethersProvider = new ethers.providers.Web3Provider(provider);
      const signer = ethersProvider.getSigner();
      const address = await signer.getAddress();
      const balanceInWei = await ethersProvider.getBalance(address);

      setWalletAddress(address);
      setBalance(ethers.utils.formatEther(balanceInWei));
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  // Logout from Web3Auth
  const logout = async () => {
    try {
      // await web3auth.logout();
      setWalletAddress(null);
      setBalance(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Fetch transaction details using Blockscout
  const fetchTransaction = async () => {
    try {
      const details = await getTransactionDetails(txHash);
      setTransaction(details);
      setError(null);
    } catch (err) {
      setError((err as Error).message);
      setTransaction(null);
    }
  };

  // Interact with the smart contract
  const sendTransaction = async () => {
    try {
      if (!window) throw new Error("No wallet connected");

      const provider = new ethers.providers.Web3Provider(window);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

      const tx = await contract.transfer(recipient, ethers.utils.parseEther(amount));
      setMessage(`Transaction sent! Hash: ${tx.hash}`);
    } catch (error) {
      setMessage((error as Error).message);
    }
  };

  return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-100">
        <h1 className="text-3xl font-bold mb-6">Web3Auth Wallet</h1>

        {isLoading ? (
            <p className="text-lg">Initializing Web3Auth...</p>
        ) : walletAddress ? (
            <div className="w-full max-w-md">
              {/* Wallet Info */}
              <div className="mb-6 text-center">
                <p>
                  <strong>Wallet Address:</strong> {walletAddress}
                </p>
                <p>
                  <strong>Balance:</strong> {balance} ETH
                </p>
                <button
                    onClick={logout}
                    className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 mt-4"
                >
                  Logout
                </button>
              </div>

              {/* Blockscout Transaction Fetch */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Check Transaction Details</h2>
                <input
                    type="text"
                    placeholder="Enter Transaction Hash"
                    value={txHash}
                    onChange={(e) => setTxHash(e.target.value)}
                    className="border p-2 rounded w-full mb-2"
                />
                <button
                    onClick={fetchTransaction}
                    className="bg-blue-500 text-white px-4 py-2 rounded w-full"
                >
                  Fetch
                </button>
                {error && <p className="text-red-500 mt-4">{error}</p>}
                {transaction && (
                    <div className="mt-4">
                      <p>
                        <strong>Hash:</strong> {transaction.hash}
                      </p>
                      <p>
                        <strong>From:</strong> {transaction.from}
                      </p>
                      <p>
                        <strong>To:</strong> {transaction.to}
                      </p>
                      <p>
                        <strong>Value:</strong> {transaction.value}
                      </p>
                      <p>
                        <strong>Gas:</strong> {transaction.gas}
                      </p>
                    </div>
                )}
              </div>

              {/* Smart Contract Interaction */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Send ETH</h2>
                <input
                    type="text"
                    placeholder="Recipient Address"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    className="border p-2 rounded w-full mb-2"
                />
                <input
                    type="text"
                    placeholder="Amount in ETH"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="border p-2 rounded w-full mb-2"
                />
                <button
                    onClick={sendTransaction}
                    className="bg-green-500 text-white px-4 py-2 rounded w-full"
                >
                  Send
                </button>
                {message && <p className="mt-4">{message}</p>}
              </div>
            </div>
        ) : (
            <button
                onClick={login}
                className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
            >
              Login with Web3Auth
            </button>
        )}
        <div>
          {WorldIDVerification()}
        </div>
      </div>
  );
}
