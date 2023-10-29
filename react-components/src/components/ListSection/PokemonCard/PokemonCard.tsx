import { Component, ReactNode } from 'react';
import { RotatingLines } from 'react-loader-spinner';
import cardsColors from './cardsColors';
import styles from './PokemonCard.module.scss';

interface PokemonCardProps {
  requestURL: string;
}

interface PokemonCardState {
  pokemonData: PokemonData | null;
  isLoading: boolean;
  badRequest: boolean;
}

class PokemonCard extends Component<PokemonCardProps, PokemonCardState> {
  constructor(props: PokemonCardProps) {
    super(props);

    this.state = {
      pokemonData: null,
      isLoading: true,
      badRequest: false,
    };
  }

  componentDidMount() {
    this.getPokemonData();
  }

  componentDidUpdate(prevProps: Readonly<PokemonCardProps>): void {
    if (this.props.requestURL !== prevProps.requestURL) {
      this.getPokemonData();
    }
  }

  getPokemonData() {
    this.setState({ ...this.state, isLoading: true });
    fetch(this.props.requestURL)
      .then((res) => res.json())
      .then((data) => {
        this.setState({ pokemonData: data, isLoading: false, badRequest: false });
      })
      .catch(() => {
        this.setState({ ...this.state, badRequest: true });
        throw new Error("Bad request, pokemon name wasn't found!");
      });
  }

  render() {
    let componentBody: ReactNode;

    if (this.state.badRequest) {
      componentBody = <p>{"Pokemon wasn't found! Please, enter the other name."}</p>;
    } else if (this.state.isLoading) {
      componentBody = (
        <RotatingLines width="40" strokeColor="#353535" strokeWidth="5" animationDuration="0.75" visible={true} />
      );
    } else {
      componentBody = (
        <li
          className={styles.card}
          style={{
            background: `radial-gradient(circle at 50% 0%, ${
              cardsColors[this.state.pokemonData!.types[0].type.name]
            } 36%, #ffffff 36%)`,
          }}
        >
          <p className={styles.card__health}>
            <span>HP</span>
            {`'${this.state.pokemonData!.stats[0].base_stat}'`}
          </p>
          <div className={styles.card__image}>
            <img src={this.state.pokemonData!.sprites.other.dream_world.front_default} alt="pokemon" />
          </div>
          <h2 className={styles.card__name}>
            {this.state.pokemonData!.name[0].toUpperCase() + this.state.pokemonData!.name.slice(1)}
          </h2>
          <ul className={styles.card__types}>
            {this.state.pokemonData!.types.map((item, index) => (
              <li
                className={styles.types__item}
                style={{ backgroundColor: `${cardsColors[this.state.pokemonData!.types[index].type.name]}` }}
                key={index}
              >
                {item.type.name}
              </li>
            ))}
          </ul>
          <ul className={styles.card__stats}>
            <li className={styles.stats__item}>
              <h3 className={styles.item__stat}>{this.state.pokemonData!.stats[1].base_stat}</h3>
              <p className={styles.item__name}>Attack</p>
            </li>
            <li className={styles.stats__item}>
              <h3 className={styles.item__stat}>{this.state.pokemonData!.stats[2].base_stat}</h3>
              <p className={styles.item__name}>Defense</p>
            </li>
            <li className={styles.stats__item}>
              <h3 className={styles.item__stat}>{this.state.pokemonData!.stats[5].base_stat}</h3>
              <p className={styles.item__name}>Speed</p>
            </li>
          </ul>
        </li>
      );
    }

    return <>{componentBody}</>;
  }
}

export default PokemonCard;
