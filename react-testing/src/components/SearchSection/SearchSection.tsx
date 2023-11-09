import { ReactElement, ChangeEvent, KeyboardEvent, useState, useEffect } from 'react';
import usePokemon from 'utils/contexts/usePokemon';
import styles from './SearchSection.module.scss';

const SearchSection = (): ReactElement => {
  const { setRequestURL } = usePokemon();
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchQuery(value.trim().toLowerCase());
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setRequestURL(searchQuery);
    }
  };

  useEffect(() => {
    const initInputValue = localStorage.getItem('lastSearch') || '';
    setSearchQuery(initInputValue);
  }, []);

  return (
    <section className={styles.search}>
      <div className={styles.search__body}>
        <input
          type="text"
          placeholder="Enter pokemon..."
          className={styles.search__input}
          value={searchQuery}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <button className={styles.search__btn} onClick={() => setRequestURL(searchQuery)}>
          Search
        </button>
      </div>
    </section>
  );
};

export default SearchSection;
