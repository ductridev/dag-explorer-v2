import { Card } from '../../../components/Card/Card';
import { Skeleton } from '../../../types';
import { formatAmount, formatWerxPrice, formatMarketVol, formatTotalSupply } from '../../../utils/numbers';

const formater = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 });
export const MainnetStats = ({
  skeleton,
  werxInfo,
  btcInfo,
  werxSupply,
}: {
  skeleton?: Skeleton;
  werxInfo: any;
  btcInfo: any;
  werxSupply: any;
}) => {
  return (
    <>
      <Card
        skeleton={{ showSkeleton: skeleton.showSkeleton }}
        badge={werxInfo ? werxInfo.usd_24h_change : ''}
        headerText={'WERX PRICE'}
        value={werxInfo ? '$' + werxInfo.usd : ''}
        info={werxInfo ? formatWerxPrice(werxInfo, btcInfo) : ''}
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
        value={formatAmount(werxInfo, 0).replace('WERX', '')}
        info={formatTotalSupply()}
      />
    </>
  );
};
