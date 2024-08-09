import React, { useEffect, useState } from 'react';
import useLoading from "../hooks/useLoading";
import useWrapEth from '../hooks/useWrapEth';
import Loader from './others/Loader';  // Import the Loader component

const Dashboard = ({ account, ethBalance, nexoBalance, wethBalance, network }) => {
    const [ethLoading, startEthLoading] = useLoading();
    const [wethLoading, startWethLoading] = useLoading();
    const [nexoLoading, startNexoLoading] = useLoading();

    const { wrapEth, wrapLoading, error } = useWrapEth();
    const [ethAmount, setEthAmount] = useState('');
  
    //loading functionality (while fetching)
    useEffect(() => {
      startEthLoading(() => {
        setTimeout(() => {
        }, 1000);
      });
  
      startWethLoading(() => {
        setTimeout(() => {
        }, 1000);
      });
  
      startNexoLoading(() => {
        setTimeout(() => {
        }, 1000);
      });
    }, [ethBalance, nexoBalance, wethBalance]);

      // Function to handle the conversion
  const handleConvert = () => {
        if (ethAmount && !isNaN(ethAmount) && Number(ethAmount) > 0) {
        wrapEth(ethAmount);
      } else {
        alert('Please enter a valid ETH amount.');
      }
  };

  return (
    <div>
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 space-y-6">
        {/* Account Overview Header */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Account Overview</h2>
          <p className="text-gray-600">Your Ethereum, WETH, and NEXO token balances are displayed below.</p>
        </div>

        <div className="flex flex-col lg:flex-row lg:space-x-8">
          {/* Account Section and Network Section */}
          <div className="flex-1 bg-gray-50 p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Account</h3>
            <p className="text-gray-700 break-all">{account}</p>
            <h3 className="text-xl font-semibold text-gray-800 mt-2 mb-1">Network</h3>
            <p className="text-gray-700">{network === '0x1' ? 'Ethereum Mainnet' : 'Sepolia Testnet'}</p>
          </div>

          {/* Balances Section */}
          <div className="flex-1 bg-gray-50 p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Balances</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">ETH Balance:</span>
                <span className="font-bold text-gray-900">
                  {ethLoading ? <Loader /> : ethBalance}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">WETH Balance:</span>
                <span className="font-bold text-gray-900">
                  {wethLoading ? <Loader /> : wethBalance}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">NEXO Balance:</span>
                <span className="font-bold text-gray-900">
                  {nexoLoading ? <Loader /> : nexoBalance}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* CONVERTER ETH TO WETH  */}
        <div className="bg-gray-50 p-6 mt-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Convert ETH to wETH</h3>
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
            <input
              type="number"
              onChange={(e) => setEthAmount(e.target.value)}
              placeholder="Enter ETH amount"
              className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleConvert}
              className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {'Convert'}
            </button>
          </div>
          </div>
      </div>
    </div>
  );
};

export default Dashboard;