import { useContext, useEffect, useState } from 'react';
import { useGetPrices } from '../../../api/coingecko';
import { useGetClusterInfo, useGetLatestSnapshotTotalWerxSupply } from '../../../api/l0-node';
import { Card } from '../../../components/Card/Card';
import { NetworkContext, NetworkContextType } from '../../../context/NetworkContext';
import { formatAmount, formatWerxPrice, formatMarketVol, formatTotalSupply } from '../../../utils/numbers';
import { MainnetStats } from './MainnetStats';
import styles from './StatsSection.module.scss';

const StatsSection = () => {
  const { network } = useContext(NetworkContext) as NetworkContextType;

<<<<<<< HEAD
  const [werxInfo, setDagInfo] = useState(null);
=======
  const [werxInfo, setWerxInfo] = useState(null);
>>>>>>> 984ff72607a33dc813f1e4a6351d6f69f3f4f272
  const [btcInfo, setBtcInfo] = useState(null);
  const [werxTotalSupply, setWerxTotalSupply] = useState(null);

  const [clusterData, setClusterData] = useState(null);
  const clusterInfo = useGetClusterInfo();
  const totalSupplyInfo = useGetLatestSnapshotTotalWerxSupply();

  useEffect(() => {
    if (!clusterInfo.isFetching) {
      setClusterData(clusterInfo.data);
    }
  }, [clusterInfo.isFetching]);

  // const prices = useGetPrices();

  const formater = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 });

  // useEffect(() => {
  //   if (!prices.isFetching) {
  //     setWerxInfo(prices.data['WERX']);
  //     setBtcInfo(prices.data['bitcoin']);
  //   }
  // }, [prices.isFetching]);

  useEffect(() => {
    if (!totalSupplyInfo.isFetching) {
      setWerxTotalSupply(totalSupplyInfo.data.total);
    }
  }, [totalSupplyInfo.isFetching]);

  return (
    <div className={styles.stats}>
      <Card
        skeleton={{ showSkeleton: !werxInfo || !clusterData || !werxTotalSupply }}
        badge={werxInfo ? werxInfo.usd_24h_change : ''}
        headerText={'WERX PRICE'}
        value={werxInfo ? '$' + werxInfo.usd : ''}
        info={werxInfo ? formatWerxPrice(werxInfo, btcInfo) : ''}
      />
      <Card
        skeleton={{ showSkeleton: !werxInfo || !clusterData || !werxTotalSupply }}
        headerText={'MARKET CAP'}
        value={werxInfo ? '$' + formater.format(werxInfo.usd_market_cap) : ''}
        info={werxInfo ? formatMarketVol(formater, werxInfo) : ''}
      />
      <Card
        skeleton={{ showSkeleton: !werxInfo || !clusterData || !werxTotalSupply }}
        headerText={'CIRCULATING SUPPLY'}
        value={formatAmount(werxTotalSupply, 0).replace('WERX', '')}
        info={formatTotalSupply()}
      />
      <Card
        skeleton={{ showSkeleton: !werxInfo || !clusterData || !werxTotalSupply }}
        headerText={'NODE OPERATORS'}
        info={'View Node Explorer'}
        value={clusterData ? clusterData.length + ' validators' : ''}
        infoLink={'/node-explorer/'}
      />
    </div>
  );
};

export default StatsSection;
