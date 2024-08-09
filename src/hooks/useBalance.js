import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
const useBalance = (address) => {
    
  const [balance, setBalance] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (address) {
      const fetchBalance = async () => {
        try {
            // Fetch balance for the given address
          const balance = await window.ethereum.request({
            method: 'eth_getBalance',
            params: [address, 'latest']
          });
          // Update state with the new balance
          setBalance(ethers.formatEther(balance));
        } catch (err) {
            //error handling
          setError('Error fetching balance');
          console.error(err);
        }
      };

      fetchBalance();
    }
  }, [address]);

  return { balance, error };
};

export default useBalance;