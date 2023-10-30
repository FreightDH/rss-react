import { Component, ReactNode } from 'react';
import { ThreeDots } from 'react-loader-spinner';

import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import ErrorButton from './components/ErrorButton/ErrorButton';
import SearchSection from './components/SearchSection/SearchSection';
import ListSection from './components/ListSection/ListSection';
import Footer from './components/Footer/Footer';

import styles from './App.module.scss';

const URL = 'https://pokeapi.co/api/v2/pokemon/';

interface AppProps {}
interface AppState {
  data: Data | null;
  pokemonDataURL: string;
  isLoading: boolean;
}

class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    this.state = {
      data: null,
      pokemonDataURL: '',
      isLoading: false,
    };
  }

  componentDidMount = () => {
    const lastSearch = localStorage.getItem('lastSearch');
    this.getAllData();

    if (lastSearch) {
      const requestURL = URL + lastSearch;
      this.setState({ ...this.state, pokemonDataURL: requestURL });
    }
  };

  getAllData = () => {
    this.setState({ ...this.state, isLoading: true });
    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        this.setState({ ...this.state, data: data, isLoading: false });
      })
      .catch(() => {
        throw new Error("Pokemons data wasn't found! Try again later.");
      });
  };

  setPokemonDataURL = (pokemonName: string) => {
    if (pokemonName) {
      const requestURL = URL + pokemonName;
      this.setState({ ...this.state, pokemonDataURL: requestURL });
    } else {
      this.setState({ ...this.state, pokemonDataURL: '' });
    }

    localStorage.setItem('lastSearch', pokemonName);
  };

  render() {
    let cardsSectionBody: ReactNode;

    if (this.state.isLoading) {
      cardsSectionBody = <ThreeDots color="#353535" wrapperStyle={{ justifyContent: 'center' }} visible={true} />;
    } else {
      cardsSectionBody = <ListSection data={this.state.data} pokemonDataURL={this.state.pokemonDataURL} />;
    }

    return (
      <ErrorBoundary>
        <>
          <main className={styles.page}>
            <ErrorButton />
            <div className="page__container">
              <div className={styles.page__body}>
                <h1 className={styles.page__title}>Pokemon Cards</h1>
                <SearchSection setPokemonDataURL={this.setPokemonDataURL} />
                <div className={styles.page__divider}></div>
                {cardsSectionBody}
              </div>
            </div>
          </main>
          <Footer />
        </>
      </ErrorBoundary>
    );
  }
}

export default App;
