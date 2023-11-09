import { useContext } from 'react';
import PokemonContext from './PokemonContext';

const usePokemon = () => useContext(PokemonContext);

export default usePokemon;
