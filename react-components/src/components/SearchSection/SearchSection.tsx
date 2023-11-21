import { ChangeEvent, Component } from 'react';
import styles from './SearchSection.module.scss';

interface SearchSectionProps {
  setPokemonDataURL: (pokemonName: string) => void;
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

  componentDidMount = () => {
    const initiInputValue = localStorage.getItem('lastSearch') || '';
    this.setState({ ...this.state, searchQuery: initiInputValue });
  };

  handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    this.setState({ ...this.state, searchQuery: value.trim().toLowerCase() });
  };

  handleSearchButtonClick = () => {
    this.props.setPokemonDataURL(this.state.searchQuery);
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
