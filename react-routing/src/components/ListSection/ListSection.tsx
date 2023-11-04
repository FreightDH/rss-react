import { FC, ReactElement, ReactNode } from 'react';
import PokemonCard from './PokemonCard/PokemonCard';
import styles from './ListSection.module.scss';

interface ListSectionProps {
  data: Data | null;
  pokemonDataURL: string;
}

const ListSection: FC<ListSectionProps> = ({ data, pokemonDataURL }): ReactElement => {
  let listBody: ReactNode | ReactNode[];

  if (pokemonDataURL) {
    listBody = <PokemonCard requestURL={pokemonDataURL} />;
  } else if (data) {
    listBody = data.results.map((item) => <PokemonCard requestURL={item.url} key={item.name} />);
  }

  return (
    <section className={styles.list}>
      <ul className={styles.list__body}>{listBody}</ul>
    </section>
  );
};

export default ListSection;
