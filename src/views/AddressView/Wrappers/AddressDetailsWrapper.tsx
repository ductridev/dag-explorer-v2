import { useContext } from 'react';
import { Network } from '../../../constants';
import { NetworkContext } from '../../../context/NetworkContext';
import { AddressDetails } from '../AddressDetails';
import { MainnetOneAddressDetails } from '../MainnetOne/MainnetOneAddressDetails';

export const AddressDetailsWrapper = () => {
  const { networkVersion, network } = useContext(NetworkContext);

  return networkVersion === '2.0' ? (
    <AddressDetails network={network as Network} />
  ) : (
    <MainnetOneAddressDetails />
  );
};
