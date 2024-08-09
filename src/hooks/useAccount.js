import { useState, useEffect, useCallback } from 'react';
import { ETH_MAINNET_CHAIN_ID } from "../constants/constants.js";

const useAccount = () => {
  const [account, setAccount] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const connectWallet = useCallback(async () => {
    //no metamask case
    if (!window.ethereum) {
      setErrorMessage("Install MetaMask to continue");
      return;
    }
    //connecting the account
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        if(accounts) {
          setAccount(accounts[0]);
        } else {
          setErrorMessage('No accounts found. Please connect to MetaMask.');
        } 
      } catch (err) {
        setErrorMessage('Could not connect to wallet: ' + err.message);
      }
  });

  const disconnectWallet = () => {
    setAccount(null);
    setErrorMessage(null);
  };

  return {
    account,
    errorMessage,
    connectWallet,
    disconnectWallet
  };

};

export default useAccount;