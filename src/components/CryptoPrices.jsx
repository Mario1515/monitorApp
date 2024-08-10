import React, { useState, useEffect, useRef } from 'react';
import Moralis from 'moralis';
import { EvmChain } from '@moralisweb3/common-evm-utils';
import Loader from "./Loader.jsx";
import { NEXO_ADDRESS, wETH_TOKEN_CONTRACT_ADDRESS, USDC_ADDRESS } from "../constants/constants.js";
import wethLogo from "../assets/wethLogo.png";
import nexoLogo from "../assets/nexoLogo.png";
import usdcLogo from "../assets/usdcLogo.png";

// Custom hook to fetch crypto prices
const useCryptoPrices = (tokenAddresses, chain = EvmChain.ETHEREUM) => {
    const [prices, setPrices] = useState(null);
    const hasFetchedRef = useRef(false); // Ref to track if data has been fetched

    useEffect(() => {
        const fetchTokenPrices = async () => {
            if (hasFetchedRef.current) return;
            hasFetchedRef.current = true; // Set the flag to true after fetching
            try {
                const pricePromises = tokenAddresses.map(async (address) => {
                    try {
                        const response = await Moralis.EvmApi.token.getTokenPrice({
                            address,
                            chain,
                        });
                        return {
                            address,
                            price: response.toJSON().usdPrice.toFixed(2),
                        };
                    } catch (err) {
                        console.error(`Error fetching price for ${address}:`, err);
                        return {
                            address,
                            price: null,
                        };
                    }
                });

                const pricesArray = await Promise.all(pricePromises);
                const pricesObject = pricesArray.reduce((acc, { address, price }) => {
                    acc[address] = price;
                    return acc;
                }, {});

                setPrices(pricesObject);
            } catch (err) {
                console.error('Error fetching token prices:', err);
                setPrices({});
            }
        };

        fetchTokenPrices();
    }, [chain]);

    return prices;
};

// CryptoPrices Component
const CryptoPrices = () => {
    const prices = useCryptoPrices([NEXO_ADDRESS, wETH_TOKEN_CONTRACT_ADDRESS, USDC_ADDRESS]);
    const isLoading = !prices;

    return (
        <div className="bg-sky-50 p-4 rounded-lg shadow-md">
            <div className="flex items-center space-x-1 mb-2">
                <h3 className="text-xl font-semibold text-gray-800">Crypto Prices</h3>
                <span className="text-sm font-normal text-gray-900 mt-1">in USDC</span>
            </div>
            {/* WETH COIN PRICE */}
            <div className="space-y-2">
                <div className="flex items-center space-x-1">
                    <img
                        src={wethLogo}
                        alt="wETH Logo"
                        className="w-10 h-10 object-contain"
                    />
                    <div className="flex-grow flex justify-between space-x-4">
                        <span className="text-gray-600">wETH Price:</span>
                        <span className="font-bold text-gray-900">
                            {isLoading ? <Loader /> : `$${prices[wETH_TOKEN_CONTRACT_ADDRESS] || "2623.11"}`}
                        </span>
                    </div>
                </div>

                {/* NEXO COIN PRICE */}
                <div className="flex items-center space-x-1">
                    <img
                        src={nexoLogo}
                        alt="NEXO Logo"
                        className="w-9 h-8 object-contain"
                    />
                    <div className="flex-grow flex justify-between space-x-4">
                        <span className="text-gray-600">NEXO Price:</span>
                        <span className="font-bold text-gray-900">
                            {isLoading ? <Loader /> : `$${prices[NEXO_ADDRESS] || "1.08"}`}
                        </span>
                    </div>
                </div>

                {/* USDC COIN PRICE */}
                <div className="flex items-center space-x-1">
                    <img
                        src={usdcLogo}
                        alt="USDC Logo"
                        className="w-9 h-8 object-contain"
                    />
                    <div className="flex-grow flex justify-between space-x-4">
                        <span className="text-gray-600">USDC Price:</span>
                        <span className="font-bold text-gray-900">
                            {isLoading ? <Loader /> : `$${prices[USDC_ADDRESS] || "1.00"}`}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CryptoPrices;