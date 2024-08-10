import React from "react";

const Account = ({ account, network }) => {
    
  return (
    <div className="flex-1 bg-gray-50 p-4 rounded-lg shadow-md flex flex-col justify-between">
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Account</h3>
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
  );
};

export default Account;