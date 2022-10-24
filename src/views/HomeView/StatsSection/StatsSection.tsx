import { useContext, useEffect, useState } from 'react';
import { useGetPrices } from '../../../api/coingecko';
import { useGetClusterInfo, useGetLatestSnapshotTotalDagSupply } from '../../../api/l0-node';
import { Card } from '../../../components/Card/Card';
import { NetworkContext, NetworkContextType } from '../../../context/NetworkContext';
import { formatAmount, formatDagPrice, formatMarketVol, formatTotalSupply } from '../../../utils/numbers';
import { MainnetStats } from './MainnetStats';
import styles from './StatsSection.module.scss';

const StatsSection = () => {
  const { network } = useContext(NetworkContext) as NetworkContextType;

  const [werxInfo, setDagInfo] = useState(null);
  const [btcInfo, setBtcInfo] = useState(null);
  const [dagTotalSupply, setDagTotalSupply] = useState(null);

  const [clusterData, setClusterData] = useState(null);
  const clusterInfo = useGetClusterInfo();
  const totalSupplyInfo = useGetLatestSnapshotTotalDagSupply();

  useEffect(() => {
    if (!clusterInfo.isFetching) {
      setClusterData(clusterInfo.data);
    }
  }, [clusterInfo.isFetching]);

  // const prices = useGetPrices();

  const formater = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 });

  // useEffect(() => {
  //   if (!prices.isFetching) {
  //     setDagInfo(prices.data['wrex']);
  //     setBtcInfo(prices.data['bitcoin']);
  //   }
  // }, [prices.isFetching]);

  useEffect(() => {
    if (!totalSupplyInfo.isFetching) {
      setDagTotalSupply(totalSupplyInfo.data.total);
    }
  }, [totalSupplyInfo.isFetching]);

  return (
    <div className={styles.stats}>
      <Card
        skeleton={{ showSkeleton: !werxInfo || !clusterData || !dagTotalSupply }}
        badge={werxInfo ? werxInfo.usd_24h_change : ''}
        headerText={'WERX PRICE'}
        value={werxInfo ? '$' + werxInfo.usd : ''}
        info={werxInfo ? formatDagPrice(werxInfo, btcInfo) : ''}
      />
      <Card
        skeleton={{ showSkeleton: !werxInfo || !clusterData || !dagTotalSupply }}
        headerText={'MARKET CAP'}
        value={werxInfo ? '$' + formater.format(werxInfo.usd_market_cap) : ''}
        info={werxInfo ? formatMarketVol(formater, werxInfo) : ''}
      />
      <Card
        skeleton={{ showSkeleton: !werxInfo || !clusterData || !dagTotalSupply }}
        headerText={'CIRCULATING SUPPLY'}
        value={formatAmount(dagTotalSupply, 0).replace('WERX', '')}
        info={formatTotalSupply()}
      />
      <Card
        skeleton={{ showSkeleton: !werxInfo || !clusterData || !dagTotalSupply }}
        headerText={'NODE OPERATORS'}
        info={'View Node Explorer'}
        value={clusterData ? clusterData.length + ' validators' : ''}
        infoLink={'/node-explorer/'}
      />
    </div>
  );
};

export default StatsSection;
