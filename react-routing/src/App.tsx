import { ReactElement, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import usePagination from 'hooks/usePagination';

import { ErrorBoundary, ErrorButton, SearchSection, ControlsSection, ListSection, Footer } from 'components';

import styles from './App.module.scss';

const URL = 'https://pokeapi.co/api/v2/pokemon/';

const App = (): ReactElement => {
  const [searchParams] = useSearchParams();
  const [pageNumber, setPageNumber] = useState<number>(() => {
    const page = searchParams.get('page');
    if (!page) return 1;

    return +page;
  });

  const [pokemonURL, setPokemonURL] = useState('');
  const [controlsDisabled, setControlsDisabled] = useState(false);
  const [cardsPerPage, setCardsPerPage] = useState(20);
  const data = usePagination(URL, pageNumber, cardsPerPage);

  const setRequestURL = (pokemonName: string) => {
    if (pokemonName) {
      const requestURL = URL + pokemonName;
      setPokemonURL(requestURL);
      setControlsDisabled(true);
    } else {
      setPokemonURL('');
      setControlsDisabled(false);
    }

    localStorage.setItem('lastSearch', pokemonName);
  };

  useEffect(() => {
    const lastSearch = localStorage.getItem('lastSearch');

    if (lastSearch) {
      const requestURL = URL + lastSearch;
      setPokemonURL(requestURL);
      setControlsDisabled(true);
    }
  }, []);

  // <ThreeDots color="#353535" wrapperStyle={{ justifyContent: 'center' }} visible={true} />;

  return (
    <ErrorBoundary>
      <main className={styles.page}>
        <ErrorButton />
        <div className="page__container">
          <div className={styles.page__body}>
            <h1 className={styles.page__title}>Pokemon Cards</h1>
            <SearchSection setRequestURL={setRequestURL} />
            <div className={styles.page__divider}></div>
            <ControlsSection
              controlsDisabled={controlsDisabled}
              totalItems={data.count}
              cardsPerPage={cardsPerPage}
              pageNumber={pageNumber}
              setCardsPerPage={setCardsPerPage}
              setPageNumber={setPageNumber}
            />
            <ListSection data={data} pokemonURL={pokemonURL} />
          </div>
        </div>
      </main>
      <Footer />
    </ErrorBoundary>
  );
};

export default App;
