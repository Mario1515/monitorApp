import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { NEXO_TOKEN_CONTRACT_ADDRESS, NEXO_TOKEN_ABI, wETH_TOKEN_CONTRACT_ADDRESS, wETH_TOKEN_ABI } from "../constants/constants.js";

const useBalance = (address) => {
    
    const [ethBalance, setEthBalance] = useState(null);
    const [nexoBalance, setNexoBalance] = useState(null);
    const [wethBalance, setWethBalance] = useState(null);
    const [error, setError] = useState(null);

  useEffect(() => {

    if (address) {
        const fetchBalances = async () => {
          // Fetch ETH balance
          try {
            const ethBalance = await window.ethereum.request({
              method: 'eth_getBalance',
              params: [address, 'latest']
            });
            setEthBalance(ethers.formatEther(ethBalance));
          } catch (err) {
            setError('Error fetching ETH token balance');
            console.log('ETH Balance Error:', err);
          }
          // Fetch NEXO token balance
          try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const contract = new ethers.Contract(NEXO_TOKEN_CONTRACT_ADDRESS, NEXO_TOKEN_ABI, provider);
            const tokenBalance = await contract.balanceOf(address);
            setNexoBalance(ethers.formatEther(tokenBalance));
          } catch (err) {
            setError('Error fetching NEXO token balance');
            console.log('NEXO Token Balance Error:', err);
          }

          // Fetch wETH token balance
          try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const contract = new ethers.Contract(wETH_TOKEN_CONTRACT_ADDRESS, wETH_TOKEN_ABI, provider);
            const tokenBalance = await contract.balanceOf(address);
            setWethBalance(ethers.formatEther(tokenBalance));
            
          } catch (err) {
            setError('Error fetching wETH token balance');
            console.log('wETH Token Balance Error:', err);
          }
        };
  
        fetchBalances();
      }
    }, [address]);

  return { ethBalance, nexoBalance, wethBalance, error };
};

export default useBalance;