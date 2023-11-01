import { Component, ReactNode } from 'react';
import PokemonCard from './PokemonCard/PokemonCard';
import styles from './ListSection.module.scss';

interface ListSectionProps {
  data: Data | null;
  pokemonDataURL: string;
}

class ListSection extends Component<ListSectionProps> {
  constructor(props: ListSectionProps) {
    super(props);
  }

  render() {
    let listBody: ReactNode | ReactNode[];

    if (this.props.pokemonDataURL) {
      listBody = <PokemonCard requestURL={this.props.pokemonDataURL} />;
    } else if (this.props.data) {
      listBody = this.props.data.results.map((item) => <PokemonCard requestURL={item.url} key={item.name} />);
    } else {
      listBody = <li>No data</li>;
    }

    return (
      <section className={styles.list}>
        <ul className={styles.list__body}>{listBody}</ul>
      </section>
    );
  }
}

export default ListSection;
