import React, { useEffect, useState } from "react";
import CryptoPrices from "./CryptoPrices.jsx";
import Converter from "./Converter.jsx";
import Balances from "./Balances.jsx";
import Account from "./Account.jsx";
import Swap from "./Swap.jsx";

const Dashboard = ({
  account,
  ethBalance,
  nexoBalance,
  wethBalance,
  network,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <div className="max-w-4xl mx-auto bg-gradient-to-b from-slate-50 to-slate-100 rounded-lg shadow-lg p-6 space-y-6">
        {/* Account Overview Header */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Account Overview
          </h2>
          <p className="text-gray-600">
          Your account information, live prices, ETH to wETH converter and a swapper are below.
          </p>
        </div>
        {/* Upper Container */}
        <div className="flex flex-col lg:flex-row lg:space-x-8 lg:space-y-0 space-y-4">
          {/* Account Section */}
          <Account account={account} network={network} />
          {/* Balances Section */}
          <Balances
            ethBalance={ethBalance}
            wethBalance={wethBalance}
            nexoBalance={nexoBalance}
            isLoading={isLoading}
          />
          {/* Display Crypto Prices */}
          <CryptoPrices />
        </div>
        
        {/* Lower Container */}
        <div className="flex flex-col lg:flex-row lg:space-x-8 lg:space-y-0 space-y-4">
          {/* CONVERTER ETH TO WETH */}
          <div className="flex-1">
            <Converter ethBalance={ethBalance} />
          </div>
          {/* SWAP COMPONENT */}
          <div className="flex-1">
            <Swap />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
