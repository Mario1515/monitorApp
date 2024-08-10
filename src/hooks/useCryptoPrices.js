import { useState, useEffect } from 'react';
import Moralis from 'moralis';
import { EvmChain } from '@moralisweb3/common-evm-utils';
import { wETH_TOKEN_CONTRACT_ADDRESS } from '../constants/constants.js';

const useCryptoPrices = (tokenAd, chain = EvmChain.ETHEREUM) => {
    const [price, setPrice] = useState(null);

    useEffect(() => {
        const fetchTokenPrices = async () => {
            try {

                const response = await Moralis.EvmApi.token.getTokenPrice({
                    address: wETH_TOKEN_CONTRACT_ADDRESS,
                    chain,
                });
                setPrice(response.toJSON().usdPrice.toFixed(2));
            } catch (err) {
                console.error('Error fetching token prices:', err);
                setPrice(null);  // if error price should be null
            }
        };

        fetchTokenPrices();
    }, [chain]);

    return price;
};

export default useCryptoPrices;