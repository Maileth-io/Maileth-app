import axios from "axios";

const BLOCKSCOUT_API_BASE = "https://blockscout.com/eth/mainnet/api";

interface TransactionDetails {
  hash: string;
  from: string;
  to: string;
  value: string;
  gas: string;
  gasPrice: string;
}

export const getTransactionDetails = async (txHash: string): Promise<TransactionDetails> => {
  try {
    const response = await axios.get(`${BLOCKSCOUT_API_BASE}`, {
      params: {
        module: "transaction",
        action: "gettxinfo",
        txhash: txHash,
      },
    });

    if (response.data.status === "1") {
      return response.data.result as TransactionDetails;
    } else {
      throw new Error(response.data.message || "Transaction not found");
    }
  } catch (error) {
    console.error("Blockscout API error:", error);
    throw error;
  }
};
