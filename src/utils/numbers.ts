import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import millify from 'millify';

dayjs.extend(relativeTime);

export enum NumberFormat {
  MILLIFY,
  WHOLE,
  DECIMALS,
  DECIMALS_TRIMMED,
  MILLIFY_WHOLE,
  MILLIFY_EXPANDED,
}

const formater = new Intl.NumberFormat('en-US', { maximumFractionDigits: 8 });

export const formatWerxPrice = (werxInfo, btcInfo) => {
  const rounded = Math.round((werxInfo.usd + Number.EPSILON) * 100) / 100;
  const btcEquiv = (werxInfo.usd / btcInfo.usd).toFixed(8);
  return '$' + rounded + ' USD - ' + btcEquiv + ' BTC';
};

export const formatMarketVol = (formater, werxInfo) => '24h Trading Vol: $' + formater.format(werxInfo.usd_24h_vol);

export const formatPrice = (amount: number, werxInfo: any, toFixed: number) => {
  const formatedValue = (amount / Math.pow(10, 8)).toFixed(8);
  return formater.format(parseFloat((parseFloat(formatedValue) * werxInfo.usd).toFixed(toFixed)));
};

export const formatAmount = (amount: number, toFixed: number, forExport?: boolean) => {
  const formatedValue = (amount / Math.pow(10, 8)).toFixed(toFixed);
  const regex = formatedValue.match('^(\\d+\\.\\d*?)(0+)$');
  let toReturn: string;
  if (regex) {
    const subString = regex[1].split('.')[1];
    if (subString && subString.length >= 2) {
      return forExport ? regex[1] : formater.format(parseFloat(regex[1])) + ' WERX';
    } else {
      toReturn = subString.length === 1 ? regex[1].concat('0') : regex[1].concat('00');
    }
  }
  return forExport
    ? toReturn
      ? toReturn
      : formater.format(parseFloat(formatedValue))
    : (toReturn ? formater.format(parseFloat(toReturn)) : formater.format(parseFloat(formatedValue))) + ' WERX';
};

export const fitStringInCell = (value: string) => value.slice(0, 5) + '...' + value.slice(value.length - 5);

export const formatTotalSupply = () => 'Total Supply: 3,550,000,000';

const formatRelativeString = (date: string) => {
  let formatedDate = date;
  if (date.indexOf('minutes') !== -1) {
    formatedDate = date.replace('minutes', 'mins');
  }
  if (date.indexOf('seconds') !== -1) {
    formatedDate = date.replace('seconds', 'secs');
  }
  return formatedDate;
};

export const formatTime = (timestamp: string | number, format: 'full' | 'relative') => {
  return format === 'full'
    ? dayjs(timestamp).format('MMM D, YYYY h:mm A Z')
    : formatRelativeString(dayjs().to(dayjs(timestamp)));
};

export const formatNumber = (number: number | string | undefined | null, format: NumberFormat): string => {
  if (number === '' || number === undefined || number === null || isNaN(<number>number)) {
    return '';
  }

  if (format === NumberFormat.MILLIFY) {
    return millify(<number>number);
  }

  if (format === NumberFormat.WHOLE) {
    return new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 0,
    }).format(<number>number);
  }

  if (format === NumberFormat.DECIMALS) {
    return new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    }).format(<number>number);
  }

  if (format === NumberFormat.DECIMALS_TRIMMED) {
    return new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 0,
    }).format(<number>number);
  }

  if (format === NumberFormat.MILLIFY_WHOLE) {
    return millify(<number>number, { precision: 0 });
  }

  if (format === NumberFormat.MILLIFY_EXPANDED) {
    const exponent = Math.floor(Math.log10(<number>number));
    const precision = Math.min(Math.max(Math.floor(exponent / 3 /* 3 Zeros */) - 1, 0), 3);
    return millify(<number>number, { precision });
  }

  return '--';
};
