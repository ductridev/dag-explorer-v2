import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useGetClusterInfo } from '../../api/l0-node';
import { InfoTable } from '../../components/InfoTable/InfoTable';
import TableController from '../../components/ValidatorsTable/TableController';
import { ValidatorsTable } from '../../components/ValidatorsTable/ValidatorsTable';
import { Network } from '../../constants';
import { ValidatorNode } from '../../types';
import { NotFound } from '../NotFoundView/NotFound';
import styles from './Dashboard.module.scss';

const NODES_AMOUNT = 100;

const orderNodes = (nodes: ValidatorNode[]) => {
  const ordered = nodes.filter((node) => node.status !== 'Offline');
  return ordered.concat(nodes.filter((node) => node.status === 'Offline'));
};

export const Dashboard = ({ network }: { network: Network }) => {
  // const validatorNodes = useGetValidatorNodes(network);
  // const [nodes, setNodes] = useState<ValidatorNode[]>([]);
  const [pages, setPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const clusterData = useGetClusterInfo();
  // const clusterRewards = useGetClusterRewards(network);
  const [validatorsAmount, setValidatorsAmount] = useState(0);
  const [lastUpdatedAt, setLastUpdatedAt] = useState(0);
  const [totalRewards, setTotalRewards] = useState(0);
  const [skeleton, setSkeleton] = useState(true);
  const [error, setError] = useState<string>(undefined);

  useEffect(() => {
    clusterData.isError
      ? setError(clusterData.error.message)
      : 'Unknow error'
  }, [clusterData.isError]);

  useEffect(() => {
    // if (!validatorNodes.isFetching && !validatorNodes.isError) {
    //   setNodes(orderNodes(validatorNodes.data));
    //   setPages(Math.ceil(validatorNodes.data.length / NODES_AMOUNT));
    // }
    if (!clusterData.isError && !clusterData.isFetching) {
      setValidatorsAmount(clusterData.data.length);
    }
    // if (!clusterRewards.isError && !clusterRewards.isFetching) {
    //   setTotalRewards(clusterRewards.data.totalRewards);
    // }

    if (!clusterData.isFetching ) {
      setSkeleton(false);
      setLastUpdatedAt(clusterData.dataUpdatedAt);
    }
  }, [clusterData.isFetching]);

  const handlePrevPage = () => {
    if (currentPage === 1) {
      return;
    }
    setCurrentPage((page) => page - 1);
  };
  const handleNextPage = () => {
    if (currentPage === pages) {
      return;
    }
    setCurrentPage((page) => page + 1);
  };

  return error ? (
    <NotFound entire={true} errorCode={error} />
  ) : (
    <main className={clsx(styles.unifiedRow, 'background')}>
      <div className={'row'}>
        <>
          <InfoTable
            title={'Cluster Metrics'}
            loading={skeleton}
            validatorsAmount={validatorsAmount}
            totalRewards={totalRewards}
            lastUpdatedAt={lastUpdatedAt}
          />
          {/* <ValidatorsTable
            nodes={nodes.slice(currentPage * NODES_AMOUNT - NODES_AMOUNT, currentPage * NODES_AMOUNT)}
            amount={NODES_AMOUNT}
            loading={skeleton}
          /> */}
          <TableController
            handlePrevPage={handlePrevPage}
            handleNextPage={handleNextPage}
            firstPage={currentPage === 1}
            lastPage={currentPage === pages}
          />
        </>
      </div>
    </main>
  );
};
