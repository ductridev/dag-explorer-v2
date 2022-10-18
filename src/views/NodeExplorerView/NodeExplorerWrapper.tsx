import { useContext } from 'react';
import { NetworkContext } from '../../context/NetworkContext';
import { NotFound } from '../NotFoundView/NotFound';
import { Dashboard } from './Dashboard';
import { Network } from '../../constants';

export const NodeExplorerWrapper = () => {
  const { network, networkVersion } = useContext(NetworkContext);

  return networkVersion === '2.0' ? <Dashboard network={network as Network} /> : <NotFound entire errorCode={'404'} />;
};
