import { useContext } from 'react';
import { useFetch } from '../../utils/reactQuery';
import { Peer, ValidatorNode } from '../../types';
import { Network } from '../../constants';
import { NetworkContext, NetworkContextType } from '../../context/NetworkContext';

export { useGetLatestSnapshot, useGetSnapshot, useGetLatestSnapshotOrdinal } from './global-snapshot';
export {
  useGetLatestSnapshotTotalWerxSupply,
  useGetTotalWerxSupplyBySnapshot,
  useGetWerxBalanceForAddress,
  useGetWerxBalanceForAddressOnSnapshot,
} from './werx';

const { 
  REACT_APP_TESTNET_L0_NODE_URL, 
  REACT_APP_MAINNET_TWO_L0_NODE_URL,
  REACT_APP_WERX_EXPLORER_API_URL
} = process.env;

const getUrl = () => {
  const { network } = useContext(NetworkContext) as NetworkContextType;
  return network === 'mainnet' ? REACT_APP_MAINNET_TWO_L0_NODE_URL : REACT_APP_TESTNET_L0_NODE_URL; 
}

export const useGetClusterInfo = () => {
  return useFetch<Peer[]>(getUrl() + '/cluster/info');
}

export const useGetMetric = () => {
  return useFetch<string>(getUrl() + '/metrics');
}

// export const useGetValidatorNodes = (network: Network) => {
//   return useFetch<ValidatorNode[]>(REACT_APP_WERX_EXPLORER_API_URL + '/' + network + '/validator-nodes');
// }
  

// export const useGetClusterRewards = (network: Network) => {
//   return useFetch<{ totalRewards: number }>(REACT_APP_WERX_EXPLORER_API_URL + '/' + network + '/validator-nodes/rewards');
// }
  
