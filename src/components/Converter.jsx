import React, { useState } from "react";
import { ethers } from "ethers";
import {
  wETH_TOKEN_CONTRACT_ADDRESS,
  WETH_ABI,
} from "../constants/constants.js";
import toast from "react-hot-toast";

const Converter = ({ ethBalance }) => {
  const [ethAmount, setEthAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [transactionHash, setTransactionHash] = useState(null);

  // Function to handle ETH to wETH conversion
  const wrapEth = async (amount) => {
    if (!window.ethereum || !amount) {
      toast.error("Please enter a valid amount and connect to MetaMask.");
      return;
    }

    try {
      setLoading(true);

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
      setEthAmount(""); // Clear the input field
    } catch (err) {
      toast.error("An error occurred during the conversion. Please try again.");
      setEthAmount(""); // Clear the input field
      console.error(err);
    } finally {
      toast.success("Conversion successful!");
      setLoading(false);
    }
  };

  // Function to handle conversion button click
  const handleConvert = async () => {
    if (!ethAmount || isNaN(ethAmount) || Number(ethAmount) <= 0) {
      toast.error("Please enter a valid ETH amount greater than zero.");
      setEthAmount(""); // Clear the input field
      return;
    }

    if (Number(ethAmount) > Number(ethBalance)) {
      toast.error("Insufficient ETH balance.");
      setEthAmount(""); // Clear the input field
      return;
    }

    await wrapEth(ethAmount);
  };

  return (
    <div className="bg-sky-50 p-6 mt-6 rounded-lg shadow-md w-full">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        Convert ETH to wETH
      </h3>
      <div className="flex flex-col space-y-4">
        {/* Input Field */}
        <input
          type="text"
          value={ethAmount}
          onChange={(e) => setEthAmount(e.target.value)}
          placeholder="Enter ETH amount"
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {/* Convert Button */}
        <button
          onClick={handleConvert}
          disabled={loading}
          className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {loading ? "Converting..." : "Convert"}
        </button>
      </div>
    </div>
  );
};

export default Converter;
