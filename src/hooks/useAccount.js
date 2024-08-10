import { useState, useEffect, useCallback } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const useAccount = () => {
  const [account, setAccount] = useState(null);

  const connectWallet = useCallback(async () => {
    //no metamask case
    if (!window.ethereum) {
      toast.error('Install MetaMask to continue');
      return;
    }
    //connecting the account
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        if(accounts) {
          setAccount(accounts[0]);
          toast.success('Wallet successfully connected!');
        } else {
          toast.error('No accounts found. Please connect to MetaMask.');
        } 
      } catch (err) {
        toast.error('Could not connect to wallet: ' + err.message);
      }
  });

  const disconnectWallet = () => {
    setAccount(null);
    toast.success('Successfully disconnected wallet.');
  };

  return {
    account,
    connectWallet,
    disconnectWallet
  };

};

export default useAccount;