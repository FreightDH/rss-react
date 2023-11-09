import { createContext } from 'react';

interface PokemonContextProps {
  data: Data;
  totalItems: number;
  pokemonName: string;
  controlsDisabled: boolean;
  pageNumber: number;
  cardsPerPage: number;
  setPageNumber: (number: number) => void;
  setCardsPerPage: (number: number) => void;
  setRequestURL: (pokemonName: string) => void;
}

const PokemonContext = createContext<PokemonContextProps>({
  data: { count: 0, next: null, prev: null, results: [] },
  totalItems: 0,
  pokemonName: '',
  controlsDisabled: false,
  pageNumber: 0,
  cardsPerPage: 0,
  setRequestURL: () => {},
  setPageNumber: () => {},
  setCardsPerPage: () => {},
});

export default PokemonContext;
