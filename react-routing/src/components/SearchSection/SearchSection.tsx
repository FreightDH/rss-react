import { ReactElement, ChangeEvent, KeyboardEvent, useState, useEffect, FC } from 'react';
import styles from './SearchSection.module.scss';

interface SearchSectionProps {
  setRequestURL: (pokemonName: string) => void;
}

const SearchSection: FC<SearchSectionProps> = ({ setRequestURL }): ReactElement => {
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
