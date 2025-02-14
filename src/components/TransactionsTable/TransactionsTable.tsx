import { useLocation } from 'react-router-dom';
import { Snapshot, Transaction, Skeleton } from '../../types';
import { HeaderRow } from './HeaderRow';
import { TransactionRow } from './TransactionRow';
import styles from './TransactionsTable.module.scss';
import { SkeletonTransactionsTable } from './SkeletonTransactionsTable';
import { useContext, cloneElement } from 'react';
import { PricesContext, PricesContextType } from '../../context/PricesContext';
import { CardDataRow, TableCards } from './TableCards';
import { fitStringInCell, formatAmount, formatTime } from '../../utils/numbers';
import { TransactionShape } from '../Shapes/TransactionShape';
import { SnapshotShape } from '../Shapes/SnapshotShape';

export const TransactionsTable = ({
  skeleton,
  transactions,
  icon,
  snapshots,
  headerText,
  limit,
}: {
  skeleton?: Skeleton;
  transactions?: Transaction[];
  icon?: JSX.Element;
  snapshots?: Snapshot[];
  headerText?: string;
  limit?: number;
}) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const { werxInfo } = useContext(PricesContext) as PricesContextType;

  const titles = transactions
    ? ['TXN HASH', 'TIMESTAMP', 'SNAPSHOT', 'FROM', 'TO', 'AMOUNT']
    : ['ORDINAL', 'TIMESTAMP', 'BLOCKS COUNT'];
  const needWerxInfo = transactions && transactions.length > 0;
  const mql = window.matchMedia('(max-width: 580px)');

  // if ((skeleton && skeleton.showSkeleton) || (needWerxInfo && !werxInfo)) {
  //   return mql.matches ? (
  //     <div className={styles.cards}>
  //       <TableCards limit={limit} showSkeleton={skeleton.showSkeleton} titles={titles} />
  //     </div>
  //   ) : (
  //     <SkeletonTransactionsTable
  //       headerCols={skeleton.headerCols}
  //       forSnapshots={skeleton.forSnapshots}
  //       rows={limit}
  //       headerText={headerText}
  //       icon={icon}
  //     />
  //   );
  // }

  let txRows =
    transactions &&
    transactions.length > 0 &&
    transactions.map((tx) => <TransactionRow werxInfo={werxInfo} key={tx.hash} tx={tx} icon={icon} />);

  let snapRows =
    snapshots &&
    snapshots.length > 0 &&
    snapshots.map((snap) => <TransactionRow werxInfo={werxInfo} key={snap.hash} snapshot={snap} icon={icon} />);
  
  const emptyRows = [];
  for (let i = 0; i < limit; i++) {
    emptyRows.push(<TransactionRow key={i} tx={null} snapshot={null} />);
  }
  if (!transactions || transactions.length === 0) {
    txRows = emptyRows;
  }

  if (!snapshots || snapshots.length === 0) {
    snapRows = emptyRows;
  }

  if (txRows && limit && txRows.length < limit) {
    let i = 0;
    while (txRows.length < limit) {
      txRows.push(<TransactionRow key={i} />);
      i++;
    }
  }

  if (snapRows && limit && snapRows.length < limit) {
    let i = 0;
    while (snapRows.length < limit) {
      snapRows.push(<TransactionRow key={i} />);
      i++;
    }
  }
  const cardsSet = new Set<CardDataRow[]>();
  if (transactions) {
    transactions.forEach((tx) => {
      const txCard: CardDataRow[] = [];
      txCard.push({
        value: fitStringInCell(tx.hash),
        linkTo: '/transactions/' + tx.hash,
        toCopy: tx.hash,
        element: <TransactionShape />,
      });
      txCard.push({ value: formatTime(tx.timestamp, 'relative'), dataTip: formatTime(tx.timestamp, 'full') });
      txCard.push({ value: tx.snapshotOrdinal, linkTo: '/snapshots/' + tx.snapshotOrdinal });
      txCard.push({ value: fitStringInCell(tx.source), linkTo: '/address/' + tx.source, toCopy: tx.source });
      txCard.push({
        value: fitStringInCell(tx.destination),
        linkTo: '/address/' + tx.destination,
        toCopy: tx.destination,
      });
      txCard.push({ value: formatAmount(tx.amount, 8) });
      cardsSet.add(txCard);
    });
  }

  if (snapshots) {
    snapshots.forEach((snap) => {
      const snapshotCard: CardDataRow[] = [];
      snapshotCard.push({ value: snap.ordinal, linkTo: '/snapshots/' + snap.ordinal, element: <SnapshotShape /> });
      snapshotCard.push({ value: formatTime(snap.timestamp, 'relative'), dataTip: formatTime(snap.timestamp, 'full') });
      snapshotCard.push({ value: snap.blocks.length });
      cardsSet.add(snapshotCard);
    });
  }

  return (
    <>
      <div
        className={`${styles.table}
        ${isHomePage ? styles.homeContainer : snapshots && !transactions ? styles.containerSnap : styles.container}`}
      >
        {headerText && <div className={styles.headerText}>{headerText}</div>}
        {headerText && <span />}
        {headerText && cloneElement(icon, { classname: styles.icon, size: '20px' })}
        <HeaderRow forSnapshots={snapshots && !transactions} />
        {transactions && txRows}
        {snapshots && snapRows}
        {!transactions && !snapshots && emptyRows}
      </div>
      <div className={styles.cards}>
        <TableCards titles={titles} elements={cardsSet} headerText={headerText} icon={icon} />
      </div>
    </>
  );
};
