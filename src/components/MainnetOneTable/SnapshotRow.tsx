import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PricesContext, PricesContextType } from '../../context/PricesContext';
import { MainnetOneSnapshot } from '../../types';
import { formatAmount, formatPrice } from '../../utils/numbers';
import styles from './SnapshotRow.module.scss';

export const SnapshotRow = ({ icon, snapshot }: { icon?: JSX.Element; snapshot?: MainnetOneSnapshot }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const { werxInfo } = useContext(PricesContext) as PricesContextType;

  let snapRow = undefined;
  if (snapshot) {
    if (isHomePage) {
      snapRow = (
        <>
          <div className={styles.txnCell}>
            <div className={styles.txContainer}>
              {icon && icon}
              <Link to={'/snapshots/' + snapshot.height}>{snapshot.height}</Link>
            </div>
          </div>
          <div className={styles.txnCell}>{snapshot.txCount}</div>
          <div className={`${styles.txnCell} ${styles.amount}`}>
            {werxInfo && (
              <div className={styles.usd}>{'($' + formatPrice(snapshot.werxAmount, werxInfo, 2) + ' USD)'}</div>
            )}
            <div className={styles.werx}>{formatAmount(snapshot.werxAmount, 8)}</div>
          </div>
        </>
      );
    } else {
      snapRow = (
        <>
          <div className={styles.txnCell}>
            <div className={styles.txContainer}>
              {icon && icon}
              <Link to={'/snapshots/' + snapshot.height}>{snapshot.height}</Link>
            </div>
          </div>
          <div className={styles.txnCell}>{snapshot.txCount}</div>
          <div className={`${styles.txnCell} ${styles.amount}`}>{formatAmount(snapshot.feeAmount, 8)}</div>
          <div className={`${styles.txnCell} ${styles.amount}`}>
            {werxInfo && (
<<<<<<< HEAD
              <div className={styles.usd}>{'($' + formatPrice(snapshot.dagAmount, werxInfo, 2) + ' USD)'}</div>
=======
              <div className={styles.usd}>{'($' + formatPrice(snapshot.werxAmount, werxInfo, 2) + ' USD)'}</div>
>>>>>>> 984ff72607a33dc813f1e4a6351d6f69f3f4f272
            )}
            <div className={styles.werx}>{formatAmount(snapshot.werxAmount, 8)}</div>
          </div>
        </>
      );
    }
  }

  if (!snapshot) {
    if (isHomePage) {
      snapRow = (
        <>
          <div className={styles.txnEmptyRow} />
          <div className={styles.txnEmptyRow} />
          <div className={styles.txnEmptyRow} />
        </>
      );
    } else {
      snapRow = (
        <>
          <div className={styles.txnEmptyRow} />
          <div className={styles.txnEmptyRow} />
          <div className={styles.txnEmptyRow} />
          <div className={styles.txnEmptyRow} />
          <div className={styles.txnEmptyRow} />
          <div className={styles.txnEmptyRow} />
          <div className={styles.txnEmptyRow} />
        </>
      );
    }
  }

  return snapRow;
};
