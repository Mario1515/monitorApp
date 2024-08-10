import React, { createContext, useContext, useState, useEffect } from 'react';
import { ALLOWED_NETWORKS } from "../constants/constants.js";


const NetworkContext = createContext();

export const useNetwork = () => {
    return useContext(NetworkContext);
  };

  export const NetworkProvider = ({ children }) => {

    const [network, setNetwork] = useState(null);
    const [networkError, setNetworkError] = useState(null);

    //checking the network of the client
    const checkNetwork = (chainId) => {
        if(!ALLOWED_NETWORKS.includes(chainId)){
          setNetworkError('You are connected to a different network. Please switch to Ethereum Mainnet or Sepolia.');
        } else {
          setNetworkError(null); 
        }
    }
    
    useEffect(() => {
        const handleChainChanged = (chainId) => {
          setNetwork(chainId);
          checkNetwork(chainId);
        };
    
        if (window.ethereum) {
          window.ethereum.request({ method: 'eth_chainId' })
            .then(chainId => {
              setNetwork(chainId);
              checkNetwork(chainId);
            })
            .catch(err => console.error('Error fetching chain ID:', err));
    
          window.ethereum.on('chainChanged', handleChainChanged);
    
          return () => {
            window.ethereum.removeListener('chainChanged', handleChainChanged);
          };
        }
      }, []);

      return (
        <NetworkContext.Provider value={{ network, networkError }}>
          {children}
        </NetworkContext.Provider>
      );

  };