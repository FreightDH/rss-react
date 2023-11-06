import { ReactElement, useEffect, useState } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';

import usePagination from 'hooks/usePagination';
import { API_URL } from 'shared';
import { ErrorBoundary, ErrorButton, SearchSection, ControlsSection, ListSection, Footer } from 'components';

import styles from './App.module.scss';

const App = (): ReactElement => {
  const [searchParams] = useSearchParams();
  const [pageNumber, setPageNumber] = useState<number>(() => {
    const page = searchParams.get('page');
    if (!page) return 1;

    return +page;
  });

  const [pokemonName, setPokemonName] = useState('');
  const [controlsDisabled, setControlsDisabled] = useState(false);
  const [cardsPerPage, setCardsPerPage] = useState(9);
  const data = usePagination(API_URL, pageNumber, cardsPerPage);

  const setRequestURL = (pokemonName: string) => {
    if (pokemonName) {
      setPokemonName(pokemonName);
      setControlsDisabled(true);
    } else {
      setPokemonName('');
      setControlsDisabled(false);
    }

    localStorage.setItem('lastSearch', pokemonName);
  };

  useEffect(() => {
    const pokemonName = localStorage.getItem('lastSearch');

    if (pokemonName) {
      setPokemonName(pokemonName);
      setControlsDisabled(true);
    }
  }, []);

  return (
    <ErrorBoundary>
      <main className={styles.page}>
        <ErrorButton />
        <div className="page__container">
          <h1 className={styles.page__title}>Pokemon Cards</h1>
          <div className={styles.page__body}>
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
            <ListSection data={data} pokemonName={pokemonName} />
          </div>
          <Outlet />
        </div>
      </main>
      <Footer />
    </ErrorBoundary>
  );
};

export default App;
