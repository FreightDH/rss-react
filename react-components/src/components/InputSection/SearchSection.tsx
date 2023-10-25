import { ChangeEvent, Component } from 'react';
import styles from './SearchSection.module.scss';

interface SearchSectionProps {
  getPokemonData: (pokemonName: string) => void;
}

interface SearchSectionState {
  searchQuery: string;
}

class SearchSection extends Component<SearchSectionProps, SearchSectionState> {
  constructor(props: SearchSectionProps) {
    super(props);
    this.state = {
      searchQuery: '',
    };
  }

  handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    this.setState({ ...this.state, searchQuery: value.trim() });
  };

  handleSearchButtonClick = () => {
    this.props.getPokemonData(this.state.searchQuery);
    this.setState({ ...this.state, searchQuery: '' });
  };

  render() {
    return (
      <section className={styles.search}>
        <div className={styles.search__body}>
          <input
            type="text"
            placeholder="Enter pokemon..."
            className={styles.search__input}
            value={this.state.searchQuery}
            onChange={(event) => this.handleInputChange(event)}
          />
          <button className={styles.search__btn} onClick={this.handleSearchButtonClick}>
            Search
          </button>
        </div>
      </section>
    );
  }
}

export default SearchSection;
