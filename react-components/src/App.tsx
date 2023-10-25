import { Component } from 'react';

import SearchSection from './components/InputSection/SearchSection';

import styles from './App.module.scss';

const URL = 'https://pokeapi.co/api/v2/pokemon/';

interface AppProps {}
interface AppState {}

class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
  }

  getPokemonData = (pokemonName: string) => {
    const finalURL = URL + pokemonName;

    fetch(finalURL)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.error(error));
  };

  render() {
    return (
      <>
        <main className={styles.page}>
          <div className="page__container">
            <div className={styles.page__body}>
              <h1 className={styles.page__title}>Pokemon Cards</h1>
              <SearchSection getPokemonData={this.getPokemonData} />
              <div style={{ width: '100%', height: '1px', backgroundColor: '#000' }}></div>
            </div>
          </div>
        </main>
      </>
    );
  }
}

export default App;
