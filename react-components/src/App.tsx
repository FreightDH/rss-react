import { Component } from 'react';

import SearchSection from './components/InputSection/SearchSection';
import ListSection from './components/ListSection/ListSection';

import styles from './App.module.scss';

const URL = 'https://pokeapi.co/api/v2/pokemon/';

interface AppState {
  data: Data | null;
  pokemonDataURL: string;
  isLoading: boolean;
}

class App extends Component<{}, AppState> {
  constructor(props = {}) {
    super(props);

    this.state = {
      data: null,
      pokemonDataURL: '',
      isLoading: true,
    };
  }

  componentDidMount() {
    this.setState({ ...this.state, isLoading: true });

    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        this.setState({ ...this.state, data: data, isLoading: false });
      })
      .catch((error) => console.error(error));
  }

  setPokemonDataURL = (pokemonName: string) => {
    if (pokemonName) {
      const requestURL = URL + pokemonName;
      this.setState({ ...this.state, pokemonDataURL: requestURL });
    }
  };

  render() {
    return (
      <>
        <main className={styles.page}>
          <div className="page__container">
            <div className={styles.page__body}>
              <h1 className={styles.page__title}>Pokemon Cards</h1>
              <SearchSection setPokemonDataURL={this.setPokemonDataURL} />
              <div style={{ width: '100%', height: '1px', backgroundColor: '#000' }}></div>
              {this.state.isLoading ? (
                <p>Loading data...</p>
              ) : (
                <ListSection data={this.state.data} pokemonDataURL={this.state.pokemonDataURL} />
              )}
            </div>
          </div>
        </main>
      </>
    );
  }
}

export default App;
