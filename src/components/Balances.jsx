import React, { useEffect } from "react";
import Loader from "./others/Loader";

const Balances = ({ ethBalance, wethBalance, nexoBalance, isLoading,  }) => {
  return (
    <div className="flex-1 bg-gradient-to-b from-sky-50 to-sky-100 p-4 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">Balances</h3>
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
  );
};

export default Balances;