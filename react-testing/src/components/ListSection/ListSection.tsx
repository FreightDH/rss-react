import { CSSProperties, ReactElement, ReactNode } from 'react';
import { Link } from 'react-router-dom';

import usePokemon from 'utils/contexts/usePokemon';
import useParamsObject from 'hooks/useParamsObject';
import { API_URL, getSearchPath } from 'shared';

import PokemonCard from './PokemonCard/PokemonCard';
import styles from './ListSection.module.scss';

const ListSection = (): ReactElement => {
  const { data, pokemonName } = usePokemon();
  let listBody: ReactNode | ReactNode[];
  let listPadding: CSSProperties = {};

  const searchQueries = useParamsObject();

  if (pokemonName) {
    searchQueries['details'] = pokemonName;
    const path = getSearchPath(searchQueries);
    const requestURL = API_URL + pokemonName;

    listBody = (
      <li>
        <Link to={`?${path}`}>
          <PokemonCard requestURL={requestURL} details={false} />
        </Link>
      </li>
    );
    listPadding = { paddingTop: '20px' };
  } else if (data) {
    listBody = data.results.map((item) => {
      searchQueries['details'] = item.name;
      const path = getSearchPath(searchQueries);

      return (
        <li key={item.name}>
          <Link to={`?${path}`} key={item.name}>
            <PokemonCard requestURL={item.url} details={false} />
          </Link>
        </li>
      );
    });
  }

  return (
    <section className={styles.list} style={listPadding}>
      <ul className={styles.list__body}>{listBody}</ul>
    </section>
  );
};

export default ListSection;
