import { Card } from '../../../components/Card/Card';
import { Skeleton } from '../../../types';
import { formatAmount, formatDagPrice, formatMarketVol, formatTotalSupply } from '../../../utils/numbers';

const formater = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 });
export const MainnetStats = ({
  skeleton,
  werxInfo,
  btcInfo,
  dagSupply,
}: {
  skeleton?: Skeleton;
  werxInfo: any;
  btcInfo: any;
  dagSupply: any;
}) => {
  return (
    <>
      <Card
        skeleton={{ showSkeleton: skeleton.showSkeleton }}
        badge={werxInfo ? werxInfo.usd_24h_change : ''}
        headerText={'DAG PRICE'}
        value={werxInfo ? '$' + werxInfo.usd : ''}
        info={werxInfo ? formatDagPrice(werxInfo, btcInfo) : ''}
      />
      <Card
        skeleton={{ showSkeleton: skeleton.showSkeleton }}
        headerText={'MARKET CAP'}
        value={werxInfo ? '$' + formater.format(werxInfo.usd_market_cap) : ''}
        info={werxInfo ? formatMarketVol(formater, werxInfo) : ''}
      />
      <Card
        skeleton={{ showSkeleton: skeleton.showSkeleton }}
        headerText={'CIRCULATING SUPPLY'}
        value={formatAmount(dagSupply, 0).replace('DAG', '')}
        info={formatTotalSupply()}
      />
    </>
  );
};
