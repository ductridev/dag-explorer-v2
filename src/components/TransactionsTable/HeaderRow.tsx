import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { NetworkContext, NetworkContextType } from '../../context/NetworkContext';
import styles from './HeaderRow.module.scss';
import clsx from 'clsx';

export const HeaderRow = ({ forSnapshots, headerCols }: { forSnapshots?: boolean; headerCols?: string[] }) => {
  const location = useLocation();
  const { network } = useContext(NetworkContext) as NetworkContextType;

  const isHomePage = location.pathname === '/';

  if (headerCols) {
    return (
      <>
        {headerCols.map((text, index) => (
          <div className={styles.headerColumn} key={index}>
            <p className={styles.headerText}>{text}</p>
          </div>
        ))}
      </>
    );
  }

  const columns = isHomePage ? (
    (
      <>
        <div className={styles.headerColumn}>
          <p className={styles.headerText}>{forSnapshots ? 'ORDINAL' : 'TXN HASH'}</p>
        </div>
        <div className={styles.headerColumn}>
          <p className={styles.headerText}>{'TIMESTAMP'}</p>
        </div>
        <div className={`${styles.headerColumn} ${!forSnapshots ? styles.rightAligned : undefined}`}>
          <p className={styles.headerText}>{forSnapshots ? 'BLOCKS' : 'AMOUNT'}</p>
        </div>
      </>
    )
  ) : (
    <>
      <div className={`${styles.headerColumn} ${styles.topLeftBorder}`}>
        <p className={styles.headerText}>{forSnapshots ? 'HASH' : 'TXN HASH'}</p>
      </div>

      <div className={clsx(styles.headerColumn, !forSnapshots ? styles.timestamp : undefined)}>
        <p className={styles.headerText}>TIMESTAMP</p>
      </div>

      {!forSnapshots && (
        <div className={`${styles.headerColumn}`}>
          <p className={styles.headerText}>{'SNAPSHOT'}</p>
        </div>
      )}

      {forSnapshots && (
        <div className={`${styles.headerColumn}`}>
          <p className={styles.headerText}>ORDINAL</p>
        </div>
      )}

      {!forSnapshots && (
        <div className={`${styles.headerColumn} ${styles.enoughSpace}`}>
          <p className={styles.headerText}>FEE</p>
        </div>
      )}

      {forSnapshots && (
        <div className={`${styles.headerColumn}`}>
          <p className={styles.headerText}>{'BLOCK COUNT'}</p>
        </div>
      )}

      {!forSnapshots && (
        <div className={`${styles.headerColumn} ${styles.stackFromTo}`}>
          <p className={styles.headerText}>FROM / TO</p>
        </div>
      )}

      {!forSnapshots && (
        <div className={clsx(styles.headerColumn, styles.topRightBorder, styles.rightAligned)}>
          <p className={styles.headerText}>AMOUNT</p>
        </div>
      )}
    </>
  );

  return columns;
};
