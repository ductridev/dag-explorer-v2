import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SearchableItem } from '../../constants';
import { getSearchInputType } from '../../utils/search';
import styles from './SearchBar.module.scss';

export const SearchBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [searchText, setSearchText] = useState<string>('');

  const handleKey = (e) => {
    if (e.code === 'Enter' && searchText !== '') {
      handleSearch();
    }
  };

  const isSameLocation = (url: string) => url === location.pathname;

  const performAction = (url: string) => {
    isSameLocation(url) ? window.location.reload() : navigate(url);
  };

  const handleSearch = () => {
    const inputType = getSearchInputType(searchText);
    switch (inputType) {
      case SearchableItem.Address: {
        const url = '/address/' + searchText;
        performAction(url);
        break;
      }
      case SearchableItem.Snapshot: {
        const url = '/snapshots/' + searchText;
        performAction(url);
        break;
      }
      case SearchableItem.Transaction: {
        const url = '/transactions/' + searchText;
        performAction(url);
        break;
      }
      default: {
        const url = '/404';
        performAction(url);
        break;
      }
    }
  };

  return (
    <div className={styles.searchBar} onKeyDown={(e) => handleKey(e)}>
      <div className={styles.searchBlock}>
        <div className={styles.searchLeft}>
          <div className={styles.searchIcon} />
          <input
            onChange={(e) => setSearchText(e.target.value)}
            className={styles.searchInput}
            placeholder="Search by address, snapshot height, or transaction..."
          />
          <input
            onChange={(e) => setSearchText(e.target.value)}
            className={styles.shortSearchInput}
            placeholder="Search network"
          />
        </div>
      </div>
      <div
        className={styles.searchButton}
        onClick={() => {
          handleSearch();
        }}
      >
        <p> Search </p>
      </div>
    </div>
  );
};
