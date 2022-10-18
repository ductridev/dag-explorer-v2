import React from 'react';
import { createContext, useState } from 'react';
import { Network, NetworkVersion } from '../constants';

export type NetworkContextType = {
  network: Network;
  networkVersion: NetworkVersion;
  changeNetwork: (network: Network) => void;
};

export const NetworkContext = createContext<NetworkContextType | null>(null);

const PROD_BASE_URL = 'http://54.235.210.75:3000/';

export const NetworkProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [network, setNetwork] = useState<Network>(null);
  const [networkVersion, setNetworkVersion] = useState<NetworkVersion>(null);

  const handleChange = (toNetwork: Network) => {
    setNetwork('testnet');
    setNetworkVersion('2.0');
  };

  return (
    <NetworkContext.Provider value={{ network: network, networkVersion: networkVersion, changeNetwork: handleChange }}>
      {children}
    </NetworkContext.Provider>
  );
};
