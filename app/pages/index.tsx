import { useEffect, useState } from "react";
import web3auth from "../utils/web3auth";
import { ethers } from "ethers";

export default function Home() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const initWeb3Auth = async () => {
      try {
        await web3auth.initModal();
        setIsLoading(false);
      } catch (error) {
        console.error("Web3Auth initialization error:", error);
      }
    };

    initWeb3Auth();
  }, []);

  const login = async () => {
    try {
      const provider = await web3auth.connect();
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

  const logout = async () => {
    try {
      await web3auth.logout();
      setWalletAddress(null);
      setBalance(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div>
      <h1>Web3Auth Wallet</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : walletAddress ? (
        <div>
          <p>Wallet Address: {walletAddress}</p>
          <p>Balance: {balance} ETH</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <button onClick={login}>Login with Web3Auth</button>
      )}
    </div>
  );
}
