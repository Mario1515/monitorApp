import React from 'react';
import { NetworkProvider } from './context/NetworkContext';
import Wallet from './components/Wallet';

function App() {
  return (
    <NetworkProvider>
      <Wallet />
    </NetworkProvider>
  );
}

export default App;