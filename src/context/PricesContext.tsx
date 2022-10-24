import React, { useEffect } from 'react';
import { createContext, useState } from 'react';
import { useGetPrices } from '../api/coingecko';

export type PricesContextType = {
  werxInfo: any;
  btcInfo: any;
};

export const PricesContext = createContext<PricesContextType | null>(null);

export const PricesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [werxInfo, setWerxInfo] = useState<any>(null);
  const [btcInfo, setBtcInfo] = useState<any>(null);
  const pricesInfo = useGetPrices();
  useEffect(() => {
    if (!pricesInfo.isFetching && !pricesInfo.error) {
      setWerxInfo(pricesInfo.data['WERX']);
      setBtcInfo(pricesInfo.data['bitcoin']);
    }
  }, [pricesInfo.isFetching]);

  return <PricesContext.Provider value={{ werxInfo: werxInfo, btcInfo: btcInfo }}>{children}</PricesContext.Provider>;
};
