import { CSSProperties, FC, ReactElement, ReactNode } from 'react';
import PokemonCard from './PokemonCard/PokemonCard';
import styles from './ListSection.module.scss';

interface ListSectionProps {
  data: Data | null;
  pokemonURL: string;
}

const ListSection: FC<ListSectionProps> = ({ data, pokemonURL }): ReactElement => {
  let listBody: ReactNode | ReactNode[];
  let listPadding: CSSProperties = {};

  if (pokemonURL) {
    listBody = <PokemonCard requestURL={pokemonURL} />;
    listPadding = { paddingTop: '20px' };
  } else if (data) {
    listBody = data.results.map((item) => <PokemonCard requestURL={item.url} key={item.name} />);
  }

  return (
    <section className={styles.list} style={listPadding}>
      <ul className={styles.list__body}>{listBody}</ul>
    </section>
  );
};

export default ListSection;
