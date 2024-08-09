import { useState } from "react";
import { ethers } from "ethers";
import { wETH_TOKEN_CONTRACT_ADDRESS, WETH_ABI } from "../constants/constants.js";


  
const useWrapEth = () => {
  const [loading, setLoading] = useState(false);
  const [transactionHash, setTransactionHash] = useState(null);
  const [error, setError] = useState(null);

  const wrapEth = async (amount) => {
    if (!window.ethereum || !amount) {
      setError("Please enter a valid amount and connect to MetaMask.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const wethContract = new ethers.Contract(
        wETH_TOKEN_CONTRACT_ADDRESS,
        WETH_ABI,
        signer
      );

      const value = ethers.parseEther(amount); // Convert ETH to wei
      const tx = await wethContract.deposit({ value }); // Deposit ETH into WETH contract

      const receipt = await tx.wait(); // Wait for transaction to be mined
      setTransactionHash(receipt.transactionHash);
    } catch (err) {
      setError("Error wrapping ETH: " + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return {wrapEth, loading, transactionHash, error };
};

export default useWrapEth;
