import { useState, useEffect, useRef } from 'react';
import Moralis from 'moralis';
import { EvmChain } from '@moralisweb3/common-evm-utils';
import { wETH_TOKEN_CONTRACT_ADDRESS } from '../constants/constants.js';

const useCryptoPrices = (tokenAddresses, chain = EvmChain.ETHEREUM) => {
    const [prices, setPrices] = useState(null);
    const hasFetchedRef = useRef(false); // Ref to track if data has been fetch

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

export default useCryptoPrices;