import React from 'react';
import { ArrowRightOutlined } from '@ant-design/icons';

const Swap = () => {
    return (
        <div className="bg-sky-50 p-6 mt-6 rounded-lg shadow-md w-full">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Swap ETH and wETH
            </h3>
            <div className="flex items-center space-x-4">
                {/* ETH Input Field */}
                <input
                    type="text"
                    placeholder="Enter ETH amount"
                    className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {/* Swap Arrow */}
                <ArrowRightOutlined className="text-gray-500" />
                {/* wETH Input Field */}
                <input
                    type="text"
                    placeholder="Enter wETH amount"
                    className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            {/* Swap Button */}
            <button
                className="w-full mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
                Swap
            </button>
        </div>
    );
};

export default Swap;