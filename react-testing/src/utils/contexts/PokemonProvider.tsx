import { FC, ReactElement, ReactNode, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import usePagination from 'hooks/usePagination';
import PokemonContext from './PokemonContext';
import { API_URL } from 'shared/index';

interface PokemonProviderProps {
  children: ReactNode;
}

const PokemonProvider: FC<PokemonProviderProps> = ({ children }): ReactElement => {
  const [searchParams] = useSearchParams();
  const [pageNumber, setPageNumber] = useState<number>(() => {
    const page = searchParams.get('page');
    if (!page) return 1;

    return +page;
  });

  const [cardsPerPage, setCardsPerPage] = useState(9);
  const [pokemonName, setPokemonName] = useState('');
  const [controlsDisabled, setControlsDisabled] = useState(false);
  const data = usePagination(API_URL, pageNumber, cardsPerPage);
  const totalItems = data.count;

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

  const value = useMemo(
    () => ({
      data,
      totalItems,
      setRequestURL,
      pokemonName,
      setPokemonName,
      controlsDisabled,
      setControlsDisabled,
      pageNumber,
      setPageNumber,
      cardsPerPage,
      setCardsPerPage,
    }),
    [data, totalItems, pokemonName, controlsDisabled, pageNumber, cardsPerPage]
  );

  return <PokemonContext.Provider value={value}>{children}</PokemonContext.Provider>;
};

export default PokemonProvider;
