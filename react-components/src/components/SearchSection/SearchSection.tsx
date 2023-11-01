import { ReactElement, ChangeEvent, useState, useEffect } from 'react';
import styles from './SearchSection.module.scss';

interface SearchSectionProps {
  setPokemonDataURL: (pokemonName: string) => void;
}

const SearchSection: React.FC<SearchSectionProps> = ({ setPokemonDataURL }): ReactElement => {
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const initInputValue = localStorage.getItem('lastSearch') || '';
    setSearchQuery(initInputValue);
  }, []);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchQuery(value.trim().toLowerCase());
  };

  const handleSearchButtonClick = () => {
    setPokemonDataURL(searchQuery);
  };

  return (
    <section className={styles.search}>
      <div className={styles.search__body}>
        <input
          type="text"
          placeholder="Enter pokemon..."
          className={styles.search__input}
          value={searchQuery}
          onChange={handleInputChange}
        />
        <button className={styles.search__btn} onClick={handleSearchButtonClick}>
          Search
        </button>
      </div>
    </section>
  );
};

export default SearchSection;
