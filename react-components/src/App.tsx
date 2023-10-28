import { Component } from 'react';

import SearchSection from './components/InputSection/SearchSection';
import ListSection from './components/ListSection/ListSection';

import styles from './App.module.scss';

const URL = 'https://pokeapi.co/api/v2/pokemon/';

interface AppProps {}
interface AppState {
  data: Data;
  isLoading: boolean;
}

class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    this.state = {
      data: null,
      isLoading: true,
    };
  }

  componentDidMount() {
    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        this.setState({ data: data, isLoading: false });
      })
      .catch((error) => console.error(error));
  }

  getPokemonData = (pokemonName: string) => {
    const finalURL = URL + pokemonName;

    fetch(finalURL)
      .then((res) => res.json())
      .then((data) => {
        this.setState({ ...this.state, data: data });
      })
      .catch((error) => console.error(error));
  };

  render() {
    return (
      <>
        <main className={styles.page}>
          <div className="page__container">
            <div className={styles.page__body}>
              <h1 className={styles.page__title}>Pokemon Card</h1>
              <SearchSection getPokemonData={this.getPokemonData} />
              <div style={{ width: '100%', height: '1px', backgroundColor: '#000' }}></div>
              {this.state.isLoading ? <p>Loading data...</p> : <ListSection data={this.state.data} />}
            </div>
          </div>
        </main>
      </>
    );
  }
}

export default App;
