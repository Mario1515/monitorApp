import React, { useEffect, useState } from "react";
import Loader from "./others/Loader";
import toast, { Toaster } from 'react-hot-toast';
import CryptoPrices from "./CryptoPrices.jsx";
import Converter from "./Converter.jsx";


const Dashboard = ({
  account,
  ethBalance,
  nexoBalance,
  wethBalance,
  network,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [ethAmount, setEthAmount] = useState("");

  //loading functionality should be move todo
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1100);

    return () => clearTimeout(timer);
  }, []);

  // Function to handle the conversion should move todo
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
              <div className="flex flex-col lg:flex-row lg:space-x-8 lg:space-y-0 space-y-4">
        {/* Account Section */}
        <div className="flex-1 bg-gray-50 p-4 rounded-lg shadow-md flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Account
            </h3>
            <p className="text-gray-700 break-all">{account}</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mt-2 mb-1">
              Network
            </h3>
            <p className="text-gray-700">
              {network === "0x1" ? "Ethereum Mainnet" : "Sepolia Testnet"}
            </p>
          </div>
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
                  {isLoading ? <Loader /> : ethBalance || "0.000"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">WETH Balance:</span>
                <span className="font-bold text-gray-900">
                  {isLoading ? <Loader /> : wethBalance || "0.000"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">NEXO Balance:</span>
                <span className="font-bold text-gray-900">
                  {isLoading ? <Loader /> : nexoBalance || "0.000"}
                </span>
              </div>
            </div>
          </div>

          {/* Display Crypto Prices */}
            <CryptoPrices /> 
        </div>
        {/* Lower Container */}
        <div className="flex flex-col lg:flex-row lg:space-x-8">
          {/* CONVERTER ETH TO WETH  */}
          <Converter  ethBalance={ethBalance} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
