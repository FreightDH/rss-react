import { Component } from 'react';
import { ThreeDots } from 'react-loader-spinner';

import SearchSection from './components/SearchSection/SearchSection';
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
      isLoading: false,
    };
  }

  componentDidMount = () => {
    const lastSearch = localStorage.getItem('lastSearch');

    if (lastSearch) {
      this.setState({ ...this.state, pokemonDataURL: lastSearch });
    } else {
      this.getAllData();
    }
  };

  getAllData = () => {
    this.setState({ ...this.state, isLoading: true });
    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        this.setState({ ...this.state, data: data, isLoading: false });
      })
      .catch((error) => console.error(error));
  };

  setPokemonDataURL = (pokemonName: string) => {
    if (pokemonName) {
      const requestURL = URL + pokemonName;
      this.setState({ ...this.state, pokemonDataURL: requestURL });
      localStorage.setItem('lastSearch', requestURL);
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
              <div className={styles.page__divider}></div>
              {this.state.isLoading ? (
                <ThreeDots
                  width="80"
                  height="80"
                  radius="9"
                  color="#353535"
                  wrapperStyle={{ justifyContent: 'center' }}
                  visible={true}
                />
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
