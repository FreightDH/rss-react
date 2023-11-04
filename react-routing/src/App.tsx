import { ReactElement, ReactNode, useEffect, useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';

import { fetchAllData } from 'api/api';
import ListSection from 'components/ListSection/ListSection';
import ErrorButton from 'components/ErrorButton/ErrorButton';
import SearchSection from 'components/SearchSection/SearchSection';
import Footer from 'components/Footer/Footer';

import styles from './App.module.scss';

const URL = 'https://pokeapi.co/api/v2/pokemon/';

const App = (): ReactElement => {
  const [data, setData] = useState<Data | null>(null);
  const [pokemonDataURL, setPokemonDataURL] = useState('');
  const [isLoading, setLoading] = useState(false);

  const getAllData = async () => {
    setLoading(true);
    const data = await fetchAllData();
    setData(data);
    setLoading(false);
  };

  const setPokemonURL = (pokemonName: string) => {
    if (pokemonName) {
      const requestURL = URL + pokemonName;
      setPokemonDataURL(requestURL);
    } else {
      setPokemonDataURL('');
    }

    localStorage.setItem('lastSearch', pokemonName);
  };

  useEffect(() => {
    const lastSearch = localStorage.getItem('lastSearch');
    getAllData();

    if (lastSearch) {
      const requestURL = URL + lastSearch;
      setPokemonDataURL(requestURL);
    }
  }, []);

  let cardsSectionBody: ReactNode;

  if (isLoading) {
    cardsSectionBody = <ThreeDots color="#353535" wrapperStyle={{ justifyContent: 'center' }} visible={true} />;
  } else {
    cardsSectionBody = <ListSection data={data} pokemonDataURL={pokemonDataURL} />;
  }

  return (
    <>
      <main className={styles.page}>
        <ErrorButton />
        <div className="page__container">
          <div className={styles.page__body}>
            <h1 className={styles.page__title}>Pokemon Cards</h1>
            <SearchSection setPokemonURL={setPokemonURL} />
            <div className={styles.page__divider}></div>
            {cardsSectionBody}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default App;
