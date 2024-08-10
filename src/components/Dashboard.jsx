import React, { useEffect, useState } from "react";
import useLoading from "../hooks/useLoading";
import useWrapEth from "../hooks/useWrapEth";
import Loader from "./others/Loader";
import useCryptoPrices from "../hooks/useCryptoPrices";
import { wETH_TOKEN_CONTRACT_ADDRESS } from "../constants/constants.js";
import wethLogo from "../assets/wethLogo.png";

const Dashboard = ({
  account,
  ethBalance,
  nexoBalance,
  wethBalance,
  network,
}) => {
  const [ethLoading, startEthLoading] = useLoading();
  const [wethLoading, startWethLoading] = useLoading();
  const [nexoLoading, startNexoLoading] = useLoading();

  const [priceLoading, startPriceLoading] = useLoading();

  
  const { wrapEth, wrapLoading, error } = useWrapEth();
  const [ethAmount, setEthAmount] = useState("");

  const price = useCryptoPrices();

  //loading functionality (while fetching)
  useEffect(() => {
    startEthLoading(() => {
      setTimeout(() => {}, 1000);
    });

    startWethLoading(() => {
      setTimeout(() => {}, 1000);
    });

    startNexoLoading(() => {
      setTimeout(() => {}, 1000);
    });

    startPriceLoading(() => {
      setTimeout(() => {}, 1000);
    });

  }, [ethBalance, nexoBalance, wethBalance, price]);

  // Function to handle the conversion
  const handleConvert = () => {
    if (ethAmount && !isNaN(ethAmount) && Number(ethAmount) > 0) {
      wrapEth(ethAmount);
    } else {
      alert("Please enter a valid ETH amount.");
    }
  };

  return (
    <div>
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 space-y-6">
        {/* Account Overview Header */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Account Overview
          </h2>
          <p className="text-gray-600">
            Your Ethereum, WETH, and NEXO token balances are displayed below.
          </p>
        </div>

        {/* Upper Container  */}
        <div className="flex flex-col lg:flex-row lg:space-x-8">
          {/* Account Section and Network Section */}
          <div className="flex-1 bg-gray-50 p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Account
            </h3>
            <p className="text-gray-700 break-all">{account}</p>
            <h3 className="text-xl font-semibold text-gray-800 mt-2 mb-1">
              Network
            </h3>
            <p className="text-gray-700">
              {network === "0x1" ? "Ethereum Mainnet" : "Sepolia Testnet"}
            </p>
          </div>

          {/* Balances Section */}
          <div className="flex-1 bg-gray-50 p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Balances
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">ETH Balance:</span>
                <span className="font-bold text-gray-900">
                  {ethLoading ? <Loader /> : ethBalance || "0.000"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">WETH Balance:</span>
                <span className="font-bold text-gray-900">
                  {wethLoading ? <Loader /> : wethBalance || "0.000"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">NEXO Balance:</span>
                <span className="font-bold text-gray-900">
                  {nexoLoading ? <Loader /> : nexoBalance || "0.000"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Lower Container */}
        <div className="flex flex-col lg:flex-row lg:space-x-8">
          {/* CONVERTER ETH TO WETH  */}
          <div className="bg-gray-50 p-6 mt-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Convert ETH to wETH
            </h3>
            <div className="flex flex-col space-y-4">
              {/* Input Field */}
              <input
                type="number"
                onChange={(e) => setEthAmount(e.target.value)}
                placeholder="Enter ETH amount"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {/* Convert Button */}
              <button
                onClick={handleConvert}
                className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Convert
              </button>
            </div>
          </div>

          {/* Display Crypto Prices */}
          <div className="bg-gray-50 p-6 mt-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Crypto Prices
            </h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-1">
                {/* Logo */}
                <img
                  src={wethLogo}
                  alt="wETH Logo"
                  className="w-10 h-10 object-contain"
                />
                {/* Price Info */}
                <div className="flex-grow flex justify-between space-x-4">
                  <span className="text-gray-600">wETH Price:</span>
                  <span className="font-bold text-gray-900">
                   {priceLoading ? <Loader /> : price || "0.000"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
