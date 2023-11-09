import { ReactElement } from 'react';
import { Outlet } from 'react-router-dom';

import PokemonProvider from 'utils/contexts/PokemonProvider';
import { ErrorBoundary, ErrorButton, SearchSection, ControlsSection, ListSection, Footer } from 'components';

import styles from './App.module.scss';

const App = (): ReactElement => {
  return (
    <ErrorBoundary>
      <PokemonProvider>
        <main className={styles.page}>
          <ErrorButton />
          <div className="page__container">
            <h1 className={styles.page__title}>Pokemon Cards</h1>
            <div className={styles.page__body}>
              <SearchSection />
              <div className={styles.page__divider}></div>
              <ControlsSection />
              <ListSection />
            </div>
            <Outlet />
          </div>
        </main>
        <Footer />
      </PokemonProvider>
    </ErrorBoundary>
  );
};

export default App;
