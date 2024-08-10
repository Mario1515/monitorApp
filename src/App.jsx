import React from 'react';
import { NetworkProvider } from './context/NetworkContext';
import Wallet from './components/Wallet';
import Moralis from 'moralis';
import toast, { Toaster } from 'react-hot-toast';
import Footer from './components/Footer.jsx';

import { MY_API_KEY } from "./constants/constants.js";

Moralis.start({ apiKey: MY_API_KEY });//moralis config for live crypto data

function App() {
  return (
    <NetworkProvider>
      <Wallet />
      <Toaster />
      <Footer />
    </NetworkProvider>
  );
}

export default App;