import { useContext } from 'react';
import { useFetch } from '../../utils/reactQuery';
import { Balance, TotalSupply } from '../../types';
import { NetworkContext, NetworkContextType } from '../../context/NetworkContext';

const { REACT_APP_TESTNET_L0_NODE_URL, REACT_APP_MAINNET_TWO_L0_NODE_URL } = process.env;

const getUrl = () => {
  const { network } = useContext(NetworkContext) as NetworkContextType;
  const url = network === 'mainnet' ? REACT_APP_MAINNET_TWO_L0_NODE_URL : REACT_APP_TESTNET_L0_NODE_URL;
  return `${url}/werx`;
};

export const useGetLatestSnapshotTotalWerxSupply = () => {
  return useFetch<TotalSupply>(getUrl() + '/total-supply');
};

export const useGetTotalWerxSupplyBySnapshot = (ordinal: number) => {
  return useFetch<TotalSupply>(getUrl() + '/' + ordinal + '/total-supply');
};

export const useGetWerxBalanceForAddress = (address: string) => {
  return useFetch<Balance>(getUrl() + '/' + address + '/balance');
};

export const useGetWerxBalanceForAddressOnSnapshot = (address: string, ordinal: number) => {
  return useFetch<Balance>(getUrl() + '/' + ordinal + '/' + address + '/balance');
};
